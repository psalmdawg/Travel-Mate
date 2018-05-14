import React, {Component} from 'react';

import TimelineMemories from './timeline-memories';

class Timeline extends Component{
  constructor(props){
    super(props)
    console.log('tl',this.props)
    this.state = {
      memories:null
    }
    // this.fetchMemories = this.fetchMemories.bind(this)
  }

  componentDidMount(){
    console.log('journey - COMP DID MOUNT PROPS',this.props)
    if(this.props.journey){
      this.setState({
        memories:this.props.journey.memories
      })
    }
  }

  componentWillReceiveProps(nextprops){
    console.log('COMP WILL RECIEVE PROPS',nextprops)
    this.setState({
      memories:nextprops.journey.memories
    })
  }

  displayMemories(){

    return(
      <div>
        {this.state.memories.map((mem) => {
          return(
            <TimelineMemories key={mem} memory={mem}/>
          )
        })}
      </div>
    )

  }

  render(){
     return(
      <div>
        <div className="journey_title_wrp">
          <div className="journey_title">
            {this.props.journey &&
              <div>
                <div className="journey_title_main">{this.props.journey.title}</div>
                <div>{this.props.journey.description}</div>
              </div>}
          </div>
        </div>
        <div className="timeline_container">
          <div className="timeline-background"></div>
          <div className="memories_wrp">
            {this.state.memories && this.displayMemories()}
            <div className="clearFix"></div>
          </div>
        </div>
      </div>
    )
  }
}


export default Timeline;
