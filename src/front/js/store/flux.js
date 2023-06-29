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
            role: "cliente", // Establece el valor por defecto como 'cliente'
            token: "", //guardamos el token como un string vacio
        },
        actions: {
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
                            password: password,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await resp.json();
                    if (resp.status === 200) {
                        console.log(data);
                        localStorage.setItem("token", data.access_token);
                        localStorage.setItem("id", data.user.id);
                        setStore({
                            token: data.access_token,
                        });
                        return true;
                    } else {
                        return false;
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error); //Si se produce algún error dentro del bloque try, se captura en el bloque catch. Aquí, se imprime un mensaje de erro
                }
            },


            //INFORMACION DE PERFIL  DEL USUARIO-PROFESIONAL (INPUTS A LLENAR)
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

            //INFORMACION DE PERFIL DEL USUARIO-CLIENTE(INPUTS A LLENAR)
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

            //VALIDACION DE TOKEN 
            valide_token: async () => {
                const token = localStorage.getItem("token");
                try {
                    const resp = await axios.get(process.env.BACKEND_URL + "/api/valide-token", {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`

                        },
                    });
                    const data = await resp.json();
                    if (resp.status === 200) {
                        console.log(data);
                        // localStorage.setItem("token", data.access_token);
                        // localStorage.setItem("id", data.user.id);
                        // setStore({
                        //   token: data.access_token,
                        // });
                        return true;
                    }
                } catch (error) {
                    console.log(error); //Si se produce algún error dentro del bloque try, se captura en el bloque catch. Aquí, se imprime un mensaje de erro
                }
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