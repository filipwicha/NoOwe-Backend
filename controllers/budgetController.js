const db = require('../config/db.config')
const Budget = db.budget
const BudgetMember = db.budgetMember

exports.getall = (req, res) => {
    console.log("Processing func -> getall budgets") 

    BudgetMember.findAll({
        where: {
            user_id: req.id 
        }
    }).then(budgetMembers => {
        var budgetIds = budgetMembers.map(budgetMember => {return budgetMember.budget_id})
        Budget.findAll({
            where: {
                id: budgetIds
            }
        }).then( budgets => {
 
        res.status(200).send(budgets)
        })
    })
}

exports.create = (req, res) => {
    console.log("Processing func -> create budgets")
    

    Budget.create({
        name: req.body.name,
        color: req.body.color,
        owner_id: req.id,
        currency_id: req.body.currency_id
    }).then(budget => { 
        BudgetMember.create({
            nickname: "Owner",
            user_id: req.id,
            budget_id: budget.id,
            private_key: " "
        }).catch(err => {
            console.log("Error -> error creating budgetmember for owner " + err)
        })

        var nicknames = req.body.budget_members

        nicknames.forEach(nickname => {
            BudgetMember.create({
                nickname: nickname,
                user_id: -1,
                budget_id: budget.id,
                private_key: makePrivateKey(4)
            }).catch(err => {
                console.log("Error -> error creating budgetmember from nicknames" + err)
            })
        })

        res.status(200).send("Budget " + budget.id + " with budgetMember " + " created successfully!")

    }).catch(err => {
        console.log(err)
        res.status(500).send("Error -> " + err)
    })
}

exports.delete = (req, res) => {
    console.log("Processing func -> delete budgets")
    
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

function makePrivateKey(length) {
    var result           = ''
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length

    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
 }

 