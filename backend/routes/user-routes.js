const express = require("express");
const {
	createVacancy,
    recruitEmployee,
    createProduct,
    changeProductDetails
} = require("../controllers/companyController");

const router = express.Router();

//router.post('/addCompany', addCompany);
router.post("/createVacancy", createVacancy);
router.post("/recruitEmployee", recruitEmployee);
router.post("/createProduct", createProduct);
router.post("/changeProductDetails", changeProductDetails);

module.exports = router;
