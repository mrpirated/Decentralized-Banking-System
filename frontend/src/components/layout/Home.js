import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { auth } from "../../db";
import { useAuth } from "../../contexts/AuthContext";
import { UserNavbar } from "../layout/User/UserNavbar";
import { CompanyNavbar } from "../layout/Company/CompanyNavbar";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
const config = require("../../config/apipaths.json");
export default function Home(props) {
	const history = useHistory();
	const [error, setError] = useState("");
	const { currentUser, logout, UserId } = useAuth();
	const [DisplayNavbar, setDisplayNavbar] = useState(UserNavbar);
	const [data, setData] = useState({
		id: "",
		inhand: "",
		income: "",
		net_worth: "",
		tax_due: "",
	});
	//console.log(UserId);
	if (UserId == null) {
		history.push("/login");
	}
	useEffect(() => {
		if (UserId && UserId.startsWith("company")) {
			setDisplayNavbar(CompanyNavbar);
		}
	}, [UserId]);
	useEffect(() => {
		async function fetchData() {
			const result = await axios
				.get(config.getUserInfo, {
					params: {
						UserId: UserId,
					},
				})
				.then((res) => {
					//console.log("hello");
					console.log(res);
					var temp = {
						id: UserId,
						net_worth: res.data.net_worth,
						inhand: res.data.inhand,
						income: res.data.income,
						tax_due: res.data.tax_due,
					};
					setData(temp);
				})
				.catch((err) => {
					console.log(err);
				});
			console.log(result);
		}
		fetchData();
	});
	//console.log(currentUser.displayName);
	async function handleLogout() {
		setError("");

		try {
			await logout();
			history.push("/login");
		} catch {
			setError("Failed to log out");
		}
	}
	// useEffect(() => {
	// 	console.log(currentUser.displayName);
	// }, [currentUser]);

	return (
		<div>
			<Navbar titles={DisplayNavbar} />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "25px 0px",
					padding: "0px 0px 25px",
				}}
			>
				<label className='name-label-supplier' style={{ paddingRight: "10px" }}>
					UserId
				</label>
				<input
					type='text'
					value={data.id}
					style={{ marginRight: "90px" }}
					disabled
				></input>

				<label className='name-label-supplier' style={{ paddingRight: "10px" }}>
					Income
				</label>
				<input
					type='text'
					value={data.income}
					style={{ marginRight: "90px" }}
					disabled
				></input>

				<label className='name-label-supplier' style={{ paddingRight: "10px" }}>
					NetWorth
				</label>
				<input
					type='text'
					value={data.net_worth}
					style={{ marginRight: "90px" }}
					disabled
				></input>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					margin: "25px 0px",
					padding: "0px 0px 25px",
				}}
			>
				<label className='name-label-supplier' style={{ paddingRight: "10px" }}>
					Inhand
				</label>
				<input
					type='text'
					value={data.inhand}
					style={{ marginRight: "90px" }}
					disabled
				></input>
				<label className='name-label-supplier' style={{ paddingRight: "10px" }}>
					Tax Due
				</label>
				<input
					type='text'
					value={data.tax_due}
					style={{ marginRight: "90px" }}
					disabled
				></input>
			</div>
		</div>
	);
}
