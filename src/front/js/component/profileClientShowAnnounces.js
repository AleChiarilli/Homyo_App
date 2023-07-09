import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import { Cardannounces } from "../component/cardAnnounces";

export const Profileclientshowannounces = () => {
    const { store, actions } = useContext(Context);
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

    useEffect(() => {
        actions.getSkills()
    }, []);

    useEffect(() => {
        actions.getMyHomes()
    }, [])


    useEffect(() => {
        // Obtén los nombres de las casas almacenados en el localStorage
        const storedHomeNames = JSON.parse(localStorage.getItem("home"));
        setHomeNames(storedHomeNames);
    }, []);

    useEffect(() => {
        calculateHourDifference(startTime, endTime);
    }, [startTime, endTime]);

    const [seleccionados, setSeleccionados] = useState([]);
    const [homeNames, setHomeNames] = useState([]);
    const [selectedHome, setSelectedHome] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [hourDifference, setHourDifference] = useState(0);
    const [description, setDescription] = useState("");


    const handleHomeSelection = (event) => {
        const selectedHome = event.target.value;
        setSelectedHome(selectedHome);
        // Hacer lo que necesites con el nombre de la casa seleccionada
        console.log("Casa seleccionada:", selectedHome);
    };

    const handleStartingTimeChange = (event) => {
        const time = event.target.value;
        setStartTime(time);
    };

    const handleEndTimeChange = (event) => {
        const time = event.target.value;
        setEndTime(time);
    };

    const handleSeleccionar = (id) => {

        setSeleccionados([...seleccionados, id]);
    };

    const calculateHourDifference = (start, end) => {
        const startDateTime = new Date(start);
        const endDateTime = new Date(end);
        const differenceInMilliseconds = endDateTime - startDateTime;
        const hourDifference = Math.abs(differenceInMilliseconds / (1000 * 60 * 60));
        setHourDifference(hourDifference);
    };

    const submitPost = async (e) => {
        e.preventDefault()
        await actions.submitPost({home_id: selectedHome, description: description, starting_time: startTime, finishing_time: endTime })
    }


    return (

        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <div className="md:h-screen pt-2 pb-24 pl-2 pr-2 md:overflow-auto md:pt-0 md:pr-0 md:pl-0 md:custom-scrollbar">
                <div className="flex flex-col flex-wrap sm:flex-row ">
                    <div className="w-full">
                        <div className="mb-4">
                            <form
                            onSubmit={submitPost}>
                                <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                                    <div className="mx-0 mb-4">
                                        <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                                            Crear Anuncio
                                        </p>
                                        <div className="dark:bg-gray-700">
                                            <p className="p-4 text-black text-md text-center dark:text-white">
                                                ¿Donde necesitas el servicio?
                                            </p>
                                            <select className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={selectedHome} onChange={handleHomeSelection}>
                                                <option value="">Seleccionar casa</option>
                                                {store.myHomes.map((home, index) => (
                                                    <option key={index} value={home.id}>
                                                        {home.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="p-4 text-black text-md text-center dark:text-white">
                                                ¿Qué servicios necesitas?
                                            </p>
                                            <div className="flex flex-wrap justify-center text-center mt-5">
                                                <ul className="p-4 flex flex-wrap justify-center">
                                                    {store.skills?.map((skill) => {
                                                        console.log(skillList[skill.name].imageSkill);
                                                        return (
                                                            <>
                                                                <li className="w-full md:w-auto">
                                                                    <button
                                                                        type="button"
                                                                        id={skill.id}
                                                                        className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 my-1 md:my-0 text-center w-full md:w-auto hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("limpieza") ? "bg-indigo-100 text-blue-700" : ""
                                                                            }`}
                                                                        onClick={() => handleSeleccionar(skill.id)}
                                                                    >
                                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                                            <div className="flex-shrink-0">
                                                                                <a href="#" className="relative block">
                                                                                    <img
                                                                                        alt={skill.name}
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
                                                </ul>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Hora de inicio:</label>
                                                <input
                                                    type="datetime-local"
                                                    id="starting-time"
                                                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={startTime}
                                                    onChange={handleStartingTimeChange}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">Hora de fin:</label>
                                                <input
                                                    type="datetime-local"
                                                    id="end-time"
                                                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={endTime}
                                                    onChange={handleEndTimeChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Diferencia en horas:</label>
                                                <input
                                                    type="text"
                                                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={hourDifference}
                                                    readOnly
                                                />
                                            </div>

                                            <p className="p-4 text-black text-md text-center dark:text-white">
                                                Especifica las tareas
                                            </p>
                                            <textarea
                                                id="tasks"
                                                onChange={(e) => {setDescription(e.target.value)}}
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
                            </form>
                        </div>
                        <div className="mx-0 mb-4">
                            <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                                Tus Anuncios{" "}
                            </p>
                            {store.homePost.map((item, index) => (
                                <Cardannounces key={index} timeDifference={item.time_difference} description={item.description}
                                    address={item.home_address} startingTime={item.starting_time} finishingTime={item.finishing_time}
                                    name={item.home_name} skills={item.skills} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
