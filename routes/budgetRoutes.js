module.exports = function (app) {
    var controller = require('../controllers/budgetController.js')

    app.route('/budget')
        .get(controller.list_all_budgets)
        .post(controller.create_a_budget)

    app.route('/budget/:budgetId')
        .get(controller.read_a_budget)
        .put(controller.update_a_budget)
        .delete(controller.delete_a_budget)
}