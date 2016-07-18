'use strict';

app.controller('InternsDailyReportsController', function ($scope, calendar, dailyReports, usersData, constants, notifications) {
    usersData.saveUserData('578ca8a63168dfb01ea471f6');

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
        startingDay: 1,
        dateDisabled: getHolidays
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

    function getHolidays(data) {
        var date = data.date;
        var mode = data.mode;
        var holidays = calendar.holidays();
        var isHoliday = mode === 'day' && holidays.indexOf(date.setHours(0, 0, 0, 0)) > -1;

        return isHoliday;
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
        notifications.confirm('Please confirm the save action of the daily report').then(function () {
            var dailyReport = $scope.dailyReport;
            var hasSaveErrors = false;
            for (var i = 0; i < dailyReport.length; i++) {
                if (dailyReport[i]._id) {
                    dailyReports.updateDailyTask(dailyReport[i]).then(
                        function () {
                            getInternReport();
                        }, function () {
                            hasSaveErrors = true;
                        });
                } else {
                    dailyReports.saveDailyTask(dailyReport[i]).then(
                        function () {
                            getInternReport();
                        }, function () {
                            hasSaveErrors = true;
                        });
                }
            }

            if(!hasSaveErrors) {
                notifications.success('Daily report saved successfully');
            } else {
                notifications.error('Save errors occurred while save daily report. Please try again');
            }
        });
    }

    function deleteTask(taskId) {
        notifications.confirm('Please confirm task deletion').then(function () {
            dailyReports.deleteDailyTask(taskId).then(
                function () {
                    notifications.success('Task deleted successfully');
                    getInternReport();
                }, function () {

                });
        });
    }
});