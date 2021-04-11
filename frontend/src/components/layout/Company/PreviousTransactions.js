import React, { useState, useEffect } from "react";
import DataTable from "../DataTable";
import Navbar from "../Navbar";
import { columns } from "./TransactionList";
import { CompanyNavbar } from "./CompanyNavbar";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
const config = require("../../../config/apipaths.json");
function PreviousTransactions() {
	const [data, setData] = useState([{}]);
	const { UserId } = useAuth();
	useEffect(() => {
		console.log(UserId);
		//console.log(config.getAllUsers);
		async function fetchData() {
			const result = await axios
				.get(config.getCompanyTransactions, {
					params: {
						UserId: UserId,
					},
				})
				.then((res) => {
					//console.log("hello");
					console.log(res);
					let temp = [];
					//console.log(items[0].Line);
					for (let i = 0; i < res.data.length; i++) {
						let t = {
							num: i + 1,
							id: res.data[i].id,
							fromid: res.data[i].fromid,
							toid: res.data[i].toid,
							amount: res.data[i].amount,
							summary: res.data[i].summary,
							success: res.data[i].success,
						};
						temp.push(t);
					}
					setData(temp);
				})
				.catch((err) => {
					console.log(err);
				});
			console.log(result);
		}
		fetchData();
	}, []);
	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<Navbar titles={CompanyNavbar}></Navbar>
			<DataTable title='Transaction Table' columns={columns} data={data} />
		</div>
	);
}

export default PreviousTransactions;
