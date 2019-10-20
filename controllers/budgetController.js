const Budget = require('../models/budgetModel')

exports.list_all_budgets = function (req, res) {
    Budget.getAllBudgets(function (err, budget) {
        if (err) {
            res.send(err)
            console.log('res', budget)
        } else {
            res.send(budget)
        }
    })
}

exports.create_a_budget = function (req, res) {
    Budget.createBudget(new Budget(req.body), function (err, budget) {
        if (err) {
            res.send(err)
        } else {
            res.json(budget)
        }
    })
}

exports.read_a_budget = function (req, res) {
    Budget.getBudgetById(req.params.budgetId, function (err, budget) {
        if (err) {
            res.send(err)
        } else {
            res.json(budget)
        }
    })
}

exports.update_a_budget = function (req, res) {
    Budget.updateById(req.params.budgetId, new Budget(req.body), function (err, budget) {
        if (err) {
            res.send(err)
        } else {
            res.json(budget)
        }
    })
}

exports.delete_a_budget = function (req, res) {
    Budget.removeById(req.params.budgetId, function (err, budget) {
        if (err) {
            res.send(err)
        } else {
            res.json({ message: 'Budget ' + req.params.id + " deleted successfully" })
        }
    })
}