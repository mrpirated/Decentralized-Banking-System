const { Router } = require("express");
const express = require("express");

const { signup, login } = require("../controllers/auth");
const firebase = require("../db");
const router = express.Router();

router.post("/signup_user", signup);

router.post("/login_user", login);

router.post("/signup_company", signup);

router.post("/login_company", login);

router.post("/signup_govt", signup);

router.post("/login_govt", login);

router.get("/user", async (req, res) => {
	const user = firebase.auth().currentUser;
	console.log(user.displayName);
	res.send(user);
});

module.exports = router;
