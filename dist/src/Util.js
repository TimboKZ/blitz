"use strict";
var yaml = require('js-yaml');
var marked = require('marked');
var fs = require('fs');
var colors = require('colors');
var Util = (function () {
    function Util() {
    }
    Util.logWithPrefix = function (prefix, object) {
        console.log(prefix + ' ' + object.toString());
    };
    Util.log = function (object) {
        Util.logWithPrefix(colors.cyan('[Blitz LOG]'), object);
    };
    Util.error = function (object) {
        Util.logWithPrefix(colors.red('[Blitz ERROR]'), object);
    };
    Util.stackTrace = function (object) {
        console.log(object);
    };
    Util.debug = function (object) {
        if (global.debug) {
            Util.logWithPrefix(colors.yellow('[Blitz DEBUG]'), object);
        }
    };
    Util.parseYaml = function (yamlString) {
        Util.debug('Parsing  YAML...');
        var parsedYaml;
        try {
            parsedYaml = yaml.safeLoad(yamlString);
        }
        catch (e) {
            Util.error('Error parsing YAML!');
            Util.stackTrace(e);
            return undefined;
        }
        return parsedYaml;
    };
    Util.parseMarkdown = function (markdown) {
        return marked(markdown);
    };
    Util.getFileContents = function (path) {
        var fileContents;
        Util.debug('Reading contents of `' + path + '`...');
        try {
            fileContents = fs.readFileSync(path, 'utf8');
        }
        catch (e) {
            Util.error('Error reading `' + path + '`. Are you sure it exists?');
            Util.stackTrace(e);
            return undefined;
        }
        return fileContents;
    };
    Util.createDirectory = function (path) {
        try {
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            return true;
        }
        catch (e) {
            Util.error('Error creating directory `' + path + '`.');
            Util.stackTrace(e);
            return false;
        }
    };
    Util.stripSlashes = function (stringWithSlashes) {
        stringWithSlashes = stringWithSlashes.replace(new RegExp('^/*'), '');
        stringWithSlashes = stringWithSlashes.replace(new RegExp('/*$'), '');
        return stringWithSlashes;
    };
    return Util;
}());
exports.Util = Util;
