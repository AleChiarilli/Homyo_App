import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import house from "../../img/house.png";

const iconsMap = { limpieza, animales, jardineria, niños, chef }


export const CardAnnounce = ({ description, address, startingTime, finishingTime, name, timeDifference, skills, homePostId }) => {
  const [isModalOpen100, setIsModalOpen100] = useState(false); // Estado del primer modal

  const { store, actions } = useContext(Context)

  const toggleModal100 = () => {
    setIsModalOpen100(!isModalOpen100); // Invierte el estado del primer modal al hacer clic
  };

  const [offer, setOffer] = useState("");

  const hideModal100 = () => {
    setIsModalOpen100(false); // Cierra el primer modal
  };

  const submitOffer = async (e) => {
    e.preventDefault()
    await actions.submitOffer({ "home_post_id": homePostId, "total_price": offer })
  }
  return (
    <div className="w-full flex flex-col justify-center mt-10 mb-3 dark:bg-gray-700">
      <h3 className="w-full font-black text-center text-gray-800 dark:text-white md:text-3xl text-xl">{name}</h3>
      <div className="w-full flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 bg-white dark:bg-gray-800 mx-auto border border-white">

        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 grid place-items-center">
          <img src={house} className="rounded-full" alt="Casa" />
        </div>

        <div className="w-full md:w-2/3 bg-white dark:bg-gray-700 flex flex-col space-y-2 p-3">
          <div className="text-left px-3 py-1 rounded-full text-xl text-gray-800 dark:text-white">
            <b>Dirección</b>: {address}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl text-gray-800 dark:text-white">
            <b> Inicio</b>: {startingTime}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl text-gray-800 dark:text-white">
            <b>  Fin</b>: {finishingTime}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl text-gray-800 dark:text-white">
            <b>  Horas</b>: {timeDifference}
          </div>
          <div className="text-left px-3 py-1 rounded-full text-xl text-gray-800 dark:text-white">
            <b>  Detalle del servicio</b>: {description}
          </div>
          <div className="flex justify-end items-center mt-3"> {/* Añadido para alinear el botón en el centro */}
            <button
              data-modal-target="authentication-modal100"
              data-modal-toggle="authentication-modal100"
              onClick={toggleModal100}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Mandar oferta!
            </button>
            {isModalOpen100 && (
              <div
                id="authentication-modal100"
                tabIndex="-1"
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 bottom-0  z-10 flex items-center justify-center bg-black bg-opacity-50"
              >
                <div className="absolute bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={hideModal100}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  {/* Modal content 1 */}
                  <div className="px-6 py-6 lg:px-8 text-center">
                    <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                      Manda una oferta
                    </div>
                    <div className="mt-8">
                      <form onSubmit={(e) => { submitOffer(e); hideModal100(); }} autoComplete="on">

                        <div className="flex flex-col mb-6">
                          <div className="flex relative">
                            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                              €
                            </span>
                            <input
                              type="number"
                              onChange={(event) => setOffer(event.target.value)}
                              id="oferta"
                              className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="oferta"
                            />
                          </div>
                          <div className="flex self-center w-64 ">
                            <img src="https://thyroiduk.org/wp-content/uploads/2020/12/undraw_content_creator_xeju-1024x788.png" />
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                        </div>
                        <div className="flex w-full">
                          <button
                            type="submit"
                            className="py-2 px-4  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                          >
                            Enviar
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                      <a
                        href="#"
                        target="_blank"
                        className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                      >
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


