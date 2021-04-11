"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const companyRoutes = require("./routes/company-routes");
const userRoutes = require("./routes/user-routes");
const auth = require("./routes/auth");
const { yearly, monthly } = require("./initializeblockchain");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
setInterval(yearly, 120000);
setInterval(monthly, 10000);
//updatedb();
app.use("/api", auth);
app.use("/api", companyRoutes);
app.use("/api", userRoutes);

app.listen(config.PORT, () =>
	console.log("Server running at port " + config.PORT)
);
