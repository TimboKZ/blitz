/**
 * @file All classes and interfaces related to the Blitz config and data types used in it
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {Util} from './Util';
import {Logger, LogLevel} from './Logger';
import {StringHelper} from './helpers/StringHelper';

/**
 * Menu interface as seen in the config
 * @since 0.2.0
 */
export interface IConfigMenu {
    name: string;
    title?: string;
    title_key?: string;
    keys?: string[];
}

/**
 * Interface for the child directory of a page
 * @since 0.2.0
 */
export interface IConfigDirectory {
    uri?: string;
    uri_key?: string;
    id_key?: string;
    name?: string;
    template_directory?: string;
    template?: string;
    content_directory?: string;
    content?: string;
    menus?: IConfigMenu[];
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
export interface IConfigPropertyValidator {
    name: string;
    message: string;
    defaultValue: any;
    typeChecker: (object: any) => boolean;
    typeError: string;
}

/**
 * Interface for page/directory validators, doesn't have default values
 * @since 0.2.0
 */
export interface IConfigNamedPropertyValidators {
    [name: string]: {
        typeChecker: (object: any) => boolean,
        typeError: string,
    };
}

/**
 * GenericFile that is treated as the Blitz config by default
 * @since 0.2.0
 */
export const DEFAULT_CONFIG_NAME = 'blitz.yml';

/**
 * Array of validation objects for the config
 * @since 0.2.0
 */
export const CONFIG_PROPERTIES: IConfigPropertyValidator[] = [
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
 * Array of validation objects for a config page
 * @since 0.2.0
 */
export const CONFIG_PAGE_PROPERTIES: IConfigNamedPropertyValidators = {
    uri: {
        typeChecker: (object) => typeof object === 'string',
        typeError: 'If URI is set, it must be a string!',
    },
    id: {
        typeChecker: (object) => typeof object === 'string',
        typeError: 'If ID is set, it must be a string!',
    },
    name: {
        typeChecker: (object) => typeof object === 'string',
        typeError: 'If name is set, it must be a string!',
    },
    template: {
        typeChecker: (object) => typeof object === 'string' && !StringHelper.empty(object),
        typeError: 'If template is set, it must be a non-empty string!',
    },
    content: {
        typeChecker: (object) => typeof object === 'string' && !StringHelper.empty(object),
        typeError: 'If content is set, it must be a non-empty string!',
    },
    menus: {
        typeChecker: (object) => typeof object === 'object' && object instanceof Array,
        typeError: 'If menus are set, it must be an array!',
    },
    child_pages: {
        typeChecker: (object) => typeof object === 'object' && object instanceof Array,
        typeError: 'If menus are set, it must be an array!',
    },
    child_directories: {
        typeChecker: (object) => typeof object === 'object' && object instanceof Array,
        typeError: 'If menus are set, it must be an array!',
    },
};

/**
 * Array of validation objects for a config directory
 * @since 0.2.0
 */
export const CONFIG_DIRECTORY_PROPERTIES: IConfigNamedPropertyValidators = {
    uri: {
        typeChecker: (object) => typeof object === 'string',
        typeError: 'If URI is set, it must be a string!',
    },
    uri_key: {
        typeChecker: (object) => typeof object === 'string' && !StringHelper.empty(object),
        typeError: 'If URI key is set, it must be a non-empty string!',
    },
    id_key: {
        typeChecker: (object) => typeof object === 'string',
        typeError: 'If ID key is set, it must be a string!',
    },
    name: {
        typeChecker: (object) => typeof object === 'string',
        typeError: 'If name is set, it must be a string!',
    },
    template_directory: {
        typeChecker: (object) => typeof object === 'string' && !StringHelper.empty(object),
        typeError: 'If template is set, it must be a non-empty string!',
    },
    template: {
        typeChecker: (object) => typeof object === 'string' && !StringHelper.empty(object),
        typeError: 'If template is set, it must be a non-empty string!',
    },
    content_directory: {
        typeChecker: (object) => typeof object === 'string' && !StringHelper.empty(object),
        typeError: 'If content is set, it must be a non-empty string!',
    },
    content: {
        typeChecker: (object) => typeof object === 'string' && !StringHelper.empty(object),
        typeError: 'If content is set, it must be a non-empty string!',
    },
    menus: {
        typeChecker: (object) => typeof object === 'object' && object instanceof Array,
        typeError: 'If menus are set, it must be an array!',
    },
};

/**
 * Array of validation objects for a config directory
 * @since 0.2.0
 */
export const CONFIG_MENU_PROPERTIES: IConfigNamedPropertyValidators = {
    name: {
        typeChecker: (object) => typeof object === 'string' && !StringHelper.empty(object),
        typeError: 'If name is set, it must be a non-empty string!',
    },
    title: {
        typeChecker: (object) => typeof object === 'string',
        typeError: 'If title is set, it must be a string!',
    },
    title_key: {
        typeChecker: (object) => typeof object === 'string',
        typeError: 'If title is set, it must be a string!',
    },
    keys: {
        typeChecker: (object) => typeof object === 'object' && object instanceof Array,
        typeError: 'If keys is set, it must be an array!',
    },
};

/**
 * @class Class responsible for loading and validating the config
 * @since 0.2.0
 */
export class Config {
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
     * Loads a raw config for validation
     * @since 0.2.0
     */
    public load(rawConfig: any) {
        this.rawConfig = rawConfig;
    }

    /**
     * Parses the raw config to create the validated config, if possible
     * @since 0.2.0
     */
    public validate() {

        if (this.rawConfig === undefined) {
            throw new Error('No config was loaded!');
        }

        if (typeof this.rawConfig !== 'object') {
            throw new Error('Supplied config is not an object!');
        }

        let validatedConfig: any = {};

        let propertyCount = CONFIG_PROPERTIES.length;
        for (let i = 0; i < propertyCount; i++) {
            let validator = CONFIG_PROPERTIES[i];
            let property = this.rawConfig[validator.name];
            if (property === undefined || property === null) { // tslint:disable-line:no-null-keyword
                let displayValue = '`' + StringHelper.stringify(validator.defaultValue) + '`';
                let actionString = validator.message + ', ' + Logger.brand(displayValue);
                Logger.log('`' + Logger.brand(validator.name) + '` is not defined: ' + actionString, LogLevel.Warn);
                validatedConfig[validator.name] = validator.defaultValue;
            } else if (!validator.typeChecker(property)) {
                let errorString = 'Invalid type for `' + Logger.brand(validator.name) + '`: ' + validator.typeError;
                throw new Error(errorString);
            } else {
                validatedConfig[validator.name] = property;
            }
        }

        validatedConfig.pages = this.validatePages(validatedConfig.pages);

        this.validatedConfig = validatedConfig as IConfig;
    }

    /**
     * Validates multiple pages extracted from the config
     * @since 0.2.0
     */
    private validatePages(rawPages: any[]): IConfigPage[] {
        let validatedPages: IConfigPage[] = [];
        for (let i = 0; i < rawPages.length; i++) {
            validatedPages.push(this.validatePage(rawPages[i]));
        }
        return validatedPages;
    }

    /**
     * Validates a single page extracted from the config
     * @since 0.2.0
     */
    private validatePage(rawPage: any): IConfigPage {
        let validatedPage: IConfigPage = Config.validateNamedProperties(
            rawPage,
            CONFIG_PAGE_PROPERTIES,
            'page'
        );

        if (validatedPage.menus) {
            validatedPage.menus = this.validateMenus(validatedPage.menus);
        }
        if (validatedPage.child_pages) {
            validatedPage.child_pages = this.validatePages(validatedPage.child_pages);
        }
        if (validatedPage.child_directories) {
            validatedPage.child_directories = this.validateDirectories(validatedPage.child_directories);
        }
        return validatedPage as IConfigPage;
    }

    /**
     * Validates a single directory extracted from the config
     * @since 0.2.0
     */
    private validateDirectories(rawDirectories: any[]): IConfigDirectory[] {
        let validatedDirectories: IConfigDirectory[] = [];
        for (let i = 0; i < rawDirectories.length; i++) {
            validatedDirectories.push(this.validateDirectory(rawDirectories[i]));
        }
        return validatedDirectories;
    }

    /**
     * Validates a single directory extracted from the config
     * @since 0.2.0
     */
    private validateDirectory(rawDirectory: any): IConfigDirectory {
        let validatedDirectory: IConfigDirectory = Config.validateNamedProperties(
            rawDirectory,
            CONFIG_DIRECTORY_PROPERTIES,
            'directory'
        );

        if (validatedDirectory.template && validatedDirectory.template_directory) {
            let errorString = 'Error parsing directory property from the config:';
            errorString += '\n';
            errorString += 'You cannot have both `' + Logger.brand('template') + '` and ';
            errorString += '`' + Logger.brand('template_directory') + '` specified!';
            throw new Error(errorString);
        }
        if (validatedDirectory.content && validatedDirectory.content_directory) {
            let errorString = 'Error parsing directory property from the config:';
            errorString += '\n';
            errorString += 'You cannot have both `' + Logger.brand('content') + '` and ';
            errorString += '`' + Logger.brand('content_directory') + '` specified!';
            throw new Error(errorString);
        }
        if (validatedDirectory.template_directory && validatedDirectory.content_directory) {
            let errorString = 'Error parsing directory property from the config:';
            errorString += '\n';
            errorString += 'You cannot have both `' + Logger.brand('template_directory') + '` and ';
            errorString += '`' + Logger.brand('content_directory') + '` specified!';
            throw new Error(errorString);
        }

        if (validatedDirectory.menus) {
            validatedDirectory.menus = this.validateMenus(validatedDirectory.menus);
        }
        return validatedDirectory as IConfigDirectory;
    }

    /**
     * Validates a single menu extracted from the
     * @since 0.2.0
     */
    private validateMenus(rawMenus: any[]): IConfigMenu[] {
        let validatedMenus: IConfigMenu[] = [];
        for (let i = 0; i < rawMenus.length; i++) {
            validatedMenus.push(Config.validateMenu(rawMenus[i]));
        }
        return validatedMenus;
    }

    /**
     * Validates a single menu extracted from the
     * @since 0.2.0
     */
    private static validateMenu(rawMenu: any): IConfigMenu {
        return Config.validateNamedProperties(rawMenu, CONFIG_MENU_PROPERTIES, 'menu');
    }

    /**
     * Validates an object using provided named property validators
     * @since 0.2.0
     */
    private static validateNamedProperties(sourceObject: any,
                                           validators: IConfigNamedPropertyValidators,
                                           propertyType: string): any {
        let validatedObject: any = {};
        for (let propertyName in validators) {
            if (validators.hasOwnProperty(propertyName)) {
                let rawProperty = sourceObject[propertyName];
                let propertyValidator = validators[propertyName];
                if (rawProperty !== undefined && rawProperty !== null) { // tslint:disable-line:no-null-keyword
                    if (!propertyValidator.typeChecker(rawProperty)) {
                        let errorString = 'Error parsing ' + propertyType + ' property from the config:';
                        errorString += '\n';
                        errorString += 'Property `' + Logger.brand(StringHelper.stringify(propertyName)) + '`';
                        errorString += ' with value `' + Logger.brand(StringHelper.stringify(rawProperty)) + '`:';
                        errorString += '\n';
                        errorString += propertyValidator.typeError;
                        throw new Error(errorString);
                    } else {
                        validatedObject[propertyName] = rawProperty;
                    }
                }
            }
        }
        return validatedObject;
    }

    /**
     * Returns the validated config
     * @since 0.2.0
     */
    public get(): IConfig {
        return this.validatedConfig;
    }
}
