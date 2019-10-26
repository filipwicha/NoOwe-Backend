const User = require('../models/userModel')

exports.login = function(req,res,next){
    // if user exists the token was sent with the request
    if(req.user){
     //if user exists then go to next middleware
       next();
    }
  // token was not sent with request send error to user
    else{
       res.status(500).json({error:'login is required'});
    }
  }

exports.list_all_users = function (req, res) {
    User.getAllUsers(function (err, user) {
        if (err) {
            res.send(err)
            console.log('res', user)
        } else {
            res.send(user)
        }
    })
}

exports.create_an_user = function (req, res) {
    User.createUser(new User(req.body), function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.json(user)
        }
    })
}

exports.read_an_user = function (req, res) {
    User.getUserById(req.params.userId, function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.json(user)
        }
    })
}

exports.update_an_user = function (req, res) {
    User.updateById(req.params.userId, new User(req.body), function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.json(user)
        }
    })
}

exports.delete_an_user = function (req, res) {
    User.removeById(req.params.userId, function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.json({ message: 'User ' + req.params.id + " deleted successfully" })
        }
    })
}