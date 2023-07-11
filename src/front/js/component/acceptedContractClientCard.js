import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import avatar from "../../img/avatar.png";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";

export const Acceptedcontractclientcard = ({ contract }) => {
  const [isModalOpen6, setIsModalOpen6] = useState(false);

  const { actions, store } = useContext(Context);
  const toggleModal6 = () => {
    setIsModalOpen6(!isModalOpen6);
  };

  const hideModal6 = () => {
    setIsModalOpen6(false);
  };
  const deleteOffer = async () => {
    await actions.deleteOffer(contract.id)
  }
  return (
    <div className="w-full p-3 flex flex-col justify-center mt-10 mb-3 dark:bg-gray-800">
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 bg-white dark:bg-gray-700 mx-auto border border-white">
        <div className="w-full md:w-1/4 bg-white dark:bg-gray-700 grid place-items-center">
          <img src={avatar} className="rounded-full" alt="Avatar" />
        </div>
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-700 flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-gray-600 font-bold text-m ml-1">4.96</p>
            </div>
            <div className="text-center px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
              Nombre de sitio: {contract.home_id.name}
            </div>
            <div className="text-center px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
              Inicio: {contract.finishing_time}
            </div>
            <div className="text-center px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
              Fin: {contract.finishing_time}
            </div>
            <div className="text-center px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
              Horas: {contract.time_difference}
            </div>
            <div className="text-center px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
              Precio por hora: {contract.hourly_rate}
            </div>
            <div className="text-center px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
              Precio final: {contract.total_price}
            </div>
          </div>
          <h3 className="font-black text-gray-800 dark:text-white md:text-3xl text-xl">{contract.pro_profile_id.name}</h3>
          <div className="flex justify-center">
            <ul className="flex flex-wrap">
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="limpieza"
                        src={limpieza}
                        className="mx-auto object-fit rounded-full h-8 w-8 dark:bg-gray-800"
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
                        className="mx-auto object-fit rounded-full h-8 w-8 dark:bg-gray-800"
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
                        className="mx-auto object-fit rounded-full h-8 w-8 dark:bg-gray-800"
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
                        className="mx-auto object-fit rounded-full h-8 w-8 dark:bg-gray-800"
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
                        className="mx-auto object-fit rounded-full h-8 w-8 dark:bg-gray-800"
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
            <p>Descripcion de servicio solicitado: {contract.comment}</p>
          <div className="text-right">
            {contract.job_status == "Pendiente" ? (
              <div>
                <button className="text-white bg-red-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                >PENDIENTE DE APROBACION DEL PROFESIONAL</button>
                <button
                  data-modal-target="authenticationModal6"
                  data-modal-toggle="authenticationModal6"
                  type="button"
                  className="ml-3 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={deleteOffer}
                >
                  Eliminar Contracto
                </button>
              </div>
            ) : (
              <div>
                <button
                  data-modal-target="authenticationModal6"
                  data-modal-toggle="authenticationModal6"
                  type="button"
                  className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={toggleModal6}
                >
                  SERVICIO ACEPTADO
                </button>

              </div>

            )}
          </div>

        </div>
      </div>

      {/* Main modal 6 */}
      {
        isModalOpen6 && (
          <div
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="py-3 sm:max-w-xl sm:mx-auto">
              <div className="bg-white dark:bg-gray-800 min-w-1xl flex flex-col rounded-xl shadow-lg">
                <div className="px-12 py-5">
                  <h2 className="text-gray-800 dark:text-white text-3xl font-semibold">Deja una reseña</h2>
                </div>
                <div className="text-center dark:bg-gray-800 w-full flex flex-col items-center">
                  <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-lg text-gray-800 dark:text-white">Servicio Contratado</span>
                    <div className="flex space-x-3">
                      <svg className="w-12 h-12 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-12 h-12 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-12 h-12 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-12 h-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-12 h-12 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-3/4 flex flex-col">
                    <textarea rows="3" className="p-4 text-gray-500 dark:bg-gray-800 dark:text-white rounded-xl resize-none">
                      Deja un mensaje
                    </textarea>
                    <button
                      className="py-3 my-8 text-lg bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-xl text-white"
                      onClick={hideModal6}
                    >
                      Valora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};
