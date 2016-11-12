/**
 * @file File responsible for all interfaces, constants and classes related to generating of the static site
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.3
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
 * @since 0.0.2
 */
const INDEX_FILE_NAME = 'index.html';

/**
 * Pug cache interface
 * @since 0.0.2
 */
interface IPugCache {
    [path: string]: (locals?: any) => string;
}

/**
 * Page menu interface
 * @since 0.0.3
 */
interface IBlitzPageMenuItem {
    title: string;
    url: string;
}

/**
 * Interface for data extracted from the content file with additional post processing data, such as URL
 * @since 0.0.3
 */
interface IBlitzPageData {
    url: string;
    title?: string;
    menu_button?: string;
    [key: string]: any;
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
     * @since 0.0.2
     */
    private projectPath: string;

    /**
     * Directory in which the newly generated files will be placed
     * @since 0.0.1
     */
    private buildPath: string;

    /**
     * Absolute paths to locations, content and templates directories
     * @since 0.0.2
     */
    private assetsPath: string;
    private contentPath: string;
    private templatesPath: string;

    /**
     * Cache of compiled Pug functions
     * @since 0.0.2
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
        this.iterate();
    }

    /**
     * Iterates over the pages in the config, gradually building up the static site
     * @since 0.0.1
     */
    private iterate() {
        let count = this.config.pages.length;
        for (let i = 0; i < count; i++) {
            let page = this.config.pages[i];
            if (this.buildPage(page) === undefined) {
                Util.error('Failed to build a root page!');
                Util.error('Aborting build process!');
                return undefined;
            }
        }
    }

    /**
     * Builds up the root page and its children recursively
     * @since 0.0.2
     */
    private buildPage(page: IBlitzPage,
                      currentUriComponents: string[] = [],
                      isRoot: boolean = true): IBlitzPageData {

        let uriComponents = currentUriComponents.concat(Util.getUriComponents(page.uri));
        let fileArray;

        if (uriComponents.length > 0) {
            fileArray = uriComponents.slice(0);
            if (this.config.explicit_html_extensions) {
                let lastId = fileArray.length - 1;
                fileArray[lastId] = (fileArray[lastId] === '' ? 'index ' : fileArray[lastId]) + '.html';
            } else {
                fileArray.push(INDEX_FILE_NAME);
            }
        } else {
            fileArray = [INDEX_FILE_NAME];
        }

        let menu: IBlitzPageMenuItem[] = [];
        let childPages = {};
        if (page.child_pages && page.child_pages.length > 0) {
            let childPageCount = page.child_pages.length;
            for (let i = 0; i < childPageCount; i++) {
                let childPage = page.child_pages[i];
                let childPageObject = this.buildPage(childPage, uriComponents, false);
                if (!childPageObject) {
                    Util.error('Could not build child page!');
                    return undefined;
                }
                childPages[childPage.name] = childPageObject;
                if (childPage.show_in_menu !== false) {
                    let menuButtonText = childPage.name;
                    if (childPageObject.menu_button) {
                        menuButtonText = childPageObject.menu_button;
                    } else if (childPageObject.title) {
                        menuButtonText = childPageObject.title;
                    }
                    menu.push({
                        title: menuButtonText,
                        url: childPageObject.url,
                    });
                }
            }
        }

        let childDirectories = [];
        if (page.child_directories && page.child_directories.length > 0) {
            let childDirectoryCount = page.child_directories.length;
            for (let i = 0; i < childDirectoryCount; i++) {
                let childDirectory = page.child_directories[i];
                let childDirectoryObject = this.buildChildDirectory(childDirectory, uriComponents);
                if (childDirectoryObject === undefined) {
                    Util.error('Could not build child directory!');
                    return undefined;
                }
                childDirectories[childDirectory.name] = childDirectoryObject;
            }
        }

        let pageContent = ContentParser.parseFile(path.join(this.contentPath, page.content));
        let menuButtonText = isRoot ? 'Index' : page.name;
        if (pageContent.menu_button) {
            menuButtonText = pageContent.menu_button;
        } else if (pageContent.title) {
            menuButtonText = pageContent.title;
        }
        let pageUrl = this.getUrl(uriComponents);
        menu.unshift({
            title: menuButtonText,
            url: pageUrl,
        });
        let pugFunction = this.compilePug(path.join(this.templatesPath, page.template));
        let blitzLocals = {
            menu,
            // TODO: Add functions like URL
            url: pageUrl,
        };
        let locals = objectAssign({}, this.config.globals, pageContent, childPages, childDirectories, blitzLocals);
        if (!Util.writeFileFromArray(this.buildPath, fileArray, pugFunction(locals))) {
            Util.error('Could not write root page to file!');
            return undefined;
        }
        return objectAssign({}, pageContent, {url: pageUrl});
    }

    /**
     * Builds up a child directory
     * @since 0.0.3
     */
    private buildChildDirectory(directoryConfig: IBlitzChildDirectory, currentFileArray: string[]): IBlitzPageData[] {
        return [];
    }

    /**
     * Generates a URL based on current config and file array
     * @since 0.0.3
     */
    private getUrl(uriComponents: string[]): string {
        // TODO: Improve relative URL creation
        let empty = uriComponents.length < 1;
        let url = Util.stripSlashes(uriComponents.join('/'));
        if (this.config.absolute_urls) {
            if (!this.config.site_root || this.config.site_root === '') {
                url = '/' + url;
            } else {
                url = '/' + this.config.site_root + '/' + url;
            }
        } else {
            url = './' + url;
        }
        if (this.config.explicit_html_extensions) {
            url = url + (empty ? 'index' : '') + '.html';
        } else {
            url = url + (empty ? '' : '/');
        }
        return url;
    }

    /**
     * Compiles Pug file or returns compiled function from cache if the file has been compiled before
     * @since 0.0.2
     */
    private compilePug(path: string): (locals?: any) => string {
        if (!this.pugCache[path]) {
            this.pugCache[path] = pug.compileFile(path);
        }
        return this.pugCache[path];
    }
}
