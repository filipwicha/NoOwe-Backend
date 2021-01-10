const middleware = require('../middleware/middleware')

const buttonClick = require('../controllers/buttonclickController')
const timeStamp = require('../controllers/timeStampController')
const demoController = require('../controllers/demoController')

module.exports = function (app) {
  app.get('/status/check', timeStamp.check)
  app.get('/status/change', timeStamp.change)

  app.post('/button/click', buttonClick.click)

  app.get('/report', buttonClick.report)

  app.get('/categories', [middleware.verifyToken], categoryController.getall)
  
  app.get('/demo', demoController.demo)

  app.get('/demo/data', demoController.data)

  app.get('/demo/percent', demoController.getpercent)
  app.post('/demo/percent', demoController.setpercent)
}


   
   