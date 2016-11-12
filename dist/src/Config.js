"use strict";
var yaml = require('js-yaml');
var path = require('path');
var fs = require('fs');
var Util_1 = require('./Util');
exports.DEFAULT_CONFIG_NAME = 'blitz.yml';
var Config = (function () {
    function Config() {
    }
    Config.loadConfig = function (configPath) {
        if (configPath === void 0) { configPath = path.join(process.cwd(), exports.DEFAULT_CONFIG_NAME); }
        var configContent;
        Util_1.Util.debug('Loading Blitz config from `' + configPath + '`...');
        try {
            configContent = fs.readFileSync(configPath, 'utf8');
        }
        catch (e) {
            console.log('Error reading `' + configPath + '`. Are you sure it exists?');
            console.log(e);
            return;
        }
        var config;
        Util_1.Util.debug('Parsing  YAML...');
        try {
            config = yaml.safeLoad(configContent);
        }
        catch (e) {
            Util_1.Util.log('Error parsing YAML! Are you sure `' + configPath + '` is valid?');
            Util_1.Util.log(e);
            return;
        }
        Util_1.Util.debug('Successfully parsed YAML!');
        return config;
    };
    return Config;
}());
exports.Config = Config;
