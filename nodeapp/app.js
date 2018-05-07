const express = require("express");
const app = express();
const db = require("./db");
const flight = require("./flight")
app.use("/api/flight", flight);

const cruise = require("./cruise")
app.use("/api/cruise", cruise);

const car_rental = require("./car_rental")
app.use("/api/car_rental", car_rental);

const accommodation = require("./accommodation")
app.use("/api/accommodation", accommodation);

const addmember = require("./addmember");
app.use("/api/addmember", addmember);

const payment = require("./payment");
app.use("/api/payment", payment);

const review = require("./review");
app.use("/api/review", review);

module.exports = app;
