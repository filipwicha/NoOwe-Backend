const Transaction = require('../models/transactionModel')

exports.list_all_transactions = function (req, res) {
    Transaction.getAllTransactions(function (err, transaction) {
        if (err) {
            res.send(err)
            console.log('res', transaction)
        } else {
            res.send(transaction)
        }
    })
}

exports.create_a_transaction = function (req, res) {
    Transaction.createTransaction(new Transaction(req.body), function (err, transaction) {
        if (err) {
            res.send(err)
        } else {
            res.json(transaction)
        }
    })
}

exports.read_a_transaction = function (req, res) {
    Transaction.getTransactionById(req.params.transactionId, function (err, transaction) {
        if (err) {
            res.send(err)
        } else {
            res.json(transaction)
        }
    })
}

exports.update_a_transaction = function (req, res) {
    Transaction.updateById(req.params.transactionId, new Transaction(req.body), function (err, transaction) {
        if (err) {
            res.send(err)
        } else {
            res.json(transaction)
        }
    })
}

exports.delete_a_transaction = function (req, res) {
    Transaction.removeById(req.params.transactionId, function (err, transaction) {
        if (err) {
            res.send(err)
        } else {
            res.json({ message: 'Transaction ' + req.params.id + " deleted successfully" })
        }
    })
}