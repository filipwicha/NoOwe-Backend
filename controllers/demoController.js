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
            "temp": getRandomArbitrary(-10,30),
            "pressure": getRandomInt(980, 1200),
            "humidity":getRandomArbitrary(0,100)
        },
            "wind":{
                "speed" : getRandomArbitrary(0, 150),
                "gust": getRandomArbitrary(0,150),
                "deg" : getRandomInt(0,360)
            },
          "dt": new Date().valueOf()  
        }

    res.status(200).send(json)
}

var currentPercent = 69

exports.getpercent = (req, res) => {
    console.log
    res.status(200).send({value: currentPercent})
}

exports.setpercent = (req, res) => {
    currentPercent = req.body.percent
    res.status(200).send("changed to " + currentPercent)
} 
