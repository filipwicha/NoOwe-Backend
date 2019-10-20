module.exports = function (app) {
    var controller = require('../controllers/shareController.js')

    app.route('/share')
        .get(controller.list_all_shares)
        .post(controller.create_a_share)

    app.route('/share/:shareId')
        .get(controller.read_a_share)
        .put(controller.update_a_share)
        .delete(controller.delete_a_share)
}