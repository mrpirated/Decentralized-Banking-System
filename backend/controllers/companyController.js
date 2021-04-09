'use strict';

const firebase = require('../db');
const Company = require('../models/Company');
const firestore = firebase.firestore();

const addCompany = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('companies').doc().set(data);
        res.send('Company added successfully.')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addCompany
}