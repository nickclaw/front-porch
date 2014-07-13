var util = require('../util.js'),
    _ = require('lodash'),
    when = require('when'),
    Thread = require('./thread.js');


/**
 * https://www.inboxapp.com/docs/api#namespaces
 */
function Namespace(data) {
    _.extend(this, data);
}

// static
_.extend(Namespace, {

    /**
     * Retrieves all namespaces
     * @return {Promise}
     */
    getAll: function() {
        var resources = [];
        when.map(util.api({
            path: '/n/'
        }), function(namespace) {
            resources.push(new Namespace(namespace));
        });
        return resources;
    },

    /**
     * Retrieve namespace by id
     * @param {string} id
     * @return {Promise}
     */
    get: function(id) {
        return util.api({
            path: '/n/' + id
        }).then(function(namespace) {
            return new Namespace(namespace);
        });
    }
});

// proto
_.extend(Namespace.prototype, {

    getThreads: function() {
        return when.map(util.api({
            path: '/n/' + this.id + '/threads'
        }), function(thread) {
            return new Thread(thread);
        });
    },

    getThread: function(id) {
        return util.api({
            path: '/n/' + this.id + '/threads/' + id
        }).then(function(thread) {
            return new Thread(thread);
        });
    }
});

module.exports = Namespace;
