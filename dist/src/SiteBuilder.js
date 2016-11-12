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
            if (this.buildPage(page) === undefined) {
                Util_1.Util.error('Failed to build a root page!');
                Util_1.Util.error('Aborting build process!');
                return undefined;
            }
        }
    };
    SiteBuilder.prototype.buildPage = function (page, currentUriComponents, isRoot) {
        if (currentUriComponents === void 0) { currentUriComponents = []; }
        if (isRoot === void 0) { isRoot = true; }
        var uriComponents = currentUriComponents.concat(Util_1.Util.getUriComponents(page.uri));
        var fileArray;
        if (uriComponents.length > 0) {
            fileArray = uriComponents.slice(0);
            if (this.config.explicit_html_extensions) {
                var lastId = fileArray.length - 1;
                fileArray[lastId] = (fileArray[lastId] === '' ? 'index ' : fileArray[lastId]) + '.html';
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
                var childPageObject = this.buildPage(childPage, uriComponents, false);
                if (!childPageObject) {
                    Util_1.Util.error('Could not build child page!');
                    return undefined;
                }
                childPages[childPage.name] = childPageObject;
                if (childPage.show_in_menu !== false) {
                    var menuButtonText_1 = childPage.name;
                    if (childPageObject.menu_button) {
                        menuButtonText_1 = childPageObject.menu_button;
                    }
                    else if (childPageObject.title) {
                        menuButtonText_1 = childPageObject.title;
                    }
                    menu.push({
                        title: menuButtonText_1,
                        url: childPageObject.url,
                    });
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
                    return undefined;
                }
                childDirectories[childDirectory.name] = childDirectoryObject;
            }
        }
        var pageContent = ContentParser_1.ContentParser.parseFile(path.join(this.contentPath, page.content));
        var menuButtonText = isRoot ? 'Index' : page.name;
        if (pageContent.menu_button) {
            menuButtonText = pageContent.menu_button;
        }
        else if (pageContent.title) {
            menuButtonText = pageContent.title;
        }
        var pageUrl = this.getUrl(uriComponents);
        menu.unshift({
            title: menuButtonText,
            url: pageUrl,
        });
        var pugFunction = this.compilePug(path.join(this.templatesPath, page.template));
        var blitzLocals = {
            menu: menu,
            url: pageUrl,
        };
        var locals = objectAssign({}, this.config.globals, pageContent, childPages, childDirectories, blitzLocals);
        if (!Util_1.Util.writeFileFromArray(this.buildPath, fileArray, pugFunction(locals))) {
            Util_1.Util.error('Could not write root page to file!');
            return undefined;
        }
        return objectAssign({}, pageContent, { url: pageUrl });
    };
    SiteBuilder.prototype.buildChildDirectory = function (directoryConfig, currentFileArray) {
        return [];
    };
    SiteBuilder.prototype.getUrl = function (uriComponents) {
        var empty = uriComponents.length < 1;
        var url = Util_1.Util.stripSlashes(uriComponents.join('/'));
        if (this.config.absolute_urls) {
            if (!this.config.site_root || this.config.site_root === '') {
                url = '/' + url;
            }
            else {
                url = '/' + this.config.site_root + '/' + url;
            }
        }
        else {
            url = './' + url;
        }
        if (this.config.explicit_html_extensions) {
            url = url + (empty ? 'index' : '') + '.html';
        }
        else {
            url = url + (empty ? '' : '/');
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
