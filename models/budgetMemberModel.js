var sql = require('../db/db')

var Budget_Member = function (budget_member) {
    this.nickname = budget_member.nickname
    this.budget_id = budget_member.budget_id
    this.user_id = budget_member.user_id

    console.log("Model budget_member: " + JSON.stringify(budget_member));
}

Budget_Member.createBudgetMember = function (newBudget_Member, result) {
    sql.query('INSERT INTO budget_members SET ?', newBudget_Member, function (err, res, fields) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            console.log("ID: " + res.insertId)
            result(null, res.insertId)
        }
    })
}

Budget_Member.getBudgetMemberById = function (budget_memberId, result) {
    sql.query('SELECT * FROM budget_members WHERE id = ?', budget_memberId, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Budget_Member.getAllBudgetMembers = function (result) {
    sql.query("SELECT * FROM budget_members", function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            console.log('Budget_Members: ', res)
            result(null, res)
        }
    })
}

Budget_Member.updateById = function (id, budget_member, result) { 
    budget_member = JSON.parse(JSON.stringify(budget_member)) //remove undefined fields

    sql.query("UPDATE budget_members SET ? where id = ?", [budget_member, id], function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

Budget_Member.removeById = function (id, result) {
    sql.query("DELETE FROM budget_members WHERE id = ?", id, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

module.exports = Budget_Member