angular.module('fp.resources')
    .factory('Thread', [
        '$resource',
        'endpoint',
        function($resource, endpoint) {
            return $resource(
                endpoint + '/n/:namespace/threads/:thread',
                {
                    namespace: '@namespace',
                    thread: '@thread'
                },
                {

                }
            );
        }
    ]);
