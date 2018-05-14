import React, { Component } from 'react';
import superagent from 'superagent';
import axios from 'axios';
import Initialmap from './map';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

/*global google*/ //needed to let google work?

class Mapcontainer extends Component {

  constructor(props){
    super(props);
    // console.log('Mapcontainer', props)
    this.state = {
      journey:null,
      memories: null,
      openInfo:false,
      tempMemories:[],
      bounds:null
    }
      this.fetchMemories = this.fetchMemories.bind(this)
      this.setBounds = this.setBounds.bind(this)
      this.handleMarkerClick = this.handleMarkerClick.bind(this);
      this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }

  //retrieve the memories from db referenced in the journey
  fetchMemories(){

    if(this.props.journey){
      // console.log('fetch memory', this.props.journey)
      // console.log('propss fetch memories', this.state.journey)
      const promiseList = this.props.journey.memories.map( mem => {
        return superagent
        .get(`/memories/${mem}`)
        .set('authorization', localStorage.getItem('token'))
        .then( res => res.body );
      });

      Promise.all( promiseList )
      .then( results => {
        this.setState({
          memories: results
        }, () => { this.setBounds() } ); //call set bounds after setState to force update
      })
      .catch( err => {
        console.log(err)
      });

    }
  }

  setBounds(){
    // console.log('set bounds called', this.state.memories)
    var latlng = []

    if(this.state.memories){

      this.state.memories.map((mem)=>{
        latlng.push(new google.maps.LatLng(mem.lat, mem.lng))
      })

      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < latlng.length; i++) {
        bounds.extend(latlng[i]);
      }

      this.setState({
        bounds:bounds
      })
    }
  }


  handleMarkerClick(target) {
    // console.log('marker click')

    let tempArray = []
    this.state.memories.map(mem => {
      if (mem === target) {
        mem = Object.assign(mem, {showInfo: true})
        tempArray.push(mem)
      } else {
        mem = Object.assign(mem, {showInfo: false})
        tempArray.push(mem)
      }
    })
    this.setState({
      memories:tempArray
    })

   }

  handleMarkerClose(target) {
      let tempArray = []
      this.state.memories.map(mem => {
      if (mem === target) {
        mem = Object.assign(mem, {showInfo: false})
        tempArray.push(mem)
      } else {
        tempArray.push(mem)
      }
    })
    this.setState({
      memories:tempArray
    })
  }

  componentDidMount(){
    // console.log('componentDidMount STATE', this.state)
    // console.log('componentDidMount PROPS', this.props)
    this.fetchMemories()
    // this.setBounds()
  }

  componentWillReceiveProps(nextProps){
    // console.log('cwrp',nextProps)

    this.setState({
      journey:nextProps.journey
    }, () => { this.fetchMemories() })
  }

  render(){
    return (
      <div>
        {this.props.journey && <div style={{fontWeight: 'bold',float:'right', fontSize:'13px'}}>{this.props.journey.title}</div> }

        <div style={{height:'100%', clear:'both'}}>
          <Initialmap
            bounds={this.state.bounds}
            markers={this.state.memories}
            isMarkerShown={true}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `80vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            onMarkerClick={this.handleMarkerClick}
            onMarkerClose={this.handleMarkerClose}
          />
        </div>
      </div>
    );
  }
}

export default Mapcontainer;
