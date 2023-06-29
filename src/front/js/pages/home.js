import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
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
import servicios from "../../img/servicios.png";
import { Valoraciones } from "../component/valoraciones";

export const Home = () => {
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const { actions, store } = useContext(Context);

  const toggleModal4 = () => {
    setIsModalOpen4(!isModalOpen4);
  };

  const hideModal4 = () => {
    setIsModalOpen4(false);
  };

  return (
    <div className="max-w-screen-xl bg-white dark:bg-gray-800 p-4 mx-auto mt-20 ">
      <div className="flex justify-center">
        <main>
          <ul id="cards" className="flex justify-center mx-auto">
            <li className="card" id="card_1">
              <div className="card__content h-full">
                <div className="">
                  <h2 className="text-indigo-500">Limpieza</h2>
                  <p>Tu casa siempre en optimas condiciones.</p>
                </div>
                <figure>
                  <img src={limpieza} alt="Image description" />
                </figure>
              </div>
            </li>
            <li className="card" id="card_2">
              <div className="card__content h-full">
                <div className="">
                  <h2 className="text-indigo-500">Cocina</h2>
                  <p>
                    Olvidate de la comida a domicilio, nosotros nos encargamos
                    de hacerte comida casera
                  </p>
                </div>
                <figure>
                  <img src={chef} alt="Image description" />
                </figure>
              </div>
            </li>
            <li className="card" id="card_3">
              <div className="card__content h-full">
                <div className="">
                  <h2 className="text-indigo-500">Cuidado de niños</h2>
                  <p>
                    ¿No llegas a tiempo a recoger a tus niños del cole? ¿Llegan
                    tarde a las extraescolares? Estamos aquí para solucionarlo
                  </p>
                </div>
                <figure>
                  <img src={niños} alt="Image description" />
                </figure>
              </div>
            </li>

            <li className="card" id="card_4">
              <div className="card__content h-full">
                <div className="">
                  <h2 className="text-indigo-500">Cuidado de mascotas</h2>
                  <p>
                    Pasearemos y cuidaremos de tus mascotas cuando tu no puedas
                    hacerlo.
                  </p>
                </div>
                <figure>
                  <img src={animales} alt="Image description" />
                </figure>
              </div>
            </li>
            <li className="card" id="card_5">
              <div className="card__content h-full">
                <div className="">
                  <h2 className="text-indigo-500">Jardineria</h2>
                  <p>Con nosotros tus plantas y tu jardín están a salvo.</p>
                </div>
                <figure>
                  <img src={jardineria} alt="Image description" />
                </figure>
              </div>
            </li>
          </ul>
        </main>
      </div>

      <section className="bg-white dark:bg-gray-900 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 py-8">
          ¿Cómo funciona?
        </h1>
        <div className="py-8 px-4 mx-auto lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
              <img
                className="rounded-t-lg h-[200px] object-cover"
                src={buscar}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <span className="text-indigo-500">Busca</span> el servicio que
                  necesitas
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Cualquier servicio que necesites para tu hogar, nosotros te lo
                  encontramos
                </p>
              </div>
            </div>

            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
              <img
                className="rounded-t-lg h-[200px] object-cover"
                src={calendario}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <span className="text-indigo-500">Reserva</span> la fecha y la
                  hora que prefieras
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Nos adaptamos a tus necesidades
                </p>
              </div>
            </div>

            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
              <img
                className="rounded-t-lg h-[200px] object-cover"
                src={stripe}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <span className="text-indigo-500">Paga</span> comodamente
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Al realizar tus pagos a traves de nuestra plataforma, el
                  profesional recibirá el pago cuando confirmes que lo ha
                  realizado
                </p>
              </div>
            </div>

            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
              <img
                className="rounded-t-lg h-[200px] object-cover"
                src={relajate}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <span className="text-indigo-500">Disfruta</span> tu tiempo
                  libre
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Porque lo primero eres tu y los tuyos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 py-8">
          ¿Qué nos caracteriza?
        </h1>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
              <img
                className="rounded-t-lg h-[200px] object-cover"
                src={seguridad}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-500 dark:text-white">
                  Seguridad
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Verificamos la identidad tanto del profesional como del
                  cliente y protegemos tus pagos.
                </p>
              </div>
            </div>

            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
              <img
                className="rounded-t-lg h-[200px] object-cover"
                src={tranquilidad}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-500 dark:text-white">
                  Tranquilidad
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Contamos con los mejores profesionales del sector para
                  garantizar un servicio TOP
                </p>
              </div>
            </div>

            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
              <img
                className="rounded-t-lg h-[200px] object-cover"
                src={atencion}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-500 dark:text-white">
                  Atención
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Atención al cliente los 365 días del año.
                </p>
              </div>
            </div>

            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
              <img
                className="rounded-t-lg h-[200px] object-cover"
                src={precio}
                alt=""
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-500 dark:text-white">
                  Precio
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Tenemos los precios mas competitivos del mercado sin necesidad
                  de cobrarte una comisión
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Valoraciones />

      <section className="bg-white dark:bg-gray-900 text-center">
        <div className="bg-white dark:bg-gray-800 overflow-hidden relative">
          <div className="w-full py-12 px-4 sm:px-6 lg:flex lg:justify-between">
            <div className="lg:w-1/2 mt-24">
              <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                <span className="block">¿Quieres ofrecer tus servicios?</span>
                <span className="block text-indigo-500">Es ahora o nunca</span>
              </h2>
              {!store.isLoggedIn ? (
                <div className="mt-12 inline-flex rounded-md shadow">
                  <button
                    data-modal-target="authenticationModal4"
                    data-modal-toggle="authenticationModal4"
                    type="button"
                    onClick={toggleModal4}
                    className="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    Empieza ya
                  </button>
                </div>
              ) : (
                <div className="mt-12 inline-flex rounded-md shadow">
                  <button
                    data-modal-target="authenticationModal4"
                    data-modal-toggle="authenticationModal4"
                    type="button"
                    onClick={toggleModal4}
                    className="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg disabled:opacity-50 disabled:bg-gray-400" // Agregar clases para estilo deshabilitado
                    disabled // Agregar la propiedad disabled
                  >
                    Empieza ya
                  </button>
                </div>
              )}
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <img
                src={servicios}
                className="h-full max-w-full"
                alt="Services"
              />
            </div>
          </div>
        </div>
        {/* Main modal 4 */}
        {isModalOpen4 && (
          <div
            id="authenticationModal4"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={hideModal4}
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
              <div className="px-6 py-6 lg:px-8 text-center">
                {/* Modal content 4 */}
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                  Regístrate
                </div>
                <div className="flex gap-4 item-center">
                  <button
                    type="button"
                    className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="mr-2"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                    </svg>
                    Google
                  </button>
                </div>

                <div className="mt-8">
                  <form onSubmit={(e) => submitUser(e)} autoComplete="off">
                    <div className="flex flex-col mb-2">
                      <div className="flex relative ">
                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                          <svg
                            width="15"
                            height="15"
                            fill="currentColor"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                          </svg>
                        </span>
                        <input
                          type="text"
                          id="sign-in-username"
                          className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Nombre"
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="flex relative ">
                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                          <svg
                            width="15"
                            height="15"
                            fill="currentColor"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                          </svg>
                        </span>
                        <input
                          type="email"
                          id="sign-in-email"
                          className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Email"
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-6">
                      <div className="flex relative ">
                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                          <svg
                            width="15"
                            height="15"
                            fill="currentColor"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                          </svg>
                        </span>
                        <input
                          type="password"
                          id="sign-in-password"
                          className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Contraseña"
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex w-full">
                      <button
                        type="submit"
                        className="py-2 px-4  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                      >
                        Regístrate
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
                    <span className="ml-2">¿Ya tienes cuenta?</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
