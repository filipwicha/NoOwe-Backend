const Budge_Member = require('../models/budgetMemberModel')

exports.list_all_budget_members = function (req, res) {
    Budge_Member.getAllBudgetMembers(function (err, budget_member) {
        if (err) {
            res.send(err)
            console.log('res', budget_member)
        } else {
            res.send(budget_member)
        }
    })
}

exports.create_a_budget_member = function (req, res) {
    Budge_Member.createBudgetMember(new Budge_Member(req.body), function (err, budget_member) {
        if (err) {
            res.send(err)
        } else {
            res.json(budget_member)
        }
    })
}

exports.read_a_budget_member = function (req, res) {
    Budge_Member.getBudgetMemberById(req.params.budgetMemberId, function (err, budget_member) {
        if (err) {
            res.send(err)
        } else {
            res.json(budget_member)
        }
    })
}

exports.update_a_budget_member = function (req, res) {
    Budge_Member.updateById(req.params.budgetMemberId, new Budge_Member(req.body), function (err, budget_member) {
        if (err) {
            res.send(err)
        } else {
            res.json(budget_member)
        }
    })
}

exports.delete_a_budget_member = function (req, res) {
    Budge_Member.removeById(req.params.budgetMemberId, function (err, budget_member) {
        if (err) {
            res.send(err)
        } else {
            res.json({ message: 'budget_member ' + req.params.budgetMemberId + " deleted successfully" })
        }
    })
}