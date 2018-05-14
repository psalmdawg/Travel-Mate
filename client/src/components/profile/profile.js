import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import '../../styles/profile.css';


class Profile extends Component{
  constructor(props){
    super(props)
    console.log('profile props',this.props)
    this.state={
      showGallery:false,
      showNewJourneyForm:false
    }

    this.fetchJourneys = this.fetchJourneys.bind(this)
    this.toggleNewJourneyForm = this.toggleNewJourneyForm.bind(this)
  }

  componentWillMount(){
    this.fetchJourneys()
  }

  showGallery(){
    this.setState({
      showGallery: !this.state.showGallery
    })
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange = (e)=>{
    this.setState({ description:e.target.value });
  }

  handleNewJourney = (e) => {
    console.log('post new journey')
    e.preventDefault();
    const that = this
    if(this.state.title !== ''){
      axios({
        method: 'POST',
        url: '/journies/new',
        headers: {authorization: localStorage.getItem('token')},
        data:{
          title: this.state.title,
          description: this.state.description,
          user_id: localStorage.getItem('user_id')
        }
      })
      .then(function (response) {
        console.log(response);
        that.fetchJourneys()
        that.toggleNewJourneyForm()
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  fetchJourneys(){
    var self = this
    axios({
      method: 'GET',
      url: '/journies',
      params:{
        user_id: localStorage.getItem('user_id')
      },
      headers: {authorization: localStorage.getItem('token')},
    })
    .then(function (response) {
      // console.log(response);
      //only populate state if data has more that zero entries
      if(response.data.length > 0) {
          self.setState({
          journies:response.data
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  toggleNewJourneyForm(){
    this.setState({
      showNewJourneyForm: !this.state.showNewJourneyForm
    }, console.log(this.state))
  }

  reRenderParent(){
    this.fetchJourneys()
  }

  render(){
    return(
      <div className="profile_journies_wrp">
        <div>
          <h4>Profile</h4>


          <div className="edit_journey_icons">
            {!this.state.showNewJourneyForm && <div
               className="create_newjrny_btn"
               onClick={this.toggleNewJourneyForm}>Create a new Journey here</div>}
            {this.state.showNewJourneyForm && <i className="fa fa-times" aria-hidden="true" onClick={this.toggleNewJourneyForm}></i>}
          </div>

          {!this.state.journies &&
            <div>You havent created any journies yet!</div>
          }
          {this.state.journies &&
            <div style={{fontSize:'13px', marginTop:'10px', marginLeft:'8px'}}>Below are your current journies(Click to view and edit)</div>
          }




          <div style={{margin:'5px'}}>
            {this.state.journies && this.state.journies.map(( j, i ) => {
              return(
                <div key={'div' + j._id} >
                  <Link key={j._id} to={`/journey/edit/${j._id}`}>{j.title}</Link>
                </div>
              )
            })}
          </div>

        </div>

        {this.state.showNewJourneyForm &&
          <form>
            <hr/>
            <h6>New Journey</h6>
            <FormGroup>

              <FormControl type="text" name="title" placeholder="Give your journey a name" onChange={this.handleTitleChange}/>
            </FormGroup>

            <FormGroup>

              <FormControl type="text" name="description" placeholder="Tell us about it" onChange={this.handleDescriptionChange}/>
            </FormGroup>

            <button className='btn btn-outline-primary btn-small crsr-pntr' onClick={this.handleNewJourney}>Save</button>
          </form>
        }
      </div>

    )
  }
}


const styles = {
  journey_title_photo:{
    width:'40px',
  },
  f_c_label:{
    fontSize:'12px',
    marginBottom:'0px'
  }
}


function mapStateToProps(state){
  console.log(state)
  return {
    auth:state.auth
  };
}

export default connect( mapStateToProps, null)(Profile);


        // <button onClick={this.showGallery.bind(this)}>
        //   {!this.state.showGallery && <div>Edit Gallery</div>}{this.state.showGallery && <div>Close Gallery</div>}
        // </button>
        //
        // {this.state.showGallery && <Gallery /> }
