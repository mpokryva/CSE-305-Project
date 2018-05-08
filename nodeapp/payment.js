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
	var memberIds = req.body.member_ids;
	const paytype = req.body.paymenttype;
	const expiry = new Date(req.body.expiry);
	const price = req.body.amntdue;
	const ccnum = parseInt(cc1+cc2+cc3+cc4);
	

	var params = [];
	params.push(ccnum);
	params.push(expiry);
	var paymentDate = new Date().toISOString();
	params.push(paymentDate);
	params.push(price);
	params.push(paytype);	
	
	console.log(params);

	var grpQuery = "INSERT INTO travel_group VALUES (DEFAULT) RETURNING id";
	console.log(grpQuery);
	db.query(grpQuery, function (err, dbRes) {
		if (err) {
			res.send(err);
			console.log(err);
		} else {
			var groupId = dbRes.rows[0].id;
			console.log("groupId: " + groupId);
			params.push(groupId);
			updateMembers(memberIds, groupId);
			insertPayment(params, function(error, paymentId) {
				console.log("paymentid: " + paymentId);
				addBooking(req, res, groupId, paymentId);	
			});
		}
	})
});

function insertPayment(params, callback) {
	console.log(params);
	var query = "INSERT INTO payment " +
		"VALUES (DEFAULT, $1,$2,$3,$4,$5, $6) RETURNING id;";
	console.log(query);
	db.query(query, params, function (err, dbRes) {
		if (err) {
			console.log(err);
			callback(err, null);
		} else {
			console.log("payment success");
			callback(null, dbRes.rows[0].id);
		}
	})
}

function updateMembers(memberIds, groupId) {
	for (var i = 0; i < memberIds.length; i++) {
		var id = memberIds[i];
		updateMember(id, groupId);
	}
}

function updateMember(id, groupId) {
	var query = "UPDATE person SET groupid=$1 WHERE id=$2"
	db.query(query, [groupId, id], function (err, dbRes) {
		if (err) {
			console.log(err);
		} else {
			console.log("success");
		}
	});
}

function addBooking(req, res, groupid, paymentid){
	var parameters = [];
	var accommodationid = req.body.accommodation_id;
	var flightno = req.body.flight_no;
	var rentalno = req.body.rental_no;
	var cruiseno = req.body.cruise_no;
	console.log("paymentID inside: " + paymentid);
	parameters.push(paymentid);
	parameters.push(groupid);
	parameters.push(accommodationid);
	parameters.push(flightno);
	parameters.push(rentalno);
	parameters.push(cruiseno);

	var query = "INSERT INTO booking VALUES (DEFAULT,$1,$2,$3,$4,$5,$6);"; 
	db.query(query, parameters, function (err, dbRes) {
		if (err) {
			console.log(err);
		} else {
			console.log("success");
			res.send("Booked successfully!");
		}
	});
}
