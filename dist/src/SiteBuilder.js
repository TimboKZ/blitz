"use strict";
var path = require('path');
var pug = require('pug');
var objectAssign = require('object-assign');
var fse = require('fs-extra');
var ContentParser_1 = require('./ContentParser');
var Util_1 = require('./helpers/Util');
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
        var _loop_1 = function(fileName) {
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
            if (typeof state_1 === "object") return state_1.value;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQS9yQkEsQUErckJDLElBQUE7QUEvckJZLG1CQUFXLGNBK3JCdkIsQ0FBQSIsImZpbGUiOiJzcmMvU2l0ZUJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIEZpbGUgcmVzcG9uc2libGUgZm9yIGFsbCBpbnRlcmZhY2VzLCBjb25zdGFudHMgYW5kIGNsYXNzZXMgcmVsYXRlZCB0byBnZW5lcmF0aW5nIG9mIHRoZSBzdGF0aWMgc2l0ZVxuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMC4xXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHB1ZyBmcm9tICdwdWcnO1xuaW1wb3J0ICogYXMgb2JqZWN0QXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xuaW1wb3J0ICogYXMgZnNlIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7SUJsaXR6Q29uZmlnLCBJQmxpdHpDaGlsZERpcmVjdG9yeSwgSUJsaXR6UGFnZX0gZnJvbSAnLi9Db25maWdQYXJzZXInO1xuaW1wb3J0IHtDb250ZW50UGFyc2VyfSBmcm9tICcuL0NvbnRlbnRQYXJzZXInO1xuaW1wb3J0IHtVdGlsfSBmcm9tICcuL2hlbHBlcnMvVXRpbCc7XG5cbi8qKlxuICogQ29uc3RhbnRzIGluZGljYXRpbmcgdGhlIGxvY2F0aW9ucyBvZiBhc3NldHMsIGNvbnRlbnQgYW5kIHRlbXBsYXRlc1xuICogQHNpbmNlIDAuMC4xXG4gKi9cbmNvbnN0IEFTU0VUU19ESVJFQ1RPUlkgPSAnYXNzZXRzJztcbmNvbnN0IEJVSUxEX0FTU0VUU19ESVJFQ1RPUlkgPSAnYXNzZXRzJztcbmNvbnN0IENPTlRFTlRfRElSRUNUT1JZID0gJ2NvbnRlbnQnO1xuY29uc3QgVEVNUExBVEVTX0RJUkVDVE9SWSA9ICd0ZW1wbGF0ZXMnO1xuXG4vKipcbiAqIEluZGV4IGZpbGUgbmFtZSBpbiBjYXNlIHNvbWVvbmUgdXNlcyBhIHZhbHVlIG90aGVyIHRoYW4gYGluZGV4Lmh0bWxgXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuY29uc3QgSU5ERVhfRklMRV9OQU1FID0gJ2luZGV4Lmh0bWwnO1xuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgQmxpdHogZmlsZSBvZiB0aGUgc3RhdGljIHNpdGUsIGFzIHNlZW4gaW4gdGhlIG1hcFxuICogQHNpbmNlIDAuMC4xXG4gKi9cbmludGVyZmFjZSBJQmxpdHpNYXBGaWxlIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdXJsOiAoY3VycmVudERpcmVjdG9yeUFycmF5Pzogc3RyaW5nW10pID0+IHN0cmluZztcbiAgICBjb250ZW50RGF0YTogYW55O1xuICAgIGJsaXR6RGF0YTogYW55O1xuICAgIGdlbmVyYXRvcjogKGxvY2Fscz86IGFueSkgPT4gc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgQmxpdHogZGlyZWN0b3J5IG9mIHRoZSBzdGF0aWMgc2l0ZSwgYXMgc2VlbiBpbiB0aGUgbWFwXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuaW50ZXJmYWNlIElCbGl0ek1hcERpcmVjdG9yeSB7XG4gICAgZGlyZWN0b3JpZXM/OiB7XG4gICAgICAgIFtuYW1lOiBzdHJpbmddOiBJQmxpdHpNYXBEaXJlY3Rvcnk7XG4gICAgfTtcbiAgICBmaWxlcz86IHtcbiAgICAgICAgW25hbWU6IHN0cmluZ106IElCbGl0ek1hcEZpbGU7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2VzIGZvciBtZW51cyBiZWZvcmUgcHJvY2Vzc2luZ1xuICogQHNpbmNlIDAuMC4xXG4gKi9cbmludGVyZmFjZSBJQmxpdHpNYXBNZW51SXRlbSB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICB1cmw6IChjdXJyZW50RGlyZWN0b3J5QXJyYXk/OiBzdHJpbmdbXSkgPT4gc3RyaW5nO1xuICAgIGZpbGVOYW1lPzogc3RyaW5nO1xuICAgIGRpcmVjdG9yeUFycmF5Pzogc3RyaW5nW107XG4gICAgYWN0aXZlOiBib29sZWFuO1xufVxuaW50ZXJmYWNlIElCbGl0ek1hcE1lbnVzIHtcbiAgICBbbmFtZTogc3RyaW5nXTogSUJsaXR6TWFwTWVudUl0ZW1bXTtcbn1cblxuLyoqXG4gKiBQYWdlIG1lbnUgaW50ZXJmYWNlXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuaW50ZXJmYWNlIElCbGl0elBhZ2VNZW51SXRlbSB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbiAgICBhY3RpdmU6IGJvb2xlYW47XG59XG5pbnRlcmZhY2UgSUJsaXR6UGFnZU1lbnVzIHtcbiAgICBbbmFtZTogc3RyaW5nXTogSUJsaXR6UGFnZU1lbnVJdGVtW107XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBVUkwgZ2VuZXJhdG9ycyBhc3NpZ25lZCB0byBJRHNcbiAqIEBzaW5jZSAwLjEuMFxuICovXG5pbnRlcmZhY2UgSUJsaXR6UGFnZVVSTHMge1xuICAgIFtpZDogc3RyaW5nXTogKGN1cnJlbnREaXJlY3RvcnlBcnJheT86IHN0cmluZ1tdKSA9PiBzdHJpbmc7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBwcm9jZXNzZWQgVVJMcyBhc3NpZ25lZCB0byBJRHNcbiAqIEBzaW5jZSAwLjEuMFxuICovXG5pbnRlcmZhY2UgSUJsaXR6UHJvY2Vzc2VkUGFnZVVSTHMge1xuICAgIFtpZDogc3RyaW5nXTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFBhZ2UgY29udGVudCBkYXRhIHdpdGggaW5zZXJ0ZWQgVVJMXG4gKiBAc2luY2UgMC4xLjIgQWRkZWQgYGZpbGVgLCBjaGFuZ2VkIHR5cGUgb2YgdmFsdWVzIGZyb20gYHN0cmluZ2AgdG8gYGFueWBcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5pbnRlcmZhY2UgSUJsaXR6UHJvY2Vzc2VkUGFnZSB7XG4gICAgdXJsOiAoY3VycmVudERpcmVjdG9yeUFycmF5Pzogc3RyaW5nW10pID0+IHN0cmluZztcbiAgICBmaWxlOiBzdHJpbmc7XG4gICAgY29udGVudDogc3RyaW5nO1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuLyoqXG4gKiBQdWcgY2FjaGUgaW50ZXJmYWNlXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuaW50ZXJmYWNlIElQdWdDYWNoZSB7XG4gICAgW3BhdGg6IHN0cmluZ106IChsb2NhbHM/OiBhbnkpID0+IHN0cmluZztcbn1cblxuLyoqXG4gKiBAY2xhc3MgQSBjbGFzcy5cbiAqIEBzaW5jZSAwLjAuMVxuICovXG5leHBvcnQgY2xhc3MgU2l0ZUJ1aWxkZXIge1xuICAgIC8qKlxuICAgICAqIExvYWRlZCBCbGl0eiBjb25maWdcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbmZpZzogSUJsaXR6Q29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogUm9vdCBkaXJlY3Rvcnkgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIHByb2plY3RQYXRoOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBEaXJlY3RvcnkgaW4gd2hpY2ggdGhlIG5ld2x5IGdlbmVyYXRlZCBmaWxlcyB3aWxsIGJlIHBsYWNlZFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgYnVpbGRQYXRoOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBBYnNvbHV0ZSBwYXRocyB0byBsb2NhdGlvbnMsIGNvbnRlbnQgYW5kIHRlbXBsYXRlcyBkaXJlY3Rvcmllc1xuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgYXNzZXRzUGF0aDogc3RyaW5nO1xuICAgIHByaXZhdGUgY29udGVudFBhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIHRlbXBsYXRlc1BhdGg6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFJhbmRvbWx5IGdlbmVyYXRlZCBoYXNoIHRoYXQgY2FuIGJlIHVzZWQgdG8gYnlwYXNzIGJyb3dzZXIgY2FjaGVcbiAgICAgKiBAc2luY2UgMC4xLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1aWxkSGFzaDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogU2l0ZSBtYXAgdGhhdCB3aWxsIGJlIHVzZWQgdG8gYnVpbGQgc3RhdGljIGZpbGVzIGZvciB0aGUgd2Vic2l0ZS4gSXQgd2lsbCBiZSBnZW5lcmF0ZWQgYmVmb3JlaGFuZC5cbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIHNpdGVNYXA6IElCbGl0ek1hcERpcmVjdG9yeTtcblxuICAgIC8qKlxuICAgICAqIFVSTCBnZW5lcmF0b3JzIGZvciBwYWdlcyB3aXRoIElEcyBzcGVjaWZpZWRcbiAgICAgKiBAc2luY2UgMC4xLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHBhZ2VVcmxzOiBJQmxpdHpQYWdlVVJMcyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogT2JqZWN0IGhvbGRpbmcgYWxsIG1lbnVzIGdlbmVyYXRlZCBmcm9tIHRoZSBjb25maWdcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwcml2YXRlIG1lbnVzOiBJQmxpdHpNYXBNZW51cyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ2FjaGUgb2YgY29tcGlsZWQgUHVnIGZ1bmN0aW9uc1xuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgcHVnQ2FjaGU6IElQdWdDYWNoZSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogU2l0ZUJ1aWxkZXIgY29uc3RydWN0b3IuXG4gICAgICogQHNpbmNlIDAuMS4wIE5vdyBhbHNvIGdlbmVyYXRlcyBhIHJhbmRvbVN0cmluZyBzdHJpbmcgZm9yIGBidWlsZEhhc2hgXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogSUJsaXR6Q29uZmlnLCBwcm9qZWN0UGF0aDogc3RyaW5nLCBidWlsZERpcmVjdG9yeTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLnByb2plY3RQYXRoID0gcHJvamVjdFBhdGg7XG4gICAgICAgIHRoaXMuYnVpbGRQYXRoID0gcGF0aC5qb2luKHByb2plY3RQYXRoLCBidWlsZERpcmVjdG9yeSk7XG4gICAgICAgIHRoaXMuYXNzZXRzUGF0aCA9IHBhdGguam9pbihwcm9qZWN0UGF0aCwgQVNTRVRTX0RJUkVDVE9SWSk7XG4gICAgICAgIHRoaXMuY29udGVudFBhdGggPSBwYXRoLmpvaW4ocHJvamVjdFBhdGgsIENPTlRFTlRfRElSRUNUT1JZKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXNQYXRoID0gcGF0aC5qb2luKHByb2plY3RQYXRoLCBURU1QTEFURVNfRElSRUNUT1JZKTtcbiAgICAgICAgdGhpcy5idWlsZEhhc2ggPSBVdGlsLmdlbmVyYXRlUmFuZG9tU3RyaW5nKDEyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSB0YXJnZXQgZGlyZWN0b3J5IGlmIGl0IGRvZXNuJ3QgZXhpc3QgYW5kIGJlZ2lucyB0aGUgYnVpbGRpbmcgcHJvY2Vzc1xuICAgICAqIEBzaW5jZSAwLjEuNCBOb3cgaWdub3JlcyBhc3NldHMgaWYgYGFzc2V0c2AgZm9sZGVyIGRvZXNuJ3QgZXhpc3RcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwdWJsaWMgYnVpbGQoKSB7XG4gICAgICAgIGlmICghVXRpbC5yZW1vdmVEaXJlY3RvcnkodGhpcy5idWlsZFBhdGgpKSB7XG4gICAgICAgICAgICBVdGlsLmVycm9yKCdDb3VsZCBub3QgcmVtb3ZlIHRoZSBleGlzdGluZyBidWlsZCBkaXJlY3RvcnkgKG9yIGNoZWNrIHRoYXQgaXQgZXhpc3RzKSEnKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFVdGlsLmNyZWF0ZURpcmVjdG9yeSh0aGlzLmJ1aWxkUGF0aCkpIHtcbiAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0NvdWxkIG5vdCBjcmVhdGUgdGhlIGRpcmVjdG9yeSBmb3IgdGhlIGJ1aWxkIScpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbC5wYXRoRXhpc3RzKHRoaXMuYXNzZXRzUGF0aCkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZnNlLmNvcHlTeW5jKHRoaXMuYXNzZXRzUGF0aCwgcGF0aC5qb2luKHRoaXMuYnVpbGRQYXRoLCBCVUlMRF9BU1NFVFNfRElSRUNUT1JZKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBVdGlsLmVycm9yKCdDb3VsZCBub3QgY29weSBhc3NldHMgaW50byB0aGUgYnVpbGQgZm9sZGVyIScpO1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBVdGlsLmRlYnVnKCdBc3NldHMgZm9sZGVyIGRvZXMgbm90IGV4aXN0LCBub3QgY29weWluZyBhbnkgYXNzZXRzLicpO1xuICAgICAgICB9XG4gICAgICAgIFV0aWwuZGVidWcoJ0dlbmVyYXRpbmcgc2l0ZSBtYXAgLiAuIC4gJyk7XG4gICAgICAgIGlmICghdGhpcy5wcmVwYXJlTWFwKCkpIHtcbiAgICAgICAgICAgIFV0aWwuZXJyb3IoJ01hcCBnZW5lcmF0aW9uIGZhaWxlZCEnKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgVXRpbC5kZWJ1ZygnU2l0ZSBtYXAgZ2VuZXJhdGVkIScpO1xuICAgICAgICBVdGlsLmRlYnVnKCdCdWlsZGluZyBzaXRlIC4gLiAuICcpO1xuICAgICAgICBpZiAoIXRoaXMuYnVpbGRTaXRlKCkpIHtcbiAgICAgICAgICAgIFV0aWwuZXJyb3IoJ1NpdGUgYnVpbGRpbmcgZmFpbGVkIScpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBVdGlsLmxvZygnU2l0ZSBidWlsdCBzdWNjZXNzZnVsbHkhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgb3ZlciBhbGwgcGFnZXMgYW5kIGRpcmVjdG9yaWVzIHNwZWNpZmllZCBpbiB0aGUgY29uZmlnLCBnZW5lcmF0aW5nIG1lbnVzLCBwcmVwYXJpbmcgUHVnIGZpbGVzLCBldGMuXG4gICAgICpcbiAgICAgKiBJZiB1cmkgaXMgbm90IHNwZWNpZmllZCwgZmlsZSBuYW1lIGZyb20gdGhlIGBjb250ZW50YCBwcm9wZXJ0eSB3aWxsIGJlIHVzZWRcbiAgICAgKlxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgcHJlcGFyZU1hcCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHBhZ2VzID0gdGhpcy5jb25maWcucGFnZXM7XG4gICAgICAgIGxldCBwYWdlQ291bnQgPSBwYWdlcy5sZW5ndGg7XG4gICAgICAgIGxldCBtYXA6IElCbGl0ek1hcERpcmVjdG9yeSA9IHtcbiAgICAgICAgICAgIGRpcmVjdG9yaWVzOiB7fSxcbiAgICAgICAgICAgIGZpbGVzOiB7fSxcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBhZ2VEYXRhID0gdGhpcy5wYXJzZUNvbmZpZ1BhZ2UocGFnZXNbaV0sIG1hcCk7XG4gICAgICAgICAgICBpZiAocGFnZURhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0NvdWxkIG5vdCBjcmVhdGUgbWFwLCBmYWlsZWQgb24gcGFnZSB3aXRoIFVSSSBgJyArIHBhZ2VEYXRhLnVybCArICdgIScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNpdGVNYXAgPSBtYXA7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyB0aGUgc2l0ZSB1c2luZyB0aGUgcHJldmlvdXNseSBnZW5lcmF0ZWQgbWFwIGFuZCBtZW51c1xuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgYnVpbGRTaXRlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZERpcmVjdG9yeSh0aGlzLnNpdGVNYXApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyBhbGwgZmlsZXMgaW4gYSBkaXJlY3RvcnksIHJlY3Vyc2l2ZWx5XG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFsc28gcHJvY2Vzc2VzIG1lbnVzLCB1cGRhdGluZyByZWxhdGl2ZSBsaW5rcyAoaWYgYW55KSBhbmQgbWFya2luZyBjdXJyZW50IHBhZ2UgYXMgYWN0aXZlXG4gICAgICpcbiAgICAgKiBAc2luY2UgMC4xLjQgTm93IGRvZXMgbm90IGNyZWF0ZSBkaXJlY3RvcmllcyBpZiB0aGV5IGhhdmUgbm8gY2hpbGRyZW5cbiAgICAgKiBAc2luY2UgMC4xLjAgUHJvY2Vzc2VzIFVSTHMgaW4gYHBhZ2VVcmxzYCBhbmQgcGFzc2VzIGB1cmwoKWAgdG8gUHVnIGxvY2Fsc1xuICAgICAqIEBzaW5jZSAwLjEuMCBQYXNzZXMgYGJ1aWxkSGFzaGAgYXMgYGhhc2hgIHRvIGxvY2FscyBvbiBldmVyeSBwYWdlXG4gICAgICogQHNpbmNlIDAuMS4wIFBhc3NlcyBgaW5kZXhgIHRvIGxvY2FscywgdGhlIGFic29sdXRlL3JlbGF0aXZlIFVSTCB0byB0aGUgaW5kZXggcGFnZVxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgYnVpbGREaXJlY3RvcnkoZGlyZWN0b3J5OiBJQmxpdHpNYXBEaXJlY3RvcnksIGN1cnJlbnREaXJlY3RvcnlBcnJheTogc3RyaW5nW10gPSBbXSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIGZvciAobGV0IGZpbGVOYW1lIGluIGRpcmVjdG9yeS5maWxlcykge1xuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeS5maWxlcy5oYXNPd25Qcm9wZXJ0eShmaWxlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IGRpcmVjdG9yeS5maWxlc1tmaWxlTmFtZV07XG4gICAgICAgICAgICAgICAgbGV0IGZpbGVBcnJheSA9IGN1cnJlbnREaXJlY3RvcnlBcnJheS5zbGljZSgwKS5jb25jYXQoW2ZpbGUubmFtZV0pO1xuICAgICAgICAgICAgICAgIGxldCBwYWdlVXJsID0gdGhpcy5nZW5lcmF0ZVVybChmaWxlQXJyYXksIGN1cnJlbnREaXJlY3RvcnlBcnJheSk7XG5cbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIG1lbnVzXG4gICAgICAgICAgICAgICAgbGV0IHByb2Nlc3NlZE1lbnVzOiBJQmxpdHpQYWdlTWVudXMgPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBtZW51TmFtZSBpbiB0aGlzLm1lbnVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnVzLmhhc093blByb3BlcnR5KG1lbnVOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lbnUgPSB0aGlzLm1lbnVzW21lbnVOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtQ291bnQgPSBtZW51Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzZWRNZW51ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1Db3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBtZW51W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBpdGVtLnVybCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmRpcmVjdG9yeUFycmF5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gaXRlbS5kaXJlY3RvcnlBcnJheTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZmlsZU5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkgPSBhcnJheS5jb25jYXQoW2l0ZW0uZmlsZU5hbWVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmdlbmVyYXRlVXJsKGFycmF5LCBjdXJyZW50RGlyZWN0b3J5QXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aXZlID0gZmlsZS51cmwoKSA9PT0gaXRlbS51cmwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRNZW51LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRNZW51c1ttZW51TmFtZV0gPSBwcm9jZXNzZWRNZW51O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBVUkxzIGluIEJsaXR6IGRhdGEsIHdoaWxlIGFsc28gcGFja2luZyBhbGwgY2hpbGRyZW4gaW50byBgY2hpbGRQYWdlc2AgYW5kIGBjaGlsZERpcmVjdG9yaWVzYFxuICAgICAgICAgICAgICAgIGxldCBjaGlsZFBhZ2VzID0gW107XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVkQ2hpbGRQYWdlcyA9IHt9O1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZERpcmVjdG9yaWVzID0gW107XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVkQ2hpbGREaXJlY3RvcmllcyA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGRhdGFLZXkgaW4gZmlsZS5ibGl0ekRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUuYmxpdHpEYXRhLmhhc093blByb3BlcnR5KGRhdGFLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleSA9PT0gJ3VybCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XSA9IGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldKGN1cnJlbnREaXJlY3RvcnlBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YVZhbHVlID0gZmlsZS5ibGl0ekRhdGFbZGF0YUtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGFWYWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUxlbmd0aCA9IGRhdGFWYWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFWYWx1ZVtpXS51cmwgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZGF0YVZhbHVlW2ldLnVybCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5ibGl0ekRhdGFbZGF0YUtleV1baV0udXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBmaWxlLmJsaXR6RGF0YVtkYXRhS2V5XVtpXS51cmwoY3VycmVudERpcmVjdG9yeUFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleSAhPT0gJ3BhcmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGREaXJlY3Rvcmllcy5wdXNoKGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZWRDaGlsZERpcmVjdG9yaWVzW2RhdGFLZXldID0gZmlsZS5ibGl0ekRhdGFbZGF0YUtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YVZhbHVlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVZhbHVlLnVybCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBkYXRhVmFsdWUudXJsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldLnVybCA9IGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldLnVybChjdXJyZW50RGlyZWN0b3J5QXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleSAhPT0gJ3BhcmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRQYWdlcy5wdXNoKGZpbGUuYmxpdHpEYXRhW2RhdGFLZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZWRDaGlsZFBhZ2VzW2RhdGFLZXldID0gZmlsZS5ibGl0ekRhdGFbZGF0YUtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVVJMIHRvIGluZGV4IHBhZ2VcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXhBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5leHBsaWNpdF9odG1sX2V4dGVuc2lvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhBcnJheS5wdXNoKCdpbmRleC5odG1sJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBVUkwgZ2VuZXJhdG9ycyBhc3NpZ25lZCB0byBJRHMgYW5kIHByZXBhcmUgdGhlIGB1cmxgIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgbGV0IHByb2Nlc3NlZFBhZ2VVcmxzOiBJQmxpdHpQcm9jZXNzZWRQYWdlVVJMcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZ2VuZXJhdGVVcmwoaW5kZXhBcnJheSwgY3VycmVudERpcmVjdG9yeUFycmF5KSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHBhZ2VJRCBpbiB0aGlzLnBhZ2VVcmxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VVcmxzLmhhc093blByb3BlcnR5KHBhZ2VJRCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZFBhZ2VVcmxzW3BhZ2VJRF0gPSB0aGlzLnBhZ2VVcmxzW3BhZ2VJRF0oY3VycmVudERpcmVjdG9yeUFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gKHBhZ2VJRD86IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFnZUlEID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWdlVXJsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzZWRQYWdlVXJsc1twYWdlSURdO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBjb2RlXG4gICAgICAgICAgICAgICAgbGV0IGFzc2V0VXJsR2VuZXJhdG9yID0gdGhpcy5nZW5lcmF0ZUFzc2V0VXJsLmJpbmQodGhpcywgY3VycmVudERpcmVjdG9yeUFycmF5KTtcbiAgICAgICAgICAgICAgICBmaWxlLmNvbnRlbnREYXRhLmNvbnRlbnQgPSBmaWxlLmNvbnRlbnREYXRhLmNvbnRlbnQucmVwbGFjZSgvJSVhc3NldCUlLio/JSUvZywgKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHJpcHBlZFN0cmluZyA9IG1hdGNoLnJlcGxhY2UoL14lJWFzc2V0JSUvLCAnJykucmVwbGFjZSgvJSUkLywgJycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXNzZXRVcmxHZW5lcmF0b3Ioc3RyaXBwZWRTdHJpbmcpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxvY2FscyA9IG9iamVjdEFzc2lnbihcbiAgICAgICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmdsb2JhbHMsXG4gICAgICAgICAgICAgICAgICAgIGZpbGUuY29udGVudERhdGEsXG4gICAgICAgICAgICAgICAgICAgIGZpbGUuYmxpdHpEYXRhLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9wYWdlczogY2hpbGRQYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX2RpcmVjdG9yaWVzOiBjaGlsZERpcmVjdG9yaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZWRfY2hpbGRfcGFnZXM6IG5hbWVkQ2hpbGRQYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVkX2NoaWxkX2RpcmVjdG9yaWVzOiBuYW1lZENoaWxkRGlyZWN0b3JpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNoOiB0aGlzLmJ1aWxkSGFzaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVzOiBwcm9jZXNzZWRNZW51cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0OiBhc3NldFVybEdlbmVyYXRvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVfdXJsOiB0aGlzLmNvbmZpZy5zaXRlX3VybCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpdGVfcm9vdDogdGhpcy5jb25maWcuc2l0ZV9yb290LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGlmICghVXRpbC53cml0ZUZpbGVGcm9tQXJyYXkodGhpcy5idWlsZFBhdGgsIGZpbGVBcnJheSwgZmlsZS5nZW5lcmF0b3IobG9jYWxzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5lcnJvcignQ291bGQgbm90IHdyaXRlIGZpbGUgZnJvbSBhcnJheSEnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGRpcmVjdG9yeU5hbWUgaW4gZGlyZWN0b3J5LmRpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5LmRpcmVjdG9yaWVzLmhhc093blByb3BlcnR5KGRpcmVjdG9yeU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpcmVjdG9yeURhdGEgPSBkaXJlY3RvcnkuZGlyZWN0b3JpZXNbZGlyZWN0b3J5TmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNFbXB0eShkaXJlY3RvcnlEYXRhLmZpbGVzKSAmJiBVdGlsLmlzRW1wdHkoZGlyZWN0b3J5RGF0YS5kaXJlY3RvcmllcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBkaXJlY3RvcnlBcnJheSA9IGN1cnJlbnREaXJlY3RvcnlBcnJheS5zbGljZSgwKS5jb25jYXQoW2RpcmVjdG9yeU5hbWVdKTtcbiAgICAgICAgICAgICAgICBsZXQgZGlyZWN0b3J5UGF0aCA9IHBhdGguam9pbi5hcHBseSh1bmRlZmluZWQsIGRpcmVjdG9yeUFycmF5KTtcbiAgICAgICAgICAgICAgICBpZiAoIVV0aWwuY3JlYXRlRGlyZWN0b3J5KHBhdGguam9pbih0aGlzLmJ1aWxkUGF0aCwgZGlyZWN0b3J5UGF0aCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0NvdWxkIG5vdCBjcmVhdGUgZGlyZWN0b3J5IGZvciB0aGUgYnVpbGQhJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZERpcmVjdG9yeShkaXJlY3RvcnlEYXRhLCBkaXJlY3RvcnlBcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBwYWdlIGZyb20gdGhlIGNvbmZpZyBpbnNlcnRpbmcgaW50byB0aGUgc2l0ZSBtYXBcbiAgICAgKiBAc2luY2UgMC4xLjAgU2F2ZXMgVVJMIGdlbmVyYXRvciBmb3IgcGFnZXMgd2l0aCBJRHMgdG8gYHBhZ2VVcmxzYFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgcGFyc2VDb25maWdQYWdlKHBhZ2U6IElCbGl0elBhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RGlyZWN0b3J5OiBJQmxpdHpNYXBEaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VXJpQ29tcG9uZW50czogc3RyaW5nW10gPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ/OiBJQmxpdHpQcm9jZXNzZWRQYWdlKTogSUJsaXR6UHJvY2Vzc2VkUGFnZSB7XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgZmlsZSBhbmQgZGlyZWN0b3J5IGFycmF5cyBhbmQgZXh0cmFjdCBmaWxlbmFtZVxuICAgICAgICBsZXQgb3duVXJpQ29tcG9uZW50cztcbiAgICAgICAgaWYgKHBhZ2UudXJpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBmaWxlTmFtZVNvdXJjZTtcbiAgICAgICAgICAgIGlmIChwYWdlLmNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lU291cmNlID0gcGFnZS50ZW1wbGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWVTb3VyY2UgPSBwYWdlLmNvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvd25VcmlDb21wb25lbnRzID0gW1V0aWwuZXh0cmFjdEZpbGVOYW1lKGZpbGVOYW1lU291cmNlKV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvd25VcmlDb21wb25lbnRzID0gVXRpbC5nZXRVcmlDb21wb25lbnRzKHBhZ2UudXJpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVSSSBjb21wb25lbnRzIHdpdGhvdXQgdGhlIHBhcmVudFxuICAgICAgICBsZXQgcGFydGlhbEZpbGVBcnJheSA9IHRoaXMuZ2VuZXJhdGVGaWxlQXJyYXkob3duVXJpQ29tcG9uZW50cyk7XG4gICAgICAgIGxldCBwYXJ0aWFsRGlyZWN0b3J5QXJyYXkgPSBwYXJ0aWFsRmlsZUFycmF5LnNsaWNlKDAsIHBhcnRpYWxGaWxlQXJyYXkubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgLy8gVVJJIGNvbXBvbmVudHMgd2l0aCB0aGUgcGFyZW50XG4gICAgICAgIGxldCBmdWxsVXJpQ29tcG9uZW50cyA9IHBhcmVudFVyaUNvbXBvbmVudHMuc2xpY2UoMCkuY29uY2F0KG93blVyaUNvbXBvbmVudHMpO1xuICAgICAgICBsZXQgZmlsZUFycmF5ID0gdGhpcy5nZW5lcmF0ZUZpbGVBcnJheShmdWxsVXJpQ29tcG9uZW50cyk7XG4gICAgICAgIGxldCBkaXJlY3RvcnlBcnJheSA9IGZpbGVBcnJheS5zbGljZSgwLCBmaWxlQXJyYXkubGVuZ3RoIC0gMSk7XG4gICAgICAgIGxldCBmaWxlTmFtZSA9IGZpbGVBcnJheVtmaWxlQXJyYXkubGVuZ3RoIC0gMV07XG4gICAgICAgIGxldCBmaWxlTmFtZVdpdGhvdXRFeHRlbnNpb24gPSBVdGlsLmV4dHJhY3RGaWxlTmFtZShmaWxlTmFtZSk7XG4gICAgICAgIGxldCB1cmxHZW5lcmF0b3IgPSB0aGlzLmdldFVybEdlbmVyYXRvcihmaWxlQXJyYXkpO1xuXG4gICAgICAgIGxldCBjdXJyZW50UGFnZURpcmVjdG9yeSA9IHRoaXMuZGVzY2VuZFRvRGlyZWN0b3J5KHBhcmVudERpcmVjdG9yeSwgcGFydGlhbERpcmVjdG9yeUFycmF5KTtcbiAgICAgICAgbGV0IGNoaWxkcmVuRGlyZWN0b3J5ID0gdGhpcy5kZXNjZW5kVG9EaXJlY3RvcnkocGFyZW50RGlyZWN0b3J5LCBvd25VcmlDb21wb25lbnRzKTtcblxuICAgICAgICAvLyBFeHRyYWN0IGNvbnRlbnQgYW5kIHByZXBhcmUgcHVnXG4gICAgICAgIC8vIElmIHBhc3NlZCBgY29udGVudGAgaXMgYSBzdHJpbmcsIHVzZSBpdCBhcyBwYXRoIHRvIGNvbXBpbGUgUHVnLCBvdGhlcndpc2UgdXNlIGBjb250ZW50YCBvYmplY3QgYXMgaXNcbiAgICAgICAgbGV0IHBhZ2VDb250ZW50OiBhbnkgPSBwYWdlLmNvbnRlbnQ7XG4gICAgICAgIGlmIChwYWdlQ29udGVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYWdlQ29udGVudCA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYWdlLmNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwYWdlQ29udGVudCA9IENvbnRlbnRQYXJzZXIucGFyc2VGaWxlKHBhdGguam9pbih0aGlzLmNvbnRlbnRQYXRoLCBwYWdlLmNvbnRlbnQpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHVnRnVuY3Rpb24gPSB0aGlzLmNvbXBpbGVQdWcocGF0aC5qb2luKHRoaXMudGVtcGxhdGVzUGF0aCwgcGFnZS50ZW1wbGF0ZSkpO1xuICAgICAgICBpZiAocGFnZUNvbnRlbnQgPT09IHVuZGVmaW5lZCB8fCBwdWdGdW5jdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBVdGlsLmVycm9yKCdDb3VsZCBub3QgZXh0cmFjdCBjb250ZW50IGFuZCBjb21waWxlIFB1ZyEnKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGVkIGEgcHJvY2Vzc2VkIHBhZ2UgZGF0YSBvYmplY3RcbiAgICAgICAgbGV0IHByb2Nlc3NlZFBhZ2VEYXRhOiBJQmxpdHpQcm9jZXNzZWRQYWdlID0gb2JqZWN0QXNzaWduKHt9LCBwYWdlQ29udGVudCwge3VybDogdXJsR2VuZXJhdG9yfSk7XG5cbiAgICAgICAgLy8gUmVjb3JkIFVSTCBnZW5lcmF0b3IgaWYgdGhlIHBhZ2UgaGFzIGFuIElEXG4gICAgICAgIGlmIChwYWdlLmlkKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VVcmxzW3BhZ2UuaWRdID0gdXJsR2VuZXJhdG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0dXAgQmxpdHogZGF0YSB0aGF0IHdpbGwgYmUgZXh0cmFjdGVkIGZyb20gY2hpbGRyZW5cbiAgICAgICAgbGV0IGJsaXR6RGF0YSA9IHtcbiAgICAgICAgICAgIHVybDogdXJsR2VuZXJhdG9yLFxuICAgICAgICAgICAgcGFyZW50LFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFwcGVuZCBkYXRhIHRvIG1lbnUgaWYgbmVlZGVkXG4gICAgICAgIGlmIChwYWdlLm1lbnVzKSB7XG4gICAgICAgICAgICBsZXQgbWVudUNvdW50ID0gcGFnZS5tZW51cy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1lbnVDb3VudDsgaysrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1lbnUgPSBwYWdlLm1lbnVzW2tdO1xuICAgICAgICAgICAgICAgIGxldCBtZW51VGl0bGUgPSBmaWxlTmFtZVdpdGhvdXRFeHRlbnNpb247XG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VDb250ZW50Lm1lbnVfdGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVudVRpdGxlID0gcGFnZUNvbnRlbnQubWVudV90aXRsZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1lbnUudGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVudVRpdGxlID0gbWVudS50aXRsZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhZ2VDb250ZW50LnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnVUaXRsZSA9IHBhZ2VDb250ZW50LnRpdGxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51c1ttZW51Lm5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51c1ttZW51Lm5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBtZW51SXRlbTogSUJsaXR6TWFwTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBtZW51VGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsR2VuZXJhdG9yLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5hYnNvbHV0ZV91cmxzKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtLmRpcmVjdG9yeUFycmF5ID0gZGlyZWN0b3J5QXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5leHBsaWNpdF9odG1sX2V4dGVuc2lvbnMgfHwgZmlsZU5hbWUgIT09IElOREVYX0ZJTEVfTkFNRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW0uZmlsZU5hbWUgPSBmaWxlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVzW21lbnUubmFtZV0ucHVzaChtZW51SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYXJzZSBjaGlsZCBwYWdlc1xuICAgICAgICBpZiAocGFnZS5jaGlsZF9wYWdlcyAmJiBwYWdlLmNoaWxkX3BhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBwYWdlQ291bnQgPSBwYWdlLmNoaWxkX3BhZ2VzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGRQYWdlID0gcGFnZS5jaGlsZF9wYWdlc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGREYXRhID0gdGhpcy5wYXJzZUNvbmZpZ1BhZ2UoXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5EaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxVcmlDb21wb25lbnRzLFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZWRQYWdlRGF0YVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0ZhaWxlZCBwYXJzaW5nIGNoaWxkIHBhZ2UhJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJsaXR6RGF0YVtjaGlsZFBhZ2UubmFtZV0gPSBjaGlsZERhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYXJzZSBjaGlsZCBkaXJlY3Rvcmllc1xuICAgICAgICBpZiAocGFnZS5jaGlsZF9kaXJlY3RvcmllcyAmJiBwYWdlLmNoaWxkX2RpcmVjdG9yaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBjaGlsZERpcmVjdG9yeUNvdW50ID0gcGFnZS5jaGlsZF9kaXJlY3Rvcmllcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkRGlyZWN0b3J5Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZERpcmVjdG9yeSA9IHBhZ2UuY2hpbGRfZGlyZWN0b3JpZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkRGF0YSA9IHRoaXMucGFyc2VDb25maWdEaXJlY3RvcnkoXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbkRpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICAgICAgZnVsbFVyaUNvbXBvbmVudHMsXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZFBhZ2VEYXRhXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGREYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5lcnJvcignRmFpbGVkIHBhcnNpbmcgY2hpbGQgZGlyZWN0b3J5IScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBibGl0ekRhdGFbY2hpbGREaXJlY3RvcnkubmFtZV0gPSBjaGlsZERhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZW5lcmF0ZSBmaWxlIGRhdGEgZm9yIHRoZSBtYXAgYW5kIGFwcGVuZCBpdCB0byBzYWlkIG1hcFxuICAgICAgICBsZXQgZmlsZURhdGE6IElCbGl0ek1hcEZpbGUgPSB7XG4gICAgICAgICAgICBuYW1lOiBmaWxlTmFtZSxcbiAgICAgICAgICAgIHVybDogdXJsR2VuZXJhdG9yLFxuICAgICAgICAgICAgY29udGVudERhdGE6IHBhZ2VDb250ZW50LFxuICAgICAgICAgICAgYmxpdHpEYXRhLFxuICAgICAgICAgICAgZ2VuZXJhdG9yOiBwdWdGdW5jdGlvbixcbiAgICAgICAgfTtcbiAgICAgICAgY3VycmVudFBhZ2VEaXJlY3RvcnkuZmlsZXNbZmlsZURhdGEubmFtZV0gPSBmaWxlRGF0YTtcblxuICAgICAgICAvLyBSZXR1cm4gcGFnZSBkYXRhIHRvIHBhcmVudFxuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkUGFnZURhdGE7XG5cbiAgICB9XG5cbiAgICAvKiogUGFyc2VzIGEgcGFnZSBmcm9tIHRoZSBjb25maWcgaW5zZXJ0aW5nIGludG8gdGhlIHNpdGUgbWFwXG4gICAgICogQHNpbmNlIDAuMS4wIE5vdyBvbmx5IHBhcnNlcyBjaGlsZCBjb25maWcgcGFnZXMgaWYgYGRpcmVjdG9yeS50ZW1wbGF0ZWAgaXMgc2V0XG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXJzZUNvbmZpZ0RpcmVjdG9yeShkaXJlY3Rvcnk6IElCbGl0ekNoaWxkRGlyZWN0b3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RGlyZWN0b3J5OiBJQmxpdHpNYXBEaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRVcmlDb21wb25lbnRzOiBzdHJpbmdbXSA9IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50PzogSUJsaXR6UHJvY2Vzc2VkUGFnZSk6IElCbGl0elByb2Nlc3NlZFBhZ2VbXSB7XG5cbiAgICAgICAgbGV0IHBhZ2VzQ29udGVudCA9IENvbnRlbnRQYXJzZXIucGFyc2VEaXJlY3RvcnkocGF0aC5qb2luKHRoaXMuY29udGVudFBhdGgsIGRpcmVjdG9yeS5kaXJlY3RvcnkpKTtcbiAgICAgICAgaWYgKHBhZ2VzQ29udGVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBVdGlsLmVycm9yKCdDb3VsZCBub3QgZXh0cmFjdCBjb250ZW50IGZyb20gZGlyZWN0b3J5IScpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9jZXNzZWRQYWdlczogSUJsaXR6UHJvY2Vzc2VkUGFnZVtdID0gW107XG5cbiAgICAgICAgaWYgKGRpcmVjdG9yeS50ZW1wbGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgcGFnZUNvbnRlbnRDb3VudCA9IHBhZ2VzQ29udGVudC5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgdXJsR2VuZXJhdG9yID0gKGN1cnJlbnREaXJlY3RvcnlBcnJheT86IHN0cmluZ1tdKTogc3RyaW5nID0+IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUNvbnRlbnRDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VDb250ZW50ID0gcGFnZXNDb250ZW50W2ldO1xuICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzZWRQYWdlRGF0YTogSUJsaXR6UHJvY2Vzc2VkUGFnZSA9IG9iamVjdEFzc2lnbih7fSwgcGFnZUNvbnRlbnQsIHt1cmw6IHVybEdlbmVyYXRvcn0pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZFBhZ2VzLnB1c2gocHJvY2Vzc2VkUGFnZURhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIEdlbmVyYXRlIGZpbGUgYW5kIGRpcmVjdG9yeSBhcnJheXMgYW5kIGV4dHJhY3QgZmlsZW5hbWVcbiAgICAgICAgICAgIGxldCBvd25VcmlDb21wb25lbnRzO1xuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeS51cmkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG93blVyaUNvbXBvbmVudHMgPSBbVXRpbC5nZXRVcmlDb21wb25lbnRzKGRpcmVjdG9yeS5kaXJlY3RvcnkpLnNsaWNlKC0xKV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG93blVyaUNvbXBvbmVudHMgPSBVdGlsLmdldFVyaUNvbXBvbmVudHMoZGlyZWN0b3J5LnVyaSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVSSSBDb21wb25lbnRzIHdpdGggdGhlIHBhcmVudFxuICAgICAgICAgICAgbGV0IGZ1bGxVcmlDb21wb25lbnRzID0gcGFyZW50VXJpQ29tcG9uZW50cy5zbGljZSgwKS5jb25jYXQob3duVXJpQ29tcG9uZW50cyk7XG5cbiAgICAgICAgICAgIGxldCBjaGlsZHJlbkRpcmVjdG9yeSA9IHRoaXMuZGVzY2VuZFRvRGlyZWN0b3J5KHBhcmVudERpcmVjdG9yeSwgb3duVXJpQ29tcG9uZW50cyk7XG5cbiAgICAgICAgICAgIGxldCBwYWdlQ29udGVudENvdW50ID0gcGFnZXNDb250ZW50Lmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUNvbnRlbnRDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VEYXRhOiBJQmxpdHpQcm9jZXNzZWRQYWdlO1xuICAgICAgICAgICAgICAgIGxldCBwYWdlQ29udGVudCA9IHBhZ2VzQ29udGVudFtpXTtcblxuICAgICAgICAgICAgICAgIGxldCBwYWdlVXJpID0gJy8nICsgVXRpbC5leHRyYWN0RmlsZU5hbWUocGFnZUNvbnRlbnQuZmlsZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdG9yeS51cmlfa2V5ICE9PSB1bmRlZmluZWQgJiYgcGFnZUNvbnRlbnRbZGlyZWN0b3J5LnVyaV9rZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZVVyaSA9ICcvJyArIHBhZ2VDb250ZW50W2RpcmVjdG9yeS51cmlfa2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VDb25maWdEYXRhOiBJQmxpdHpQYWdlID0ge1xuICAgICAgICAgICAgICAgICAgICB1cmk6IHBhZ2VVcmksXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBkaXJlY3RvcnkudGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBhZ2VDb250ZW50LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcGFnZURhdGEgPSB0aGlzLnBhcnNlQ29uZmlnUGFnZShwYWdlQ29uZmlnRGF0YSwgY2hpbGRyZW5EaXJlY3RvcnksIGZ1bGxVcmlDb21wb25lbnRzLCBwYXJlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChwYWdlRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSBjb25maWcgcGFnZSBnZW5lcmF0ZWQgZm9yIGRpcmVjdG9yeSEnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRQYWdlcy5wdXNoKHBhZ2VEYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWRkIHBhZ2VzIHRvIG1lbnVzXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5Lm1lbnVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVDb3VudCA9IGRpcmVjdG9yeS5tZW51cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBtZW51Q291bnQ7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVudSA9IGRpcmVjdG9yeS5tZW51c1trXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VDb3VudCA9IHByb2Nlc3NlZFBhZ2VzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYWdlQ291bnQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VDb250ZW50OiBhbnkgPSBwcm9jZXNzZWRQYWdlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZW51VGl0bGUgPSBVdGlsLmV4dHJhY3RGaWxlTmFtZShwYWdlQ29udGVudC5maWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYWdlQ29udGVudC5tZW51X3RpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudVRpdGxlID0gcGFnZUNvbnRlbnQubWVudV90aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWVudS50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVUaXRsZSA9IG1lbnUudGl0bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhZ2VDb250ZW50LnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudVRpdGxlID0gcGFnZUNvbnRlbnQudGl0bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51c1ttZW51Lm5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVzW21lbnUubmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZW51SXRlbTogSUJsaXR6TWFwTWVudUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG1lbnVUaXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHBhZ2VDb250ZW50LnVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb25maWcuYWJzb2x1dGVfdXJscykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtLmRpcmVjdG9yeUFycmF5ID0gZnVsbFVyaUNvbXBvbmVudHMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5leHBsaWNpdF9odG1sX2V4dGVuc2lvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWUgPSBVdGlsLmV4dHJhY3RGaWxlTmFtZShwYWdlQ29udGVudC5maWxlKSArICcuaHRtbCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW0uZGlyZWN0b3J5QXJyYXkucHVzaChVdGlsLmV4dHJhY3RGaWxlTmFtZShwYWdlQ29udGVudC5maWxlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lID0gJ2luZGV4Lmh0bWwnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZXhwbGljaXRfaHRtbF9leHRlbnNpb25zIHx8IGZpbGVOYW1lICE9PSBJTkRFWF9GSUxFX05BTUUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW0uZmlsZU5hbWUgPSBmaWxlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51c1ttZW51Lm5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVzW21lbnUubmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVudXNbbWVudS5uYW1lXS5wdXNoKG1lbnVJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZFBhZ2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc2NlbmQgdG8gdGhlIGZpbmFsIGRpcmVjdG9yeSBpbiB0aGUgYXJyYXksIHJldHVybmluZyBhIHJlZmVyZW5jZSB0byBpdFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHByaXZhdGUgZGVzY2VuZFRvRGlyZWN0b3J5KGRpcmVjdG9yeTogSUJsaXR6TWFwRGlyZWN0b3J5LCBkaXJlY3RvcnlBcnJheTogc3RyaW5nW10pOiBJQmxpdHpNYXBEaXJlY3Rvcnkge1xuICAgICAgICBsZXQgY3VycmVudERpcmVjdG9yeSA9IGRpcmVjdG9yeTtcbiAgICAgICAgbGV0IGRpcmVjdG9yeUNvdW50ID0gZGlyZWN0b3J5QXJyYXkubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcmVjdG9yeUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBuZXdEaXJlY3RvcnkgPSBkaXJlY3RvcnlBcnJheVtpXTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50RGlyZWN0b3J5LmRpcmVjdG9yaWVzW25ld0RpcmVjdG9yeV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnREaXJlY3RvcnkuZGlyZWN0b3JpZXNbbmV3RGlyZWN0b3J5XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3JpZXM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBmaWxlczoge30sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnREaXJlY3RvcnkgPSBjdXJyZW50RGlyZWN0b3J5LmRpcmVjdG9yaWVzW25ld0RpcmVjdG9yeV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnREaXJlY3Rvcnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgZmlsZSBhcnJheSB1c2luZyBVUkkgY29tcG9uZW50cyBhbmQgQmxpdHogY29uZmlnXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUZpbGVBcnJheSh1cmlDb21wb25lbnRzOiBzdHJpbmdbXSkge1xuICAgICAgICBsZXQgZmlsZUFycmF5ID0gdXJpQ29tcG9uZW50cy5zbGljZSgwKTtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5leHBsaWNpdF9odG1sX2V4dGVuc2lvbnMgfHwgZmlsZUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZmlsZUFycmF5LnB1c2goSU5ERVhfRklMRV9OQU1FKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBsYXN0SWQgPSBmaWxlQXJyYXkubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGZpbGVBcnJheVtsYXN0SWRdID0gZmlsZUFycmF5W2xhc3RJZF0gKyAnLmh0bWwnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWxlQXJyYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlcyBgZ2VuZXJhdGVVcmwoKWAgdG8gcHJvZHVjZSBhbiBhYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gYW4gYXNzZXQuXG4gICAgICpcbiAgICAgKiBUaGUgYXJndW1lbnRzIGFyZSBkZWxpYmVyYXRlbHkgcmV2ZXJzZWQgZm9yIGVhc2llciBwYXJ0aWFsIGFwcGxpY2F0aW9uLlxuICAgICAqXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUFzc2V0VXJsKGN1cnJlbnREaXJlY3RvcnlBcnJheTogc3RyaW5nW10sIGFzc2V0RmlsZUFycmF5OiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlVXJsKFsnYXNzZXRzJ10uY29uY2F0KGFzc2V0RmlsZUFycmF5KSwgY3VycmVudERpcmVjdG9yeUFycmF5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJ0aWFsbCBhcHBsaWVzIGBnZW5lcmF0ZVVybCgpYCBmb3IgZWFzaWVyIHJlbGF0aXZlIFVSTCBnZW5lcmF0aW9uXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRVcmxHZW5lcmF0b3IodGFyZ2V0RmlsZUFycmF5OiBzdHJpbmdbXSk6IChjdXJyZW50RGlyZWN0b3J5QXJyYXk/OiBzdHJpbmdbXSkgPT4gc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVVcmwuYmluZCh0aGlzLCB0YXJnZXRGaWxlQXJyYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIFVSTCB0byB0YXJnZXQgZmlsZSwgdGFrZSBpbnRvIGFjY291bnQgY3VycmVudCBkaXJlY3RvcnkgYW5kIGNvbmZpZyBzZXR0aW5ncywgc3VjaCBhcyB3aGV0aGVyXG4gICAgICogYWJzb2x1dGUgVVJMcyBhcmUgZW5hYmxlZCwgZXRjLlxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBwdWJsaWMgZm9yIHVuaXQgdGVzdGluZyBwdXJwb3Nlcy5cbiAgICAgKlxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHB1YmxpYyBnZW5lcmF0ZVVybCh0YXJnZXRGaWxlQXJyYXk6IHN0cmluZ1tdLCBjdXJyZW50RGlyZWN0b3J5QXJyYXk6IHN0cmluZ1tdID0gW10pOiBzdHJpbmcge1xuICAgICAgICBsZXQgdXJsQXJyYXkgPSB0YXJnZXRGaWxlQXJyYXkuc2xpY2UoMCk7XG4gICAgICAgIGxldCB0YXJnZXREaXJlY3RvcnlBcnJheSA9IHRhcmdldEZpbGVBcnJheS5zbGljZSgwLCB0YXJnZXRGaWxlQXJyYXkubGVuZ3RoIC0gMSk7XG4gICAgICAgIGxldCBmaWxlTmFtZSA9IHRhcmdldEZpbGVBcnJheS5zbGljZSgtMSlbMF07XG4gICAgICAgIGlmICghdGhpcy5jb25maWcuZXhwbGljaXRfaHRtbF9leHRlbnNpb25zKSB7XG4gICAgICAgICAgICBsZXQgbGFzdElkID0gdGFyZ2V0RmlsZUFycmF5Lmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpZiAodGFyZ2V0RmlsZUFycmF5W2xhc3RJZF0gPT09IElOREVYX0ZJTEVfTkFNRSkge1xuICAgICAgICAgICAgICAgIHVybEFycmF5LnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hYnNvbHV0ZV91cmxzKSB7XG4gICAgICAgICAgICBsZXQgYWJzb2x1dGVVcmwgPSAnJztcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zaXRlX3Jvb3QgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZy5zaXRlX3Jvb3QgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgYWJzb2x1dGVVcmwgPSAnLycgKyBVdGlsLnN0cmlwU2xhc2hlcyh0aGlzLmNvbmZpZy5zaXRlX3Jvb3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVybEFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBhYnNvbHV0ZVVybCA9IGFic29sdXRlVXJsICsgJy8nICsgdXJsQXJyYXkuam9pbignLycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFic29sdXRlVXJsID09PSAnJykge1xuICAgICAgICAgICAgICAgIGFic29sdXRlVXJsID0gJy8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNpdGVfdXJsICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWcuc2l0ZV91cmwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgYWJzb2x1dGVVcmwgPSB0aGlzLmNvbmZpZy5zaXRlX3VybCArIGFic29sdXRlVXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFic29sdXRlVXJsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHJlbGF0aXZlVXJsID0gJyc7XG4gICAgICAgICAgICBsZXQgZGlmZmVyZW50Um9vdCA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHRhcmdldExlbmd0aCA9IHRhcmdldERpcmVjdG9yeUFycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgIGxldCBjdXJyZW50TGVuZ3RoID0gY3VycmVudERpcmVjdG9yeUFycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5tYXgodGFyZ2V0TGVuZ3RoLCBjdXJyZW50TGVuZ3RoKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gdGFyZ2V0TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZVVybCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVXJsID0gJy8nICsgcmVsYXRpdmVVcmw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVVcmwgPSAnLi4nICsgcmVsYXRpdmVVcmw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID49IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aXZlVXJsICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVVcmwgPSByZWxhdGl2ZVVybCArICcvJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCA9IHJlbGF0aXZlVXJsICsgdGFyZ2V0RGlyZWN0b3J5QXJyYXlbaV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldERpcmVjdG9yeUFycmF5W2ldICE9PSBjdXJyZW50RGlyZWN0b3J5QXJyYXlbaV0gfHwgZGlmZmVyZW50Um9vdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZmVyZW50Um9vdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmVVcmwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVVcmwgPSByZWxhdGl2ZVVybCArICcvJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVXJsID0gcmVsYXRpdmVVcmwgKyB0YXJnZXREaXJlY3RvcnlBcnJheVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZVVybCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVVybCA9ICcvJyArIHJlbGF0aXZlVXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVVcmwgPSAnLi4nICsgcmVsYXRpdmVVcmw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuY29uZmlnLmV4cGxpY2l0X2h0bWxfZXh0ZW5zaW9ucyB8fCBmaWxlTmFtZSAhPT0gSU5ERVhfRklMRV9OQU1FKVxuICAgICAgICAgICAgICAgICYmIHRhcmdldEZpbGVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmVVcmwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlVXJsID0gcmVsYXRpdmVVcmwgKyAnLyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlbGF0aXZlVXJsID0gcmVsYXRpdmVVcmwgKyBmaWxlTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnLi8nICsgcmVsYXRpdmVVcmw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21waWxlcyBQdWcgZmlsZSBvciByZXR1cm5zIGNvbXBpbGVkIGZ1bmN0aW9uIGZyb20gY2FjaGUgaWYgdGhlIGZpbGUgaGFzIGJlZW4gY29tcGlsZWQgYmVmb3JlXG4gICAgICogQHNpbmNlIDAuMS4zICBSZW1vdmUgdHJ5L2NhdGNoIGJsb2NrXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb21waWxlUHVnKHBhdGg6IHN0cmluZyk6IChsb2NhbHM/OiBhbnkpID0+IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5wdWdDYWNoZVtwYXRoXSkge1xuICAgICAgICAgICAgdGhpcy5wdWdDYWNoZVtwYXRoXSA9IHB1Zy5jb21waWxlRmlsZShwYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wdWdDYWNoZVtwYXRoXTtcbiAgICB9XG59XG4iXX0=
