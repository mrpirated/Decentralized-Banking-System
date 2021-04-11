const { LMS, web3 } = require("./web3conn");
const yearly = async () => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	await lms.payTaxes({
		from: accounts[0],
	});
};
const monthly = async () => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();
	await lms.monthly({
		from: accounts[0],
	});
};
module.exports = { yearly, monthly };
