module.exports = function (app) {
    var controller = require('../controllers/userController')

    app.route('/user')
        .get(controller.list_all_users)
        .post(controller.create_an_user)

    app.route('/user/:userId')
        .get(controller.read_an_user)
        //.put(controller.update_an_user)
        .delete(controller.delete_an_user)
}