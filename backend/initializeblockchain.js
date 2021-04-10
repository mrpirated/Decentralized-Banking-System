const { LMS, web3 } = require("./web3conn");
const inilializeblockchain = async () => {
	const accounts = await web3.eth.getAccounts();
	const lms = await LMS.deployed();

	await lms.payTaxes({
		from: accounts[0],
	});
};

module.exports = inilializeblockchain;
