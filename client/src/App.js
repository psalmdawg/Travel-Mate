import React, { Component } from 'react';
import { BrowserRouter, Route, IndexRoute, browserHistory } from 'react-router-dom';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Profile from './components/profile/profile';
import RequireAuth from './components/auth/require_auth'; //HOC auth Wrapper
import Journies from './components/journies';
import Journey from './components/journey';
import Welcome from './components/welcome';
import Header from './components/header';
import AuthMain from './components/auth/authMain';
import EditJourney from './components/profile/editJourney';

class App extends Component {

  constructor(){
    super()
    this.state = {
      memories:null
    }
  }

  render() {
    return (
      <div style={styles.mainDiv}>
        <Header />
        <Route exact path="/" render={Welcome} />
        <Route path="/access" component={AuthMain} />
        <Route path="/signout" component={Signout} />
        <Route path="/profile" component={RequireAuth(Profile)} />
        <Route path="/overview" component={RequireAuth(Journies)} />
        <Route path="/journey/:id" exact component={RequireAuth(Journey)} />
        <Route path="/welcome" exact component={Welcome} />
        <Route path="/journey/edit/:id" exact component={RequireAuth(EditJourney)} />
      </div>
    );
  }
}

const styles={
  links_wrp:{
    clear:'both'
  },
  mainDiv:{
    background:'#F0F8FF',
    minHeight:'100vh'
  }

}

export default App;


// old routes
// <Route path="/profile" component={Profile} />
// <Route path="/overview" component={Journies} />
// <Route path="/journey/:id" exact component={Journey} />
// <Route path="/journey/edit/:id" exact component={EditJourney} />
// <Route path="/signin" exact component={Signin} />
// <Route path="/signup" exact component={Signup} />
//
// <div style={styles.links_wrp}>
//   <a style={{margin:'5px'}} href='/profile'>Profile</a>
//   <a style={{margin:'5px'}} href='/overview'>Journies</a>
//   <a style={{margin:'5px'}} href='/signin'>Signin</a>
//   <a style={{margin:'5px'}} href='/signup'>Signup</a>
// </div>
