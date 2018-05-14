import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/header.css';

class Header extends Component{

  renderLinks(){
    if(this.props.authenticated){
      return(
        [<li key={'signout'} className="nav-item">
          <Link to='/signout' className="nav-link">Sign Out</Link>
        </li>,
        <li key={'overview'} className="nav-item">
          <Link to='/overview' className="nav-link">Journies</Link>
        </li>,
        <li key={'profile'} className="nav-item">
          <Link to='/profile' className="nav-link">Profile</Link>
        </li>]
      )
    } else {
      return(
        <li key={1} className="nav-item">
          <Link to='/access' className="nav-link">Sign in</Link>
        </li>
      )
    }
  }

  render(){
    return(
      <nav className="navbar navbar-toggleable-md navbar-light border-blue">
        <Link to='/' className="navbar-brand">TravelMate</Link>
        <div className="nav-item">
          <ul className="navbar-nav">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    )
  }
}


function mapStateToProps(state){
  return{
    authenticated:state.auth.authenticated
  }
}

export default connect(mapStateToProps, null)(Header);
