const db = require('../config/db.config')
const TimeStamp = db.timeStamp
const Sequelize = require('sequelize')

function response(relay, power_switch, dummy) {
    var response = {
        "uuid": "Node1",
        "date": new Date(),
        "relay": relay,
        "power_switch": power_switch
    }

    if (dummy == true) {
        response.uuid = "Node1"
    }

    return response
}

var checked = true

exports.check = (req, res) => {
    console.log("Processing func -> check timeStamp")

    TimeStamp.findAll({
        limit: 1,
        order: [['date', 'DESC']]
    }).then(function (timeStamps) {
        if (timeStamps.length > 0) {
            var timeStamp = timeStamps[0]

            if (checked == false && timeStamp.power_switch == true) {
                timeStamp.power_switch = true
                checked = true
                res.status(200).send(timeStamp)
            } else {
                timeStamp.power_switch = false
                res.status(200).send(timeStamp)
            }
        }
        else {
            res.status(200).send(response(false, false, true))
        }
    }).catch(err => {
        res.status(200).send(response(false, false, true))
    })
}

exports.change = (req, res) => {
    console.log("Processing func -> change timeStamp")

    TimeStamp.findAll({
        limit: 1,
        order: [['date', 'DESC']]
    }).then(function (timeStamps) {
        if (timeStamps.length > 0) {
            var timeStamp = timeStamps[0]

            if (timeStamp.relay == false) {
                TimeStamp.create({ "relay": true, "power_switch": true }).then(timeStamp => {
                    checked = false
                    res.status(200).send(timeStamp)
                }).catch(err => {
                    res.status(500).send("Error -> " + err)
                })
            } else {
                TimeStamp.create({ "relay": false, "power_switch": false }).then(timeStamp => {
                    res.status(200).send(timeStamp)
                }).catch(err => {
                    res.status(500).send("Error -> " + err)
                })
            }
        }

        else {
            TimeStamp.create({ "relay": true, "power_switch": true }).then(timeStamp => {
                res.status(200).send(timeStamp)
            }).catch(err => {
                res.status(500).send("Error -> " + err)
            })
        }
    }).catch(err => {
        res.status(200).send("Error -> " + err)
    })
}

exports.getAll = (req, res) => {
    console.log("Processing func -> getAll timeStamp")

    var datefrom = new Date(req.query.datefrom)
    var dateto = new Date(req.query.dateto)

    TimeStamp.findAll({
        where: { date: { [Sequelize.Op.between]: [datefrom, dateto] } },
        order: [['date', 'ASC']]
    }).then(function (timeStamps) {
        res.status(200).send(timeStamps)
    }).catch(err => {
        res.status(500).send(err)
    })
}
