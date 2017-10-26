import React, { Component } from 'react';
import Uploadmyfile from './imageUpload';
import Gallery from './gallery';
import axios from 'axios';
// import index from './Maps'
import {Mapcontainer} from './Maps';



class Memory extends Component {

  constructor(){
    super();
    this.state={

    }
    this.getImages = this.getImages.bind(this)
  }

  showState(){
    console.log(this.state)
  }

  getImages(){
    const _this = this
    axios.get('/memories')
    .then(function (response) {
      console.log('memeory', response)
      _this.setState({ memories:response.data })

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  componentDidMount(){
    this.getImages()
  }


  render(){
    return (
      <div>
        <button onClick={this.showState.bind(this)}>state memry</button>
        <Mapcontainer
          memories={this.state.memories}/>
        <Uploadmyfile />
        <Gallery
          memories={this.state.memories}/>

      </div>
    );
  }
}

export default Memory;
