angular.module('fp.resources')
    .factory('Tag', [
        '$resource',
        'endpoint',
        'util',
        function($resource, endpoint, util) {

            /**
             * Tag
             * From https://www.inboxapp.com/docs/api#tags
             * @constructor
             */
            var Tag = $resource(
                endpoint + '/n/:namespace/tags/:tag',
                {
                    namespace: '@namespace',
                    tag: '@id'
                },
                {
                    query: {isArray: true},
                    get: {},
                    create: {
                        method: 'PUT',
                        transformRequest: util.stripHeaders
                    }
                }
            );

            return Tag;
        }
    ]);
