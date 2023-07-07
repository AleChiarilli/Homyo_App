import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Searcher = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState()

  const handleSearchKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      actions.getPostsByCity(searchCity)
      const searchUrl =
        store.role === "cliente" ? "/buscador" : "/tablon-de-anuncios";
      navigate(searchUrl);
    }
  };

  return (
//     <div className="relative md:block flex-2 ml-4">
//       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//         <svg
//           className="w-5 h-5 text-gray-500"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fillRule="evenodd"
//             d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//             clipRule="evenodd"
//           ></path>
//         </svg>
//         <span className="sr-only">Search icon</span>
//       </div>
//       <input
//         type="text"
//         onChange={(e) => {setSearchCity(e.target.value)}}
//         id="search-navbar"
//         className="block w-20 sm:w-full p-2 pl-10 text-xs sm:text-base text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-purple-200"
//         placeholder={
//           store.role === "cliente"
//             ? "Encuentra el servicio"
//             : "Encuentra clientes"
//         }
//         onKeyDown={handleSearchKeyDown}
//       />
//       {store.role === "cliente" ? (
//         <Link
//           to="/buscador"
//           className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-auto"
//         />
//       ) : (
//         <Link
//           to="/tablon-de-anuncios"
//           className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-auto"
//         />
//       )}
//     </div>
//   );
// };

<div className="relative">
<button
      type="button"
      className="px-6 py-2 transition ease-in duration-200 uppercase font-medium text-sm rounded-full hover:bg-indigo-800 hover:text-white border-2 border-indigo-900 focus:outline-none"
      >
      {store.role === "cliente" ? (
        <Link
          to="/buscador"
        >
          Encuentra profesionales
        </Link>
      ) : (
        <Link
          to="/tablon-de-anuncios"
        >
          Encuentra clientes
        </Link>
      )}
    </button>

    </div>
  )
}
