"use strict";

//const db = require("../db");
const Company = require("../models/Company");
const { LMS, web3 } = require("../web3conn");

const createVacancy = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const user = auth.currentUser;
	let companyId = user.displayName;
	const { vacancy, salary } = req.body;

	let result = await lms
		.createVacancy(web3.utils.asciiToHex(companyId), vacancy, salary, {
			from: accounts[0],
		})
		.then((id) => {
			return id;
		});

	// if (result.logs[0].args["0"]) {
	// 	await db.collection("Companies").doc(companyId).update({
	// 		salary: salary,
	// 		vacancy: vacancy,
	// 	});
	// }

	res.send("Vacancy created.");
};

const recruitEmployee = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const user = auth.currentUser;
	let companyId = user.displayName;

	const { userId } = req.body;

	let result = await lms
		.recruitEmployee(
			web3.utils.fromAscii(companyId),
			web3.utils.fromAscii(userId),
			{ from: accounts[0] }
		)
		.then((id) => {
			return id;
		});

	// console.log(result.logs[0].args["0"]);
	// if (result.logs[0].args["0"]) {
	// 	const re = await db
	// 		.collection("Companies")
	// 		.doc(companyId)
	// 		.update({
	// 			employees: admin.firestore.FieldValue.arrayUnion(userId),
	// 		});
	// 	await db
	// 		.collection("Users")
	// 		.doc(userId)
	// 		.update({
	// 			companies: admin.firestore.FieldValue.arrayUnion(companyId),
	// 		});
	// 	console.log(re);
	// }

	res.send(" Recruited ");
};

const createProduct = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const user = auth.currentUser;
	let companyId = user.displayName;
	let convertedCompanyId = web3.utils.fromAscii(companyId);
	const { cost_price, selling_price, quantity } = req.body;

	let result = await lms
		.createProduct(convertedCompanyId, cost_price, selling_price, quantity, {
			from: accounts[0],
		})
		.then((id) => {
			return id;
		});

	res.send(companyId + " Added product ");
};

const changeProductDetails = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const { productId, cost_price, selling_price, quantity } = req.body;

	let convertedProductId = web3.utils.fromAscii(productId);

	let result = await lms
		.changeProductDetails(
			convertedProductId,
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
