var sql = require('../db/db')
const bcrypt = require('bcrypt')

var User = function (user) {
    this.email = user.email
    this.username = user.username
    this.password = typeof user.password === 'string' ? bcrypt.hashSync(user.password, 10) : undefined
    this.confirmed_at = user.confirmed_at
    this.reset_send_at = user.reset_send_at
}

User.prototype.comparePassword = function (password){
    if(bcrypt.compareSync('password', this.password)) {
        return true
       } else {
        return false
       }
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

User.updateById = function (id, user, result) {
    user = JSON.parse(JSON.stringify(user)) //remove undefined fields

    sql.query("UPDATE users SET ? where id = ?", [user, id], function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
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

module.exports = User