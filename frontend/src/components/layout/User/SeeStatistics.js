import React, { useEffect, useState } from "react";
import DataTable from "../DataTable";
import Navbar from "../Navbar";
import { columns } from "./AllCompanyList";
import { UserNavbar } from "./UserNavbar";
import axios from "axios";
const config = require("../../../config/apipaths.json");

function SeeStatistics() {
	const [data, setData] = useState();
	const [govt, setGovt] = useState({
		inhand: "",
		net_worth: "",
	});
	useEffect(() => {
		async function fetchData() {
			await axios.get(config.getGovtInfo).then((res) => {
				let t = {
					inhand: res.data.inhand,
					net_worth: res.data.net_worth,
				};
				setGovt(t);
			});
			console.log(config.getAllCompanies);
			await axios.get(config.getAllCompanies).then((res) => {
				console.log(res.data);
				let temp = [];
				//console.log(items[0].Line);
				for (let i = 0; i < res.data.length; i++) {
					let t = {
						num: i + 1,
						id: res.data[i].id,
						inhand: res.data[i].inhand,
						income: res.data[i].income,
						net_worth: res.data[i].net_worth,
						salary: res.data[i].salary,
					};
					temp.push(t);
				}
				setData(temp);
			});
		}
		fetchData();
	}, []);
	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<Navbar titles={UserNavbar}></Navbar>
			<div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						margin: "25px 0px",
						padding: "0px 0px 25px",
					}}
				>
					<label>Government Public Information</label>
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
					<label
						className='name-label-supplier'
						style={{ paddingRight: "10px" }}
					>
						InHand
					</label>
					<input
						type='text'
						value={govt.inhand}
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
					<label
						className='name-label-supplier'
						style={{ paddingRight: "10px" }}
					>
						Net Worth
					</label>
					<input
						type='text'
						value={govt.net_worth}
						style={{ marginRight: "90px" }}
						disabled
					></input>
				</div>
			</div>
			<div>
				<DataTable
					title={"Company Information"}
					columns={columns}
					data={data}
				/>
			</div>
		</div>
	);
}

export default SeeStatistics;
