import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
	//dispatch is used to dispatch the action
	// const dispatch = useDispatch();
	//History used to move to other components
	const history = useHistory();
	let success = false;

	//logout function
	const handleLogout = () => {
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
						<Link className="active" to="/details">Info</Link>
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
