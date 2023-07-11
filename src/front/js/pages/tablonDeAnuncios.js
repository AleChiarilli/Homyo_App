import React, { useCallback, useEffect, useContext, useState } from "react";
import { SimpleMap } from "../component/mapComponent";
import { Context } from "../store/appContext";


import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import { CardAnnounce } from "../component/cardAnnounce";




export const TablonDeAnuncios = () => {

  const { store, actions } = useContext(Context);


  const [seleccionados, setSeleccionados] = useState([]);

  const handleSeleccionar = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((item) => item !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };


  useEffect(() => {
    //bloque de codigo a ejecutar
    actions.getPostsOn();
  }, [])
  console.log(store.homePost);
  return (
    <div className="max-w-screen-xl grid grid-cols-3 gap-8 mx-auto mt-20">
      <div className="col-span-1">
        <SimpleMap homes={store.homePost} />
      </div>

      <div className="col-span-2 w-full">
        {store.homePost.map((item, index) => (
          <CardAnnounce key={index} timeDifference={item.time_difference} description={item.description}
            address={item.home_address} startingTime={item.starting_time} finishingTime={item.finishing_time}
            name={item.home_name} skills={item.skills} />
        ))}
      </div>
    </div>
  );
};

