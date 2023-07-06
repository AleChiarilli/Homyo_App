import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import { Cardannounces } from "../component/cardAnnounces";

export const Profileclientshowannounces = () => {
    const { store } = useContext(Context);
    const skillList = {
        "limpieza": {
            "nameSkill": "Limpieza",
            "imageSkill": limpieza
        },
        "jardineria": {
            "nameSkill": "Jardineria",
            "imageSkill": jardineria
        },
        "cuidadodeninos": {
            "nameSkill": "Cuidado de niños",
            "imageSkill": niños
        },
        "cuidadodeanimales": {
            "nameSkill": "Cuidado de animales",
            "imageSkill": animales
        },
        "cocina": {
            "nameSkill": "Cocina",
            "imageSkill": chef
        },
    }

    const [seleccionados, setSeleccionados] = useState([]);

    const handleSeleccionar = (id) => {

        setSeleccionados([...seleccionados, id]);
    };

    return (

        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <div className="md:h-screen pt-2 pb-24 pl-2 pr-2 md:overflow-auto md:pt-0 md:pr-0 md:pl-0 md:custom-scrollbar">
                <div className="flex flex-col flex-wrap sm:flex-row ">
                    <div className="w-full">
                        <div className="mb-4">
                            <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                                <div className="mx-0 mb-4">
                                    <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                                        Crear Anuncio
                                    </p>
                                    <div className="dark:bg-gray-700">
                                        <p className="p-4 text-black text-md text-center dark:text-white">
                                            ¿Donde necesitas el servicio?
                                        </p>
                                        <select
                                            id="espacio"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option defaultValue>Elige el lugar</option>
                                            <option value="1">Casa Principal</option>
                                            <option value="2">Casa de la Playa</option>
                                            <option value="3">Casa de los Abuelos</option>
                                        </select>
                                        <p className="p-4 text-black text-md text-center dark:text-white">
                                            ¿Qué servicios necesitas?
                                        </p>
                                        <div className="flex flex-wrap justify-center text-center mt-5">
                                            <ul className="p-4 flex flex-wrap justify-center">
                                                {store.skills.map((skill) => {
                                                    return (
                                                        <>
                                                            <li className="w-full md:w-auto">
                                                                <button
                                                                    type="button"
                                                                    id={skillList[skill.name].nameSkill}
                                                                    className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 my-1 md:my-0 text-center w-full md:w-auto hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("limpieza") ? "bg-indigo-100 text-blue-700" : ""
                                                                        }`}
                                                                    onClick={() => handleSeleccionar(skill.id)}
                                                                >
                                                                    <div className="flex-row gap-4 flex justify-center items-center">
                                                                        <div className="flex-shrink-0">
                                                                            <a href="#" className="relative block">
                                                                                <img
                                                                                    alt={skillList[skill.name].nameSkill}
                                                                                    src={skillList[skill.name].imageSkill}
                                                                                    className="mx-auto object-fit rounded-full h-8 w-8"
                                                                                />
                                                                            </a>
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-lg font-medium text-gray-600 dark:text-white">
                                                                                {skillList[skill.name].nameSkill}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            </li>
                                                        </>
                                                    )
                                                })}
                                                {/* <li className="w-full md:w-auto">
                                                    <button
                                                        type="button"
                                                        id="limpieza"
                                                        className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 my-1 md:my-0 text-center w-full md:w-auto hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("limpieza") ? "bg-indigo-100 text-blue-700" : ""
                                                            }`}
                                                        onClick={() => handleSeleccionar("limpieza")}
                                                    >
                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
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
                                                    </button>
                                                </li>
                                                <li className="w-full md:w-auto">
                                                    <button
                                                        type="button"
                                                        id="cocina"
                                                        className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 my-1 md:my-0 text-center w-full md:w-auto hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("cocina") ? "bg-indigo-100 text-blue-700" : ""
                                                            }`}
                                                        onClick={() => handleSeleccionar("cocina")}
                                                    >
                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
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
                                                    </button>
                                                </li>
                                                <li className="w-full md:w-auto">
                                                    <button
                                                        type="button"
                                                        id="niños"
                                                        className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 my-1 md:my-0 text-center w-full md:w-auto hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("niños") ? "bg-indigo-100 text-blue-700" : ""
                                                            }`}
                                                        onClick={() => handleSeleccionar("niños")}
                                                    >
                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
                                                                    <img
                                                                        alt="cuidado de niños"
                                                                        src={niños}
                                                                        className="mx-auto object-fit rounded-full h-8 w-8"
                                                                    />
                                                                </a>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-lg font-medium text-gray-600 dark:text-white">
                                                                    Cuidado de niños
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </li>
                                                <li className="w-full md:w-auto">
                                                    <button
                                                        type="button"
                                                        id="animales"
                                                        className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 my-1 md:my-0 text-center w-full md:w-auto hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("animales") ? "bg-indigo-100 text-blue-700" : ""
                                                            }`}
                                                        onClick={() => handleSeleccionar("animales")}
                                                    >
                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
                                                                    <img
                                                                        alt="cuidado de animales"
                                                                        src={animales}
                                                                        className="mx-auto object-fit rounded-full h-8 w-8"
                                                                    />
                                                                </a>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-lg font-medium text-gray-600 dark:text-white">
                                                                    Cuidado de animales
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </li>
                                                <li className="w-full md:w-auto">
                                                    <button
                                                        type="button"
                                                        id="jardineria"
                                                        className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 my-1 md:my-0 text-center w-full md:w-auto hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("jardineria") ? "bg-indigo-100 text-blue-700" : ""
                                                            }`}
                                                        onClick={() => handleSeleccionar("jardineria")}
                                                    >
                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
                                                                    <img
                                                                        alt="jardineria"
                                                                        src={jardineria}
                                                                        className="mx-auto object-fit rounded-full h-8 w-8"
                                                                    />
                                                                </a>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-lg font-medium text-gray-600 dark:text-white">
                                                                    Jardineria
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </li> */}
                                            </ul>
                                        </div>
                                        <p className="p-4 text-black text-md text-center dark:text-white">
                                            Dinos la fecha
                                        </p>
                                        <textarea
                                            id="date"
                                            rows="1"
                                            defaultValue=""
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                        ></textarea>

                                        <p className="p-4 text-black text-md text-center dark:text-white">
                                            Dinos la hora de inicio
                                        </p>
                                        <textarea
                                            id="hour"
                                            rows="1"
                                            defaultValue=""
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                        ></textarea>

                                        <p className="p-4 text-black text-md text-center dark:text-white">
                                            Dinos la hora de fin
                                        </p>
                                        <textarea
                                            id="endHour"
                                            rows="1"
                                            defaultValue=""
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                        ></textarea>

                                        <p className="p-4 text-black text-md text-center dark:text-white">
                                            Especifica las tareas
                                        </p>
                                        <textarea
                                            id="tasks"
                                            rows="4"
                                            defaultValue=""
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=""
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Publicar Anuncio
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mx-0 mb-4">
                            <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                                Tus Anuncios{" "}
                            </p>
                            <Cardannounces />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
