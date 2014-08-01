angular.module('fp.resources')
    .factory('Thread', [
        '$resource',
        '$http',
        'endpoint',
        'util',
        'Message',
        'Tag',
        function($resource, $http, endpoint, util, Message, Tag) {

            /**
             * Thread
             * From https://www.inboxapp.com/docs/api#threads
             * @constructor
             */
            var Thread = $resource(
                endpoint + '/n/:namespace/threads/:id',
                {
                    namespace: '@namespace',
                    id: '@id'
                },
                {
                    query: {isArray: true},
                    get: {}
                }
            );

            // extend prototype
            _.extend(Thread.prototype, {

                /**
                 * Send a PUT request to the thread endpoint
                 * @param {Object} data
                 * @param {Function=} success
                 * @param {Function=} error
                 * @return {HttpPromise}
                 */
                $put: function(data, success, error) {
                    var req = $http({
                        method: 'PUT',
                        url: endpoint + '/n/' + this.namespace + '/threads/' + this.id,
                        transformRequest: util.stripHeaders,
                        data: data
                    });

                    req.success(function(thread) {
                        util.clearAndShallowCopy(this, thread);
                    });

                    success && req.success(success);
                    error && req.error(error);

                    return req;
                },

                /**
                 * Adds a tag
                 * @param {Tag}
                 * @param {Function=} success
                 * @param {Function=} error
                 * @return {HttpPromise}
                 */
                $addTag: function(tag, success, error) {
                    return this.$put({
                        'add_tags': [tag]
                    }, success, error);
                },

                /**
                 * Removes a tag
                 * @param {Tag}
                 * @param {Function=} success
                 * @param {Function=} error
                 * @return {HttpPromise}
                 */
                $removeTag: function(tag, success, error) {
                    return this.$put({
                        'remove_tags': [tag]
                    }, success, error);
                },

                /**
                 * Retrieves all messages in a thread
                 * @param {Object=} filters
                 * @param {Function=} success
                 * @param {Function=} error
                 * @return {Array.<Message>}
                 */
                $getMessages: function(filters, success, error) {
                    if (arguments.length < 3) {
                        error = success; success = filters; filters = {};
                    }

                    filters['thread_id'] = this.id;

                    return Message.query(_.defaults({
                        namespace: this.namespace,
                        thread: this.id
                    }, filters), success, error);
                }

                // TODO https://www.inboxapp.com/docs/api#updating-tags-performing-actions
            });

            /**
             * Parent thread getter
             * @param {Function=} success
             * @param {Function=} error
             * @return {Thread}
             */
            Message.prototype.$getThread = function(success, error) {
                return Thread.get({
                    namespace: this.namespace,
                    id: this.thread
                }, {}, success, error);
            };

            return Thread;
        }
    ]);
