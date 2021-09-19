import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../Redux/Login/action";
import { saveData } from "../../Utilis/localstorage";

export const Navbar = () => {
	//state from authReducer
	const { success, username } = useSelector((state) => state.auth);

	//dispatch is used to dispatch the action
	const dispatch = useDispatch();
	//History used to move to other components
	const history = useHistory();

	//logout function
	const handleLogout = () => {
		saveData("register", false);
		saveData("registername", "");
		dispatch(logoutSuccess());
		history.push("/login");
	};

	return (
		<div>
			<nav>
				<Link to="/" className="logo">
					MVC
				</Link>
				<input type="checkbox" id="click" />
				<label for="click" className="menu-btn">
					<i className="fas fa-bars"></i>
				</label>
				<ul>
					<li>
						{/* After login register is replacing with username */}
						{success ? (
							<h1 className="username">{username}</h1>
						) : (
							<Link className="active" to="/register">
								Register
							</Link>
						)}
					</li>
					<li>
						{/* After login --login is replacing with logout */}
						{success ? (
							<button onClick={handleLogout} className="logoutButton">
								Logout
							</button>
						) : (
							<Link className="active" to="/login">
								Login
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
};
