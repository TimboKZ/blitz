"use strict";
var yaml = require('js-yaml');
var marked = require('marked');
var fs = require('fs');
var path = require('path');
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
    Util.writeFileFromArray = function (basePath, array, contents) {
        if (array.length === 0) {
            Util.error('Cannot write file from an empty array!');
            console.trace();
            return false;
        }
        var currentPath = basePath;
        var count = array.length;
        for (var i = 0; i < count - 1; i++) {
            currentPath = path.join(currentPath, array[i]);
            if (!Util.createDirectory(currentPath)) {
                return false;
            }
        }
        try {
            fs.writeFileSync(path.join(currentPath, array[count - 1]), contents);
        }
        catch (e) {
            Util.error('Error writing to `' + path + '`!');
            Util.stackTrace(e);
            return false;
        }
        return true;
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
    Util.getUriComponents = function (uri) {
        var strippedUri = Util.stripSlashes(uri);
        return strippedUri.split('/');
    };
    return Util;
}());
exports.Util = Util;
