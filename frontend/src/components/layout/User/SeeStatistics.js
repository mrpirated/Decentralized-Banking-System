import React from "react";
import DataTable from "../DataTable";
import Navbar from "../Navbar";
import { columns } from "./CompanyList";
import { UserNavbar } from "./UserNavbar";

function SeeStatistics() {
	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<Navbar titles={UserNavbar}></Navbar>
		</div>
	);
}

export default SeeStatistics;
