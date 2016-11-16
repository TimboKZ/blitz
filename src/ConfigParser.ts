/**
 * @file File containing all constants, interfaces and classes related to Blitz YAML config.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import {Util} from './Util';

/**
 * Default Blitz config name
 * @since 0.0.1
 */
export const DEFAULT_CONFIG_NAME = 'blitz.yml';

/**
 * Interface for child directories of top level pages
 * @since 0.1.4 Added `menus`
 * @since 0.1.0 Made `template` optional
 * @since 0.0.1
 */
export interface IBlitzChildDirectory {
    uri?: string;
    uri_key?: string;
    name: string;
    menus: IBlitzMenu[];
    template?: string;
    directory: string;
}

/**
 * Menu as show in the config
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
    content?: string|any;
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
 * Interfaces for the config validation object
 * @since 0.1.3
 */
export interface IConfigValidatorProperty {
    name: string;
    message: string;
    defaultValue: any;
    typeChecker: (object: any) => boolean;
    typeError: string;
}

/**
 * Array of default config properties.
 * @since 0.1.3
 */
export const CONFIG_PROPERTIES: IConfigValidatorProperty[] = [
    {
        name: 'blitz_version',
        message: 'Using current Blitz version',
        defaultValue: Util.getPackageInfo().version,
        typeChecker: (object) => typeof object === 'string',
        typeError: 'Blitz version is supposed to be a string!',
    },
    {
        name: 'site_url',
        message: 'Using an empty string',
        defaultValue: '',
        typeChecker: (object) => typeof object === 'string',
        typeError: 'Site URL is supposed to be a string!',
    },
    {
        name: 'site_root',
        message: 'Using an empty string',
        defaultValue: '',
        typeChecker: (object) => typeof object === 'string',
        typeError: 'Site root is supposed to be a string!',
    },
    {
        name: 'absolute_urls',
        message: 'Disabling absolute URLs, using relative URLs instead',
        defaultValue: false,
        typeChecker: (object) => typeof object === 'boolean',
        typeError: 'Absolute URLs should be a boolean value!',
    },
    {
        name: 'explicit_html_extensions',
        message: 'Enabling explicit HTML extensions',
        defaultValue: true,
        typeChecker: (object) => typeof object === 'boolean',
        typeError: 'Explicit HTML extensions should be a boolean value!',
    },
    {
        name: 'globals',
        message: 'Assuming there are no globals',
        defaultValue: {},
        typeChecker: (object) => typeof object === 'object' && !(object instanceof Array),
        typeError: 'Globals must be an object (and not an array)!',
    },
    {
        name: 'pages',
        message: 'Assuming there are no pages',
        defaultValue: [],
        typeChecker: (object) => typeof object === 'object' && object instanceof Array,
        typeError: 'Pages must be an array!',
    },
];

/**
 * @class Class responsible for various operations with the config
 * @since 0.0.1
 */
export class ConfigParser {
    /**
     * Loads YAML config from specified path and verifies that it is a valid Bltiz config, creating required properties
     * where possible.
     * @since 0.0.1
     */
    public static load(configPath: string): IBlitzConfig {
        Util.debug('Loading Blitz config from `' + configPath + '`...');
        let configContent = Util.getFileContents(configPath);
        let config = Util.parseYaml(configContent);
        Util.debug('Successfully parsed YAML in the config!');
        return this.validate(config);
    }

    /**
     * Validates Blitz config, creating required properties from default values where possible
     * @since 0.1.3
     */
    private static validate(config: any): IBlitzConfig {
        Util.debug('Validating Blitz config...');
        let propertyCount = CONFIG_PROPERTIES.length;
        for (let i = 0; i < propertyCount; i++) {
            let expected = CONFIG_PROPERTIES[i];
            let property = config[expected.name];
            if (property === undefined) {
                let displayValue;
                if (typeof expected.defaultValue === 'string') {
                    displayValue = '`' + expected.defaultValue + '`';
                } else {
                    displayValue = JSON.stringify(expected.defaultValue);
                }
                let actionString = expected.message + ' (' + displayValue + ')';
                Util.warn('`' + expected.name.cyan + '` is not defined: ' + actionString);
                config[expected.name] = expected.defaultValue;
            } else if (!expected.typeChecker(property)) {
                let errorString = 'Invalid type for `' + expected.name + '`: ' + expected.typeError;
                throw new Error(errorString);
            }
        }
        Util.debug('Successfully validated Blitz config!');
        return config;
    }
}
