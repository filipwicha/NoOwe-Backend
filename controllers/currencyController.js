const Currency = require('../models/currencyModel')

exports.list_all_currencies = function (req, res) {
    Currency.getAllCurrencies(function (err, currency) {
        if (err) {
            res.send(err)
            console.log('res', currency)
        } else {
            res.send(currency)
        }
    })
}

exports.create_a_currency = function (req, res) {
    Currency.createCurrency(new Currency(req.body), function (err, currency) {
        if (err) {
            res.send(err)
        } else {
            res.json(currency)
        }
    })
}

exports.read_a_currency = function (req, res) {
    Currency.getCurrencyById(req.params.currencyId, function (err, currency) {
        if (err) {
            res.send(err)
        } else {
            res.json(currency)
        }
    })
}

exports.update_a_currency = function (req, res) {
    Currency.updateById(req.params.currencyId, new Currency(req.body), function (err, currency) {
        if (err) {
            res.send(err)
        } else {
            res.json(currency)
        }
    })
}

exports.delete_a_currency = function (req, res) {
    Currency.removeById(req.params.currencyId, function (err, currency) {
        if (err) {
            res.send(err)
        } else {
            res.json({ message: 'Currency ' + req.params.id + " deleted successfully" })
        }
    })
}