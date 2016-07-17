'use strict';

app.factory('calendar', function () {
    var getPublicHolidays = function () {
        var holidays = [
            // new Date().setHours(0, 0, 0, 0)
        ];
        
        return holidays;
    };

    var getWorkingDays = function () {
        var workingDays = [
            // new Date(2016, 6, 16, 0, 0, 0, 0).setHours(0, 0, 0, 0)
        ];

        return workingDays;
    };

    return {
        publicHolidays: getPublicHolidays,
        workingDays: getWorkingDays
    }
});
