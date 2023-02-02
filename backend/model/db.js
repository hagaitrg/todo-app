const mysql = require('mysql');
const dbConfig = require('../config/db');

const conn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASS,
    database: dbConfig.DB
});

conn.connect(err=>{
    if(err) throw err;
    console.log("Successfully connected to database");
})

module.exports = conn;