const db = require('../config/db.config')
const BudgetMember = db.budgetMember

exports.getall = (req, res) => {
    console.log("Processing func -> getall budgetMembers")
    

    BudgetMember.findAll({
        where: {
          budget_id: req.params.budget_id
        }
    }).then(budgetMembers => { 
        res.status(200).send(budgetMembers)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.addtobudget = (req, res) => {
    console.log("PERFORMING ADD TU BUDGET WITH CODE: " +  req.params.private_key + " ON USER: " + req.id)
    BudgetMember.update({ 
        user_id: req.id, 
        private_key: " "
    },
        {
            where: {
                private_key: req.params.private_key
            }
        }).then(budgetMember => {
            console.log("Donce")
            res.status(200).send("BudgetMember updated successfully!")
        }).catch(err => {
            res.status(500).send("Error -> " + err)
        })
}