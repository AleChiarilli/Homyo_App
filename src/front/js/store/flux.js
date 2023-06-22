const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            //new user registration
            addUser: async (user) => {
                console.log(user)
                try {
                    const response = await fetch(process.env.BACKEND_URL + "api/user", { //variable de entorno que contiene la URL del backend.
                        method: 'POST',
                        body: JSON.stringify(user),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const data =await response.json();
                    console.log(data)
                }
                catch (error) {
                    console.log("error loading message from backend", error)
                }},
                

            //inicio de sesion ya registrado
            login: async (email, password) => {  //función asincrónica q toma como parametros email y password
                try {   // para envolver el código que puede generar una excepción.
                  const resp = await fetch(process.env.BACKEND_URL + "api/login", {
                    method: "POST",
                    body: JSON.stringify({
                      email: email,
                      password: password,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  const data = await resp.json(); //la respuesto de la solicitud POST la almaceno en resp.json y la almacenamos en data.
                  if (resp.status === 200) {
                    localStorage.setItem("token", data.access_token);
                    setStore({ tokenLs: data.access_token });
                    return true;
                  } else {
                    return false;
                  }
                } catch (error) {
                  console.log("Error loading message from backend", error); //Si se produce algún error dentro del bloque try, se captura en el bloque catch. Aquí, se imprime un mensaje de erro
                }
              },


            }
        };
    };

    export default getState;
