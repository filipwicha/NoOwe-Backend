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

exports.getone = (req, res) => {
    console.log("Processing func -> getone budgetMember")
    

    BudgetMember.findByPk(req.params.id).then(budgetMember => {
        res.status(200).send(budgetMember)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.getthisbudgetmember = (req, res) => {
    console.log("Processing func -> getthisbudgetmember budgetMember")
    

    BudgetMember.findOne({ where: {budget_id: req.params.budget_id, user_id: req.id}}).then(budgetMember => {
        res.status(200).send(budgetMember)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.create = (req, res) => {
    console.log("Processing func -> create budgetMembers")
    

    BudgetMember.create({
        nickname: req.body.nickname,
        user_id: req.body.user_id,
        budget_id: req.params.budget_id,
    }).then(budgetMember => {
        res.status(200).send("BudgetMember " + budgetMember.id + " created successfully!")
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.update = (req, res) => {
    console.log("Processing func -> update budgetMembers")
    

    BudgetMember.update({
        nickname: req.body.nickname,
        user_id: req.body.user_id,
        budget_id: req.body.budget_id,
    },
        {
            where: {
                id: req.params.id
            }
        }).then(budgetMember => {
            res.status(200).send("BudgetMember " + req.params.id + " updated successfully!")
        }).catch(err => {
            res.status(500).send("Error -> " + err)
        })
}

exports.delete = (req, res) => {
    console.log("Processing func -> delete budgetMembers")
    
    BudgetMember.destroy({
        where: {
            id: req.params.id
        }
    }).then(budgetMember => {
        res.status(200).send("BudgetMember " + req.params.id + " destroyed successfully!")
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}
