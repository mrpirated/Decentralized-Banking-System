import React, { useEffect, useState } from "react";
import DataTable from "../DataTable";
import Navbar from "../Navbar";
import { columns } from "./CompanyList";
import { UserNavbar } from "./UserNavbar";
import axios from "axios";
const config = require("../../../config/apipaths.json");

function SeeStatistics() {
	const [data, setData] = useState();
	const [govt, setGovt] = useState();
	useEffect(() => {
		async function fetchData() {
			await axios.get(config.getGovtInfo).then((res) => {
				let t = {
					inhand: res.data.inhand,
					net_worth: res.data.net_worth,
				};
				setGovt(t);
			});
		}
		fetchData();
	}, []);
	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<Navbar titles={UserNavbar}></Navbar>
		</div>
	);
}

export default SeeStatistics;
