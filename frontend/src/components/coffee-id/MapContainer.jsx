import {useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';

function MapContainer (props) {
  
  const {
    name,
    latitude,
    longitude,
    distance
  } = props;

  const locations = [
    {
      name: name,
      location: { 
        lat: latitude,
        lng: longitude 
      },
      distance: distance
    },
  ];
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: latitude, lng: longitude
  }
  
  const [ selected, setSelected ] = useState({});
  
  const onSelect = (item) => {
    setSelected(item);
  }

  return (
     <LoadScript
       googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          {
            locations.map(item => {
              return (
              <Marker key={item.name} 
                position={item.location}
                onClick={() => onSelect(item)}
              />
              )
            })
          }
          {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name} is {selected.distance} km away from you</p>
            </InfoWindow>
            )
         }
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;