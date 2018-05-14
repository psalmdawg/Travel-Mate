import React, {Component} from 'react';
import axios from 'axios';
import TimelineDate from './timeline-date';
import TimelineGallery from './timeline-gallery';
import TimelineText from './timeline-text';

class TimelineMemories extends Component{
  constructor(props){
    super(props)
    // console.log('tlm', props)
    this.state = {
      memories:[]
    }
    this.fetchMemory = this.fetchMemory.bind(this)
  }

  componentDidMount(){
    this.fetchMemory()
  }

  fetchMemory(props){
   console.log('fetch mems')

   const self = this;
   if(this.props.memory){
    //  console.log('this props memory', this.props.memory)
    axios({
      method: 'GET',
      url: `/memories/${this.props.memory}`,
      headers: {authorization: localStorage.getItem('token')},
    })
    .then(function (response) {
      // console.log(response);
      self.setState({ memory:response.data })
    })
    .catch(function (error) {
      console.log(error);
    });
   }

  }

  displaySOMETHING(){
    if(this.state.memories){
      return(
        <div>State memories is not null</div>
      )
    }
  }

  render(){
    return(

      <div className="memory">

        <div className="memory_date_wrp">
          <div className="memory_date">
            { this.state.memory &&
              <TimelineDate
                timeStamp={this.state.memory.timeStamp}
              />
            }
          </div>
        </div>

        <div className="memory_title_wrp">
          <div className="memory_title">
            {this.state.memory && <div>{this.state.memory.title}</div>}
          </div>
        </div>

        <div className='gallery_and_text_wrap'>
          <div className="timeline_gallery">
            {this.state.memory &&   <TimelineGallery
            gallery={this.state.memory.image_url}
            />  }
          </div>

          <div className="timeline_text">
            {this.state.memory &&  <TimelineText
            description={this.state.memory.description}
            /> }
          </div>

        </div>

      </div>

    )
  }

}



export default TimelineMemories;


//code for memories - ned to sort out axios response data
//

// <div className="memory_date_wrp">
//     <div className="memory_date">
//       { this.state.memory && <div><TimelineDate
//         timeStamp={this.state.memory.timeStamp}
//       /></div> }
//     </div>
//   </div>
//
//   <div className="memory_location_wrp">
//
//   </div>
//
//   <div className="memory_title_wrp">
//     <div className="memory_title">
//       {this.state.memory}
//     </div>
//   </div>
//
//   <div className='gallery_and_text_wrap'>
//     <div className="timeline_gallery">
//       {this.state.memory &&  <div><TimelineGallery
//         gallery={this.state.memory.image_url}
//       /></div> }
//     </div>
//
//     <div className="timeline_text">
//       {this.state.memory && <div><TimelineText
//           description={this.state.memory.description}
//       /></div> }
//     </div>
//
//   </div>
