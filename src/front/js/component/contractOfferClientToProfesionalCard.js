import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import avatar from "../../img/avatar.png";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import house from "../../img/house.png";

export const Contractofferclienttoprofesionaldcard = ({ start, end, total_price, name, contract_id, comment, home_id }) => {
    const [isModalOpen10, setIsModalOpen10] = useState(false);
    const { store, actions } = useContext(Context);
    const toggleModal10 = () => {
        setIsModalOpen10(!isModalOpen10);
    };

    const hideModal10 = () => {
        setIsModalOpen10(false);
    };

    const acceptContract = async () => {

        await actions.updateContract({ "job_status": "ACEPTADO", "payment_status": "PENDIENTE" }, contract_id);
        // // cambia el estado visible para que otros profesionales no lo vean ya que fue aceptado por el cliente 
        await actions.updateHomePost({ "is_visible": false }, home_post_id);

    }
    return (
        <div className="w-full flex flex-col p-3 justify-center mt-10 mb-3">
            <h3 className="text-center font-black text-gray-800 md:text-3xl text-xl">Ofertado por: {name}</h3>
            <div className="w-full relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 mx-auto border border-white bg-white">
                <div className="w-full md:w-1/3 bg-white grid place-items-center">
                    <img src={house} className="rounded-full" />
                </div>
                <div className="w-full md:w-2/3 bg-white dark:bg-gray-700 flex flex-col space-y-2 p-3">
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white">
                        <b>Inicio</b>:{start}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white">
                        <b>Fin</b>:{end}
                    </div>

                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white">
                        <b>Precio final</b>: {total_price} €
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white">
                        <b>Detalle del contrato</b>:  {comment}
                    </div>

                    <div className="text-right">
                        <button
                            data-modal-target="authenticationModal10"
                            data-modal-toggle="authenticationModal10"
                            type="button"
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={acceptContract}
                        >
                            Aceptar el contrato
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
