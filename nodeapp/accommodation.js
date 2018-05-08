const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("./db");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

module.exports = router;

router.post('/', function(req, res) {
	console.log(req.body);
	const city = req.body.city;
	const minPrice = req.body.min_price;
	const maxPrice = req.body.max_price;
	const type = req.body.accommodation_type;
	var query = "SELECT * FROM (SELECT accommodation.*, location.city " +
		"FROM accommodation, location WHERE location_id = location.id) AS res WHERE";
	var params = [];
	if (minPrice.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(minPrice)
		query += "daily_rate >= $" + params.length;	
	}
	if (maxPrice.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(maxPrice)
		query += "daily_rate <= $" + params.length;	
	}
	if (city.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(city)
		query += "city = $" + params.length;
	}
	if (type.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(type)
		query += "type = $" + params.length;
	}
	if (params.length == 0) {
		query = "SELECT * FROM (SELECT accommodation.*, location.city " +
			"FROM accommodation, location WHERE location_id = location.id) AS res";
	}
	query += " ORDER BY daily_rate"; 
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
