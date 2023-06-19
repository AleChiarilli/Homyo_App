import React, { useEffect } from "react";
import "../../styles/home.css";

export const Faq = () => {

return (

<div className="faq max-w-screen-xl p-8 mx-auto mt-20 text-center">
  <h2 className="mb-12 text-3xl font-extrabold leading-9 text-gray-900 border-b-2 border-gray-100">
        FAQs
    </h2>
    <ul className="faq flex flex-wrap items-start gap-8 justify-center">
        <li className="w-2/2">
            <p className="text-lg font-medium leading-6 text-gray-900">
                ¿Qúe es HOMYO?
            </p>
            <p className="mt-2">
                <p className="text-base leading-6 text-gray-500">
                    HOMYO nace de la necesidad que tienen las personas en su día a día para encontrar personas de confianza que puedan ir a su casa a realizar diferentes tareas.
                </p>
            </p>
        </li>
        <li className="w-2/2">
            <p className="text-lg font-medium leading-6 text-gray-900">
                ¿Puedo ofrecer mis servicios?
            </p>
            <p className="mt-2">
                <p className="text-base leading-6 text-gray-500">
                    Por supuesto, solamente tendrás que registrarte y proporcionarnos unos datos que necesitamos para verificar tu identidad y podrás empezar a trabajar.
                </p>
            </p>
        </li>
        <li className="w-2/2">
            <p className="text-lg font-medium leading-6 text-gray-900">
                ¿Puedo confiar mi hogar a los profesionales que ofrecen sus servicios en HOMYO?
            </p>
            <p className="mt-2">
                <p className="text-base leading-6 text-gray-500">
                    Por supuesto que sí, en HOMYO tenemos un minucioso sistema de verificación para asegurar en todo momento quien entra a tu hogar.
                </p>
            </p>
        </li>
        <li className="w-2/2">
            <p className="text-lg font-medium leading-6 text-gray-900">
                ¿Mi pago está asegurado?
            </p>
            <p className="mt-2">
                <p className="text-base leading-6 text-gray-500">
                    Así es, nosotros guardamos tu pago hasta que confirmas que el profesional ha realizado el servicio para que no tengas ningun problema al respecto.
                </p>
            </p>
        </li>
        <li className="w-2/2">
            <p className="text-lg font-medium leading-6 text-gray-900">
                ¿Y si tengo un problema?
            </p>
            <p className="mt-2">
                <p className="text-base leading-6 text-gray-500">
                    Nosotros  te acompañamos ante cualquier situacion que se pueda dar gracias a nuestro servicio de atención al cliente los 365 días del año.
                </p>
            </p>
        </li>
        
    </ul>
</div>
)


}