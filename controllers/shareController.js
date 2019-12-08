const db = require('../config/db.config')
const Share = db.share

exports.getall = (req, res) => {
    console.log("Processing func -> getall shares")
    console.log(req.body)

    Share.findAll({
        where: {
          transaction_id: req.params.transaction_id
        }
    }).then(shares => {
        res.status(200).send(shares)
    }).catch(err => {
        res.status(500).send({code: 500, reason: "Error -> " + err })
    })
}

exports.getone = (req, res) => {
    console.log("Processing func -> getone share")
    console.log(req.body)

    Share.findByPk(req.params.id).then(share => {
        res.status(200).send(share)
    }).catch(err => {
        res.status(500).send({code: 500, reason: "Error -> " + err })
    })
}

exports.create = (req, res) => {
    console.log("Processing func -> create shares")
    console.log(req.body)

    Share.create({
        amount: req.body.amount,
        member_id: req.body.member_id,
        transaction_id: req.params.transaction_id,
    }).then(share => {
        res.status(200).send("Share " + share.id + " created successfully!")
    }).catch(err => {
        res.status(500).send({code: 500, reason: "Error -> " + err })
    })
}

exports.update = (req, res) => {
    console.log("Processing func -> update shares")
    console.log(req.body)

    Share.update({
        amount: req.body.amount,
        member_id: req.body.member_id,
        transaction_id: req.body.transaction_id,
    },
        {
            where: {
                id: req.params.id
            }
        }).then(share => {
            res.status(200).send("Share " + req.params.id + " updated successfully!")
        }).catch(err => {
            res.status(500).send({code: 500, reason: "Error -> " + err })
        })
}

exports.delete = (req, res) => {
    console.log("Processing func -> delete shares")
    console.log(req.body)
    Share.destroy({
        where: {
            id: req.params.id
        }
    }).then(share => {
        res.status(200).send("Share " + req.params.id + " destroyed successfully!")
    }).catch(err => {
        res.status(500).send({code: 500, reason: "Error -> " + err })
    })
}
