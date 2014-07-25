angular.module('fp.resources')
    .factory('Message', [
        '$resource',
        'endpoint',
        function($resource, endpoint) {

            /**
             * From https://www.inboxapp.com/docs/api#messages
             * Messages are a sub-object of threads. The content of a message is
             * immutable (with the exception being drafts). Inbox does not
             * support operations such as move or delete on individual messages;
             * those operations should be performed on the message’s thread. All
             * messages are part of a thread, even if that thread has only one
             * message.
             */
            var Message = $resource(
                endpoint + '/n/:namespace/messages/:message',
                {
                    namespace: '@namespace',
                    message: '@id'
                },
                {

                }
            );

            return Message;
        }
    ]);
