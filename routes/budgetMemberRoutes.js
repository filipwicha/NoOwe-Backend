module.exports = function (app) {
    var controller = require('../controllers/budgetMemberController')

    app.route('/budget_member')
        .get(controller.list_all_budget_members)
        .post(controller.create_a_budget_member)

    app.route('/budget_member/:budgetMemberId')
        .get(controller.read_a_budget_member)
        .put(controller.update_a_budget_member)
        .delete(controller.delete_a_budget_member)
}