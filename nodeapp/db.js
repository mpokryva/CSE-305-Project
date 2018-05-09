const { Client } = require("pg");

const connString = 'postgresql://agency:cse305@localhost/agency'
const client = new Client({
	connectionString: connString
});
client.connect();

module.exports = client;
