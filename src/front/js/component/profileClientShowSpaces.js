import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Cardspaces } from "../component/cardSpaces";

export const Profileclientshowspaces = () => {

  const [nameSpace, setNameSpace] = useState([]);
  const [addressSpace, setAddressSpace] = useState([]);
  const [nameCity, setNameCity] = useState([]);
  const [postalCodeSpace, setPostalCodeSpace] = useState([]);
  const [DescriptionSpace, setDescriptionSpace] = useState([]);

  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.getMyHomes()
  })
  const submitHome = async () => {
    await actions.addHome({ name:nameSpace, address:addressSpace, city:nameCity, postal_code:postalCodeSpace, description:DescriptionSpace });
    // await actions.addHome({ name, address, city, postal_code, description });
  };


  return (

    <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
      <div className="md:h-screen pt-2 pb-24 pl-2 pr-2 md:overflow-auto md:pt-0 md:pr-0 md:pl-0 md:custom-scrollbar">
        <div className="flex flex-col flex-wrap sm:flex-row ">
          <div className="w-full">
            <div className="mb-4">
              <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                <div className="mx-0 mb-4">
                  <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                    Crear Espacio
                  </p>
                  <ul className="p-4">
                    <li>
                      <label
                        htmlFor="nameSpace"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nombre
                      </label>
                      <textarea
                        id="nameSpace"
                        rows="1"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event) => { setNameSpace(event.target.value) }}
                      ></textarea>
                    </li>
                    <li>
                      <label
                        htmlFor="addresSpace"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Dirección
                      </label>
                      <textarea
                        id="addressSpace"
                        rows="1"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event) => { setAddressSpace(event.target.value) }}
                      ></textarea>
                    </li>
                    <li>
                      <label
                        htmlFor="nameSpace"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Ciudad
                      </label>
                      <textarea
                        id="nameCity"
                        rows="1"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event) => { setNameCity(event.target.value) }}
                      ></textarea>
                    </li>
                    <li>
                      <label
                        htmlFor="postalCodeSpace"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Codigo Postal
                      </label>
                      <textarea
                        id="postalCodeSpace"
                        rows="1"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event) => { setPostalCodeSpace(event.target.value) }}
                      ></textarea>
                    </li>
                    <li>
                      <label
                        htmlFor="descriptionCodeSpace"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Descripción
                      </label>
                      <textarea
                        id="DescriptionSpace"
                        rows="1"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event) => { setDescriptionSpace(event.target.value) }}
                      ></textarea>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => { submitHome() }}
                  >
                    Guardar Espacio
                  </button>
                </div>
              </div>
            </div>
            <div className="mx-0 mb-4">
              <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                Mis Espacios{" "}
              </p>
              {store.myHomes && store.myHomes.map((home) => {
                return (
                  <Cardspaces
                  address={home.address}
                  city={home.city}
                  description={home.description}
                  name={home.name}
                  postalCode={home.postal_code}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
