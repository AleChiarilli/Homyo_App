import axios from "axios"

const getState = ({

    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {

            message: null,
            demo: [{
                title: "FIRST",
                background: "white",
                initial: "white",
            },
            {
                title: "SECOND",
                background: "white",
                initial: "white",
            },
            ],
            token: "", //guardamos el token como un string vacio
            isLoggedIn: true, // si cambio esto a true si se abren los hover
            role: 'cliente', // Establece el valor por defecto como 'cliente', ¿duplicado? linea 24
            publications: [],
            homePost: [],
            user:{}

        },
        actions: {
            // getPublications: async (postalCode) => {
            //     try {
            //         const response = await fetch(`${process.env.BACKEND_URL}/api/home_post`)
            //         const data = await response.json()
            //         setStore({ publications: data })
            //     } catch (error) {
            //         console.error(error)
            //     }
            // },

            getPostsOn: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/home_post`)
                    const data = await response.json()
                    setStore({ homePost: data.results })
                } catch (error) {
                    console.error(error)
                }
            },

            //NEW USER REGISTRATION => FALTA IMPLEMENTARLO POR PARTE DEL BACK
            addUser: async (user) => {
                console.log(user);
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/user", {
                        method: "POST",
                        body: JSON.stringify(user),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //LOGIN USER
            login: async (email, password) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            password: password

                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await resp.json();
                    if (resp.status === 200) {
                        console.log(data);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("id", data.user.id);
                        setStore({
                            ...getStore(),
                            isLoggedIn: true,
                            user:data.user
                        });
                        return true;
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error)
                    return false; //Si se produce algún error dentro del bloque try, se captura en el bloque catch. Aquí, se imprime un mensaje de erro
                }
            },


            //AGREGAR INFORMACION DE PERFIL  DEL USUARIO-PROFESIONAL (INPUTS A LLENAR)
            profile_professional: async (
                verified,
                dni,
                description,
                address,
                city,
                postal_code,
                phone_number,
                hourly_rate
            ) => {
                console.log(profile_professional);
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/pro_profile", {
                        method: "POST",
                        body: JSON.stringify({
                            verified: verified,
                            dni: dni,
                            description: description,
                            address: address,
                            city: city,
                            postal_code: postal_code,
                            km_radius: km_radius,
                            phone_number: phone_number,
                            hourly_rate: hourly_rate,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                    );
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            ///PUT PARA INFORMACION DEL USUARIO-PROFESIONAL

            modify_professional: async (
                verified,
                dni,
                description,
                address,
                city,
                postalCode,
                phoneNumber,
                hourlyRate
              ) => {
                try {
                  const token = localStorage.getItem('token');
                  const url = process.env.BACKEND_URL + "/pro_profile/";
              
                  const data = {
                    verified: verified,
                    dni: dni,
                    description: description,
                    address: address,
                    city: city,
                    postal_code: postalCode,
                    phone_number: phoneNumber,
                    hourly_rate: hourlyRate,
                  };
              
                  const response = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                    },
                  });
              
                  const responseData = await response.json();
                  console.log(responseData);
                  // Realizar las acciones necesarias después de la actualización exitosa
                } catch (error) {
                  console.log("Error al cargar los datos desde el backend", error);
                  // Realizar las acciones necesarias en caso de error
                }
              },

            //GET PARA OBTENER LA INFORMACION DEL PERFIL USUARIO-PROFESIONAL
            get_profile_info: async (id) => {
                const userId = localStorage.getItem("id");
                console.log(userId);
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/pro_profile/" + userId
                    );
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //AGREGAR INFORMACION DE PERFIL DEL USUARIO-CLIENTE(INPUTS A LLENAR)
            profile_customer: async (description, phone_number) => {
                console.log(profile_professional);
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/cmr_profile", {
                        method: "POST",
                        body: JSON.stringify({
                            description: description,
                            phone_number: phone_number,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                    );
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

             //GET PARA OBTENER LA INFORMACION DEL PERFIL USUARIO-CLIENTE
             get_profile_customer_info: async (id) => {
                const userId = localStorage.getItem("id");
                console.log(userId);
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/cmr_profile/" + userId
                    );
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //VALIDACION DE TOKEN 
            valide_token: async () => {
                const token = localStorage.getItem("token");
                console.log(token);
                try {
                    const data = await axios.get(
                        process.env.BACKEND_URL + "/api/valide-token",
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (data.status === 200) {
                        console.log(data);
                        setStore({
                            isLoggedIn: data.data.isLogged,
                        });
                    }
                    return true;
                    //}
                } catch (error) {
                    console.log(error); //Si se produce algún error dentro del bloque try, se captura en el bloque catch. Aquí, se imprime un mensaje de erro
                }
            },

            //FUNCION CERRAR SESION 
            logged_out: () => {
                localStorage.removeItem("token")
                localStorage.removeItem("id")
                setStore({
                    isLoggedIn: false,
                });
            },

            // establecer rol
            setRole: (role) => {
                const store = getStore();
                let updatedRole = "";

                switch (role) {
                    case "profesional":
                        updatedRole = "profesional";
                        break;
                    case "cliente":
                    default:
                        updatedRole = "cliente";
                        break;
                }

                setStore({
                    ...store,
                    role: updatedRole,
                });
            },
        },
    };
};

export default getState;