const db = require('../config/db.config')
const Transaction = db.transaction
const Share = db.share

exports.getall = (req, res) => {
    console.log("Processing func -> getall transactions")
    

    Transaction.findAll({
        where: {
            budget_id: req.params.budget_id
        },
        include: [db.share]
    }).then(transactions => {
        res.status(200).send(transactions)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.create = (req, res) => {
    console.log("Processing func -> create transactions")
    

    Transaction.create({
        title: req.body.title,
        date: db.Sequelize.fn('NOW'),
        budget_id: req.params.budget_id,
        category_id: req.body.category_id
    }).then(transaction => {
        var shares = req.body.shares

        shares.forEach(share => {
            Share.create({
                amount: share.amount,
                transaction_id: transaction.id,
                member_id: share.member_id
            }).catch(err => {
                console.log("Error -> error creating budgetmember from nicknames" + err)
            })
        })

        res.status(200).send("Transaction " + transaction.id + " created successfully!")
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.delete = (req, res) => {
    console.log("Processing func -> delete transactions")
    
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
