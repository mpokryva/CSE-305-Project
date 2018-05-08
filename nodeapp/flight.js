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
	var params = [];
	var query = "select * from (select dep.flight_no, dep.airline, " +
	"dep.class, dep.fare, dep_city, arr_city, dep.dep_date, dep.arr_date " +
   	"from (select flight.*, location.city as arr_city from flight, " + 
	"location where flight.arr_id = location.id) as dep " +
    "JOIN (select flight.*, location.city as dep_city from flight, " + 
	"location where flight.dep_id = location.id) as arr " +
    "on dep.flight_no = arr.flight_no) as res where";
	if (depDate.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(depDate)
		query +=  "date(dep_date) = $" + params.length
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
	}
	if (depCity.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(depCity)
		query += "dep_city =$" + params.length;
	}
	if (arrCity.length != 0) {
		query += " ";
		if (params.length != 0) {
			query += "AND "
		}
		params.push(arrCity)
		query += "arr_city =$" + params.length;
	}
	if (params.length == 0) {
	query = "select * from (select dep.flight_no, dep.airline, " +
	"dep.class, dep.fare, dep_city, arr_city, dep.dep_date, dep.arr_date " +
   	"from (select flight.*, location.city as arr_city from flight, " + 
	"location where flight.arr_id = location.id) as dep " +
    "JOIN (select flight.*, location.city as dep_city from flight, " + 
	"location where flight.dep_id = location.id) as arr " +
    "on dep.flight_no = arr.flight_no) as res";
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
