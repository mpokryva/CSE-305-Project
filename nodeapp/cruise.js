const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("./db");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

module.exports = router;

router.post('/', function(req, res) {
	console.log(req.body);
	const depDate = req.body.dep_date;
	const arrDate = req.body.arr_date;
	const depCity = req.body.dep_city;
	const arrCity = req.body.arr_city;
	const minPrice = req.body.min_price;
	const maxPrice = req.body.max_price;
	var query = "SELECT * FROM cruise WHERE";
	var params = [];
	if (depDate.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(depDate)
		query +=  "date(dep_date) = $" + params.length
	} else {
		res.send("Must select departure date.");
		return;
	}
	if (minPrice.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(minPrice)
		query += "fare >= $" + params.length;	
	}
	if (maxPrice.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(maxPrice)
		query += "fare <= $" + params.length;	
	}
	if (arrDate.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(arrDate)
		query +=  "date(arr_date) = $" + params.length;
	} else {
		res.send("Must select return date.");
		return;
	}
	if (depCity.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(depCity)
		query += "dep_id IN (SELECT id from location WHERE city = $" + params.length + ")";
	} else {
		res.send("Must select departure city.");
		return;
	}
	if (arrCity.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(arrCity)
		query += "arr_id IN (SELECT id from location WHERE city = $" + params.length + ")";
	} else {
		res.send("Must select return city.");
		return;
	}
	if (params.length == 0) {
		query = "SELECT * FROM cruise";
	}
	query += ";";
	console.log(query);
	db.query(query, params, function (err, dbRes) {
		if (err) {
			res.send(err);
		} else {
			res.send(dbRes.rows);
		}
	})
});
