import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Cardspaces } from "../component/cardSpaces";

export const Profileclientshowspaces = () => {
  const { store } = useContext(Context);


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
                              placeholder=""
                            ></textarea>
                          </li>
                          <li>
                            <label
                              htmlFor="citySpace"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Ciudad
                            </label>
                            <textarea
                              id="citySpace"
                              rows="1"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder=""
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
                              id="addresSpace"
                              rows="1"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder=""
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
                              placeholder=""
                            ></textarea>
                          </li>
                          <li>
                            <label
                              htmlFor="dormitorios"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Dormitorios
                            </label>
                            <select
                              id="dormitorios"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>
                                Elige el número de dormitorios
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="+4">+4</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="salon"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Salón
                            </label>
                            <select
                              id="salon"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>
                                Elige el número de salones
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="+2">+2</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="cocina"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Cocina
                            </label>
                            <select
                              id="cocina"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>
                                Elige el número de cocinas
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="+2">+2</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="banos"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Baños
                            </label>
                            <select
                              id="banos"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>
                                Elige el número de baños
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="+2">+3</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="terraza"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Terraza
                            </label>
                            <select
                              id="terraza"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>
                                Elige el número de terrazas
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="+2">+3</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="jardin"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Jardín
                            </label>
                            <select
                              id="jardin"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>Jardín</option>
                              <option value="si">Sí</option>
                              <option value="no">No</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="niños"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Niños
                            </label>
                            <select
                              id="niños"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>Niños</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="+2">+3</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="animales"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Animales
                            </label>
                            <select
                              id="animales"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>Animales</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="+2">+3</option>
                            </select>
                          </li>
                        </ul>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                    <Cardspaces />
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
};
