import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./actionTypes";

// action for LoginSuccess that takes username as payload
export const loginSuccess = (payload) => {
	return {
		type: LOGIN_SUCCESS,
		payload,
	};
};

//Logout
export const logoutSuccess = () => {
	return {
		type: LOGOUT_SUCCESS,
	};
};
