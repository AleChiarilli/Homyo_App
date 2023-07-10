import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'


export const SimpleMap = ({homes}) => {
  const infoUser = homes.map((home) => {
    return {
      direccion: [home.latitude, home.longitude]
    }
  }
  )

  const position = [40.41697083605351, -3.704247655138492]
  return (
    <>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} id="map" style={{ zIndex: "1" }}>
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