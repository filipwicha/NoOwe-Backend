const mysql = require('mysql')

var mysqlConnection = mysql.createConnection({
    host: 'den1.mysql3.gear.host',
    user: 'noowe',
    password: 'noowe!',
    database: 'noowe',
    multipleStatements: true
})

mysqlConnection.connect((err) => {
    console.log(!err ? "Connected" : "Failed to connect")
})

module.exports = mysqlConnection