const jwt = require('jsonwebtoken')
const db = require('../config/db.config.js')
const User = db.user
const env = require('../config/env')


module.exports.checkDuplicateUserNameOrEmail = function(req, res, next) {
    // -> Check Email is already in use
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send("Fail -> Email is already in use!")
            return
        }
        next()
    })
}

module.exports.verifyToken = function (req, res, next) {
  let token = req.headers['x-access-token']
  
  if (!token){
    return res.status(403).send({ 
      auth: false, message: 'No token provided.' 
    })
  }
 
  jwt.verify(token, env.secret, (err, decoded) => {
    if (err){
      return res.status(500).send({ 
          auth: false, 
          message: 'Fail to Authentication. Error -> ' + err 
        })
    }
    req.id = decoded.id
    next()
  })
}
 