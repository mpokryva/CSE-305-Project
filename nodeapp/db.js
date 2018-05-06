const { Client } = require("pg");

const connString = 'postgresql://ubuntu:cse305@localhost/agency'
const client = new Client({
	connectionString: connString
});
client.connect();

module.exports = client;
