import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Signin from './signin';
import Signup from './signup';

class AuthMain extends Component {
  constructor(){
    super()

    this.state = {
      showSignUp:false
    }

    this.toggleSignUp_In = this.toggleSignUp_In.bind(this);
  }

  toggleSignUp_In(){
    this.setState({
      showSignUp: !this.state.showSignUp
    })
  }

  renderSignInOut(){
    if(this.state.showSignUp){
      return(
        <Signup />
      )
    } else {
      return(
        <Signin />
      )
    }

  }

  render(){
    return(
      <div style={{ width: '400px', margin: '50px auto' }}>
        {this.renderSignInOut()}
        <div style={{ cursor:'pointer', marginTop:'5px', color:'blue' }}>
          {this.state.showSignUp && <p onClick={this.toggleSignUp_In}>Already have an account? Sign In here</p>}
          {!this.state.showSignUp && <p onClick={this.toggleSignUp_In}>not a member? Sign Up</p>}
        </div>
      </div>
    )
  }

}

export default AuthMain;
