angular.module('fp.resources')
    .factory('Thread', [
        '$resource',
        'endpoint',
        'Message',
        'Tag',
        function($resource, endpoint, Message, Tag) {

            /**
             * From https://www.inboxapp.com/docs/api#threads
             * Threads are the main object in Inbox. They can be read, archived,
             * and deleted. All messages are part of a thread, even if that
             * thread has only one message. Operations like flagging and marking
             * as read are only done at the thread level.
             */
            var Thread = $resource(
                endpoint + '/n/:namespace/threads/:thread',
                {
                    namespace: '@namespace',
                    thread: '@id'
                },
                {
                    save: {method: "PUT"}
                }
            );

            _.extend(Thread.prototype, {

                /**
                 * Adds a tag
                 * @param {Tag}
                 * @param {Function=} success
                 * @param {Function=} error
                 * @return {Thread}
                 */
                $addTag: function(tag, success, error) {
                    return this.$save({}, {
                        add_tags: [tag.id]
                    }, success, error);
                },

                /**
                 * Removes a tag
                 * @param {Tag}
                 * @param {Function=} success
                 * @param {Function=} error
                 * @return {Thread}
                 */
                $removeTag: function(tag, success, error) {
                    return this.$save({}, {
                        remove_tags: [tag.name]
                    }, success, error)
                },

                /**
                 * Retrieves all messages in a thread
                 * @param {Object=} filters
                 * @param {Function=} success
                 * @param {Function=} error
                 */
                $getMessages: function(filters, success, error) {
                    if (!_.isFunction(filters)) {
                        error = success; success = filters; param = {};
                    }
                    return Message.query(_.defaults({
                        namespace: this.namespace,
                        thread: this.id
                    }, filters), success, error);
                }
            })

            /**
             * Adds helper functions for common flag based operations
             * adds tag unless value starts with '!'
             *
             * https://www.inboxapp.com/docs/api#updating-tags-performing-actions
             */
            _.each({
                'delete': 'trash',
                'archive': 'archive',
                'unarchive': '!archive',
                'read': '!unread',
                'unread': 'unread',
                'see': '!unseen',
                'star': 'starred',
                'unstar': '!starred'
            }, function(tag, fnName) {
                var remove = tag.charAt(0) === '!',
                    toCall = remove ? '$removeTag' : '$addTag',
                    tag = remove ? tag.slice(1) : tag;

                /**
                 * @param {?Function=} success
                 * @param {?Function=} error
                 * @return {Thread}
                 */
                Thread.prototype['$' + fnName] = function(success, error) {
                    return this[toCall](new Tag({name: tag}), success, error);
                }
            })

            return Thread;
        }
    ]);
