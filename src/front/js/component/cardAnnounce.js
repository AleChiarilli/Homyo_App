import React from "react";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import house from "../../img/house.png";

export const CardAnnounce = ({description, address}) => {
  return (
    <div className="w-full flex flex-col justify-center mt-10 mb-3 dark:bg-gray-700">
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 bg-white dark:bg-gray-800 mx-auto border border-white">
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 grid place-items-center">
          <img src={house} className="rounded-full" alt="Casa" />
        </div>
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xl font-medium text-gray-800 dark:text-white hidden md:block">
              Fecha: 25/12/2023
            </div>
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xl font-medium text-gray-800 dark:text-white hidden md:block">
              Hora Inicio: 14:00
            </div>
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xl font-medium text-gray-800 dark:text-white hidden md:block">
              Hora fin: 16:00
            </div>
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xl font-medium text-gray-800 dark:text-white hidden md:block">
              Horas: 4
            </div>
          </div>
          <h3 className="font-black text-gray-800 dark:text-white md:text-3xl text-xl">Casa de la playa</h3>
          <p>{address}</p>
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
                        alt="cuidado de niños"
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
          <div>
            {/* <textarea rows="3" className="p-4 w-full text-gray-500 dark:text-white rounded-xl resize-none" placeholder="Mensaje del cliente detallando el servicio"></textarea> */}
            <p rows="3" className="p-4 w-full text-gray-500 dark:text-white rounded-xl resize-none">{description}</p>
          </div>
          <div className="text-right">
            <button
              data-modal-target="authenticationModal9"
              data-modal-toggle="authenticationModal9"
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Mandar oferta!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


