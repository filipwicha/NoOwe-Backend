const db = require('../config/db.config')
const Transaction = db.transaction

exports.getall = (req, res) => {
    console.log("Processing func -> getall transactions")
    console.log(req.body)

    Transaction.findAll({
        where: {
          budget_id: req.params.id
        },
        include: [db.share]
    }).then(transactions => {
        res.status(200).send(transactions)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.getone = (req, res) => {
    console.log("Processing func -> getone transaction")
    console.log(req.body)

    Transaction.findByPk(req.params.id).then(transaction => {
        res.status(200).send(transaction)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.create = (req, res) => {
    console.log("Processing func -> create transactions")
    console.log(req.body)

    Transaction.create({
        title: req.body.title,
        date: db.Sequelize.fn('NOW'),
        budget_id: req.params.budget_id,
        category_id: req.body.category_id
    }).then(transaction => {
        res.status(200).send("Transaction " + transaction.id + " created successfully!")
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.update = (req, res) => {
    console.log("Processing func -> update transactions")
    console.log(req.body)

    Transaction.update({
        title: req.body.title,
        date: req.body.date,
        budget_id: req.body.budget_id,
        category_id: req.body.category_id
    },
        {
            where: {
                id: req.params.id
            }
        }).then(transaction => {
            res.status(200).send("Transaction " + req.params.id + " updated successfully!")
        }).catch(err => {
            res.status(500).send("Error -> " + err)
        })
}

exports.delete = (req, res) => {
    console.log("Processing func -> delete transactions")
    console.log(req.body)
    Transaction.destroy({
        where: {
            id: req.params.id
        }
    }).then(transaction => {
        res.status(200).send("Transaction " + req.params.id + " destroyed successfully!")
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}
