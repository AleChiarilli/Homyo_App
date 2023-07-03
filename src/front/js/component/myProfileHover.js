import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Myprofilehover = () => {
    const { actions, store } = useContext(Context);
    const [isHovered, setIsHovered] = useState(false); // estados para el hover del boton de perfil. 

    const handleMouseEnter = () => { //si isLoggedIn es true y coloca el mouse encima del boton, se expandira la lista
        setIsHovered(true);
    };

    const handleMouseLeave = () => { //si isLoggedIn es true y NO coloca el mouse encima del boton se permanecera cerrado.
        setIsHovered(false);
    };

    return (
        <div className="flex items-center">
            <div className="space-x-2">
                <div className="flex">
                    {store.isLoggedIn && (
                        <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                id="dropdownHoverButton"
                                data-dropdown-toggle="myProfileHoverPanel"
                                data-dropdown-trigger="hover"
                                className="px-6 py-2 transition ease-in duration-200 uppercase font-medium text-sm rounded-full hover:bg-indigo-800 hover:text-white border-2 border-indigo-900 focus:outline-none"
                                type="button"
                            >
                                Mi Perfil
                            </button>
                            <div
                                id="myProfileHoverPanel"
                                className={`${
                                    isHovered ? "block" : "hidden"
                                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownHoverButton"
                                >
                                    <li>
                                        <Link
                                            to={
                                                store.role === "cliente"
                                                    ? "/mi-perfil-cliente"
                                                    : "/mi-perfil-profesional"
                                            }
                                            className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white"
                                        >
                                            Panel de control
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/mensajes"
                                            className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white"
                                        >
                                            Mensajes
                                        </Link>
                                    </li>
                                    <li>
                                        <p
                                            onClick={() => actions.logged_out()}
                                            className="block px-4 py-2 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white"
                                        >
                                            Salir
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
