const mysql = require('mysql');

//database connected

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"emp"
})

db.connect((err)=>{
    if(err) console.log(err.sqlMessage)
    else console.log("database connected")
})

module.exports = db;

