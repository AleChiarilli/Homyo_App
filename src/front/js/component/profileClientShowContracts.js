import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Acceptedcontractclientcard } from "../component/acceptedContractClientCard";
import { Contractofferprofesionaltoclientcard } from "../component/contractOfferProfesionalToClientCard";

export const Profileclientshowcontracts = () => {

  const { actions, store } = useContext(Context);

  useEffect(() => {
    actions.getMyContracts()
    console.log(store.myContracts);
  }, [])

  return (


    <div className="md:h-screen pt-2 pb-24 pl-2 pr-2 md:overflow-auto md:pt-0 md:pr-0 md:pl-0 md:custom-scrollbar">
      <div className="mx-0 mb-4">
        <p className="p-4 font-bold text-black text-md text-center dark:text-white">
          Tus Contratos
        </p>
        {/* hay que tener en cuengta que el profesional debe aceptar el contrato asi que deberia quedar en pendiente de aceptacion */}
        {store.myContracts && store.myContracts.map((contract, index) => {
          return (
            <Acceptedcontractclientcard
              contract={contract}
              key={index}
            />
          )
        })}

        <p className="p-4 font-bold text-black text-md text-center dark:text-white">
          Ofertas para tus anuncios
        </p>
        
        <Contractofferprofesionaltoclientcard />
      </div>
    </div>
  );
}

