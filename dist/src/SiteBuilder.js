"use strict";
var fs = require('fs');
var path = require('path');
var pug = require('pug');
var objectAssign = require('object-assign');
var ContentParser_1 = require('./ContentParser');
var Util_1 = require('./Util');
var ASSETS_DIRECTORY = 'assets';
var CONTENT_DIRECTORY = 'content';
var TEMPLATES_DIRECTORY = 'templates';
var INDEX_FILE_NAME = 'index.html';
var SiteBuilder = (function () {
    function SiteBuilder(config, projectPath, buildDirectory) {
        this.pugCache = {};
        this.config = config;
        this.projectPath = projectPath;
        this.buildPath = path.join(projectPath, buildDirectory);
        this.assetsPath = path.join(projectPath, ASSETS_DIRECTORY);
        this.contentPath = path.join(projectPath, CONTENT_DIRECTORY);
        this.templatesPath = path.join(projectPath, TEMPLATES_DIRECTORY);
    }
    SiteBuilder.prototype.build = function () {
        if (!Util_1.Util.createDirectory(this.buildPath)) {
            Util_1.Util.error('Could not create the directory for the build!');
            return undefined;
        }
        this.iterate();
    };
    SiteBuilder.prototype.iterate = function () {
        var count = this.config.pages.length;
        for (var i = 0; i < count; i++) {
            var page = this.config.pages[i];
            this.buildRootPage(page);
            continue;
            var pageContent = ContentParser_1.ContentParser.parseFile(path.join(this.contentPath, page.content));
            var pugFunction = pug.compileFile(path.join(this.templatesPath, page.template));
            var strippedUri = Util_1.Util.stripSlashes(page.uri);
            var urlComponents = strippedUri.split('/');
            var currentPath = this.buildPath;
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
    SiteBuilder.prototype.buildRootPage = function (page) {
        var menu = [];
        var children = [];
        var uriComponents = Util_1.Util.getUriComponents(page.uri);
        var fileArray;
        if (uriComponents.length > 0 && uriComponents[1] !== '') {
            fileArray = uriComponents.slice(0);
            if (this.config.explicit_html_extensions) {
                var lastId = fileArray.length - 1;
                fileArray[lastId] = fileArray[lastId] + '.html';
            }
            else {
                fileArray.push(INDEX_FILE_NAME);
            }
        }
        else {
            fileArray = [INDEX_FILE_NAME];
        }
        if (page.children) {
        }
        var pageContent = ContentParser_1.ContentParser.parseFile(path.join(this.contentPath, page.content));
        var pugFunction = this.compilePug(path.join(this.templatesPath, page.template));
        var locals = objectAssign({}, this.config.globals, pageContent, { menu: menu, children: children });
        Util_1.Util.writeFileFromArray(this.buildPath, fileArray, pugFunction(locals));
    };
    SiteBuilder.prototype.buildChildPage = function (pageConfig) {
    };
    SiteBuilder.prototype.compilePug = function (path) {
        if (!this.pugCache[path]) {
            this.pugCache[path] = pug.compileFile(path);
        }
        return this.pugCache[path];
    };
    return SiteBuilder;
}());
exports.SiteBuilder = SiteBuilder;
