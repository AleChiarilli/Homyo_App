import React, { useCallback, useEffect, useContext, useState } from "react";
import { SimpleMap } from "../component/mapComponent";
import { Context } from "../store/appContext";


import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import { CardAnnounce } from "../component/cardAnnounce";

// ESTE ES UNA PRUEBA PARA OBTENER LOS ANUNCIOS DEL STORE
// export const TablonDeAnuncios = () => {
//     const { actions, store } = useContext(Context);
//     useEffect(() => {
//         actions.getPublications("28017")
//     }, [])


//     const infoUser = store.publications



export const TablonDeAnuncios = () => {

  const handleDropdownToggle = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("hidden");
  };
  const [filledStars, setFilledStars] = useState(0);

  const { store, actions } = useContext(Context);

  const handleStarMouseEnter = (index) => {
    setFilledStars(index + 1);
  };

  const handleStarMouseLeave = () => {
    setFilledStars(0);
  };

  const [seleccionados, setSeleccionados] = useState([]);

  const handleSeleccionar = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((item) => item !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  const [rangeValue, setRangeValue] = useState(50);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  useEffect(() => {
    //bloque de codigo a ejecutar
    actions.getPostsOn();
  }, [])
  console.log(store.homePost);
  return (
    <>
    <div className="max-w-screen-xl md:grid md:grid-cols-3 gap-8 mt-20 mx-auto">
      <div className="col-span-1 hidden md:block">
        <SimpleMap homes={store.homePost} />
      </div>
      <div className="md:col-span-2 w-full">
                  {store.homePost.map((item, index) => (

                    (item.is_visible && (item["cmr_profile_id"] != localStorage.getItem("id"))) ?
                      <CardAnnounce key={index} timeDifference={item.time_difference} description={item.description}
                        address={item.home_address} startingTime={item.starting_time} finishingTime={item.finishing_time}
                        name={item.home_name} skills={item.skills} homePostId={item.id} />
                      : null
                  ))}

                </div>
              </div>
           
    </>
  );
};