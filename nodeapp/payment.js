const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("./db");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


module.exports = router;

router.post('/', function(req, res) {
	console.log(req.body)
	var cc1 = req.body.cc1;
	var cc2 = req.body.cc2;
	var cc3 = req.body.cc3;
	var cc4 = req.body.cc4;
	const paytype = "" + req.body.paymenttype;
	const expiry = "" + req.body.expiry;
	const price = req.body.amntdue;
	const ccnum = parseInt(cc1+cc2+cc3+cc4);


	var params = [];
	params.push(ccnum);
	params.push(expiry);
	params.push(price);
	params.push(paytype);

	console.log(ccnum);
	console.log(expiry);
	console.log(price);
	console.log(paytype);
	
	console.log(params);
	var query = "INSERT INTO payment VALUES (DEFAULT,$1,$2,$3,$4);";
	console.log(query);
	db.query(query, params, function (err, dbRes) {
		if (err) {
			res.send(err);
			console.log(err);
		} else {
			res.send(dbRes.rows);
			console.log("success");
		}
	})

});