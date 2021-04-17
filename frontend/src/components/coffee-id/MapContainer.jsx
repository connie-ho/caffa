import { GoogleMap, LoadScript } from '@react-google-maps/api';

function MapContainer (props) {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
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