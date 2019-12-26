const db = require('../config/db.config')
const Share = db.share

exports.getall = (req, res) => {
    console.log("Processing func -> getall shares")
    

    Share.findAll({
        where: {
          transaction_id: req.params.transaction_id
        }
    }).then(shares => {
        res.status(200).send(shares)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.getone = (req, res) => {
    console.log("Processing func -> getone share")
    

    Share.findByPk(req.params.id).then(share => {
        res.status(200).send(share)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.create = (req, res) => {
    console.log("Processing func -> create shares")
    

    Share.create({
        amount: req.body.amount,
        member_id: req.body.member_id,
        transaction_id: req.params.transaction_id,
    }).then(share => {
        res.status(200).send("Share " + share.id + " created successfully!")
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.update = (req, res) => {
    console.log("Processing func -> update shares")
    
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
            res.status(500).send("Error -> " + err)
        })
}

exports.delete = (req, res) => {
    console.log("Processing func -> delete shares")
    
    Share.destroy({
        where: {
            id: req.params.id
        }
    }).then(share => {
        res.status(200).send("Share " + req.params.id + " destroyed successfully!")
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}
