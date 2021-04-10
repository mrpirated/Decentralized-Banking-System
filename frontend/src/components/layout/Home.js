import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { auth } from '../../db';
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
	const { currentUser, logout, UserId } = useAuth();
	console.log(UserId);
	const history = useHistory();
<<<<<<< HEAD
	const nowUser = auth.currentUser.displayName;
	console.log(nowUser);
=======
	//console.log(currentUser.displayName);
>>>>>>> 3ca2d73f21e008ad863ad7f6e6c0310e58da6aa2
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
			<Navbar titles={CompanyNavbar} />
		</div>
	);
}