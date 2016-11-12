"use strict";
var blitz_1 = require('./blitz');
var Util = (function () {
    function Util() {
    }
    Util.log = function (object) {
        console.log(object);
    };
    Util.debug = function (object) {
        if (blitz_1.args.debug) {
            console.log(object);
        }
    };
    return Util;
}());
exports.Util = Util;
