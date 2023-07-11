import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import avatar from "../../img/avatar.png";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import house from "../../img/house.png";

export const Contractofferclienttoprofesionaldcard = ({ contract }) => {
    const [isModalOpen10, setIsModalOpen10] = useState(false);

    // const toggleModal10 = () => {
    //     setIsModalOpen10(!isModalOpen10);
    // };

    // const hideModal10 = () => {
    //     setIsModalOpen10(false);
    // };

    const acceptAndPayContract = () => {
        actions.acceptAndPayContract(contract.id)
    }


    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getMyContractsPro()
        console.log(store.myContracts);
    }, [])


    return (
        <div className="w-full flex flex-col p-3 justify-center mt-10 mb-3">
            <h3 className="text-center font-black text-gray-800 md:text-3xl text-xl">Contratado por: {contract.cmr_profile_id.name}</h3>
            <div className="w-full relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 mx-auto border border-white bg-white">
                <div className="w-full md:w-1/3 bg-white grid place-items-center">
                    <img src={house} className="rounded-full" />
                </div>
                <div className="w-full md:w-2/3 bg-white dark:bg-gray-700 flex flex-col space-y-2 p-3">
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
                        <b>Lugar</b>: {contract.home_id.name}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
                        <b>Dirección</b>: {contract.home_id.address}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
                        <b>Inicio</b>: {contract.starting_time}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
                        <b>Fin</b>: {contract.finishing_time}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
                        <b>Horas</b>: {contract.time_difference}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
                        <b>Precio final</b>: {contract.total_price} €
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white hidden md:block">
                        <b>Detalle del contrato</b>: {contract.comment}
                    </div>
                    <div className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Contrato {contract.job_status} de aceptar
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            data-modal-target="authenticationModal10"
                            data-modal-toggle="authenticationModal10"
                            type="button"
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={acceptAndPayContract}
                        >
                            Aceptar el contrato
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
