var express = require('express');
var router = express.Router();

// Models
var DailyTask = require('../models/daily-task');
var User = require('../models/user');


router.get('/', function (req, res, next) {
    var userPeter = new User({
        username: 'peter',
        password: '123456',
        email: 'peter@abv.bg'
    });

    userPeter.save(function (err, user) {
        console.log('User Peter error: ' + err);
        console.log(user);

        var peterTaskFirst = new DailyTask({
            description: 'C# Research',
            hours: 3,
            date: new Date(Date.UTC(2016, 6, 13, 0, 0, 0, 0)),
            intern_id: user._id
        });
        
        peterTaskFirst.save();

        var peterTaskSecond = new DailyTask({
            description: 'Bugs Fixing',
            hours: 3,
            date: new Date(Date.UTC(2016, 6, 14, 0, 0, 0, 0)),
            intern_id: user._id
        });
        
        peterTaskSecond.save();

        var peterTaskThird = new DailyTask({
            description: 'jQuery Research',
            hours: 3,
            date: new Date(Date.UTC(2016, 6, 14, 0, 0, 0, 0)),
            intern_id: user._id
        });
        
        peterTaskThird.save();
    });

    var userMaria = new User({
        username: 'maria',
        password: '123456',
        email: 'maria@abv.bg'
    });

    userMaria.save(function (err, user) {
        console.log('User Maria error: ' + err);
        console.log(user);

        var mariaTaskFirst = new DailyTask({
            description: 'Java Research',
            hours: 3,
            date: new Date(Date.UTC(2016, 6, 15, 0, 0, 0, 0)),
            intern_id: user._id
        });

        mariaTaskFirst.save();

        var mariaTaskSecond = new DailyTask({
            description: 'Meeting',
            hours: 3,
            date: new Date(Date.UTC(2016, 6, 15, 0, 0, 0, 0)),
            intern_id: user._id
        });

        mariaTaskSecond.save();

        var mariaTaskThird = new DailyTask({
            description: 'Code refactoring',
            hours: 3,
            date: new Date(Date.UTC(2016, 6, 15, 0, 0, 0, 0)),
            intern_id: user._id
        });

        mariaTaskThird.save();
    });
});

module.exports = router;