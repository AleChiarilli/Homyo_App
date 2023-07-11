import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachWeekOfInterval, isSameMonth, startOfWeek, endOfWeek, eachDayOfInterval, getDay } from "date-fns";
import { es } from "date-fns/locale"; // Importar la configuración local en español
import avatar from "../../img/avatar.png";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";

export const Cardprofilepro = (props) => {

    const { store, actions } = useContext(Context);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [reservations, setReservations] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [hourDifference, setHourDifference] = useState(0);
    const [homeNames, setHomeNames] = useState([]);
    const [selectedHome, setSelectedHome] = useState("");


    const handleStartingTimeChange = (event) => {
        const time = event.target.value;
        setStartTime(time);
    };

    const handleEndTimeChange = (event) => {
        const time = event.target.value;
        setEndTime(time);
    };

    useEffect(() => {
        calculateHourDifference(startTime, endTime);
    }, [startTime, endTime]);

    const calculateHourDifference = (start, end) => {
        const startDateTime = new Date(start);
        const endDateTime = new Date(end);
        const differenceInMilliseconds = endDateTime - startDateTime;
        const hourDifference = Math.abs(differenceInMilliseconds / (1000 * 60 * 60));
        setHourDifference(hourDifference);
        setFinalPrice(hourDifference * props.hourly_rate)
    };



    const addReservation = () => {
        const newReservation = {
            day: selectedDay,
            month: selectedMonth,
            startTime: startTime,
            endTime: endTime,
        };
        setReservations([...reservations, newReservation]);
        setShowModal(false);
        setSelectedDay(1);
        setSelectedMonth(0);
        setStartTime("");
        setEndTime("");

        const selectedHomeFull = store.homes.find(home => home.name === selectedHome)
        actions.createReservation({
            home_id: selectedHomeFull.id,
            pro_profile_id: props.id,
            total_price: finalPrice,
            finishing_time: endTime,
            starting_time: startTime,
        })
    };

    useEffect(() => {
        // Obtén los nombres de las casas almacenados en el localStorage
        const storedHomeNames = store.homes.map((home) => home.name);
        setHomeNames(storedHomeNames);
    }, []);

    const handleHomeSelection = (event) => {
        const selectedOption = event.target.value;
        setSelectedHome(selectedOption);
        // Hacer lo que necesites con el nombre de la casa seleccionada
        console.log("Casa seleccionada:", selectedOption);
    };


    return (
        <div className="w-full flex flex-col justify-center mb-3">
            <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 mx-auto border border-white bg-white mt-auto">
                <div className="md:w-1/4  bg-white grid place-items-center">
                    <img src={avatar} className="rounded-full" />
                </div>
                <div className="md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                    <div className="flex justify-between item-center">
                        <h3 className="font-black text-gray-800 md:text-3xl text-xl">{props.username} Antonio</h3>
                        <div className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-800 hidden md:block">
                            <p>{props.hourly_rate} €/hora</p>
                        </div>
                    </div>
                    <p className="md:text-lg text-gray-500 text-base">{props.description}</p>
                    <div className="flex justify-center mt-3">
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Añadir Reserva
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 text-center">
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={() => setShowModal(false)} />
                    <div className="relative">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Contratar al profesional</h2>
                            <div className="mb-4">
                                <div className="flex items-center">
                                    <select
                                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={selectedHome} onChange={handleHomeSelection}>
                                        <option value="">Seleccionar casa</option>
                                        {homeNames.map((homeName) => (
                                            <option key={homeName} value={homeName}>
                                                {homeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <textarea
                                    id="comment"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Explica las tareas a realizar"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
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
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Duración del servicio:</label>
                                    <input
                                        type="text"
                                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={isNaN(hourDifference) ? '' : hourDifference}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Precio total:</label>
                                <p
                                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {finalPrice ? finalPrice : 0} €
                                </p>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={addReservation}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Añadir Reserva
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-3"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>

    );
};
