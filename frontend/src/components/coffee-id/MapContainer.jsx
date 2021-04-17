import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MapContainer (props) {
  
  const {
    latitude,
    longitude
  } = props;

  const mapStyles = {        
    height: "100vh",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: latitude, lng: longitude
  }
  
  return (
     <LoadScript
       googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        />
     </LoadScript>
  )
}

export default MapContainer;