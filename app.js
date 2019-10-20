const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

const mysqlConnection = require('./db/db')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port)
console.log('Port ' + port)

var userRoutes = require('./routes/userRoutes')
var budgetRoutes = require('./routes/budgetRoutes')
var shareRoutes = require('./routes/shareRoutes')
var budgetMemberRoutes = require('./routes/budgetMemberRoutes')
var transactionRoutes = require('./routes/transactionRoutes')

userRoutes(app)
budgetRoutes(app)
shareRoutes(app)
budgetMemberRoutes(app)
transactionRoutes(app)