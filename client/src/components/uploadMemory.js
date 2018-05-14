import React, { Component } from 'react';
import superagent from 'superagent';
import Dropzone from 'react-dropzone'
import Geosuggest from 'react-geosuggest';
import { Link } from 'react-router-dom';

import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

export class UploadMemory extends Component {

  constructor(props){
    super(props)
    console.log('image uploader props', this.props)
    this.state = {
      title:"",
      description:"",
      files:[],
      lat:null,
      lng:null,
      location:null,
      processing:false,
      uploaded_uri:null,
      successfullUpload:false,
      disableUploadBtn:false

    }
    this.handleFile = this.handleFile.bind(this)
    this.showPosition = this.showPosition.bind(this)
  }


  handleUploadFile = (event) => {

    event.preventDefault();

    this.setState({
      processing:true,
      disableUploadBtn:true
    })

    //post images to the cloud man
    const req = superagent.post(`/journies/newMemory/${this.props.journey._id}`);
    this.state.files.forEach(file => {
        req.attach('theseNamesMustMatch', file);
    });

    req.set('Authorization', localStorage.getItem('token'))
    req.set({
      description: this.state.description,
      title: this.state.title,
      lat: this.state.lat,
      lng: this.state.lng,
      location: this.state.location,
      user_id: localStorage.getItem('user_id')
    })
    req.end((err, res) => {
      if (err) throw(err);
      console.log(res)
      console.log('File uploaded!');
      const tmpUrlArry = [];
      res.body.data.image_url.forEach(url => {
        tmpUrlArry.push(url)
      })
      this.setState({
        processing:false,
        disableUploadBtn:false,
        uploaded_uri:tmpUrlArry,
        successfullUpload:true
      })
    })
  }

  handleFile(e) {
    console.log(e)
    const fileArray = this.state.files;
    e.forEach(image => this.state.files.push(image))
    this.setState({
      files:fileArray
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

  displayPreviewImages(){
    return(
      this.state.uploaded_uri.map((image) => {
        return(
          <img key={image.url} style={{width:'200px', margin:'10px'}} alt="Uploaded images"  src={image.url} />
        )
      })
    )
  }


  geoSuggestSelected(suggestion){
    // (suggest)=>{console.log('suggested: ', suggest)}
    console.log(suggestion.description)
    this.setState({
      lat:suggestion.location.lat,
      lng:suggestion.location.lng,
      location:suggestion.description
    })
  }

  render() {

    let processing;
    let uploaded;

    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <h4>Upload Success!</h4>

            {this. displayPreviewImages()}
        </div>
      );
    }

    if (this.state.processing) {
      processing = <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <span className="sr-only">Processing... Please wait</span></div>
    }

    return(
      <div className='profile_main_wrp'>
        <p>Create a new memory</p>
        {!this.state.successfullUpload &&
          <form>
            <button
              className="btn btn-outline-success btn-sm"
              disabled={this.state.disableUploadBtn}
              onClick={this.handleUploadFile}>
                Save Memory
            </button>
            <button
              style={{ marginLeft:'10px' }}
              className="btn btn-outline-danger btn-sm"
              onClick={this.props.toggleWindow}>
                cancel
            </button>

            <div style={{color:'red', fontWeight:'bold', margin:"20px"}}>{processing}{uploaded}</div>

            <div>
              { this.state.files && this.state.files.map(f =>
                <div style={{ margin:'10px', float:'left'}} key={f.name}>
                  <img style={{width:'50px'}} src={f.preview} />
                </div>)
              }
            </div>

            <FormGroup>
              <ControlLabel>Add a Title</ControlLabel>
              <FormControl type="text" name="title" placeholder="Title" onChange={this.handleTitleChange}/>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Tell us what you got up to!</ControlLabel>
              <FormControl componentClass="textarea" name="Tell us about your memory..." placeholder="description" onChange={this.handleDescriptionChange}/>
            </FormGroup>

            <FormGroup>
              <Dropzone
                style={{
                  border:'1px solid grey', borderRadius: '5px',
                  padding:'0px',  cursor:'pointer',
                  textAlign:'center', width: '150px',
                  lineHeight:'30px', height:'30px',
                  background:"#bda578"}} onDrop={this.handleFile}>
                <div>Attach photos</div>
              </Dropzone>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Where were these photos taken?</ControlLabel>
              <Geosuggest
                style={{float:'left', width:'300px'}}
                placeholder='Search location'
                onSuggestSelect={(suggest)=>{this.geoSuggestSelected(suggest)}}
              />
            </FormGroup>

          </form>
        }
        <div style={{color:'red', fontWeight:'bold', margin:"20px"}}>{processing}{uploaded}</div>

      </div>
    )
  }


}

export default UploadMemory;
