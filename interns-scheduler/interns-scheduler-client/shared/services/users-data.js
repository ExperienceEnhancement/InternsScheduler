'use strict';

app.factory('usersData', function () {
    var getUserData = function () {
        var userData = {
            userId: localStorage.getItem('userId')
        };

        return userData;
    };

    var saveUserData = function (userId) {
        localStorage.setItem('userId', userId);
    };

    return {
        userData: getUserData,
        saveUserData: saveUserData
    }
});