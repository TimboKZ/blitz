"use strict";
var path = require("path");
var pug = require("pug");
var objectAssign = require("object-assign");
var fse = require("fs-extra");
var ContentParser_1 = require("./ContentParser");
var Util_1 = require("./Util");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QkMsSUFBQTtBQS9yQlksa0NBQVciLCJmaWxlIjoic3JjL1NpdGVCdWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBGaWxlIHJlc3BvbnNpYmxlIGZvciBhbGwgaW50ZXJmYWNlcywgY29uc3RhbnRzIGFuZCBjbGFzc2VzIHJlbGF0ZWQgdG8gZ2VuZXJhdGluZyBvZiB0aGUgc3RhdGljIHNpdGVcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBwdWcgZnJvbSAncHVnJztcbmltcG9ydCAqIGFzIG9iamVjdEFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcbmltcG9ydCAqIGFzIGZzZSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQge0lCbGl0ekNvbmZpZywgSUJsaXR6Q2hpbGREaXJlY3RvcnksIElCbGl0elBhZ2V9IGZyb20gJy4vQ29uZmlnUGFyc2VyJztcbmltcG9ydCB7Q29udGVudFBhcnNlcn0gZnJvbSAnLi9Db250ZW50UGFyc2VyJztcbmltcG9ydCB7VXRpbH0gZnJvbSAnLi9VdGlsJztcblxuLyoqXG4gKiBDb25zdGFudHMgaW5kaWNhdGluZyB0aGUgbG9jYXRpb25zIG9mIGFzc2V0cywgY29udGVudCBhbmQgdGVtcGxhdGVzXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuY29uc3QgQVNTRVRTX0RJUkVDVE9SWSA9ICdhc3NldHMnO1xuY29uc3QgQlVJTERfQVNTRVRTX0RJUkVDVE9SWSA9ICdhc3NldHMnO1xuY29uc3QgQ09OVEVOVF9ESVJFQ1RPUlkgPSAnY29udGVudCc7XG5jb25zdCBURU1QTEFURVNfRElSRUNUT1JZID0gJ3RlbXBsYXRlcyc7XG5cbi8qKlxuICogSW5kZXggZmlsZSBuYW1lIGluIGNhc2Ugc29tZW9uZSB1c2VzIGEgdmFsdWUgb3RoZXIgdGhhbiBgaW5kZXguaHRtbGBcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5jb25zdCBJTkRFWF9GSUxFX05BTUUgPSAnaW5kZXguaHRtbCc7XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgYSBCbGl0eiBmaWxlIG9mIHRoZSBzdGF0aWMgc2l0ZSwgYXMgc2VlbiBpbiB0aGUgbWFwXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuaW50ZXJmYWNlIElCbGl0ek1hcEZpbGUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB1cmw6IChjdXJyZW50RGlyZWN0b3J5QXJyYXk/OiBzdHJpbmdbXSkgPT4gc3RyaW5nO1xuICAgIGNvbnRlbnREYXRhOiBhbnk7XG4gICAgYmxpdHpEYXRhOiBhbnk7XG4gICAgZ2VuZXJhdG9yOiAobG9jYWxzPzogYW55KSA9PiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgYSBCbGl0eiBkaXJlY3Rvcnkgb2YgdGhlIHN0YXRpYyBzaXRlLCBhcyBzZWVuIGluIHRoZSBtYXBcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5pbnRlcmZhY2UgSUJsaXR6TWFwRGlyZWN0b3J5IHtcbiAgICBkaXJlY3Rvcmllcz86IHtcbiAgICAgICAgW25hbWU6IHN0cmluZ106IElCbGl0ek1hcERpcmVjdG9yeTtcbiAgICB9O1xuICAgIGZpbGVzPzoge1xuICAgICAgICBbbmFtZTogc3RyaW5nXTogSUJsaXR6TWFwRmlsZTtcbiAgICB9O1xufVxuXG4vKipcbiAqIEludGVyZmFjZXMgZm9yIG1lbnVzIGJlZm9yZSBwcm9jZXNzaW5nXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuaW50ZXJmYWNlIElCbGl0ek1hcE1lbnVJdGVtIHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHVybDogKGN1cnJlbnREaXJlY3RvcnlBcnJheT86IHN0cmluZ1tdKSA9PiBzdHJpbmc7XG4gICAgZmlsZU5hbWU/OiBzdHJpbmc7XG4gICAgZGlyZWN0b3J5QXJyYXk/OiBzdHJpbmdbXTtcbiAgICBhY3RpdmU6IGJvb2xlYW47XG59XG5pbnRlcmZhY2UgSUJsaXR6TWFwTWVudXMge1xuICAgIFtuYW1lOiBzdHJpbmddOiBJQmxpdHpNYXBNZW51SXRlbVtdO1xufVxuXG4vKipcbiAqIFBhZ2UgbWVudSBpbnRlcmZhY2VcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5pbnRlcmZhY2UgSUJsaXR6UGFnZU1lbnVJdGVtIHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbn1cbmludGVyZmFjZSBJQmxpdHpQYWdlTWVudXMge1xuICAgIFtuYW1lOiBzdHJpbmddOiBJQmxpdHpQYWdlTWVudUl0ZW1bXTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIFVSTCBnZW5lcmF0b3JzIGFzc2lnbmVkIHRvIElEc1xuICogQHNpbmNlIDAuMS4wXG4gKi9cbmludGVyZmFjZSBJQmxpdHpQYWdlVVJMcyB7XG4gICAgW2lkOiBzdHJpbmddOiAoY3VycmVudERpcmVjdG9yeUFycmF5Pzogc3RyaW5nW10pID0+IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHByb2Nlc3NlZCBVUkxzIGFzc2lnbmVkIHRvIElEc1xuICogQHNpbmNlIDAuMS4wXG4gKi9cbmludGVyZmFjZSBJQmxpdHpQcm9jZXNzZWRQYWdlVVJMcyB7XG4gICAgW2lkOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUGFnZSBjb250ZW50IGRhdGEgd2l0aCBpbnNlcnRlZCBVUkxcbiAqIEBzaW5jZSAwLjEuMiBBZGRlZCBgZmlsZWAsIGNoYW5nZWQgdHlwZSBvZiB2YWx1ZXMgZnJvbSBgc3RyaW5nYCB0byBgYW55YFxuICogQHNpbmNlIDAuMC4xXG4gKi9cbmludGVyZmFjZSBJQmxpdHpQcm9jZXNzZWRQYWdlIHtcbiAgICB1cmw6IChjdXJyZW50RGlyZWN0b3J5QXJyYXk/OiBzdHJpbmdbXSkgPT4gc3RyaW5nO1xuICAgIGZpbGU6IHN0cmluZztcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG4vKipcbiAqIFB1ZyBjYWNoZSBpbnRlcmZhY2VcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5pbnRlcmZhY2UgSVB1Z0NhY2hlIHtcbiAgICBbcGF0aDogc3RyaW5nXTogKGxvY2Fscz86IGFueSkgPT4gc3RyaW5nO1xufVxuXG4vKipcbiAqIEBjbGFzcyBBIGNsYXNzLlxuICogQHNpbmNlIDAuMC4xXG4gKi9cbmV4cG9ydCBjbGFzcyBTaXRlQnVpbGRlciB7XG4gICAgLyoqXG4gICAgICogTG9hZGVkIEJsaXR6IGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgY29uZmlnOiBJQmxpdHpDb25maWc7XG5cbiAgICAvKipcbiAgICAgKiBSb290IGRpcmVjdG9yeSBvZiB0aGUgcHJvamVjdFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgcHJvamVjdFBhdGg6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIERpcmVjdG9yeSBpbiB3aGljaCB0aGUgbmV3bHkgZ2VuZXJhdGVkIGZpbGVzIHdpbGwgYmUgcGxhY2VkXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBidWlsZFBhdGg6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEFic29sdXRlIHBhdGhzIHRvIGxvY2F0aW9ucywgY29udGVudCBhbmQgdGVtcGxhdGVzIGRpcmVjdG9yaWVzXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3NldHNQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBjb250ZW50UGF0aDogc3RyaW5nO1xuICAgIHByaXZhdGUgdGVtcGxhdGVzUGF0aDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmFuZG9tbHkgZ2VuZXJhdGVkIGhhc2ggdGhhdCBjYW4gYmUgdXNlZCB0byBieXBhc3MgYnJvd3NlciBjYWNoZVxuICAgICAqIEBzaW5jZSAwLjEuMFxuICAgICAqL1xuICAgIHByaXZhdGUgYnVpbGRIYXNoOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTaXRlIG1hcCB0aGF0IHdpbGwgYmUgdXNlZCB0byBidWlsZCBzdGF0aWMgZmlsZXMgZm9yIHRoZSB3ZWJzaXRlLiBJdCB3aWxsIGJlIGdlbmVyYXRlZCBiZWZvcmVoYW5kLlxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgc2l0ZU1hcDogSUJsaXR6TWFwRGlyZWN0b3J5O1xuXG4gICAgLyoqXG4gICAgICogVVJMIGdlbmVyYXRvcnMgZm9yIHBhZ2VzIHdpdGggSURzIHNwZWNpZmllZFxuICAgICAqIEBzaW5jZSAwLjEuMFxuICAgICAqL1xuICAgIHByaXZhdGUgcGFnZVVybHM6IElCbGl0elBhZ2VVUkxzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBPYmplY3QgaG9sZGluZyBhbGwgbWVudXMgZ2VuZXJhdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgbWVudXM6IElCbGl0ek1hcE1lbnVzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBDYWNoZSBvZiBjb21waWxlZCBQdWcgZnVuY3Rpb25zXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBwdWdDYWNoZTogSVB1Z0NhY2hlID0ge307XG5cbiAgICAvKipcbiAgICAgKiBTaXRlQnVpbGRlciBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAc2luY2UgMC4xLjAgTm93IGFsc28gZ2VuZXJhdGVzIGEgcmFuZG9tIHN0cmluZyBmb3IgYGJ1aWxkSGFzaGBcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBJQmxpdHpDb25maWcsIHByb2plY3RQYXRoOiBzdHJpbmcsIGJ1aWxkRGlyZWN0b3J5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgICAgIHRoaXMucHJvamVjdFBhdGggPSBwcm9qZWN0UGF0aDtcbiAgICAgICAgdGhpcy5idWlsZFBhdGggPSBwYXRoLmpvaW4ocHJvamVjdFBhdGgsIGJ1aWxkRGlyZWN0b3J5KTtcbiAgICAgICAgdGhpcy5hc3NldHNQYXRoID0gcGF0aC5qb2luKHByb2plY3RQYXRoLCBBU1NFVFNfRElSRUNUT1JZKTtcbiAgICAgICAgdGhpcy5jb250ZW50UGF0aCA9IHBhdGguam9pbihwcm9qZWN0UGF0aCwgQ09OVEVOVF9ESVJFQ1RPUlkpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlc1BhdGggPSBwYXRoLmpvaW4ocHJvamVjdFBhdGgsIFRFTVBMQVRFU19ESVJFQ1RPUlkpO1xuICAgICAgICB0aGlzLmJ1aWxkSGFzaCA9IFV0aWwuZ2VuZXJhdGVSYW5kb21TdHJpbmcoMTIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIHRhcmdldCBkaXJlY3RvcnkgaWYgaXQgZG9lc24ndCBleGlzdCBhbmQgYmVnaW5zIHRoZSBidWlsZGluZyBwcm9jZXNzXG4gICAgICogQHNpbmNlIDAuMS40IE5vdyBpZ25vcmVzIGFzc2V0cyBpZiBgYXNzZXRzYCBmb2xkZXIgZG9lc24ndCBleGlzdFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHB1YmxpYyBidWlsZCgpIHtcbiAgICAgICAgaWYgKCFVdGlsLnJlbW92ZURpcmVjdG9yeSh0aGlzLmJ1aWxkUGF0aCkpIHtcbiAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0NvdWxkIG5vdCByZW1vdmUgdGhlIGV4aXN0aW5nIGJ1aWxkIGRpcmVjdG9yeSAob3IgY2hlY2sgdGhhdCBpdCBleGlzdHMpIScpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVV0aWwuY3JlYXRlRGlyZWN0b3J5KHRoaXMuYnVpbGRQYXRoKSkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcignQ291bGQgbm90IGNyZWF0ZSB0aGUgZGlyZWN0b3J5IGZvciB0aGUgYnVpbGQhJyk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlsLnBhdGhFeGlzdHModGhpcy5hc3NldHNQYXRoKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmc2UuY29weVN5bmModGhpcy5hc3NldHNQYXRoLCBwYXRoLmpvaW4odGhpcy5idWlsZFBhdGgsIEJVSUxEX0FTU0VUU19ESVJFQ1RPUlkpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0NvdWxkIG5vdCBjb3B5IGFzc2V0cyBpbnRvIHRoZSBidWlsZCBmb2xkZXIhJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFV0aWwuZGVidWcoJ0Fzc2V0cyBmb2xkZXIgZG9lcyBub3QgZXhpc3QsIG5vdCBjb3B5aW5nIGFueSBhc3NldHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgVXRpbC5kZWJ1ZygnR2VuZXJhdGluZyBzaXRlIG1hcCAuIC4gLiAnKTtcbiAgICAgICAgaWYgKCF0aGlzLnByZXBhcmVNYXAoKSkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcignTWFwIGdlbmVyYXRpb24gZmFpbGVkIScpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBVdGlsLmRlYnVnKCdTaXRlIG1hcCBnZW5lcmF0ZWQhJyk7XG4gICAgICAgIFV0aWwuZGVidWcoJ0J1aWxkaW5nIHNpdGUgLiAuIC4gJyk7XG4gICAgICAgIGlmICghdGhpcy5idWlsZFNpdGUoKSkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcignU2l0ZSBidWlsZGluZyBmYWlsZWQhJyk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIFV0aWwubG9nKCdTaXRlIGJ1aWx0IHN1Y2Nlc3NmdWxseSEnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyBvdmVyIGFsbCBwYWdlcyBhbmQgZGlyZWN0b3JpZXMgc3BlY2lmaWVkIGluIHRoZSBjb25maWcsIGdlbmVyYXRpbmcgbWVudXMsIHByZXBhcmluZyBQdWcgZmlsZXMsIGV0Yy5cbiAgICAgKlxuICAgICAqIElmIHVyaSBpcyBub3Qgc3BlY2lmaWVkLCBmaWxlIG5hbWUgZnJvbSB0aGUgYGNvbnRlbnRgIHByb3BlcnR5IHdpbGwgYmUgdXNlZFxuICAgICAqXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBwcmVwYXJlTWFwKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcGFnZXMgPSB0aGlzLmNvbmZpZy5wYWdlcztcbiAgICAgICAgbGV0IHBhZ2VDb3VudCA9IHBhZ2VzLmxlbmd0aDtcbiAgICAgICAgbGV0IG1hcDogSUJsaXR6TWFwRGlyZWN0b3J5ID0ge1xuICAgICAgICAgICAgZGlyZWN0b3JpZXM6IHt9LFxuICAgICAgICAgICAgZmlsZXM6IHt9LFxuICAgICAgICB9O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGFnZURhdGEgPSB0aGlzLnBhcnNlQ29uZmlnUGFnZShwYWdlc1tpXSwgbWFwKTtcbiAgICAgICAgICAgIGlmIChwYWdlRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgVXRpbC5lcnJvcignQ291bGQgbm90IGNyZWF0ZSBtYXAsIGZhaWxlZCBvbiBwYWdlIHdpdGggVVJJIGAnICsgcGFnZURhdGEudXJsICsgJ2AhJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2l0ZU1hcCA9IG1hcDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIHRoZSBzaXRlIHVzaW5nIHRoZSBwcmV2aW91c2x5IGdlbmVyYXRlZCBtYXAgYW5kIG1lbnVzXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBidWlsZFNpdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRGlyZWN0b3J5KHRoaXMuc2l0ZU1hcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIGFsbCBmaWxlcyBpbiBhIGRpcmVjdG9yeSwgcmVjdXJzaXZlbHlcbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gYWxzbyBwcm9jZXNzZXMgbWVudXMsIHVwZGF0aW5nIHJlbGF0aXZlIGxpbmtzIChpZiBhbnkpIGFuZCBtYXJraW5nIGN1cnJlbnQgcGFnZSBhcyBhY3RpdmVcbiAgICAgKlxuICAgICAqIEBzaW5jZSAwLjEuNCBOb3cgZG9lcyBub3QgY3JlYXRlIGRpcmVjdG9yaWVzIGlmIHRoZXkgaGF2ZSBubyBjaGlsZHJlblxuICAgICAqIEBzaW5jZSAwLjEuMCBQcm9jZXNzZXMgVVJMcyBpbiBgcGFnZVVybHNgIGFuZCBwYXNzZXMgYHVybCgpYCB0byBQdWcgbG9jYWxzXG4gICAgICogQHNpbmNlIDAuMS4wIFBhc3NlcyBgYnVpbGRIYXNoYCBhcyBgaGFzaGAgdG8gbG9jYWxzIG9uIGV2ZXJ5IHBhZ2VcbiAgICAgKiBAc2luY2UgMC4xLjAgUGFzc2VzIGBpbmRleGAgdG8gbG9jYWxzLCB0aGUgYWJzb2x1dGUvcmVsYXRpdmUgVVJMIHRvIHRoZSBpbmRleCBwYWdlXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBidWlsZERpcmVjdG9yeShkaXJlY3Rvcnk6IElCbGl0ek1hcERpcmVjdG9yeSwgY3VycmVudERpcmVjdG9yeUFycmF5OiBzdHJpbmdbXSA9IFtdKTogYm9vbGVhbiB7XG5cbiAgICAgICAgZm9yIChsZXQgZmlsZU5hbWUgaW4gZGlyZWN0b3J5LmZpbGVzKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5LmZpbGVzLmhhc093blByb3BlcnR5KGZpbGVOYW1lKSkge1xuICAgICAgICAgICAgICAgIGxldCBmaWxlID0gZGlyZWN0b3J5LmZpbGVzW2ZpbGVOYW1lXTtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZUFycmF5ID0gY3VycmVudERpcmVjdG9yeUFycmF5LnNsaWNlKDApLmNvbmNhdChbZmlsZS5uYW1lXSk7XG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VVcmwgPSB0aGlzLmdlbmVyYXRlVXJsKGZpbGVBcnJheSwgY3VycmVudERpcmVjdG9yeUFycmF5KTtcblxuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgbWVudXNcbiAgICAgICAgICAgICAgICBsZXQgcHJvY2Vzc2VkTWVudXM6IElCbGl0elBhZ2VNZW51cyA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG1lbnVOYW1lIGluIHRoaXMubWVudXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudXMuaGFzT3duUHJvcGVydHkobWVudU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWVudSA9IHRoaXMubWVudXNbbWVudU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1Db3VudCA9IG1lbnUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2Nlc3NlZE1lbnUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG1lbnVbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IGl0ZW0udXJsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZGlyZWN0b3J5QXJyYXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBpdGVtLmRpcmVjdG9yeUFycmF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5maWxlTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheSA9IGFycmF5LmNvbmNhdChbaXRlbS5maWxlTmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuZ2VuZXJhdGVVcmwoYXJyYXksIGN1cnJlbnREaXJlY3RvcnlBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3RpdmUgPSBmaWxlLnVybCgpID09PSBpdGVtLnVybCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZE1lbnUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZE1lbnVzW21lbnVOYW1lXSA9IHByb2Nlc3NlZE1lbnU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIFVSTHMgaW4gQmxpdHogZGF0YSwgd2hpbGUgYWxzbyBwYWNraW5nIGFsbCBjaGlsZHJlbiBpbnRvIGBjaGlsZFBhZ2VzYCBhbmQgYGNoaWxkRGlyZWN0b3JpZXNgXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkUGFnZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZWRDaGlsZFBhZ2VzID0ge307XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkRGlyZWN0b3JpZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZWRDaGlsZERpcmVjdG9yaWVzID0ge307XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZGF0YUtleSBpbiBmaWxlLmJsaXR6RGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS5ibGl0ekRhdGEuaGFzT3duUHJvcGVydHkoZGF0YUtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5ID09PSAndXJsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldID0gZmlsZS5ibGl0ekRhdGFbZGF0YUtleV0oY3VycmVudERpcmVjdG9yeUFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhVmFsdWUgPSBmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YVZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhTGVuZ3RoID0gZGF0YVZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVZhbHVlW2ldLnVybCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBkYXRhVmFsdWVbaV0udXJsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XVtpXS51cmxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldW2ldLnVybChjdXJyZW50RGlyZWN0b3J5QXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5ICE9PSAncGFyZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZERpcmVjdG9yaWVzLnB1c2goZmlsZS5ibGl0ekRhdGFbZGF0YUtleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lZENoaWxkRGlyZWN0b3JpZXNbZGF0YUtleV0gPSBmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkYXRhVmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhVmFsdWUudXJsICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGRhdGFWYWx1ZS51cmwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5ibGl0ekRhdGFbZGF0YUtleV0udXJsID0gZmlsZS5ibGl0ekRhdGFbZGF0YUtleV0udXJsKGN1cnJlbnREaXJlY3RvcnlBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5ICE9PSAncGFyZW50Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZFBhZ2VzLnB1c2goZmlsZS5ibGl0ekRhdGFbZGF0YUtleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lZENoaWxkUGFnZXNbZGF0YUtleV0gPSBmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBVUkwgdG8gaW5kZXggcGFnZVxuICAgICAgICAgICAgICAgIGxldCBpbmRleEFycmF5ID0gW107XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmV4cGxpY2l0X2h0bWxfZXh0ZW5zaW9ucykge1xuICAgICAgICAgICAgICAgICAgICBpbmRleEFycmF5LnB1c2goJ2luZGV4Lmh0bWwnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIFVSTCBnZW5lcmF0b3JzIGFzc2lnbmVkIHRvIElEcyBhbmQgcHJlcGFyZSB0aGUgYHVybGAgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBsZXQgcHJvY2Vzc2VkUGFnZVVybHM6IElCbGl0elByb2Nlc3NlZFBhZ2VVUkxzID0ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5nZW5lcmF0ZVVybChpbmRleEFycmF5LCBjdXJyZW50RGlyZWN0b3J5QXJyYXkpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGFnZUlEIGluIHRoaXMucGFnZVVybHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZVVybHMuaGFzT3duUHJvcGVydHkocGFnZUlEKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkUGFnZVVybHNbcGFnZUlEXSA9IHRoaXMucGFnZVVybHNbcGFnZUlEXShjdXJyZW50RGlyZWN0b3J5QXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSAocGFnZUlEPzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWdlSUQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2VVcmw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NlZFBhZ2VVcmxzW3BhZ2VJRF07XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGNvZGVcbiAgICAgICAgICAgICAgICBsZXQgYXNzZXRVcmxHZW5lcmF0b3IgPSB0aGlzLmdlbmVyYXRlQXNzZXRVcmwuYmluZCh0aGlzLCBjdXJyZW50RGlyZWN0b3J5QXJyYXkpO1xuICAgICAgICAgICAgICAgIGZpbGUuY29udGVudERhdGEuY29udGVudCA9IGZpbGUuY29udGVudERhdGEuY29udGVudC5yZXBsYWNlKC8lJWFzc2V0JSUuKj8lJS9nLCAobWF0Y2gpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cmlwcGVkU3RyaW5nID0gbWF0Y2gucmVwbGFjZSgvXiUlYXNzZXQlJS8sICcnKS5yZXBsYWNlKC8lJSQvLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc3NldFVybEdlbmVyYXRvcihzdHJpcHBlZFN0cmluZyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxzID0gb2JqZWN0QXNzaWduKFxuICAgICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuZ2xvYmFscyxcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5jb250ZW50RGF0YSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5ibGl0ekRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX3BhZ2VzOiBjaGlsZFBhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IGNoaWxkRGlyZWN0b3JpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lZF9jaGlsZF9wYWdlczogbmFtZWRDaGlsZFBhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZWRfY2hpbGRfZGlyZWN0b3JpZXM6IG5hbWVkQ2hpbGREaXJlY3RvcmllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc2g6IHRoaXMuYnVpbGRIYXNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudXM6IHByb2Nlc3NlZE1lbnVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQ6IGFzc2V0VXJsR2VuZXJhdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZV91cmw6IHRoaXMuY29uZmlnLnNpdGVfdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l0ZV9yb290OiB0aGlzLmNvbmZpZy5zaXRlX3Jvb3QsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFVdGlsLndyaXRlRmlsZUZyb21BcnJheSh0aGlzLmJ1aWxkUGF0aCwgZmlsZUFycmF5LCBmaWxlLmdlbmVyYXRvcihsb2NhbHMpKSkge1xuICAgICAgICAgICAgICAgICAgICBVdGlsLmVycm9yKCdDb3VsZCBub3Qgd3JpdGUgZmlsZSBmcm9tIGFycmF5IScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgZGlyZWN0b3J5TmFtZSBpbiBkaXJlY3RvcnkuZGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnkuZGlyZWN0b3JpZXMuaGFzT3duUHJvcGVydHkoZGlyZWN0b3J5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGlyZWN0b3J5RGF0YSA9IGRpcmVjdG9yeS5kaXJlY3Rvcmllc1tkaXJlY3RvcnlOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc0VtcHR5KGRpcmVjdG9yeURhdGEuZmlsZXMpICYmIFV0aWwuaXNFbXB0eShkaXJlY3RvcnlEYXRhLmRpcmVjdG9yaWVzKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGRpcmVjdG9yeUFycmF5ID0gY3VycmVudERpcmVjdG9yeUFycmF5LnNsaWNlKDApLmNvbmNhdChbZGlyZWN0b3J5TmFtZV0pO1xuICAgICAgICAgICAgICAgIGxldCBkaXJlY3RvcnlQYXRoID0gcGF0aC5qb2luLmFwcGx5KHVuZGVmaW5lZCwgZGlyZWN0b3J5QXJyYXkpO1xuICAgICAgICAgICAgICAgIGlmICghVXRpbC5jcmVhdGVEaXJlY3RvcnkocGF0aC5qb2luKHRoaXMuYnVpbGRQYXRoLCBkaXJlY3RvcnlQYXRoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5lcnJvcignQ291bGQgbm90IGNyZWF0ZSBkaXJlY3RvcnkgZm9yIHRoZSBidWlsZCEnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkRGlyZWN0b3J5KGRpcmVjdG9yeURhdGEsIGRpcmVjdG9yeUFycmF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHBhZ2UgZnJvbSB0aGUgY29uZmlnIGluc2VydGluZyBpbnRvIHRoZSBzaXRlIG1hcFxuICAgICAqIEBzaW5jZSAwLjEuMCBTYXZlcyBVUkwgZ2VuZXJhdG9yIGZvciBwYWdlcyB3aXRoIElEcyB0byBgcGFnZVVybHNgXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXJzZUNvbmZpZ1BhZ2UocGFnZTogSUJsaXR6UGFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnREaXJlY3Rvcnk6IElCbGl0ek1hcERpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRVcmlDb21wb25lbnRzOiBzdHJpbmdbXSA9IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudD86IElCbGl0elByb2Nlc3NlZFBhZ2UpOiBJQmxpdHpQcm9jZXNzZWRQYWdlIHtcblxuICAgICAgICAvLyBHZW5lcmF0ZSBmaWxlIGFuZCBkaXJlY3RvcnkgYXJyYXlzIGFuZCBleHRyYWN0IGZpbGVuYW1lXG4gICAgICAgIGxldCBvd25VcmlDb21wb25lbnRzO1xuICAgICAgICBpZiAocGFnZS51cmkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IGZpbGVOYW1lU291cmNlO1xuICAgICAgICAgICAgaWYgKHBhZ2UuY29udGVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWVTb3VyY2UgPSBwYWdlLnRlbXBsYXRlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZVNvdXJjZSA9IHBhZ2UuY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG93blVyaUNvbXBvbmVudHMgPSBbVXRpbC5leHRyYWN0RmlsZU5hbWUoZmlsZU5hbWVTb3VyY2UpXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG93blVyaUNvbXBvbmVudHMgPSBVdGlsLmdldFVyaUNvbXBvbmVudHMocGFnZS51cmkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVVJJIGNvbXBvbmVudHMgd2l0aG91dCB0aGUgcGFyZW50XG4gICAgICAgIGxldCBwYXJ0aWFsRmlsZUFycmF5ID0gdGhpcy5nZW5lcmF0ZUZpbGVBcnJheShvd25VcmlDb21wb25lbnRzKTtcbiAgICAgICAgbGV0IHBhcnRpYWxEaXJlY3RvcnlBcnJheSA9IHBhcnRpYWxGaWxlQXJyYXkuc2xpY2UoMCwgcGFydGlhbEZpbGVBcnJheS5sZW5ndGggLSAxKTtcblxuICAgICAgICAvLyBVUkkgY29tcG9uZW50cyB3aXRoIHRoZSBwYXJlbnRcbiAgICAgICAgbGV0IGZ1bGxVcmlDb21wb25lbnRzID0gcGFyZW50VXJpQ29tcG9uZW50cy5zbGljZSgwKS5jb25jYXQob3duVXJpQ29tcG9uZW50cyk7XG4gICAgICAgIGxldCBmaWxlQXJyYXkgPSB0aGlzLmdlbmVyYXRlRmlsZUFycmF5KGZ1bGxVcmlDb21wb25lbnRzKTtcbiAgICAgICAgbGV0IGRpcmVjdG9yeUFycmF5ID0gZmlsZUFycmF5LnNsaWNlKDAsIGZpbGVBcnJheS5sZW5ndGggLSAxKTtcbiAgICAgICAgbGV0IGZpbGVOYW1lID0gZmlsZUFycmF5W2ZpbGVBcnJheS5sZW5ndGggLSAxXTtcbiAgICAgICAgbGV0IGZpbGVOYW1lV2l0aG91dEV4dGVuc2lvbiA9IFV0aWwuZXh0cmFjdEZpbGVOYW1lKGZpbGVOYW1lKTtcbiAgICAgICAgbGV0IHVybEdlbmVyYXRvciA9IHRoaXMuZ2V0VXJsR2VuZXJhdG9yKGZpbGVBcnJheSk7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlRGlyZWN0b3J5ID0gdGhpcy5kZXNjZW5kVG9EaXJlY3RvcnkocGFyZW50RGlyZWN0b3J5LCBwYXJ0aWFsRGlyZWN0b3J5QXJyYXkpO1xuICAgICAgICBsZXQgY2hpbGRyZW5EaXJlY3RvcnkgPSB0aGlzLmRlc2NlbmRUb0RpcmVjdG9yeShwYXJlbnREaXJlY3RvcnksIG93blVyaUNvbXBvbmVudHMpO1xuXG4gICAgICAgIC8vIEV4dHJhY3QgY29udGVudCBhbmQgcHJlcGFyZSBwdWdcbiAgICAgICAgLy8gSWYgcGFzc2VkIGBjb250ZW50YCBpcyBhIHN0cmluZywgdXNlIGl0IGFzIHBhdGggdG8gY29tcGlsZSBQdWcsIG90aGVyd2lzZSB1c2UgYGNvbnRlbnRgIG9iamVjdCBhcyBpc1xuICAgICAgICBsZXQgcGFnZUNvbnRlbnQ6IGFueSA9IHBhZ2UuY29udGVudDtcbiAgICAgICAgaWYgKHBhZ2VDb250ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhZ2VDb250ZW50ID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhZ2UuY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHBhZ2VDb250ZW50ID0gQ29udGVudFBhcnNlci5wYXJzZUZpbGUocGF0aC5qb2luKHRoaXMuY29udGVudFBhdGgsIHBhZ2UuY29udGVudCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwdWdGdW5jdGlvbiA9IHRoaXMuY29tcGlsZVB1ZyhwYXRoLmpvaW4odGhpcy50ZW1wbGF0ZXNQYXRoLCBwYWdlLnRlbXBsYXRlKSk7XG4gICAgICAgIGlmIChwYWdlQ29udGVudCA9PT0gdW5kZWZpbmVkIHx8IHB1Z0Z1bmN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0NvdWxkIG5vdCBleHRyYWN0IGNvbnRlbnQgYW5kIGNvbXBpbGUgUHVnIScpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZWQgYSBwcm9jZXNzZWQgcGFnZSBkYXRhIG9iamVjdFxuICAgICAgICBsZXQgcHJvY2Vzc2VkUGFnZURhdGE6IElCbGl0elByb2Nlc3NlZFBhZ2UgPSBvYmplY3RBc3NpZ24oe30sIHBhZ2VDb250ZW50LCB7dXJsOiB1cmxHZW5lcmF0b3J9KTtcblxuICAgICAgICAvLyBSZWNvcmQgVVJMIGdlbmVyYXRvciBpZiB0aGUgcGFnZSBoYXMgYW4gSURcbiAgICAgICAgaWYgKHBhZ2UuaWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZVVybHNbcGFnZS5pZF0gPSB1cmxHZW5lcmF0b3I7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXR1cCBCbGl0eiBkYXRhIHRoYXQgd2lsbCBiZSBleHRyYWN0ZWQgZnJvbSBjaGlsZHJlblxuICAgICAgICBsZXQgYmxpdHpEYXRhID0ge1xuICAgICAgICAgICAgdXJsOiB1cmxHZW5lcmF0b3IsXG4gICAgICAgICAgICBwYXJlbnQsXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQXBwZW5kIGRhdGEgdG8gbWVudSBpZiBuZWVkZWRcbiAgICAgICAgaWYgKHBhZ2UubWVudXMpIHtcbiAgICAgICAgICAgIGxldCBtZW51Q291bnQgPSBwYWdlLm1lbnVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbWVudUNvdW50OyBrKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbWVudSA9IHBhZ2UubWVudXNba107XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVUaXRsZSA9IGZpbGVOYW1lV2l0aG91dEV4dGVuc2lvbjtcbiAgICAgICAgICAgICAgICBpZiAocGFnZUNvbnRlbnQubWVudV90aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBtZW51VGl0bGUgPSBwYWdlQ29udGVudC5tZW51X3RpdGxlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWVudS50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBtZW51VGl0bGUgPSBtZW51LnRpdGxlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFnZUNvbnRlbnQudGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVudVRpdGxlID0gcGFnZUNvbnRlbnQudGl0bGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnVzW21lbnUubmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVzW21lbnUubmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJdGVtOiBJQmxpdHpNYXBNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG1lbnVUaXRsZSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmxHZW5lcmF0b3IsXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29uZmlnLmFic29sdXRlX3VybHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW0uZGlyZWN0b3J5QXJyYXkgPSBkaXJlY3RvcnlBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmV4cGxpY2l0X2h0bWxfZXh0ZW5zaW9ucyB8fCBmaWxlTmFtZSAhPT0gSU5ERVhfRklMRV9OQU1FKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51SXRlbS5maWxlTmFtZSA9IGZpbGVOYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubWVudXNbbWVudS5uYW1lXS5wdXNoKG1lbnVJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBhcnNlIGNoaWxkIHBhZ2VzXG4gICAgICAgIGlmIChwYWdlLmNoaWxkX3BhZ2VzICYmIHBhZ2UuY2hpbGRfcGFnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHBhZ2VDb3VudCA9IHBhZ2UuY2hpbGRfcGFnZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZFBhZ2UgPSBwYWdlLmNoaWxkX3BhZ2VzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZERhdGEgPSB0aGlzLnBhcnNlQ29uZmlnUGFnZShcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRQYWdlLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbkRpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgZnVsbFVyaUNvbXBvbmVudHMsXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZFBhZ2VEYXRhXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGREYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5lcnJvcignRmFpbGVkIHBhcnNpbmcgY2hpbGQgcGFnZSEnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYmxpdHpEYXRhW2NoaWxkUGFnZS5uYW1lXSA9IGNoaWxkRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBhcnNlIGNoaWxkIGRpcmVjdG9yaWVzXG4gICAgICAgIGlmIChwYWdlLmNoaWxkX2RpcmVjdG9yaWVzICYmIHBhZ2UuY2hpbGRfZGlyZWN0b3JpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGNoaWxkRGlyZWN0b3J5Q291bnQgPSBwYWdlLmNoaWxkX2RpcmVjdG9yaWVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGREaXJlY3RvcnlDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkRGlyZWN0b3J5ID0gcGFnZS5jaGlsZF9kaXJlY3Rvcmllc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGREYXRhID0gdGhpcy5wYXJzZUNvbmZpZ0RpcmVjdG9yeShcbiAgICAgICAgICAgICAgICAgICAgY2hpbGREaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICBmdWxsVXJpQ29tcG9uZW50cyxcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkUGFnZURhdGFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBVdGlsLmVycm9yKCdGYWlsZWQgcGFyc2luZyBjaGlsZCBkaXJlY3RvcnkhJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJsaXR6RGF0YVtjaGlsZERpcmVjdG9yeS5uYW1lXSA9IGNoaWxkRGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdlbmVyYXRlIGZpbGUgZGF0YSBmb3IgdGhlIG1hcCBhbmQgYXBwZW5kIGl0IHRvIHNhaWQgbWFwXG4gICAgICAgIGxldCBmaWxlRGF0YTogSUJsaXR6TWFwRmlsZSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGZpbGVOYW1lLFxuICAgICAgICAgICAgdXJsOiB1cmxHZW5lcmF0b3IsXG4gICAgICAgICAgICBjb250ZW50RGF0YTogcGFnZUNvbnRlbnQsXG4gICAgICAgICAgICBibGl0ekRhdGEsXG4gICAgICAgICAgICBnZW5lcmF0b3I6IHB1Z0Z1bmN0aW9uLFxuICAgICAgICB9O1xuICAgICAgICBjdXJyZW50UGFnZURpcmVjdG9yeS5maWxlc1tmaWxlRGF0YS5uYW1lXSA9IGZpbGVEYXRhO1xuXG4gICAgICAgIC8vIFJldHVybiBwYWdlIGRhdGEgdG8gcGFyZW50XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRQYWdlRGF0YTtcblxuICAgIH1cblxuICAgIC8qKiBQYXJzZXMgYSBwYWdlIGZyb20gdGhlIGNvbmZpZyBpbnNlcnRpbmcgaW50byB0aGUgc2l0ZSBtYXBcbiAgICAgKiBAc2luY2UgMC4xLjAgTm93IG9ubHkgcGFyc2VzIGNoaWxkIGNvbmZpZyBwYWdlcyBpZiBgZGlyZWN0b3J5LnRlbXBsYXRlYCBpcyBzZXRcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIHBhcnNlQ29uZmlnRGlyZWN0b3J5KGRpcmVjdG9yeTogSUJsaXR6Q2hpbGREaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnREaXJlY3Rvcnk6IElCbGl0ek1hcERpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFVyaUNvbXBvbmVudHM6IHN0cmluZ1tdID0gW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ/OiBJQmxpdHpQcm9jZXNzZWRQYWdlKTogSUJsaXR6UHJvY2Vzc2VkUGFnZVtdIHtcblxuICAgICAgICBsZXQgcGFnZXNDb250ZW50ID0gQ29udGVudFBhcnNlci5wYXJzZURpcmVjdG9yeShwYXRoLmpvaW4odGhpcy5jb250ZW50UGF0aCwgZGlyZWN0b3J5LmRpcmVjdG9yeSkpO1xuICAgICAgICBpZiAocGFnZXNDb250ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0NvdWxkIG5vdCBleHRyYWN0IGNvbnRlbnQgZnJvbSBkaXJlY3RvcnkhJyk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb2Nlc3NlZFBhZ2VzOiBJQmxpdHpQcm9jZXNzZWRQYWdlW10gPSBbXTtcblxuICAgICAgICBpZiAoZGlyZWN0b3J5LnRlbXBsYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBwYWdlQ29udGVudENvdW50ID0gcGFnZXNDb250ZW50Lmxlbmd0aDtcbiAgICAgICAgICAgIGxldCB1cmxHZW5lcmF0b3IgPSAoY3VycmVudERpcmVjdG9yeUFycmF5Pzogc3RyaW5nW10pOiBzdHJpbmcgPT4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlQ29udGVudENvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFnZUNvbnRlbnQgPSBwYWdlc0NvbnRlbnRbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByb2Nlc3NlZFBhZ2VEYXRhOiBJQmxpdHpQcm9jZXNzZWRQYWdlID0gb2JqZWN0QXNzaWduKHt9LCBwYWdlQ29udGVudCwge3VybDogdXJsR2VuZXJhdG9yfSk7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkUGFnZXMucHVzaChwcm9jZXNzZWRQYWdlRGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgZmlsZSBhbmQgZGlyZWN0b3J5IGFycmF5cyBhbmQgZXh0cmFjdCBmaWxlbmFtZVxuICAgICAgICAgICAgbGV0IG93blVyaUNvbXBvbmVudHM7XG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5LnVyaSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb3duVXJpQ29tcG9uZW50cyA9IFtVdGlsLmdldFVyaUNvbXBvbmVudHMoZGlyZWN0b3J5LmRpcmVjdG9yeSkuc2xpY2UoLTEpXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3duVXJpQ29tcG9uZW50cyA9IFV0aWwuZ2V0VXJpQ29tcG9uZW50cyhkaXJlY3RvcnkudXJpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVVJJIENvbXBvbmVudHMgd2l0aCB0aGUgcGFyZW50XG4gICAgICAgICAgICBsZXQgZnVsbFVyaUNvbXBvbmVudHMgPSBwYXJlbnRVcmlDb21wb25lbnRzLnNsaWNlKDApLmNvbmNhdChvd25VcmlDb21wb25lbnRzKTtcblxuICAgICAgICAgICAgbGV0IGNoaWxkcmVuRGlyZWN0b3J5ID0gdGhpcy5kZXNjZW5kVG9EaXJlY3RvcnkocGFyZW50RGlyZWN0b3J5LCBvd25VcmlDb21wb25lbnRzKTtcblxuICAgICAgICAgICAgbGV0IHBhZ2VDb250ZW50Q291bnQgPSBwYWdlc0NvbnRlbnQubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlQ29udGVudENvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFnZURhdGE6IElCbGl0elByb2Nlc3NlZFBhZ2U7XG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VDb250ZW50ID0gcGFnZXNDb250ZW50W2ldO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VVcmkgPSAnLycgKyBVdGlsLmV4dHJhY3RGaWxlTmFtZShwYWdlQ29udGVudC5maWxlKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0b3J5LnVyaV9rZXkgIT09IHVuZGVmaW5lZCAmJiBwYWdlQ29udGVudFtkaXJlY3RvcnkudXJpX2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlVXJpID0gJy8nICsgcGFnZUNvbnRlbnRbZGlyZWN0b3J5LnVyaV9rZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcGFnZUNvbmZpZ0RhdGE6IElCbGl0elBhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVyaTogcGFnZVVyaSxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IGRpcmVjdG9yeS50ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogcGFnZUNvbnRlbnQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwYWdlRGF0YSA9IHRoaXMucGFyc2VDb25maWdQYWdlKHBhZ2VDb25maWdEYXRhLCBjaGlsZHJlbkRpcmVjdG9yeSwgZnVsbFVyaUNvbXBvbmVudHMsIHBhcmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VEYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5lcnJvcignQ291bGQgbm90IHBhcnNlIGNvbmZpZyBwYWdlIGdlbmVyYXRlZCBmb3IgZGlyZWN0b3J5IScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb2Nlc3NlZFBhZ2VzLnB1c2gocGFnZURhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBZGQgcGFnZXMgdG8gbWVudXNcbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnkubWVudXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWVudUNvdW50ID0gZGlyZWN0b3J5Lm1lbnVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1lbnVDb3VudDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZW51ID0gZGlyZWN0b3J5Lm1lbnVzW2tdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFnZUNvdW50ID0gcHJvY2Vzc2VkUGFnZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBhZ2VDb3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFnZUNvbnRlbnQ6IGFueSA9IHByb2Nlc3NlZFBhZ2VzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lbnVUaXRsZSA9IFV0aWwuZXh0cmFjdEZpbGVOYW1lKHBhZ2VDb250ZW50LmZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2VDb250ZW50Lm1lbnVfdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51VGl0bGUgPSBwYWdlQ29udGVudC5tZW51X3RpdGxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtZW51LnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudVRpdGxlID0gbWVudS50aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFnZUNvbnRlbnQudGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51VGl0bGUgPSBwYWdlQ29udGVudC50aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnVzW21lbnUubmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVudXNbbWVudS5uYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lbnVJdGVtOiBJQmxpdHpNYXBNZW51SXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbWVudVRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogcGFnZUNvbnRlbnQudXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5hYnNvbHV0ZV91cmxzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW0uZGlyZWN0b3J5QXJyYXkgPSBmdWxsVXJpQ29tcG9uZW50cy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmV4cGxpY2l0X2h0bWxfZXh0ZW5zaW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZSA9IFV0aWwuZXh0cmFjdEZpbGVOYW1lKHBhZ2VDb250ZW50LmZpbGUpICsgJy5odG1sJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51SXRlbS5kaXJlY3RvcnlBcnJheS5wdXNoKFV0aWwuZXh0cmFjdEZpbGVOYW1lKHBhZ2VDb250ZW50LmZpbGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWUgPSAnaW5kZXguaHRtbCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5leHBsaWNpdF9odG1sX2V4dGVuc2lvbnMgfHwgZmlsZU5hbWUgIT09IElOREVYX0ZJTEVfTkFNRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51SXRlbS5maWxlTmFtZSA9IGZpbGVOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnVzW21lbnUubmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVudXNbbWVudS5uYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51c1ttZW51Lm5hbWVdLnB1c2gobWVudUl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkUGFnZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzY2VuZCB0byB0aGUgZmluYWwgZGlyZWN0b3J5IGluIHRoZSBhcnJheSwgcmV0dXJuaW5nIGEgcmVmZXJlbmNlIHRvIGl0XG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBkZXNjZW5kVG9EaXJlY3RvcnkoZGlyZWN0b3J5OiBJQmxpdHpNYXBEaXJlY3RvcnksIGRpcmVjdG9yeUFycmF5OiBzdHJpbmdbXSk6IElCbGl0ek1hcERpcmVjdG9yeSB7XG4gICAgICAgIGxldCBjdXJyZW50RGlyZWN0b3J5ID0gZGlyZWN0b3J5O1xuICAgICAgICBsZXQgZGlyZWN0b3J5Q291bnQgPSBkaXJlY3RvcnlBcnJheS5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlyZWN0b3J5Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5ld0RpcmVjdG9yeSA9IGRpcmVjdG9yeUFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnREaXJlY3RvcnkuZGlyZWN0b3JpZXNbbmV3RGlyZWN0b3J5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudERpcmVjdG9yeS5kaXJlY3Rvcmllc1tuZXdEaXJlY3RvcnldID0ge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rvcmllczoge30sXG4gICAgICAgICAgICAgICAgICAgIGZpbGVzOiB7fSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudERpcmVjdG9yeSA9IGN1cnJlbnREaXJlY3RvcnkuZGlyZWN0b3JpZXNbbmV3RGlyZWN0b3J5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudERpcmVjdG9yeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBmaWxlIGFycmF5IHVzaW5nIFVSSSBjb21wb25lbnRzIGFuZCBCbGl0eiBjb25maWdcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlRmlsZUFycmF5KHVyaUNvbXBvbmVudHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCBmaWxlQXJyYXkgPSB1cmlDb21wb25lbnRzLnNsaWNlKDApO1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLmV4cGxpY2l0X2h0bWxfZXh0ZW5zaW9ucyB8fCBmaWxlQXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBmaWxlQXJyYXkucHVzaChJTkRFWF9GSUxFX05BTUUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGxhc3RJZCA9IGZpbGVBcnJheS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgZmlsZUFycmF5W2xhc3RJZF0gPSBmaWxlQXJyYXlbbGFzdElkXSArICcuaHRtbCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGVBcnJheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VzIGBnZW5lcmF0ZVVybCgpYCB0byBwcm9kdWNlIGFuIGFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBhbiBhc3NldC5cbiAgICAgKlxuICAgICAqIFRoZSBhcmd1bWVudHMgYXJlIGRlbGliZXJhdGVseSByZXZlcnNlZCBmb3IgZWFzaWVyIHBhcnRpYWwgYXBwbGljYXRpb24uXG4gICAgICpcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlQXNzZXRVcmwoY3VycmVudERpcmVjdG9yeUFycmF5OiBzdHJpbmdbXSwgYXNzZXRGaWxlQXJyYXk6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVVcmwoWydhc3NldHMnXS5jb25jYXQoYXNzZXRGaWxlQXJyYXkpLCBjdXJyZW50RGlyZWN0b3J5QXJyYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnRpYWxsIGFwcGxpZXMgYGdlbmVyYXRlVXJsKClgIGZvciBlYXNpZXIgcmVsYXRpdmUgVVJMIGdlbmVyYXRpb25cbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFVybEdlbmVyYXRvcih0YXJnZXRGaWxlQXJyYXk6IHN0cmluZ1tdKTogKGN1cnJlbnREaXJlY3RvcnlBcnJheT86IHN0cmluZ1tdKSA9PiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZVVybC5iaW5kKHRoaXMsIHRhcmdldEZpbGVBcnJheSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgVVJMIHRvIHRhcmdldCBmaWxlLCB0YWtlIGludG8gYWNjb3VudCBjdXJyZW50IGRpcmVjdG9yeSBhbmQgY29uZmlnIHNldHRpbmdzLCBzdWNoIGFzIHdoZXRoZXJcbiAgICAgKiBhYnNvbHV0ZSBVUkxzIGFyZSBlbmFibGVkLCBldGMuXG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHB1YmxpYyBmb3IgdW5pdCB0ZXN0aW5nIHB1cnBvc2VzLlxuICAgICAqXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHVibGljIGdlbmVyYXRlVXJsKHRhcmdldEZpbGVBcnJheTogc3RyaW5nW10sIGN1cnJlbnREaXJlY3RvcnlBcnJheTogc3RyaW5nW10gPSBbXSk6IHN0cmluZyB7XG4gICAgICAgIGxldCB1cmxBcnJheSA9IHRhcmdldEZpbGVBcnJheS5zbGljZSgwKTtcbiAgICAgICAgbGV0IHRhcmdldERpcmVjdG9yeUFycmF5ID0gdGFyZ2V0RmlsZUFycmF5LnNsaWNlKDAsIHRhcmdldEZpbGVBcnJheS5sZW5ndGggLSAxKTtcbiAgICAgICAgbGV0IGZpbGVOYW1lID0gdGFyZ2V0RmlsZUFycmF5LnNsaWNlKC0xKVswXTtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5leHBsaWNpdF9odG1sX2V4dGVuc2lvbnMpIHtcbiAgICAgICAgICAgIGxldCBsYXN0SWQgPSB0YXJnZXRGaWxlQXJyYXkubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRGaWxlQXJyYXlbbGFzdElkXSA9PT0gSU5ERVhfRklMRV9OQU1FKSB7XG4gICAgICAgICAgICAgICAgdXJsQXJyYXkucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFic29sdXRlX3VybHMpIHtcbiAgICAgICAgICAgIGxldCBhYnNvbHV0ZVVybCA9ICcnO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNpdGVfcm9vdCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlnLnNpdGVfcm9vdCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBhYnNvbHV0ZVVybCA9ICcvJyArIFV0aWwuc3RyaXBTbGFzaGVzKHRoaXMuY29uZmlnLnNpdGVfcm9vdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodXJsQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGFic29sdXRlVXJsID0gYWJzb2x1dGVVcmwgKyAnLycgKyB1cmxBcnJheS5qb2luKCcvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWJzb2x1dGVVcmwgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgYWJzb2x1dGVVcmwgPSAnLyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2l0ZV91cmwgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5zaXRlX3VybCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBhYnNvbHV0ZVVybCA9IHRoaXMuY29uZmlnLnNpdGVfdXJsICsgYWJzb2x1dGVVcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWJzb2x1dGVVcmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcmVsYXRpdmVVcmwgPSAnJztcbiAgICAgICAgICAgIGxldCBkaWZmZXJlbnRSb290ID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0TGVuZ3RoID0gdGFyZ2V0RGlyZWN0b3J5QXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRMZW5ndGggPSBjdXJyZW50RGlyZWN0b3J5QXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLm1heCh0YXJnZXRMZW5ndGgsIGN1cnJlbnRMZW5ndGgpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSB0YXJnZXRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aXZlVXJsICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVVcmwgPSAnLycgKyByZWxhdGl2ZVVybDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCA9ICcuLicgKyByZWxhdGl2ZVVybDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPj0gY3VycmVudExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmVVcmwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCA9IHJlbGF0aXZlVXJsICsgJy8nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVXJsID0gcmVsYXRpdmVVcmwgKyB0YXJnZXREaXJlY3RvcnlBcnJheVtpXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0RGlyZWN0b3J5QXJyYXlbaV0gIT09IGN1cnJlbnREaXJlY3RvcnlBcnJheVtpXSB8fCBkaWZmZXJlbnRSb290KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWZmZXJlbnRSb290ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZVVybCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCA9IHJlbGF0aXZlVXJsICsgJy8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVVcmwgPSByZWxhdGl2ZVVybCArIHRhcmdldERpcmVjdG9yeUFycmF5W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aXZlVXJsICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVXJsID0gJy8nICsgcmVsYXRpdmVVcmw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCA9ICcuLicgKyByZWxhdGl2ZVVybDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy5jb25maWcuZXhwbGljaXRfaHRtbF9leHRlbnNpb25zIHx8IGZpbGVOYW1lICE9PSBJTkRFWF9GSUxFX05BTUUpXG4gICAgICAgICAgICAgICAgJiYgdGFyZ2V0RmlsZUFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZVVybCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVVcmwgPSByZWxhdGl2ZVVybCArICcvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVsYXRpdmVVcmwgPSByZWxhdGl2ZVVybCArIGZpbGVOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICcuLycgKyByZWxhdGl2ZVVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBpbGVzIFB1ZyBmaWxlIG9yIHJldHVybnMgY29tcGlsZWQgZnVuY3Rpb24gZnJvbSBjYWNoZSBpZiB0aGUgZmlsZSBoYXMgYmVlbiBjb21waWxlZCBiZWZvcmVcbiAgICAgKiBAc2luY2UgMC4xLjMgIFJlbW92ZSB0cnkvY2F0Y2ggYmxvY2tcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbXBpbGVQdWcocGF0aDogc3RyaW5nKTogKGxvY2Fscz86IGFueSkgPT4gc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLnB1Z0NhY2hlW3BhdGhdKSB7XG4gICAgICAgICAgICB0aGlzLnB1Z0NhY2hlW3BhdGhdID0gcHVnLmNvbXBpbGVGaWxlKHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnB1Z0NhY2hlW3BhdGhdO1xuICAgIH1cbn1cbiJdfQ==
