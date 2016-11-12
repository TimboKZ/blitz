"use strict";
var yaml = require('js-yaml');
var marked = require('marked');
var blitz_1 = require('./blitz');
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
        if (blitz_1.args.debug) {
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
    return Util;
}());
exports.Util = Util;
