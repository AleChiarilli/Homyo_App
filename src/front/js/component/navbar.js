import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Navbar = ({ isLoggedIn }) => {
  const { actions } = useContext(Context);
  const { store } = useContext(Context);

  const [toggleActive, setToggleActive] = useState(true); // Establece el interruptor como activado por defecto

  const handleToggleActive = () => {
    setToggleActive(!toggleActive); // Invierte el estado del interruptor al hacer clic
    const role = toggleActive ? "empresa" : "cliente"; // Determina el rol actual en función del estado del interruptor
    handleRoleChange(role); // Llama a la función para cambiar el rol
  };

  const handleRoleChange = (role) => {
    actions.setRole(role); // Actualiza el rol en el contexto de la aplicación utilizando la función setRole del objeto actions
    console.log("Nuevo rol:", role); // Muestra el nuevo rol en la consola
  };

  const setRoleOnLoad = () => {
    handleRoleChange("cliente"); // Establece el rol como "cliente" al cargar la web
  };

  useEffect(() => {
    setRoleOnLoad();
  }, []); // Ejecuta setRoleOnLoad solo una vez al cargar el componente

  const [isModalOpen1, setIsModalOpen1] = useState(false); // Estado del primer modal
  const [ismodalOpen2, setIsmodalOpen2] = useState(false); // Estado del segundo modal
  const [username, setUsername] = useState(''); // Estado del nombre de usuario
  const [email, setEmail] = useState(''); // Estado del correo electrónico
  const [password, setPassword] = useState(''); // Estado de la contraseña

  const submitUser = async (e) => {
    e.preventDefault();
    await actions.addUser({ username, email, password }); // Envía los datos del usuario utilizando la acción addUser del objeto actions
  };

const userLoggin = async (e) => {
  e.preventDefault()
  await actions.login(email,password)
}

  const toggleModal1 = () => {
    setIsModalOpen1(!isModalOpen1); // Invierte el estado del primer modal al hacer clic
  };

  const togglemodal2 = () => {
    setIsmodalOpen2(!ismodalOpen2); // Invierte el estado del segundo modal al hacer clic
  };

  const hideModal1 = () => {
    setIsModalOpen1(false); // Cierra el primer modal
  };

  const hidemodal2 = () => {
    setIsmodalOpen2(false); // Cierra el segundo modal
  };

  const handleSearchKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault(); // Evita el envío automático del formulario al presionar Enter
      const searchUrl = store.role === 'Cliente' ? '/buscador' : '/tablon-de-anuncios'; // Determina la URL de redirección según el rol almacenado
      window.location.href = searchUrl; // Redirige al usuario a la URL correspondiente según el rol
    }
  };




  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          className="flex items-center"
          to="/"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-indigo-500">
            HOMYO
          </span>
        </Link>

        <div className="relative hidden md:block flex-2 ml-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 pl-10 text-sm text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            placeholder={store.role === 'Cliente' ? 'Encuentra el servicio' : 'Encuentra clientes'}
            onKeyDown={handleSearchKeyDown}
          />
          {store.role === 'Cliente' ? (
            <Link to="/buscador" className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-auto" />
          ) : (
            <Link to="/tablon-de-anuncios" className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-auto" />
          )}
        </div>



        {/* Switch empresa y cliente */}
        {isLoggedIn && (
          <div className="flex justify-center items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={toggleActive}
                onChange={handleToggleActive}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              <span className={`ml-3 text-sm font-medium ${toggleActive ? 'text-gray-900' : 'text-red-500'} dark:text-gray-300`}>
                {toggleActive ? 'Cliente' : 'Empresa'}
              </span>
            </label>
          </div>
        )
        }

        <div className="flex items-center">
          <div className="space-x-2">
            <div className="flex">
              {/* Modal toggle*/}
              {!isLoggedIn && (
                <div>
                  <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="px-6 py-2  transition ease-in duration-200 uppercase font-medium text-sm rounded-full hover:bg-indigo-800 hover:text-white border-2 border-indigo-900 focus:outline-none" type="button">Acceder</button>
                  <div id="dropdownHover" className="z-10 p-2 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 text-center" aria-labelledby="dropdownHoverButton">
                      <li>
                        <div className="p-1">
                          <button
                            data-modal-target="authentication-modal1"
                            data-modal-toggle="authentication-modal1"
                            className="px-6 py-2 w-full transition ease-in duration-200 uppercase font-medium text-sm rounded-full hover:bg-indigo-800 hover:text-white border-2 border-indigo-900 focus:outline-none"
                            type="button"
                            onClick={toggleModal1}
                          >
                            Regístrate
                          </button>
                        </div>
                      </li>

                      <li>
                        <div className="p-1">
                          <button
                            data-modal-target="authentication-modal2"
                            data-modal-toggle="authentication-modal2"
                            className="px-6 py-2 w-full transition ease-in duration-200 uppercase font-medium text-sm rounded-full hover:bg-indigo-800 hover:text-white border-2 border-indigo-900 focus:outline-none"
                            type="button"
                            onClick={togglemodal2}
                          >
                            Iniciar sesión
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}


              {/* Notificaciones toggle */}
              {isLoggedIn && (
                <div className="flex justify-center items-center">
                  <button button id="dropdownHoverButton1" data-dropdown-toggle="dropdownHover1" data-dropdown-trigger="hover" className="inline-flex items-center text-sm font-medium text-center text-indigo-500 hover:text-indigo-700 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button">
                    <svg className="w-10 h-10" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                    </svg>
                    <div className="relative flex">
                      <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full bottom-4 right-4 dark:border-gray-900"></div>
                    </div>
                  </button>

                  <div id="dropdownHover1" className="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownHoverButton1">
                    <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-indigo-50 dark:bg-gray-800 dark:text-white">
                      Notificaciones
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                      <a href="#" className="flex px-4 py-3 hover:bg-indigo-100 dark:hover:bg-gray-700">
                        <div className="flex-shrink-0">
                          <img className="rounded-full w-11 h-11" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                            <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
                        </div>
                      </a>
                      <a href="#" className="flex px-4 py-3 hover:bg-indigo-100 dark:hover:bg-gray-700">
                        <div className="flex-shrink-0">
                          <img className="rounded-full w-11 h-11" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                            <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
                        </div>
                      </a>
                      <a href="#" className="flex px-4 py-3 hover:bg-indigo-100 dark:hover:bg-gray-700">
                        <div className="flex-shrink-0">
                          <img className="rounded-full w-11 h-11" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                            <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
                        </div>
                      </a>
                      <a href="#" className="flex px-4 py-3 hover:bg-indigo-100 dark:hover:bg-gray-700">
                        <div className="flex-shrink-0">
                          <img className="rounded-full w-11 h-11" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                            <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
                        </div>
                      </a>
                      <a href="#" className="flex px-4 py-3 hover:bg-indigo-100 dark:hover:bg-gray-700">
                        <div className="flex-shrink-0">
                          <img className="rounded-full w-11 h-11" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                          <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                            <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                          </div>
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
                        </div>
                      </a>
                    </div>
                    <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                      <div className="inline-flex items-center ">
                        <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                        Ver todas                  </div>
                    </a>
                  </div>
                </div>

              )}


              {/* Mi Perfil toggle */}
              {isLoggedIn && (
                <div>
                  <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover"
                    className="px-6 py-2  transition ease-in duration-200 uppercase font-medium text-sm rounded-full hover:bg-indigo-800 hover:text-white border-2 border-indigo-900 focus:outline-none"
                    type="button">Mi Perfil
                  </button>
                  <div id="dropdownHover"
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownHoverButton">
                      <li>
                        <Link
                          to={store.role === 'Cliente' ? '/perfil-cliente' : '/perfil-profesional'}
                          className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white"
                        >
                          Panel de control
                        </Link>
                      </li>

                      <li>
                        <a href="#"
                          className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white">Mensajes</a>
                      </li>
                      <li>
                        <a href="#"
                          className="block px-4 py-2 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white">Salir</a>
                      </li>
                    </ul>
                  </div>

                </div>
              )}


              {/* Main modal 1 */}
              {isModalOpen1 && (
                <div
                  id="authentication-modal1"
                  tabIndex="-1"
                  aria-hidden="true"
                  className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      onClick={hideModal1}
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
                      {/* Modal content 1 */}
                      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                        Regístrate
                      </div>
                      <div className="flex gap-4 item-center">
                        <button type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                          <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
                            </path>
                          </svg>
                          Google
                        </button>
                      </div>

                      <div className="mt-8">
                        <form onSubmit={(e) => submitUser(e)} autoComplete="off">
                          <div className="flex flex-col mb-2">
                            <div className="flex relative ">
                              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                  </path>
                                </svg>
                              </span>
                              <input type="text" id="sign-in-username" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Nombre" onChange={(event) => setUsername(event.target.value)} />
                            </div>
                          </div>
                          <div className="flex flex-col mb-2">
                            <div className="flex relative ">
                              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                  </path>
                                </svg>
                              </span>
                              <input type="email" id="sign-in-email" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                            </div>
                          </div>
                          <div className="flex flex-col mb-6">
                            <div className="flex relative ">
                              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                  </path>
                                </svg>
                              </span>
                              <input type="password" id="sign-in-password" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} />
                            </div>
                          </div>

                          <div className="flex w-full">
                            <button type="submit" className="py-2 px-4  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"  >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="flex items-center justify-center mt-6">
                        <a href="#" target="_blank" className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
                          <span className="ml-2">
                            ¿Ya tienes cuenta?
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* Main modal 3 */}
              {ismodalOpen2 && (
                <div
                  id="authentication-modal2"
                  tabIndex="-1"
                  aria-hidden="true"
                  className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      onClick={hidemodal2}
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
                    {/* Modal content 3 */}
                    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                        Inicias sesión
                      </div>
                      <div className="flex gap-4 item-center">
                        <button type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                          <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
                            </path>
                          </svg>
                          Google
                        </button>
                      </div>
                      <div className="mt-8">
                        <form onSubmit = {e=>userLoggin(e)} autoComplete="off">
                          <div className="flex flex-col mb-2">
                            <div className="flex relative ">
                              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                  </path>
                                </svg>
                              </span>
                              <input onChange={(e)=>setEmail(e.target.value)} type="email" id="login-email" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Email" />
                            </div>
                          </div>
                          <div className="flex flex-col mb-6">
                            <div className="flex relative ">
                              <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                  </path>
                                </svg>
                              </span>
                              <input onChange={(e)=>setPassword(e.target.value)}  type="password" id="login-password" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Contraseña" />
                            </div>
                          </div>
                          <div className="flex items-center mb-6 -mt-4">
                            <div className="flex ml-auto">
                              <a href="#" className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white">
                                ¿Has olvidado tu contraseña?
                              </a>
                            </div>
                          </div>
                          <div className="flex w-full">
                            <input type="submit" className="py-2 px-4  bg-indigo-500 hover:bg-indigo-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " value="iniciar sesion"/>
                              
                          </div>
                        </form>
                      </div>
                      <div className="flex items-center justify-center mt-6">
                        <a href="#" target="_blank" className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
                          <span className="ml-2">
                            ¿No tienes cuenta?
                          </span>
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
    </nav>
  );
};