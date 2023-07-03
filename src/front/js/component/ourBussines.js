import React from "react";
import atencion from "../../img/atencion.png";
import seguridad from "../../img/seguridad.png";
import tranquilidad from "../../img/tranquilidad.png";
import precio from "../../img/precio.png";


export const Ourbussines = () => {
return (

    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
        <img
          className="rounded-t-lg h-[200px] object-cover"
          src={seguridad}
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-500 dark:text-white">
            Seguridad
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Verificamos la identidad tanto del profesional como del
            cliente y protegemos tus pagos.
          </p>
        </div>
      </div>

      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
        <img
          className="rounded-t-lg h-[200px] object-cover"
          src={tranquilidad}
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-500 dark:text-white">
            Tranquilidad
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Contamos con los mejores profesionales del sector para
            garantizar un servicio TOP
          </p>
        </div>
      </div>

      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
        <img
          className="rounded-t-lg h-[200px] object-cover"
          src={atencion}
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-500 dark:text-white">
            Atención
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Atención al cliente los 365 días del año.
          </p>
        </div>
      </div>

      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
        <img
          className="rounded-t-lg h-[200px] object-cover"
          src={precio}
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-500 dark:text-white">
            Precio
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Tenemos los precios mas competitivos del mercado sin necesidad
            de cobrarte una comisión
          </p>
        </div>
      </div>
    </div>
  </div>
)
}