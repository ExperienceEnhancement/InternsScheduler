var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Common
var constants = require('../shared/constants.js');

// Models
var Holiday = require('../models/holiday');

router.get('/:year/:month', function (req, res, next) {
    var year = req.params.year;
    var month = req.params.month;

    Holiday.find({
        year: year,
        month: month
    }).lean().exec(function (err, docs) {
        return res.json(docs);
    });
});

router.post('/', function (req, res, next) {
    var requestBody = req.body;
    var date = new Date(requestBody.date + constants.UTC_TIME_STRING);

    var newHoliday = new Holiday({
        date: date,
        year: date.getFullYear(),
        month: date.getMonth() + 1
    });

    newHoliday.save(function (err, holiday) {
        if(holiday) {
            return res.json(holiday);
        }

        if(err) {
            return res.json(err);
        }
    });
});

router.delete('/:holidayId', function (req, res, next) {
    Holiday
        .find({_id: mongoose.Types.ObjectId(req.params.holidayId)})
        .remove(function (err, response) {
            if(err) {
                return res.json(err);
            }

            return res.json(response.result)
        });
});

module.exports = router;