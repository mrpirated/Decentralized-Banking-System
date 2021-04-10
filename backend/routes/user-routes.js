const express = require("express");
const {
	productPurchase,
	becomeLender,
	takeloan,
	userToUserTransaction,
	getLenders,
	getUserTransactions,
} = require("../controllers/userController");

const router = express.Router();

//router.post('/addCompany', addCompany);
router.post("/productPurchase", productPurchase);
router.post("/becomeLender", becomeLender);
router.post("/takeloan", takeloan);
router.post("/userToUserTransaction", userToUserTransaction);
router.get("/getlenders", getLenders);
router.get("/getUserTransactions", getUserTransactions);

module.exports = router;
