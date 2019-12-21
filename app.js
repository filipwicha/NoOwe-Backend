var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes/routes')(app)

const db = require('./config/db.config')

var server

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
    console.log('\nRESYNC DONE\n')
    server = app.listen(process.env.PORT || 3000, function () {
        console.log('App listening at http://localhost:' + server.address().port)
    })

    
})
