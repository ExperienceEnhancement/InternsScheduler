var mongoose = require('mongoose');

var dailyTaskSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        hours: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        intern_id: {
            type: mongoose.Schema.ObjectId,
            required: true
        }
    },
    {
        collection: 'daily_tasks'
    });

var DailyTask = mongoose.model('DailyTask', dailyTaskSchema);

module.exports = DailyTask;