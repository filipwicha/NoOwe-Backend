module.exports = function (app) {
    var controller = require('../controllers/transactionController')

    app.route('/transaction')
        .get(controller.list_all_transactions)
        .post(controller.create_a_transaction)

    app.route('/transaction/:transactionId')
        .get(controller.read_a_transaction)
        .put(controller.update_a_transaction)
        .delete(controller.delete_a_transaction)
}