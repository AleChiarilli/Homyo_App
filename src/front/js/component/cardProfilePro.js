import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import avatar from "../../img/avatar.png";

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
    const [description, setDescription] = useState("");


    const handleStartingTimeChange = (event) => {
        const time = event.target.value;
        setStartTime(time);
    };

    const handleEndTimeChange = (event) => {
        const time = event.target.value;
        setEndTime(time);
    };

    const closeModal = () => {
        setShowModal(false);
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

    const [selectedHome, setSelectedHome] = useState("");

    useEffect(() => {
        actions.getMyHomes()
    }, [])

    const handleHomeSelection = (event) => {
        const selectedHome = event.target.value;
        setSelectedHome(selectedHome);
        // Hacer lo que necesites con el nombre de la casa seleccionada
        console.log("Casa seleccionada:", selectedHome);
    };

    const submitPost = async (e) => {
        e.preventDefault()
        console.log("guardado contract desde buscador")
        await actions.submitPost({ home_id: selectedHome, starting_time: startTime, finishing_time: endTime, description: description, city: "city", is_visible: true })
        // ocultado el home_post y generando contracto 
        await actions.updateHomePost({ is_visible: false }, store.last_post_id)
        console.log("gererando contrato")
        await actions.contract_cmr_to_pro({ home_post_id: store.last_post_id, starting_time: startTime, finishing_time: endTime, total_price: finalPrice, pro_profile_id: props.pro_id, comment: description });
    }

    return (
        <div className="w-full flex flex-col justify-center mb-3">
            <div className="w-full flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 mx-auto border border-white bg-white mt-auto">
                <div className="w-full md:w-1/4  bg-white grid place-items-center">
                    <img src={avatar} className="rounded-full" />
                </div>
                <div className="md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                    <div className="flex justify-between item-center">
                        <h3 className="font-black text-gray-800 md:text-3xl text-xl">Nombre: {props.name}</h3>


                        <div className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                            <p>{props.hourly_rate} €/hora</p>
                        </div>
                    </div>
                    <h4 className="font-black text-gray-800 md:text-3xl text-xl">Ubicacion: {props.city}</h4>
                    <p className="md:text-xl text-gray-500 text-base">Mi descripcion: {props.description}</p>
                    <div className="flex justify-center mt-3">
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ transition: 'transform 0.2s ease-in-out', willChange: 'transform' }}
                            onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
                            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
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
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Solicitud de servicio al profesional</h2>
                            <div className="mb-4">
                                <div className="flex items-center">
                                    <select
                                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={selectedHome} onChange={handleHomeSelection}>
                                        <option value="">Seleccionar casa</option>
                                        {store.myHomes && store.myHomes.map((homeName, index) => (
                                            <option key={index} value={homeName.id}>
                                                {homeName.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <textarea
                                    id="tasks"
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    rows="4"
                                    defaultValue=""
                                    className="mr-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="DESCRIPCION DEL SERVICIO QUE NECESITAS"
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
                                    onClick={submitPost}
                                    className="ml-5 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    style={{ transition: 'transform 0.2s ease-in-out', willChange: 'transform' }}
                                    onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
                                    onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                                >
                                    Enviar solicitud
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-3"
                                    style={{ transition: 'transform 0.2s ease-in-out', willChange: 'transform' }}
                                    onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
                                    onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
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
