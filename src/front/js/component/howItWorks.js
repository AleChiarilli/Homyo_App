import React from "react";
import buscar from "../../img/buscar.png";
import stripe from "../../img/stripe.png";
import relajate from "../../img/relajate.png";
import calendario from "../../img/calendario.png";
import pagomano from "../../img/pagomano.png";



export const Howitworks = () => {
return (

<div className="py-8 px-4 mx-auto lg:py-16 cursor-pointer">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
    <img
      className="rounded-t-lg h-[200px] object-cover"
      src={buscar}
      alt=""
    />
    <div className="p-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="text-indigo-500">Busca</span> el servicio que
        necesitas
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Cualquier servicio que necesites para tu hogar, nosotros te lo
        encontramos
      </p>
    </div>
  </div>

  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
    <img
      className="rounded-t-lg h-[200px] object-cover"
      src={calendario}
      alt=""
    />
    <div className="p-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="text-indigo-500">Reserva</span> la fecha y la
        hora que prefieras
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Nos adaptamos a tus necesidades
      </p>
    </div>
  </div>

<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
  <div className="flex justify-center">
    <img
      className="rounded-t-lg h-[200px] object-cover"
      src={pagomano}
      alt=""
    />
  </div>
  <div className="p-5">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      <span className="text-indigo-500">Paga</span> comodamente
    </h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Realiza tus pagos de manera comoda en casa una vez el profesional haya realizado el servicio
    </p>
  </div>
</div>


  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-all hover:scale-110">
    <img
      className="rounded-t-lg h-[200px] object-cover"
      src={relajate}
      alt=""
    />
    <div className="p-5">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="text-indigo-500">Disfruta</span> tu tiempo
        libre
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Porque lo primero eres tu y los tuyos.
      </p>
    </div>
  </div>
</div>
</div>
)
}