import React from "react";
import { Link } from "react-router-dom";
import { Payicons } from "./payIcons";
import { Socialnerworksicons } from "./socialNetworksIcons";
import { Subscribe } from "./subscribe";
import { Registerfooterform } from "./registerFooterForm";
import { Contactus } from "./contactUs";

export const Footer = () => {
  

  return (
    <footer className="bg-white dark:bg-gray-800 w-full py-8">
      <div className="max-w-screen-xl px-4 mx-auto">
        <ul className="flex flex-wrap justify-between max-w-screen-md mx-auto text-lg font-light">
          <li className="my-2">
            <Link
              className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              to="/preguntas-frecuentes"
            >
              Preguntas frecuentes
            </Link>
          </li>
          <Registerfooterform />
          <Contactus />
          <li className="my-2">
            <Link
              className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              to="/sobre-nosotros"
            >
              Sobre nosotros
            </Link>
          </li>
        </ul>
        <Socialnerworksicons />
        <Subscribe />
        <Payicons />
        <div className="text-center text-gray-500 dark:text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center">
          Realizado por A. Chiarilli, S. Fernandes, A. Gamero y J. Guerrero
        </div>
      </div>
    </footer>
  );
};
