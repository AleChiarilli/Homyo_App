import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'


export const SimpleMap = ({ homes }) => {

  const position = [40.4165000, -3.1]
  console.log(homes);
  return (
    <>
      <MapContainer center={position} zoom={10} scrollWheelZoom={true} id="map" style={{ zIndex: "1" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {homes.map((home, index) => (
          <Marker position={[home.latitude, home.longitude]} key={index}>
            <Popup>
              <p>{home.home_name}</p>
              <p>Dirección: {home.home_address}</p>
              <p>Horas:{home.time_difference}</p>
            </Popup>
          </Marker>)
        )}
      </MapContainer>
    </>
  );
}