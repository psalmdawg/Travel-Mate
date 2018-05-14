/*global google*/ //needed to let google work?
import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { Polyline } from "react-google-maps";
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import SimpleSlider from '../image-slider';
import moment from 'moment';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Initialmap = withGoogleMap(props => {
  console.log('map props', props.bounds)


  const defaultMapOptions = {
    disableDefaultUI:true,
    enableEventPropagation: true,
    zoomControl: true,
  }

  const getPolyLineCords = () => {
    //map memories. order by date (oldest first)
    // retrieve coords and send to map
    //to dislay polyline in order of memory posted according to date
    const coords = []

    //sort by date
    props.markers.map((marker)=>{
      coords.push({ lat:marker.lat, lng:marker.lng, timestamp:marker.timeStamp })
    })

    var sortedCoords = coords.sort(function(a,b) {
      return a.timestamp < b.timestamp ? -1 : 1;
    });

    return sortedCoords;

  }

  const someEventHandler = (e) => {
    console.log(e)
  }

  return (
    <div>
      {props.bounds &&

        <GoogleMap
          defaultZoom={3}
          ref={(map) => {map && map.fitBounds(props.bounds)} }
          defaultOptions={defaultMapOptions}
          onClick={this.gMapClick}
          defaultCenter={{ lat: -17.4378871, lng: 153.0510172 }}
        >

          {props.markers && props.markers.map((marker, index) => (
            <Marker
              key={index}
              position={{lat:parseFloat(marker.lat), lng:parseFloat(marker.lng)}}
              onClick={() => props.onMarkerClick(marker)}
            >
              {marker.showInfo && (
                <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                  <div style={styles.infobox_style_ctr}>

                    <div style={{float:'left'}}>{marker.title}</div>
                    <div style={{float:'right'}}>{moment(marker.timeStamp).format("DD MMM YYYY")}</div>

                    <div style={{minWidth:'500px', clear:'both', marginTop:'50px'}}>
                      <SimpleSlider
                        images={marker.image_url}/>
                      <div style={{clear:'both'}}></div>
                    </div>

                    <div style={{ marginTop: '30px', letterSpacing:'1px', color:'black', lineHeight:"20px", overflow:'auto'}}>{marker.description}</div>
                  </div>
                </InfoWindow>)
              }
            </Marker> )
          )}

          { props.markers && <Polyline
            path={getPolyLineCords()}

            onClick={event => someEventHandler(event)}
            options={{strokeColor: '#ef3d47', cursor:'pointer', strokeWeight: 1, geodesic: true, strokeOpacity: 0.7}}
            />}

        </GoogleMap>

      }
    </div>
  );
})

const styles = {
  infobox_style_ctr:{
    boxShadow: '2px 2px 2px lightgrey',
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
// marker images moved to make way for sipmle slider
// { marker.image_url.map((image)=>{
//   return <img className='info_img'
//               key={image.url}
//               style={styles.info_img}
//               src={image.url} />
// }) }


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
