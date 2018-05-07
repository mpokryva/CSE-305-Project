const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("./db");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

module.exports = router;

router.post('/', function(req, res) {
	console.log(req.body);
	const pickupCity = req.body.pickup_city;
	const minPrice = req.body.min_price;
	const maxPrice = req.body.max_price;
	const minCapacity = req.body.min_seating_capacity;
	const sortBy = req.body.sort_by;
	var query = "SELECT * FROM car_rental WHERE";
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
	if (pickupCity.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(pickupCity)
		query += "pickup_loc_id IN (SELECT id from location WHERE city = $" + params.length + ")";
	}
	if (minCapacity.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(minCapacity);
		query += "seating_capacity >= $" + params.length;
	}
	if (params.length == 0) {
		query = "SELECT * FROM car_rental";
	}
	const sortParam = (sortBy == "Price") ? "daily_rate" : "seating_capacity";
	query += " ORDER BY " + sortParam; 
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
