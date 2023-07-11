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

        {/* hay que tener en cuengta que el profesional debe aceptar el contrato asi que deberia quedar en pendiente de aceptacion */}
        {store.myContracts && store.myContracts.map((contract, index) => {
          console.log(contract.job_status.toLowerCase() != "pendiente")
          return (
            // definicion de contrato : es creado por el usuario o 
            (contract.posted_by == localStorage.getItem("id") || contract.job_status.toLowerCase() != "pendiente") ? 
            <div>               <p className="p-4 font-bold text-black text-md text-center dark:text-white">
              Tus Contratos
            </p>


              <Acceptedcontractclientcard
                contract={contract}
                key={index}
              />

            </div> : (
              // el else ternario significa que el id del post es distinto al del customer Y el estado es pendiente ( o cual se traduciria a una oferta )
              <div>
                <p className="p-4 font-bold text-black text-md text-center dark:text-white">Tus Ofertas</p>
                <Contractofferprofesionaltoclientcard
                  start={contract.starting_time}
                  end={contract.finishing_time}
                  name={contract.pro_profile_id.name}
                  total_price={contract.total_price}
                  contract_id={contract.id}
                  home_post_id={contract.home_post.id} // esto tierne que ser home post id para poder hacer el put 
                />
              </div>
            )
          );
        })}




      </div>
    </div>
  );
}

