"use strict";
var colors = require('colors');
var Util_1 = require('./Util');
(function (LogLevel) {
    LogLevel[LogLevel["Log"] = 0] = "Log";
    LogLevel[LogLevel["Warn"] = 1] = "Warn";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Debug"] = 3] = "Debug";
})(exports.LogLevel || (exports.LogLevel = {}));
var LogLevel = exports.LogLevel;
var Logger = (function () {
    function Logger() {
    }
    Logger.brand = function (text) {
        return colors.cyan(text);
    };
    Logger.logWithPrefix = function (prefix, object) {
        console.log(prefix + ' ' + object.toString());
    };
    Logger.log = function (object, level) {
        if (level === void 0) { level = LogLevel.Log; }
        if (level === LogLevel.Debug && !global.debug) {
            return;
        }
        var prefix;
        switch (level) {
            case LogLevel.Warn:
                prefix = colors.yellow('[Blitz WRN]');
                break;
            case LogLevel.Error:
                prefix = colors.red('[Blitz ERR]');
                break;
            case LogLevel.Debug:
                prefix = colors.magenta('[Blitz DBG]');
                break;
            default:
                prefix = Logger.brand('[Blitz LOG]');
        }
        if (Util_1.Util.isString(object)) {
            object = object.replace(/\n/g, '\n' + (new Array(colors.strip(prefix).length + 2)).join(' '));
        }
        Logger.logWithPrefix(prefix, object);
    };
    Logger.logMany = function (objects, level) {
        if (level === void 0) { level = LogLevel.Log; }
        for (var i = 0; i < objects.length; i++) {
            Logger.log(objects[i], level);
        }
    };
    Logger.split = function (stringWithNewlines) {
        stringWithNewlines = stringWithNewlines.replace(/^(\n)*/g, '');
        stringWithNewlines = stringWithNewlines.replace(/(\n)*$/g, '');
        return stringWithNewlines.split('\n');
    };
    return Logger;
}());
exports.Logger = Logger;
