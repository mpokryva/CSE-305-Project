const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("./db");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


module.exports = router;

router.post('/', function(req, res) {
	const depDate = req.body.dep_date;
	const arrDate = req.body.arr_date;
	const depCity = req.body.dep_city;
	const arrCity = req.body.arr_city;
	console.log(depDate);
	console.log(arrDate);
	console.log(depCity);
	console.log(arrCity);
	var query = "SELECT * FROM flight WHERE";
	var params = [];
	if (depDate !== undefined) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(depDate)
		query +=  "date(dep_date) = $" + params.length
	}
	if (arrDate !== undefined) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(arrDate)
		query +=  "date(arr_date) = $" + params.length;
	}
	if (depCity !== undefined) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(depCity)
		query += "dep_id IN (SELECT id from location WHERE city = $" + params.length + ")";
	}
	if (arrCity !== undefined) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(arrCity)
		query += "arr_id IN (SELECT id from location WHERE city = $" + params.length + ")";
	}
	if (params.length == 0) {
		query = "SELECT * FROM flight"
	}
	query += ";";
	console.log(query);
	db.query(query, params, function (err, dbRes) {
		if (err) {
			res.send(err);
		} else {
			res.send(dbRes);
		}
	})
});
