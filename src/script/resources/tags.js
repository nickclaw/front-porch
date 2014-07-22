angular.module('fp.resources')
    .factory('Tag', [
        '$resource',
        'endpoint',
        function($resource, endpoint) {
            return $resource(
                endpoint + '/n/:namespace/tags/:tag',
                {
                    namespace: '@namespace',
                    tag: '@tag'
                },
                {

                }
            );
        }
    ]);
