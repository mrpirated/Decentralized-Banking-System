import React, { useRef, useState } from "react";
import {
	Form,
	Button,
	Card,
	Alert,
	Dropdown,
	DropdownButton,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import config from "../../config/apipaths.json";
export default function Register() {
	const [Type, setType] = useState("User");
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup, setUserId } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}
		try {
			setError("");
			setLoading(true);
			let type = 0;
			if (Type === "Government") type = 2;
			else if (Type === "Company") type = 1;
			//console.log("entered" + type);
			const userId = await axios
				.post(config.newId, {
					type: type,
				})
				.then((res) => {
					return res.data;
				});
			console.log(userId);

			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				type,
				userId
			);
			setUserId(userId);

			history.push("/");
		} catch {
			setError("Failed to create an account");
		}

		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Sign Up</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<DropdownButton id='dropdown-basic-button' title={Type}>
						<Dropdown.Item
							onClick={() => {
								setType("User");
							}}
						>
							User
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => {
								setType("Company");
							}}
						>
							Company
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => {
								setType("Government");
							}}
						>
							Government
						</Dropdown.Item>
					</DropdownButton>
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' ref={passwordRef} required />
						</Form.Group>
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type='password' ref={passwordConfirmRef} required />
						</Form.Group>
						<Button disabled={loading} className='w-100' type='submit'>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Already have an account? <Link to='/login'>Log In</Link>
			</div>
		</>
	);
}
