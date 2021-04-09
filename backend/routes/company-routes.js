const express = require('express');
const { addCompany } = require('../controllers/companyController');

const router = express.Router();

router.post('/addCompany', addCompany);

module.exports = {
    routes: router
}