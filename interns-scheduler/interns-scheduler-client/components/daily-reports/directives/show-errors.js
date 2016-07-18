app.directive('showErrors', function () {
    return {
        restrict: 'A',
        require: '^form',
        replace: true,
        link: function (scope, el, attrs, formControl) {
            var inputElement = el[0].querySelector("[name]");
            var inputNgElement = angular.element(inputElement);
            var inputName = inputNgElement.attr('name');
            inputNgElement.bind('blur', function () {
                $(inputElement).toggleClass('has-validation-error', formControl[inputName].$invalid);
            })
        }
    }
});