import React, { useState } from "react";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import house from "../../img/house.png";

const iconsMap = { limpieza, animales, jardineria, niños, chef }


export const CardAnnounce = ({ description, address, startingTime, finishingTime, name, timeDifference, skills }) => {
  const [isModalOpen100, setIsModalOpen100] = useState(false); // Estado del primer modal

  // const {store} = useContext(Context)

  const toggleModal100 = () => {
    setIsModalOpen100(!isModalOpen100); // Invierte el estado del primer modal al hacer clic
  };

  const hideModal100 = () => {
    setIsModalOpen100(false); // Cierra el primer modal
  };


  return (
    <div className="w-full flex flex-col justify-center mt-10 mb-3 dark:bg-gray-700">
      <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 bg-white dark:bg-gray-800 mx-auto border border-white">
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 grid place-items-center">
          <img src={house} className="rounded-full" alt="Casa" />
        </div>
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xl font-medium text-gray-800 dark:text-white hidden md:block">
              Inicio: {startingTime}
            </div>
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xl font-medium text-gray-800 dark:text-white hidden md:block">
              Fin: {finishingTime}
            </div>
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xl font-medium text-gray-800 dark:text-white hidden md:block">
              Horas: {timeDifference}
            </div>
          </div>
          <h3 className="font-black text-gray-800 dark:text-white md:text-3xl text-xl">{name}</h3>
          <p>{address}</p>
          <p className="md:text-lg text-gray-500 dark:text-white text-base">Servicios que precisa:</p>
          <div className="flex justify-center">
            <ul className="flex flex-wrap">
              {skills?.map((skill) => {
                return (
                  <>
                    <li className="mr-2 mb-2">
                      <div className="flex-row gap-4 flex justify-center items-center">
                        <div className="flex-shrink-0">
                          <a className=" block">
                            <img
                              alt={skill.skill}
                              src={iconsMap[skill.skill]}
                              className="mx-auto object-fit rounded-full h-8 w-8 dark:bg-gray-800"
                            />
                          </a>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg font-medium text-gray-600 dark:text-white">
                            {skill.skill}
                          </span>
                        </div>
                      </div>
                    </li>
                  </>
                )
              })}
            </ul>
          </div>
          <div>
            {/* <textarea rows="3" className="p-4 w-full text-gray-500 dark:text-white rounded-xl resize-none" placeholder="Mensaje del cliente detallando el servicio"></textarea> */}
            <p rows="3" className="p-4 w-full text-gray-500 dark:text-white rounded-xl resize-none">{description}</p>
          </div>
          <div className="text-right">
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
                className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
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
                      <form
                        onSubmit={(e) => submitUser(e)}
                        autoComplete="on"
                      >
                        <div className="flex flex-col mb-6">
                          <div className="flex relative">
                            <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 12 5.419 3.871A1 1 0 0 0 16 15.057V2.943a1 1 0 0 0-1.581-.814L9 6m0 6V6m0 6H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7m-5 6h3v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm15-3a3 3 0 0 1-3 3V6a3 3 0 0 1 3 3Z" />
                              </svg>
                            </span>
                            <input
                              type="number"
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
                        <span className="ml-2">Las ofertas pueden hacerte notar y posicionarte sobre otros profesionales</span>
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


