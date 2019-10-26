var sql = require('../config/db')

var Currency = function (currency) {
    this.code = currency.code

    console.log("Model currency: " + JSON.stringify(currency));
}

Currency.createCurrency = function (newCurrency, result) {
    sql.query('INSERT INTO currencies SET ?', newCurrency, function (err, res, fields) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            console.log("ID: " + res.insertId)
            result(null, res.insertId)
        }
    })
}

Currency.getCurrencyById = function (currencyId, result) {
    sql.query('SELECT * FROM currencies WHERE id = ?', currencyId, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Currency.getAllCurrencies = function (result) {
    sql.query("SELECT * FROM currencies", function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            console.log('Currencies: ', res)
            result(null, res)
        }
    })
}

Currency.updateById = function (id, currency, result) { 
    currency = JSON.parse(JSON.stringify(currency)) //remove undefined fields

    sql.query("UPDATE currencies SET ? where id = ?", [currency, id], function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

Currency.removeById = function (id, result) {
    sql.query("DELETE FROM currencies WHERE id = ?", id, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

module.exports = Currency