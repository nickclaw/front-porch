angular.module('fp.resources')
    .factory('Message', [
        '$resource',
        '$http',
        'endpoint',
        'util',
        function($resource, $http, endpoint, util) {

            /**
             * Message
             * From https://www.inboxapp.com/docs/api#messages
             * @constructor
             */
            var Message = $resource(
                endpoint + '/n/:namespace/messages/:message',
                {
                    namespace: '@namespace',
                    message: '@id'
                },
                {
                    query: {isArray: true},
                    get: {}
                }
            );

            _.extend(Message.prototype, {

                /**
                 * Mark the message as read
                 * @param {Boolean} read
                 * @param {Function=} success
                 * @param {Function=} error
                 * @return {HttpPromise}
                 */
                $setRead: function(read, success, error) {
                    var req = $http({
                        method: 'PUT',
                        url: endpoint + '/n/' + this.namespace + '/messages/' + this.id,
                        transformRequest: util.stripHeaders,
                        data: {
                            unread: !read
                        }
                    });

                    req.success(function(message) {
                        util.clearAndShallowCopy(this, message);
                    });

                    success && req.success(success);
                    error && req.error(error);

                    return req;
                }
            });

            return Message;
        }
    ]);
