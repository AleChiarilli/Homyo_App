import React from "react";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import house from "../../img/house.png";

const iconsMap = { limpieza, animales, jardineria, niños, chef }

export const Cardannounces = ({ description, address, startingTime, finishingTime, name, timeDifference }) => {


  return (
    <div className="w-full flex flex-col justify-center mt-10 mb-3 dark:bg-gray-700">
      <h3 className="w-full font-black text-center text-gray-800 dark:text-white md:text-3xl text-xl">{name}</h3>
      <div className="w-full flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 bg-white dark:bg-gray-800 mx-auto border border-white">
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 grid place-items-center">
          <img src={house} className="rounded-full" alt="Casa" />
        </div>
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-700 flex flex-col space-y-2 p-3">
          <div className="text-left px-3 py-1 rounded-full text-xl text-gray-800 dark:text-white">
            Dirección: {address}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl text-gray-800 dark:text-white">
            Inicio: {startingTime}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl text-gray-800 dark:text-white">
            Fin: {finishingTime}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl text-gray-800 dark:text-white">
            Horas: {timeDifference}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl text-gray-800 dark:text-white">
            Detalle del servicio: {description}
          </div>
          <div className="flex flex-col justify-center mt-3">
            <button
              data-modal-target="authenticationModal9"
              data-modal-toggle="authenticationModal9"
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Borrar anuncio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  }  