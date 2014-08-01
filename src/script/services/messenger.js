angular.module('fp.services')
    .service('Messenger', [
        '$rootScope',
        '$timeout',
        function($rootScope, $timeout) {
            var alerts = $rootScope.alerts = [];

            var DEFAULT_OPTIONS = {
                type: 'notification',
                text: '',
                icon: '',
                handler: angular.noop,
                delay: 5000
            };

            /**
             * Display an alert briefly on the screen
             * @param {Object} options - extends DEFAULT_OPTIONS above
             */
            function createAlert(options) {
                // setup options
                options = _.extend({}, DEFAULT_OPTIONS, options);
                options.close = _.once(function() {
                    alerts.splice(alerts.indexOf(options), 1);
                });

                // push to $rootScope
                alerts.push(options);
                $rootScope.$apply();

                // add automatic timeout
                $timeout(options.close, options.delay);
            }

            /**
             * Expose Messenger interface
             */
            return {

                /**
                 * Show alert
                 * @param {Object|String} options
                 */
                alert: function(options) {
                    if (_.isString(options)) {
                        options = {text: options}
                    }
                    createAlert(options);
                }
            }
        }
    ])
