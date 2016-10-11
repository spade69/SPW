'use strict';
var requirejs = require('requirejs');

module.exports = function (options) {
    return function(cb) {
        requirejs.optimize(options, function() {
            cb();
        }, function(err){
            cb(err);
        });
    };
};
