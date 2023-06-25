import React, { useCallback } from "react";
import { SimpleMap } from "../component/mapComponent";


export const TablonDeAnuncios = () => {
    const infoUser = [{ name: "Neil Sims", descripcion: "hago cosas", servicios: "Servicios que ofrece", reseñas: 2, email: "asd@gmail.com", direccion: [51.505, -0.09] },
    { name: "Bonnie Green", descripcion: "hago cosas", servicios: "Servicios que ofrece", reseñas: 2, email: "asd@gmail.com", direccion: [51.51, -0.09] },
    { name: "Jese Leos", descripcion: "hago cosas", servicios: "Servicios que ofrece", reseñas: 2, email: "asd@gmail.com", direccion: [51.52, -0.09] },
    { name: "Alejandro Chiarilli", descripcion: "NO hago cosas", servicios: "besitos", reseñas: 2, email: "asd@gmail.com", direccion: [51.52, -0.10] },
    { name: "Alejandro Chiarilli", descripcion: "NO hago cosas", servicios: "besitos", reseñas: 2, email: "asd@gmail.com", direccion: [51.52, -0.10] }]

    return (
        <div className="mt-20">
            <div className="max-w-screen-xl m-10 relative overflow-x-auto shadow-md sm:rounded-lg mx-auto">
                <div className="flex items-center justify-center pb-4 bg-white dark:bg-gray-900">
                    <div>
                        {/* AQUÍ ESTAN LOS DROPDOWNS PARA FILTRAR BÚSQUEDAS */}
                        <button id="dropdownBgHoverButton" data-dropdown-toggle="dropdownBgHover" className="mr-10 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Busco ofertas de... <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                        <div id="dropdownBgHover" className="z-10 hidden w-48 bg-white rounded-lg shadow dark:bg-gray-700">
                            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="checkbox-item-4" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-item-4" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Limpieza</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="checkbox-item-5" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-item-5" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Cocina</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="checkbox-item-6" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-item-6" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Cuidado de niños</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="checkbox-item-6" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-item-6" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Cuidado de mascotas</label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id="checkbox-item-6" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="checkbox-item-6" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Jardinería</label>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por código postal..." />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-8 py-3">
                                Espacio
                            </th>
                            <th scope="col" className="px-5 py-3">
                                Servicios que busca
                            </th>
                            <th scope="col" className="px-5 py-3">
                                Reseñas
                            </th>
                            <th scope="col" className="px-5 py-3">
                                Dirección
                            </th>

                            <th scope="col" className="px-5 py-3">
                                Contacto
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {infoUser.map((data, index) => (<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                                <div className="pl-3">
                                    <div className="text-base font-semibold">{data.name}</div>
                                    <div className="font-normal text-gray-500">{data.descripcion}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                {data.servicios}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    {data.reseñas}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {data.direccion}
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    <button type="button" className="text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        ✉️
                                    </button>
                                </a>
                            </td>
                        </tr>)
                        )}
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                                <div className="pl-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal text-gray-500">PEQUEÑA DESCRIPCIÓN</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                Servicios que ofrece
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    ⭐⭐
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    <button type="button" className="text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        ✉️
                                    </button>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <SimpleMap />
        </div>

    )
}