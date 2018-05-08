const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("./db");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


module.exports = router;

router.post('/', function(req, res) {
	console.log(req.body);
	const fn = req.body.firstname;
	const ln = req.body.lastname;
	const email = req.body.email;
	const gender = req.body.gender;
	const age = parseInt(req.body.age);
	var params = [];
	params.push(fn);
	params.push(ln);
	params.push(email);
	params.push(gender);
	params.push(age);
	console.log(fn);
	console.log(ln);
	console.log(email);
	console.log(gender);
	console.log(age);
	
	var query = "INSERT INTO person VALUES (DEFAULT,$1,$2,$3,$4,$5) RETURNING id;";
	console.log(query);
	console.log(params);
	db.query(query, params, function (err, dbRes) {
		if (err) {
			res.send(err);
			console.log(err);
		} else {
			console.log("success");
			console.log(dbRes.rows[0]);
			res.send(dbRes.rows[0]);			
		}
	})

});
