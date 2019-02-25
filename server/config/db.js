const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const { Client } = pg;
const connectionObject = {
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
};
const db = new Client(connectionObject);

module.exports = db;
exports.connectionObject = connectionObject;
