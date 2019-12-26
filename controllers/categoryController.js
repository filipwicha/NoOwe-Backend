const db = require('../config/db.config')
const Category = db.category

exports.getall = (req, res) => {
    console.log("Processing func -> getall categories")
    

    Category.findAll().then(categories => {
        res.status(200).send(categories)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}