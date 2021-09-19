import { loadData, saveData } from "../../Utilis/localstorage";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./actionTypes";

//Loading data from  LocalStorage
const login = loadData("login");
const user = loadData("loginuser");

//Initial state
const init = {
	success: login || false,
	username: user || "",
};

//Reducer can take state and action
//action contains type and payload
//state contains initialState

export const authReducer = (state = init, { type, payload }) => {
	switch (type) {
		case LOGIN_SUCCESS:
			//saving data to LocalStorage
			saveData("login", true);
			saveData("loginuser", payload);
			return {
				...state,
				success: true,
				username: payload,
			};
		case LOGOUT_SUCCESS:
			//saving data to LocalStorage

			saveData("login", false);
			saveData("loginuser", "");

			return {
				...state,
				success: false,
				username: "",
			};

		default:
			return state;
	}
};
