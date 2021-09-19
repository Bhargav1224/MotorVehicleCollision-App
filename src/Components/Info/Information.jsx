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

	useEffect(() => {
		collisionDetails();
		// eslint-disable-next-line
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
					<p className="p1">
						{item.borough ? `${item.borough}` : "No Information"}
					</p>
					<p className="p2">
						{item.contributing_factor_vehicle_1
							? `${item.contributing_factor_vehicle_1}`
							: "No Information"}
					</p>
					<p className="p3">
						{item.contributing_factor_vehicle_2
							? `Contributed-Vehicle-2:${item.contributing_factor_vehicle_2}`
							: "No Information"}
					</p>
					<p className="p4">
						{item.contributing_factor_vehicle_3
							? `Contributed-Vehicle-3:${item.contributing_factor_vehicle_3}`
							: "No Information"}
					</p>
					<p className="p5">{item.crash_date}</p>
					<p className="p6">{item.crash_time}</p>
					<p className="p7">
						{item.latitude ? `${item.latitude}` : "No Information"}
					</p>
					<p className="p8">
						{item.longitude ? `${item.longitude}` : "No Information"}
					</p>
					<p className="p9">
						{item.vehicle_type_code1
							? `${item.vehicle_type_code1}`
							: "No Information"}
					</p>
					<p className="p10">
						{item.vehicle_type_code2
							? `${item.vehicle_type_code2}`
							: "No Information"}
					</p>
					<p className="p11">
						{item.vehicle_type_code3
							? `${item.vehicle_type_code3}`
							: "No Information"}
					</p>
					<p className="p12">
						{item.zip_code ? ` ${item.zip_code}` : "No Information"}
					</p>
					<p className="p13">{item.cross_street_name}</p>
					<p className="p14">{item.number_of_cyclist_injured}</p>
					<p className="p15">Cyclist-Killed: {item.number_of_cyclist_killed}</p>
					<p className="p16">{item.number_of_motorist_injured}</p>
					<p className="p17">{item.number_of_motorist_killed}</p>
					<p className="p18">{item.number_of_pedestrians_injured}</p>
					<p className="p19">{item.number_of_pedestrians_killed}</p>
					<p className="p20">{item.number_of_persons_injured}</p>
					<p className="p21"> {item.number_of_persons_killed}</p>
					<p className="p22">
						{item.off_street_name
							? `${item.off_street_name}`
							: "No Information"}
					</p>
					<p className="p23">
						{item.on_street_name ? `${item.on_street_name}` : "No Information"}
					</p>
				</div>
			))}
		</div>
	);
};
