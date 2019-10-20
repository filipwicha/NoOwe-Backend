const Share = require('../models/shareModel')

exports.list_all_shares = function (req, res) {
    Share.getAllShares(function (err, share) {
        if (err) {
            res.send(err)
            console.log('res', share)
        } else {
            res.send(share)
        }
    })
}

exports.create_a_share = function (req, res) {
    Share.createShare(new Share(req.body), function (err, share) {
        if (err) {
            res.send(err)
        } else {
            res.json(share)
        }
    })
}

exports.read_a_share = function (req, res) {
    Share.getShareById(req.params.shareId, function (err, share) {
        if (err) {
            res.send(err)
        } else {
            res.json(share)
        }
    })
}

exports.update_a_share = function (req, res) {
    Share.updateById(req.params.shareId, new Share(req.body), function (err, share) {
        if (err) {
            res.send(err)
        } else {
            res.json(share)
        }
    })
}

exports.delete_a_share = function (req, res) {
    Share.removeById(req.params.shareId, function (err, share) {
        if (err) {
            res.send(err)
        } else {
            res.json({ message: 'Share ' + req.params.id + " deleted successfully" })
        }
    })
}