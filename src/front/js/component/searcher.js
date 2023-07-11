import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Searcher = () => {
  const { actions, store } = useContext(Context);

  return (

<div className="relative">
{store.isLoggedIn && <button
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
}
    </div>
  )
}
