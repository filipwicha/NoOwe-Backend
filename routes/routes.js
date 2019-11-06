const middleware = require('../middleware/middleware')
const userController = require('../controllers/userController')

module.exports = function (app) {
  app.post('/auth/signup', [middleware.checkDuplicateUserNameOrEmail], userController.signup)
  app.post('/auth/signin', userController.signin)

  app.get('/user', /* [middleware.verifyToken], */ userController.getUsers)
}