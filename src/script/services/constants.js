angular.module('fp.services')
    .constant('endpoint', 'http://localhost:5555')
    .constant('util', {

        /**
         * Create a shallow copy of an object and clear other fields from the destination
         * https://github.com/angular/bower-angular-resource/blob/3ff0bc8d387d1990d8b1b4b98a129994c2add256/angular-resource.js#L35-L46
         * @param {Object} src
         * @param {Object} dst
         */
        clearAndShallowCopy: function shallowClearAndCopy(src, dst) {
            dst = dst || {};

            _.each(dst, function(value, key){
                delete dst[key];
            });

            for (var key in src) {
                if (src.hasOwnProperty(key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                    dst[key] = src[key];
                }
            }

            return dst;
        },

        /**
         * Strips ajax request headers to prevent CORS problems
         * @param {Object} body
         * @param {Function} getter - returns headers
         * @return {String} - serialized body
         */
        stripHeaders: function(body, getter) {
            var headers = getter();
            delete headers["Content-Type"];
            return JSON.stringify(body);
        }
    });
