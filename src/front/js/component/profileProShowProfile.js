import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import { Cardprofilepro } from "../component/cardProfilePro";

export const Profileproshowprofile = () => {
    const { store, actions } = useContext(Context);

    //ESTADOS DE LOS INPUTS A RELLENAR POR EL PROESIONAL
    //const [verified, setVerified] = useState("");
    const [dni, setDni] = useState(store.pro_profile && store.pro_profile.dni);
    const [description, setDescription] = useState(store.pro_profile && store.pro_profile.description);
    const [address, setAddress] = useState(store.pro_profile && store.pro_profile.address);
    const [city, setCity] = useState(store.pro_profile && store.pro_profile.city);
    const [postal_code, setPostal_code] = useState(store.pro_profile && store.pro_profile.postal_code);
    const [km_radius, setKm_radius] = useState(store.pro_profile && store.pro_profile.km_radius);
    const [phone_number, setPhone_number] = useState(store.pro_profile && store.pro_profile.phone_number);
    const [hourly_rate, setHourly_rate] = useState(store.pro_profile && store.pro_profile.hourly_rate);
    const [seleccionados, setSeleccionados] = useState([]);


    //FUNCION PARA EL FORM
    const info_professional = async (e) => {
        e.preventDefault();
        console.log(description)
        await actions.profile_professional(
            //verified,
            dni,
            description,
            address,
            city,
            postal_code,
            km_radius,
            phone_number,
            hourly_rate,
        ); // Envía los datos del usuario utilizando la acción addUser del objeto actions
    };

     //USEEFFECT PARA QUE CARGUE LA INFORMACION DEL FORMULARIO
     useEffect(() => {
        actions.get_profile_info();
    }, []);


    const handleSeleccionar = (id) => {
        if (seleccionados.includes(id)) {
            setSeleccionados(seleccionados.filter((item) => item !== id));
        } else {
            setSeleccionados([...seleccionados, id]);
        }
    };
   

    return (
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0 custom-scrollbar">
                <div className="flex flex-col flex-wrap sm:flex-row ">
                    <div className="w-full">
                        <div className="mb-4">
                            <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                                <form
                                    onSubmit={(e) => info_professional(e)}
                                    className="p-4"
                                >
                                    <p className="text-center font-bold text-black text-md dark:text-white">
                                        Mis Datos
                                    </p>
                                    <div className="grid md:grid-cols-3 md:gap-6">
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                type="text"
                                                name="floating_first_name"
                                                id="floating_first_name"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder="Nombre "
                                                required
                                            />
                                            <label
                                                htmlFor="floating_first_name"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            ></label>
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                type="text"
                                                name="floating_last_name"
                                                id="floating_last_name"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder="Apellido 1"
                                                required
                                            />
                                            <label
                                                htmlFor="floating_last_name"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            ></label>
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                type="text"
                                                name="floating_last_name"
                                                id="floating_last_name"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder="Apellido 2"
                                                required
                                            />
                                            <label
                                                htmlFor="floating_last_name"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            ></label>
                                        </div>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            type="email"
                                            name="floating_email"
                                            id="floating_email"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder="Email"
                                            required
                                        />
                                        <label
                                            htmlFor="floating_email"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        ></label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            onChange={(event) => setDni(event.target.value)}
                                            type="text"
                                            name="floating_id"
                                            id="floating_id"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder="DNI"
                                            value={dni}
                                            required
                                        />
                                        <label
                                            htmlFor="floating_id"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        ></label>
                                    </div>
                                    <div className="grid md:grid-cols-3 md:gap-6">
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                onChange={(event) =>
                                                    setAddress(event.target.value)
                                                }
                                                type="text"
                                                name="floating_adress"
                                                id="floating_adress"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder="Dirección "
                                                value={address}
                                                required
                                            />
                                            <label
                                                htmlFor="floating_adress"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            ></label>
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                onChange={(event) =>
                                                    setPostal_code(event.target.value)
                                                }
                                                type="text"
                                                name="floating_cp"
                                                id="floating_cp"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder="Código Postal "
                                                value={postal_code}
                                                required
                                            />
                                            <label
                                                htmlFor="floating_cp"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            ></label>
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                onChange={(event) => setCity(event.target.value)}
                                                type="text"
                                                name="floating_city"
                                                id="floating_city"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder="Ciudad"
                                                value={city}
                                                required
                                            />
                                            <label
                                                htmlFor="floating_city"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            ></label>
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                onChange={(event) =>
                                                    setKm_radius(event.target.value)
                                                }
                                                type="text"
                                                name="floating_radio"
                                                id="floating_radio"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder="Distancia Km"
                                                value={km_radius}
                                                required
                                            />
                                            <label
                                                htmlFor="floating_radio"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            ></label>
                                        </div>
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                onChange={(event) =>
                                                    setHourly_rate(event.target.value)
                                                }
                                                type="text"
                                                name="floating_price"
                                                id="floating_price"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder="Precio/hora"
                                                value={hourly_rate}
                                                required
                                            />
                                            <label
                                                htmlFor="floating_price"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            ></label>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-1 md:gap-6">
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input
                                                onChange={(event) =>
                                                    setPhone_number(event.target.value)
                                                }
                                                type="number"
                                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                name="floating_phone"
                                                id="floating_phone"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder="Teléfono "
                                                value={phone_number}
                                                required
                                            />
                                            <label
                                                htmlFor="floating_phone"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            ></label>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                                            Descripción
                                        </p>
                                        {/* <form
                                         onSubmit={(e) => info_professional(e)}> */}
                                            
                                            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                    <label htmlFor="comment" className="sr-only">
                                                        Descríbete
                                                    </label>
                                                    <textarea
                                                        onChange={(event) =>
                                                            setDescription(event.target.value)
                                                        }
                                                        type="text"
                                                        id="comment"
                                                        rows="4"
                                                        className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                        placeholder="Descríbete..."
                                                        value={description}
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                        {/* </form> */}
                                    </div>

                                    <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                                        Mis Servicios
                                    </p>
                                    <ul className="p-4 flex justify-center">
                                        <li>
                                            <button
                                                type="button"
                                                id="limpieza"
                                                className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("limpieza")
                                                    ? "bg-indigo-100 text-blue-700"
                                                    : ""
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
                                                className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("cocina")
                                                    ? "bg-indigo-100 text-blue-700"
                                                    : ""
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
                                                className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("niños")
                                                    ? "bg-indigo-100 text-blue-700"
                                                    : ""
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
                                                className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("animales")
                                                    ? "bg-indigo-100 text-blue-700"
                                                    : ""
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
                                                className={`flex h-[50px] items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${seleccionados.includes("jardineria")
                                                    ? "bg-indigo-100 text-blue-700"
                                                    : ""
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
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Empieza a trabajar
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                                Mi Perfil
                            </p>
                            <Cardprofilepro />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
