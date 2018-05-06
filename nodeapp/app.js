const express = require("express");
const app = express();
const db = require("./db");
const flight = require("./flight")
app.use("/api/flight", flight);



module.exports = app;
