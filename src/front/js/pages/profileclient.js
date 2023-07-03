import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/profile.css";
import { Calendar } from "../component/calendar";
import { Messages } from "../component/messages";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import { Cardspaces } from "../component/cardSpaces";
import { Cardannounces } from "../component/cardAnnounces";
import { Acceptedcontractclientcard } from "../component/acceptedContractClientCard";
import { Contractofferprofesionaltoclientcard } from "../component/contractOfferProfesionalToClientCard";

export const Profileclient = () => {
  const { store } = useContext(Context);

  //ESTADOS DE LOS INPUTS A RELLENAR POR EL CLIENTE
  const [description, setDescription] = useState("");
  const [phone_number, setPhone_number] = useState("");
  
  //FUNCION PARA EL FORM (INFORMACION DEL CLIENTE)
  const info_customer = async (e) => {
    e.preventDefault();
    await actions.profile_customer({description,phone_number
    }); // Envía los datos del usuario
  };
//gaurdamos su correo con el mismo que se registro por defecto
  useEffect(()=>{
    const emailInput = document.querySelector("#floating_email");
    emailInput.value= store.user.email
    console.log(emailInput)
  },[]) 

  ///
  const [showProfile, setShowProfile] = useState(true);
  const [showSpaces, setShowSpaces] = useState(false);
  const [showAnnounces, setShowAnnounces] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showContracts, setShowContracts] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowSpaces(false);
    setShowAnnounces(false);
    setShowCalendar(false);
    setShowContracts(false);
    setShowMessages(false);
  };

  const handleSpacesClick = () => {
    setShowProfile(false);
    setShowSpaces(true);
    setShowAnnounces(false);
    setShowCalendar(false);
    setShowContracts(false);
    setShowMessages(false);
  };

  const handleAnnouncesClick = () => {
    setShowProfile(false);
    setShowSpaces(false);
    setShowAnnounces(true);
    setShowCalendar(false);
    setShowContracts(false);
    setShowMessages(false);
  };

  const handleCalendarClick = () => {
    setShowProfile(false);
    setShowSpaces(false);
    setShowAnnounces(false);
    setShowCalendar(true);
    setShowContracts(false);
    setShowMessages(false);
  };

  const handleContractsClick = () => {
    setShowProfile(false);
    setShowSpaces(false);
    setShowAnnounces(false);
    setShowCalendar(false);
    setShowContracts(true);
    setShowMessages(false);
  };

  const handleMessagesClick = () => {
    setShowProfile(false);
    setShowSpaces(false);
    setShowAnnounces(false);
    setShowCalendar(false);
    setShowContracts(false);
    setShowMessages(true);
  };

  const [seleccionados, setSeleccionados] = useState([]);

  const handleSeleccionar = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((item) => item !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  return (
    <main className="max-w-screen-xl overflow-hidden dark:bg-gray-800 rounded-2xl mt-20 mx-auto">
      <div className="flex items-start justify-between">
        <div className="relative hidden my-4 ml-4 shadow-lg lg:block w-80">
          <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
            <div className="flex items-center justify-center pt-6 ">
              <img
                alt="limpieza"
                src={limpieza}
                className="mx-auto object-fit rounded-full h-16 w-16 "
              />
            </div>
            <nav className="mt-6">
              <div>
                <a
                  className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={handleProfileClick}
                  href="#"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 64 64"
                      enableBackground="new 0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#231F20"
                        d="M62.242,47.758l0.014-0.014c-3.239-2.634-6.865-4.874-10.839-6.644C50.502,38.229,50,35.175,50,32V16 c0-8.837-7.163-16-16-16h-4c-8.837,0-16,7.163-16,16v16c0,3.173-0.501,6.226-1.415,9.096c-3.979,1.745-7.526,3.953-10.841,6.648 l0.014,0.014C0.672,48.844,0,50.344,0,52v8c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4v-8C64,50.344,63.328,48.844,62.242,47.758z M16,32V16c0-7.732,6.268-14,14-14h4c7.732,0,14,6.268,14,14v16c0,2.806,0.382,5.519,1.062,8.111 c-2.771-1.062-5.709-1.888-8.798-2.461C43.508,34.141,46,28.695,46,22c0-0.435,0-0.754,0-1c0-4.418-3.582-8-8-8h-4 c-2.209,0-4-1.791-4-4c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,2.209-1.791,4-4,4c-3.313,0-6,2.687-6,6c0,0,0,2.565,0,3 c0,6.719,2.509,12.181,5.77,15.689c-3.2,0.605-6.121,1.425-8.838,2.443C15.615,37.534,16,34.813,16,32z M20,19c0-2.209,1.791-4,4-4 c2.088,0,3.926-1.068,5-2.687C30.074,13.932,31.912,15,34,15h4c3.313,0,6,2.687,6,6c0,0.188,0,0.5,0,1c0,12-7.469,18-12,18 s-12-6-12-18C20,21.5,20,19,20,19z M25.677,39.439C27.76,41.084,29.99,42,32,42s4.24-0.916,6.323-2.561 c2.743,0.378,5.399,1.018,7.966,1.857c-2.468,2.468-13.311,13.311-13.691,13.691c-0.43,0.43-0.748,0.447-1.183,0.013 C31.03,54.616,20.18,43.766,17.711,41.297C20.277,40.457,22.934,39.817,25.677,39.439z M62,60c0,1.104-0.896,2-2,2H4 c-1.104,0-2-0.896-2-2v-8c0-1.104,0.447-2.104,1.172-2.828l-0.004-0.004c3.716-2.994,7.918-5.401,12.453-7.133l14.172,14.172 c1.5,1.5,2.914,1.5,4.414,0l14.172-14.172c4.535,1.731,8.737,4.139,12.453,7.133l-0.004,0.004C61.553,49.896,62,50.896,62,52V60z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M25.882,22.467C25.91,22.419,26.18,22,26.998,22c0.808,0,1.096,0.436,1.111,0.458 C28.287,22.803,28.637,23,28.999,23c0.154,0,0.311-0.035,0.457-0.111c0.491-0.253,0.684-0.856,0.431-1.347 C29.592,20.969,28.651,20,26.998,20c-1.691,0-2.618,0.983-2.9,1.564c-0.233,0.482-0.034,1.045,0.439,1.298 C25.012,23.117,25.61,22.931,25.882,22.467z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M34.539,22.862c0.475,0.255,1.073,0.068,1.345-0.396C35.912,22.419,36.182,22,37,22 c0.808,0,1.096,0.436,1.111,0.458C38.289,22.803,38.639,23,39.001,23c0.154,0,0.311-0.035,0.457-0.111 c0.491-0.253,0.684-0.856,0.431-1.347C39.594,20.969,38.653,20,37,20c-1.691,0-2.618,0.983-2.9,1.564 C33.866,22.047,34.065,22.609,34.539,22.862z"
                      ></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">MI PERFIL</span>
                </a>

                <a
                  className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={handleSpacesClick}
                  href="#"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 64 64"
                      enableBackground="new 0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#231F20"
                        d="M32,0C18.745,0,8,10.745,8,24c0,5.678,2.502,10.671,5.271,15l17.097,24.156C30.743,63.686,31.352,64,32,64 s1.257-0.314,1.632-0.844L50.729,39C53.375,35.438,56,29.678,56,24C56,10.745,45.255,0,32,0z M48.087,39h-0.01L32,61L15.923,39 h-0.01C13.469,35.469,10,29.799,10,24c0-12.15,9.85-22,22-22s22,9.85,22,22C54,29.799,50.281,35.781,48.087,39z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M32,14c-5.523,0-10,4.478-10,10s4.477,10,10,10s10-4.478,10-10S37.523,14,32,14z M32,32 c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M32,10c-7.732,0-14,6.268-14,14s6.268,14,14,14s14-6.268,14-14S39.732,10,32,10z M32,36 c-6.627,0-12-5.373-12-12s5.373-12,12-12s12,5.373,12,12S38.627,36,32,36z"
                      ></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">MIS ESPACIOS</span>
                </a>

                <a
                  className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={handleAnnouncesClick}
                  href="#"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 64 64"
                      enableBackground="new 0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#231F20"
                        d="M62.828,37.172L48.347,22.69l0.012,0.011C48.764,21.201,49,19.629,49,18c0-9.94-8.059-18-18-18 c-1.663,0-3.266,0.244-4.793,0.666C25.557,0.236,24.791,0,24,0H4C1.791,0,0,1.791,0,4v20c0,1.061,0.422,2.078,1.172,2.828l36,36 C37.952,63.609,38.977,64,40,64s2.048-0.391,2.828-1.172l20-20C64.391,41.267,64.391,38.733,62.828,37.172z M31,2.001 c8.837,0,16,7.163,16,16c0,1.003-0.117,2.088-0.295,3.048l-1.77-1.77l-0.024-0.025C44.949,18.855,45,18.383,45,18.001 c0-7.731-6.268-14-14-14c-0.432,0-0.856,0.026-1.278,0.064c-0.82,0.074-1.616,0.228-2.391,0.438 c-3.525,0.955-6.49,3.249-8.327,6.308c-0.345,0.573-0.66,1.165-0.921,1.788C17.387,14.262,17,16.086,17,18.001 c0,0.617,0.131,1.817,0.131,1.817S16.396,20,16,20c-0.303,0-0.595-0.04-0.878-0.104c-0.033-0.008-0.038-0.008,0,0 C15.049,19.273,15,18.644,15,18.001c0-2.118,0.421-4.134,1.168-5.983c0.268-0.662,0.577-1.299,0.927-1.913 c1.899-3.337,4.963-5.915,8.64-7.198c0.72-0.252,1.458-0.461,2.221-0.607C28.941,2.108,29.958,2.001,31,2.001z M42.965,17.309 L31.692,6.036C37.765,6.383,42.617,11.235,42.965,17.309z M20,16c0,0.991-0.371,1.885-0.971,2.579 C19.021,18.387,19,18.197,19,18.001c0-1.301,0.213-2.55,0.596-3.724C19.848,14.801,20,15.381,20,16z M13,18 c0,0.211,0.022,0.418,0.031,0.627C12.402,17.924,12,17.018,12,16c0-1.397,0.72-2.625,1.806-3.34C13.282,14.348,13,16.141,13,18z M61.414,41.414l-20.001,20C41.036,61.792,40.534,62,40,62s-1.036-0.208-1.414-0.586l-36-36C2.214,25.041,2,24.525,2,24V4 c0-1.104,0.897-2,2-2h18.778c-3.446,1.775-6.235,4.627-7.94,8.115C12.081,10.656,10,13.084,10,16c0,3.313,2.687,6,6,6s6-2.687,6-6 c0-1.488-0.545-2.848-1.443-3.896c1.748-3.088,4.822-5.316,8.451-5.924l32.406,32.406C61.792,38.964,62,39.466,62,40 S61.792,41.036,61.414,41.414z"
                      ></path>{" "}
                      <path
                        fill="#231F20"
                        d="M50.122,37.88c-1.17-1.17-3.073-1.171-4.243-0.001l-7.984,7.984c-1.169,1.169-1.212,3.116-0.042,4.286 c1.168,1.17,3.108,1.134,4.278-0.036l7.992-7.99h-0.002C51.291,40.953,51.291,39.049,50.122,37.88z M48.707,40.709l-7.96,7.96 c-0.391,0.391-1.092,0.457-1.48,0.066c-0.391-0.391-0.34-1.074,0.051-1.465l7.976-7.976c0.391-0.391,1.023-0.391,1.414,0 C49.098,39.684,49.098,40.318,48.707,40.709z"
                      ></path>{" "}
                      <path
                        fill="#231F20"
                        d="M42.122,34.124c1.17-1.17,1.17-3.074,0.001-4.243c-1.17-1.17-3.073-1.171-4.243-0.001l-7.984,7.984 c-1.169,1.169-1.212,3.116-0.042,4.286c1.168,1.17,3.108,1.134,4.278-0.036l7.992-7.99H42.122z M40.708,32.71l-7.96,7.96 c-0.391,0.391-1.092,0.457-1.48,0.066c-0.391-0.391-0.34-1.074,0.051-1.465l7.976-7.976c0.391-0.391,1.023-0.391,1.414,0 C41.099,31.685,41.099,32.319,40.708,32.71z"
                      ></path>{" "}
                      <path
                        fill="#231F20"
                        d="M34.118,26.12c1.17-1.17,1.17-3.074,0.001-4.243c-1.17-1.17-3.073-1.171-4.243-0.001l-7.984,7.984 c-1.169,1.169-1.212,3.116-0.042,4.286c1.168,1.17,3.108,1.134,4.278-0.036l7.992-7.99H34.118z M32.704,24.706l-7.96,7.96 c-0.391,0.391-1.092,0.457-1.48,0.066c-0.391-0.391-0.34-1.074,0.051-1.465l7.976-7.976c0.391-0.391,1.023-0.391,1.414,0 C33.095,23.681,33.095,24.315,32.704,24.706z"
                      ></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">MIS ANUNCIOS</span>
                </a>

                <a
                  className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={handleCalendarClick}
                  href="#"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 64 64"
                      enableBackground="new 0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#231F20"
                        d="M11,54h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C10,53.553,10.447,54,11,54z M12,49h4v3h-4V49z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M23,54h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C22,53.553,22.447,54,23,54z M24,49h4v3h-4V49z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M35,54h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C34,53.553,34.447,54,35,54z M36,49h4v3h-4V49z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M11,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C10,42.553,10.447,43,11,43z M12,38h4v3h-4V38z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M23,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C22,42.553,22.447,43,23,43z M24,38h4v3h-4V38z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M35,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C34,42.553,34.447,43,35,43z M36,38h4v3h-4V38z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M47,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C46,42.553,46.447,43,47,43z M48,38h4v3h-4V38z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M11,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C10,31.553,10.447,32,11,32z M12,27h4v3h-4V27z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M23,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C22,31.553,22.447,32,23,32z M24,27h4v3h-4V27z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M35,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C34,31.553,34.447,32,35,32z M36,27h4v3h-4V27z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M47,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C46,31.553,46.447,32,47,32z M48,27h4v3h-4V27z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M49,3c0-0.553,0.447-1,1-1 s1,0.447,1,1v3v4c0,0.553-0.447,1-1,1s-1-0.447-1-1V6V3z M13,3c0-0.553,0.447-1,1-1s1,0.447,1,1v3v4c0,0.553-0.447,1-1,1 s-1-0.447-1-1V6V3z M62,60c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V17h60V60z M62,15H2V8c0-1.104,0.896-2,2-2h7v4 c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z"
                      ></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">
                    MI CALENDARIO
                  </span>
                </a>

                <a
                  className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={handleContractsClick}
                  href="#"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 64 64"
                      enableBackground="new 0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#231F20"
                        d="M60,0H4C1.789,0,0,1.789,0,4v56c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z M62,60c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V4c0-1.104,0.896-2,2-2h56c1.104,0,2,0.896,2,2V60z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M59,4H5C4.447,4,4,4.447,4,5v38c0,0.553,0.447,1,1,1h13v5c0,0.553,0.447,1,1,1h26c0.553,0,1-0.447,1-1v-5 h13c0.553,0,1-0.447,1-1V5C60,4.447,59.553,4,59,4z M58,42H45c-0.553,0-1,0.447-1,1v5H20v-5c0-0.553-0.447-1-1-1H6V6h52V42z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M15,16h34c0.553,0,1-0.447,1-1s-0.447-1-1-1H15c-0.553,0-1,0.447-1,1S14.447,16,15,16z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M15,28h34c0.553,0,1-0.447,1-1s-0.447-1-1-1H15c-0.553,0-1,0.447-1,1S14.447,28,15,28z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M15,34h34c0.553,0,1-0.447,1-1s-0.447-1-1-1H15c-0.553,0-1,0.447-1,1S14.447,34,15,34z"
                      ></path>
                      <path
                        fill="#231F20"
                        d="M15,22h34c0.553,0,1-0.447,1-1s-0.447-1-1-1H15c-0.553,0-1,0.447-1,1S14.447,22,15,22z"
                      ></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">
                    MIS CONTRATACIONES
                  </span>
                </a>

                <a
                  className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-indigo-600 hover:text-indigo-600 dark:peer-checked:text-indigo-300 peer-checked:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={handleMessagesClick}
                  href="#"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 64 64"
                      enableBackground="new 0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#231F20"
                        d="M60,0H16c-2.211,0-4,1.789-4,4v6H4c-2.211,0-4,1.789-4,4v30c0,2.211,1.789,4,4,4h7c0.553,0,1,0.447,1,1v11 c0,1.617,0.973,3.078,2.469,3.695C14.965,63.902,15.484,64,16,64c1.039,0,2.062-0.406,2.828-1.172l14.156-14.156 c0,0,0.516-0.672,1.672-0.672S50,48,50,48c2.211,0,4-1.789,4-4v-8h6c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z M52,44 c0,1.105-0.895,2-2,2c0,0-14.687,0-15.344,0C32.709,46,32,47,32,47S20,59,18,61c-2.141,2.141-4,0.391-4-1c0-1,0-12,0-12 c0-1.105-0.895-2-2-2H4c-1.105,0-2-0.895-2-2V14c0-1.105,0.895-2,2-2h46c1.105,0,2,0.895,2,2V44z M62,32c0,1.105-0.895,2-2,2h-6V14 c0-2.211-1.789-4-4-4H14V4c0-1.105,0.895-2,2-2h44c1.105,0,2,0.895,2,2V32z"
                      ></path>{" "}
                      <path
                        fill="#231F20"
                        d="M13,24h13c0.553,0,1-0.447,1-1s-0.447-1-1-1H13c-0.553,0-1,0.447-1,1S12.447,24,13,24z"
                      ></path>{" "}
                      <path
                        fill="#231F20"
                        d="M41,28H13c-0.553,0-1,0.447-1,1s0.447,1,1,1h28c0.553,0,1-0.447,1-1S41.553,28,41,28z"
                      ></path>{" "}
                      <path
                        fill="#231F20"
                        d="M34,34H13c-0.553,0-1,0.447-1,1s0.447,1,1,1h21c0.553,0,1-0.447,1-1S34.553,34,34,34z"
                      ></path>{" "}
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">MIS MENSAJES</span>
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
                <div className="w-full">
                  <div className="mb-4">
                    <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                      <form ionSubmit={(e) => info_customer(e)} className="p-4">
                        <p className="text-center font-bold text-black text-md dark:text-white">
                          Mis Datos
                        </p>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              type="text"
                              name="floating_first_name"
                              id="floating_first_name"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder="Nombre "
                              required
                            />
                            <label
                              htmlFor="floating_first_name"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            ></label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              type="text"
                              name="floating_last_name"
                              id="floating_last_name"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder="Apellido"
                              required
                            />
                            <label
                              htmlFor="floating_last_name"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            ></label>
                          </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="email"
                            name="floating_email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="Email"
                            required
                          />
                          <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          ></label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            name="floating_id"
                            id="floating_id"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder="DNI"
                            required
                          />
                          <label
                            htmlFor="floating_id"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          ></label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              onChange={(event) =>
                                setAddress(event.target.value)
                              }
                              type="text"
                              name="floating_adress"
                              id="floating_adress"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder="Dirección "
                              required
                            />
                            <label
                              htmlFor="floating_adress"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            ></label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              type="text"
                              name="floating_cp"
                              id="floating_cp"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder="Código Postal "
                              required
                            />
                            <label
                              htmlFor="floating_cp"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            ></label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              type="text"
                              name="floating_city"
                              id="floating_city"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder="Ciudad"
                              required
                            />
                            <label
                              htmlFor="floating_company"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            ></label>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-1 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              type="tel"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              name="floating_phone"
                              id="floating_phone"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder="Teléfono "
                              required
                            />
                            <label
                              htmlFor="floating_phone"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            ></label>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Guardar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vista de mis espacios */}
        {showSpaces && (
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0 custom-scrollbar">
              <div className="flex flex-col flex-wrap sm:flex-row ">
                <div className="w-full">
                  <div className="mb-4">
                    <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                      <div className="mx-0 mb-4">
                        <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                          Crear Espacio
                        </p>
                        <ul className="p-4">
                          <li>
                            <label
                              htmlFor="nameSpace"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Nombre
                            </label>
                            <textarea
                              id="nameSpace"
                              rows="1"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder=""
                            ></textarea>
                          </li>
                          <li>
                            <label
                              htmlFor="citySpace"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Ciudad
                            </label>
                            <textarea
                              id="citySpace"
                              rows="1"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder=""
                            ></textarea>
                          </li>
                          <li>
                            <label
                              htmlFor="addresSpace"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Dirección
                            </label>
                            <textarea
                              id="addresSpace"
                              rows="1"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder=""
                            ></textarea>
                          </li>
                          <li>
                            <label
                              htmlFor="postalCodeSpace"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Codigo Postal
                            </label>
                            <textarea
                              id="postalCodeSpace"
                              rows="1"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder=""
                            ></textarea>
                          </li>
                          <li>
                            <label
                              htmlFor="dormitorios"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Dormitorios
                            </label>
                            <select
                              id="dormitorios"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>
                                Elige el número de dormitorios
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="+4">+4</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="salon"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Salón
                            </label>
                            <select
                              id="salon"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>
                                Elige el número de salones
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="+2">+2</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="cocina"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Cocina
                            </label>
                            <select
                              id="cocina"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>
                                Elige el número de cocinas
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="+2">+2</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="banos"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Baños
                            </label>
                            <select
                              id="banos"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>
                                Elige el número de baños
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="+2">+3</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="terraza"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Terraza
                            </label>
                            <select
                              id="terraza"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>
                                Elige el número de terrazas
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="+2">+3</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="jardin"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Jardín
                            </label>
                            <select
                              id="jardin"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>Jardín</option>
                              <option value="si">Sí</option>
                              <option value="no">No</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="niños"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Niños
                            </label>
                            <select
                              id="niños"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>Niños</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="+2">+3</option>
                            </select>
                          </li>
                          <li>
                            <label
                              htmlFor="animales"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Animales
                            </label>
                            <select
                              id="animales"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option defaultValue>Animales</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="+2">+3</option>
                            </select>
                          </li>
                        </ul>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Guardar Espacio
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mx-0 mb-4">
                    <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                      Mis Espacios{" "}
                    </p>
                    <Cardspaces />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vista de mis anuncios */}
        {showAnnounces && (
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0 custom-scrollbar">
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
                          <ul className="p-4 flex justify-center">
                            <li>
                              <button
                                type="button"
                                id="limpieza"
                                className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
                                  seleccionados.includes("limpieza")
                                    ? "bg-indigo-100 text-blue-700"
                                    : ""
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
                            <li>
                              <button
                                type="button"
                                id="cocina"
                                className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
                                  seleccionados.includes("cocina")
                                    ? "bg-indigo-100 text-blue-700"
                                    : ""
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
                            <li>
                              <button
                                type="button"
                                id="niños"
                                className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
                                  seleccionados.includes("niños")
                                    ? "bg-indigo-100 text-blue-700"
                                    : ""
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
                            <li>
                              <button
                                type="button"
                                id="animales"
                                className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
                                  seleccionados.includes("animales")
                                    ? "bg-indigo-100 text-blue-700"
                                    : ""
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
                            <li>
                              <button
                                type="button"
                                id="jardineria"
                                className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
                                  seleccionados.includes("jardineria")
                                    ? "bg-indigo-100 text-blue-700"
                                    : ""
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
                            </li>
                          </ul>
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
        )}

        {/* Vista contrataciones */}
        {showCalendar && <Calendar />}

        {/* Vista contrataciones */}
        {showContracts && (
          <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0 custom-scrollbar">
            <div className="mx-0 mb-4">
              <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                Tus Contratos Confirmados
              </p>
              <Acceptedcontractclientcard />

              <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                Ofertas para tus anuncios
              </p>
              <Contractofferprofesionaltoclientcard />
            </div>
          </div>
        )}

        {showMessages && (
          <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0 custom-scrollbar">
            <Messages />
          </div>
        )}
      </div>
    </main>
  );
};
