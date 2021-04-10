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
	const [error, setError] = useState("");
	const { currentUser, logout, UserId } = useAuth();
	const [DisplayNavbar, setDisplayNavbar] = useState(UserNavbar);
	console.log(UserId);
	useEffect(() => {
		if (UserId.startsWith("company")) {
			setDisplayNavbar(CompanyNavbar);
		}
	}, [UserId]);
	
	const history = useHistory();
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
		</div>
	);
}