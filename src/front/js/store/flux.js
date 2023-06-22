const getState = ({ getStore, getActions,setStore }) => {
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
        // ...
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
  