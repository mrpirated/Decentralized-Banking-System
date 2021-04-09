"use-strict";

const firebase = require("../db");
const auth = firebase.auth();

const signup = async (req, res) => {
	const { email, password, id } = req.body;
	await auth
		.createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			//userCredential.user.displayName = id;
			//console.log(userCredential.user.id);
			res.send(userCredential.user);
		})
		.catch((err) => console.log(err));

	const user = auth.currentUser;

	await user
		.updateProfile({
			displayName: id,
		})
		.then(function () {})
		.catch(function (error) {
			console.log(error);
		});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	await auth
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			res.send(userCredential.user);
		})
		.catch((error) => {
			console.log(error);
		});
};

//signup("deepeshrathi9@gmail.com", "12345678");

module.exports = { signup, login };
