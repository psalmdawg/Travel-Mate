import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { getMemories } from '../actions/memories_actions';
import axios from 'axios';

import Timeline from './timeline/timeline';
import Mapcontainer from './Maps/mapContainer';
import '../styles/timeline.css'
import '../styles/slickslider.css'


class Journey extends Component{
  constructor(){
    super()
    this.state = {
      mapView:true,
      journey:null
    }
    this.alternateMapTimeline = this.alternateMapTimeline.bind(this)
    this.fetchSingleJourney = this.fetchSingleJourney.bind(this)
  }

  componentDidMount(){
    this.fetchSingleJourney()
  }

  alternateMapTimeline(){
    console.log('SWITCHING TIMELINE / MAPVIEW')
    this.setState({
      mapView: !this.state.mapView
    })
  }

  fetchSingleJourney(){
    console.log('fetching single journey', this.props.match.params.id)
    if(this.props.match.params.id){
      axios.get(`/journies/${this.props.match.params.id}`, {headers: { authorization: localStorage.getItem('token') }} )
      .then( response => {
        this.setState({
          journey: response.data.obj
        })
      })
    }
  }

  render(){
    return(
      <div>



        <div style={{float:'left',cursor:'pointer'}} onClick={this.alternateMapTimeline}>
          <span style={{fontSize:'10px', float:'left', marginTop: '5px', marginRight: '4px', marginLeft: '5px'}}>switch to</span>
          {this.state.mapView &&
            <div
              className='text-primary'
              style={{ float:'left', fontSize:'12px', marginTop: '4px'}}
              >
              TimelineView
              <i
                style={{marginLeft:'10px'}}
                className="fa fa-compass" aria-hidden="true"></i>
            </div>
          }
          {!this.state.mapView &&
            <div
              className='text-primary'
              style={{float:'left', fontSize:'12px', marginTop: '4px' }}
              onClick={this.alternateMapTimeline}>
              MapView
              <i
                style={{marginLeft:'10px'}}
                className="fa fa-map-o" aria-hidden="true"></i>

            </div>
          }
        </div>

        {this.state.mapView &&
          <Mapcontainer
            journey={this.state.journey}
          />
        }

        {!this.state.mapView &&
          <Timeline
            journey={this.state.journey}
          />
        }

      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getMemories,
  }, dispatch)
}

function mapStateToProps(state){
  return {
    memories:state.memories
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Journey);
