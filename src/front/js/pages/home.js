import React from "react";
import "../../styles/home.css";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import buscar from "../../img/buscar.png";
import stripe from "../../img/stripe.png";
import relajate from "../../img/relajate.png";
import calendario from "../../img/calendario.png";
import atencion from "../../img/atencion.png";
import seguridad from "../../img/seguridad.png";
import tranquilidad from "../../img/tranquilidad.png";
import precio from "../../img/precio.png";
import { Valoraciones } from "../component/valoraciones";





export const Home = () => (
    <div className="flex flex-col items-center justify-center max-w-screen-2xl mx-auto mt-20 ">
        <div className="inline-flex rounded-md mb-4 ">
            <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full mx-1 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
                <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 fill-current"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                Limpieza
            </button>
            <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 rounded-full mx-1 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
                <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 fill-current"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                    ></path>
                </svg>
                Cocina
            </button>
            <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full mx-1 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
                <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 fill-current"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                Cuidado de Niños
            </button>
            <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full mx-1 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
                <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 fill-current"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                Cuidado de Mascotas
            </button>
            <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full mx-1 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
                <svg
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 fill-current"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                Jardineria
            </button>
        </div>

        <div className="flex justify-center">
            <main>
                <ul id="cards" className="flex justify-center mx-auto">
                    <li className="card" id="card_1">
                        <div className="card__content h-full">
                            <div>
                                <h2>Limpieza</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>
                                    <a href="#top" className="btn btn--accent">
                                        Read more
                                    </a>
                                </p>
                            </div>
                            <figure>
                                <img
                                    src={limpieza}
                                    alt="Image description"
                                />
                            </figure>
                        </div>
                    </li>
                    <li className="card" id="card_2">
                        <div className="card__content h-full">
                            <div>
                                <h2>Cocina</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>
                                    <a href="#top" className="btn btn--accent">
                                        Read more
                                    </a>
                                </p>
                            </div>
                            <figure>
                                <img
                                    src={chef}
                                    alt="Image description"
                                />
                            </figure>
                        </div>
                    </li>
                    <li className="card" id="card_3">
                        <div className="card__content h-full">
                            <div>
                                <h2>Cuidado de niños</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>
                                    <a href="#top" className="btn btn--accent">
                                        Read more
                                    </a>
                                </p>
                            </div>
                            <figure>
                                <img
                                    src={niños}
                                    alt="Image description"
                                />
                            </figure>
                        </div>
                    </li>
                    <li className="card" id="card_4">
                        <div className="card__content h-full">
                            <div>
                                <h2>Cuidado de mascotas</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>
                                    <a href="#top" className="btn btn--accent">
                                        Read more
                                    </a>
                                </p>
                            </div>
                            <figure>
                                <img
                                    src={animales}
                                    alt="Image description"
                                />
                            </figure>
                        </div>
                    </li>
                    <li className="card" id="card_5">
                        <div className="card__content h-full">
                            <div>
                                <h2>Jardineria</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <p>
                                    <a href="#top" className="btn btn--accent">
                                        Read more
                                    </a>
                                </p>
                            </div>
                            <figure>
                                <img
                                    src={jardineria}
                                    alt="Image description"
                                />
                            </figure>
                        </div>
                    </li>
                </ul>
            </main>
        </div>


        <section className="bg-white dark:bg-gray-900 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 py-8">¿Cómo funciona?</h1>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
                        <a href="#">
                            <img className="rounded-t-lg h-[200px] object-cover" src={buscar} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Busca el servicio que necesitas</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Cualquier cosa que necesites para tu hogar, nosotros te lo encontramos</p>
                        </div>
                    </div>



                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
                        <a href="#">
                            <img className="rounded-t-lg h-[200px] object-cover" src={calendario} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reserva la fecha y la hora que prefieras</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Nos adaptamos a tus necesidades</p>

                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
                        <a href="#">
                            <img className="rounded-t-lg h-[200px] object-cover" src={stripe} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Paga comodamente</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Al realizar tus pagos a traves de nuestra plataforma, el profesional recibirá el pago cuando confirmes que lo ha realizado</p>

                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
                        <a href="#">
                            <img className="rounded-t-lg h-[200px] object-cover" src={relajate} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Disfruta tu tiempo libre</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Porque lo primero eres tu y los tuyos.</p>

                        </div>
                    </div>

                </div>
            </div>
        </section>


        <section className="bg-white dark:bg-gray-900 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 py-8">¿Qué nos caracteriza?</h1>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
                        <a href="#">
                            <img className="rounded-t-lg h-[200px] object-cover" src={seguridad} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Seguridad</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Verificamos la identidad tanto del profesional como del cliente y protejemos tus pagos.</p>

                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
                        <a href="#">
                            <img className="rounded-t-lg h-[200px] object-cover" src={tranquilidad} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Tranquilidad</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Contamos con los mejores profesionales del sector para garantizar un servicio TOP</p>

                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
                        <a href="#">
                            <img className="rounded-t-lg h-[200px] object-cover" src={atencion} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Atención</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Atención al cliente los 365 días del año.</p>

                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
                        <a href="#">
                            <img className="rounded-t-lg h-[200px] object-cover" src={precio} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Precio</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Tenemos los precios mas competitivos del mercado sin necesidad de cobrarte una comisión</p>

                        </div>
                    </div>

                </div>
            </div>
        </section>

        <Valoraciones />


    </div>


);

export default Home;
