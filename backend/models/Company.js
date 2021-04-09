class Company {
	constructor(id, name, employees, transactions, net_worth, inhand, income, products, remaining_salary, tax_due, salary, vacancy) {
		this.id = id;
		this.name = name;
		this.employees = employees;
		this.transactions = transactions;
		this.net_worth = net_worth;
		this.inhand = inhand;
		this.income = income;
		this.products = products;
		this.remaining_salary = remaining_salary;
		this.tax_due = tax_due;
        this.salary = salary;
        this.vacancy = vacancy;
	}
}
module.exports = Company;
