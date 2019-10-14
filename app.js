const express = require('express')
const bodyParser = require('body-parser')
const mysqlConnection = require('./connection')
const UsersRoutes = require('./routes/users')

var app = express()
app.use(bodyParser.json())

app.use('/users', UsersRoutes)

app.listen(3000) 
