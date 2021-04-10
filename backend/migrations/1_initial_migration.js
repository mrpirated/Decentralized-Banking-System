const Migrations = artifacts.require("./Functions.sol");

module.exports = function (deployer) {
	deployer.deploy(Migrations);
};
