import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import axios from 'axios';
import Geosuggest from 'react-geosuggest';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { deleteMemory } from '../../actions'

import 'react-datepicker/dist/react-datepicker.css';

class EditMemory extends Component{
  constructor(){
    super();
    this.state = {
      displayFullMemory:false,
      renderEditMem:false,
      memTitle:'',
      memDescription:'',
      startDate: null,
      updatedDate:null,
      deleteModalOpen:false
    }
    this.displayFullMemory = this.displayFullMemory.bind(this);
    this.toggleEditMem = this.toggleEditMem.bind(this);
    this.handleMemoryTitleChange = this.handleMemoryTitleChange.bind(this);
    this.handleMemoryDescriptionChange = this.handleMemoryDescriptionChange.bind(this);
    this.updateMemory = this.updateMemory.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.deleteMemory = this.deleteMemory.bind(this);
    this.toggleDeleteMemModal = this.toggleDeleteMemModal.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body')
    // console.log('cdm', this.props)
    this.fetchMemory()
  }


  fetchMemory(props){
   console.log('fetch mems')

    const self = this;

    if(this.props.memory){
      axios({
        method: 'GET',
        url: `/memories/${this.props.memory}`,
        headers: {authorization: localStorage.getItem('token')},
      })
      .then(function (response) {
        // console.log(response);
        self.setState({
          memory:response.data,
          memTitle:response.data.title,
          memDescription:response.data.description,
          lat:response.data.lat,
          lng:response.data.lng,
          location:response.data.location,
          startDate:moment(response.data.timeStamp)

         }, ()=>{ console.log(self.state) })
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }

  deleteMemory(){
    console.log('delete memory', this.state.memory._id)
    //pass journey and memory _ids to route to remove nested journey from mongo
    this.props.deleteMemory(this.props.journey._id, this.state.memory._id);
    this.toggleDeleteMemModal();
    this.props.update();

  }


  toggleEditMem(){
    this.setState({
      renderEditMem: !this.state.renderEditMem
    })
  }

  displayFullMemory(){

    this.setState({
      displayFullMemory: !this.state.displayFullMemory
    }, () => { console.log( this.state ) })
  }

  toggleDeleteMemModal(){

    this.setState({
      deleteModalOpen:!this.state.deleteModalOpen
    }, ()=>{console.log(this.state)})
  }

  displayMemoryOverview(){

    if(this.state.memory){
      // console.log(this.state.memory)
      const date = moment(this.state.memory.timeStamp).format("DD MMM YYYY")
      return(
        <div>
          <div style={{float:'left'}}>{this.state.memory.title}</div>
          <div style={{fontSize:'10px', color:'grey', float:'left', marginLeft:'15px', marginTop:'6px'}}>{date}</div>

          <div
            onClick={this.toggleDeleteMemModal}
            style={{float:'right',fontSize:'15px', marginRight:'10px', cursor:'pointer', color:'grey'}}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>

            <Modal
              isOpen={this.state.deleteModalOpen}
              style={customStyles}
              contentLabel="Modal"
            >
              <div style={{ fontWeight:'bold' }}>Delete this memory?</div>
              <div style={{float:'left'}}>{this.state.memory.title}</div>
              <div style={{clear:'both'}}>
                <img style={styles.overViewImage} src={this.state.memory.image_url[0].url}/>

              </div>

              <button className="btn btn-outline-danger btn-sm"onClick={this.deleteMemory}>Delete</button>
              <button className="btn btn-outline-primary btn-sm" onClick={this.toggleDeleteMemModal}>Cancel</button>
            </Modal>


          <div onClick={this.toggleEditMem} className='edit_memory_button'>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </div>

          <div style={{clear:'both'}}>
            <img style={styles.overViewImage} src={this.state.memory.image_url[0].url}/>

          </div>
        </div>
      )
    }
  }



  handleMemoryTitleChange(e){
    this.setState({
      memTitle:e.target.value
    })
  }

  handleMemoryDescriptionChange(e){
    this.setState({
      memDescription:e.target.value
    })
  }

  handleDateChange(date) {

    this.setState({
      updatedDate: date,
      startDate: date,
    }, () => { console.log(this.state) });
  }

  updateMemory(e){
    console.log(this.state.startDate)
    const self = this
    e.preventDefault()
    axios({
      method: 'POST',
      url: `/memories/update/${this.state.memory._id}`,
      data:{
        title: this.state.memTitle,
        description: this.state.memDescription,
        lat:this.state.lat,
        lng:this.state.lng,
        location:this.state.location,
        timeStamp:this.state.startDate.valueOf()
      },
      headers: {
        authorization: localStorage.getItem('token')
      },
    })
    .then(function (response) {
      console.log(response);
      self.fetchMemory()

      self.toggleEditMem()
    })

    .catch(function (error) {
      console.log(error);
    });
  }


  geoSuggestSelected(suggestion){
    // (suggest)=>{console.log('suggested: ', suggest)}
    console.log(suggestion.description)
    this.setState({
      lat:suggestion.location.lat,
      lng:suggestion.location.lng,
      location:suggestion.description,

    })
  }

  renderEditMemory(){
    if(this.state.renderEditMem){
      return(
        <form>
          <button style={{margin:"5px"}} className="btn btn-outline-primary btn-sm" onClick={this.updateMemory}>Save</button>
          <button style={{margin:"5px"}} className="btn btn-outline-danger btn-sm" onClick={this.toggleEditMem}>cancel</button>
          <h4 style={{display:'inline-block'}}>Edit Memory</h4>

          <div className="form-group">
            <label>Title</label>
            <input className="form-control" type="text" name="title" value={this.state.memTitle} onChange={this.handleMemoryTitleChange}/>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" type="text" name="description"
            rows="5"
            value={this.state.memDescription} onChange={this.handleMemoryDescriptionChange}/>
          </div>

          <h6>Location</h6>
          <Geosuggest
            style={{float:'left', width:'300px'}}
            placeholder='Edit location'
            initialValue={this.state.location}
            onSuggestSelect={ (suggest) => {this.geoSuggestSelected(suggest)} }
          />

        <h6>Date of Memory</h6>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
          />

        <h6>Gallery</h6>

          {this.state.memory.image_url.map((image, i )=>{
            return(
              <div key={i}>
                <img style={styles.galleryImage} key={image.url} src={image.url} alt={'profile image'}/>
              </div>
            )
          })}
          <div style={{clear:'both'}}></div>

        </form>
      )
    }
  }

  showState(){
    console.log(this.state)
    console.log(this.props)
  }

  render(){
    return(
      <div style={styles.memoryWrp}>
        {!this.state.renderEditMem  &&
          <div>
            {this.displayMemoryOverview()}
          </div>
        }
        {this.state.renderEditMem  &&
          <div>
            {this.renderEditMemory()}
          </div>
        }

      </div>
    )
  }

}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteMemory
    }, dispatch)
}



export default connect(null, mapDispatchToProps)(EditMemory);

const styles={
  memoryWrp:{
    border: "1px solid #DDDDDD",
    marginTop: '10px',
    // cursor:'pointer',
    padding:'5px',
    boxShadow: '1px 1px 1px lightgrey',
  },
  overViewImage:{
    height: '150px',
    margin:'5px',
  },
  galleryImage:{
    height: '150px',
    margin:'5px',
    float: 'left',
    borderRadius:'5px',
    border:'2px solid black'
  },
  galleryImage_ctr:{
    width: '90%',
    padding: '10px',
    border: "1px solid #DCDCDC",
    margin: "0 auto",
    marginBottom:'10px',
    overflow:'auto',

  },
  galleryImageText_wrp:{
    marginLeft:"5px",

  },
  galleryImage_title:{
    fontSize: '13px'
  },
  galleryImage_desc:{
    marginTop: '5px',
    color:'grey',
    fontSize:'12px'
  },
  galleryImage_location:{
    marginTop: '5px',
    color:'grey',
    fontSize:'12px'
  },
  gallery_images_wrap:{
    width: '70%',
  }
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
