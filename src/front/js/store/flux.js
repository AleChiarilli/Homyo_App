import axios from "axios"

const getState = ({

    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {

            message: null,
            // demo: [{
            //     title: "FIRST",
            //     background: "white",
            //     initial: "white",
            // },
            // {
            //     title: "SECOND",
            //     background: "white",
            //     initial: "white",
            // },
            //],
            token: "", //guardamos el token como un string vacio
            isLoggedIn: false,
            role: 'cliente', // Establece el valor por defecto como 'cliente', ¿duplicado? linea 24
            publications: [],
            homePost: [],
            user: {},
            pro_profile: {},
            cmr_profile:{}

        },
        actions: {

            getPostsOn: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/home_post`)
                    const data = await response.json()
                    setStore({
                        homePost: data.results
                    })
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

                        let homeNames = [];
                        if (
                            data.user &&
                            data.user.cmr_profile &&
                            data.user.cmr_profile.length > 0 &&
                            data.user.cmr_profile[0].homes &&
                            data.user.cmr_profile[0].homes.length > 0
                        ) {
                            // Obtener los nombres de todas las casas en la lista
                            homeNames = data.user.cmr_profile[0].homes.map(home => home.name);
                        }

                        localStorage.setItem("token", data.token);
                        localStorage.setItem("id", data.user.id);
                        localStorage.setItem("home", JSON.stringify(homeNames));

                        setStore({
                            ...getStore(),
                            isLoggedIn: true,
                            user: data.user
                        });

                        return true;
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error);
                    return false;
                }
            },


            //AGREGAR INFORMACION DE PERFIL  DEL USUARIO-PROFESIONAL (INPUTS A LLENAR)
            profile_professional: async (
                dni,
                description,
                address,
                city,
                postal_code,
                km_radius,
                phone_number,
                hourly_rate
            ) => {
                const userId = localStorage.getItem("id");
                console.log(description)
                try {

                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/pro_profile/", {
                        method: "PUT",
                        body: JSON.stringify({
                            user_id: userId,
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
                            "Authorization": `Bearer ${localStorage.getItem("token")}`

                        },
                    }
                    );
                    const data = await response.json();
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //GET PARA OBTENER LA INFORMACION DEL PERFIL USUARIO-PROFESIONAL
            get_profile_info: async (id) => {
                const token = localStorage.getItem("token");

                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/pro_profile/", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                    );
                    const data = await response.json();
                    setStore({ pro_profile: data.result })
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //AGREGAR INFORMACION DE PERFIL DEL USUARIO-CLIENTE(INPUTS A LLENAR) (no me funciona)

            profile_customer: async ( phone_number  ) => {
                const userId = localStorage.getItem("id");
                console.log(phone_number)
                try {

                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/cmr_profile", {
                        method: "PUT",
                        body: JSON.stringify({
                            user_id: userId,
                            phone_number: phone_number,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
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
                const token = localStorage.getItem("token");

                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/cmr_profile", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                    );
                    const data = await response.json();
                    setStore({ cmr_profile: data.result})
                    console.log("------------------------------------------------",data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //FETCH PARA CREAR UN ESPACIO/HOME
            addHome: async (home) => {
                console.log(home);
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/home", {
                        method: "POST",
                        body: JSON.stringify(home),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
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
                        process.env.BACKEND_URL + "/api/valide-token", {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
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