import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { UserNavbar } from "../layout/User/UserNavbar";
import { CompanyNavbar } from "../layout/Company/CompanyNavbar";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home(props) {
	// const [loggedin, setLoggedin] = useState(false);

	// const history = useHistory();
	// if (props.location.state.token.length > 0) {
	// 	setLoggedin(true);
	// }

	// if (!loggedin) {
	// 	history.push("/");
	// } 
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	console.log(currentUser.displayName);
	async function handleLogout() {
		setError("");

		try {
			await logout();
			history.push("/login");
		} catch {
			setError("Failed to log out");
		}
	}

	return (
		<div>
			<Navbar titles={CompanyNavbar}/>
		</div>
	);
}
