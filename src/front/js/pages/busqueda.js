import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import { Cardprofilepro } from "../component/cardProfilePro";

export const Busqueda = (props) => {


  const { store, actions } = useContext(Context);


  const handleDropdownToggle = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("hidden");
  };

  const [seleccionados, setSeleccionados] = useState([]);

  const handleSeleccionar = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((item) => item !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  const [filledStars, setFilledStars] = useState(0);

  const handleStarMouseEnter = (index) => {
    setFilledStars(index + 1);
  };

  const handleStarMouseLeave = () => {
    setFilledStars(0);
  };

  const [rangeValue, setRangeValue] = useState(50);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  useEffect(() => {
    actions.get_all_professionals();
  }, []);



  return (
    <div className="flex flex-col sm:flex-row justify-center mt-20 dark:bg-gray-800">
      {/* <aside
    id="sidebar-multi-level-sidebar"
    className="w-full sm:w-64 order-1 sm:order-2"
  >
        <div className=" px-3 py-4 overflow-y-auto sticky top-20">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                type="button"
                className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => handleDropdownToggle("dropdown-servicios")}
              >

                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-indigo-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Servicios
                </span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-servicios"
                className="hidden py-2 space-y-2"
              >
                <li>
                  <button
                    type="button"
                    id="limpieza"
                    className={`w-full inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("limpieza") ? "bg-indigo-100 text-blue-700" : ""
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
                    className={`w-full inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("cocina") ? "bg-indigo-100 text-blue-700" : ""
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
                    className={`w-full inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("niños") ? "bg-indigo-100 text-blue-700" : ""
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
                    className={`w-full inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("animales") ? "bg-indigo-100 text-blue-700" : ""
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
                    className={`w-full inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("jardineria") ? "bg-indigo-100 text-blue-700" : ""
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
            </li>
            <li>
              <button
                type="button"
                className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => handleDropdownToggle("dropdown-range")}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-yellow-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 01-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Valoración
                </span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-range"
                className=" hidden flex flex-center ml-10 mt-2"
              >
                {[...Array(5)].map((_, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => handleStarMouseEnter(index)}
                    onMouseLeave={handleStarMouseLeave}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < filledStars ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-yellow-600 cursor-pointer peer peer-hover:text-yellow-400 hover:text-yellow-400 w-7 h-7"
                    >
                      <title>{"Star ${index + 1}"}</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72z"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <button
                type="button"
                className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => handleDropdownToggle("dropdown-price")}
              >
                <svg
                  fill="none"
                  className="flex-shrink-0 w-6 h-6 text-yellow-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  €/hora
                </span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-price" className="hidden py-2 space-y-2">
                <li>
                  <div>
                    <label
                      htmlFor="default-range"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    ></label>
                    <input
                      id="default-range"
                      type="range"
                      value={rangeValue}
                      onChange={handleRangeChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    ></input>
                    <div className="flex justify-between">
                      <span>{0}</span>
                      <span>{100}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside> */}

      <div className="w-full sm:w-auto mt-10 order-1 sm:order-2">
        <div className="flex flex-col items-center">
          <div className="max-w-3xl w-full mx-auto z-10">
            <div className="flex flex-col">
              

              <div>
                {store.all_professionals.length > 0 ? (
                   store.all_professionals.filter(el => el.hourly_rate > 0 && el.description.length > 0 ).map((professional, index) => (
                    <div key={index} className="col-1">
                      <Cardprofilepro  name={professional.name} hourly_rate={professional.hourly_rate} description={professional.description}  />
                    </div>
                  ))
                ) : (
                  <h1>No hay profesionales disponibles</h1>
                )}
                
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

