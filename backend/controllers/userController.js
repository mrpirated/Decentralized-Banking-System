"use strict";

const Company = require("../models/Company");

const { LMS, web3 } = require("../web3conn");

const productPurchase = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	let convertedFromId = web3.utils.fromAscii(fromId);

	const { productId, quantity, fromId } = req.body;

	let result = await lms
		.productPurchase(
			web3.utils.fromAscii(fromId),
			web3.utils.fromAscii(productId),
			quantity,
			{ from: accounts[0] }
		)
		.then((id) => {
			return id;
		});

	res.send(" purchased ");
};

const becomeLender = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	const { ipm, iipm, userId } = req.body;
	let result = await lms.becomeLender(web3.utils.fromAscii(userId), ipm, iipm, {
		from: accounts[0],
	});

	//let lenderIdReturn = web3.utils.toUtf8(result.logs[0].args["0"]);
	console.log(result);
	res.send(" became lender.");
};

const takeloan = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	let result = await lms
		.productPurchase(
			web3.utils.fromAscii(fromId),
			web3.utils.fromAscii(lenderid),
			amount,
			month,
			{
				from: accounts[0],
			}
		)
		.then((id) => {
			return id;
		});
	res.send("Take loan transaction completed.");
};

const userToUserTransaction = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	const { toid, amount, fromId } = req.body;

	let result = await lms
		.userToUserTransaction(
			web3.utils.fromAscii(fromId),
			web3.utils.fromAscii(toid),
			amount,
			{
				from: accounts[0],
			}
		)
		.then((id) => {
			return id;
		});
};

module.exports = {
	productPurchase,
	becomeLender,
	takeloan,
	userToUserTransaction,
};