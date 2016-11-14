"use strict";
var fs = require('fs');
var path = require('path');
var objectAssign = require('object-assign');
var fm = require('front-matter');
var Util_1 = require('./Util');
var ContentParser = (function () {
    function ContentParser() {
    }
    ContentParser.parse = function (content) {
        var parsedPage = fm(content);
        var result = parsedPage.attributes;
        result.content = Util_1.Util.parseMarkdown(parsedPage.body);
        return result;
    };
    ContentParser.parseFile = function (filePath) {
        if (!Util_1.Util.pathExists(filePath)) {
            Util_1.Util.error('Could not access `' + filePath + '`! Are you sure it exists?');
            return undefined;
        }
        if (this.fileCache[filePath] === undefined) {
            var fileContents = Util_1.Util.getFileContents(filePath);
            if (!fileContents) {
                Util_1.Util.error('Could not load the specified file for parsing!');
                return undefined;
            }
            var rawData = ContentParser.parse(fileContents);
            if (rawData === undefined) {
                Util_1.Util.error('Could not parse file contents!');
                return undefined;
            }
            this.fileCache[filePath] = objectAssign({}, rawData, { file: path.basename(filePath) });
        }
        return this.fileCache[filePath];
    };
    ContentParser.parseDirectory = function (directoryPath) {
        if (!Util_1.Util.pathExists(directoryPath)) {
            Util_1.Util.error('Could not access `' + path + '`! Are you sure it exists?');
            return undefined;
        }
        var files = fs.readdirSync(directoryPath);
        var fileCount = files.length;
        var directoryData = [];
        for (var i = 0; i < fileCount; i++) {
            var filePath = path.join(directoryPath, files[i]);
            var fileStats = void 0;
            try {
                fileStats = fs.lstatSync(filePath);
            }
            catch (e) {
                Util_1.Util.error('Could not fetch stats for `' + filePath + '`!');
                Util_1.Util.stackTrace(e);
                return undefined;
            }
            if (fileStats.isFile()) {
                var fileData = ContentParser.parseFile(filePath);
                if (fileData === undefined) {
                    Util_1.Util.error('Could not parse content of one of the files in `' + directoryPath + '`!');
                    return undefined;
                }
                directoryData.push(fileData);
            }
        }
        return directoryData;
    };
    ContentParser.directoryCache = {};
    ContentParser.fileCache = {};
    return ContentParser;
}());
exports.ContentParser = ContentParser;
