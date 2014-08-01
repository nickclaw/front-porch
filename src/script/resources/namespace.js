angular.module('fp.resources')
    .factory('Namespace', [
        '$resource',
        'endpoint',
        'Thread',
        'Message',
        'Tag',
        function($resource, endpoint, Thread, Message, Tag) {

            /**
             * Namespace
             * https://www.inboxapp.com/docs/api#namespaces
             * @constructor
             */
            Namespace = $resource(
                endpoint + '/n/:id',
                {
                    id: '@id'
                },
                {
                    get: {},
                    query: {isArray: true}
                }
            );

            // add to prototype
            _.extend(Namespace.prototype, {

                /**
                 * Get all threads
                 * @param {Object=} filters
                 * @param {Function=} success
                 * @param {Function=} error
                 * @return {Array.<Thread>}
                 */
                $getThreads: function(filters, success, error) {
                    if (arguments.length < 3) {
                        error = success; success = filters; filters = {};
                    }

                    return Thread.query(_.defaults({
                        namespace: this.id
                    }, filters));
                }
            });

            /**
             * Parent namespace getter
             * @param {Function=} success
             * @param {Function=} error
             * @return {Namespace}
             */
            Thread.prototype.$getNamespace =
            Message.prototype.$getNamespace = function(success, error) {
                return Namespace.get({
                    id: this.namespace
                }, {}, success, error);
            };

            return Namespace;
        }
    ]);
