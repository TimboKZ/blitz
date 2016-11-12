/**
 * @file File responsible for all interfaces, constants and classes related to generating of the static site
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import * as path from 'path';
import * as pug from 'pug';
import * as objectAssign from 'object-assign';
import {IBlitzConfig, IBlitzChildDirectory, IBlitzPage} from './ConfigParser';
import {ContentParser} from './ContentParser';
import {Util} from './Util';

/**
 * Constants indicating the locations of assets, content and templates
 * @since 0.0.1
 */
const ASSETS_DIRECTORY = 'assets';
const CONTENT_DIRECTORY = 'content';
const TEMPLATES_DIRECTORY = 'templates';

/**
 * Index file name in case someone uses a value other than `index.html`
 * @since 0.0.1
 */
const INDEX_FILE_NAME = 'index.html';

/**
 * Representation of a Blitz file of the static site, as seen in the map
 * @since 0.0.1
 */
interface IBlitzMapFile {
    name: string;
    url: string;
    contentData: any;
    blitzData: any;
    generator: (locals?: any) => string;
}

/**
 * Representation of a Blitz directory of the static site, as seen in the map
 * @since 0.0.1
 */
interface IBlitzMapDirectory {
    directories?: {
        [name: string]: IBlitzMapDirectory;
    };
    files?: {
        [name: string]: IBlitzMapFile;
    };
}

/**
 * Page menu interface
 * @since 0.0.1
 */
interface IBlitzPageMenuItem {
    title: string;
    url: string;
    active: boolean;
}

/**
 * Page menu interface
 * @since 0.0.1
 */
interface IBlitzPageMenus {
    [name: string]: IBlitzPageMenuItem[];
}

/**
 * Page content data with inserted URL
 * @since 0.0.1
 */
interface IBlitzProcessedPage {
    url: string;
    content: string;
    [key: string]: string;
}

/**
 * Pug cache interface
 * @since 0.0.1
 */
interface IPugCache {
    [path: string]: (locals?: any) => string;
}

/**
 * @class A class.
 * @since 0.0.1
 */
export class SiteBuilder {
    /**
     * Loaded Blitz config
     * @since 0.0.1
     */
    private config: IBlitzConfig;

    /**
     * Root directory of the project
     * @since 0.0.1
     */
    private projectPath: string;

    /**
     * Directory in which the newly generated files will be placed
     * @since 0.0.1
     */
    private buildPath: string;

    /**
     * Absolute paths to locations, content and templates directories
     * @since 0.0.1
     */
    private assetsPath: string;
    private contentPath: string;
    private templatesPath: string;

    /**
     * Site map that will be used to build static files for the website. It will be generated beforehand.
     * @since 0.0.1
     */
    private siteMap: IBlitzMapDirectory;

    /**
     * Object holding all menus generated from the config
     * @since 0.0.1
     */
    private menus: IBlitzPageMenus = {};

    /**
     * Cache of compiled Pug functions
     * @since 0.0.1
     */
    private pugCache: IPugCache = {};

    /**
     * SiteBuilder constructor.
     * @since 0.0.1
     */
    public constructor(config: IBlitzConfig, projectPath: string, buildDirectory: string) {
        this.config = config;
        this.projectPath = projectPath;
        this.buildPath = path.join(projectPath, buildDirectory);
        this.assetsPath = path.join(projectPath, ASSETS_DIRECTORY);
        this.contentPath = path.join(projectPath, CONTENT_DIRECTORY);
        this.templatesPath = path.join(projectPath, TEMPLATES_DIRECTORY);
    }

    /**
     * Creates the target directory if it doesn't exist and begins the building process
     * @since 0.0.1
     */
    public build() {
        if (!Util.createDirectory(this.buildPath)) {
            Util.error('Could not create the directory for the build!');
            return undefined;
        }
        Util.debug('Generating site map . . . ');
        if (!this.prepareMap()) {
            Util.error('Map generation failed!');
            return undefined;
        }

        Util.debug('Site map generated!');
        Util.debug('Building site . . . ');
        if (!this.buildSite()) {
            Util.error('Site building failed!');
            return undefined;
        }
        Util.debug('Site built successfully!');
    }

    /**
     * Iterates over all pages and directories specified in the config, generating menus, preparing Pug files, etc.
     *
     * If uri is not specified, file name from the `content` property will be used
     *
     * @since 0.0.1
     */
    private prepareMap(): boolean {
        let pages = this.config.pages;
        let pageCount = pages.length;
        let map: IBlitzMapDirectory = {
            directories: {},
            files: {},
        };
        for (let i = 0; i < pageCount; i++) {
            let pageData = this.parseConfigPage(pages[i], map);
            if (pageData === undefined) {
                Util.error('Could not create map, failed on page with URI `' + pageData.url + '`!');
                return false;
            }
        }
        this.siteMap = map;
        return true;
    }

    /**
     * Builds the site using the previously generated map and menus
     * @since 0.0.1
     */
    private buildSite(): boolean {
        return this.buildDirectory(this.siteMap);
    }

    /**
     * Builds all files in a directory, recursively
     * @since 0.0.1
     */
    private buildDirectory(directory: IBlitzMapDirectory, currentDirectoryArray: string[] = []): boolean {

        for (let fileName in directory.files) {
            if (directory.files.hasOwnProperty(fileName)) {
                let file = directory.files[fileName];
                let fileArray = currentDirectoryArray.slice(0).concat([file.name]);
                // TODO: Active menu point?
                let locals = objectAssign(
                    {},
                    this.config.globals,
                    file.contentData,
                    file.blitzData,
                    {menus: this.menus}
                );
                if (!Util.writeFileFromArray(this.buildPath, fileArray, file.generator(locals))) {
                    Util.error('Could not write file from array!');
                    return false;
                }
            }
        }

        for (let directoryName in directory.directories) {
            if (directory.directories.hasOwnProperty(directoryName)) {
                let directoryData = directory.directories[directoryName];
                let directoryArray = currentDirectoryArray.slice(0).concat([directoryName]);
                let directoryPath = path.join.apply(undefined, directoryArray);
                if (!Util.createDirectory(path.join(this.buildPath, directoryPath))) {
                    Util.error('Could not create directory for the build!');
                    return false;
                }
                this.buildDirectory(directoryData, directoryArray);
            }
        }

        return true;
    }

    /**
     * Parses a page from the config inserting into the site map
     * @since 0.0.1
     */
    private parseConfigPage(page: IBlitzPage,
                            parentDirectory: IBlitzMapDirectory,
                            parentUriComponents: string[] = [],
                            parent?: IBlitzProcessedPage): IBlitzProcessedPage {

        // Generate file and directory arrays and extract filename
        let uriComponents;
        if (page.uri === undefined) {
            uriComponents = [Util.extractFileName(page.content)];
        } else {
            uriComponents = Util.getUriComponents(page.uri);
        }

        // URI components without the parent
        let partialUriComponents = uriComponents.slice(0);
        let partialDirectoryArray = this.generateFileArray(partialUriComponents);
        partialDirectoryArray = partialDirectoryArray.slice(0, partialDirectoryArray.length - 1);

        // URI Ccomponents with the parent
        uriComponents = parentUriComponents.slice(0).concat(uriComponents);
        let fileArray = this.generateFileArray(uriComponents);
        let fileName = fileArray[fileArray.length - 1];
        let fileNameWithoutExtension = Util.extractFileName(fileName);
        let pageUrl = this.generateUrl(fileArray, []);

        // Switch to a relevant directory
        let currentDirectory = parentDirectory;
        let directoryCount = partialDirectoryArray.length;
        for (let k = 0; k < directoryCount; k++) {
            let newDirectory = partialDirectoryArray[k];
            if (currentDirectory.directories[newDirectory] === undefined) {
                currentDirectory.directories[newDirectory] = {
                    directories: {},
                    files: {},
                };
            }
            currentDirectory = currentDirectory.directories[newDirectory];
        }

        // Extract content and prepare pug
        // If passed `content` is a string, use it as path to compile Pug, otherwise use `content` object as is
        let pageContent = page.content;
        if (typeof page.content === 'string') {
            pageContent = ContentParser.parseFile(path.join(this.contentPath, page.content));
        }
        let pugFunction = this.compilePug(path.join(this.templatesPath, page.template));
        if (pageContent === undefined || pugFunction === undefined) {
            Util.error('Could not extract content and compile Pug!');
            return undefined;
        }

        // Created a processed page data object
        let processedPageData = objectAssign({}, pageContent, {url: pageUrl});

        // Setup Blitz data that will be extracted from children
        let blitzData = {
            parent,
        };

        // Parse child pages
        if (page.child_pages && page.child_pages.length > 0) {
            let pageCount = page.child_pages.length;
            for (let i = 0; i < pageCount; i++) {
                let childPage = page.child_pages[i];
                let childData = this.parseConfigPage(
                    childPage,
                    currentDirectory,
                    uriComponents,
                    processedPageData
                );
                if (childData === undefined) {
                    Util.error('Failed parsing child page!');
                    return undefined;
                }
                blitzData[childPage.name] = childData;
            }
        }

        // Parse child directories
        if (page.child_directories && page.child_directories.length > 0) {
            let childDirectoryCount = page.child_directories.length;
            for (let i = 0; i < childDirectoryCount; i++) {
                let childDirectory = page.child_directories[i];
                let childData = this.parseConfigDirectory(
                    childDirectory,
                    currentDirectory,
                    uriComponents,
                    processedPageData
                );
                if (childData === undefined) {
                    Util.error('Failed parsing child directory!');
                    return undefined;
                }
                blitzData[childDirectory.name] = childData;
            }
        }

        // Generate file data for the map and append it to said map
        let fileData: IBlitzMapFile = {
            name: fileName,
            url: pageUrl,
            contentData: pageContent,
            blitzData,
            generator: pugFunction,
        };
        currentDirectory.files[fileData.name] = fileData;

        // Append data to menu if needed
        if (page.menus) {
            let menuCount = page.menus.length;
            for (let k = 0; k < menuCount; k++) {
                let menu = page.menus[k];
                let menuTitle = fileNameWithoutExtension;
                if (pageContent.menu_title) {
                    menuTitle = pageContent.menu_title;
                } else if (menu.title) {
                    menuTitle = menu.title;
                } else if (pageContent.title) {
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

        // Return page data to parent
        return processedPageData;

    }

    /** Parses a page from the config inserting into the site map
     * @since 0.0.1
     */
    private parseConfigDirectory(directory: IBlitzChildDirectory,
                                 parentDirectory: IBlitzMapDirectory,
                                 parentUriComponents: string[] = [],
                                 parent?: IBlitzProcessedPage): IBlitzProcessedPage[] {

        // Generate file and directory arrays and extract filename
        let uriComponents;
        if (directory.uri === undefined) {
            uriComponents = [Util.getUriComponents(directory.directory).slice(-1)];
        } else {
            uriComponents = Util.getUriComponents(directory.uri);
        }

        // URI components without the parent
        let partialUriComponents = uriComponents.slice(0);
        let partialDirectoryArray = this.generateFileArray(partialUriComponents);
        partialDirectoryArray = partialDirectoryArray.slice(0, partialDirectoryArray.length - 1);

        // URI Components with the parent
        uriComponents = parentUriComponents.slice(0).concat(uriComponents);

        // Switch to a relevant directory
        let currentDirectory = parentDirectory;
        let directoryCount = partialDirectoryArray.length;
        for (let k = 0; k < directoryCount; k++) {
            let newDirectory = partialDirectoryArray[k];
            if (currentDirectory.directories[newDirectory] === undefined) {
                currentDirectory.directories[newDirectory] = {
                    directories: {},
                    files: {},
                };
            }
            currentDirectory = currentDirectory.directories[newDirectory];
        }

        let pagesContent = ContentParser.parseDirectory(path.join(this.contentPath, directory.directory));
        if (pagesContent === undefined) {
            Util.error('Could not extract content from directory!');
            return undefined;
        }

        let processedPages: IBlitzProcessedPage[] = [];

        let pageContentCount = pagesContent.length;
        for (let i = 0; i < pageContentCount; i++) {
            let pageContent = pagesContent[i];
            let pageUri = '/' + Util.extractFileName(pageContent.file);
            if (directory.uri_key !== undefined && pageContent[directory.uri_key] !== undefined) {
                pageUri = '/' + pageContent[directory.uri_key];
            }
            let pageConfigData: IBlitzPage = {
                uri: pageUri,
                template: directory.template,
                content: pageContent,
            };
            let pageData = this.parseConfigPage(pageConfigData, currentDirectory, uriComponents, parent);
            if (pageData === undefined) {
                Util.error('Could not parse config page generated for directory!');
                return undefined;
            }
            processedPages.push(pageData);
        }

        return processedPages;
    }

    /**
     * Generates a file array using URI components and Blitz config
     * @since 0.0.1
     */
    private generateFileArray(uriComponents: string[]) {
        let fileArray = uriComponents.slice(0);
        if (!this.config.explicit_html_extensions || fileArray.length === 0) {
            fileArray.push(INDEX_FILE_NAME);
        } else {
            let lastId = fileArray.length - 1;
            fileArray[lastId] = fileArray[lastId] + '.html';
        }
        return fileArray;
    }

    /**
     * Generates a URL to target file, take into account current directory and config settings, such as whether
     * absolute URLs are enabled, etc.
     *
     * This function is public for unit testing purposes.
     *
     * @since 0.0.1
     */
    public generateUrl(targetFileArray: string[], currentDirectoryArray: string[]): string {
        let urlArray = targetFileArray.slice(0);
        let targetDirectoryArray = targetFileArray.slice(0, targetFileArray.length - 1);
        let fileName = targetFileArray.slice(-1)[0];
        if (!this.config.explicit_html_extensions) {
            let lastId = targetFileArray.length - 1;
            if (targetFileArray[lastId] === INDEX_FILE_NAME) {
                urlArray.pop();
            }
        }
        if (this.config.absolute_urls) {
            let absoluteUrl = '';
            if (this.config.site_root !== undefined && this.config.site_root !== '') {
                absoluteUrl = '/' + Util.stripSlashes(this.config.site_root);
            }
            if (urlArray.length > 0) {
                absoluteUrl = absoluteUrl + '/' + urlArray.join('/');
            }
            if (absoluteUrl === '') {
                absoluteUrl = '/';
            }
            return absoluteUrl;
        } else {
            let relativeUrl = '';
            let differentRoot = false;
            let targetLength = targetDirectoryArray.length;
            let currentLength = currentDirectoryArray.length;
            for (let i = 0; i < Math.max(targetLength, currentLength); i++) {
                if (i >= targetLength) {
                    if (relativeUrl !== '') {
                        relativeUrl = '/' + relativeUrl;
                    }
                    relativeUrl = '..' + relativeUrl;
                } else if (i >= currentLength) {
                    if (relativeUrl !== '') {
                        relativeUrl = relativeUrl + '/';
                    }
                    relativeUrl = relativeUrl + targetDirectoryArray[i];
                } else {
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
    }

    /**
     * Compiles Pug file or returns compiled function from cache if the file has been compiled before
     * @since 0.0.1
     */
    private compilePug(path: string): (locals?: any) => string {
        if (!this.pugCache[path]) {
            try {
                this.pugCache[path] = pug.compileFile(path);
            } catch (e) {
                Util.error('Error compiling `' + path + '`!');
                Util.stackTrace(e);
                return undefined;
            }
        }
        return this.pugCache[path];
    }
}
