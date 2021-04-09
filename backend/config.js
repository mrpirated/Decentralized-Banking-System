'use strict';

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
	measurementId,
	PORT,
	HOST,
	HOST_URL
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');


module.exports = {
	PORT: PORT,
	HOST: HOST,
	HOST_URL: HOST_URL,
	firebaseConfig: {
		apiKey: apiKey,
		authDomain: authDomain,
		projectId: projectId,
		storageBucket: storageBucket,
		messagingSenderId: messagingSenderId,
		appId: appId,
		measurementId: measurementId,
	},
};
