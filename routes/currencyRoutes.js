module.exports = function (app) {
    var controller = require('../controllers/currencyController')

    app.route('/currency')
        .get(controller.list_all_currencies)
        .post(controller.create_a_currency)

    app.route('/currency/:currencyId')
        .get(controller.read_a_currency)
        .put(controller.update_a_currency)
        .delete(controller.delete_a_currency)
}