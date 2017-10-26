import React, { Component } from 'react';
// import Uploadmyfile from './imageUpload';

import Initialmap from './map';


class Mapcontainer extends Component {
  constructor(props){
    super();
    console.log('Mapcontainer', props)
    this.state = {
      memories: null,
      openInfo:false
    }
  }

  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

  handleMarkerClick(target) {
    console.log('marker click')

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

  componentWillReceiveProps(nextProps){
    this.setState({
      images:nextProps.data
    })
  }

  handleMarkerClose(target) {
    console.log('handlemarker close')
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

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    let tempImages = []
    nextProps.memories.map((mem)=>{
      tempImages.push(mem)
    })
    this.setState({
      memories:tempImages
    })
  }

  showState(){
    console.log('mem ctr',this.state)
  }

  render(){
    return (
      <div style={{height:'100%'}}>
        <button onClick={this.showState.bind(this)}>show state(mapCTR)</button>
        <Initialmap
          markers={this.state.memories}
          isMarkerShown={true}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `80vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
      </div>
    );
  }
}

export default Mapcontainer;
