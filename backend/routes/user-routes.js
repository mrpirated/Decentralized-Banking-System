const express = require("express");
const { getLenders } = require("../controllers/userController");

const router = express.Router();

//router.post('/addCompany', addCompany);
// router.post("/createVacancy", createVacancy);
// router.post("/recruitEmployee", recruitEmployee);
// router.post("/createProduct", createProduct);
// router.post("/changeProductDetails", changeProductDetails);
router.get("/getlenders", getLenders);

module.exports = router;
