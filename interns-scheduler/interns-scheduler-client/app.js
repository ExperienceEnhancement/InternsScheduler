'use strict';

// Declare components level module which depends on filters, and services
var app = angular.module('internsScheduler', [
  'ngRoute',
  'ui.bootstrap'
]);

app.constant('constants', {BASE_URL: 'http://localhost:3000', yearFormat: 'YYYY-MM-DD'});

app.config(function($routeProvider) {
  $routeProvider.when('/daily-reports', {templateUrl: 'components/daily-reports/daily-reports.html', controller: 'InternsDailyReportsController'});
  $routeProvider.when('/calendar-settings', {templateUrl: 'components/calendar/calendar-settings.html', controller: 'CalendarController'});
  $routeProvider.otherwise({redirectTo: '/daily-reports'});
});
