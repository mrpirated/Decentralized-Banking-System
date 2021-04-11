import React, { useState } from "react";
import DataTable from "../DataTable";
import Navbar from "../Navbar";
import { CompanyNavbar } from "./CompanyNavbar";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
const config = require("../../../config/apipaths.json");
function CreateVacancy() {
	const [Vacancy, setVacancy] = useState(0);
	const [Salary, setSalary] = useState(0);
	const { UserId } = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();

		await axios
			.post(config.createVacancy, {
				vacancy: Vacancy,
				salary: Salary,
				companyId: UserId,
			})
			.then((res) => {
				console.log(res);
				alert(res.data);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<Navbar titles={CompanyNavbar}></Navbar>
			<div style={{ width: "50%", margin: "0 auto" }}>
				<h1
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						margin: "25px 0px",
						padding: "0px 0px 25px",
					}}
				>
					Create Vacancy
				</h1>
				<form className='form' onSubmit={handleSubmit}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							margin: "25px 0px",
							padding: "0px 0px 25px",
						}}
					>
						<label style={{ paddingRight: "25px" }}>Total Vacancies:</label>
						<input
							type='text'
							value={Vacancy}
							onChange={(event) => setVacancy(event.target.value)}
						/>
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
						<label style={{ paddingRight: "25px" }}>Salary:</label>
						<input
							type='text'
							value={Salary}
							onChange={(event) => setSalary(event.target.value)}
						/>
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
						<input type='submit' className='btn btn-primary' value='Login' />
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateVacancy;
