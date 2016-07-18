app.controller('CalendarController', function ($scope, calendar) {
    $scope.today = function () {
        $scope.dt = new Date();
    };

    $scope.today();

    $scope.options = {
        showWeeks: true,
        startingDay: 1
    };
});