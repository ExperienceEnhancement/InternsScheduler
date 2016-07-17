'use strict';

app.controller('InternsDailyReportsController', function ($scope, calendar, dailyReports, usersData, constants) {
    usersData.saveUserData('5787cbfc42ca47f01a4bb158');

    // Calendar settings
    $scope.today = function () {
        $scope.dt = new Date();
    };

    $scope.today();

    // Pop-up options
    // $scope.dateOptions = {
    //     showWeeks: true,
    //     dateDisabled: getNonWorkingDays
    // };
    //
    // $scope.open = function() {
    //     $scope.opened = true;
    // };
    //
    // $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    // $scope.format = $scope.formats[0];
    //
    // $scope.opened = false;

    // Inline options
    $scope.options = {
        showWeeks: true,
        dateDisabled: getNonWorkingDays
    };

    $scope.addNewTask = function () {
        var newTask = {
            id: null,
            date: moment($scope.dt).format(constants.yearFormat),
            description: '',
            internId: usersData.userData().userId,
            hours: null
        };

        $scope.dailyReport.push(newTask);
    };

    $scope.loadDailyReport = function () {
        getInternReport();
    };

    $scope.loadDailyReport();

    $scope.saveDailyReport = saveDailyReport;

    $scope.deleteTask = deleteTask;

    function getNonWorkingDays(data) {
        var date = data.date;
        var mode = data.mode;

        // Public holidays for the country
        var holidays = calendar.publicHolidays();

        // Compensate working days for public holidays
        var workingDays = calendar.workingDays();

        var isWeekend = (date.getDay() === 0 || date.getDay() === 6);
        var isHoliday = mode === 'day' && holidays.indexOf(date.setHours(0, 0, 0, 0)) > -1;
        var isWorkingDay = mode === 'day' && workingDays.indexOf(date.setHours(0, 0, 0, 0)) > -1;

        var isNonWorkingDay = (isHoliday || isWeekend) && !isWorkingDay;
        return isNonWorkingDay;
    }

    function getInternReport() {
        var date = moment($scope.dt).format(constants.yearFormat);
        dailyReports.byDate(usersData.userData().userId, date)
            .then(
                function (data) {
                    $scope.dailyReport = data;
                },
                function (error, status, headers, config) {
                    console.log(error, status);
                });
    }

    function saveDailyReport() {
        var dailyReport = $scope.dailyReport;

        for (var i = 0; i < dailyReport.length; i++) {
            if (dailyReport[i]._id) {
                dailyReports.updateDailyTask(dailyReport[i]).then(function () {
                    getInternReport();
                });
            } else {
                dailyReports.saveDailyTask(dailyReport[i]).then(function () {
                    getInternReport();
                });
            }

        }
    }

    function deleteTask(taskId) {
        dailyReports.deleteDailyTask(taskId).then(
            function () {
                getInternReport();
            }, function () {

            });
    }
});