"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const companyRoutes = require("./routes/company-routes");
const auth = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", auth);

app.listen(config.PORT, () =>
	console.log("Server running at port " + config.PORT)
);
