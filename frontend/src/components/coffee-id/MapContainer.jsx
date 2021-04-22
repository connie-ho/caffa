import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import classes from "./Coffee.module.scss";

function MapContainer(props) {
  const { name, latitude, longitude, distance } = props;

  const locations = [
    {
      name: name,
      location: {
        lat: latitude,
        lng: longitude,
      },
      distance: distance,
    },
  ];

  const mapStyles = {
    width: "100%",
    flex: 1,
  };

  const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };

  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };

  return (
    <LoadScript googleMapsApiKey={'AIzaSyClbwH6heqD9v7MdFgjnCt9W3-NVvG5RQc'}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {locations.map((item) => {
          return (
            <Marker
              key={item.name}
              position={item.location}
              onClick={() => onSelect(item)}
            />
          );
        })}
        {selected.location && (
          <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <p className={classes["map-info"]}>
              {selected.name} is {selected.distance} km away from you!{" "}
            </p>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
