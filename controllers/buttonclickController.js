const db = require('../config/db.config')
var nodemailer = require('nodemailer');
var mail = require('../config/mail')

const ButtonClick = db.buttonClick

exports.click = (req, res) => {
    console.log("email sent")
    sendEmail("filip.pietraszak@student.put.poznan.pl", "Test", "to jest testowy test ziioooom")
}

exports.check = (req, res) => {
    console.log("Processing func -> check ButtonClick")
    res.status(200).send("Processing func -> check ButtonClick")
}

function sendEmail(to, subject, text) {

    var mail = 'homeofficer@onet.pl'
    
    let transporter = nodemailer.createTransport({
        host: "smtp.poczta.onet.pl",
        port: 465,
        secure: true, 
        auth: {
          user: mail, // generated ethereal user
          pass: 'Homeofficer1', // generated ethereal password
        },
      });
    
    var mailOptions = {
        from: mail,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

