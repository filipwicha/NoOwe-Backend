const User = require('../models/userModel')

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
            res.json({ message: 'User ' + req.params.taskId + " deleted successfully" })
        }
    })
}