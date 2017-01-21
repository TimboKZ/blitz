"use strict";
var path = require("path");
var pug = require("pug");
var objectAssign = require("object-assign");
var fse = require("fs-extra");
var ContentParser_1 = require("./ContentParser");
var Util_1 = require("./helpers/Util");
var ASSETS_DIRECTORY = 'assets';
var BUILD_ASSETS_DIRECTORY = 'assets';
var CONTENT_DIRECTORY = 'content';
var TEMPLATES_DIRECTORY = 'templates';
var INDEX_FILE_NAME = 'index.html';
var SiteBuilder = (function () {
    function SiteBuilder(config, projectPath, buildDirectory) {
        this.pageUrls = {};
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
        if (Util_1.Util.pathExists(this.assetsPath)) {
            try {
                fse.copySync(this.assetsPath, path.join(this.buildPath, BUILD_ASSETS_DIRECTORY));
            }
            catch (err) {
                Util_1.Util.error('Could not copy assets into the build folder!');
                return undefined;
            }
        }
        else {
            Util_1.Util.debug('Assets folder does not exist, not copying any assets.');
        }
        Util_1.Util.debug('Generating site map . . . ');
        if (!this.prepareMap()) {
            Util_1.Util.error('Map generation failed!');
            return undefined;
        }
        Util_1.Util.debug('Site map generated!');
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
        var _loop_1 = function (fileName) {
            if (directory.files.hasOwnProperty(fileName)) {
                var file = directory.files[fileName];
                var fileArray = currentDirectoryArray.slice(0).concat([file.name]);
                var pageUrl_1 = this_1.generateUrl(fileArray, currentDirectoryArray);
                var processedMenus = {};
                for (var menuName in this_1.menus) {
                    if (this_1.menus.hasOwnProperty(menuName)) {
                        var menu = this_1.menus[menuName];
                        var itemCount = menu.length;
                        var processedMenu = [];
                        for (var i = 0; i < itemCount; i++) {
                            var item = menu[i];
                            var url_1 = item.url();
                            if (item.directoryArray !== undefined) {
                                var array = item.directoryArray;
                                if (item.fileName !== undefined) {
                                    array = array.concat([item.fileName]);
                                }
                                url_1 = this_1.generateUrl(array, currentDirectoryArray);
                            }
                            var active = file.url() === item.url();
                            processedMenu.push({
                                title: item.title,
                                url: url_1,
                                active: active,
                            });
                        }
                        processedMenus[menuName] = processedMenu;
                    }
                }
                var childPages = [];
                var namedChildPages = {};
                var childDirectories = [];
                var namedChildDirectories = {};
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
                            if (dataKey !== 'parent') {
                                childDirectories.push(file.blitzData[dataKey]);
                                namedChildDirectories[dataKey] = file.blitzData[dataKey];
                            }
                        }
                        else if (Object.prototype.toString.call(dataValue) === '[object Object]') {
                            if (dataValue.url !== undefined && typeof dataValue.url === 'function') {
                                file.blitzData[dataKey].url = file.blitzData[dataKey].url(currentDirectoryArray);
                            }
                            if (dataKey !== 'parent') {
                                childPages.push(file.blitzData[dataKey]);
                                namedChildPages[dataKey] = file.blitzData[dataKey];
                            }
                        }
                    }
                }
                var indexArray = [];
                if (this_1.config.explicit_html_extensions) {
                    indexArray.push('index.html');
                }
                var processedPageUrls_1 = {
                    index: this_1.generateUrl(indexArray, currentDirectoryArray),
                };
                for (var pageID in this_1.pageUrls) {
                    if (this_1.pageUrls.hasOwnProperty(pageID)) {
                        processedPageUrls_1[pageID] = this_1.pageUrls[pageID](currentDirectoryArray);
                    }
                }
                var url = function (pageID) {
                    if (pageID === undefined) {
                        return pageUrl_1;
                    }
                    return processedPageUrls_1[pageID];
                };
                var assetUrlGenerator_1 = this_1.generateAssetUrl.bind(this_1, currentDirectoryArray);
                file.contentData.content = file.contentData.content.replace(/%%asset%%.*?%%/g, function (match) {
                    var strippedString = match.replace(/^%%asset%%/, '').replace(/%%$/, '');
                    return assetUrlGenerator_1(strippedString);
                });
                var locals = objectAssign({}, this_1.config.globals, file.contentData, file.blitzData, {
                    url: url,
                    child_pages: childPages,
                    child_directories: childDirectories,
                    named_child_pages: namedChildPages,
                    named_child_directories: namedChildDirectories,
                    hash: this_1.buildHash,
                    menus: processedMenus,
                    asset: assetUrlGenerator_1,
                    site_url: this_1.config.site_url,
                    site_root: this_1.config.site_root,
                });
                if (!Util_1.Util.writeFileFromArray(this_1.buildPath, fileArray, file.generator(locals))) {
                    Util_1.Util.error('Could not write file from array!');
                    return { value: false };
                }
            }
        };
        var this_1 = this;
        for (var fileName in directory.files) {
            var state_1 = _loop_1(fileName);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        for (var directoryName in directory.directories) {
            if (directory.directories.hasOwnProperty(directoryName)) {
                var directoryData = directory.directories[directoryName];
                if (Util_1.Util.isEmpty(directoryData.files) && Util_1.Util.isEmpty(directoryData.directories)) {
                    continue;
                }
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
            var fileNameSource = void 0;
            if (page.content === undefined) {
                fileNameSource = page.template;
            }
            else {
                fileNameSource = page.content;
            }
            ownUriComponents = [Util_1.Util.extractFileName(fileNameSource)];
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
        if (pageContent === undefined) {
            pageContent = {};
        }
        else if (typeof page.content === 'string') {
            pageContent = ContentParser_1.ContentParser.parseFile(path.join(this.contentPath, page.content));
        }
        var pugFunction = this.compilePug(path.join(this.templatesPath, page.template));
        if (pageContent === undefined || pugFunction === undefined) {
            Util_1.Util.error('Could not extract content and compile Pug!');
            return undefined;
        }
        var processedPageData = objectAssign({}, pageContent, { url: urlGenerator });
        if (page.id) {
            this.pageUrls[page.id] = urlGenerator;
        }
        var blitzData = {
            url: urlGenerator,
            parent: parent,
        };
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
        return processedPageData;
    };
    SiteBuilder.prototype.parseConfigDirectory = function (directory, parentDirectory, parentUriComponents, parent) {
        if (parentUriComponents === void 0) { parentUriComponents = []; }
        var pagesContent = ContentParser_1.ContentParser.parseDirectory(path.join(this.contentPath, directory.directory));
        if (pagesContent === undefined) {
            Util_1.Util.error('Could not extract content from directory!');
            return undefined;
        }
        var processedPages = [];
        if (directory.template === undefined) {
            var pageContentCount = pagesContent.length;
            var urlGenerator = function (currentDirectoryArray) { return undefined; };
            for (var i = 0; i < pageContentCount; i++) {
                var pageContent = pagesContent[i];
                var processedPageData = objectAssign({}, pageContent, { url: urlGenerator });
                processedPages.push(processedPageData);
            }
        }
        else {
            var ownUriComponents = void 0;
            if (directory.uri === undefined) {
                ownUriComponents = [Util_1.Util.getUriComponents(directory.directory).slice(-1)];
            }
            else {
                ownUriComponents = Util_1.Util.getUriComponents(directory.uri);
            }
            var fullUriComponents = parentUriComponents.slice(0).concat(ownUriComponents);
            var childrenDirectory = this.descendToDirectory(parentDirectory, ownUriComponents);
            var pageContentCount = pagesContent.length;
            for (var i = 0; i < pageContentCount; i++) {
                var pageData = void 0;
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
                pageData = this.parseConfigPage(pageConfigData, childrenDirectory, fullUriComponents, parent);
                if (pageData === undefined) {
                    Util_1.Util.error('Could not parse config page generated for directory!');
                    return undefined;
                }
                processedPages.push(pageData);
            }
            if (directory.menus) {
                var menuCount = directory.menus.length;
                for (var k = 0; k < menuCount; k++) {
                    var menu = directory.menus[k];
                    var pageCount = processedPages.length;
                    for (var j = 0; j < pageCount; j++) {
                        var pageContent = processedPages[j];
                        var menuTitle = Util_1.Util.extractFileName(pageContent.file);
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
                            url: pageContent.url,
                            active: false,
                        };
                        if (!this.config.absolute_urls) {
                            menuItem.directoryArray = fullUriComponents.slice(0);
                            var fileName = void 0;
                            if (this.config.explicit_html_extensions) {
                                fileName = Util_1.Util.extractFileName(pageContent.file) + '.html';
                            }
                            else {
                                menuItem.directoryArray.push(Util_1.Util.extractFileName(pageContent.file));
                                fileName = 'index.html';
                            }
                            if (this.config.explicit_html_extensions || fileName !== INDEX_FILE_NAME) {
                                menuItem.fileName = fileName;
                            }
                        }
                        if (this.menus[menu.name] === undefined) {
                            this.menus[menu.name] = [];
                        }
                        this.menus[menu.name].push(menuItem);
                    }
                }
            }
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
            if (this.config.site_url !== undefined && this.config.site_url !== '') {
                absoluteUrl = this.config.site_url + absoluteUrl;
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
            this.pugCache[path] = pug.compileFile(path);
        }
        return this.pugCache[path];
    };
    return SiteBuilder;
}());
exports.SiteBuilder = SiteBuilder;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QkMsSUFBQTtBQS9yQlksa0NBQVciLCJmaWxlIjoic3JjL1NpdGVCdWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBGaWxlIHJlc3BvbnNpYmxlIGZvciBhbGwgaW50ZXJmYWNlcywgY29uc3RhbnRzIGFuZCBjbGFzc2VzIHJlbGF0ZWQgdG8gZ2VuZXJhdGluZyBvZiB0aGUgc3RhdGljIHNpdGVcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBwdWcgZnJvbSAncHVnJztcbmltcG9ydCAqIGFzIG9iamVjdEFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcbmltcG9ydCAqIGFzIGZzZSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQge0lCbGl0ekNvbmZpZywgSUJsaXR6Q2hpbGREaXJlY3RvcnksIElCbGl0elBhZ2V9IGZyb20gJy4vQ29uZmlnUGFyc2VyJztcbmltcG9ydCB7Q29udGVudFBhcnNlcn0gZnJvbSAnLi9Db250ZW50UGFyc2VyJztcbmltcG9ydCB7VXRpbH0gZnJvbSAnLi9oZWxwZXJzL1V0aWwnO1xuXG4vKipcbiAqIENvbnN0YW50cyBpbmRpY2F0aW5nIHRoZSBsb2NhdGlvbnMgb2YgYXNzZXRzLCBjb250ZW50IGFuZCB0ZW1wbGF0ZXNcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5jb25zdCBBU1NFVFNfRElSRUNUT1JZID0gJ2Fzc2V0cyc7XG5jb25zdCBCVUlMRF9BU1NFVFNfRElSRUNUT1JZID0gJ2Fzc2V0cyc7XG5jb25zdCBDT05URU5UX0RJUkVDVE9SWSA9ICdjb250ZW50JztcbmNvbnN0IFRFTVBMQVRFU19ESVJFQ1RPUlkgPSAndGVtcGxhdGVzJztcblxuLyoqXG4gKiBJbmRleCBmaWxlIG5hbWUgaW4gY2FzZSBzb21lb25lIHVzZXMgYSB2YWx1ZSBvdGhlciB0aGFuIGBpbmRleC5odG1sYFxuICogQHNpbmNlIDAuMC4xXG4gKi9cbmNvbnN0IElOREVYX0ZJTEVfTkFNRSA9ICdpbmRleC5odG1sJztcblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIEJsaXR6IGZpbGUgb2YgdGhlIHN0YXRpYyBzaXRlLCBhcyBzZWVuIGluIHRoZSBtYXBcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5pbnRlcmZhY2UgSUJsaXR6TWFwRmlsZSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHVybDogKGN1cnJlbnREaXJlY3RvcnlBcnJheT86IHN0cmluZ1tdKSA9PiBzdHJpbmc7XG4gICAgY29udGVudERhdGE6IGFueTtcbiAgICBibGl0ekRhdGE6IGFueTtcbiAgICBnZW5lcmF0b3I6IChsb2NhbHM/OiBhbnkpID0+IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIEJsaXR6IGRpcmVjdG9yeSBvZiB0aGUgc3RhdGljIHNpdGUsIGFzIHNlZW4gaW4gdGhlIG1hcFxuICogQHNpbmNlIDAuMC4xXG4gKi9cbmludGVyZmFjZSBJQmxpdHpNYXBEaXJlY3Rvcnkge1xuICAgIGRpcmVjdG9yaWVzPzoge1xuICAgICAgICBbbmFtZTogc3RyaW5nXTogSUJsaXR6TWFwRGlyZWN0b3J5O1xuICAgIH07XG4gICAgZmlsZXM/OiB7XG4gICAgICAgIFtuYW1lOiBzdHJpbmddOiBJQmxpdHpNYXBGaWxlO1xuICAgIH07XG59XG5cbi8qKlxuICogSW50ZXJmYWNlcyBmb3IgbWVudXMgYmVmb3JlIHByb2Nlc3NpbmdcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5pbnRlcmZhY2UgSUJsaXR6TWFwTWVudUl0ZW0ge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgdXJsOiAoY3VycmVudERpcmVjdG9yeUFycmF5Pzogc3RyaW5nW10pID0+IHN0cmluZztcbiAgICBmaWxlTmFtZT86IHN0cmluZztcbiAgICBkaXJlY3RvcnlBcnJheT86IHN0cmluZ1tdO1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbn1cbmludGVyZmFjZSBJQmxpdHpNYXBNZW51cyB7XG4gICAgW25hbWU6IHN0cmluZ106IElCbGl0ek1hcE1lbnVJdGVtW107XG59XG5cbi8qKlxuICogUGFnZSBtZW51IGludGVyZmFjZVxuICogQHNpbmNlIDAuMC4xXG4gKi9cbmludGVyZmFjZSBJQmxpdHpQYWdlTWVudUl0ZW0ge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgYWN0aXZlOiBib29sZWFuO1xufVxuaW50ZXJmYWNlIElCbGl0elBhZ2VNZW51cyB7XG4gICAgW25hbWU6IHN0cmluZ106IElCbGl0elBhZ2VNZW51SXRlbVtdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgVVJMIGdlbmVyYXRvcnMgYXNzaWduZWQgdG8gSURzXG4gKiBAc2luY2UgMC4xLjBcbiAqL1xuaW50ZXJmYWNlIElCbGl0elBhZ2VVUkxzIHtcbiAgICBbaWQ6IHN0cmluZ106IChjdXJyZW50RGlyZWN0b3J5QXJyYXk/OiBzdHJpbmdbXSkgPT4gc3RyaW5nO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgcHJvY2Vzc2VkIFVSTHMgYXNzaWduZWQgdG8gSURzXG4gKiBAc2luY2UgMC4xLjBcbiAqL1xuaW50ZXJmYWNlIElCbGl0elByb2Nlc3NlZFBhZ2VVUkxzIHtcbiAgICBbaWQ6IHN0cmluZ106IHN0cmluZztcbn1cblxuLyoqXG4gKiBQYWdlIGNvbnRlbnQgZGF0YSB3aXRoIGluc2VydGVkIFVSTFxuICogQHNpbmNlIDAuMS4yIEFkZGVkIGBmaWxlYCwgY2hhbmdlZCB0eXBlIG9mIHZhbHVlcyBmcm9tIGBzdHJpbmdgIHRvIGBhbnlgXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuaW50ZXJmYWNlIElCbGl0elByb2Nlc3NlZFBhZ2Uge1xuICAgIHVybDogKGN1cnJlbnREaXJlY3RvcnlBcnJheT86IHN0cmluZ1tdKSA9PiBzdHJpbmc7XG4gICAgZmlsZTogc3RyaW5nO1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbi8qKlxuICogUHVnIGNhY2hlIGludGVyZmFjZVxuICogQHNpbmNlIDAuMC4xXG4gKi9cbmludGVyZmFjZSBJUHVnQ2FjaGUge1xuICAgIFtwYXRoOiBzdHJpbmddOiAobG9jYWxzPzogYW55KSA9PiBzdHJpbmc7XG59XG5cbi8qKlxuICogQGNsYXNzIEEgY2xhc3MuXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuZXhwb3J0IGNsYXNzIFNpdGVCdWlsZGVyIHtcbiAgICAvKipcbiAgICAgKiBMb2FkZWQgQmxpdHogY29uZmlnXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb25maWc6IElCbGl0ekNvbmZpZztcblxuICAgIC8qKlxuICAgICAqIFJvb3QgZGlyZWN0b3J5IG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcm9qZWN0UGF0aDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRGlyZWN0b3J5IGluIHdoaWNoIHRoZSBuZXdseSBnZW5lcmF0ZWQgZmlsZXMgd2lsbCBiZSBwbGFjZWRcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1aWxkUGF0aDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQWJzb2x1dGUgcGF0aHMgdG8gbG9jYXRpb25zLCBjb250ZW50IGFuZCB0ZW1wbGF0ZXMgZGlyZWN0b3JpZXNcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzc2V0c1BhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIGNvbnRlbnRQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZXNQYXRoOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSYW5kb21seSBnZW5lcmF0ZWQgaGFzaCB0aGF0IGNhbiBiZSB1c2VkIHRvIGJ5cGFzcyBicm93c2VyIGNhY2hlXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBidWlsZEhhc2g6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFNpdGUgbWFwIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGJ1aWxkIHN0YXRpYyBmaWxlcyBmb3IgdGhlIHdlYnNpdGUuIEl0IHdpbGwgYmUgZ2VuZXJhdGVkIGJlZm9yZWhhbmQuXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBzaXRlTWFwOiBJQmxpdHpNYXBEaXJlY3Rvcnk7XG5cbiAgICAvKipcbiAgICAgKiBVUkwgZ2VuZXJhdG9ycyBmb3IgcGFnZXMgd2l0aCBJRHMgc3BlY2lmaWVkXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYWdlVXJsczogSUJsaXR6UGFnZVVSTHMgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIE9iamVjdCBob2xkaW5nIGFsbCBtZW51cyBnZW5lcmF0ZWQgZnJvbSB0aGUgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBtZW51czogSUJsaXR6TWFwTWVudXMgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIENhY2hlIG9mIGNvbXBpbGVkIFB1ZyBmdW5jdGlvbnNcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIHB1Z0NhY2hlOiBJUHVnQ2FjaGUgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIFNpdGVCdWlsZGVyIGNvbnN0cnVjdG9yLlxuICAgICAqIEBzaW5jZSAwLjEuMCBOb3cgYWxzbyBnZW5lcmF0ZXMgYSByYW5kb20gc3RyaW5nIGZvciBgYnVpbGRIYXNoYFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IElCbGl0ekNvbmZpZywgcHJvamVjdFBhdGg6IHN0cmluZywgYnVpbGREaXJlY3Rvcnk6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5wcm9qZWN0UGF0aCA9IHByb2plY3RQYXRoO1xuICAgICAgICB0aGlzLmJ1aWxkUGF0aCA9IHBhdGguam9pbihwcm9qZWN0UGF0aCwgYnVpbGREaXJlY3RvcnkpO1xuICAgICAgICB0aGlzLmFzc2V0c1BhdGggPSBwYXRoLmpvaW4ocHJvamVjdFBhdGgsIEFTU0VUU19ESVJFQ1RPUlkpO1xuICAgICAgICB0aGlzLmNvbnRlbnRQYXRoID0gcGF0aC5qb2luKHByb2plY3RQYXRoLCBDT05URU5UX0RJUkVDVE9SWSk7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzUGF0aCA9IHBhdGguam9pbihwcm9qZWN0UGF0aCwgVEVNUExBVEVTX0RJUkVDVE9SWSk7XG4gICAgICAgIHRoaXMuYnVpbGRIYXNoID0gVXRpbC5nZW5lcmF0ZVJhbmRvbVN0cmluZygxMik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgdGFyZ2V0IGRpcmVjdG9yeSBpZiBpdCBkb2Vzbid0IGV4aXN0IGFuZCBiZWdpbnMgdGhlIGJ1aWxkaW5nIHByb2Nlc3NcbiAgICAgKiBAc2luY2UgMC4xLjQgTm93IGlnbm9yZXMgYXNzZXRzIGlmIGBhc3NldHNgIGZvbGRlciBkb2Vzbid0IGV4aXN0XG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHVibGljIGJ1aWxkKCkge1xuICAgICAgICBpZiAoIVV0aWwucmVtb3ZlRGlyZWN0b3J5KHRoaXMuYnVpbGRQYXRoKSkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcignQ291bGQgbm90IHJlbW92ZSB0aGUgZXhpc3RpbmcgYnVpbGQgZGlyZWN0b3J5IChvciBjaGVjayB0aGF0IGl0IGV4aXN0cykhJyk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVXRpbC5jcmVhdGVEaXJlY3RvcnkodGhpcy5idWlsZFBhdGgpKSB7XG4gICAgICAgICAgICBVdGlsLmVycm9yKCdDb3VsZCBub3QgY3JlYXRlIHRoZSBkaXJlY3RvcnkgZm9yIHRoZSBidWlsZCEnKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWwucGF0aEV4aXN0cyh0aGlzLmFzc2V0c1BhdGgpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZzZS5jb3B5U3luYyh0aGlzLmFzc2V0c1BhdGgsIHBhdGguam9pbih0aGlzLmJ1aWxkUGF0aCwgQlVJTERfQVNTRVRTX0RJUkVDVE9SWSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgVXRpbC5lcnJvcignQ291bGQgbm90IGNvcHkgYXNzZXRzIGludG8gdGhlIGJ1aWxkIGZvbGRlciEnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVXRpbC5kZWJ1ZygnQXNzZXRzIGZvbGRlciBkb2VzIG5vdCBleGlzdCwgbm90IGNvcHlpbmcgYW55IGFzc2V0cy4nKTtcbiAgICAgICAgfVxuICAgICAgICBVdGlsLmRlYnVnKCdHZW5lcmF0aW5nIHNpdGUgbWFwIC4gLiAuICcpO1xuICAgICAgICBpZiAoIXRoaXMucHJlcGFyZU1hcCgpKSB7XG4gICAgICAgICAgICBVdGlsLmVycm9yKCdNYXAgZ2VuZXJhdGlvbiBmYWlsZWQhJyk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIFV0aWwuZGVidWcoJ1NpdGUgbWFwIGdlbmVyYXRlZCEnKTtcbiAgICAgICAgVXRpbC5kZWJ1ZygnQnVpbGRpbmcgc2l0ZSAuIC4gLiAnKTtcbiAgICAgICAgaWYgKCF0aGlzLmJ1aWxkU2l0ZSgpKSB7XG4gICAgICAgICAgICBVdGlsLmVycm9yKCdTaXRlIGJ1aWxkaW5nIGZhaWxlZCEnKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgVXRpbC5sb2coJ1NpdGUgYnVpbHQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIG92ZXIgYWxsIHBhZ2VzIGFuZCBkaXJlY3RvcmllcyBzcGVjaWZpZWQgaW4gdGhlIGNvbmZpZywgZ2VuZXJhdGluZyBtZW51cywgcHJlcGFyaW5nIFB1ZyBmaWxlcywgZXRjLlxuICAgICAqXG4gICAgICogSWYgdXJpIGlzIG5vdCBzcGVjaWZpZWQsIGZpbGUgbmFtZSBmcm9tIHRoZSBgY29udGVudGAgcHJvcGVydHkgd2lsbCBiZSB1c2VkXG4gICAgICpcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIHByZXBhcmVNYXAoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBwYWdlcyA9IHRoaXMuY29uZmlnLnBhZ2VzO1xuICAgICAgICBsZXQgcGFnZUNvdW50ID0gcGFnZXMubGVuZ3RoO1xuICAgICAgICBsZXQgbWFwOiBJQmxpdHpNYXBEaXJlY3RvcnkgPSB7XG4gICAgICAgICAgICBkaXJlY3Rvcmllczoge30sXG4gICAgICAgICAgICBmaWxlczoge30sXG4gICAgICAgIH07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYWdlRGF0YSA9IHRoaXMucGFyc2VDb25maWdQYWdlKHBhZ2VzW2ldLCBtYXApO1xuICAgICAgICAgICAgaWYgKHBhZ2VEYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBVdGlsLmVycm9yKCdDb3VsZCBub3QgY3JlYXRlIG1hcCwgZmFpbGVkIG9uIHBhZ2Ugd2l0aCBVUkkgYCcgKyBwYWdlRGF0YS51cmwgKyAnYCEnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaXRlTWFwID0gbWFwO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIHNpdGUgdXNpbmcgdGhlIHByZXZpb3VzbHkgZ2VuZXJhdGVkIG1hcCBhbmQgbWVudXNcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1aWxkU2l0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGREaXJlY3RvcnkodGhpcy5zaXRlTWFwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgYWxsIGZpbGVzIGluIGEgZGlyZWN0b3J5LCByZWN1cnNpdmVseVxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBhbHNvIHByb2Nlc3NlcyBtZW51cywgdXBkYXRpbmcgcmVsYXRpdmUgbGlua3MgKGlmIGFueSkgYW5kIG1hcmtpbmcgY3VycmVudCBwYWdlIGFzIGFjdGl2ZVxuICAgICAqXG4gICAgICogQHNpbmNlIDAuMS40IE5vdyBkb2VzIG5vdCBjcmVhdGUgZGlyZWN0b3JpZXMgaWYgdGhleSBoYXZlIG5vIGNoaWxkcmVuXG4gICAgICogQHNpbmNlIDAuMS4wIFByb2Nlc3NlcyBVUkxzIGluIGBwYWdlVXJsc2AgYW5kIHBhc3NlcyBgdXJsKClgIHRvIFB1ZyBsb2NhbHNcbiAgICAgKiBAc2luY2UgMC4xLjAgUGFzc2VzIGBidWlsZEhhc2hgIGFzIGBoYXNoYCB0byBsb2NhbHMgb24gZXZlcnkgcGFnZVxuICAgICAqIEBzaW5jZSAwLjEuMCBQYXNzZXMgYGluZGV4YCB0byBsb2NhbHMsIHRoZSBhYnNvbHV0ZS9yZWxhdGl2ZSBVUkwgdG8gdGhlIGluZGV4IHBhZ2VcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1aWxkRGlyZWN0b3J5KGRpcmVjdG9yeTogSUJsaXR6TWFwRGlyZWN0b3J5LCBjdXJyZW50RGlyZWN0b3J5QXJyYXk6IHN0cmluZ1tdID0gW10pOiBib29sZWFuIHtcblxuICAgICAgICBmb3IgKGxldCBmaWxlTmFtZSBpbiBkaXJlY3RvcnkuZmlsZXMpIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnkuZmlsZXMuaGFzT3duUHJvcGVydHkoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpbGUgPSBkaXJlY3RvcnkuZmlsZXNbZmlsZU5hbWVdO1xuICAgICAgICAgICAgICAgIGxldCBmaWxlQXJyYXkgPSBjdXJyZW50RGlyZWN0b3J5QXJyYXkuc2xpY2UoMCkuY29uY2F0KFtmaWxlLm5hbWVdKTtcbiAgICAgICAgICAgICAgICBsZXQgcGFnZVVybCA9IHRoaXMuZ2VuZXJhdGVVcmwoZmlsZUFycmF5LCBjdXJyZW50RGlyZWN0b3J5QXJyYXkpO1xuXG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBtZW51c1xuICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzZWRNZW51czogSUJsaXR6UGFnZU1lbnVzID0ge307XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbWVudU5hbWUgaW4gdGhpcy5tZW51cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51cy5oYXNPd25Qcm9wZXJ0eShtZW51TmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZW51ID0gdGhpcy5tZW51c1ttZW51TmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbUNvdW50ID0gbWVudS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvY2Vzc2VkTWVudSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbWVudVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gaXRlbS51cmwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5kaXJlY3RvcnlBcnJheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnJheSA9IGl0ZW0uZGlyZWN0b3J5QXJyYXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmZpbGVOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5ID0gYXJyYXkuY29uY2F0KFtpdGVtLmZpbGVOYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdGhpcy5nZW5lcmF0ZVVybChhcnJheSwgY3VycmVudERpcmVjdG9yeUFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGl2ZSA9IGZpbGUudXJsKCkgPT09IGl0ZW0udXJsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkTWVudS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkTWVudXNbbWVudU5hbWVdID0gcHJvY2Vzc2VkTWVudTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgVVJMcyBpbiBCbGl0eiBkYXRhLCB3aGlsZSBhbHNvIHBhY2tpbmcgYWxsIGNoaWxkcmVuIGludG8gYGNoaWxkUGFnZXNgIGFuZCBgY2hpbGREaXJlY3Rvcmllc2BcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGRQYWdlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lZENoaWxkUGFnZXMgPSB7fTtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGREaXJlY3RvcmllcyA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lZENoaWxkRGlyZWN0b3JpZXMgPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBkYXRhS2V5IGluIGZpbGUuYmxpdHpEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLmJsaXR6RGF0YS5oYXNPd25Qcm9wZXJ0eShkYXRhS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXkgPT09ICd1cmwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5ibGl0ekRhdGFbZGF0YUtleV0gPSBmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XShjdXJyZW50RGlyZWN0b3J5QXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFWYWx1ZSA9IGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkYXRhVmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFMZW5ndGggPSBkYXRhVmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YUxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhVmFsdWVbaV0udXJsICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGRhdGFWYWx1ZVtpXS51cmwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldW2ldLnVybFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gZmlsZS5ibGl0ekRhdGFbZGF0YUtleV1baV0udXJsKGN1cnJlbnREaXJlY3RvcnlBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXkgIT09ICdwYXJlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRGlyZWN0b3JpZXMucHVzaChmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVkQ2hpbGREaXJlY3Rvcmllc1tkYXRhS2V5XSA9IGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGFWYWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFWYWx1ZS51cmwgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZGF0YVZhbHVlLnVybCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XS51cmwgPSBmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XS51cmwoY3VycmVudERpcmVjdG9yeUFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXkgIT09ICdwYXJlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkUGFnZXMucHVzaChmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVkQ2hpbGRQYWdlc1tkYXRhS2V5XSA9IGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFVSTCB0byBpbmRleCBwYWdlXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4QXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZXhwbGljaXRfaHRtbF9leHRlbnNpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4QXJyYXkucHVzaCgnaW5kZXguaHRtbCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgVVJMIGdlbmVyYXRvcnMgYXNzaWduZWQgdG8gSURzIGFuZCBwcmVwYXJlIHRoZSBgdXJsYCBmdW5jdGlvblxuICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzZWRQYWdlVXJsczogSUJsaXR6UHJvY2Vzc2VkUGFnZVVSTHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmdlbmVyYXRlVXJsKGluZGV4QXJyYXksIGN1cnJlbnREaXJlY3RvcnlBcnJheSksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWdlSUQgaW4gdGhpcy5wYWdlVXJscykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlVXJscy5oYXNPd25Qcm9wZXJ0eShwYWdlSUQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRQYWdlVXJsc1twYWdlSURdID0gdGhpcy5wYWdlVXJsc1twYWdlSURdKGN1cnJlbnREaXJlY3RvcnlBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IChwYWdlSUQ/OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VJRCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFnZVVybDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc2VkUGFnZVVybHNbcGFnZUlEXTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgY29kZVxuICAgICAgICAgICAgICAgIGxldCBhc3NldFVybEdlbmVyYXRvciA9IHRoaXMuZ2VuZXJhdGVBc3NldFVybC5iaW5kKHRoaXMsIGN1cnJlbnREaXJlY3RvcnlBcnJheSk7XG4gICAgICAgICAgICAgICAgZmlsZS5jb250ZW50RGF0YS5jb250ZW50ID0gZmlsZS5jb250ZW50RGF0YS5jb250ZW50LnJlcGxhY2UoLyUlYXNzZXQlJS4qPyUlL2csIChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyaXBwZWRTdHJpbmcgPSBtYXRjaC5yZXBsYWNlKC9eJSVhc3NldCUlLywgJycpLnJlcGxhY2UoLyUlJC8sICcnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFzc2V0VXJsR2VuZXJhdG9yKHN0cmlwcGVkU3RyaW5nKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBsb2NhbHMgPSBvYmplY3RBc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5nbG9iYWxzLFxuICAgICAgICAgICAgICAgICAgICBmaWxlLmNvbnRlbnREYXRhLFxuICAgICAgICAgICAgICAgICAgICBmaWxlLmJsaXR6RGF0YSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfcGFnZXM6IGNoaWxkUGFnZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogY2hpbGREaXJlY3RvcmllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVkX2NoaWxkX3BhZ2VzOiBuYW1lZENoaWxkUGFnZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lZF9jaGlsZF9kaXJlY3RvcmllczogbmFtZWRDaGlsZERpcmVjdG9yaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzaDogdGhpcy5idWlsZEhhc2gsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51czogcHJvY2Vzc2VkTWVudXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NldDogYXNzZXRVcmxHZW5lcmF0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlX3VybDogdGhpcy5jb25maWcuc2l0ZV91cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlX3Jvb3Q6IHRoaXMuY29uZmlnLnNpdGVfcm9vdCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIVV0aWwud3JpdGVGaWxlRnJvbUFycmF5KHRoaXMuYnVpbGRQYXRoLCBmaWxlQXJyYXksIGZpbGUuZ2VuZXJhdG9yKGxvY2FscykpKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0NvdWxkIG5vdCB3cml0ZSBmaWxlIGZyb20gYXJyYXkhJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBkaXJlY3RvcnlOYW1lIGluIGRpcmVjdG9yeS5kaXJlY3Rvcmllcykge1xuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeS5kaXJlY3Rvcmllcy5oYXNPd25Qcm9wZXJ0eShkaXJlY3RvcnlOYW1lKSkge1xuICAgICAgICAgICAgICAgIGxldCBkaXJlY3RvcnlEYXRhID0gZGlyZWN0b3J5LmRpcmVjdG9yaWVzW2RpcmVjdG9yeU5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzRW1wdHkoZGlyZWN0b3J5RGF0YS5maWxlcykgJiYgVXRpbC5pc0VtcHR5KGRpcmVjdG9yeURhdGEuZGlyZWN0b3JpZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgZGlyZWN0b3J5QXJyYXkgPSBjdXJyZW50RGlyZWN0b3J5QXJyYXkuc2xpY2UoMCkuY29uY2F0KFtkaXJlY3RvcnlOYW1lXSk7XG4gICAgICAgICAgICAgICAgbGV0IGRpcmVjdG9yeVBhdGggPSBwYXRoLmpvaW4uYXBwbHkodW5kZWZpbmVkLCBkaXJlY3RvcnlBcnJheSk7XG4gICAgICAgICAgICAgICAgaWYgKCFVdGlsLmNyZWF0ZURpcmVjdG9yeShwYXRoLmpvaW4odGhpcy5idWlsZFBhdGgsIGRpcmVjdG9yeVBhdGgpKSkge1xuICAgICAgICAgICAgICAgICAgICBVdGlsLmVycm9yKCdDb3VsZCBub3QgY3JlYXRlIGRpcmVjdG9yeSBmb3IgdGhlIGJ1aWxkIScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGREaXJlY3RvcnkoZGlyZWN0b3J5RGF0YSwgZGlyZWN0b3J5QXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgcGFnZSBmcm9tIHRoZSBjb25maWcgaW5zZXJ0aW5nIGludG8gdGhlIHNpdGUgbWFwXG4gICAgICogQHNpbmNlIDAuMS4wIFNhdmVzIFVSTCBnZW5lcmF0b3IgZm9yIHBhZ2VzIHdpdGggSURzIHRvIGBwYWdlVXJsc2BcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIHBhcnNlQ29uZmlnUGFnZShwYWdlOiBJQmxpdHpQYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudERpcmVjdG9yeTogSUJsaXR6TWFwRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFVyaUNvbXBvbmVudHM6IHN0cmluZ1tdID0gW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50PzogSUJsaXR6UHJvY2Vzc2VkUGFnZSk6IElCbGl0elByb2Nlc3NlZFBhZ2Uge1xuXG4gICAgICAgIC8vIEdlbmVyYXRlIGZpbGUgYW5kIGRpcmVjdG9yeSBhcnJheXMgYW5kIGV4dHJhY3QgZmlsZW5hbWVcbiAgICAgICAgbGV0IG93blVyaUNvbXBvbmVudHM7XG4gICAgICAgIGlmIChwYWdlLnVyaSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgZmlsZU5hbWVTb3VyY2U7XG4gICAgICAgICAgICBpZiAocGFnZS5jb250ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZVNvdXJjZSA9IHBhZ2UudGVtcGxhdGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lU291cmNlID0gcGFnZS5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3duVXJpQ29tcG9uZW50cyA9IFtVdGlsLmV4dHJhY3RGaWxlTmFtZShmaWxlTmFtZVNvdXJjZSldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3duVXJpQ29tcG9uZW50cyA9IFV0aWwuZ2V0VXJpQ29tcG9uZW50cyhwYWdlLnVyaSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVUkkgY29tcG9uZW50cyB3aXRob3V0IHRoZSBwYXJlbnRcbiAgICAgICAgbGV0IHBhcnRpYWxGaWxlQXJyYXkgPSB0aGlzLmdlbmVyYXRlRmlsZUFycmF5KG93blVyaUNvbXBvbmVudHMpO1xuICAgICAgICBsZXQgcGFydGlhbERpcmVjdG9yeUFycmF5ID0gcGFydGlhbEZpbGVBcnJheS5zbGljZSgwLCBwYXJ0aWFsRmlsZUFycmF5Lmxlbmd0aCAtIDEpO1xuXG4gICAgICAgIC8vIFVSSSBjb21wb25lbnRzIHdpdGggdGhlIHBhcmVudFxuICAgICAgICBsZXQgZnVsbFVyaUNvbXBvbmVudHMgPSBwYXJlbnRVcmlDb21wb25lbnRzLnNsaWNlKDApLmNvbmNhdChvd25VcmlDb21wb25lbnRzKTtcbiAgICAgICAgbGV0IGZpbGVBcnJheSA9IHRoaXMuZ2VuZXJhdGVGaWxlQXJyYXkoZnVsbFVyaUNvbXBvbmVudHMpO1xuICAgICAgICBsZXQgZGlyZWN0b3J5QXJyYXkgPSBmaWxlQXJyYXkuc2xpY2UoMCwgZmlsZUFycmF5Lmxlbmd0aCAtIDEpO1xuICAgICAgICBsZXQgZmlsZU5hbWUgPSBmaWxlQXJyYXlbZmlsZUFycmF5Lmxlbmd0aCAtIDFdO1xuICAgICAgICBsZXQgZmlsZU5hbWVXaXRob3V0RXh0ZW5zaW9uID0gVXRpbC5leHRyYWN0RmlsZU5hbWUoZmlsZU5hbWUpO1xuICAgICAgICBsZXQgdXJsR2VuZXJhdG9yID0gdGhpcy5nZXRVcmxHZW5lcmF0b3IoZmlsZUFycmF5KTtcblxuICAgICAgICBsZXQgY3VycmVudFBhZ2VEaXJlY3RvcnkgPSB0aGlzLmRlc2NlbmRUb0RpcmVjdG9yeShwYXJlbnREaXJlY3RvcnksIHBhcnRpYWxEaXJlY3RvcnlBcnJheSk7XG4gICAgICAgIGxldCBjaGlsZHJlbkRpcmVjdG9yeSA9IHRoaXMuZGVzY2VuZFRvRGlyZWN0b3J5KHBhcmVudERpcmVjdG9yeSwgb3duVXJpQ29tcG9uZW50cyk7XG5cbiAgICAgICAgLy8gRXh0cmFjdCBjb250ZW50IGFuZCBwcmVwYXJlIHB1Z1xuICAgICAgICAvLyBJZiBwYXNzZWQgYGNvbnRlbnRgIGlzIGEgc3RyaW5nLCB1c2UgaXQgYXMgcGF0aCB0byBjb21waWxlIFB1Zywgb3RoZXJ3aXNlIHVzZSBgY29udGVudGAgb2JqZWN0IGFzIGlzXG4gICAgICAgIGxldCBwYWdlQ29udGVudDogYW55ID0gcGFnZS5jb250ZW50O1xuICAgICAgICBpZiAocGFnZUNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFnZUNvbnRlbnQgPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFnZS5jb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcGFnZUNvbnRlbnQgPSBDb250ZW50UGFyc2VyLnBhcnNlRmlsZShwYXRoLmpvaW4odGhpcy5jb250ZW50UGF0aCwgcGFnZS5jb250ZW50KSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHB1Z0Z1bmN0aW9uID0gdGhpcy5jb21waWxlUHVnKHBhdGguam9pbih0aGlzLnRlbXBsYXRlc1BhdGgsIHBhZ2UudGVtcGxhdGUpKTtcbiAgICAgICAgaWYgKHBhZ2VDb250ZW50ID09PSB1bmRlZmluZWQgfHwgcHVnRnVuY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcignQ291bGQgbm90IGV4dHJhY3QgY29udGVudCBhbmQgY29tcGlsZSBQdWchJyk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlZCBhIHByb2Nlc3NlZCBwYWdlIGRhdGEgb2JqZWN0XG4gICAgICAgIGxldCBwcm9jZXNzZWRQYWdlRGF0YTogSUJsaXR6UHJvY2Vzc2VkUGFnZSA9IG9iamVjdEFzc2lnbih7fSwgcGFnZUNvbnRlbnQsIHt1cmw6IHVybEdlbmVyYXRvcn0pO1xuXG4gICAgICAgIC8vIFJlY29yZCBVUkwgZ2VuZXJhdG9yIGlmIHRoZSBwYWdlIGhhcyBhbiBJRFxuICAgICAgICBpZiAocGFnZS5pZCkge1xuICAgICAgICAgICAgdGhpcy5wYWdlVXJsc1twYWdlLmlkXSA9IHVybEdlbmVyYXRvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldHVwIEJsaXR6IGRhdGEgdGhhdCB3aWxsIGJlIGV4dHJhY3RlZCBmcm9tIGNoaWxkcmVuXG4gICAgICAgIGxldCBibGl0ekRhdGEgPSB7XG4gICAgICAgICAgICB1cmw6IHVybEdlbmVyYXRvcixcbiAgICAgICAgICAgIHBhcmVudCxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBBcHBlbmQgZGF0YSB0byBtZW51IGlmIG5lZWRlZFxuICAgICAgICBpZiAocGFnZS5tZW51cykge1xuICAgICAgICAgICAgbGV0IG1lbnVDb3VudCA9IHBhZ2UubWVudXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtZW51Q291bnQ7IGsrKykge1xuICAgICAgICAgICAgICAgIGxldCBtZW51ID0gcGFnZS5tZW51c1trXTtcbiAgICAgICAgICAgICAgICBsZXQgbWVudVRpdGxlID0gZmlsZU5hbWVXaXRob3V0RXh0ZW5zaW9uO1xuICAgICAgICAgICAgICAgIGlmIChwYWdlQ29udGVudC5tZW51X3RpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnVUaXRsZSA9IHBhZ2VDb250ZW50Lm1lbnVfdGl0bGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtZW51LnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnVUaXRsZSA9IG1lbnUudGl0bGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYWdlQ29udGVudC50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBtZW51VGl0bGUgPSBwYWdlQ29udGVudC50aXRsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudXNbbWVudS5uYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudXNbbWVudS5uYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbWVudUl0ZW06IElCbGl0ek1hcE1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogbWVudVRpdGxlLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybEdlbmVyYXRvcixcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb25maWcuYWJzb2x1dGVfdXJscykge1xuICAgICAgICAgICAgICAgICAgICBtZW51SXRlbS5kaXJlY3RvcnlBcnJheSA9IGRpcmVjdG9yeUFycmF5O1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZXhwbGljaXRfaHRtbF9leHRlbnNpb25zIHx8IGZpbGVOYW1lICE9PSBJTkRFWF9GSUxFX05BTUUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtLmZpbGVOYW1lID0gZmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51c1ttZW51Lm5hbWVdLnB1c2gobWVudUl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGFyc2UgY2hpbGQgcGFnZXNcbiAgICAgICAgaWYgKHBhZ2UuY2hpbGRfcGFnZXMgJiYgcGFnZS5jaGlsZF9wYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgcGFnZUNvdW50ID0gcGFnZS5jaGlsZF9wYWdlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkUGFnZSA9IHBhZ2UuY2hpbGRfcGFnZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkRGF0YSA9IHRoaXMucGFyc2VDb25maWdQYWdlKFxuICAgICAgICAgICAgICAgICAgICBjaGlsZFBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICBmdWxsVXJpQ29tcG9uZW50cyxcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkUGFnZURhdGFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBVdGlsLmVycm9yKCdGYWlsZWQgcGFyc2luZyBjaGlsZCBwYWdlIScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBibGl0ekRhdGFbY2hpbGRQYWdlLm5hbWVdID0gY2hpbGREYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGFyc2UgY2hpbGQgZGlyZWN0b3JpZXNcbiAgICAgICAgaWYgKHBhZ2UuY2hpbGRfZGlyZWN0b3JpZXMgJiYgcGFnZS5jaGlsZF9kaXJlY3Rvcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGREaXJlY3RvcnlDb3VudCA9IHBhZ2UuY2hpbGRfZGlyZWN0b3JpZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZERpcmVjdG9yeUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGREaXJlY3RvcnkgPSBwYWdlLmNoaWxkX2RpcmVjdG9yaWVzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZERhdGEgPSB0aGlzLnBhcnNlQ29uZmlnRGlyZWN0b3J5KFxuICAgICAgICAgICAgICAgICAgICBjaGlsZERpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5EaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxVcmlDb21wb25lbnRzLFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRQYWdlRGF0YVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0ZhaWxlZCBwYXJzaW5nIGNoaWxkIGRpcmVjdG9yeSEnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYmxpdHpEYXRhW2NoaWxkRGlyZWN0b3J5Lm5hbWVdID0gY2hpbGREYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgZmlsZSBkYXRhIGZvciB0aGUgbWFwIGFuZCBhcHBlbmQgaXQgdG8gc2FpZCBtYXBcbiAgICAgICAgbGV0IGZpbGVEYXRhOiBJQmxpdHpNYXBGaWxlID0ge1xuICAgICAgICAgICAgbmFtZTogZmlsZU5hbWUsXG4gICAgICAgICAgICB1cmw6IHVybEdlbmVyYXRvcixcbiAgICAgICAgICAgIGNvbnRlbnREYXRhOiBwYWdlQ29udGVudCxcbiAgICAgICAgICAgIGJsaXR6RGF0YSxcbiAgICAgICAgICAgIGdlbmVyYXRvcjogcHVnRnVuY3Rpb24sXG4gICAgICAgIH07XG4gICAgICAgIGN1cnJlbnRQYWdlRGlyZWN0b3J5LmZpbGVzW2ZpbGVEYXRhLm5hbWVdID0gZmlsZURhdGE7XG5cbiAgICAgICAgLy8gUmV0dXJuIHBhZ2UgZGF0YSB0byBwYXJlbnRcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZFBhZ2VEYXRhO1xuXG4gICAgfVxuXG4gICAgLyoqIFBhcnNlcyBhIHBhZ2UgZnJvbSB0aGUgY29uZmlnIGluc2VydGluZyBpbnRvIHRoZSBzaXRlIG1hcFxuICAgICAqIEBzaW5jZSAwLjEuMCBOb3cgb25seSBwYXJzZXMgY2hpbGQgY29uZmlnIHBhZ2VzIGlmIGBkaXJlY3RvcnkudGVtcGxhdGVgIGlzIHNldFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgcGFyc2VDb25maWdEaXJlY3RvcnkoZGlyZWN0b3J5OiBJQmxpdHpDaGlsZERpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudERpcmVjdG9yeTogSUJsaXR6TWFwRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VXJpQ29tcG9uZW50czogc3RyaW5nW10gPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudD86IElCbGl0elByb2Nlc3NlZFBhZ2UpOiBJQmxpdHpQcm9jZXNzZWRQYWdlW10ge1xuXG4gICAgICAgIGxldCBwYWdlc0NvbnRlbnQgPSBDb250ZW50UGFyc2VyLnBhcnNlRGlyZWN0b3J5KHBhdGguam9pbih0aGlzLmNvbnRlbnRQYXRoLCBkaXJlY3RvcnkuZGlyZWN0b3J5KSk7XG4gICAgICAgIGlmIChwYWdlc0NvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcignQ291bGQgbm90IGV4dHJhY3QgY29udGVudCBmcm9tIGRpcmVjdG9yeSEnKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvY2Vzc2VkUGFnZXM6IElCbGl0elByb2Nlc3NlZFBhZ2VbXSA9IFtdO1xuXG4gICAgICAgIGlmIChkaXJlY3RvcnkudGVtcGxhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IHBhZ2VDb250ZW50Q291bnQgPSBwYWdlc0NvbnRlbnQubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHVybEdlbmVyYXRvciA9IChjdXJyZW50RGlyZWN0b3J5QXJyYXk/OiBzdHJpbmdbXSk6IHN0cmluZyA9PiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VDb250ZW50Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBwYWdlQ29udGVudCA9IHBhZ2VzQ29udGVudFtpXTtcbiAgICAgICAgICAgICAgICBsZXQgcHJvY2Vzc2VkUGFnZURhdGE6IElCbGl0elByb2Nlc3NlZFBhZ2UgPSBvYmplY3RBc3NpZ24oe30sIHBhZ2VDb250ZW50LCB7dXJsOiB1cmxHZW5lcmF0b3J9KTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRQYWdlcy5wdXNoKHByb2Nlc3NlZFBhZ2VEYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSBmaWxlIGFuZCBkaXJlY3RvcnkgYXJyYXlzIGFuZCBleHRyYWN0IGZpbGVuYW1lXG4gICAgICAgICAgICBsZXQgb3duVXJpQ29tcG9uZW50cztcbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnkudXJpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBvd25VcmlDb21wb25lbnRzID0gW1V0aWwuZ2V0VXJpQ29tcG9uZW50cyhkaXJlY3RvcnkuZGlyZWN0b3J5KS5zbGljZSgtMSldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvd25VcmlDb21wb25lbnRzID0gVXRpbC5nZXRVcmlDb21wb25lbnRzKGRpcmVjdG9yeS51cmkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVUkkgQ29tcG9uZW50cyB3aXRoIHRoZSBwYXJlbnRcbiAgICAgICAgICAgIGxldCBmdWxsVXJpQ29tcG9uZW50cyA9IHBhcmVudFVyaUNvbXBvbmVudHMuc2xpY2UoMCkuY29uY2F0KG93blVyaUNvbXBvbmVudHMpO1xuXG4gICAgICAgICAgICBsZXQgY2hpbGRyZW5EaXJlY3RvcnkgPSB0aGlzLmRlc2NlbmRUb0RpcmVjdG9yeShwYXJlbnREaXJlY3RvcnksIG93blVyaUNvbXBvbmVudHMpO1xuXG4gICAgICAgICAgICBsZXQgcGFnZUNvbnRlbnRDb3VudCA9IHBhZ2VzQ29udGVudC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VDb250ZW50Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBwYWdlRGF0YTogSUJsaXR6UHJvY2Vzc2VkUGFnZTtcbiAgICAgICAgICAgICAgICBsZXQgcGFnZUNvbnRlbnQgPSBwYWdlc0NvbnRlbnRbaV07XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFnZVVyaSA9ICcvJyArIFV0aWwuZXh0cmFjdEZpbGVOYW1lKHBhZ2VDb250ZW50LmZpbGUpO1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3RvcnkudXJpX2tleSAhPT0gdW5kZWZpbmVkICYmIHBhZ2VDb250ZW50W2RpcmVjdG9yeS51cmlfa2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VVcmkgPSAnLycgKyBwYWdlQ29udGVudFtkaXJlY3RvcnkudXJpX2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBwYWdlQ29uZmlnRGF0YTogSUJsaXR6UGFnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJpOiBwYWdlVXJpLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogZGlyZWN0b3J5LnRlbXBsYXRlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBwYWdlQ29udGVudCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHBhZ2VEYXRhID0gdGhpcy5wYXJzZUNvbmZpZ1BhZ2UocGFnZUNvbmZpZ0RhdGEsIGNoaWxkcmVuRGlyZWN0b3J5LCBmdWxsVXJpQ29tcG9uZW50cywgcGFyZW50KTtcbiAgICAgICAgICAgICAgICBpZiAocGFnZURhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBVdGlsLmVycm9yKCdDb3VsZCBub3QgcGFyc2UgY29uZmlnIHBhZ2UgZ2VuZXJhdGVkIGZvciBkaXJlY3RvcnkhJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkUGFnZXMucHVzaChwYWdlRGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFkZCBwYWdlcyB0byBtZW51c1xuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeS5tZW51cykge1xuICAgICAgICAgICAgICAgIGxldCBtZW51Q291bnQgPSBkaXJlY3RvcnkubWVudXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWVudUNvdW50OyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lbnUgPSBkaXJlY3RvcnkubWVudXNba107XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYWdlQ291bnQgPSBwcm9jZXNzZWRQYWdlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFnZUNvdW50OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYWdlQ29udGVudDogYW55ID0gcHJvY2Vzc2VkUGFnZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWVudVRpdGxlID0gVXRpbC5leHRyYWN0RmlsZU5hbWUocGFnZUNvbnRlbnQuZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFnZUNvbnRlbnQubWVudV90aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVUaXRsZSA9IHBhZ2VDb250ZW50Lm1lbnVfdGl0bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1lbnUudGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51VGl0bGUgPSBtZW51LnRpdGxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYWdlQ29udGVudC50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVUaXRsZSA9IHBhZ2VDb250ZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudXNbbWVudS5uYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51c1ttZW51Lm5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWVudUl0ZW06IElCbGl0ek1hcE1lbnVJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBtZW51VGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBwYWdlQ29udGVudC51cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29uZmlnLmFic29sdXRlX3VybHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51SXRlbS5kaXJlY3RvcnlBcnJheSA9IGZ1bGxVcmlDb21wb25lbnRzLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZXhwbGljaXRfaHRtbF9leHRlbnNpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lID0gVXRpbC5leHRyYWN0RmlsZU5hbWUocGFnZUNvbnRlbnQuZmlsZSkgKyAnLmh0bWwnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtLmRpcmVjdG9yeUFycmF5LnB1c2goVXRpbC5leHRyYWN0RmlsZU5hbWUocGFnZUNvbnRlbnQuZmlsZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZSA9ICdpbmRleC5odG1sJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmV4cGxpY2l0X2h0bWxfZXh0ZW5zaW9ucyB8fCBmaWxlTmFtZSAhPT0gSU5ERVhfRklMRV9OQU1FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtLmZpbGVOYW1lID0gZmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudXNbbWVudS5uYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51c1ttZW51Lm5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVzW21lbnUubmFtZV0ucHVzaChtZW51SXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRQYWdlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXNjZW5kIHRvIHRoZSBmaW5hbCBkaXJlY3RvcnkgaW4gdGhlIGFycmF5LCByZXR1cm5pbmcgYSByZWZlcmVuY2UgdG8gaXRcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIGRlc2NlbmRUb0RpcmVjdG9yeShkaXJlY3Rvcnk6IElCbGl0ek1hcERpcmVjdG9yeSwgZGlyZWN0b3J5QXJyYXk6IHN0cmluZ1tdKTogSUJsaXR6TWFwRGlyZWN0b3J5IHtcbiAgICAgICAgbGV0IGN1cnJlbnREaXJlY3RvcnkgPSBkaXJlY3Rvcnk7XG4gICAgICAgIGxldCBkaXJlY3RvcnlDb3VudCA9IGRpcmVjdG9yeUFycmF5Lmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJlY3RvcnlDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbmV3RGlyZWN0b3J5ID0gZGlyZWN0b3J5QXJyYXlbaV07XG4gICAgICAgICAgICBpZiAoY3VycmVudERpcmVjdG9yeS5kaXJlY3Rvcmllc1tuZXdEaXJlY3RvcnldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RGlyZWN0b3J5LmRpcmVjdG9yaWVzW25ld0RpcmVjdG9yeV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yaWVzOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZXM6IHt9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50RGlyZWN0b3J5ID0gY3VycmVudERpcmVjdG9yeS5kaXJlY3Rvcmllc1tuZXdEaXJlY3RvcnldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50RGlyZWN0b3J5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIGZpbGUgYXJyYXkgdXNpbmcgVVJJIGNvbXBvbmVudHMgYW5kIEJsaXR6IGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVGaWxlQXJyYXkodXJpQ29tcG9uZW50czogc3RyaW5nW10pIHtcbiAgICAgICAgbGV0IGZpbGVBcnJheSA9IHVyaUNvbXBvbmVudHMuc2xpY2UoMCk7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcuZXhwbGljaXRfaHRtbF9leHRlbnNpb25zIHx8IGZpbGVBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZpbGVBcnJheS5wdXNoKElOREVYX0ZJTEVfTkFNRSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbGFzdElkID0gZmlsZUFycmF5Lmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBmaWxlQXJyYXlbbGFzdElkXSA9IGZpbGVBcnJheVtsYXN0SWRdICsgJy5odG1sJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZUFycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZXMgYGdlbmVyYXRlVXJsKClgIHRvIHByb2R1Y2UgYW4gYWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGFuIGFzc2V0LlxuICAgICAqXG4gICAgICogVGhlIGFyZ3VtZW50cyBhcmUgZGVsaWJlcmF0ZWx5IHJldmVyc2VkIGZvciBlYXNpZXIgcGFydGlhbCBhcHBsaWNhdGlvbi5cbiAgICAgKlxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVBc3NldFVybChjdXJyZW50RGlyZWN0b3J5QXJyYXk6IHN0cmluZ1tdLCBhc3NldEZpbGVBcnJheTogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZVVybChbJ2Fzc2V0cyddLmNvbmNhdChhc3NldEZpbGVBcnJheSksIGN1cnJlbnREaXJlY3RvcnlBcnJheSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFydGlhbGwgYXBwbGllcyBgZ2VuZXJhdGVVcmwoKWAgZm9yIGVhc2llciByZWxhdGl2ZSBVUkwgZ2VuZXJhdGlvblxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0VXJsR2VuZXJhdG9yKHRhcmdldEZpbGVBcnJheTogc3RyaW5nW10pOiAoY3VycmVudERpcmVjdG9yeUFycmF5Pzogc3RyaW5nW10pID0+IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlVXJsLmJpbmQodGhpcywgdGFyZ2V0RmlsZUFycmF5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBVUkwgdG8gdGFyZ2V0IGZpbGUsIHRha2UgaW50byBhY2NvdW50IGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBjb25maWcgc2V0dGluZ3MsIHN1Y2ggYXMgd2hldGhlclxuICAgICAqIGFic29sdXRlIFVSTHMgYXJlIGVuYWJsZWQsIGV0Yy5cbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgcHVibGljIGZvciB1bml0IHRlc3RpbmcgcHVycG9zZXMuXG4gICAgICpcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2VuZXJhdGVVcmwodGFyZ2V0RmlsZUFycmF5OiBzdHJpbmdbXSwgY3VycmVudERpcmVjdG9yeUFycmF5OiBzdHJpbmdbXSA9IFtdKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHVybEFycmF5ID0gdGFyZ2V0RmlsZUFycmF5LnNsaWNlKDApO1xuICAgICAgICBsZXQgdGFyZ2V0RGlyZWN0b3J5QXJyYXkgPSB0YXJnZXRGaWxlQXJyYXkuc2xpY2UoMCwgdGFyZ2V0RmlsZUFycmF5Lmxlbmd0aCAtIDEpO1xuICAgICAgICBsZXQgZmlsZU5hbWUgPSB0YXJnZXRGaWxlQXJyYXkuc2xpY2UoLTEpWzBdO1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLmV4cGxpY2l0X2h0bWxfZXh0ZW5zaW9ucykge1xuICAgICAgICAgICAgbGV0IGxhc3RJZCA9IHRhcmdldEZpbGVBcnJheS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaWYgKHRhcmdldEZpbGVBcnJheVtsYXN0SWRdID09PSBJTkRFWF9GSUxFX05BTUUpIHtcbiAgICAgICAgICAgICAgICB1cmxBcnJheS5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25maWcuYWJzb2x1dGVfdXJscykge1xuICAgICAgICAgICAgbGV0IGFic29sdXRlVXJsID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2l0ZV9yb290ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcuc2l0ZV9yb290ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGFic29sdXRlVXJsID0gJy8nICsgVXRpbC5zdHJpcFNsYXNoZXModGhpcy5jb25maWcuc2l0ZV9yb290KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1cmxBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgYWJzb2x1dGVVcmwgPSBhYnNvbHV0ZVVybCArICcvJyArIHVybEFycmF5LmpvaW4oJy8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhYnNvbHV0ZVVybCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBhYnNvbHV0ZVVybCA9ICcvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zaXRlX3VybCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLnNpdGVfdXJsICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGFic29sdXRlVXJsID0gdGhpcy5jb25maWcuc2l0ZV91cmwgKyBhYnNvbHV0ZVVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhYnNvbHV0ZVVybDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCByZWxhdGl2ZVVybCA9ICcnO1xuICAgICAgICAgICAgbGV0IGRpZmZlcmVudFJvb3QgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCB0YXJnZXRMZW5ndGggPSB0YXJnZXREaXJlY3RvcnlBcnJheS5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IGN1cnJlbnREaXJlY3RvcnlBcnJheS5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgubWF4KHRhcmdldExlbmd0aCwgY3VycmVudExlbmd0aCk7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpID49IHRhcmdldExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmVVcmwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCA9ICcvJyArIHJlbGF0aXZlVXJsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVXJsID0gJy4uJyArIHJlbGF0aXZlVXJsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA+PSBjdXJyZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZVVybCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVXJsID0gcmVsYXRpdmVVcmwgKyAnLyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVVcmwgPSByZWxhdGl2ZVVybCArIHRhcmdldERpcmVjdG9yeUFycmF5W2ldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXREaXJlY3RvcnlBcnJheVtpXSAhPT0gY3VycmVudERpcmVjdG9yeUFycmF5W2ldIHx8IGRpZmZlcmVudFJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZlcmVudFJvb3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aXZlVXJsICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVXJsID0gcmVsYXRpdmVVcmwgKyAnLyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCA9IHJlbGF0aXZlVXJsICsgdGFyZ2V0RGlyZWN0b3J5QXJyYXlbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmVVcmwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVVcmwgPSAnLycgKyByZWxhdGl2ZVVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVXJsID0gJy4uJyArIHJlbGF0aXZlVXJsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0aGlzLmNvbmZpZy5leHBsaWNpdF9odG1sX2V4dGVuc2lvbnMgfHwgZmlsZU5hbWUgIT09IElOREVYX0ZJTEVfTkFNRSlcbiAgICAgICAgICAgICAgICAmJiB0YXJnZXRGaWxlQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlbGF0aXZlVXJsICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCA9IHJlbGF0aXZlVXJsICsgJy8nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCA9IHJlbGF0aXZlVXJsICsgZmlsZU5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJy4vJyArIHJlbGF0aXZlVXJsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcGlsZXMgUHVnIGZpbGUgb3IgcmV0dXJucyBjb21waWxlZCBmdW5jdGlvbiBmcm9tIGNhY2hlIGlmIHRoZSBmaWxlIGhhcyBiZWVuIGNvbXBpbGVkIGJlZm9yZVxuICAgICAqIEBzaW5jZSAwLjEuMyAgUmVtb3ZlIHRyeS9jYXRjaCBibG9ja1xuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgY29tcGlsZVB1ZyhwYXRoOiBzdHJpbmcpOiAobG9jYWxzPzogYW55KSA9PiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMucHVnQ2FjaGVbcGF0aF0pIHtcbiAgICAgICAgICAgIHRoaXMucHVnQ2FjaGVbcGF0aF0gPSBwdWcuY29tcGlsZUZpbGUocGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHVnQ2FjaGVbcGF0aF07XG4gICAgfVxufVxuIl19
