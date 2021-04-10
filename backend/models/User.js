class User {
	constructor(transactions, net_worth, inhand, income, companies, tax_due) {
		//this.id = id;
		this.inhand = inhand;
		this.transactions = transactions;
		this.income = income;
		this.companies = companies;
		this.tax_due = tax_due;
		this.net_worth = net_worth;
	}
}
module.exports = User;
