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
			// ÉSTE ES EL FETCH DE SIGN UP
			signUp: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "sign_up", {
					method: "POST",
					body: JSON.stringify({ 'email': email, 'password': password }),
					headers: {
						'Content-Type': 'application/json'
					},
				})
				const data = await resp.json()
				console.log(data);
			}

		}
	};
};

export default getState;
