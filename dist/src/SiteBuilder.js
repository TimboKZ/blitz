"use strict";
var path = require('path');
var pug = require('pug');
var objectAssign = require('object-assign');
var fse = require('fs-extra');
var ContentParser_1 = require('./ContentParser');
var Util_1 = require('./Util');
var blitz_1 = require('./blitz');
var ASSETS_DIRECTORY = 'assets';
var BUILD_ASSETS_DIRECTORY = 'assets';
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
        this.buildHash = Util_1.Util.generateRandomString(12);
    }
    SiteBuilder.prototype.build = function () {
        if (!Util_1.Util.removeDirectory(this.buildPath)) {
            Util_1.Util.error('Could not remove the existing build directory (or check that it exists)!');
            return undefined;
        }
        if (!Util_1.Util.createDirectory(this.buildPath)) {
            Util_1.Util.error('Could not create the directory for the build!');
            return undefined;
        }
        try {
            fse.copySync(this.assetsPath, path.join(this.buildPath, BUILD_ASSETS_DIRECTORY));
        }
        catch (err) {
            Util_1.Util.error('Could not copy assets into the build folder!');
            return undefined;
        }
        Util_1.Util.debug('Generating site map . . . ');
        if (!this.prepareMap()) {
            Util_1.Util.error('Map generation failed!');
            return undefined;
        }
        Util_1.Util.debug('Site map generated!');
        if (blitz_1.args.map) {
            Util_1.Util.log(JSON.stringify(this.siteMap));
        }
        Util_1.Util.debug('Building site . . . ');
        if (!this.buildSite()) {
            Util_1.Util.error('Site building failed!');
            return undefined;
        }
        Util_1.Util.log('Site built successfully!');
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
                return false;
            }
        }
        this.siteMap = map;
        return true;
    };
    SiteBuilder.prototype.buildSite = function () {
        return this.buildDirectory(this.siteMap);
    };
    SiteBuilder.prototype.buildDirectory = function (directory, currentDirectoryArray) {
        if (currentDirectoryArray === void 0) { currentDirectoryArray = []; }
        for (var fileName in directory.files) {
            if (directory.files.hasOwnProperty(fileName)) {
                var file = directory.files[fileName];
                var fileArray = currentDirectoryArray.slice(0).concat([file.name]);
                var processedMenus = {};
                for (var menuName in this.menus) {
                    if (this.menus.hasOwnProperty(menuName)) {
                        var menu = this.menus[menuName];
                        var itemCount = menu.length;
                        var processedMenu = [];
                        for (var i = 0; i < itemCount; i++) {
                            var item = menu[i];
                            var url = item.url();
                            if (item.directoryArray !== undefined) {
                                var array = item.directoryArray;
                                if (item.fileName !== undefined) {
                                    array = array.concat([item.fileName]);
                                }
                                url = this.generateUrl(array, currentDirectoryArray);
                            }
                            var active = file.url() === item.url();
                            processedMenu.push({
                                title: item.title,
                                url: url,
                                active: active,
                            });
                        }
                        processedMenus[menuName] = processedMenu;
                    }
                }
                for (var dataKey in file.blitzData) {
                    if (file.blitzData.hasOwnProperty(dataKey)) {
                        if (dataKey === 'url') {
                            file.blitzData[dataKey] = file.blitzData[dataKey](currentDirectoryArray);
                        }
                        var dataValue = file.blitzData[dataKey];
                        if (Object.prototype.toString.call(dataValue) === '[object Array]') {
                            var dataLength = dataValue.length;
                            for (var i = 0; i < dataLength; i++) {
                                if (dataValue[i].url !== undefined && typeof dataValue[i].url === 'function') {
                                    file.blitzData[dataKey][i].url
                                        = file.blitzData[dataKey][i].url(currentDirectoryArray);
                                }
                            }
                        }
                        else if (Object.prototype.toString.call(dataValue) === '[object Object]') {
                            if (dataValue.url !== undefined && typeof dataValue.url === 'function') {
                                file.blitzData[dataKey].url = file.blitzData[dataKey].url(currentDirectoryArray);
                            }
                        }
                    }
                }
                var locals = objectAssign({}, this.config.globals, file.contentData, file.blitzData, {
                    hash: this.buildHash,
                    menus: processedMenus,
                    asset: this.generateAssetUrl.bind(this, currentDirectoryArray),
                    site_url: this.config.site_url,
                    site_root: this.config.site_root,
                });
                if (!Util_1.Util.writeFileFromArray(this.buildPath, fileArray, file.generator(locals))) {
                    Util_1.Util.error('Could not write file from array!');
                    return false;
                }
            }
        }
        for (var directoryName in directory.directories) {
            if (directory.directories.hasOwnProperty(directoryName)) {
                var directoryData = directory.directories[directoryName];
                var directoryArray = currentDirectoryArray.slice(0).concat([directoryName]);
                var directoryPath = path.join.apply(undefined, directoryArray);
                if (!Util_1.Util.createDirectory(path.join(this.buildPath, directoryPath))) {
                    Util_1.Util.error('Could not create directory for the build!');
                    return false;
                }
                this.buildDirectory(directoryData, directoryArray);
            }
        }
        return true;
    };
    SiteBuilder.prototype.parseConfigPage = function (page, parentDirectory, parentUriComponents, parent) {
        if (parentUriComponents === void 0) { parentUriComponents = []; }
        var ownUriComponents;
        if (page.uri === undefined) {
            ownUriComponents = [Util_1.Util.extractFileName(page.content)];
        }
        else {
            ownUriComponents = Util_1.Util.getUriComponents(page.uri);
        }
        var partialFileArray = this.generateFileArray(ownUriComponents);
        var partialDirectoryArray = partialFileArray.slice(0, partialFileArray.length - 1);
        var fullUriComponents = parentUriComponents.slice(0).concat(ownUriComponents);
        var fileArray = this.generateFileArray(fullUriComponents);
        var directoryArray = fileArray.slice(0, fileArray.length - 1);
        var fileName = fileArray[fileArray.length - 1];
        var fileNameWithoutExtension = Util_1.Util.extractFileName(fileName);
        var urlGenerator = this.getUrlGenerator(fileArray);
        var currentPageDirectory = this.descendToDirectory(parentDirectory, partialDirectoryArray);
        var childrenDirectory = this.descendToDirectory(parentDirectory, ownUriComponents);
        var pageContent = page.content;
        if (typeof page.content === 'string') {
            pageContent = ContentParser_1.ContentParser.parseFile(path.join(this.contentPath, page.content));
        }
        var pugFunction = this.compilePug(path.join(this.templatesPath, page.template));
        if (pageContent === undefined || pugFunction === undefined) {
            Util_1.Util.error('Could not extract content and compile Pug!');
            return undefined;
        }
        var processedPageData = objectAssign({}, pageContent, { url: urlGenerator });
        var blitzData = {
            url: urlGenerator,
            parent: parent,
        };
        if (page.child_pages && page.child_pages.length > 0) {
            var pageCount = page.child_pages.length;
            for (var i = 0; i < pageCount; i++) {
                var childPage = page.child_pages[i];
                var childData = this.parseConfigPage(childPage, childrenDirectory, fullUriComponents, processedPageData);
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
                var childData = this.parseConfigDirectory(childDirectory, childrenDirectory, fullUriComponents, processedPageData);
                if (childData === undefined) {
                    Util_1.Util.error('Failed parsing child directory!');
                    return undefined;
                }
                blitzData[childDirectory.name] = childData;
            }
        }
        var fileData = {
            name: fileName,
            url: urlGenerator,
            contentData: pageContent,
            blitzData: blitzData,
            generator: pugFunction,
        };
        currentPageDirectory.files[fileData.name] = fileData;
        if (page.menus) {
            var menuCount = page.menus.length;
            for (var k = 0; k < menuCount; k++) {
                var menu = page.menus[k];
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
                var menuItem = {
                    title: menuTitle,
                    url: urlGenerator,
                    active: false,
                };
                if (!this.config.absolute_urls) {
                    menuItem.directoryArray = directoryArray;
                    if (this.config.explicit_html_extensions || fileName !== INDEX_FILE_NAME) {
                        menuItem.fileName = fileName;
                    }
                }
                this.menus[menu.name].push(menuItem);
            }
        }
        return processedPageData;
    };
    SiteBuilder.prototype.parseConfigDirectory = function (directory, parentDirectory, parentUriComponents, parent) {
        if (parentUriComponents === void 0) { parentUriComponents = []; }
        var ownUriComponents;
        if (directory.uri === undefined) {
            ownUriComponents = [Util_1.Util.getUriComponents(directory.directory).slice(-1)];
        }
        else {
            ownUriComponents = Util_1.Util.getUriComponents(directory.uri);
        }
        var fullUriComponents = parentUriComponents.slice(0).concat(ownUriComponents);
        var childrenDirectory = this.descendToDirectory(parentDirectory, ownUriComponents);
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
            var pageData = this.parseConfigPage(pageConfigData, childrenDirectory, fullUriComponents, parent);
            if (pageData === undefined) {
                Util_1.Util.error('Could not parse config page generated for directory!');
                return undefined;
            }
            processedPages.push(pageData);
        }
        return processedPages;
    };
    SiteBuilder.prototype.descendToDirectory = function (directory, directoryArray) {
        var currentDirectory = directory;
        var directoryCount = directoryArray.length;
        for (var i = 0; i < directoryCount; i++) {
            var newDirectory = directoryArray[i];
            if (currentDirectory.directories[newDirectory] === undefined) {
                currentDirectory.directories[newDirectory] = {
                    directories: {},
                    files: {},
                };
            }
            currentDirectory = currentDirectory.directories[newDirectory];
        }
        return currentDirectory;
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
    SiteBuilder.prototype.generateAssetUrl = function (currentDirectoryArray, assetFileArray) {
        return this.generateUrl(['assets'].concat(assetFileArray), currentDirectoryArray);
    };
    SiteBuilder.prototype.getUrlGenerator = function (targetFileArray) {
        return this.generateUrl.bind(this, targetFileArray);
    };
    SiteBuilder.prototype.generateUrl = function (targetFileArray, currentDirectoryArray) {
        if (currentDirectoryArray === void 0) { currentDirectoryArray = []; }
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
            if ((this.config.explicit_html_extensions || fileName !== INDEX_FILE_NAME)
                && targetFileArray.length !== 0) {
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
