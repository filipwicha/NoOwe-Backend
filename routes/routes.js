const middleware = require('../middleware/middleware')

const buttonClick = require('../controllers/buttonclickController')
const timeStamp = require('../controllers/timeStampController')
const demoController = require('../controllers/demoController')
// const { timeStamp } = require('../config/db.config')

module.exports = function (app) {
  app.get('/status/check', timeStamp.check)
  app.get('/status/change', timeStamp.change)
  app.get('/status/all', timeStamp.getAll)

  app.post('/button/click', buttonClick.click)
  app.get('/button/check', buttonClick.check)

  app.get('/demo', demoController.demo)
}


   
   