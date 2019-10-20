var sql = require('../db/db')

var Share = function (share) {
    this.amount = share.amount
    this.transaction_id = share.transaction_id
    this.member_id = share.member_id

    console.log("Model share: " + JSON.stringify(share));
}

Share.createShare = function (newShare, result) {
    sql.query('INSERT INTO shares SET ?', newShare, function (err, res, fields) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            console.log("ID: " + res.insertId)
            result(null, res.insertId)
        }
    })
}

Share.getShareById = function (shareId, result) {
    sql.query('SELECT * FROM shares WHERE id = ?', shareId, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(err, null)
        } else {
            result(null, res)
        }
    })
}

Share.getAllShares = function (result) {
    sql.query("SELECT * FROM shares", function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            console.log('Shares: ', res)
            result(null, res)
        }
    })
}

Share.updateById = function (id, share, result) { 
    share = JSON.parse(JSON.stringify(share)) //remove undefined fields

    sql.query("UPDATE shares SET ? where id = ?", [share, id], function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

Share.removeById = function (id, result) {
    sql.query("DELETE FROM shares WHERE id = ?", id, function (err, res) {
        if (err) {
            console.log("Error: ", err)
            result(null, err)
        }
        else {
            result(null, res)
        }
    })
}

module.exports = Share