/**
 * @file All classes and interfaces related to the Blitz config and data types used in it
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as fse from 'fs-extra';
import * as yaml from 'js-yaml';
import {Util} from './Util';
import {Logger} from './Logger';

/**
 * Menu interface as seen in the config
 * @since 0.2.0
 */
export interface IConfigMenu {
    name: string;
    title?: string;
    keys: string[];
}

/**
 * Interface for the child directory of a page
 * @since 0.2.0
 */
export interface IConfigDirectory {
    uri?: string;
    uri_key?: string;
    name?: string;
    menus?: IConfigMenu[];
    template_directory?: string;
    template?: string;
    content_directory?: string;
    content?: string;
}

/**
 * Page configuration object
 * @since 0.2.0
 */
export interface IConfigPage {
    uri?: string;
    id?: string;
    name?: string;
    template?: string;
    content?: string;
    menus?: IConfigMenu[];
    child_pages?: IConfigPage[];
    child_directories?: IConfigDirectory[];
}

/**
 * Interface representing the top level config
 * @since 0.2.0
 */
export interface IConfig {
    blitz_version: string;
    site_url: string;
    site_root: string;
    absolute_urls: boolean;
    explicit_html_extensions: boolean;
    plugins: string[];
    globals: any;
    pages: IConfigPage[];
}

/**
 * Interface for an object used to validate a certain property of the config
 * @since 0.2.0
 */
export interface IConfigValidatorProperty {
    name: string;
    message: string;
    defaultValue: any;
    typeChecker: (object: any) => boolean;
    typeError: string;
}

/**
 * File that is treated as the Blitz config by default
 * @since 0.2.0
 */
export const DEFAULT_CONFIG_NAME = 'blitz.yml';

/**
 * Array of validation objects for the config
 * @since 0.2.0
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
        name: 'plugins',
        message: 'Assuming there are no plugins',
        defaultValue: [],
        typeChecker: (object) => {
            if (typeof object !== 'object' || !(object instanceof Array)) {
                return false;
            }
            for (let i = 0; i < object.length; i++) {
                if (typeof object[i] !== 'string') {
                    return false;
                }
            }
            return true;
        },
        typeError: 'Plugins must be an array of strings (plugin names)!',
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
 * @class Class responsible for loading and validating the config
 * @since 0.2.0
 */
export class Config {
    /**
     * Path to the config file
     * @since 0.2.0
     */
    private configPath: string;

    /**
     * Raw JavaScript object generated from YAML found in the config
     * @since 0.2.0
     */
    private rawConfig: any;

    /**
     * Processed and validated config that follows the interfaces defined above
     * @since 0.2.0
     */
    private validatedConfig: IConfig;

    /**
     * Config constructor
     * @since 0.2.0
     */
    constructor(configPath: string) {
        this.configPath = configPath;
    }

    /**
     * Loads the config from the injected path and parses YAML inside it
     * @since 0.2.0
     */
    public load() {
        let configContents = fse.readFileSync(this.configPath, 'utf8');
        let rawConfig = yaml.safeLoad(configContents);
        if (!rawConfig || typeof rawConfig !== 'object') {
            rawConfig = {};
        }
        this.rawConfig = rawConfig;
    }

    /**
     * Parses the raw config to create the validated config, if possible
     * @since 0.2.0
     */
    public validate() {
        let validatedConfig = {};

        let propertyCount = CONFIG_PROPERTIES.length;
        for (let i = 0; i < propertyCount; i++) {
            let validator = CONFIG_PROPERTIES[i];
            let property = this.rawConfig[validator.name];
            if (property === undefined || property === null) { // tslint:disable-line:no-null-keyword
                let displayValue;
                if (typeof validator.defaultValue === 'string') {
                    displayValue = '\'' + validator.defaultValue + '\'';
                } else {
                    displayValue = JSON.stringify(validator.defaultValue);
                }
                let actionString = validator.message + ' (' + Logger.brand(displayValue) + ')';
                Logger.log('`' + Logger.brand(validator.name) + '` is not defined: ' + actionString);
                validatedConfig[validator.name] = validator.defaultValue;
            } else if (!validator.typeChecker(property)) {
                let errorString = 'Invalid type for `' + Logger.brand(validator.name) + '`: ' + validator.typeError;
                throw new Error(errorString);
            } else {
                validatedConfig[validator.name] = property;
            }
        }

        this.validatedConfig = validatedConfig as IConfig;
    }

    /**
     * Returns the validated config
     * @since 0.2.0
     */
    public get(): IConfig {
        return this.validatedConfig;
    }
}
