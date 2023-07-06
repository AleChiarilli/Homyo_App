import React, { useState } from "react";
import house from "../../img/house.png";

export const Cardspaces = (props) => {
  const [editing, setEditing] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [poblacion, setPoblacion] = useState("");
  const [dormitorios, setDormitorios] = useState("2");
  const [salon, setSalon] = useState("2");
  const [cocina, setCocina] = useState("2");
  const [banos, setBanos] = useState("2");
  const [terrazaPatio, setTerrazaPatio] = useState("2");
  const [jardin, setJardin] = useState("No");
  const [ninos, setNinos] = useState("2");
  const [animales, setAnimales] = useState("2");

  const handleEdit = () => {
    setEditing(!editing);
  };

  return (
    <div className="mb-4">
      <p className="p-4 font-bold text-black text-md text-center dark:text-white">
        Nombre espacio
      </p>
      <div className="p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700 flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <img
            className="object-cover rounded-full h-96 md:h-auto"
            src={house}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col text-center justify-between p-4 leading-normal">
              <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                Dirección
              </h5>
              {editing ? (
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded"
                />
              ) : (
                <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                  {props.address}
                </h5>
              )}
            </div>
            <div className="flex flex-col text-center justify-between p-4 leading-normal">
              <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                Código Postal
              </h5>
              {editing ? (
                <input
                  type="text"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded"
                />
              ) : (
                <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                  {props.postalCode}
                </h5>
              )}
            </div>
            <div className="flex flex-col text-center justify-between p-4 leading-normal">
              <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                Nombre
              </h5>
              {editing ? (
                <input
                  type="text"
                  value={codigoPostal}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded"
                />
              ) : (
                <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                  {props.name}
                </h5>
              )}
            </div>
            <div className="flex flex-col text-center justify-between p-4 leading-normal">
              <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                Ciudad
              </h5>
              {editing ? (
                <input
                  type="text"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded"
                />
              ) : (
                <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                  {props.city}
                </h5>
              )}
            </div>
            <div className="flex flex-col text-center justify-between p-4 leading-normal">
              <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                Descripción
              </h5>
              {editing ? (
                <input
                  type="text"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded"
                />
              ) : (
                <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
                  {props.description}
                </h5>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleEdit}
            >
              {editing ? "Guardar" : "Editar"}
            </button>
            <button className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
