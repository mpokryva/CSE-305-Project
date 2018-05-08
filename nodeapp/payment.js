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
	params.push(price);
	params.push(paytype);	
	
	console.log(params);

	var grpQuery = "INSERT INTO travel_group VALUES (DEFAULT) RETURNING id";
	var query = "INSERT INTO payment VALUES (DEFAULT,$1,$2,DEFAULT,$3,$4);";
	console.log(query);
	console.log(grpQuery);
	db.query(grpQuery, function (err, dbRes) {
		if (err) {
			res.send(err);
			console.log(err);
		} else {
			var groupId = dbRes.rows[0].id;
			updateMembers(memberIds, groupId);
			insertPayment(params);
			console.log("overall success");
		}
	})
});

function insertPayment(params) {
	console.log(params);
	var query = "INSERT INTO payment VALUES (DEFAULT,$1,$2,DEFAULT,$3,$4);";
	db.query(query, params, function (err, dbRes) {
		if (err) {
			res.send(err);
			console.log(err);
		} else {
			insertPayment(params);
			console.log("payment success");
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
