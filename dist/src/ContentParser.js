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
    return ContentParser;
}());
exports.ContentParser = ContentParser;
