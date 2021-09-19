import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export const Sample = () => {
	const [carData, setCarData] = useState([]);

	let page = 1;
	const getData = () => {
		return axios
			.get(
				`https://data.cityofnewyork.us/resource/h9gi-nx95.json?$offset=${page}&$limit=8`
			)
			.then((res) => {
				console.log(res.data);
				setCarData(res.data);
			})
			.catch((er) => {
				alert(er);
			});
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<div className="list-container">
			{carData?.map((item) => {
				return (
					<>
						<Link
							to={`/car-details/${item.collision_id}`}
							key={item.collision_id}
							className="mini-container2"
						>
							<div className="mini-box2">
								<div className="card-content">{item.vehicle_type_code1}</div>
								<div className="card-content">
									{item.vehicle_type_code2
										? `Car-2:${item.vehicle_type_code2}`
										: ""}
								</div>
								<div className="card-content">
									{item.vehicle_type_code3
										? `Car-3:${item.vehicle_type_code3}`
										: ""}
								</div>
								<div className="card-content">{item.crash_time}</div>
								<div className="card-content">{item.crash_date}</div>
							</div>
						</Link>
					</>
				);
			})}
		</div>
	);
};
