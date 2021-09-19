// eslint-disable-next-line
import React, { useState } from "react";
import { loginSuccess } from "../../Redux/Login/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { registerSuccess } from "../../Redux/Register/action";
import { loadData } from "../../Utilis/localstorage";

export const useMergeState = (init) => {
	const [data, setData] = useState(init);

	const history = useHistory();
	//Dispatching the action
	const dispatch = useDispatch();
	const { username } = data;

	//handle change
	const handleChange = (e) => {
		let { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	//getting register username from localStorage
	const name = loadData("registername");

	const handleSubmit = (e) => {
		e.preventDefault();
		//dispatching action
		dispatch(loginSuccess(username));

		//Checking whether the register user and login user is same or not
		if (name === username) {
			history.push("/");
		} else {
			alert("Username is not correct");
		}
	};

	//state from registerReducer
	const { success } = useSelector((state) => state.register);

	const handleRegister = (e) => {
		e.preventDefault();
		dispatch(registerSuccess(username));
		//after register user will go to login component
		success ? history.push("/login") : history.push("/register");
	};

	return { data, handleChange, handleSubmit, handleRegister };
};
