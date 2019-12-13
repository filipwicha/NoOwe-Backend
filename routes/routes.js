const middleware = require('../middleware/middleware')
const userController = require('../controllers/userController')
const budgetController = require('../controllers/budgetController')
const transactionController = require('../controllers/transactionController')
const shareController = require('../controllers/shareController')
const budgetMemberController = require('../controllers/budgetMemberController')
const currencyController = require('../controllers/currencyController')
const categoryController = require('../controllers/categoryController')

module.exports = function (app) {
  app.post('/auth/signup', [middleware.checkDuplicateUserNameOrEmail], userController.signup)
  app.post('/auth/signin', userController.signin)

  app.get('/user', [middleware.verifyToken], userController.getall)

  app.get('/budget/:id', [middleware.verifyToken], budgetController.getone)
  app.get('/budgets', [middleware.verifyToken], budgetController.getall)
  app.post('/budget', [middleware.verifyToken], budgetController.create)
  app.put('/budget/:id', [middleware.verifyToken], budgetController.update)
  app.delete('/budget/:id', [middleware.verifyToken], budgetController.delete)

  app.get('/transaction/:id', [middleware.verifyToken], transactionController.getone)
  app.get('/transactions/:budget_id', [middleware.verifyToken], transactionController.getall)
  app.post('/transaction/:budget_id', [middleware.verifyToken], transactionController.create)
  app.put('/transaction/:id', [middleware.verifyToken], transactionController.update)
  app.delete('/transaction/:id', [middleware.verifyToken], transactionController.delete)

  app.get('/share/:id', [middleware.verifyToken], shareController.getone)
  app.get('/shares/:transaction_id', [middleware.verifyToken], shareController.getall)
  app.post('/share/:transaction_id', [middleware.verifyToken], shareController.create)
  app.put('/share/:id', [middleware.verifyToken], shareController.update)
  app.delete('/share/:id', [middleware.verifyToken], shareController.delete)

  app.get('/budget_member/:id', [middleware.verifyToken], budgetMemberController.getone)
  app.get('/budget_members/:budget_id', [middleware.verifyToken], budgetMemberController.getall)
  app.get('/budget_member/this/:budget_id', [middleware.verifyToken], budgetMemberController.getthisbudgetmember)
  app.post('/budget_member/:budget_id', [middleware.verifyToken], budgetMemberController.create)
  app.put('/budget_member/:id', [middleware.verifyToken], budgetMemberController.update)
  app.delete('/budget_member/:id', [middleware.verifyToken], budgetMemberController.delete)

  app.get('/currencies', [middleware.verifyToken], currencyController.getall)

  app.get('/categories', [middleware.verifyToken], categoryController.getall)

}