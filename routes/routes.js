const middleware = require('../middleware/middleware')
const userController = require('../controllers/userController')
const budgetController = require('../controllers/budgetController')
const transactionController = require('../controllers/transactionController')

module.exports = function (app) {
  app.post('/auth/signup', [middleware.checkDuplicateUserNameOrEmail], userController.signup)
  app.post('/auth/signin', userController.signin)

  app.get('/user', [middleware.verifyToken], userController.getall)

  app.get('/budget/:id', [middleware.verifyToken], budgetController.getone)
  app.get('/budgets', [middleware.verifyToken], budgetController.getall)
  app.post('/budget/:id', [middleware.verifyToken], budgetController.create)
  app.put('/budget/:id', [middleware.verifyToken], budgetController.update)
  app.delete('/budget/:id', [middleware.verifyToken], budgetController.delete)

  app.get('/transaction/:id', [middleware.verifyToken], budgetController.getone)
  app.get('/transactions', [middleware.verifyToken], budgetController.getall)
  app.post('/transaction/:id', [middleware.verifyToken], budgetController.create)
  app.put('/transaction/:id', [middleware.verifyToken], budgetController.update)
  app.delete('/transaction/:id', [middleware.verifyToken], budgetController.delete)
}