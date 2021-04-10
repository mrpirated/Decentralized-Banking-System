import React from "react";
import DataTable from "../DataTable";
import Navbar from "../Navbar";
import { columns } from "./TransactionList";
import { CompanyNavbar } from "./CompanyNavbar";

function PreviousTransactions() {
	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<Navbar titles={CompanyNavbar}></Navbar>
			<DataTable title='Transaction Table' columns={columns} />
		</div>
	);
}

export default PreviousTransactions;
