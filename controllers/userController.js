const db = require('../config/db.config')
const env = require('../config/env')
const User = db.user

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
    // Save User to Database
    console.log("Processing func -> SignUp")
    console.log(req.body)

    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        res.status(200).send("User registered successfully!")
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}

exports.signin = (req, res) => {
    console.log("Sign-In")

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send('User Not Found.')
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" })
        }

        var token = jwt.sign({ id: user.id }, env.secret, {
            expiresIn: 86400 // expires in 24 hours
        })

        res.status(200).send({ auth: true, accessToken: token, id: user.id })

    }).catch(err => {
        res.status(500).send('Error -> ' + err)
    })
}

exports.getUsers = (req, res) => {
    User.findAll().then(users => {
        res.status(200).send(users)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}