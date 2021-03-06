"use strict";
var yaml = require('js-yaml');
var marked = require('marked');
var fs = require('fs');
var path = require('path');
var colors = require('colors');
var Util = (function () {
    function Util() {
    }
    Util.getPackageInfo = function () {
        if (this.packageInfoCache === undefined) {
            this.packageInfoCache = require('../../package.json');
        }
        return this.packageInfoCache;
    };
    Util.logWithPrefix = function (prefix, object) {
        console.log(prefix + ' ' + object.toString());
    };
    Util.log = function (object) {
        Util.logWithPrefix(colors.cyan('[Blitz LOG]'), object);
    };
    Util.warn = function (object) {
        Util.logWithPrefix(colors.yellow('[Blitz WARN]'), object);
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
        yamlString = yamlString.replace(/^\s+|\s+$/g, '');
        if (yamlString === '') {
            return {};
        }
        return yaml.safeLoad(yamlString);
    };
    Util.parseMarkdown = function (markdown) {
        return marked(markdown);
    };
    Util.pathExists = function (path) {
        try {
            fs.accessSync(path);
            return true;
        }
        catch (e) {
            return false;
        }
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
            Util.error('Error writing to `' + basePath + '`!');
            Util.stackTrace(e);
            return false;
        }
        return true;
    };
    Util.getFileContents = function (filePath) {
        Util.debug('Reading contents of `' + filePath + '`...');
        return fs.readFileSync(filePath, 'utf8');
    };
    Util.createDirectory = function (directoryPath) {
        try {
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath);
            }
            return true;
        }
        catch (e) {
            Util.error('Error creating directory `' + directoryPath + '`.');
            Util.stackTrace(e);
            return false;
        }
    };
    Util.removeDirectory = function (directoryPath) {
        var files = [];
        try {
            if (fs.existsSync(directoryPath)) {
                files = fs.readdirSync(directoryPath);
                files.forEach(function (file) {
                    var currentPath = path.join(directoryPath, file);
                    if (fs.lstatSync(currentPath).isDirectory()) {
                        Util.removeDirectory(currentPath);
                    }
                    else {
                        fs.unlinkSync(currentPath);
                    }
                });
                fs.rmdirSync(directoryPath);
            }
        }
        catch (e) {
            Util.error('Could not recursively remove a directory!');
            Util.stackTrace(e);
            return false;
        }
        return true;
    };
    Util.stripSlashes = function (stringWithSlashes) {
        stringWithSlashes = stringWithSlashes.replace(new RegExp('^/*'), '');
        stringWithSlashes = stringWithSlashes.replace(new RegExp('/*$'), '');
        return stringWithSlashes;
    };
    Util.getUriComponents = function (uri) {
        var strippedUri = Util.stripSlashes(uri);
        var components = strippedUri.split('/');
        if (components[0] === '') {
            return [];
        }
        return components;
    };
    Util.extractFileName = function (filePath) {
        return path.basename(filePath).replace(/\.[^/.]+$/, '');
    };
    Util.generateRandomString = function (length) {
        var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
        return result;
    };
    Util.isEmpty = function (object) {
        return Object.keys(object).length === 0;
    };
    return Util;
}());
exports.Util = Util;
