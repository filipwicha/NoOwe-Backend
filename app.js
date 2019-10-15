const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

const mysqlConnection = require('./db/db')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port)
console.log('Port ' + port)

var routes = require('./routes/userRoutes')
routes(app)