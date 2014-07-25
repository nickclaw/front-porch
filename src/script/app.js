// expose namespaces for things to fall under
angular.module('fp.controllers', []); // will this be used?
angular.module('fp.directives', []);
angular.module('fp.filters', []);
angular.module('fp.services', []);
angular.module('fp.resources', ['ngResource']);
angular.module('fp.routes', ['ui.router']);

// create main namespace
angular.module('fp', [
        'fp.controllers',
        'fp.directives',
        'fp.filters',
        'fp.services',
        'fp.resources'
    ])

    // configure any modules
    .config([
        '$locationProvider',
        function($locationProvider) {

            // no hashbangs #!
            $locationProvider.html5Mode(true);
        }
    ])

    // called once everything is ready
    .run([
        'Namespace',
        function(Namespace) {
            a = Namespace.query();
        }
    ])
