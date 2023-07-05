import React from "react"

export const Subscribe = () => {

    return (
        <div className="newsletter text-center pt-10 sm:pt-12 font-light flex items-center justify-center">
            <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                <div className=" relative ">
                    <input
                        type="text"
                        id='"form-subscribe-Subscribe'
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Email"
                    />
                </div>
                <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200"
                    type="submit"
                >
                    Suscribete
                </button>
            </form>
        </div>

    )
}