var mysql = require("mysql");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'agency'
});
connection.connect();


module.exports = connection;