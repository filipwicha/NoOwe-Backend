const middleware = require('../middleware/middleware')
const userController = require('../controllers/userController')
const budgetController = require('../controllers/budgetController')
const transactionController = require('../controllers/transactionController') 
const budgetMemberController = require('../controllers/budgetMemberController')
const currencyController = require('../controllers/currencyController')
const categoryController = require('../controllers/categoryController')
const demoController = require('../controllers/demoController')

module.exports = function (app) {
  app.post('/auth/signup', [middleware.checkDuplicateUserNameOrEmail], userController.signup)
  app.post('/auth/signin', userController.signin) 

  app.get('/budgets', [middleware.verifyToken], budgetController.getall)
  app.post('/budget', [middleware.verifyToken], budgetController.create)
  app.delete('/budget/:id', [middleware.verifyToken], budgetController.delete)

  app.get('/transactions/:budget_id', [middleware.verifyToken], transactionController.getall)
  app.post('/transaction/:budget_id', [middleware.verifyToken], transactionController.create) 
  app.delete('/transaction/:id', [middleware.verifyToken], transactionController.delete)
  
  app.get('/budget_member/:private_key', [middleware.verifyToken], budgetMemberController.addtobudget)
  app.get('/budget_members/:budget_id', [middleware.verifyToken], budgetMemberController.getall)

  app.get('/currencies', [middleware.verifyToken], currencyController.getall)

  app.get('/categories', [middleware.verifyToken], categoryController.getall)
  
  app.get('/demo', demoController.demo)
}