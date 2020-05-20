const MongoClient = require("mongodb").MongoClient;
require('dotenv/config');

const client = new MongoClient(process.env.URL,  { useUnifiedTopology: true });

module.exports = client;