"use strict";
var Util_1 = require('./Util');
var ContentParser = (function () {
    function ContentParser() {
    }
    ContentParser.parse = function (content) {
        var components = content.split(/---\r?\n/);
        var yamlString = components.shift();
        var markdownString = components.join('---\n');
        var yamlObject = Util_1.Util.parseYaml(yamlString);
        var htmlContent = Util_1.Util.parseMarkdown(markdownString);
        if (yamlObject === undefined) {
            Util_1.Util.debug('Could not parse YAML extracted from content!');
            return undefined;
        }
        yamlObject.content = htmlContent;
        return yamlObject;
    };
    ContentParser.parseFile = function (path) {
        var fileContents = Util_1.Util.getFileContents(path);
        if (!fileContents) {
            Util_1.Util.error('Could not load the specified file for parsing!');
            return undefined;
        }
        return ContentParser.parse(fileContents);
    };
    return ContentParser;
}());
exports.ContentParser = ContentParser;
