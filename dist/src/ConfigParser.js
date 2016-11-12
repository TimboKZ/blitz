"use strict";
var path = require('path');
var Util_1 = require('./Util');
exports.DEFAULT_CONFIG_NAME = 'blitz.yml';
var ConfigParser = (function () {
    function ConfigParser() {
    }
    ConfigParser.load = function (configPath) {
        if (configPath === void 0) { configPath = path.join(process.cwd(), exports.DEFAULT_CONFIG_NAME); }
        Util_1.Util.debug('Loading Blitz config from `' + configPath + '`...');
        var configContent = Util_1.Util.getFileContents(configPath);
        if (!configContent) {
            Util_1.Util.error('Error loading config file! Are you sure `' + configPath + '` exists?');
            return undefined;
        }
        var config = Util_1.Util.parseYaml(configContent);
        if (!config) {
            Util_1.Util.error('Error parsing YAML! Are you sure `' + configPath + '` is valid?');
            return undefined;
        }
        Util_1.Util.debug('Successfully parsed YAML!');
        return config;
    };
    ConfigParser.verify = function (config) {
        return true;
    };
    return ConfigParser;
}());
exports.ConfigParser = ConfigParser;
