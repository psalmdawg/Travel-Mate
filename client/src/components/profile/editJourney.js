import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import UploadMemory from '../uploadMemory';
import Modal from 'react-modal';
import { withRouter } from 'react-router';

import {deleteJourney} from '../../actions';
import EditMemory from './edit_memories';
import '../../styles/edit_journey.css'

class EditJourney extends Component{
  constructor(props){
    super(props);
    this.state = {
      editFormDisplay:false,
      showMemoryUpload:false,
      showDeleteJourneyModal:false
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.toggleEditJourney = this.toggleEditJourney.bind(this)
    this.toggleMemUpload = this.toggleMemUpload.bind(this)
    this.updateJourney = this.updateJourney.bind(this)
    this.getJourney = this.getJourney.bind(this)
    this.toggleDeleteJourneyModal = this.toggleDeleteJourneyModal.bind(this)
    this.deleteJourney = this.deleteJourney.bind(this)
  }

  componentDidMount(){
    // console.log(this.props.match)
    this.getJourney()
    console.log(this.props.history)
  }

  componentWillReceiveProps(){
    this.checkForMemories()
  }

  getJourney(){
    if(this.props.match.params.id){
      axios({
        method: 'GET',
        url: `/journies/${this.props.match.params.id}`,
        params:{
          user_id: localStorage.getItem('user_id')
        },
        headers: {authorization: localStorage.getItem('token')},
      })
      .then( response => {
        // console.log('axios response', response)
        this.setState({
          title: response.data.obj.title,
          description: response.data.obj.description,
          journey:response.data.obj
        })
      })
    }
  }

  handleTitleChange(e){
    this.setState({
      title:e.target.value
    })
  }

  handleDescriptionChange(e){
    this.setState({
      description:e.target.value
    })
  }

  updateJourney(e){
    const self = this
    e.preventDefault()
    axios({
      method: 'POST',
      url: `/journies/update/${this.state.journey._id}`,
      data:{
        title: this.state.title,
        description: this.state.description
      },
      headers: {
        authorization: localStorage.getItem('token')
      },
    })
    .then(function (response) {
      // console.log(response);
      self.getJourney()
      self.toggleEditJourney()
    })

    .catch(function (error) {
      console.log(error);
    });
  }

  toggleMemUpload(){
    this.setState({
      showMemoryUpload: !this.state.showMemoryUpload
    })
  }

  toggleEditJourney(){
    this.setState({
      editFormDisplay: !this.state.editFormDisplay
    })
  }

  displayEditForm(){
    if(this.state.journey){
      return(
        <Form>

          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl type="text" name="description" value={this.state.description} onChange={this.handleDescriptionChange}/>
          </FormGroup>

          <button className="btn btn-outline-success btn-small" onClick={this.updateJourney}>Save changes</button>
          <button className="btn btn-outline-danger btn-small" onClick={this.updateJourney}>Cancel</button>

        </Form>

      )
    }
  }

  toggleDeleteJourneyModal(){
    this.setState({
      showDeleteJourneyModal: !this.state.showDeleteJourneyModal
    })
  }

  reRenderParent(){
    console.log('re renderin')
    this.getJourney()
  }

  checkForMemories(){
    console.log('ceh')
    if(this.state.journey){
      if(this.state.journey.memories.length === 0){
        return(
          <div style={{clear:'both'}}>
            <p style={{marginTop:'60px'}}>You haven't created any memories yet!</p>
          </div>
        )
      }
    }
  }

  displayGalleryMemories(){
    //search through memories of journey and pass each memory to the gallery render the edit page
    if(this.state.journey){
      return(
        <div>
          {this.state.journey.memories.map((mem) => {
            return(
              <EditMemory
                key={mem}
                memory={mem}
                journey={this.state.journey}
                update={()=>{this.reRenderParent()}}
              />
            )
          })}
        </div>
      )
    }
  }

  deleteJourney(){
    console.log('deleted')
    this.props.deleteJourney(this.state.journey._id)
    this.toggleDeleteJourneyModal()
    this.props.history.push('/profile')
  }

  render(){


    return(
      <div>
        <Link to='/profile' style={{cursor:'pointer', fontSize:'11px'}}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
          <span style={{marginLeft:'5px'}}>Back to profile</span>
        </Link>

        <div className="edit_journey_ctr_inr">

          {!this.state.editFormDisplay &&
            <div>
              {this.state.journey && <div>
                <h4 className="editJourneyTitle">'{this.state.journey.title}'</h4>
                  <span className="edit_journey_info_btn">
                    {!this.state.editFormDisplay &&
                      <i onClick={this.toggleEditJourney}
                        className="fa fa-pencil"
                        style={{cursor:'pointer'}}
                        aria-hidden="true"> edit</i>
                    }
                  </span>
                  <div
                    onClick={this.toggleDeleteJourneyModal}
                    style={{float:'right',fontSize:'15px', marginRight:'10px', cursor:'pointer', color:'grey'}}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </div>

                  <Modal
                    isOpen={this.state.showDeleteJourneyModal}
                    style={customStyles}
                    contentLabel="Modal"
                  >

                    <div style={{ fontWeight:'bold' }}>Delete this Journey?</div>
                    <div>{this.state.journey.title}</div>
                    <br/> <br/>
                    <div>
                      <button className="btn btn-outline-danger btn-sm"onClick={this.deleteJourney}>Delete</button>
                      <button className="btn btn-outline-primary btn-sm" onClick={this.toggleDeleteJourneyModal}>Cancel</button>
                    </div>
                  </Modal>


                <div style={{fontSize: '13px', color:'grey'}}>{this.state.journey.description}</div>
              </div>

              }
            </div>
          }

          {this.state.editFormDisplay && this.displayEditForm()}


          <div style={{marginBottom:'10px', overflow:'auto'}}>
            <hr/>
            <div style={styles.memories_main_title}>Current memories</div>
            {this.checkForMemories()}
              {!this.state.showMemoryUpload &&
                <button
                  style={styles.create_new_mem_btn}
                  className="btn btn-outline-primary btn-small"
                  onClick={this.toggleMemUpload}>Create a new memory</button> }


              {this.state.showMemoryUpload &&
                <UploadMemory
                  journey={this.state.journey}
                  toggleWindow={this.toggleMemUpload}
                /> }
          </div>

          <div style={{clear:'both', marginTop:'10px'}}>
            {this.displayGalleryMemories()}
          </div>

        </div>
      </div>

    )
  }

}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteJourney
    }, dispatch)
}



export default connect(null, mapDispatchToProps)(EditJourney);

const styles = {
  create_new_mem_btn:{
    float: 'right',
  },
  memories_main_title:{
    float:'left',
    fontSize:'15px',
    verticalAlign:'bottom'
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
