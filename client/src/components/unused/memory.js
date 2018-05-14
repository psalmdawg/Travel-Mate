import React, { Component } from 'react';

import axios from 'axios';
// import index from './Maps'
import {Mapcontainer} from './Maps';
import Profile  from './profile/profile'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { getMemories } from '../actions/memories_actions';



class Memory extends Component {

  constructor(){
    super();
    this.state={
      memories:null
    }

  }

  showState(){
    console.log(this.state)
    console.log(this.props)
  }



  componentDidMount(){
    this.props.getMemories()
  }


  render(){
    return (
      <div>
        memory main
        <Profile memories={this.state.memories}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getMemories,
  }, dispatch)
}

function mapStateToProps(state){
  console.log(state)
  return {
    memories:state.memories
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Memory);
