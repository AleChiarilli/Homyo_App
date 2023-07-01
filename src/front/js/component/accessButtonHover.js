import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";


export const Accesbuttonhover = () => {
    const [error, setError] = useState(false); // Establece el interruptor como activado por defecto
    const { actions, store } = useContext(Context);
    const [toggleActive, setToggleActive] = useState(true); // Establece el interruptor como activado por defecto
    const [isModalOpen1, setIsModalOpen1] = useState(false); // Estado del primer modal
    const [ismodalOpen2, setIsmodalOpen2] = useState(false); // Estado del segundo modal
    const [username, setUsername] = useState(""); // Estado del nombre de usuario
    const [email, setEmail] = useState(""); // Estado del correo electrónico
    const [password, setPassword] = useState(""); // Estado de la contraseña

    const handleToggleActive = () => {
        setToggleActive(!toggleActive); // Invierte el estado del interruptor al hacer clic
        const role = toggleActive ? "profesional" : "cliente"; // Determina el rol actual en función del estado del interruptor
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

    const submitUser = async (e) => {
        e.preventDefault();
        await actions.addUser({ username, email, password, role }); // Envía los datos del usuario utilizando la acción addUser del objeto actions
    };

    const userLoggin = async (e) => {
        e.preventDefault();
        let auth = await actions.login(email, password);
        if (auth) {
            setIsmodalOpen2(false);
        }
        setIsmodalOpen2(true);
        setError(true);
    };

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


    return (

        <div className="flex items-center ">
            <div className="space-x-2">
                <div className="flex">
                    {!store.isLoggedIn && (
                        <div>
                            <button
                                id="dropdownHoverButton"
                                data-dropdown-toggle="dropdownHover"
                                data-dropdown-trigger="hover"
                                className="px-6 py-2  transition ease-in duration-200 uppercase font-medium text-sm rounded-full hover:bg-indigo-800 hover:text-white border-2 border-indigo-900 focus:outline-none"
                                type="button"
                            >
                                Acceder
                            </button>
                            <div
                                id="dropdownHover"
                                className="z-10 p-2 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200 text-center"
                                    aria-labelledby="dropdownHoverButton"
                                >
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
                                {/* Modal content 1 */}
                                <div className="px-6 py-6 lg:px-8 text-center">
                                    <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                                        Regístrate
                                    </div>
                                    <div className="mt-8">
                                        <form
                                            id="signupForm"
                                            onSubmit={(e) => submitUser(e)}
                                            autoComplete="off"
                                        >
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
                                                        onChange={(event) =>
                                                            setUsername(event.target.value)
                                                        }
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
                                                        onChange={(event) =>
                                                            setEmail(event.target.value)
                                                        }
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
                                                        onChange={(event) =>
                                                            setPassword(event.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>


                                            <div className="flex justify-center items-center flex-col">
                                                <p className="text-m mb-1 text-center">Registrate como:</p>
                                                <label className="relative inline-flex items-center cursor-pointer mb-5">
                                                    <input
                                                        type="checkbox"
                                                        value=""
                                                        className="sr-only peer"
                                                        checked={toggleActive}
                                                        onChange={handleToggleActive}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                                    <span
                                                        className={`ml-3 text-sm font-medium ${toggleActive
                                                            ? "text-gray-900"
                                                            : "text-red-500"
                                                            } dark:text-gray-300`}
                                                    >
                                                        {toggleActive ? "Cliente" : "Profesional"}
                                                    </span>
                                                </label>
                                            </div>

                                            <div className="flex w-full">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Evita el envío del formulario por defecto
                                                        hideModal1(); // Cierra el modal
                                                        document.getElementById('signupForm').submit(); // Envía el formulario
                                                    }}
                                                    type="submit"
                                                    className="py-2 px-4 bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
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

                    {/* Main modal 2 */}
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
                                {/* Modal content 2 */}
                                <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                                    <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                                        Inicia sesión
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
                                        <form
                                            id="userLoginForm"
                                            onSubmit={(e) => userLoggin(e)}
                                            autoComplete="off"
                                        >
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
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        type="email"
                                                        id="login-email"
                                                        className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        placeholder="Email"
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
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        type="password"
                                                        id="login-password"
                                                        className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        placeholder="Contraseña"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-6 -mt-4">
                                                <div className="flex ml-auto">
                                                    <a
                                                        href="#"
                                                        className="inline-flex text-xs font-thin text-gray-500 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                                                    >
                                                        ¿Has olvidado tu contraseña?
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex w-full">
                                                <input

                                                    type="submit"
                                                    className="py-2 px-4  bg-indigo-500 hover:bg-indigo-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                                    value="Iniciar sesión"
                                                />
                                                {error ? (
                                                    <p>Usuario o contraseña no existe</p>
                                                ) : null}
                                            </div>
                                        </form>
                                    </div>
                                    <div className="flex items-center justify-center mt-6">
                                        <a
                                            href="#"
                                            target="_blank"
                                            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                                        >
                                            <span className="ml-2">¿No tienes cuenta?</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
