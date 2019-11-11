const db = require('../config/db.config')
const Currency = db.currency

exports.getall = (req, res) => {
    console.log("Processing func -> getall currencies")
    console.log(req.body)

    Currency.findAll().then(currencies => {
        res.status(200).send(currencies)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}