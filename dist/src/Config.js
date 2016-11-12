"use strict";
var path = require('path');
var fs = require('fs');
var Util_1 = require('./Util');
exports.DEFAULT_CONFIG_NAME = 'blitz.yml';
var Config = (function () {
    function Config() {
    }
    Config.load = function (configPath) {
        if (configPath === void 0) { configPath = path.join(process.cwd(), exports.DEFAULT_CONFIG_NAME); }
        var configContent;
        Util_1.Util.debug('Loading Blitz config from `' + configPath + '`...');
        try {
            configContent = fs.readFileSync(configPath, 'utf8');
        }
        catch (e) {
            Util_1.Util.error('Error reading `' + configPath + '`. Are you sure it exists?');
            Util_1.Util.error(e);
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
    Config.verify = function (config) {
        return true;
    };
    return Config;
}());
exports.Config = Config;
