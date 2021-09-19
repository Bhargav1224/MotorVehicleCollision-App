import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Redirect } from "react-router";
//local imports
import "./Home.css";
import { LoaderSpinner } from "./Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadData } from "../../Utilis/localstorage";

export const Home = () => {
	//Stored the data from API in carData
	const [carData, setCarData] = useState([]);
	const [date, setDate] = useState("");
	//Loading,Error states used for Loading webpage when user onload the webpage
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	//Maintaining Pagination state
	const [page, setPage] = useState(0);

	const { username } = useSelector((state) => state.auth);

	const isRegister = loadData("register");

	//getting data from API
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

	//Filtering based on Date

	const filterByDate = (e) => {
		// e.preventDefault();

		return axios
			.get(
				`https://data.cityofnewyork.us/resource/h9gi-nx95.json?crash_date=${date}&$offset=${page}&$limit=6`
			)
			.then((res) => {
				setCarData(res.data);
				// getData();
			});
	};

	//Debouncing method , when user hit the input field , It will reduce the function calls

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

	//Handling pagination
	const handlePagination = (value) => {
		setPage((prev) => prev + value);
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line
	}, [page]);

	return isLoading ? (
		<LoaderSpinner />
	) : isError ? (
		<h2 style={{ color: "rgb(192, 45, 40)", textAlign: "center" }}>
			404 Something went wrong
		</h2>
	) :isRegister? (
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
	):(<Redirect to="/"/>)
};
