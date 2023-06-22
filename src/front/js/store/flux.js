const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: 'FIRST',
          background: 'white',
          initial: 'white'
        },
        {
          title: 'SECOND',
          background: 'white',
          initial: 'white'
        }
      ],
      role: 'cliente' // Establece el valor por defecto como 'cliente'
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
          const data = await response.json();
          console.log(data)
        }
        catch (error) {
          console.log("error loading message from backend", error)
        }
      },

      // establecer rol
      setRole: (role) => {
        const store = getStore();
        let updatedRole = '';

        switch (role) {
          case 'empresa':
            updatedRole = 'Empresa';
            break;
          case 'cliente':
          default:
            updatedRole = 'Cliente';
            break;
        }

        setStore({ ...store, role: updatedRole });
      }
    }
  };
};

export default getState;
