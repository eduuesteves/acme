require('dotenv').config()
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT_DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = db;
