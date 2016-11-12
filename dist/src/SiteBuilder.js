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
        this.menus = {};
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
        this.prepareMap();
        console.log(JSON.stringify(this.siteMap));
    };
    SiteBuilder.prototype.prepareMap = function () {
        var pages = this.config.pages;
        var pageCount = pages.length;
        var map = {
            directories: {},
            files: {},
        };
        for (var i = 0; i < pageCount; i++) {
            var pageData = this.parseConfigPage(pages[i], map);
            if (pageData === undefined) {
                Util_1.Util.error('Could not create map, failed on page with URI `' + pageData.url + '`!');
                return;
            }
        }
        this.siteMap = map;
    };
    SiteBuilder.prototype.parseConfigPage = function (page, parentDirectory, parentUriComponents, parent) {
        if (parentUriComponents === void 0) { parentUriComponents = []; }
        var uriComponents;
        if (page.uri === undefined) {
            uriComponents = [Util_1.Util.extractFileName(page.content)];
        }
        else {
            uriComponents = Util_1.Util.getUriComponents(page.uri);
        }
        uriComponents = parentUriComponents.slice(0).concat(uriComponents);
        var fileArray = this.generateFileArray(uriComponents);
        var fileName = fileArray[fileArray.length - 1];
        var fileNameWithoutExtension = Util_1.Util.extractFileName(fileName);
        var directoryArray = fileArray.slice(0, fileArray.length - 1);
        var pageUrl = this.generateUrl(fileArray, []);
        var currentDirectory = parentDirectory;
        var directoryCount = directoryArray.length;
        for (var k = 0; k < directoryCount; k++) {
            var newDirectory = directoryArray[k];
            if (currentDirectory.directories[newDirectory] === undefined) {
                currentDirectory.directories[newDirectory] = {
                    directories: {},
                    files: {},
                };
            }
            currentDirectory = currentDirectory.directories[newDirectory];
        }
        var pageContent = page.content;
        if (typeof page.content === 'string') {
            pageContent = ContentParser_1.ContentParser.parseFile(path.join(this.contentPath, page.content));
        }
        var pugFunction = this.compilePug(path.join(this.templatesPath, page.template));
        if (pageContent === undefined || pugFunction === undefined) {
            Util_1.Util.error('Could not extract content and compile Pug!');
            return undefined;
        }
        var processedPageData = objectAssign({}, pageContent, { url: pageUrl });
        var blitzData = {
            parent: parent,
        };
        if (page.child_pages && page.child_pages.length > 0) {
            var pageCount = page.child_pages.length;
            for (var i = 0; i < pageCount; i++) {
                var childPage = page.child_pages[i];
                var childData = this.parseConfigPage(childPage, currentDirectory, uriComponents, processedPageData);
                if (childData === undefined) {
                    Util_1.Util.error('Failed parsing child page!');
                    return undefined;
                }
                blitzData[childPage.name] = childData;
            }
        }
        if (page.child_directories && page.child_directories.length > 0) {
            var childDirectoryCount = page.child_directories.length;
            for (var i = 0; i < childDirectoryCount; i++) {
                var childDirectory = page.child_directories[i];
                var childData = this.parseConfigDirectory(childDirectory, currentDirectory, uriComponents, processedPageData);
                if (childData === undefined) {
                    Util_1.Util.error('Failed parsing child directory!');
                    return undefined;
                }
                blitzData[childDirectory.name] = childData;
            }
        }
        var fileData = {
            name: fileName,
            url: pageUrl,
            contentData: pageContent,
            blitzData: blitzData,
            generator: pugFunction,
        };
        currentDirectory.files[fileData.name] = fileData;
        if (pageContent.menus) {
            var menuCount = pageContent.menus.length;
            for (var k = 0; k < menuCount; k++) {
                var menu = pageContent.menus[k];
                var menuTitle = fileNameWithoutExtension;
                if (pageContent.menu_title) {
                    menuTitle = pageContent.menu_title;
                }
                else if (menu.title) {
                    menuTitle = menu.title;
                }
                else if (pageContent.title) {
                    menuTitle = pageContent.title;
                }
                if (this.menus[menu.name] === undefined) {
                    this.menus[menu.name] = [];
                }
                this.menus[menu.name].push({
                    title: menuTitle,
                    url: pageUrl,
                    active: false,
                });
            }
        }
        return processedPageData;
    };
    SiteBuilder.prototype.parseConfigDirectory = function (directory, parentDirectory, parentUriComponents, parent) {
        if (parentUriComponents === void 0) { parentUriComponents = []; }
        var uriComponents;
        if (directory.uri === undefined) {
            uriComponents = [Util_1.Util.getUriComponents(directory.directory).slice(-1)];
        }
        else {
            uriComponents = Util_1.Util.getUriComponents(directory.uri);
        }
        uriComponents = parentUriComponents.slice(0).concat(uriComponents);
        var directoryArray = uriComponents.slice(0);
        var currentDirectory = parentDirectory;
        var directoryCount = directoryArray.length;
        for (var k = 0; k < directoryCount; k++) {
            var newDirectory = directoryArray[k];
            if (currentDirectory.directories[newDirectory] === undefined) {
                currentDirectory.directories[newDirectory] = {
                    directories: {},
                    files: {},
                };
            }
            currentDirectory = currentDirectory.directories[newDirectory];
        }
        var pagesContent = ContentParser_1.ContentParser.parseDirectory(path.join(this.contentPath, directory.directory));
        if (pagesContent === undefined) {
            Util_1.Util.error('Could not extract content from directory!');
            return undefined;
        }
        var processedPages = [];
        var pageContentCount = pagesContent.length;
        for (var i = 0; i < pageContentCount; i++) {
            var pageContent = pagesContent[i];
            var pageUri = '/' + Util_1.Util.extractFileName(pageContent.file);
            if (directory.uri_key !== undefined && pageContent[directory.uri_key] !== undefined) {
                pageUri = '/' + pageContent[directory.uri_key];
            }
            var pageConfigData = {
                uri: pageUri,
                template: directory.template,
                content: pageContent,
            };
            var pageData = this.parseConfigPage(pageConfigData, currentDirectory, uriComponents, parent);
            if (pageData === undefined) {
                Util_1.Util.error('Could not parse config page generated for directory!');
                return undefined;
            }
            processedPages.push(pageData);
        }
        return processedPages;
    };
    SiteBuilder.prototype.generateFileArray = function (uriComponents) {
        var fileArray = uriComponents.slice(0);
        if (!this.config.explicit_html_extensions || fileArray.length === 0) {
            fileArray.push(INDEX_FILE_NAME);
        }
        else {
            var lastId = fileArray.length - 1;
            fileArray[lastId] = fileArray[lastId] + '.html';
        }
        return fileArray;
    };
    SiteBuilder.prototype.generateUrl = function (targetFileArray, currentDirectoryArray) {
        var urlArray = targetFileArray.slice(0);
        var targetDirectoryArray = targetFileArray.slice(0, targetFileArray.length - 1);
        var fileName = targetFileArray.slice(-1)[0];
        if (!this.config.explicit_html_extensions) {
            var lastId = targetFileArray.length - 1;
            if (targetFileArray[lastId] === INDEX_FILE_NAME) {
                urlArray.pop();
            }
        }
        if (this.config.absolute_urls) {
            var absoluteUrl = '';
            if (this.config.site_root !== undefined && this.config.site_root !== '') {
                absoluteUrl = '/' + Util_1.Util.stripSlashes(this.config.site_root);
            }
            if (urlArray.length > 0) {
                absoluteUrl = absoluteUrl + '/' + urlArray.join('/');
            }
            if (absoluteUrl === '') {
                absoluteUrl = '/';
            }
            return absoluteUrl;
        }
        else {
            var relativeUrl = '';
            var differentRoot = false;
            var targetLength = targetDirectoryArray.length;
            var currentLength = currentDirectoryArray.length;
            for (var i = 0; i < Math.max(targetLength, currentLength); i++) {
                if (i >= targetLength) {
                    if (relativeUrl !== '') {
                        relativeUrl = '/' + relativeUrl;
                    }
                    relativeUrl = '..' + relativeUrl;
                }
                else if (i >= currentLength) {
                    if (relativeUrl !== '') {
                        relativeUrl = relativeUrl + '/';
                    }
                    relativeUrl = relativeUrl + targetDirectoryArray[i];
                }
                else {
                    if (targetDirectoryArray[i] !== currentDirectoryArray[i] || differentRoot) {
                        differentRoot = true;
                        if (relativeUrl !== '') {
                            relativeUrl = relativeUrl + '/';
                        }
                        relativeUrl = relativeUrl + targetDirectoryArray[i];
                        if (relativeUrl !== '') {
                            relativeUrl = '/' + relativeUrl;
                        }
                        relativeUrl = '..' + relativeUrl;
                    }
                }
            }
            if (this.config.explicit_html_extensions || fileName !== INDEX_FILE_NAME) {
                if (relativeUrl !== '') {
                    relativeUrl = relativeUrl + '/';
                }
                relativeUrl = relativeUrl + fileName;
            }
            return './' + relativeUrl;
        }
    };
    SiteBuilder.prototype.compilePug = function (path) {
        if (!this.pugCache[path]) {
            try {
                this.pugCache[path] = pug.compileFile(path);
            }
            catch (e) {
                Util_1.Util.error('Error compiling `' + path + '`!');
                Util_1.Util.stackTrace(e);
                return undefined;
            }
        }
        return this.pugCache[path];
    };
    return SiteBuilder;
}());
exports.SiteBuilder = SiteBuilder;
