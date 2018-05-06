const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("./db");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


module.exports = router;

router.get('/', function(req, res) {
	db.query("SELECT * FROM Flight", function (error, results, fields) {
		if (error) res.send(error);
	})
});