import React, {useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Scrollcards } from "../component/scrollCards";
import { Howitworks } from "../component/howItWorks";
import { Ourbussines } from "../component/ourBussines";
import { Valoraciones } from "../component/valoraciones";
import { Nowornever } from "../component/nowOrNever";

export const Home = () => {

  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getSkills();
    }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <section className="bg-white dark:bg-gray-800 p-4 mx-auto mt-20 hidden md:block">
        <Scrollcards />
      </section>

      <section className="bg-white dark:bg-gray-900 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 py-8">
          ¿Cómo funciona?
        </h1>
        <Howitworks />
      </section>

      <section className="bg-white dark:bg-gray-900 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 py-8">
          ¿Qué nos caracteriza?
        </h1>
        <Ourbussines />
      </section>

      {/* <section className="bg-white dark:bg-gray-900 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 py-8">
          Nuestros clientes opinan
        </h1>
        <Valoraciones />
      </section> */}

      <section className="bg-white dark:bg-gray-900 text-center">
        <Nowornever />
      </section>
    </div>
  );
};
