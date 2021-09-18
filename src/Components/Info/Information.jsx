import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { LoaderSpinner } from "../Home/Loader";
import "./Information.css";

export const Information = () => {
	const { collision_id } = useParams();
	const [detailsData, setDetailsData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const collisionDetails = () => {
		setIsLoading(true);
		return axios
			.get(
				`https://data.cityofnewyork.us/resource/h9gi-nx95.json?collision_id=${collision_id}`
			)
			.then((res) => {
				setIsLoading(false);
				setDetailsData(res.data);
			})
			.catch((er) => {
				setIsLoading(false);
				setIsError(true);
			});
	};

	console.log(detailsData);

	useEffect(() => {
		collisionDetails();
	}, []);

	return isLoading ? (
		<LoaderSpinner />
	) : isError ? (
		<h2 style={{ color: "rgb(192, 45, 40)", textAlign: "center" }}>
			404 Something went wrong
		</h2>
	) : (
		<div>
			{detailsData?.map((item) => (
				<div className="details-container">
					<h1>Vehicle1-{item.contributing_factor_vehicle_1}</h1>
					<p>Crash-Date: {item.crash_date}</p>
					<p>Crash-Time :{item.crash_time}</p>
					<p>Cyclist-Injured:{item.number_of_cyclist_injured}</p>
					<p>Cyclist-Killed: {item.number_of_cyclist_killed}</p>
					<p>Motorist-Injured: {item.number_of_motorist_injured}</p>
                    <p>Motorist-Killed{ item.number_of_motorist_killed}</p>
                    <p>Pedestrians-Injured:{item.number_of_pedestrians_injured}</p>
					<p>Pedestrians-Killed:{item.number_of_pedestrians_killed}</p>
					<p>Persons-Injured:{item.number_of_persons_injured}</p>
					<p>Persons-Killed:{item.number_of_persons_killed}</p>
					<p>Street-Name{item.on_street_name}</p>
					<p>{item.vehicle_type_code1 && item.vehicle_type_code1}</p>
					<p>{item.vehicle_type_code2 && item.vehicle_type_code2}</p>
					<p>{item.vehicle_type_code3 && item.vehicle_type_code3}</p>
				</div>
			))}
		</div>
	);
};
