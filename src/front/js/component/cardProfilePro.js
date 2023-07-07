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




export const Cardprofilepro = (props, professional) => {

    const { store, actions } = useContext(Context);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [reservations, setReservations] = useState([]);

    const [hourDifference, setHourDifference] = useState(0);

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
    };

    const months = [
        { value: 0, label: "Enero" },
        { value: 1, label: "Febrero" },
        { value: 2, label: "Marzo" },
        { value: 3, label: "Abril" },
        { value: 4, label: "Mayo" },
        { value: 5, label: "Junio" },
        { value: 6, label: "Julio" },
        { value: 7, label: "Agosto" },
        { value: 8, label: "Septiembre" },
        { value: 9, label: "Octubre" },
        { value: 10, label: "Noviembre" },
        { value: 11, label: "Diciembre" },
    ];

    const previousMonth = () => {
        setCurrentDate((prevDate) => subMonths(prevDate, 1));
    };

    const nextMonth = () => {
        setCurrentDate((prevDate) => addMonths(prevDate, 1));
    };

    const startOfCurrentMonth = startOfMonth(currentDate);
    const endOfCurrentMonth = endOfMonth(currentDate);
    const weeksOfMonth = eachWeekOfInterval(
        {
            start: startOfCurrentMonth,
            end: endOfCurrentMonth,
        },
        { weekStartsOn: 0 } // Comenzar la semana en domingo
    );

    const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]; // Domingo como primer día

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
    };

    const [homeNames, setHomeNames] = useState([]);
    const [selectedHome, setSelectedHome] = useState("");

    useEffect(() => {
        // Obtén los nombres de las casas almacenados en el localStorage
        const storedHomeNames = JSON.parse(localStorage.getItem("home"));
        setHomeNames(storedHomeNames);
    }, []);

    const handleHomeSelection = (event) => {
        const selectedHome = event.target.value;
        setSelectedHome(selectedHome);
        // Hacer lo que necesites con el nombre de la casa seleccionada
        console.log("Casa seleccionada:", selectedHome);
    };


    return (
    //      <div>
    //     // <ul>
    //        {data.map((element, index) => (
    //         <li key={index}>
    //            name:
    //            <span>{props.username ? props.username : professional.username}</span>
    //            <span>
    //              {props.hourly_rate ? props.hourly_rate : professional.hourly_rate}
    //            </span>
    //  </li>
    //       ))}
        // </ul>
        <div className="w-full flex flex-col justify-center mb-3">
            <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 mx-auto border border-white bg-white">
                <div className="md:w-1/4 bg-white grid place-items-center">
                    <img src={avatar} className="rounded-full" />
                </div>
                <div className="md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                    <div className="flex justify-between item-center">
                        {/* <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <p className="text-gray-600 font-bold text-m ml-1">
                                4.96
                                <span className="text-gray-500 font-normal">(76 reviews)</span>
                            </p>
                        </div> */}
                        <div className="bg-gray-200 px-3 py-1 rounded-full text-xl font-medium text-gray-800 hidden md:block">
                            €/hora: {props.hourly_rate}</div>
                    </div>
                    <h3 className="font-black text-gray-800 md:text-3xl text-xl">{props.username}</h3>
                    <p className="md:text-lg text-gray-500 text-base">{props.description}</p>


                    <div className="flex justify-center">
                        <ul className="flex flex-wrap">
                            <li className="mr-2 mb-2">
                                <div className="flex-row gap-4 flex justify-center items-center">
                                    <div className="flex-shrink-0">
                                        <a className="relative block">
                                            <img alt="limpieza" src={limpieza} className="mx-auto object-fit rounded-full h-8 w-8" />
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
                                            <img alt="cocina" src={chef} className="mx-auto object-fit rounded-full h-8 w-8" />
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
                                            <img alt="cuidad de niños" src={niños} className="mx-auto object-fit rounded-full h-8 w-8 " />
                                        </a>
                                    </div>
                                    <div className=" flex flex-col">
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
                                            <img alt="cuidado de animales" src={animales} className="mx-auto object-fit rounded-full h-8 w-8 " />
                                        </a>
                                    </div>
                                    <div className=" flex flex-col">
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
                                            <img alt="jardineria" src={jardineria} className="mx-auto object-fit rounded-full h-8 w-8 " />
                                        </a>
                                    </div>
                                    <div className=" flex flex-col">
                                        <span className="text-lg font-medium text-gray-600 dark:text-white">
                                            Jardineria
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Añadir Reserva
                        </button>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                            <div className="bg-gray-900 opacity-50" />
                            <div className="bg-white w-1/2 p-6 rounded shadow-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Añadir Reserva</h2>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Fecha:</label>
                                    <div className="flex items-center">
                                        <select value={selectedHome} onChange={handleHomeSelection}>
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
                    )}
                </div>


            </div>
        </div>
        // </div>

    );
};
