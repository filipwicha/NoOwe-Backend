var sql = require('../db/db')

var User = function (user) {
    this.email = user.email
    this.username = user.username
    this.password = user.password
    this.confirmed_at = user.confirmed_at
    this.reset_send_at = user.reset_send_at

    console.log("Model user: " + JSON.stringify(user));
}

User.createUser = function (newUser, result) {
    sql.query('INSERT INTO users SET ?', newUser, function (err, res, fields) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            console.log("ID: " + res.insertId)
            result(null, res.insertId)
        }
    })
}

User.getUserById = function (userId, result) {
    sql.query('SELECT * FROM users WHERE id = ?', userId, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

User.getAllUsers = function (result) {
    sql.query("SELECT * FROM users", function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            console.log('Users: ', res)
            result(null, res)
        }
    })
}

User.updateById = function (id, user, result) { //to repair
    console.log(JSON.stringify(user))
    console.log(sql.query("UPDATE users SET ?? where id = ?", [user, id], function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
    )
}

User.removeById = function (id, result) {
    sql.query("DELETE FROM users WHERE id = ?", id, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

module.exports= User