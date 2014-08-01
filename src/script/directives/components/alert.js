angular.module('fp.directives')
    .directive('alertMessage', [

        function() {
            return {
                restrict: 'A',
                templateUrl: './template/component/alert.html',
                replace: true,
                scope: {
                    alert: '=alertMessage'
                }
            }
        }
    ])
