'use strict';

const firebase = require('../db');
const Company = require('../models/Company');
const firestore = firebase.firestore();
const { LMS, web3 } = require("../web3conn");
const auth = firebase.auth();

const productPurchase = async (req, res) => {
    const accounts = await web3.eth.getAccounts();
    const lms = await LMS.deployed();
    const user = auth.currentUser;
    let fromId = user.displayName;
    let convertedFromId = web3.utils.fromAscii(fromId);

    const { productId, quantity } = req.body;
    let convertedProductId = web3.utils.fromAscii(productId);
    
    let result = await lms
        .productPurchase(
            convertedFromId,
			convertedProductId,
			quantity,
			{ from: accounts[0] }
		)
		.then((id) => {
			return id;
        });
    let fromIdReturn = web3.utils.toUtf8(result.logs[0].args["0"]);
    console.log(fromIdReturn);
    
    let productIdReturn = web3.utils.toUtf8(result.logs[0].args["1"]);
	console.log(productIdReturn);
	res.send(fromIdReturn + " purchased " + productIdReturn);
}

const becomeLender = async (req, res) => {
    const accounts = await web3.eth.getAccounts();
    const lms = await LMS.deployed();
    const user = auth.currentUser;
    let userId = user.displayName;
    let convertedUserId = web3.utils.fromAscii(userId);

    const { ipm, iipm } = req.body;
    let result = await lms
        .becomeLender(
            convertedUserId,
			ipm,
			iipm,
			{ from: accounts[0] }
		)
    
    //let lenderIdReturn = web3.utils.toUtf8(result.logs[0].args["0"]);
    console.log(result);
    res.send(" became lender.");
}

const takeloan = async (req, res) => {
    const accounts = await web3.eth.getAccounts();
    const lms = await LMS.deployed();
    const user = auth.currentUser;
    let fromId = user.displayName;
    let convertedFromId = web3.utils.fromAscii(fromId);

    const { lenderid, amount, month} = req.body;
    let convertedLenderId = web3.utils.fromAscii(lenderid);

    let result = await lms
        .productPurchase(
            convertedFromId,
			convertedLenderId,
            amount,
            month,
			{ from: accounts[0] }
		)
		.then((id) => {
			return id;
        });
    res.send("Take loan transaction completed.");
}

const userToUserTransaction = async (req, res) => {
    const accounts = await web3.eth.getAccounts();
    const lms = await LMS.deployed();
    const user = auth.currentUser;
    let fromId = user.displayName;
    let convertedFromId = web3.utils.fromAscii(fromId);

    const { toid, amount} = req.body;
    let convertedToId = web3.utils.fromAscii(toid);

    let result = await lms
        .userToUserTransaction(
            convertedFromId,
			convertedToId,
            amount,
			{ from: accounts[0] }
		)
		.then((id) => {
			return id;
        });
}

module.exports = {
    productPurchase,
    becomeLender,
    takeloan,
    userToUserTransaction
}