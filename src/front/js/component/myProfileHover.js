import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Myprofilehover = () => {
    const { actions, store } = useContext(Context);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        store.isLoggedIn && (
            <div className="relative">
                <button
                    id="dropdownDefaultButton"
                    onClick={toggleDropdown}
                    className="px-6 py-2 transition ease-in duration-200 uppercase font-medium text-sm rounded-full hover:bg-indigo-800 hover:text-white border-2 border-indigo-900 focus:outline-none" type="button"
                >
                    Mi Perfil{" "}


                </button>
                {isDropdownOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">

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
                                    onClick={() =>
                                        actions.logged_out()
                                    }
                                    className="block px-4 py-2 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white"
                                >
                                    Salir
                                </p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        )
    );
};
