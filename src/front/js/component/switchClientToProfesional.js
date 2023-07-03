import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Switchclienttoprofesional = () => {

    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    const [toggleActive, setToggleActive] = useState(true); // Establece el interruptor como activado por defecto

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

    useEffect(() => {
        if (window.location.pathname === "/buscador" && toggleActive == false) {
            navigate("/tablon-de-anuncios");
        } else if (
            window.location.pathname === "/tablon-de-anuncios" &&
            toggleActive == true
        ) {
            navigate("/buscador");
        }
    }, [toggleActive]); // Cambia de ruta en el buscador segun rol

    useEffect(() => {
        if (
            window.location.pathname === "/mi-perfil-cliente" &&
            toggleActive == false
        ) {
            navigate("/mi-perfil-profesional");
        } else if (
            window.location.pathname === "/mi-perfil-profesional" &&
            toggleActive == true
        ) {
            navigate("/mi-perfil-cliente");
        }
    }, [toggleActive]); // Cambia de ruta en el perfil segun rol

    return (


        store.isLoggedIn && (
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
                    <span
                        className={`ml-3 text-sm font-medium hidden md:block ${toggleActive ? "text-gray-900" : "text-red-500"
                            } dark:text-gray-300`}
                    >
                        {toggleActive ? "Cliente" : "Profesional"}
                    </span>
                </label>
            </div>
        )


    );

}