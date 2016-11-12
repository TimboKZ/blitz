"use strict";
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
            if (!this.buildRootPage(page)) {
                Util_1.Util.error('Failed to build a root page!');
                Util_1.Util.error('Aborting build process!');
                return undefined;
            }
        }
    };
    SiteBuilder.prototype.buildRootPage = function (page) {
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
        var menu = [];
        var childPages = {};
        if (page.child_pages && page.child_pages.length > 0) {
            var childPageCount = page.child_pages.length;
            for (var i = 0; i < childPageCount; i++) {
                var childPage = page.child_pages[i];
                var childPageObject = this.buildChildPage(childPage, uriComponents);
                if (!childPageObject) {
                    Util_1.Util.error('Could not build child page!');
                    return false;
                }
                childPages[childPage.name] = childPageObject;
                if (childPage.show_in_menu) {
                }
            }
        }
        var childDirectories = [];
        if (page.child_directories && page.child_directories.length > 0) {
            var childDirectoryCount = page.child_directories.length;
            for (var i = 0; i < childDirectoryCount; i++) {
                var childDirectory = page.child_directories[i];
                var childDirectoryObject = this.buildChildDirectory(childDirectory, uriComponents);
                if (childDirectoryObject === undefined) {
                    Util_1.Util.error('Could not build child directory!');
                    return false;
                }
                childDirectories[childDirectory.name] = childDirectoryObject;
            }
        }
        var pageContent = ContentParser_1.ContentParser.parseFile(path.join(this.contentPath, page.content));
        var pugFunction = this.compilePug(path.join(this.templatesPath, page.template));
        var blitzLocals = {
            menu: menu,
            url: this.getUrl(uriComponents),
        };
        var locals = objectAssign({}, this.config.globals, pageContent, childPages, childDirectories, blitzLocals);
        if (!Util_1.Util.writeFileFromArray(this.buildPath, fileArray, pugFunction(locals))) {
            Util_1.Util.error('Could not write root page to file!');
            return false;
        }
        return true;
    };
    SiteBuilder.prototype.buildChildPage = function (pageConfig, currentFileArray) {
        return {
            url: '/test',
        };
    };
    SiteBuilder.prototype.buildChildDirectory = function (directoryConfig, currentFileArray) {
        return [];
    };
    SiteBuilder.prototype.getUrl = function (uriComponents) {
        var url = uriComponents.join('/');
        if (this.config.absolute_urls) {
            url = '/' + this.config.site_root + '/' + url;
        }
        else {
            url = './' + url;
        }
        if (this.config.explicit_html_extensions) {
            url = url + '.html';
        }
        else {
            url = url + '/';
        }
        return url;
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
