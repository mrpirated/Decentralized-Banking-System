const { Router } = require("express");
const express = require("express");

const { newId } = require("../controllers/auth");
const router = express.Router();

router.post("/newId", newId);

module.exports = router;
