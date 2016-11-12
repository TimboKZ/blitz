/**
 * @file File responsible for all interfaces, constants and classes related to generating of the static site
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.2
 */

import * as fs from 'fs';
import * as path from 'path';
import * as pug from 'pug';
import * as objectAssign from 'object-assign';
import {IBlitzConfig, IBlitzRootPage, IBlitzChildPage} from './ConfigParser';
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
            this.buildRootPage(page);

            continue;

            // TODO: Cache Pug functions
            // TODO: Delete existing files from the directory
            let pageContent = ContentParser.parseFile(path.join(this.contentPath, page.content));
            let pugFunction = pug.compileFile(path.join(this.templatesPath, page.template));
            let strippedUri = Util.stripSlashes(page.uri);
            let urlComponents = strippedUri.split('/');
            let currentPath = this.buildPath;
            if (strippedUri.length !== 0) {
                let componentCount = urlComponents.length;
                for (let k = 0; k < componentCount; k++) {
                    let urlComponent = urlComponents[k];
                    currentPath = path.join(currentPath, urlComponent);
                    if (!Util.createDirectory(currentPath)) {
                        Util.error('Could not create the directory `' + currentPath + '`!');
                        return undefined;
                    }
                }
            }
            fs.writeFileSync(path.join(currentPath, 'index.html'), pugFunction(pageContent));
        }
    }

    /**
     * Builds up a root page, starting a recursive process for children
     *
     * Note: Duplicate URLs get overwritten.
     *
     * @since 0.0.2
     */
    private buildRootPage(page: IBlitzRootPage) {

        let menu = [];
        let children = [];

        let uriComponents = Util.getUriComponents(page.uri);
        let fileArray;

        if (uriComponents.length > 0 && uriComponents[1] !== '') {
            fileArray = uriComponents.slice(0);
            if (this.config.explicit_html_extensions) {
                let lastId = fileArray.length - 1;
                fileArray[lastId] = fileArray[lastId] + '.html';
            } else {
                fileArray.push(INDEX_FILE_NAME);
            }
        } else {
            fileArray = [INDEX_FILE_NAME];
        }

        if (page.children) {

        }

        let pageContent = ContentParser.parseFile(path.join(this.contentPath, page.content));
        let pugFunction = this.compilePug(path.join(this.templatesPath, page.template));
        let locals = objectAssign({}, this.config.globals, pageContent, {menu, children});
        Util.writeFileFromArray(this.buildPath, fileArray, pugFunction(locals));
    }

    /**
     * Builds up a child page recursively
     * @since 0.0.2
     */
    private buildChildPage(pageConfig: IBlitzChildPage) {

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
