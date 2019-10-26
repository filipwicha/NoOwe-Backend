var sql = require('../config/db')

var Budget = function (budget) {
    this.id = budget.id
    this.name = budget.name
    this.color = budget.color
    this.owner_id = budget.owner_id
    this.currency_id = budget.currency_id

    console.log("Model budget: " + JSON.stringify(budget));
}

Budget.createBudget = function (newBudget, result) {
    sql.query('INSERT INTO budgets SET ?', newBudget, function (err, res, fields) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            console.log("ID: " + res.insertId)
            result(null, res.insertId)
        }
    })
}

Budget.getBudgetById = function (budgetId, result) {
    sql.query('SELECT * FROM budgets WHERE id = ?', budgetId, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Budget.getAllBudgets = function (result) {
    sql.query("SELECT * FROM budgets", function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            console.log('Budgets: ', res)
            result(null, res)
        }
    })
}

Budget.updateById = function (id, budget, result) { 
    budget = JSON.parse(JSON.stringify(budget)) //remove undefined fields

    sql.query("UPDATE budgets SET ? where id = ?", [budget, id], function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

Budget.removeById = function (id, result) {
    sql.query("DELETE FROM budgets WHERE id = ?", id, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

module.exports = Budget