"use strict";
var fs = require('fs');
var path = require('path');
var pug = require('pug');
var ContentParser_1 = require('./ContentParser');
var Util_1 = require('./Util');
var CONTENT_PATH = 'content';
var TEMPLATES_PATH = 'templates';
var SiteBuilder = (function () {
    function SiteBuilder(config, targetDirectory) {
        this.config = config;
        this.targetDirectory = targetDirectory;
    }
    SiteBuilder.prototype.build = function () {
        if (!Util_1.Util.createDirectory(this.targetDirectory)) {
            Util_1.Util.error('Could not create the directory for the build!');
            return undefined;
        }
        this.iterate();
    };
    SiteBuilder.prototype.iterate = function () {
        var count = this.config.pages.length;
        var contentPath = path.join(process.cwd(), CONTENT_PATH);
        var templatesPath = path.join(process.cwd(), TEMPLATES_PATH);
        for (var i = 0; i < count; i++) {
            var page = this.config.pages[i];
            var pageContent = ContentParser_1.ContentParser.parseFile(path.join(contentPath, page.content));
            var pugFunction = pug.compileFile(path.join(templatesPath, page.template));
            var strippedUri = Util_1.Util.stripSlashes(page.uri);
            var urlComponents = strippedUri.split('/');
            var currentPath = this.targetDirectory;
            if (strippedUri.length !== 0) {
                var componentCount = urlComponents.length;
                for (var k = 0; k < componentCount; k++) {
                    var urlComponent = urlComponents[k];
                    currentPath = path.join(currentPath, urlComponent);
                    if (!Util_1.Util.createDirectory(currentPath)) {
                        Util_1.Util.error('Could not create the directory `' + currentPath + '`!');
                        return undefined;
                    }
                }
            }
            fs.writeFileSync(path.join(currentPath, 'index.html'), pugFunction(pageContent));
        }
    };
    return SiteBuilder;
}());
exports.SiteBuilder = SiteBuilder;
