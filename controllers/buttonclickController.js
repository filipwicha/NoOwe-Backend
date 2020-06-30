const db = require('../config/db.config')
var nodemailer = require('nodemailer');

const TimeStamp = db.timeStamp
const Sequelize = require('sequelize');
const { timeStamp } = require('../config/db.config');

const ButtonClick = db.buttonClick

exports.report = (req, res) => {
    var prevMonthRange = [new Date("2020-06-01T00:00:00.000Z"), new Date("2020-06-30T23:59:59.999Z")]
    try{
        TimeStamp.findAll({
            where: { date: { [Sequelize.Op.between]: prevMonthRange } },
            order: [['id', 'ASC']]
        }).then(function (timeStamps) {
            var durations = getAllObjects(timeStamps).filter(duration => {
                return Object.keys(duration).length > 0
            }) //[{"start": start, "stop": stop, "seconds": seconds}, ... ]
            
            var rows = durations.map((duration) => {
                return getRow(duration)
            })

            var elapsedSeconds = rows.map( row => {
                return row.secondsElapsed
            }).reduce((a, b) => a + b, 0)

            var month = getMonthName(durations[0].start)
            var total = formatSecondsAsTime(elapsedSeconds)
            var tableBody = [getHeader(), getRows(rows), addFooter(total)]
            var body = sentence(month, total) +
                        asTable(tableBody.join("")) +
                        "</br></br></br>" +
                        "Created with &#9829; by HomeOfficer team" +
                        addStyle()

            var html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>HomeOfficer Report</title><meta name="description" content="HomeOfficer"><meta name="author" content="FwichaFpietraszak"></head><body>`+ middle(body) +`</body></html>`
            
            res.status(200).send(html)
        })
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}
exports.click = (req, res) => {
    console.log("Processing func -> getAll timeStamp")

    var prevMonthRange = getPreviousMonthRange() //[new Date("2020-06-01T11:42:26.134Z"), new Date("2020-06-30T11:42:26.133Z")]// getPreviousMonthRange()
    try{
        TimeStamp.findAll({
            where: { date: { [Sequelize.Op.between]: prevMonthRange } },
            order: [['id', 'ASC']]
        }).then(function (timeStamps) {
            var durations = getAllObjects(timeStamps) //[{"start": start, "stop": stop, "seconds": seconds}, ... ]
            var rows = durations.map((duration) => {
                return getRow(duration)
            })

            var elapsedSeconds = rows.map( row => {
                return row.secondsElapsed
            }).reduce((a, b) => a + b, 0)

            var month = getMonthName(durations[0].start)
            var total = formatSecondsAsTime(elapsedSeconds)
            var tableBody = [getHeader(), getRows(rows), addFooter(total)]
            var body = sentence(month, total) +
                        asTable(tableBody.join("")) +
                        "</br></br></br>" +
                        "Created with &#9829; by HomeOfficer team" +
                        addStyle()
            var report = middle(body)

            console.log(report)
            res.status(200).send("email sent")
            sendEmail("filip.pietraszak@student.put.poznan.pl", "Remote working hours report in" + month, report)
            sendEmail("5021567@gmail.com", "Remote working hours report in" + month, report)
        })
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
    
}

function addStyle(){
    return `<style>
    .zui-table {
        border: solid 1px #DDEEEE;
        border-collapse: collapse;
        border-spacing: 0;
        font: normal 13px Arial, sans-serif;
    }
    .zui-table thead th {
        background-color: #DDEFEF;
        border: solid 1px #DDEEEE;
        color: #336B6B;
        padding: 10px;
        text-align: center;
        text-shadow: 1px 1px 1px #fff;
    }
    .zui-table tbody td {
        border: solid 1px #DDEEEE;
        color: #333;
        padding: 10px;
        text-shadow: 1px 1px 1px #fff;
    }

    h2 {
        font: normal 20px Arial, sans-serif;
    }

    p {
        font: normal 13px Arial, sans-serif;
    }

    
    </style>`
}

function sentence(monthName, time){
    var h = "<h2>REPORT FOR REMOTE WORK IN " + monthName.toUpperCase() + "</h2>"
    var sentence = "<p>In month " + monthName + " I have worked for " + time + ". Below you can see a table with my working hours.</p>"
    return h + sentence
}

function getHeader(){
    return "<tr><th>Date</th><th>Start of work</th><th>End of work</th><th>Time elapsed</th></tr>"
}

function getRows(rows){
    var rows = rows.map(row => {
        return  "<tr><td>" + row.startDate + "</td><td>" + row.startTime + "</td><td>" + row.stopTime + "</td><td>" + row.timeElapsed + "</td></tr>"
    })
    return rows.join("")
}

function asTable(table){
    return "<table style=\"width:100%\" class=\"zui-table\">" + table + "</table>"
}

function addFooter(time){
    return "<tr><td></td><td></td><td>Sum:</td><td>" + time + "</td></tr>"
}

function getMonthName(date){
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

    return monthNames[date.getMonth()]
}

function middle(page){
    return '<div>' + page + '</div>'
}

function getRow(object) {
    var row = {
        "startDate": formatAsDate(object.start),
        "startTime": formatAsTime(object.start),
        "secondsElapsed": object.seconds,
        "timeElapsed": formatSecondsAsTime(object.seconds),
        "stopTime": formatAsTime(object.stop)
    }

    return row
}

function formatSecondsAsTime(seconds){
    var hours   = add0(Math.floor(seconds / 3600));
    var minutes = add0(Math.floor(seconds / 60 % 60));
    var seconds = add0(Math.floor(seconds % 60));

    return  hours + ':' + minutes + ':' + seconds
}

function add0(number){
    if (number < 10) {
        return '0' + number;
    }
    return number
}

function formatAsDate(date){
    var dd = add0(date.getDate());

    var mm = add0(date.getMonth() + 1);
    var yyyy = date.getFullYear();
    
    return mm + '/' + dd + '/' + yyyy
}

function formatAsTime(time){
    return add0(time.getHours()) + ":" + add0(time.getMinutes()) + ":" + add0(time.getSeconds())
}

function getAllObjects(timeStamps) {
    if (timeStamps.length < 2) { return [] }
    if (timeStamps[0].relay == false) {
        timeStamps.shift()
    }
    if (timeStamps[timeStamps.length - 1].relay == true) {
        timeStamps.pop()
    }

    var chunks = chunk(timeStamps, 2)

    var objects = chunks.map(chunk => {
        if (chunk.length == 2) {
            var start = new Date(chunk[0].date) 
            var stop =  new Date(chunk[1].date) 
            var startTime = start.getTime() 
            var stopTime = stop.getTime()
            var dif = startTime - stopTime
            var seconds = Math.abs(dif / 1000)

            return { "start": start, "stop": stop, "seconds": seconds }
        }
        return {}
    })

    return objects
}

function chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
        const last = chunked_arr[chunked_arr.length - 1];
        if (!last || last.length === size) {
            chunked_arr.push([array[i]]);
        } else {
            last.push(array[i]);
        }
    }
    return chunked_arr;
}

function getPreviousMonthRange() {
    var lastDay = new Date()
    lastDay.setDate(0) //set to last day of previous mont

    var firstDay = new Date()
    firstDay.setDate(0) //set to last day of previous mont
    firstDay.setDate(1) //set to first day of previous month
    return [firstDay, lastDay]
}

function sendEmail(to, subject, text) {

    var mail = 'donotreplyhomeofficer@gmail.com'

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c140374df6fcfc",
          pass: "62b6ddee4c14df"
        }
      });

    var mailOptions = {
        from: mail,
        to: to,
        subject: subject,
        text: text
    };

    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.check = (req, res) => {
    console.log("Processing func -> check ButtonClick")
    res.status(200).send("Processing func -> check ButtonClick")
}
