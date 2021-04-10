"use strict";

//const db = require("../db");
<<<<<<< HEAD
const Company = require("../models/Company");
=======

const Company = require("../models/Company");

>>>>>>> 62c6dc51e840f00c03b3d5d700486e28322c8f17
const { LMS, web3 } = require("../web3conn");

const createVacancy = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	const { vacancy, salary, companyId } = req.body;

	let result = await lms
		.createVacancy(web3.utils.asciiToHex(companyId), vacancy, salary, {
			from: accounts[0],
		})
		.then((id) => {
			return id;
		});
	res.send("Vacancy created");
};

const recruitEmployee = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	const { userId, companyId } = req.body;

	let result = await lms
		.recruitEmployee(
			web3.utils.fromAscii(companyId),
			web3.utils.fromAscii(userId),
			{ from: accounts[0] }
		)
		.then((id) => {
			return id;
		});

	res.send(" Recruited ");
};

const createProduct = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const user = auth.currentUser;
	const { cost_price, selling_price, quantity, companyId } = req.body;

	let result = await lms
		.createProduct(
			web3.utils.fromAscii(companyId),
			cost_price,
			selling_price,
			quantity,
			{
				from: accounts[0],
			}
		)
		.then((id) => {
			return id;
		});

	res.send(companyId + " Added product ");
};

const changeProductDetails = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const { productId, cost_price, selling_price, quantity } = req.body;

	let result = await lms
		.changeProductDetails(
			web3.utils.fromAscii(productId),
			cost_price,
			selling_price,
			quantity,
			{ from: accounts[0] }
		)
		.then((id) => {
			return id;
		});

	res.send("Details changed of product ");
};

module.exports = {
	createVacancy,
	recruitEmployee,
	createProduct,
	changeProductDetails,
};
