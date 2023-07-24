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
      <h3 className="font-black text-center text-gray-800 dark:text-white md:text-3xl text-xl">{name}</h3>
      <div className="w-full relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 bg-white dark:bg-gray-700 mx-auto border border-white">
        <div className="w-full md:w-1/4 bg-white dark:bg-gray-700 grid place-items-center">
          <img src={avatar} className="rounded-full" alt="Avatar" />
        </div>
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-700 flex flex-col space-y-2 p-3">
          <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
            <b>Inicio del servicio</b>: {start}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
            <b>Final del servicio</b>: {end}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
            <b>Precio total</b>: {total_price} €
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={() => acceptContract()}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{ transition: 'transform 0.2s ease-in-out', willChange: 'transform' }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
           >
              Aceptar oferta
            </button>
            <button
              data-modal-target="authenticationModal6"
              data-modal-toggle="authenticationModal6"
              type="button"
              className="ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={deleteOffer}
              style={{ transition: 'transform 0.2s ease-in-out', willChange: 'transform' }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Rechazar oferta
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};
