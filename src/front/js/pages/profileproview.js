import React, { useState } from "react";
import { Cardvaloracionesporusuario } from "../component/cardvaloracionesporusuario";
import "../../styles/home.css";
import avatar from "../../img/avatar.png";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";

export const Profileproview = () => {
  const [isModalOpen8, setIsModalOpen8] = useState(false);

  const toggleModal8 = () => {
      setIsModalOpen8(!isModalOpen8);
  };

  const hideModal8 = () => {
      setIsModalOpen8(false);
  };


  return (
    <div className="grid grid-cols-2  max-w-screen-xl flex items-start justify-center py-12 px-4 mx-auto mt-20">
      <div className="bg-white grid place-items-center">
        <img src={avatar} className="rounded-full" />
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg p-6 mx-auto bg-white rounded-2xl shadow-xl flex flex-col">
            <div className="flex justify-between pb-4">
              <div className="-rotate-90 cursor-pointer">
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.001 6L6.00098 1L1.00098 6"
                    stroke="black"
                    stroke-opacity="0.4"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className="uppercase text-sm font-semibold text-gray-600">
                january - 2022
              </span>
              <div className="rotate-90 cursor-pointer">
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.001 6L6.00098 1L1.00098 6"
                    stroke="black"
                    stroke-opacity="0.4"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
              <div className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-red-500 text-red-500 shadow-md">
                sun
              </div>
              <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                mon
              </span>
              <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                tue
              </span>
              <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                wed
              </span>
              <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                thu
              </span>
              <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                fri
              </span>
              <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                sat
              </span>
            </div>
            {/* Calendario */}
            <div className="flex justify-between font-medium text-sm pb-2">
              {/* Días del mes */}
              {/* Aquí va el código para los días del mes */}
            </div>
            <button
                     data-modal-target="authenticationModal8"
                     data-modal-toggle="authenticationModal8"
                     type="button"
                     onClick={toggleModal8}
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reservar
            </button>


            {isModalOpen8 && (
                <div tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="py-3 sm:max-w-xl sm:mx-auto">
                        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                            <div className="px-12 py-5">
                                <h2 className="text-gray-800 text-3xl font-semibold">Deja una reseña</h2>
                            </div>
                            <div className="bg-gray-200 w-full flex flex-col items-center">
                                <div className="flex flex-col items-center py-6 space-y-3">
                                    <span className="text-lg text-gray-800">Elige el espacio</span>
                                    <div className="flex space-x-3">
                                                        <select id="espacio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                            <option selected>Elige espacio</option>
                                                            <option value="1">Casa de la playa</option>
                                                            <option value="2">Casa de los abuelos</option>
                                                            <option value="3">Casa principal</option>
                                                        </select>
                                    </div>
                                </div>
                                <div className="w-3/4 flex flex-col">
                                    <textarea rows="3" className="p-4 text-gray-500 rounded-xl resize-none">Escribe las indicaciones necesarias para que el servicio se lleve a cabo</textarea>
                                    <button className="py-3 my-8 text-lg bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-xl text-white"
                                        onClick={hideModal8}
                                    >Reservar y Pagar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}






          </div>
        </div>
      </div>
      <div className="ml-3">
        <div className="border-b border-gray-200 pb-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            Antonio
          </h1>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-gray-600 font-bold text-m ml-1">
                4.96
                <span className="text-gray-500 font-normal">(76 reviews)</span>
              </p>
            </div>
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xl font-medium text-gray-800 hidden md:block">
              13€/hora
            </div>
          </div>
        </div>

        <div className="py-4 border-b border-gray-200">
          <div className="flex justify-center">
            <ul className="grid grid-cols-3 gap-4">
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="limpieza"
                        src={limpieza}
                        className="mx-auto object-fit rounded-full h-8 w-8"
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Limpieza
                    </span>
                  </div>
                </div>
              </li>
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="cocina"
                        src={chef}
                        className="mx-auto object-fit rounded-full h-8 w-8"
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Cocina
                    </span>
                  </div>
                </div>
              </li>
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="cuidad de niños"
                        src={niños}
                        className="mx-auto object-fit rounded-full h-8 w-8 "
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Cuidado de niños
                    </span>
                  </div>
                </div>
              </li>
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="cuidado de animales"
                        src={animales}
                        className="mx-auto object-fit rounded-full h-8 w-8 "
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Cuidado de animales
                    </span>
                  </div>
                </div>
              </li>
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="jardineria"
                        src={jardineria}
                        className="mx-auto object-fit rounded-full h-8 w-8 "
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Jardineria
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
            Descripción de Antonio
          </p>
        </div>

      </div>
      <div className="col-start-1 col-end-3 ">
          <p className="text-center text-3xl font-bold text-gray-800  lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
            Valoraciones
          </p>
      <Cardvaloracionesporusuario />
      </div>
    </div>
  );
};
