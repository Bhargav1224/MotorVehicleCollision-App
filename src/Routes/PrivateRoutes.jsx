import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export const PrivateRoute = ({
	redirect = "/register",
	path,
	push = false,
	children,
	exact,
}) => {
	const { success } = useSelector((state) => state.register);
	return success ? (
		<div>
			<Route path={path} exact={exact}>
				{children}
			</Route>
		</div>
	) : (
		<Redirect push={push} to={redirect} />
	);
};
