class Transaction {
	constructor(
		id,
		fromid,
		toid,
		transaction_type,
		description,
		amount,
		success
	) {
		this.id = id;
		this.fromid = fromid;
		this.toid = toid;
		this.transaction_type = transaction_type;
		this.description = description;
		this.amount = amount;
		this.success = success;
	}
}
module.exports = Transaction;
// description tax
// type _0 user to dcb
// type _1 company to dcb

// description salary
// type _0 company to user (income)

//description purchase
// type _0 user to company (product)

// description loan
// type 0 bank to user (giving loan)
// type 1 user to bank (returning loan)
// type 2 bank to company (giving loan)
// type 3 company to bank (returning loan)
