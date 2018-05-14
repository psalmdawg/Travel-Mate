import React from 'react';
import SimpleSlider from '../image-slider';
import '../../styles/slickslider.css';

const TimelineGallery = (props) => {
  // console.log('tlg', props)

  function displayImages(){
    return(
      <SimpleSlider images={props.gallery}/>
    )
  }

  return(
    displayImages()
  )

}


export default TimelineGallery
