/**
 * @file All interfaces and classes related to the generation of the map of the site
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {Config} from './Config';
import {SiteDirectory} from './files/SiteDirectory';

/**
 * @class Class responsible for building of the map relating the config and the file system to the site
 * @since 0.2.0
 */
export class MapBuilder {
    /**
     * Instance of the config used to generate the site
     * @since 0.2.0
     */
    private config: Config;

    /**
     * Folder in which `assets`, `content`, `templates`, etc. are located
     * @since 0.2.0
     */
    private projectRoot: string;

    /**
     * Folder in which the site will be generated
     * @since 0.2.0
     */
    private buildPath: string;

    /**
     * MapBuilder constructor
     * @since 0.2.0
     */
    public constructor(config: Config, projectRoot: string, buildPath: string) {
        this.config = config;
        this.projectRoot = projectRoot;
        this.buildPath = buildPath;
    }

    public build() {
        let rootDirectory = new SiteDirectory(this.buildPath);
    }
}
