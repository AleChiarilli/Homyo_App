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


            }
        };
    };

    export default getState;
