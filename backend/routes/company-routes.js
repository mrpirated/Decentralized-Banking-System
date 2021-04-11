const express = require("express");
const {
	createVacancy,
	recruitEmployee,
	createProduct,
	changeProductDetails,
	getAllCompanies,
	getAllUsers,
	getProducts,
	getProductsbyCompany,
} = require("../controllers/companyController");

const router = express.Router();

//router.post('/addCompany', addCompany);
router.post("/createVacancy", createVacancy);
router.post("/recruitEmployee", recruitEmployee);
router.post("/createProduct", createProduct);
router.post("/changeProductDetails", changeProductDetails);
router.get("/getAllCompanies", getAllCompanies);
router.get("/getAllUsers", getAllUsers);
router.get("/getProducts", getProducts);
router.get("/getProductsbyCompany", getProductsbyCompany);
module.exports = router;
