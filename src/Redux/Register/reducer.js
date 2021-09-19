import { loadData, saveData } from "../../Utilis/localstorage";
import { REGISTER_SUCCESS } from "./actionTypes";

//Loading data from LocalStorage
const register = loadData("register");
const registername = loadData("registername");

//InitialState
const init = {
	success: register || false,
	registerName: registername || "",
};

//reducer which takes state and action
//state contains initialState
//action contains type and payload
export const registerReducer = (state = init, { type, payload }) => {
	switch (type) {
		case REGISTER_SUCCESS:
			//Saving data to localStorage
			saveData("register", true);
			saveData("registername", payload);
			return {
				...state,
				success: true,
				registerName: payload,
			};
		//default statement
		default:
			return state;
	}
};
