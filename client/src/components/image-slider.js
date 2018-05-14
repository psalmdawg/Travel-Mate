import React from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, zIndex:'1', right:'10px', display: 'block'}}
      onClick={onClick}
    >

    </div>
  );
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, zIndex:'1', left:'10px', display: 'block'}}
      onClick={onClick}
    >

    </div>
  );
}

class SimpleSlider extends React.Component {

  //send props down to slick slider to enable it to trigger You just have to make sure that you pass down a prop to the slider in order to trigger the "componentWillReceiveProps" function.. a quirk with the plugin
  constructor(){
    super()
    this.state = {
      modalOpen: false,
      whatever:false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.onWindowResized = this.onWindowResized.bind(this)
  }

  //hacks to fix a rendering bug with react slider
  componentDidMount(){
    setTimeout(()=>{this.toggleModal()}, 200)
   window.addEventListener('resize', this.onWindowResized);
   }
   //hacks to fix a rendering bug with react slider
   componentWillMount(){
     setTimeout(()=>{this.toggleModal()}, 300)
   }

 componentWillUnmount () {
   window.removeEventListener('resize', this.onWindowResized);
 }

 onWindowResized () {
 // Debouncing using underscore _.debounce is optionnal
   this.forceUpdate()
 }



  toggleModal(){
    console.log('toggle modal')
    this.setState({
      //update state to trigger react slick style adjustment.
      // modalOpen: !this.state.modalOpen
      whatever:!this.state.whatever
    })
  }

  renderSlider(){

    var settings = {
      swipeToSlide:true,
      dots: true,
      infinite: false,
      speed: 500,
      // adaptiveHeight:true,
      slidesToShow: 1,
      slidesToScroll: 1,

      margin:'0 auto',

      fade: true,
      lazyLoad: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return(
      <Slider style={{ margin:'0 auto', textAlign:'center' }} ref="slick" {...settings}>
        {this.props.images.map((image, i )=>{
          return(
            <div style={{ margin:'0 auto', textAlign:'center' }} key={i}>

              <img
                onClick={this.toggleModal}
                style={styles.images}
                key={image.url}
                src={image.url}
                alt=""/>
            </div>
          )
        })}
      </Slider>
    )
  }
  render(props) {
    return (
      <div>{this.props.images && this.renderSlider()}</div>
    );
  }
}
const modalStyles = {
  content: {
    opacity:'1',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'scroll',
    zIndex:'100'
  },

}
const styles={
  modalImage:{
    width:'85%',
    cursor:'pointer',
    zIndex:'100'
  },
  images:{
    cursor:'pointer',
    maxHeight: '300px',
    // width:'100%',
    // minHeight:'300px',
    // width:'400px',
    // maxWidth:'500px',
    margin: '5px auto'
  }
}



export default SimpleSlider;
