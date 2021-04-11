"use strict";

//const db = require("../db");

const Company = require("../models/Company");

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

const getAllCompanies = async (req, res) => {
	console.log("entered");
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const result = await lms.getBankValues({ from: accounts[0] });
	var companies = [];
	//console.log(result);
	for (var i = 0; i < result[1].length; i++) {
		let temp = await lms.companies(result[1][i], { from: accounts[0] });
		let temp2 = await lms.getCompanyValues(result[1][i], {
			from: accounts[0],
		});
		let transactions = [],
			products = [],
			employees = [],
			remaining_salary = [];
		Object.keys(temp2[0]).map((key) => {
			transactions.push(web3.utils.toUtf8(temp2[0][key]));
		});
		Object.keys(temp2[1]).map((key) => {
			employees.push(web3.utils.toUtf8(temp2[1][key]));
		});
		Object.keys(temp2[2]).map((key) => {
			products.push(web3.utils.toUtf8(temp2[2][key]));
		});
		Object.keys(temp2[3]).map((key) => {
			remaining_salary.push(temp2[3][key].words[0]);
		});

		//console.log(temp);
		let t = {
			id: web3.utils.toUtf8(result[1][i]),
			net_worth: temp.net_worth.words[0],
			inhand: temp.inhand.words[0],
			income: temp.income.words[0],
			tax_due: temp.tax_due.words[0],
			salary: temp.salary.words[0],
			vacancy: temp.vacancy.words[0],
			employees: employees,
			remaining_salary: remaining_salary,
			transactions: transactions,
			products: products,
		};
		companies = [...companies, t];
		console.log(companies);
		console.log(t);
	}
	await res.send(companies);
	//console.log(companies);
};

const getAllUsers = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const result = await lms.getBankValues({ from: accounts[0] });
	var users = [];
	//console.log(result);
	for (var i = 0; i < result[0].length; i++) {
		let temp = await lms.companies(result[0][i], { from: accounts[0] });
		let temp2 = await lms.getCompanyValues(result[0][i], {
			from: accounts[0],
		});
		let transactions = [],
			companies = [];
		Object.keys(temp2[0]).map((key) => {
			transactions.push(web.utils.toUtf8(temp2[0][key]));
		});
		Object.keys(temp2[1]).map((key) => {
			companies.push(web.utils.toUtf8(temp2[1][key]));
		});

		//console.log(temp);
		let t = {
			id: web3.utils.toUtf8(result[0][i]),
			net_worth: temp.net_worth.words[0],
			inhand: temp.inhand.words[0],
			income: temp.income.words[0],
			tax_due: temp.tax_due.words[0],
			transactions: transactions,
			companies: companies,
		};
		users = [...users, t];
	}
	await res.send(users);
	//console.log(companies);
};

const getProducts = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const result = await lms.getBankValues({ from: accounts[0] });
	let products = [];
	for (var i = 0; i < result[3].length; i++) {
		let temp = await lms.products(result[3][i], { from: accounts[0] });
		products = [
			...products,
			{
				id: web3.utils.toUtf8(result[3][i]),
				company: web3.utils.toUtf8(temp.company),
				cost_price: temp.cost_price.words[0],
				selling_price: temp.selling_price.words[0],
				quantity: temp.quantity.words[0],
			},
		];
	}

	res.send(products);
};
const getProductsbyCompany = async (req, res) => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	const { CompanyId } = req.query;
	const result = await lms.getCompanyValues(web3.utils.fromAscii(CompanyId), {
		from: accounts[0],
	});
	let products = [];
	for (var i = 0; i < result[2].length; i++) {
		let temp = await lms.products(result[2][i], { from: accounts[0] });
		products = [
			...products,
			{
				id: web3.utils.toUtf8(result[2][i]),
				company: web3.utils.toUtf8(temp.company),
				cost_price: temp.cost_price.words[0],
				selling_price: temp.selling_price.words[0],
				quantity: temp.quantity.words[0],
			},
		];
	}

	res.send(products);
};
// all companies
// all users
module.exports = {
	createVacancy,
	recruitEmployee,
	createProduct,
	changeProductDetails,
	getAllCompanies,
	getAllUsers,
	getProducts,
	getProductsbyCompany,
};
