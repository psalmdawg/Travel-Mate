import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

const Initialmap = withGoogleMap(props => {
  console.log('initial map',props)


  const clickImage = (e) => {
    console.log('clickImage',e)
  }

  const defaultMapOptions = {
    disableDefaultUI:true,
    enableEventPropagation: true
  }

  // const displayPreviewImages = () =>{
  //   return(
  //     this.props.markers.map((image) => {
  //       return(
  //         <img style={{width:'200px', margin:'10px'}} alt="Uploaded images"  src={image.url} />
  //       )
  //     })
  //   )
  // }
  const gMapClick = () => {
    console.log('g map clikc')
  }
  return (
    <GoogleMap
      defaultZoom={2}
      defaultOptions={defaultMapOptions}
      onClick={this.gMapClick}
      defaultCenter={{ lat: -27.4378871, lng: 153.0510172 }}
    >

      {props.markers && props.markers.map( ( marker, index) => (

        <Marker
          key={index}
          position={{lat:marker.lat, lng:marker.lng}}
          onClick={() => props.onMarkerClick(marker)}
        >
          {marker.showInfo && (
            <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
              <div style={styles.infobox_style_ctr}>
                <div>{marker.title}</div>
                <div>
                  { marker.image_url.map((image)=>{
                    return <img className='info_img'style={styles.info_img} src={image.url} />
                  }) }
                </div>

                <div>{marker.description}</div>
            </div>
            </InfoWindow>)
          }
        </Marker> )
      )}

    </GoogleMap>
  );
})

const styles = {
  infobox_style_ctr:{
    backgroundColor: `lightblue`,
    opacity: 0.9,
    padding: `15px`,
    border: '2px solid black',
    borderRadius: '5px',
    fontSize: '15px'
  },
  info_img:{
    width:'285px',
    marginRight:'5px'
  }
}


export default Initialmap;



// <InfoBox
//   defaultPosition={new google.maps.LatLng(props.center.lat, props.center.lng)}
//   options={{ closeBoxURL: ``, enableEventPropagation: true }}
// >
//   <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
//     <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
//       Hello from Taipei
//     </div>
//   </div>
// </InfoBox>
