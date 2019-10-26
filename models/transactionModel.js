var sql = require('../config/db')

var Transaction = function (transaction) {
    this.title = transaction.title
    this.date = transaction.date
    this.budget_id = transaction.budget_id
    this.category_id = transaction.category_id

    console.log("Model transaction: " + JSON.stringify(transaction));
}

Transaction.createTransaction = function (newTransaction, result) {
    sql.query('INSERT INTO transactions SET ?', newTransaction, function (err, res, fields) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            console.log("ID: " + res.insertId)
            result(null, res.insertId)
        }
    })
}

Transaction.getTransactionById = function (transactionId, result) {
    sql.query('SELECT * FROM transactions WHERE id = ?', transactionId, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Transaction.getAllTransactions = function (result) {
    sql.query("SELECT * FROM transactions", function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            console.log('Transactions: ', res)
            result(null, res)
        }
    })
}

Transaction.updateById = function (id, transaction, result) { 
    transaction = JSON.parse(JSON.stringify(transaction)) //remove undefined fields

    sql.query("UPDATE transactions SET ? where id = ?", [transaction, id], function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

Transaction.removeById = function (id, result) {
    sql.query("DELETE FROM transactions WHERE id = ?", id, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

module.exports = Transaction