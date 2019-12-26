const db = require('../config/db.config')
const env = require('../config/env')
const User = db.user

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
    // Save User to Database
    console.log("Processing func -> SignUp")
    

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
            return res.status(404).send("User not found" )
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) {
            return res.status(401).send("Invalid Password!")
        }

        var expiresIn = 60*60*24*180
        var token = jwt.sign({ id: user.id }, env.secret, {
            expiresIn: expiresIn // expires in x hours
        })
         
        res.status(200).send({ auth: true, expiresIn: getFutureDateWithSeconds(expiresIn), accessToken: token, id: user.id })

    }).catch(err => { 
        res.status(500).send("Err " + err)
    })
}

function getFutureDateWithSeconds(secondsFromNowToAdd){
    return new Date(new Date().getTime() + secondsFromNowToAdd*1000) 

}

exports.getall = (req, res) => {
    User.findAll().then(users => {
        res.status(200).send(users)
    }).catch(err => {
        res.status(500).send("Error -> " + err)
    })
}