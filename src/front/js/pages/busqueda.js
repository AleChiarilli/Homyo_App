import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import { Cardprofilepro } from "../component/cardProfilePro";

export const Busqueda = (props) => {


  const { store, actions } = useContext(Context);


  const handleDropdownToggle = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("hidden");
  };

  const [seleccionados, setSeleccionados] = useState([]);

  const handleSeleccionar = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((item) => item !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  const [filledStars, setFilledStars] = useState(0);

  const handleStarMouseEnter = (index) => {
    setFilledStars(index + 1);
  };

  const handleStarMouseLeave = () => {
    setFilledStars(0);
  };

  const [rangeValue, setRangeValue] = useState(50);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  useEffect(() => {
    actions.get_all_professionals();
  }, []);



  return (
    <div className="flex flex-col sm:flex-row justify-center mt-20 dark:bg-gray-800">
      <div className="w-full sm:w-auto mt-10 order-1 sm:order-2">
        <div className="flex flex-col items-center">
          <div className="max-w-3xl w-full mx-auto z-10">
            <div className="flex flex-col">


              <div>
                {store.all_professionals.length > 0 ? (
                  store.all_professionals.filter(el => el.hourly_rate > 0 && el.description.length > 0).map((professional, index) => (
                    <div key={index} className="col-1">
                      <Cardprofilepro name={professional.name} hourly_rate={professional.hourly_rate} description={professional.description} pro_id={professional.id} city={professional.city} />
                    </div>
                  ))
                ) : (
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textAlign: 'center'}}
                  >No hay profesionales disponibles</h1>
                )}

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

