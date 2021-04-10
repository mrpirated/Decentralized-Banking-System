import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import axios from "axios";
import react, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DataTable from "../DataTable";
const config = require("../../../config/apipaths.json");
export default function Popup(props) {
	const {
        rowData,
        openPopup,
        setOpenPopup
	} = props;
	const history = useHistory();
	const handleSubmit = (event) => {};
	return (
		<Dialog open={openPopup}>
			<DialogTitle>
				<div>User To User Transaction</div>
			</DialogTitle>
			<DialogContent>
				
			</DialogContent>
		</Dialog>
	);
}
