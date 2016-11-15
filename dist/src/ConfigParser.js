"use strict";
var Util_1 = require('./Util');
exports.DEFAULT_CONFIG_NAME = 'blitz.yml';
exports.CONFIG_PROPERTIES = [
    {
        name: 'blitz_version',
        message: 'Using current Blitz version',
        defaultValue: Util_1.Util.getPackageInfo().version,
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'Blitz version is supposed to be a string!',
    },
    {
        name: 'site_url',
        message: 'Using an empty string',
        defaultValue: '',
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'Site URL is supposed to be a string!',
    },
    {
        name: 'site_root',
        message: 'Using an empty string',
        defaultValue: '',
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'Site root is supposed to be a string!',
    },
    {
        name: 'absolute_urls',
        message: 'Disabling absolute URLs, using relative URLs instead',
        defaultValue: false,
        typeChecker: function (object) { return typeof object === 'boolean'; },
        typeError: 'Absolute URLs should be a boolean value!',
    },
    {
        name: 'explicit_html_extensions',
        message: 'Enabling explicit HTML extensions',
        defaultValue: true,
        typeChecker: function (object) { return typeof object === 'boolean'; },
        typeError: 'Explicit HTML extensions should be a boolean value!',
    },
    {
        name: 'globals',
        message: 'Assuming there are no globals',
        defaultValue: {},
        typeChecker: function (object) { return true; },
        typeError: '',
    },
    {
        name: 'pages',
        message: 'Assuming there are no pages',
        defaultValue: {},
        typeChecker: function (object) { return true; },
        typeError: '',
    },
];
var ConfigParser = (function () {
    function ConfigParser() {
    }
    ConfigParser.load = function (configPath) {
        Util_1.Util.debug('Loading Blitz config from `' + configPath + '`...');
        var configContent = Util_1.Util.getFileContents(configPath);
        var config = Util_1.Util.parseYaml(configContent);
        Util_1.Util.debug('Successfully parsed YAML in the config!');
        return this.validate(config);
    };
    ConfigParser.validate = function (config) {
        Util_1.Util.debug('Validating Blitz config...');
        var propertyCount = exports.CONFIG_PROPERTIES.length;
        for (var i = 0; i < propertyCount; i++) {
            var expected = exports.CONFIG_PROPERTIES[i];
            var property = config[expected.name];
            if (property === undefined) {
                var displayValue = void 0;
                if (typeof expected.defaultValue === 'string') {
                    displayValue = '`' + expected.defaultValue + '`';
                }
                else {
                    displayValue = JSON.stringify(expected.defaultValue);
                }
                var actionString = expected.message + ' (' + displayValue + ')';
                Util_1.Util.warn('`' + expected.name.cyan + '` is not defined: ' + actionString);
                config[expected.name] = expected.defaultValue;
            }
            else if (!expected.typeChecker(property)) {
                var errorString = 'Invalid `' + expected.name + (_a = [""], _a.raw = [""], (' type: ')(_a)) + expected.typeError;
                throw new Error(errorString);
            }
        }
        Util_1.Util.debug('Successfully validated Blitz config!');
        return config;
        var _a;
    };
    return ConfigParser;
}());
exports.ConfigParser = ConfigParser;
