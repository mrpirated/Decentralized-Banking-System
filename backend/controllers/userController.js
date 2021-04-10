"use strict";

const Company = require("../models/Company");

const { LMS, web3 } = require("../web3conn");

const productPurchase = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

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
	res.send("Transaction done.")
};
const getLenders = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const result = await lms.getBankValues({ from: accounts[0] });
	var lenders = [];
	for (var i = 0; i < result[0].length; i++) {
		var temp = await lms.lenders(result[0][i], { from: accounts[0] });
		if (temp.isLender) {
			lenders = [...lenders, web3.utils.toUtf(result[0][i])];
		}
	}

	res.send(lenders);
};
const getUserTransactions = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const { UserId } = req.query;
	let transactions = [];
	const tran = await lms.getUserValues(web3.utils.fromAscii(UserId), {
		from: accounts[0],
	});

	for (var i = 0; i < tran.length; i++) {
		let temp = await lms.transactions(tran[i], { from: accounts[0] });
		let t = {
			id: web3.utils.toUtf(tran[i]),
			fromid: web3.utils.toUtf(temp.fromid),
			toid: web3.utils.toUtf(temp.toid),
			amount: temp.amount.words[0],
			summary: web3.utils.toUtf(temp.summary),
			success: temp.success,
		};
		transactions = [...transactions, t];
	}
	res.send(transactions);
};
module.exports = {
	productPurchase,
	becomeLender,
	takeloan,
	userToUserTransaction,
	getLenders,
	getUserTransactions,
};
