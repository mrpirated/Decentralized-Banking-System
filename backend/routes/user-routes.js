const express = require("express");
const { getLenders, userToUserTransaction, productPurchase, becomeLender, takeloan} = require("../controllers/userController");

const router = express.Router();

//router.post('/addCompany', addCompany);
router.post("/productPurchase", productPurchase);
router.post("/becomeLender", becomeLender);
router.post("/takeloan", takeloan);
router.post("/userToUserTransaction", userToUserTransaction);
router.get("/getlenders", getLenders);

module.exports = router;
