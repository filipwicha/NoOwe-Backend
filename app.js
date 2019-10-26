const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

const mysqlConnection = require('./config/db')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const passport = require('passport')
const passportJWT = require('passport-jwt')
let ExtractJwt = passportJWT.ExtractJwt
let JwtStrategy = passportJWT.Strategy
let jwtOptions = {}

app.listen(port)
console.log('Port ' + port)

var userRoutes = require('./routes/userRoutes')
var budgetRoutes = require('./routes/budgetRoutes')
var shareRoutes = require('./routes/shareRoutes')
var budgetMemberRoutes = require('./routes/budgetMemberRoutes')
var transactionRoutes = require('./routes/transactionRoutes')
var currencyRoutes = require('./routes/currencyRoutes')

userRoutes(app)
budgetRoutes(app)
shareRoutes(app)
budgetMemberRoutes(app)
transactionRoutes(app)
currencyRoutes(app)