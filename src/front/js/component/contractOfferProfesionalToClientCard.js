import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import avatar from "../../img/avatar.png";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";

export const Contractofferprofesionaltoclientcard = ({ start, end, name, total_price, contract_id, home_post_id }) => {
  const { actions, store } = useContext(Context);
  const acceptContract = async () => {

    await actions.updateContract({ "job_status": "ACEPTADO", "payment_status": "PENDIENTE" }, contract_id);
    // // cambia el estado visible para que otros profesionales no lo vean ya que fue aceptado por el cliente 
    await actions.updateHomePost({ "is_visible": false }, home_post_id);

  }
  const deleteOffer = async () => {
    await actions.deleteOffer(contract_id)
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
              Fecha:
            </div>
            <div className="text-center px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
              hora inicio:{start}

            </div>
            <div className="text-center px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
              hora final: {end}

            </div>
            <div className="text-center px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">

            </div>
            <div className="text-center px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
              Precio:{total_price}
            </div>
          </div>
          <h3 className="font-black text-gray-800 dark:text-white md:text-3xl text-xl">{name}</h3>
          <p className="md:text-lg text-gray-500 dark:text-white text-base">Servicios Contratados</p>

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

          <div className="text-right">
            <button
              type="button"
              onClick={() => acceptContract()}
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Acepta y paga el contrato
            </button>
            <button
              data-modal-target="authenticationModal6"
              data-modal-toggle="authenticationModal6"
              type="button"
              className="ml-3 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={deleteOffer}
            >
              Rechazar oferta
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
