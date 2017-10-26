import React, { Component } from 'react';
import superagent from 'superagent';
import Dropzone from 'react-dropzone'
import Geosuggest from 'react-geosuggest';

export class Uploadmyfile extends Component {

  constructor(){
    super()
    this.state = {
      title:"",
      description:"",
      files:[],
      lat:null,
      lng:null,
      processing:false,
      uploaded_uri:null

    }
    this.handleFile = this.handleFile.bind(this)
    this.showPosition = this.showPosition.bind(this)
  }

  // [{url: "http://res.cloudinary.com/pauly/image/upload/v1508928124/rf5vojrjyanfk1yaf53l.png", _id: "59f06a88caeb534c2e8aec83"},{url: "http://res.cloudinary.com/pauly/image/upload/v1508928132/lecilhdzetgx5l35aywa.png", _id: "59f06a88caeb534c2e8aec82"},{url: "http://res.cloudinary.com/pauly/image/upload/v1508928136/gktqwlt4dkknnbgskiqo.png", _id: "59f06a88caeb534c2e8aec81"}]

  handleUploadFile = (event) => {

    event.preventDefault();

    this.setState({
      processing:true
    })


    const req = superagent.post('/memories/new');
    this.state.files.forEach(file => {
        req.attach('theseNamesMustMatch', file);
    });

    req.set({ description: this.state.description, title: this.state.title, lat:this.state.lat, lng:this.state.lng})
    req.end((err, res) => {
      if (err) throw(err);
      console.log(res)
      console.log('File uploaded!');
      const tmpUrlArry = [];
      res.body.image_url.forEach(url => {
        tmpUrlArry.push(url)
      })
      this.setState({
        processing:false,
        uploaded_uri:tmpUrlArry
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
          <img style={{width:'200px', margin:'10px'}} alt="Uploaded images"  src={image.url} />
        )
      })
    )
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
          <h4>Upload Success!</h4>
            {this. displayPreviewImages()}
        </div>
      );
    }

    if (this.state.processing) {
      processing = "Processing... Please wat";
    }

    return(
      <div>
        <button onClick={()=>{console.log(this.state)}}>b</button>
        <form >

          image upload
          <div className="dropzone">
          <Dropzone onDrop={this.handleFile}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <div>
          <h2>Dropped files</h2>
            { this.state.files && this.state.files.map(f => <div key={f.name}><div >{f.name}</div><img style={{width:'50px'}}src={f.preview} /></div>)
            }
        </div>




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
