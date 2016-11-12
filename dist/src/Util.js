"use strict";
var yaml = require('js-yaml');
var marked = require('marked');
var fs = require('fs');
var Util = (function () {
    function Util() {
    }
    Util.log = function (object) {
        console.log(object);
    };
    Util.error = function (object) {
        console.log(object);
    };
    Util.debug = function (object) {
        if (global.debug) {
            console.log(object);
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
            Util.error(e);
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
            Util.error(e);
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
            Util.error(e);
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
