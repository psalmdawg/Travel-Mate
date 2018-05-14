import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../styles/journiesMain.css';

import { getMemories } from '../actions/memories_actions';

class Journies extends Component{
  constructor(props){
    super(props)
    this.state = {
      journies:null,
      title:null,
      description:null
    }
    this.fetchJourneys = this.fetchJourneys.bind(this)
  }

  componentDidMount(){
    this.fetchJourneys()
  }

  fetchJourneys(){
    var self = this
    axios({
      method: 'GET',
      url: '/journies',
      params:{
        user_id: localStorage.getItem('user_id')
      },
      headers: {authorization: localStorage.getItem('token')},
    })
    .then(function (response) {
      if(response.data.length > 0){
        self.setState({
          journies:response.data
        } )
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-sm-11" style={{ margin: '10px auto'}}>Journies</div>
        </div>
        <div className="row">
          <div className="col-sm-11" style={{ margin: '0 auto'}}>
            <div>

              {!this.state.journies && <div>There are no journies listed</div>}

              {this.state.journies && this.state.journies.map( (j, i) => {
                return (
                  <Link key={j._id} to={`/journey/${j._id}`}>
                    <div
                      className="journies_boxes"
                      key={'l' + j._id} style={{
                        border:'1px solid grey',
                        cursor:'pointer',
                        padding:'5px',
                        marginBottom:'10px',
                        width:'47%',
                        margin:'5px',
                        float:'left',

                      }}>
                        <div style={{
                            width: '49%',
                            float:'left',
                          }}>{j.title}</div>
                        <div style={{width: '49%', border:'black 1px solid', fontSize:'8px', float:'left', verticalAlign:'bottom'}}><img style={{width:'100%'}} src="http://i.dailymail.co.uk/i/pix/2014/06/24/article-2667126-1F147AAC00000578-572_634x411.jpg"></img></div>

                    </div>
                  </Link>
                )
              }) }

            </div>
          </div>
        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Journies);
