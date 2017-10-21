import React, { Component } from 'react';
import superagent from 'superagent';
import Geosuggest from 'react-geosuggest';

export class Uploadmyfile extends Component {

  constructor(){
    super()
    this.state = {
      title:"",
      description:"",
      file:null,
      lat:null,
      lng:null,
      processing:false,
      uploaded_uri:null

    }
    this.handleFile = this.handleFile.bind(this)
    this.showPosition = this.showPosition.bind(this)
  }

  handleUploadFile = (event) => {

    event.preventDefault();

    this.setState({
      processing:true
    })

    superagent.post('/memories/new')
    .attach('theseNamesMustMatch', this.state.file, this.state.description )
    .set({ description: this.state.description,title: this.state.title,lat:this.state.lat, lng:this.state.lng})
    .end((err, res) => {
      if (err) console.log(err);
      console.log(res)
      console.log('File uploaded!');
      this.setState({
        processing:false,
        uploaded_uri:res.body.image_url

      })
    })
  }

  handleFile(e) {
    this.setState({
      file:e.target.files[0]
    });
  }


  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange = (e)=>{
    this.setState({ description:e.target.value });
  }



  showPosition(position){
    this.setState({
      processing:true
    })
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          console.log(position)

          this.setState({
            lat:position.coords.latitude,
            lng:position.coords.longitude,
            processing:false
          })

        })
    } else {
      console.log("Geolocation is not supported by this browser.")
    }

  }

  geoSuggestSelected(suggestion){
    // (suggest)=>{console.log('suggested: ', suggest)}
    console.log(suggestion)
    this.setState({
      lat:suggestion.location.lat,
      lng:suggestion.location.lng
    })
  }

  render() {

    let processing;
    let uploaded;

    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <h4>Image uploaded!</h4>
          <img style={{width:'150px'}} alt="preview" src={this.state.uploaded_uri} />
        </div>
      );
    }

    if (this.state.processing) {
      processing = "Uploading Image...";
    }

    return(
      <div>
        <form >
          image upload
          <input type="file" name="fileupload" onChange={this.handleFile}/><br/><br/>
          <input type="text" name="title" placeholder="title" onChange={this.handleTitleChange}/><br/><br/>
          <input type="text" name="description" placeholder="description" onChange={this.handleDescriptionChange}/><br/><br/>
          <button onClick={this.handleUploadFile}>submit</button><br/><br/>
        </form>
        <p>Where were these photos taken?</p>
        search for a location
        <Geosuggest
          placeholder='Search location'
          onChange={(event)=>{console.log(event)}}
          onSuggestSelect={(suggest)=>{this.geoSuggestSelected(suggest)}}
        />
        <p>or use your current position</p>
        <input type="radio"/>use current position
          <br/>
        <button onClick={this.showPosition}>get current location</button>
        <div style={{color:'red', fontWeight:'bold', margin:"20px"}} >{processing}{uploaded}</div>
      </div>
    )
  }


}

export default Uploadmyfile;
