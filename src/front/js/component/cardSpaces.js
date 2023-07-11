import React from "react";
import house from "../../img/house.png";

export const Cardspaces = (props) => {
  return (
    <div className="mb-4">
      <p className="p-4 font-bold text-black text-md text-center dark:text-white">
        {props.name}
      </p>
      <div className="p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700 flex flex-col md:flex-row">
        <div className="flex flex-col md:w-1/3">
          <img
            className="object-contain rounded-full md:h-96 md:h-auto"
            src={house}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal md:w-2/3">
          <div className="flex flex-col text-left justify-between p-4 leading-normal">
            <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
              <b>Dirección</b>: {props.address}
            </h5>
          </div>
          <div className="flex flex-col text-left justify-between p-4 leading-normal">
            <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
              <b>Código Postal</b>: {props.postalCode}
            </h5>
          </div>
          <div className="flex flex-col text-left justify-between p-4 leading-normal">
            <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
              <b>Ciudad</b> : {props.city}
            </h5>
          </div>
          <div className="flex flex-col text-left justify-between p-4 leading-normal">
            <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">
              <b>Descripción</b>: {props.description}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
