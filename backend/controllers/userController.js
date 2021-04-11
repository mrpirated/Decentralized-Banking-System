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

	const { ipm, iipm, UserId } = req.body;
	console.log(ipm);
	let result = await lms.becomeLender(web3.utils.fromAscii(UserId), ipm, iipm, {
		from: accounts[0],
	});

	//let lenderIdReturn = web3.utils.toUtf8(result.logs[0].args["0"]);
	//console.log(result);
	res.send(" became lender.");
};

const takeloan = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const { fromId, lenderid, amount, month } = req.body;
	let result = await lms
		.takeloan(
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
	res.send("Transaction done.");
};
const getLenders = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const result = await lms.getBankValues({ from: accounts[0] });
	var lenders = [];
	for (var i = 0; i < result[0].length; i++) {
		var temp = await lms.lenders(result[0][i], { from: accounts[0] });
		//console.log(temp["1"]);
		if (temp["1"] == true) {
			lenders = [
				...lenders,
				{
					id: web3.utils.toUtf8(result[0][i]),
					ipm: temp.ipm.words[0],
					iipm: temp.iipm.words[0],
				},
			];
		}
	}

	res.send(lenders);
};
const getUserTransactions = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const { UserId } = req.query;
	console.log(UserId);
	let transactions = [];
	const tran = await lms.getUserValues(web3.utils.fromAscii(UserId), {
		from: accounts[0],
	});
	//console.log(tran);

	for (var i = 0; i < tran[0].length; i++) {
		let temp = await lms.transactions(tran[0][i], { from: accounts[0] });
		let t = {
			id: web3.utils.toUtf8(tran[0][i]),
			fromid: web3.utils.toUtf8(temp.fromid),
			toid: web3.utils.toUtf8(temp.toid),
			amount: temp.amount.words[0],
			summary: web3.utils.toUtf8(temp.summary),
			success: temp.success,
		};
		if (t.amount != 0) transactions = [...transactions, t];
	}
	res.send(transactions);
};

const getCompanyTransactions = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const { UserId } = req.query;
	console.log(UserId);
	let transactions = [];
	const tran = await lms.getCompanyValues(web3.utils.fromAscii(UserId), {
		from: accounts[0],
	});
	//console.log(tran);

	for (var i = 0; i < tran[0].length; i++) {
		let temp = await lms.transactions(tran[0][i], { from: accounts[0] });
		let t = {
			id: web3.utils.toUtf8(tran[0][i]),
			fromid: web3.utils.toUtf8(temp.fromid),
			toid: web3.utils.toUtf8(temp.toid),
			amount: temp.amount.words[0],
			summary: web3.utils.toUtf8(temp.summary),
			success: temp.success,
		};
		if (t.amount != 0) transactions = [...transactions, t];
	}
	res.send(transactions);
};

const getUserInfo = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	const { UserId } = req.query;
	if (UserId.startsWith("company")) {
		const temp = await lms.companies(web3.utils.fromAscii(UserId), {
			from: accounts[0],
		});
		const company = {
			id: UserId,
			net_worth: temp.net_worth.words[0],
			inhand: temp.inhand.words[0],
			income: temp.income.words[0],
			tax_due: temp.tax_due.words[0],
			salary: temp.salary.words[0],
			vacancy: temp.vacancy.words[0],
		};
		res.send(company);
	} else {
		const temp = await lms.users(web3.utils.fromAscii(UserId), {
			from: accounts[0],
		});
		const user = {
			id: UserId,
			net_worth: temp.net_worth.words[0],
			inhand: temp.inhand.words[0],
			income: temp.income.words[0],
			tax_due: temp.tax_due.words[0],
		};
		res.send(user);
	}
};

const getGovtInfo = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	const govt = await lms.government({ from: accounts[0] });

	const govtinfo = {
		inhand: govt.inhand.words[0],
		net_worth: govt.net_worth.words[0],
	};
	res.send(govtinfo);
};
module.exports = {
	productPurchase,
	becomeLender,
	takeloan,
	userToUserTransaction,
	getLenders,
	getUserTransactions,
	getUserInfo,
	getGovtInfo,
	getCompanyTransactions,
};
