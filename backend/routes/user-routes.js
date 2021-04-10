const express = require("express");
<<<<<<< HEAD
const {
	productPurchase,
	becomeLender,
	takeloan,
	userToUserTransaction,
	getLenders,
	getUserTransactions,
} = require("../controllers/userController");
=======
const { getLenders, userToUserTransaction } = require("../controllers/userController");
>>>>>>> a0c1393c336bfaaafb269dadb86b3eb22c6e5129

const router = express.Router();

//router.post('/addCompany', addCompany);
router.post("/productPurchase", productPurchase);
router.post("/becomeLender", becomeLender);
router.post("/takeloan", takeloan);
router.post("/userToUserTransaction", userToUserTransaction);
router.get("/getlenders", getLenders);
<<<<<<< HEAD
router.get("/getUserTransactions", getUserTransactions);
=======
router.post("/userToUserTransaction", userToUserTransaction);
>>>>>>> a0c1393c336bfaaafb269dadb86b3eb22c6e5129

module.exports = router;
