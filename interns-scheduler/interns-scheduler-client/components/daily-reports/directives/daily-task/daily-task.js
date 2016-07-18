app.directive('dailyTask', [function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr, ctrl) {
            var $element = $(elem);
            $element.find('.edit-btn').on('click', function () {
                $element.find('.task-description').removeAttr('readonly');
                $element.find('.task-hours').removeAttr('readonly');
                $(this).hide();
            });
        },
        templateUrl: '/components/daily-reports/directives/daily-task/daily-task.html'
    }
}]);