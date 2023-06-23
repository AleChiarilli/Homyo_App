import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'


export const SimpleMap = () => {
  const infoUser = [
  { name: "Neil Sims", descripcion: "hago cosas", servicios: "Servicios que ofrece", reseñas: 2, email: "asd@gmail.com", direccion: [51.505, -0.09] },
  { name: "Bonnie Green", descripcion: "hago cosas", servicios: "Servicios que ofrece", reseñas: 2, email: "asd@gmail.com", direccion: [51.51, -0.09] },
  { name: "Jese Leos", descripcion: "hago cosas", servicios: "Servicios que ofrece", reseñas: 2, email: "asd@gmail.com", direccion: [51.52, -0.09] },
  {name:"Alejandro Chiarilli", descripcion: "NO hago cosas", servicios: "besitos", reseñas: 2, email: "asd@gmail.com", direccion: [51.52, -0.10]},
  {name:"Alejandro Chiarilli", descripcion: "NO hago cosas", servicios: "besitos", reseñas: 2, email: "asd@gmail.com", direccion: [51.53, -0.11]}
]

  const position = [51.505, -0.09]
  return (
    <>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} id="map">
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