const db = require('../config/db.config')
const Category = db.category
const Currency = db.currency

exports.demo = (req, res) => {
    var categories = [
        {id: 0, photo: 'Animals', emoji: '\\ud83d\\udc36' },
        {id: 1, photo: 'Baby', emoji: '\\ud83d\\udc76\\ud83c\\udffb' },
        {id: 2, photo: 'Beauty', emoji: '\\ud83d\\udc85\\ud83c\\udffb' },
        {id: 3, photo: 'Drinks', emoji: '\\ud83c\\udf78' },
        {id: 4, photo: 'Electronics', emoji: '\\ud83d\\udcbb' },
        {id: 5, photo: 'Food', emoji: '\\ud83c\\udf55' },
        {id: 6, photo: 'Learning', emoji: '\\ud83c\\udf93' },
        {id: 7, photo: 'Love', emoji: '\\ud83d\\udc69\\u200d\\u2764\\ufe0f\\u200d\\ud83d\\udc68'},
        {id: 8, photo: 'Shopping', emoji: '\\ud83d\\udecd\\ufe0f' },
        {id: 9, photo: 'Sport', emoji: '\\ud83c\\udfc3' },
        {id: 10, photo: 'Sweets', emoji: '\\ud83c\\udf6b' },
        {id: 11, photo: 'Travel', emoji: '\\ud83d\\udee9' },
        {id: 12, photo: 'Others', emoji: '\\ud83d\\udca9'}
    ]

    var currencies = [
        {id: 0, code: "zł"},
        {id: 1, code: "$"},
        {id: 2, code: "€"},
        {id: 3, code: "£"},
        {id: 4, code: "¥"},
        {id: 5, code: "₦"}
    ]
    
    Category.destroy({where: {}}).then(function() {
        categories.forEach( category => {
            Category.create(category)
        })
    })

    Currency.destroy({where: {}}).then(function() {
        currencies.forEach( currency => {
            Currency.create(currency)
        })
    })

    res.status(200).send("Demo done")
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.data = (req, res) => {
    var json = {
        "main": {
            "temp": getRandomArbitrary(20, 21),
            "pressure": getRandomInt(1002, 1002),
            "humidity": getRandomArbitrary(54, 55)
        },
        "wind": {
            "speed": getRandomArbitrary(0, 0),
            "gust": getRandomArbitrary(0, 0),
            "deg": getRandomInt(0, 0)
        },
        "dt": new Date().valueOf()
    }

    console.log(json)

    res.status(200).send(json)
}

var currentPercent = 69

exports.getpercent = (req, res) => {
    console.log("getpercent")
    res.status(200).send({value: currentPercent})
}

exports.setpercent = (req, res) => {
    console.log(req.body)
    currentPercent = req.body.value
    console.log("setpercent" + currentPercent)
    res.status(200).send("changed to " + currentPercent)
} 
