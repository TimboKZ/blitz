"use strict";
var fs = require('fs');
var path = require('path');
var fm = require('front-matter');
var Util_1 = require('./Util');
var ContentParser = (function () {
    function ContentParser() {
    }
    ContentParser.parse = function (content) {
        var result;
        var parsedFrontMatter = fm(content);
        if (typeof parsedFrontMatter.attributes === 'string') {
            result = {
                title: parsedFrontMatter.attributes,
            };
        }
        else {
            result = parsedFrontMatter.attributes;
        }
        result.content = Util_1.Util.parseMarkdown(parsedFrontMatter.body);
        return result;
    };
    ContentParser.parseFile = function (filePath) {
        if (this.fileCache[filePath] === undefined) {
            var fileContents = Util_1.Util.getFileContents(filePath);
            var rawData = ContentParser.parse(fileContents);
            rawData.file = path.basename(filePath);
            this.fileCache[filePath] = rawData;
        }
        return this.fileCache[filePath];
    };
    ContentParser.parseDirectory = function (directoryPath) {
        if (this.directoryCache[directoryPath] === undefined) {
            var files = fs.readdirSync(directoryPath);
            var fileCount = files.length;
            var directoryData = [];
            for (var i = 0; i < fileCount; i++) {
                var filePath = path.join(directoryPath, files[i]);
                var fileStats = fs.lstatSync(filePath);
                if (fileStats.isFile()) {
                    var fileData = ContentParser.parseFile(filePath);
                    directoryData.push(fileData);
                }
            }
            this.directoryCache[directoryPath] = directoryData;
        }
        return this.directoryCache[directoryPath];
    };
    ContentParser.directoryCache = {};
    ContentParser.fileCache = {};
    return ContentParser;
}());
exports.ContentParser = ContentParser;
