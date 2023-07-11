import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'


export const SimpleMap = ({homes}) => {
  const infoUser = homes.map((home) => {
    return {
      direccion: [home.latitude, home.longitude]
    }
  }
  )

  const position = [40.703045928773584, 6.49209788327242 ]
  return (
    <>
      <MapContainer center={position} zoom={6} scrollWheelZoom={true} id="map" style={{ zIndex: "1" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {infoUser.map((data, index) => (
          <Marker position={data.direccion} key={index}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>)
        )}
      </MapContainer>
    </>
  );
}