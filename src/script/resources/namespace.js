angular.module('fp.resources')
    .factory('Namespace', [
        '$resource',
        'endpoint',
        'Thread',
        'Message',
        'Tag',
        function($resource, endpoint, Thread, Message, Tag) {

            Namespace = $resource(
                endpoint + '/n/:id',
                {
                    namespace: '@id'
                },
                {

                }
            );

            _.extend(Namespace.prototype, {

                /**
                 * Get all threads
                 * @param {Object=} filters
                 * @param {Function=} success
                 * @param {Function=} error
                 * @return {Array.<Thread>}
                 */
                $getThreads: function(filters, success, error) {
                    if (!_.isFunction(filters)) {
                        error = success; success = filters; param = {};
                    }
                    return Thread.query(_.defaults({
                        namespace: this.id
                    }, filters));
                }
            });

            return Namespace;
        }
    ]);
