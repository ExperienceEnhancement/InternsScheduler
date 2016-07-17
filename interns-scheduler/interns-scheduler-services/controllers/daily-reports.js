var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Models
var DailyTask = require('../models/daily-task');
var User = require('../models/user');

router.get('/:internId/:date', function (req, res, next) {
    var internId = req.params.internId;
    var dateString = req.params.date;
    var dateFilter = new Date(dateString + 'T00:00:00.000Z');

    DailyTask.find({
        intern_id: internId,
        date: dateFilter
    }).lean().exec(function (err, docs) {
        return res.json(docs);
    });
});

router.post('/', function (req, res, next) {
    var requestBody = req.body;
    var newTask = new DailyTask({
        description: requestBody.description,
        hours: requestBody.hours,
        date: requestBody.date,
        intern_id: mongoose.Types.ObjectId(requestBody.internId)
    });

    newTask.save(function (err, task) {
        if(task) {
            return res.json(task);
        }

        if(err) {
            return res.json(err);
        }
    });
});

router.delete('/:taskId', function (req, res, next) {
    DailyTask
        .find({_id: mongoose.Types.ObjectId(req.params.taskId)})
        .remove(function (err, response) {
            if(err) {
                return res.json(err);
            }

            return res.json(response.result)
        });
});

router.put('/', function (req, res, next) {
    DailyTask
        .findOne({_id: mongoose.Types.ObjectId(req.body._id)}, function (err, doc) {
            doc.description = req.body.description;
            doc.hours = req.body.hours;
            doc.save(function (err, task) {
                if(task) {
                    return res.json(task);
                }

                if(err) {
                    return res.json(err);
                }
            });
        });
});

module.exports = router;