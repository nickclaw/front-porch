var request = require('request'),
    when = require('when'),
    path = require('path');

/**
 * Makes an Inbox API call
 *
 * var options = {
 *     path: '/n/{namespace_id}/threads',
 *     query:{
 *         to: 'nickclaw@gmail.com'
 *     },
 *     method: 'GET'
 * }
 *
 * @param {Object} options
 * @return {Promise.<Object>}
 */
function api(options) {
    return when.promise(function(resolve, reject) {
        console.log('trying?');
        request({
            url: {
                protocol: 'http:', // todo get from config
                host: 'localhost',
                port: '5555',
                pathname: path.join('/', options.path || '/'),
                query: options.query || {}
            },

            method: options.method || 'GET',
            gzip: true,
            json: true,
            headers: {
                'User-Agent': 'test',
                'Connection': 'keep-alive'
            }
        }, function(err, message, body) {
            console.log(arguments);
            if (err) return reject(err);
            resolve(body);
        });
    });
}

// export
module.exports = {
    api: api
};
