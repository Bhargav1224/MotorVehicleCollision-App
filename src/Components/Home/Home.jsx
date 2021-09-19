import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
//local imports
import "./Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	//Stored the data from API in carData
	const [carData, setCarData] = useState([]);
	const [date, setDate] = useState("");

	//Maintaining Pagination state
	const [page, setPage] = useState(0);
	const [list, setList] = useState(false);
	const [grid, setGrid] = useState(false);

	//getting data from API
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

	//Filtering based on Date

	const filterByDate = (e) => {
		// e.preventDefault();

		if (date.length > 1) {
			return axios
				.get(
					`https://data.cityofnewyork.us/resource/h9gi-nx95.json?crash_date=${date}&$offset=${page}&$limit=6`
				)
				.then((res) => {
					setCarData(res.data);
					// getData();
				});
		} else {
			getData();
		}
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

	//handleList view
	const handleList = () => {
		setList(true);
		setGrid(false);
	};
	//handleGrid view

	const handleGrid = () => {
		setList(false);
		setGrid(true);
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line
	}, [page]);

	return (
		<React.Fragment>
			<div className="filter-container">
				<input
					type="text"
					onChange={(e) => setDate(e.target.value)}
					value={date}
					name="date"
					onKeyUp={betterFn}
					className="input-filter"
					placeholder="Filter based on Date"
				/>
				<div className="icon">
					<div className="list" onClick={handleList}>
						<span className="list-icon"></span>
						<span className="list-icon"></span>
						<span className="list-icon"></span>
					</div>
					<div className="grid" onClick={handleGrid}>
						<span className="grid-icon"></span>
						<span className="grid-icon"></span>
						<span className="grid-icon"></span>
						<span className="grid-icon"></span>
					</div>
				</div>
			</div>
			{grid ? (
				<div className="container">
					{carData?.map((item) => {
						return (
							<>
								<Link
									to={`/car-details/${item.collision_id}`}
									key={item.collision_id}
									className="mini-container"
								>
									<div className="mini-box">
										<div className="card-content1">
											{item.vehicle_type_code1}
										</div>
										<div className="card-content2">
											{item.vehicle_type_code2
												? `Car-2:${item.vehicle_type_code2}`
												: ""}
										</div>
										<div className="card-content3">
											{item.vehicle_type_code3
												? `Car-3:${item.vehicle_type_code3}`
												: ""}
										</div>
										<div className="card-content4">{item.crash_time}</div>
										<div className="card-content5">{item.crash_date}</div>
									</div>
								</Link>
							</>
						);
					})}
				</div>
			) : list ? (
				<div className="container2">
					{carData?.map((item) => {
						return (
							<>
								<Link
									to={`/car-details/${item.collision_id}`}
									key={item.collision_id}
									className="mini-container2"
								>
									<div className="mini-box">
										<div className="card-content1">
											{item.vehicle_type_code1}
										</div>
										<div className="card-content2">
											{item.vehicle_type_code2
												? `Car-2:${item.vehicle_type_code2}`
												: ""}
										</div>
										<div className="card-content3">
											{item.vehicle_type_code3
												? `Car-3:${item.vehicle_type_code3}`
												: ""}
										</div>
										<div className="card-content4">{item.crash_time}</div>
										<div className="card-content5">{item.crash_date}</div>
									</div>
								</Link>
							</>
						);
					})}
				</div>
			) : (
				<div className="container">
					{carData?.map((item) => {
						return (
							<>
								<Link
									to={`/car-details/${item.collision_id}`}
									key={item.collision_id}
									className="mini-container"
								>
									<div className="mini-box">
										<div className="card-content1">
											{item.vehicle_type_code1}
										</div>
										<div className="card-content2">
											{item.vehicle_type_code2
												? `Car-2:${item.vehicle_type_code2}`
												: ""}
										</div>
										<div className="card-content3">
											{item.vehicle_type_code3
												? `Car-3:${item.vehicle_type_code3}`
												: ""}
										</div>
										<div className="card-content4">{item.crash_time}</div>
										<div className="card-content5">{item.crash_date}</div>
									</div>
								</Link>
							</>
						);
					})}
				</div>
			)}
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
