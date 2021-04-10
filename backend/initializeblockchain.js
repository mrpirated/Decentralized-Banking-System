const firebase = require("./db");
const db = firebase.firestore();
const { LMS, web3 } = require("./web3conn");
const inilializeblockchain = async () => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	const govt = await lms.government({ from: accounts[0] });
	const govtvalues = await lms.getGovtValues({ from: accounts[0] });
	//console.log(govtvalues);
	const government = {
		net_worth: govt.net_worth.words[0],
		transactions: govtvalues,
		inhand: govt.inhand.words[0],
	};
	await db.collection("Government").doc("government").set(government);
};

module.exports = inilializeblockchain;
