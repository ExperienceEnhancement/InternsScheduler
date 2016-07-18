var mongoose = require('mongoose');

var holidaySchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        }
    },
    {
        collection: 'holidays'
    });

var Holiday = mongoose.model('Holiday', holidaySchema);

module.exports = Holiday;