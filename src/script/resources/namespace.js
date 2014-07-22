angular.module('fp.resources')
    .factory('Namespace', [
        '$resource',
        'endpoint',
        function($resource, endpoint) {
            return $resource(
                endpoint + '/n/:namespace',
                {
                    namespace: '@namespace'
                },
                {

                }
            );
        }
    ]);
