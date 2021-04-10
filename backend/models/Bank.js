class Bank {
	constructor(id, name, users, transactions, net_worth) {
		this.id = id;
		this.name = name;
		this.users = users;
		this.transactions = transactions;
		this.net_worth = net_worth;
	}
}

module.exports = Bank;
