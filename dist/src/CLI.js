"use strict";
var CLI = (function () {
    function CLI() {
    }
    CLI.run = function (args) {
        console.log(args);
    };
    CLI.init = function (templateName) {
    };
    CLI.build = function () {
    };
    CLI.watch = function () {
    };
    CLI.preview = function () {
    };
    return CLI;
}());
exports.CLI = CLI;
