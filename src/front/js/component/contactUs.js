import React, { useState } from "react";

export const Contactus = () => {
    const [isModalOpen6, setIsModalOpen6] = useState(false);

    const toggleModal6 = () => {
        setIsModalOpen6(!isModalOpen6);
    };

    const hideModal6 = () => {
        setIsModalOpen6(false);
    };

    return (
        <React.Fragment>
            <li className="my-2">
                <a
                    href="#"
                    data-modal-target="contact-modal"
                    data-modal-toggle="contact-modal"
                    type="button"
                    onClick={toggleModal6}
                    className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                >
                    Contáctanos
                </a>
            </li>

            {/* Main modal 6 */}
            {isModalOpen6 && (
                <div
                    id="contact-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            onClick={hideModal6}
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
                        {/* Modal content 6 */}
                        <form className="flex w-full max-w-sm space-x-3">
                            <div className="w-full max-w-2xl px-5 pb-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
                                <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
                                    Contáctanos
                                </div>
                                <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                                    <div className="col-span-2 lg:col-span-1">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="contact-form-name"
                                                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Nombre"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="contact-form-email"
                                                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-gray-700" htmlFor="comment">
                                            <textarea
                                                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                id="comment"
                                                placeholder="Escribe tu comentario"
                                                name="comment"
                                                rows="5"
                                                cols="40"
                                            ></textarea>
                                        </label>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <button
                                            type="submit"
                                            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
