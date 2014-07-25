angular.module('fp.resources')
    .factory('Tag', [
        '$resource',
        'endpoint',
        function($resource, endpoint) {

            /**
             * From https://www.inboxapp.com/docs/api#tags
             * Tags are the primary way of storing metadata on a specific thread.
             * They are generally used to group threads with some criteria, such
             * as those unread or within a specific provider folder.
             */
            var Tag = $resource(
                endpoint + '/n/:namespace/tags/:tag',
                {
                    namespace: '@namespace',
                    tag: '@id'
                },
                {

                }
            );

            return Tag;
        }
    ]);
