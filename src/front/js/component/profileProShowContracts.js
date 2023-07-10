import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Acceptedcontractprofesionaldcard } from "../component/acceptedContractProfesionalCard";
import { Contractofferclienttoprofesionaldcard } from "../component/contractOfferClientToProfesionalCard";

export const Profileproshowcontracts = () => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getMyContractsPro()
        console.log(store.myContracts);
    }, [])

    return (

        <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0 custom-scrollbar">
            <div className="mx-0 mb-4 ">
                <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                    Tus Contratos Confirmados{" "}
                </p>
                {store.myContracts && store.myContracts
                .filter((contract)=>contract.job_status === "Aceptado")
                .map((contract,index)=> {
                  return (
                    <Acceptedcontractprofesionaldcard
                      contract={contract}
                      key={index}
                    />
                  );
                })}

                <p className="p-4 font-bold text-black text-md text-center dark:text-white">
                    Contratos por aceptar{" "}
                </p>
                {store.myContracts && store.myContracts
                .filter((contract)=>contract.job_status === "Pendiente")
                .map((contract,index)=> {
                  return (
                    <Contractofferclienttoprofesionaldcard
                      contract={contract}
                      key={index}
                  />
                )
              })}
            </div>
        </div>
    );
};
