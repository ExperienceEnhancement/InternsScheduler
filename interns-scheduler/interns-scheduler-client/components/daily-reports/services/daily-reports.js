app.factory('dailyReports', function (requester, constants) {
    var getReportByDate = function (internId, date) {
        var url = constants.BASE_URL + '/daily-reports/' + internId + '/' + date;
        var request = requester.get(url, null);
        return request;
    };
    
    var saveDailyTask = function (dailyTask) {
        var url = constants.BASE_URL + '/daily-reports';
        var request = requester.post(url, null, dailyTask);
        return request;
    };

    var updateDailyTask = function (dailyTask) {
        var url = constants.BASE_URL + '/daily-reports';
        var request = requester.put(url, null, dailyTask);
        return request;
    };

    var deleteDailyTask = function (dailyTaskId) {
        var url = constants.BASE_URL + '/daily-reports/' + dailyTaskId;
        var request = requester.delete(url, null);
        return request;
    };
    
    return {
        byDate: getReportByDate,
        saveDailyTask: saveDailyTask,
        updateDailyTask: updateDailyTask,
        deleteDailyTask: deleteDailyTask
    }
});