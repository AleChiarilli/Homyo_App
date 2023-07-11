import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Calendar } from "../component/calendar";
import avatar from "../../img/avatar.png";
import { Profileproshowprofile } from "../component/profileProShowProfile";
import { Profileproshowcontracts } from "../component/profileProShowContracts";

export const Profilepro = () => {
  const { store, actions } = useContext(Context);

  const [showProfile, setShowProfile] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showContracts, setShowContracts] = useState(false);

  useEffect(() => {
    actions.getSkills();
  }, []);

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowCalendar(false);
    setShowContracts(false);
    setShowMessages(false);
  };


  const handleContractsClick = () => {
    setShowProfile(false);
    setShowCalendar(false);
    setShowContracts(true);
    setShowMessages(false);
  };


  return (
    <main className="max-w-screen-xl overflow-hidden dark:bg-gray-800 rounded-2xl mt-20 mx-auto">

      <div className="flex flex-wrap md:hidden justify-center text-center mt-5">
        <a href="#" aria-current="page" onClick={handleProfileClick} className="flex-1 px-4 py-2 m-1 text-xs font-medium text-blue-700 bg-white border border-blue-700 rounded flex items-center justify-center hover:bg-blue-700 hover:text-white focus:outline-none focus:bg-blue-700 focus:text-white dark:bg-transparent dark:border-gray-600 dark:text-white dark:hover:border-gray-400 dark:hover:text-gray-400 dark:focus:border-gray-400 dark:focus:text-gray-400">
          Mi Perfil
        </a>
        <a href="#" onClick={handleContractsClick} className="flex-1 px-4 py-2 m-1 text-xs font-medium text-gray-700 bg-white border border-gray-700 rounded flex items-center justify-center hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-gray-700 focus:text-white dark:bg-transparent dark:border-gray-600 dark:text-white dark:hover:border-gray-400 dark:hover:text-gray-400 dark:focus:border-gray-400 dark:focus:text-gray-400">
          Mis Contratos
        </a>
      </div>

      <div className="flex items-start justify-between">
        <div className="relative hidden my-4 ml-4 shadow-lg lg:block w-80">
          <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
            <div className="flex items-center justify-center pt-6 ">
              <img
                alt="avatar"
                src={avatar}
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
              </div>
            </nav>
          </div>
        </div>

        {/* Vista de mi perfil */}
        {showProfile && (
          <Profileproshowprofile />
        )}

        {/* Vista contrataciones */}

        {showCalendar && (
          <div className="w-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">
            <Calendar />
          </div>
        )}

        {/* Vista contrataciones */}
        {showContracts && (
          <Profileproshowcontracts />
        )}

      </div>
    </main>
  );
};
