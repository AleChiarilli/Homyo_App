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
      //NEW USER REGISTRATION
      addUser: async (user) => {
        console.log(user)
        try {
          const response = await fetch(process.env.BACKEND_URL + "api/user", {
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

      //LOGIN USER
      login: async (email, password) => {
        try {
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
          const data = await resp.json();
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
      //INFORMACION DEL USUARIO-PROFESIONAL
      // profile_professional: async (profile_pic, description, address, postal_code, phone_number, hourly_rate) => {
      //   // console.log(user)
      //   try {
      //     const response = await fetch(process.env.BACKEND_URL + "api/pro_profile", {
      //       method: 'POST',
      //       body: JSON.stringify({
      //         profile_pic: profile_pic,
      //         description: description,
      //         address: address,
      //         postal_code: postal_code,
      //         phone_number: phone_number,
      //         hourly_rate: hourly_rate
      //       }),
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     })
      //     const data = await response.json();
      //     console.log(data)
      //   }
      //   catch (error) {
      //     console.log("error loading message from backend", error)
      //   }
      // },










      // establecer rol
      setRole: (role) => {
        const store = getStore();
        let updatedRole = '';

        switch (role) {
          case 'profesional':
            updatedRole = 'profesional';
            break;
          case 'cliente':
          default:
            updatedRole = 'cliente';
            break;
        }

        setStore({ ...store, role: updatedRole });
      }
    }
  };
};

export default getState;

