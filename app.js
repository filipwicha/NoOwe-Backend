var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes/routes')(app)

const db = require('./config/db.config')

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
    console.log('Resync with')
})

// Create a Server
var server = app.listen(3000, function () {


})
console.log('App listening at http://localhost:' + server.address().port)





// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const port = process.env.PORT || 3000

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// app.listen(port)
// console.log('Port ' + port)

// var userRoutes = require('./routes/userRoutes')
// var budgetRoutes = require('./routes/budgetRoutes')
// var shareRoutes = require('./routes/shareRoutes')
// var budgetMemberRoutes = require('./routes/budgetMemberRoutes')
// var transactionRoutes = require('./routes/transactionRoutes')
// var currencyRoutes = require('./routes/currencyRoutes')

// userRoutes(app)
// budgetRoutes(app)
// shareRoutes(app)
// budgetMemberRoutes(app)
// transactionRoutes(app)
// currencyRoutes(app)