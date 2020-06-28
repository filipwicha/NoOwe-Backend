const middleware = require('../middleware/middleware')

const buttonClick = require('../controllers/buttonclickController')
const timeStamp = require('../controllers/timeStampController')

module.exports = function (app) {
  app.get('/status/check', timeStamp.check)
  app.get('/status/change', timeStamp.change)

  app.post('/button/click', buttonClick.click)

  app.get('/report', buttonClick.report)
}


   
   