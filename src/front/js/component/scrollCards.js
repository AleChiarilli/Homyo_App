import React from "react";
import "../../styles/home.css";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";

export const Scrollcards = () => {

  return (
    <div className="flex justify-center">
      <main>
        <ul id="cards" className="flex justify-center mx-auto">
          <li className="card" id="card_1">
            <div className="card__content h-full">
              <div className="">
                <h2 className="text-indigo-500">Limpieza</h2>
                <p>Tu casa siempre en óptimas condiciones.</p>
              </div>
              <figure>
                <img src={limpieza} alt="Image description" />
              </figure>
            </div>
          </li>
          <li className="card" id="card_2">
            <div className="card__content h-full">
              <div className="">
                <h2 className="text-indigo-500">Cocina</h2>
                <p>
                  Encuentra el chef perfecto para cada ocasión, y deja que tu cocina cobre vida.
                </p>
              </div>
              <figure>
                <img src={chef} alt="Image description" />
              </figure>
            </div>
          </li>
          <li className="card" id="card_3">
            <div className="card__content h-full">
              <div className="">
                <h2 className="text-indigo-500">Cuidado de niños</h2>
                <p>
                  Conectamos cuidadores con experiencia con familias que buscan seguridad, calidez y atención personalizada para los más pequeños.
                </p>
              </div>
              <figure>
                <img src={niños} alt="Image description" />
              </figure>
            </div>
          </li>
          <li className="card" id="card_4">
            <div className="card__content h-full">
              <div className="">
                <h2 className="text-indigo-500">Cuidado de mascotas</h2>
                <p>
                  Un puente de confianza entre tus mascotas y cuidadores comprometidos.
                </p>
              </div>
              <figure>
                <img src={animales} alt="Image description" />
              </figure>
            </div>
          </li>
          <li className="card" id="card_5">
            <div className="card__content h-full">
              <div className="">
                <h2 className="text-indigo-500">Jardineria</h2>
                <p>Deja que florezca la belleza en cada rincón de tu jardín con nuestra red de expertos.</p>
              </div>
              <figure>
                <img src={jardineria} alt="Image description" />
              </figure>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
};
