const db = require('../config/db.config')
const Budget = db.budget
const BudgetMember = db.budgetMember

exports.getall = (req, res) => {
    console.log("Processing func -> getall budgets")
    console.log(req.body)

    Budget.findAll({
        where: {
            owner_id: req.id
        }
    }).then(budgets => {
        res.status(200).send(budgets)
        console.log(JSON.stringify(budgets))
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.getone = (req, res) => {
    console.log("Processing func -> getone budgets")
    console.log(req.body)

    Budget.findByPk(req.params.id).then(budget => {
        res.status(200).send(budget)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.create = (req, res) => {
    console.log("Processing func -> create budgets")
    console.log(req.body)

    Budget.create({
        name: req.body.name,
        color: req.body.color,
        owner_id: req.id,
        currency_id: req.body.currency_id
    }).then(budget => {
        console.log("BUDGETID " + budget.id)
        BudgetMember.create({
            nickname: "Owner",
            user_id: req.id,
            budget_id: budget.id,
        })

        req.body.budget_members.forEach(nickname => {
            BudgetMember.create({
                nickname: nickname,
                user_id: null,
                budget_id: budget.id,
            })
        })

        res.status(200).send("Budget " + budget.id + " with budgetMember " + " created successfully!")

    }).catch(err => {
        console.log(err)
        res.status(500).send("Error -> " + err)
    })
}

exports.update = (req, res) => {
    console.log("Processing func -> update budgets")
    console.log(req.body)

    Budget.update({
        name: req.body.name,
        color: req.body.color,
        owner_id: req.body.owner_id,
        currency_id: req.body.currency_id
    },
        {
            where: {
                id: req.params.id
            }
        }).then(budget => {
            res.status(200).send("Budget " + req.params.id + " updated successfully!")
        }).catch(err => {
            res.status(500).send("Error -> " + err)
        })
}

exports.delete = (req, res) => {
    console.log("Processing func -> delete budgets")
    console.log(req.body)
    Budget.destroy({
        where: {
            id: req.params.id
        }
    }).then(budget => {
        res.status(200).send("Budget " + req.params.id + " destroyed successfully!")
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}
