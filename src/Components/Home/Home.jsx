import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Home.css";
import { LoaderSpinner } from "./Loader";
import { Link } from "react-router-dom";

export const Home = () => {
	const [carData, setCarData] = useState([]);
	const [date, setDate] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [page, setPage] = useState(0);

	const getData = () => {
		setIsLoading(true);
		return axios
			.get(
				`https://data.cityofnewyork.us/resource/h9gi-nx95.json?$offset=${page}&$limit=6`
			)
			.then((res) => {
				console.log(res.data);
				setIsLoading(false);
				setIsError(false);
				setCarData(res.data);
			})
			.catch((er) => {
				setIsError(true);
			});
	};

	const filterByDate = (e) => {
		// e.preventDefault();
		setIsLoading(true);

		return axios
			.get(
				`https://data.cityofnewyork.us/resource/h9gi-nx95.json?crash_date=${date}`
			)
			.then((res) => {
				setIsLoading(false);
				setIsError(false);
				setCarData(res.data);
			})
			.catch((er) => {
				setIsError(true);
			});
	};

	function Debounce(fn, d) {
		let time;
		return function () {
			// console.log(this);
			// console.log(arguments);
			clearTimeout(time);
			time = setTimeout(() => {
				fn.call(this, arguments);
			}, d);
		};
	}

	const betterFn = Debounce(filterByDate, 300);

	const handlePagination = (value) => {
		setPage((prev) => prev + value);
	};

	useEffect(() => {
		getData();
	}, [page]);
	return isLoading ? (
		<LoaderSpinner />
	) : isError ? (
		<h2 style={{ color: "rgb(192, 45, 40)", textAlign: "center" }}>
			404 Something went wrong
		</h2>
	) : (
		<React.Fragment>
			<div className="filter-container">
				<input
					type="text"
					onChange={(e) => setDate(e.target.value)}
					value={date}
					name="date"
					onKeyUp={betterFn}
					className="input-filter"
					placeholder="filter based on date"
				/>
			</div>
			<div className="container">
				{carData?.map((item) => (
					<Link
						to={`/car-details/${item.collision_id}`}
						key={item.collision_id}
						className="mini-container"
					>
						<div>{item.vehicle_type_code1}</div>
						<div>{item.vehicle_type_code2 && item.vehicle_type_code2}</div>
						<div>{item.vehicle_type_code3 && item.vehicle_type_code3}</div>
						<div>Time: {item.crash_time}</div>
						<div>Date:{item.crash_date}</div>
					</Link>
				))}
			</div>
			<div className="pagination">
				<button
					className="prev"
					style={{ cursor: page === 0 && "not-allowed", display: "block" }}
					onClick={() => handlePagination(-1)}
				>
					Prev
				</button>
				<button className="next" onClick={() => handlePagination(1)}>
					Next
				</button>
			</div>
		</React.Fragment>
	);
};
