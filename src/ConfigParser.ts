/**
 * @file File containing all constants, interfaces and classes related to Blitz YAML config.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import * as path from 'path';
import {Util} from './Util';

/**
 * Default Blitz config name
 * @since 0.0.1
 */
export const DEFAULT_CONFIG_NAME = 'blitz.yml';

/**
 * Interface for child directories of top level pages
 * @since 0.0.1
 */
export interface IBlitzChildDirectory {
    uri?: string;
    uri_key?: string;
    name: string;
    template: string;
    directory: string;
}

/**
 * Page config as represented in the Blitz YAML config
 * @since 0.0.1
 */
export interface IBlitzMenu {
    name: string;
    title?: string;
}

/**
 * Interface for child pages of top level pages
 * @since 0.0.1
 */
export interface IBlitzPage {
    uri?: string;
    id?: string;
    name?: string;
    template: string;
    content: string|any;
    menus?: IBlitzMenu[];
    child_pages?: IBlitzPage[];
    child_directories?: IBlitzChildDirectory[];
}

/**
 * Main Blitz config interface
 * @since 0.0.1
 */
export interface IBlitzConfig {
    blitz_version: string;
    site_url: string;
    site_root: string;
    absolute_urls: boolean;
    explicit_html_extensions: boolean;
    globals: any;
    pages: IBlitzPage[];
}

/**
 * @class Class responsible for various operations with the config
 * @since 0.0.1
 */
export class ConfigParser {
    /**
     * Loads YAML config from specified path
     * @since 0.0.1
     */
    public static load(configPath: string = path.join(process.cwd(), DEFAULT_CONFIG_NAME)): IBlitzConfig {
        Util.debug('Loading Blitz config from `' + configPath + '`...');
        let configContent = Util.getFileContents(configPath);
        if (!configContent) {
            Util.error('Error loading config file! Are you sure `' + configPath + '` exists?');
            return undefined;
        }
        let config = Util.parseYaml(configContent);
        if (!config) {
            Util.error('Error parsing YAML! Are you sure `' + configPath + '` is valid?');
            return undefined;
        }
        Util.debug('Successfully parsed YAML!');

        return config;
    }

    /**
     * Verifies that the supplied object is a valid Blitz config
     * @since 0.0.1
     */
    public static verify(config: any): boolean {
        // TODO: Write actual checks
        return true;
    }
}
