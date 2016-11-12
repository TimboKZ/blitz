/**
 * @file File responsible for all interfaces, constants and classes related to generating of the static site
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.1
 */

import * as fs from 'fs';
import * as path from 'path';
import * as pug from 'pug';
import {IBlitzConfig} from './ConfigParser';
import {ContentParser} from './ContentParser';
import {Util} from './Util';

/**
 * Constants indicating the locations of content and templates
 * @since 0.0.1
 */
const CONTENT_PATH = 'content';
const TEMPLATES_PATH = 'templates';

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
     * Directory in which the newly generated files will be placed
     * @since 0.0.1
     */
    private targetDirectory: string;

    /**
     * SiteBuilder constructor.
     * @since 0.0.1
     */
    public constructor(config: IBlitzConfig, targetDirectory: string) {
        this.config = config;
        this.targetDirectory = targetDirectory;
    }

    /**
     * Creates the target directory if it doesn't exist and begins the building process
     * @since 0.0.1
     */
    public build() {
        if (!Util.createDirectory(this.targetDirectory)) {
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
        let contentPath = path.join(process.cwd(), CONTENT_PATH);
        let templatesPath = path.join(process.cwd(), TEMPLATES_PATH);
        for (let i = 0; i < count; i++) {
            let page = this.config.pages[i];
            // TODO: Cache Pug functions
            // TODO: Delete existing files from the directory
            let pageContent = ContentParser.parseFile(path.join(contentPath, page.content));
            let pugFunction = pug.compileFile(path.join(templatesPath, page.template));
            let strippedUri = Util.stripSlashes(page.uri);
            let urlComponents = strippedUri.split('/');
            let currentPath = this.targetDirectory;
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
}
