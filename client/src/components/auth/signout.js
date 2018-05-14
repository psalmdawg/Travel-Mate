import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

 

class Signout extends Component {
 
  componentWillMount(){
    this.props.signOutUser()
  }

  render() { 
    return (    
      <div>Sorry to see you go!</div>
    );
  }
  
}

function mapStateToProps(state){
  return{
    errorMessage:state.auth.error
  }
}
 


export default connect(mapStateToProps, actions)(Signout)
