import React from "react";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";


export const BotonesFiltro = () => {

    return (
            <div className="flex-row gap-4 flex justify-center items-center ">
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >

                    <div className="flex-row gap-4 flex justify-center items-center">
                        <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                                <img alt="limpieza" src={limpieza} className="mx-auto object-fit rounded-full h-16 w-16 " />
                            </a>
                        </div>
                        <div className=" flex flex-col">
                            <span className="text-lg font-medium text-gray-600 dark:text-white">
                                Limpieza
                            </span>
                        </div>
                    </div>


                </button>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >

                    <div className="flex-row gap-4 flex justify-center items-center">
                        <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                                <img alt="cocina" src={chef} className="mx-auto object-fit rounded-full h-16 w-16 " />
                            </a>
                        </div>
                        <div className=" flex flex-col">
                            <span className="text-lg font-medium text-gray-600 dark:text-white">
                                Cocina
                            </span>
                        </div>
                    </div>


                </button>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >

                    <div className="flex-row gap-4 flex justify-center items-center">
                        <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                                <img alt="profil" src={niños} className="mx-auto object-fit rounded-full h-16 w-16 " />
                            </a>
                        </div>
                        <div className=" flex flex-col">
                            <span className="text-lg font-medium text-gray-600 dark:text-white">
                                Cuidado de niños
                            </span>
                        </div>
                    </div>


                </button>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >

                    <div className="flex-row gap-4 flex justify-center items-center">
                        <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                                <img alt="profil" src={animales} className="mx-auto object-fit rounded-full h-16 w-16 " />
                            </a>
                        </div>
                        <div className=" flex flex-col">
                            <span className="text-lg font-medium text-gray-600 dark:text-white">
                                Cuidado de mascotas
                            </span>
                        </div>
                    </div>


                </button>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-indigo-200 rounded-full mx-1 hover:bg-indigo-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >

                    <div className="flex-row gap-4 flex justify-center items-center">
                        <div className="flex-shrink-0">
                            <a href="#" className="relative block">
                                <img alt="profil" src={jardineria} className="mx-auto object-fit rounded-full h-16 w-16 " />
                            </a>
                        </div>
                        <div className=" flex flex-col">
                            <span className="text-lg font-medium text-gray-600 dark:text-white">
                                Jardineria
                            </span>
                        </div>
                    </div>


                </button>
            </div>
    );
}