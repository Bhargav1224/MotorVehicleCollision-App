import { REGISTER_SUCCESS } from "./actionTypes";
// action for RegisterSuccess that takes username as payload
export const registerSuccess = (payload) => {
	return {
		type: REGISTER_SUCCESS,
		payload,
	};
};
