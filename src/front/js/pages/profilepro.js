import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/profile.css";
import { Calendar } from "../component/calendar";
import { Messages } from "../component/messages";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";

export const Profilepro = () => {
    // const [profile_pic, setProfile_pic] = useState("");
    // const [description,setDescription] = useState("");
    // const [address,setAddress] = useState("");
    // const [postal_code, setPostal_code ] = useState("");
    // const [phone_number,setPhone_number ] = useState("");
    // const [hourly_rate,setHourly_rate ] = useState("")


    const [showProfile, setShowProfile] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showContracts, setShowContracts] = useState(false);
    const [showMessages, setShowMessages] = useState(false);

    const handleProfileClick = () => {
        setShowProfile(true);
        setShowCalendar(false);
        setShowContracts(false);
        setShowMessages(false);
    };

    const handleCalendarClick = () => {
        setShowProfile(false);
        setShowCalendar(true);
        setShowContracts(false);
        setShowMessages(false);
    };

    const handleContractsClick = () => {
        setShowProfile(false);
        setShowCalendar(false);
        setShowContracts(true);
        setShowMessages(false);
    };

    const handleMessagesClick = () => {
        setShowProfile(false);
        setShowCalendar(false);
        setShowContracts(false);
        setShowMessages(true);
    };

    const { actions } = useContext(Context);

    const handleRoleChange = (role) => {
        actions.setRole(role);
        console.log("Nuevo rol:", role);
    };

    // const submit_prof_profile = async (e) => {
    //     e.preventDefault()
    //     await actions.login(profile_pic,description,address,postal_code,phone_number,hourly_rate)
    // }


    return (

        <main className="max-w-screen-xl overflow-hidden  dark:bg-gray-800 rounded-2xl mt-20 mx-auto">
            <div className="flex items-start justify-between">
                <div className="relative hidden h-screen my-4 ml-4 shadow-lg lg:block w-80">
                    <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
                        <div className="flex items-center justify-center pt-6 ">
                            <img alt="limpieza" src={limpieza} className="mx-auto object-fit rounded-full h-16 w-16 " />
                        </div>
                        <nav className="mt-6">
                            <div>
                                <a className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700" onClick={handleProfileClick} href="#">
                                    <span className="text-left">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                                            </path>
                                        </svg>
                                    </span>
                                    <span className="mx-4 text-sm font-normal">
                                        MI PERFIL
                                    </span>
                                </a>
                                <a className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700" onClick={handleCalendarClick} href="#">
                                    <span className="text-left">
                                        <svg width="20" height="20" fill="currentColor" className="m-auto" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z">
                                            </path>
                                        </svg>
                                    </span>
                                    <span className="mx-4 text-sm font-normal">
                                        CALENDARIO
                                    </span>
                                </a>
                                <a className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700" onClick={handleContractsClick} href="#">
                                    <span className="text-left">
                                        <svg width="20" height="20" fill="currentColor" className="m-auto" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z">
                                            </path>
                                        </svg>
                                    </span>
                                    <span className="mx-4 text-sm font-normal">
                                        CONTRATACIONES
                                    </span>
                                </a>
                                <a className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700" onClick={handleMessagesClick} href="#">
                                    <span className="text-left">
                                        <svg width="20" height="20" fill="currentColor" className="m-auto" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z">
                                            </path>
                                        </svg>
                                    </span>
                                    <span className="mx-4 text-sm font-normal">
                                        MENSAJES
                                    </span>
                                </a>

                                






                            </div>
                        </nav>
                    </div>
                </div>


                {/* Vista de mi perfil */}
                {showProfile && (
                    <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
                        <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">
                            <div className="flex flex-col flex-wrap sm:flex-row ">
                                <div className="w-full sm:w-1/2 xl:w-1/3">
                                    <div className="mb-4">
                                        <div className="w-full bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                                            <form className="p-4">
                                                <p className="text-center font-bold text-black text-md dark:text-white">
                                                    Mis Datos
                                                </p>
                                                <div className="grid md:grid-cols-2 md:gap-6">
                                                    <div className="relative z-0 w-full mb-6 group">
                                                        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Nombre " required />
                                                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
                                                    </div>
                                                    <div className="relative z-0 w-full mb-6 group">
                                                        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Apellido" required />
                                                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
                                                    </div>
                                                </div>
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Email" required />
                                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
                                                </div>
                                                <div className="relative z-0 w-full mb-6 group">
                                                    <input type="text" name="floating_id" id="floating_id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="DNI" required />
                                                    <label htmlFor="floating_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
                                                </div>
                                                <div className="grid md:grid-cols-2 md:gap-6">
                                                    <div className="relative z-0 w-full mb-6 group">
                                                        <input type="text" name="floating_adress" id="floating_adress" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Dirección " required />
                                                        <label htmlFor="floating_adress" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
                                                    </div>
                                                    <div className="relative z-0 w-full mb-6 group">
                                                        <input type="text" name="floating_cp" id="floating_cp" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Código Postal " required />
                                                        <label htmlFor="floating_cp" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
                                                    </div>
                                                    <div className="relative z-0 w-full mb-6 group">
                                                        <input type="text" name="floating_city" id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Ciudad" required />
                                                        <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-1 md:gap-6">
                                                    <div className="relative z-0 w-full mb-6 group">
                                                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Teléfono " required />
                                                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"></label>
                                                    </div>

                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center">
                                                    <span className="relative p-2 bg-blue-100 rounded-xl">
                                                        <svg width="25" height="25" viewBox="0 0 2447.6 2452.5" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipRule="evenodd" fillRule="evenodd">
                                                                <path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0">
                                                                </path>
                                                                <path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d">
                                                                </path>
                                                                <path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e">
                                                                </path>
                                                                <path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a">
                                                                </path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span className="ml-2 font-bold text-black text-md dark:text-white">
                                                            Slack
                                                        </span>
                                                        <span className="ml-2 text-sm text-gray-500 dark:text-white">
                                                            Slack corporation
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <button className="p-1 border border-gray-200 rounded-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 1792 1792">
                                                            <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
                                                            </path>
                                                        </svg>
                                                    </button>
                                                    <button className="text-gray-200">
                                                        <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1088 1248v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68z">
                                                            </path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mb-4 space-x-12">
                                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-700 rounded-md bg-green-50">
                                                    COMPLETED
                                                </span>
                                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-600 bg-white border border-green-600 rounded-md">
                                                    MEDIUM PRIORITY
                                                </span>
                                            </div>
                                            <div className="block m-auto">
                                                <div>
                                                    <span className="inline-block text-sm text-gray-500 dark:text-gray-100">
                                                        Task done :
                                                        <span className="font-bold text-gray-700 dark:text-white">
                                                            50
                                                        </span>
                                                        /50
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
                                                    <div className="w-full h-full text-xs text-center text-white bg-pink-400 rounded-full">
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-start my-4 space-x-4">
                                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-green-500 rounded-md bg-green-50">
                                                    IOS APP
                                                </span>
                                                <span className="flex items-center px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-200 rounded-md">
                                                    ANDROID
                                                </span>
                                            </div>
                                            <div className="flex -space-x-2">
                                                <a href="#" className="">
                                                    <img className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white" src="/images/person/1.jpg" alt="Guy" />
                                                </a>
                                                <a href="#" className="">
                                                    <img className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white" src="/images/person/2.jpeg" alt="Max" />
                                                </a>
                                                <a href="#" className="">
                                                    <img className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white" src="/images/person/3.jpg" alt="Charles" />
                                                </a>
                                                <a href="#" className="">
                                                    <img className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white" src="/images/person/4.jpg" alt="Jade" />
                                                </a>
                                            </div>
                                            <span className="flex items-center px-2 py-1 mt-4 text-xs font-semibold text-yellow-500 bg-yellow-100 rounded-md w-36">
                                                DUE DATE : 18 JUN
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2 xl:w-1/3">
                                    <div className="mx-0 mb-4 sm:ml-4 xl:mr-4">
                                        <div className="w-full bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                                            <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                                                Mis Servicios
                                            </p>
                                            <ul className="p-4">
                                                <li>
                                                    <input type="checkbox" id="limpieza-option" value="" className="hidden peer" required="" />
                                                    <label htmlFor="limpieza-option" className="inline-flex items-center justify-between w-full text-gray-500 bg-white border-2 border-gray-200 rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
                                                                    <img alt="limpieza" src={limpieza} className="mx-auto object-fit rounded-full h-20 w-20 " />
                                                                </a>
                                                            </div>
                                                            <div className=" flex flex-col">
                                                                <span className="text-lg font-medium text-gray-600 dark:text-white">
                                                                    Limpieza
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="cocina-option" value="" className="hidden peer" required="" />
                                                    <label htmlFor="cocina-option" className="inline-flex items-center justify-between w-full text-gray-500 bg-white border-2 border-gray-200 rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
                                                                    <img alt="cocina" src={chef} className="mx-auto object-fit rounded-full h-20 w-20 " />
                                                                </a>
                                                            </div>
                                                            <div className=" flex flex-col">
                                                                <span className="text-lg font-medium text-gray-600 dark:text-white">
                                                                    Cocina
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="cuidado-niños-option" value="" className="hidden peer" required="" />
                                                    <label htmlFor="cuidado-niños-option" className="inline-flex items-center justify-between w-full text-gray-500 bg-white border-2 border-gray-200 rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
                                                                    <img alt="niños" src={niños} className="mx-auto object-fit rounded-full h-20 w-20 " />
                                                                </a>
                                                            </div>
                                                            <div className=" flex flex-col">
                                                                <span className="text-lg font-medium text-gray-600 dark:text-white">
                                                                    Cuidado de niños
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="cuidado-animales-option" value="" className="hidden peer" required="" />
                                                    <label htmlFor="cuidado-animales-option" className="inline-flex items-center justify-between w-full text-gray-500 bg-white border-2 border-gray-200 rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
                                                                    <img alt="animales" src={animales} className="mx-auto object-fit rounded-full h-20 w-20 " />
                                                                </a>
                                                            </div>
                                                            <div className=" flex flex-col">
                                                                <span className="text-lg font-medium text-gray-600 dark:text-white">
                                                                    Cuidado de animales
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="jardineria-option" value="" className="hidden peer" required="" />
                                                    <label htmlFor="jardineria-option" className="inline-flex items-center justify-between w-full text-gray-500 bg-white border-2 border-gray-200 rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                        <div className="flex-row gap-4 flex justify-center items-center">
                                                            <div className="flex-shrink-0">
                                                                <a href="#" className="relative block">
                                                                    <img alt="jardineria" src={jardineria} className="mx-auto object-fit rounded-full h-20 w-20 " />
                                                                </a>
                                                            </div>
                                                            <div className=" flex flex-col">
                                                                <span className="text-lg font-medium text-gray-600 dark:text-white">
                                                                    Limpieza
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mb-4 sm:ml-4 xl:mr-4">
                                        <div className="w-full bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                                            <div className="flex items-center justify-between p-4">
                                                <p className="font-bold text-black text-md dark:text-white">
                                                    Google
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between px-4 py-2 text-gray-600 bg-blue-100 border-l-4 border-blue-500 dark:bg-gray-800">
                                                <p className="flex items-center text-xs dark:text-white">
                                                    <svg width="20" height="20" fill="currentColor" className="mr-2 text-blue-500" viewBox="0 0 24 24">
                                                        <g fill="none">
                                                            <path d="M12 5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17zm0 3a.75.75 0 0 0-.743.648l-.007.102v4.5l.007.102a.75.75 0 0 0 1.486 0l.007-.102v-4.5l-.007-.102A.75.75 0 0 0 12 8zm7.17-2.877l.082.061l1.149 1a.75.75 0 0 1-.904 1.193l-.081-.061l-1.149-1a.75.75 0 0 1 .903-1.193zM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5z" fill="currentColor">
                                                            </path>
                                                        </g>
                                                    </svg>
                                                    Create wireframe
                                                </p>
                                                <div className="flex items-center">
                                                    <span className="ml-2 mr-2 text-xs font-bold dark:text-gray-200 md:ml-4">
                                                        25 min 20s
                                                    </span>
                                                    <button className="p-1 mr-4 text-sm text-gray-400 bg-blue-500 border rounded">
                                                        <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24" className="text-white">
                                                            <g fill="none">
                                                                <path d="M9 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1zm6 0a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1z" fill="currentColor">
                                                                </path>
                                                            </g>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-4 border-b-2 border-gray-100">
                                                <p className="font-bold text-black text-md dark:text-white">
                                                    Slack
                                                </p>
                                                <button className="p-1 mr-4 text-sm text-gray-400 border border-gray-400 rounded">
                                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20">
                                                        <g fill="none">
                                                            <path d="M17.222 8.685a1.5 1.5 0 0 1 0 2.628l-10 5.498A1.5 1.5 0 0 1 5 15.496V4.502a1.5 1.5 0 0 1 2.223-1.314l10 5.497z" fill="currentColor">
                                                            </path>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between px-4 py-2 text-gray-600 border-b-2 border-gray-100">
                                                <p className="flex items-center text-xs dark:text-white">
                                                    <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                                                        <g fill="none">
                                                            <path d="M12 5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17zm0 3a.75.75 0 0 0-.743.648l-.007.102v4.5l.007.102a.75.75 0 0 0 1.486 0l.007-.102v-4.5l-.007-.102A.75.75 0 0 0 12 8zm7.17-2.877l.082.061l1.149 1a.75.75 0 0 1-.904 1.193l-.081-.061l-1.149-1a.75.75 0 0 1 .903-1.193zM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5z" fill="currentColor">
                                                            </path>
                                                        </g>
                                                    </svg>
                                                    International
                                                </p>
                                                <div className="flex items-center">
                                                    <span className="ml-2 mr-2 text-xs text-gray-400 md:ml-4">
                                                        30 min
                                                    </span>
                                                    <button className="p-1 mr-4 text-sm text-gray-400 border border-gray-400 rounded">
                                                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20">
                                                            <g fill="none">
                                                                <path d="M17.222 8.685a1.5 1.5 0 0 1 0 2.628l-10 5.498A1.5 1.5 0 0 1 5 15.496V4.502a1.5 1.5 0 0 1 2.223-1.314l10 5.497z" fill="currentColor">
                                                                </path>
                                                            </g>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between px-4 py-2 text-gray-600 border-b-2 border-gray-100">
                                                <p className="flex items-center text-xs dark:text-white">
                                                    <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                                                        <g fill="none">
                                                            <path d="M12 5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17zm0 3a.75.75 0 0 0-.743.648l-.007.102v4.5l.007.102a.75.75 0 0 0 1.486 0l.007-.102v-4.5l-.007-.102A.75.75 0 0 0 12 8zm7.17-2.877l.082.061l1.149 1a.75.75 0 0 1-.904 1.193l-.081-.061l-1.149-1a.75.75 0 0 1 .903-1.193zM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5z" fill="currentColor">
                                                            </path>
                                                        </g>
                                                    </svg>
                                                    Slack logo design
                                                </p>
                                                <div className="flex items-center">
                                                    <span className="ml-2 mr-2 text-xs text-gray-400 md:ml-4">
                                                        30 min
                                                    </span>
                                                    <button className="p-1 mr-4 text-sm text-gray-400 border border-gray-400 rounded">
                                                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20">
                                                            <g fill="none">
                                                                <path d="M17.222 8.685a1.5 1.5 0 0 1 0 2.628l-10 5.498A1.5 1.5 0 0 1 5 15.496V4.502a1.5 1.5 0 0 1 2.223-1.314l10 5.497z" fill="currentColor">
                                                                </path>
                                                            </g>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between px-4 py-2 text-gray-600">
                                                <p className="flex items-center text-xs dark:text-white">
                                                    <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 24 24">
                                                        <g fill="none">
                                                            <path d="M12 5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17zm0 3a.75.75 0 0 0-.743.648l-.007.102v4.5l.007.102a.75.75 0 0 0 1.486 0l.007-.102v-4.5l-.007-.102A.75.75 0 0 0 12 8zm7.17-2.877l.082.061l1.149 1a.75.75 0 0 1-.904 1.193l-.081-.061l-1.149-1a.75.75 0 0 1 .903-1.193zM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5z" fill="currentColor">
                                                            </path>
                                                        </g>
                                                    </svg>
                                                    Dahboard template
                                                </p>
                                                <div className="flex items-center">
                                                    <span className="ml-2 mr-2 text-xs text-gray-400 md:ml-4">
                                                        30 min
                                                    </span>
                                                    <button className="p-1 mr-4 text-sm text-gray-400 border border-gray-400 rounded">
                                                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20">
                                                            <g fill="none">
                                                                <path d="M17.222 8.685a1.5 1.5 0 0 1 0 2.628l-10 5.498A1.5 1.5 0 0 1 5 15.496V4.502a1.5 1.5 0 0 1 2.223-1.314l10 5.497z" fill="currentColor">
                                                                </path>
                                                            </g>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="mb-4">
                                    <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                                        <p className="font-bold text-black text-md dark:text-white">
                                            Messages
                                        </p>
                                        <ul>
                                            <li className="flex items-center my-6 space-x-2">
                                                <a href="#" className="relative block">
                                                    <img alt="profil" src="/images/person/1.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                </a>
                                                <div className="flex flex-col">
                                                    <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                                                        Charlie Rabiller
                                                    </span>
                                                    <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                                                        Hey John ! Do you read the NextJS doc ?
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="flex items-center my-6 space-x-2">
                                                <a href="#" className="relative block">
                                                    <img alt="profil" src="/images/person/5.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                </a>
                                                <div className="flex flex-col">
                                                    <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                                                        Marie Lou
                                                    </span>
                                                    <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                                                        No I think the dog is better...
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="flex items-center my-6 space-x-2">
                                                <a href="#" className="relative block">
                                                    <img alt="profil" src="/images/person/6.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                </a>
                                                <div className="flex flex-col">
                                                    <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                                                        Ivan Buck
                                                    </span>
                                                    <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                                                        Seriously ? haha Bob is not a child !
                                                    </span>
                                                </div>
                                            </li>
                                            <li className="flex items-center my-6 space-x-2">
                                                <a href="#" className="relative block">
                                                    <img alt="profil" src="/images/person/7.jpg" className="mx-auto object-cover rounded-full h-10 w-10 " />
                                                </a>
                                                <div className="flex flex-col">
                                                    <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                                                        Marina Farga
                                                    </span>
                                                    <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                                                        Do you need that design ?
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                )}

                {/* Vista contrataciones */}
                {showCalendar && (
                    <Calendar />

                )}


                {/* Vista contrataciones */}
                {showContracts && (
                    <div></div>

                )}

                {showMessages && (
                    <Messages />
                )}

            </div>
        </main>



    )

};

