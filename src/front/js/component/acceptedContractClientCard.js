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
      <h3 className="font-black text-center text-gray-800 dark:text-white md:text-3xl text-xl">{contract.pro_profile_id.name}</h3>
      <div className="w-full relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 bg-white dark:bg-gray-700 mx-auto border border-white">
        <div className="w-full md:w-1/4 bg-white dark:bg-gray-700 grid place-items-center">
          <img src={avatar} className="rounded-full" alt="Avatar" />
        </div>
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-700 flex flex-col space-y-2 p-3">
          <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
            <b>Lugar</b>: {contract.home_id.name}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
              <b>Teléfono</b>: {contract.pro_profile_id.phone_number}
            </div>
            <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
              <b>Inicio</b>: {contract.finishing_time}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
             <b>Fin</b>: {contract.finishing_time}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
            <b>Horas</b>: {contract.time_difference}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
            <b>Precio final</b>: {contract.total_price} €
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
            <b>Descripcion de servicio solicitado</b>: {contract.comment}
          </div>
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
    </div >
  );
};
