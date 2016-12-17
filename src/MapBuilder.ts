/**
 * @file All interfaces and classes related to the generation of the map of the site
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {Config} from './Config';



/**
 * @class Class responsible for building of the map relating the config and the file system to the site
 * @since 0.2.0
 */
export class MapBuilder {
    /**
     * And instance of the config used to generate the site
     */
    private config: Config;

    public constructor(config: Config) {
        this.config = config;
    }
}
