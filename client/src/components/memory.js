import React, { Component } from 'react';
import Uploadmyfile from './imageUpload';
import Gallery from './gallery';


class Memory extends Component {

  render(){
    return (
      <div>
        <Uploadmyfile />
        <Gallery />
      </div>
    );
  }
}

export default Memory;
