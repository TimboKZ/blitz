"use strict";
var Util_1 = require('./Util');
var Logger_1 = require('./Logger');
var StringHelper_1 = require('./helpers/StringHelper');
exports.DEFAULT_CONFIG_NAME = 'blitz.yml';
exports.CONFIG_PROPERTIES = [
    {
        name: 'blitz_version',
        message: 'Using current Blitz version',
        defaultValue: Util_1.Util.getPackageInfo().version,
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'Blitz version is supposed to be a string!',
    },
    {
        name: 'site_url',
        message: 'Using an empty string',
        defaultValue: '',
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'Site URL is supposed to be a string!',
    },
    {
        name: 'site_root',
        message: 'Using an empty string',
        defaultValue: '',
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'Site root is supposed to be a string!',
    },
    {
        name: 'absolute_urls',
        message: 'Disabling absolute URLs, using relative URLs instead',
        defaultValue: false,
        typeChecker: function (object) { return typeof object === 'boolean'; },
        typeError: 'Absolute URLs should be a boolean value!',
    },
    {
        name: 'explicit_html_extensions',
        message: 'Enabling explicit HTML extensions',
        defaultValue: true,
        typeChecker: function (object) { return typeof object === 'boolean'; },
        typeError: 'Explicit HTML extensions should be a boolean value!',
    },
    {
        name: 'plugins',
        message: 'Assuming there are no plugins',
        defaultValue: [],
        typeChecker: function (object) {
            if (typeof object !== 'object' || !(object instanceof Array)) {
                return false;
            }
            for (var i = 0; i < object.length; i++) {
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
        typeChecker: function (object) { return typeof object === 'object' && !(object instanceof Array); },
        typeError: 'Globals must be an object (and not an array)!',
    },
    {
        name: 'pages',
        message: 'Assuming there are no pages',
        defaultValue: [],
        typeChecker: function (object) { return typeof object === 'object' && object instanceof Array; },
        typeError: 'Pages must be an array!',
    },
];
exports.CONFIG_PAGE_PROPERTIES = {
    uri: {
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'If URI is set, it must be a string!',
    },
    id: {
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'If ID is set, it must be a string!',
    },
    name: {
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'If name is set, it must be a string!',
    },
    template: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.isEmpty(object); },
        typeError: 'If template is set, it must be a non-empty string!',
    },
    content: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.isEmpty(object); },
        typeError: 'If content is set, it must be a non-empty string!',
    },
    menus: {
        typeChecker: function (object) { return typeof object === 'object' && object instanceof Array; },
        typeError: 'If menus are set, it must be an array!',
    },
    child_pages: {
        typeChecker: function (object) { return typeof object === 'object' && object instanceof Array; },
        typeError: 'If menus are set, it must be an array!',
    },
    child_directories: {
        typeChecker: function (object) { return typeof object === 'object' && object instanceof Array; },
        typeError: 'If menus are set, it must be an array!',
    },
};
exports.CONFIG_DIRECTORY_PROPERTIES = {
    uri: {
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'If URI is set, it must be a string!',
    },
    uri_key: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.isEmpty(object); },
        typeError: 'If URI key is set, it must be a non-empty string!',
    },
    id_key: {
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'If ID key is set, it must be a string!',
    },
    name: {
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'If name is set, it must be a string!',
    },
    template_directory: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.isEmpty(object); },
        typeError: 'If template is set, it must be a non-empty string!',
    },
    template: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.isEmpty(object); },
        typeError: 'If template is set, it must be a non-empty string!',
    },
    content_directory: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.isEmpty(object); },
        typeError: 'If content is set, it must be a non-empty string!',
    },
    content: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.isEmpty(object); },
        typeError: 'If content is set, it must be a non-empty string!',
    },
    menus: {
        typeChecker: function (object) { return typeof object === 'object' && object instanceof Array; },
        typeError: 'If menus are set, it must be an array!',
    },
};
exports.CONFIG_MENU_PROPERTIES = {
    name: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.isEmpty(object); },
        typeError: 'If name is set, it must be a non-empty string!',
    },
    title: {
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'If title is set, it must be a non-empty string!',
    },
    keys: {
        typeChecker: function (object) { return typeof object === 'object' && object instanceof Array; },
        typeError: 'If keys is set, it must be an array!',
    },
};
var Config = (function () {
    function Config() {
    }
    Config.prototype.load = function (rawConfig) {
        this.rawConfig = rawConfig;
    };
    Config.prototype.validate = function () {
        if (this.rawConfig === undefined) {
            throw new Error('No config was loaded!');
        }
        if (typeof this.rawConfig !== 'object') {
            throw new Error('Supplied config is not an object!');
        }
        var validatedConfig = {};
        var propertyCount = exports.CONFIG_PROPERTIES.length;
        for (var i = 0; i < propertyCount; i++) {
            var validator = exports.CONFIG_PROPERTIES[i];
            var property = this.rawConfig[validator.name];
            if (property === undefined || property === null) {
                var displayValue = '`' + StringHelper_1.StringHelper.stringify(validator.defaultValue) + '`';
                var actionString = validator.message + ', ' + Logger_1.Logger.brand(displayValue);
                Logger_1.Logger.log('`' + Logger_1.Logger.brand(validator.name) + '` is not defined: ' + actionString, Logger_1.LogLevel.Warn);
                validatedConfig[validator.name] = validator.defaultValue;
            }
            else if (!validator.typeChecker(property)) {
                var errorString = 'Invalid type for `' + Logger_1.Logger.brand(validator.name) + '`: ' + validator.typeError;
                throw new Error(errorString);
            }
            else {
                validatedConfig[validator.name] = property;
            }
        }
        validatedConfig.pages = this.validatePages(validatedConfig.pages);
        this.validatedConfig = validatedConfig;
    };
    Config.prototype.validatePages = function (rawPages) {
        var validatedPages = [];
        for (var i = 0; i < rawPages.length; i++) {
            validatedPages.push(this.validatePage(rawPages[i]));
        }
        return validatedPages;
    };
    Config.prototype.validatePage = function (rawPage) {
        var validatedPage = Config.validateNamedProperties(rawPage, exports.CONFIG_PAGE_PROPERTIES, 'page');
        if (validatedPage.menus) {
            validatedPage.menus = this.validateMenus(validatedPage.menus);
        }
        if (validatedPage.child_pages) {
            validatedPage.child_pages = this.validatePages(validatedPage.child_pages);
        }
        if (validatedPage.child_directories) {
            validatedPage.child_directories = this.validateDirectories(validatedPage.child_directories);
        }
        return validatedPage;
    };
    Config.prototype.validateDirectories = function (rawDirectories) {
        var validatedDirectories = [];
        for (var i = 0; i < rawDirectories.length; i++) {
            validatedDirectories.push(this.validateDirectory(rawDirectories[i]));
        }
        return validatedDirectories;
    };
    Config.prototype.validateDirectory = function (rawDirectory) {
        var validatedDirectory = Config.validateNamedProperties(rawDirectory, exports.CONFIG_DIRECTORY_PROPERTIES, 'directory');
        if (validatedDirectory.template && validatedDirectory.template_directory) {
            var errorString = 'Error parsing directory property from the config:';
            errorString += '\n';
            errorString += 'You cannot have both `' + Logger_1.Logger.brand('template') + '` and ';
            errorString += '`' + Logger_1.Logger.brand('template_directory') + '` specified!';
            throw new Error(errorString);
        }
        if (validatedDirectory.content && validatedDirectory.content_directory) {
            var errorString = 'Error parsing directory property from the config:';
            errorString += '\n';
            errorString += 'You cannot have both `' + Logger_1.Logger.brand('content') + '` and ';
            errorString += '`' + Logger_1.Logger.brand('content_directory') + '` specified!';
            throw new Error(errorString);
        }
        if (validatedDirectory.template_directory && validatedDirectory.content_directory) {
            var errorString = 'Error parsing directory property from the config:';
            errorString += '\n';
            errorString += 'You cannot have both `' + Logger_1.Logger.brand('template_directory') + '` and ';
            errorString += '`' + Logger_1.Logger.brand('content_directory') + '` specified!';
            throw new Error(errorString);
        }
        if (validatedDirectory.menus) {
            validatedDirectory.menus = this.validateMenus(validatedDirectory.menus);
        }
        return validatedDirectory;
    };
    Config.prototype.validateMenus = function (rawMenus) {
        var validatedMenus = [];
        for (var i = 0; i < rawMenus.length; i++) {
            validatedMenus.push(Config.validateMenu(rawMenus[i]));
        }
        return validatedMenus;
    };
    Config.validateMenu = function (rawMenu) {
        return Config.validateNamedProperties(rawMenu, exports.CONFIG_MENU_PROPERTIES, 'menu');
    };
    Config.validateNamedProperties = function (sourceObject, validators, propertyType) {
        var validatedObject = {};
        for (var propertyName in validators) {
            if (validators.hasOwnProperty(propertyName)) {
                var rawProperty = sourceObject[propertyName];
                var propertyValidator = validators[propertyName];
                if (rawProperty !== undefined && rawProperty !== null) {
                    if (!propertyValidator.typeChecker(rawProperty)) {
                        var errorString = 'Error parsing ' + propertyType + ' property from the config:';
                        errorString += '\n';
                        errorString += 'Property `' + Logger_1.Logger.brand(StringHelper_1.StringHelper.stringify(propertyName)) + '`';
                        errorString += ' with value `' + Logger_1.Logger.brand(StringHelper_1.StringHelper.stringify(rawProperty)) + '`:';
                        errorString += '\n';
                        errorString += propertyValidator.typeError;
                        throw new Error(errorString);
                    }
                    else {
                        validatedObject[propertyName] = rawProperty;
                    }
                }
            }
        }
        return validatedObject;
    };
    Config.prototype.get = function () {
        return this.validatedConfig;
    };
    return Config;
}());
exports.Config = Config;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUMsQ0FBQzt3QkFDSixlQUFlLENBQUMsWUFBWSxDQUFDLEdBQUcsV0FBVyxDQUFDO29CQUNoRCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQU1NLG9CQUFHLEdBQVY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBQ0wsYUFBQztBQUFELENBMU1BLEFBME1DLElBQUE7QUExTVksY0FBTSxTQTBNbEIsQ0FBQSIsImZpbGUiOiJzcmMvQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBBbGwgY2xhc3NlcyBhbmQgaW50ZXJmYWNlcyByZWxhdGVkIHRvIHRoZSBCbGl0eiBjb25maWcgYW5kIGRhdGEgdHlwZXMgdXNlZCBpbiBpdFxuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuaW1wb3J0IHtVdGlsfSBmcm9tICcuL1V0aWwnO1xuaW1wb3J0IHtMb2dnZXIsIExvZ0xldmVsfSBmcm9tICcuL0xvZ2dlcic7XG5pbXBvcnQge1N0cmluZ0hlbHBlcn0gZnJvbSAnLi9oZWxwZXJzL1N0cmluZ0hlbHBlcic7XG5cbi8qKlxuICogTWVudSBpbnRlcmZhY2UgYXMgc2VlbiBpbiB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnTWVudSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIGtleXM6IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgdGhlIGNoaWxkIGRpcmVjdG9yeSBvZiBhIHBhZ2VcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdEaXJlY3Rvcnkge1xuICAgIHVyaT86IHN0cmluZztcbiAgICB1cmlfa2V5Pzogc3RyaW5nO1xuICAgIGlkX2tleT86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHRlbXBsYXRlX2RpcmVjdG9yeT86IHN0cmluZztcbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgICBjb250ZW50X2RpcmVjdG9yeT86IHN0cmluZztcbiAgICBjb250ZW50Pzogc3RyaW5nO1xuICAgIG1lbnVzPzogSUNvbmZpZ01lbnVbXTtcbn1cblxuLyoqXG4gKiBQYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnUGFnZSB7XG4gICAgdXJpPzogc3RyaW5nO1xuICAgIGlkPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gICAgY29udGVudD86IHN0cmluZztcbiAgICBtZW51cz86IElDb25maWdNZW51W107XG4gICAgY2hpbGRfcGFnZXM/OiBJQ29uZmlnUGFnZVtdO1xuICAgIGNoaWxkX2RpcmVjdG9yaWVzPzogSUNvbmZpZ0RpcmVjdG9yeVtdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHRvcCBsZXZlbCBjb25maWdcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xuICAgIGJsaXR6X3ZlcnNpb246IHN0cmluZztcbiAgICBzaXRlX3VybDogc3RyaW5nO1xuICAgIHNpdGVfcm9vdDogc3RyaW5nO1xuICAgIGFic29sdXRlX3VybHM6IGJvb2xlYW47XG4gICAgZXhwbGljaXRfaHRtbF9leHRlbnNpb25zOiBib29sZWFuO1xuICAgIHBsdWdpbnM6IHN0cmluZ1tdO1xuICAgIGdsb2JhbHM6IGFueTtcbiAgICBwYWdlczogSUNvbmZpZ1BhZ2VbXTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGFuIG9iamVjdCB1c2VkIHRvIHZhbGlkYXRlIGEgY2VydGFpbiBwcm9wZXJ0eSBvZiB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnUHJvcGVydHlWYWxpZGF0b3Ige1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgZGVmYXVsdFZhbHVlOiBhbnk7XG4gICAgdHlwZUNoZWNrZXI6IChvYmplY3Q6IGFueSkgPT4gYm9vbGVhbjtcbiAgICB0eXBlRXJyb3I6IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHBhZ2UvZGlyZWN0b3J5IHZhbGlkYXRvcnMsIGRvZXNuJ3QgaGF2ZSBkZWZhdWx0IHZhbHVlc1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ05hbWVkUHJvcGVydHlWYWxpZGF0b3JzIHtcbiAgICBbbmFtZTogc3RyaW5nXToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdDogYW55KSA9PiBib29sZWFuLFxuICAgICAgICB0eXBlRXJyb3I6IHN0cmluZyxcbiAgICB9O1xufVxuXG4vKipcbiAqIEdlbmVyaWNGaWxlIHRoYXQgaXMgdHJlYXRlZCBhcyB0aGUgQmxpdHogY29uZmlnIGJ5IGRlZmF1bHRcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05GSUdfTkFNRSA9ICdibGl0ei55bWwnO1xuXG4vKipcbiAqIEFycmF5IG9mIHZhbGlkYXRpb24gb2JqZWN0cyBmb3IgdGhlIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBDT05GSUdfUFJPUEVSVElFUzogSUNvbmZpZ1Byb3BlcnR5VmFsaWRhdG9yW10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnYmxpdHpfdmVyc2lvbicsXG4gICAgICAgIG1lc3NhZ2U6ICdVc2luZyBjdXJyZW50IEJsaXR6IHZlcnNpb24nLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IFV0aWwuZ2V0UGFja2FnZUluZm8oKS52ZXJzaW9uLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0JsaXR6IHZlcnNpb24gaXMgc3VwcG9zZWQgdG8gYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3NpdGVfdXJsJyxcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGFuIGVtcHR5IHN0cmluZycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnU2l0ZSBVUkwgaXMgc3VwcG9zZWQgdG8gYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3NpdGVfcm9vdCcsXG4gICAgICAgIG1lc3NhZ2U6ICdVc2luZyBhbiBlbXB0eSBzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICcnLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ1NpdGUgcm9vdCBpcyBzdXBwb3NlZCB0byBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnYWJzb2x1dGVfdXJscycsXG4gICAgICAgIG1lc3NhZ2U6ICdEaXNhYmxpbmcgYWJzb2x1dGUgVVJMcywgdXNpbmcgcmVsYXRpdmUgVVJMcyBpbnN0ZWFkJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdib29sZWFuJyxcbiAgICAgICAgdHlwZUVycm9yOiAnQWJzb2x1dGUgVVJMcyBzaG91bGQgYmUgYSBib29sZWFuIHZhbHVlIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdleHBsaWNpdF9odG1sX2V4dGVuc2lvbnMnLFxuICAgICAgICBtZXNzYWdlOiAnRW5hYmxpbmcgZXhwbGljaXQgSFRNTCBleHRlbnNpb25zJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ2Jvb2xlYW4nLFxuICAgICAgICB0eXBlRXJyb3I6ICdFeHBsaWNpdCBIVE1MIGV4dGVuc2lvbnMgc2hvdWxkIGJlIGEgYm9vbGVhbiB2YWx1ZSEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAncGx1Z2lucycsXG4gICAgICAgIG1lc3NhZ2U6ICdBc3N1bWluZyB0aGVyZSBhcmUgbm8gcGx1Z2lucycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogW10sXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgIShvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHR5cGVFcnJvcjogJ1BsdWdpbnMgbXVzdCBiZSBhbiBhcnJheSBvZiBzdHJpbmdzIChwbHVnaW4gbmFtZXMpIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdnbG9iYWxzJyxcbiAgICAgICAgbWVzc2FnZTogJ0Fzc3VtaW5nIHRoZXJlIGFyZSBubyBnbG9iYWxzJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB7fSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmICEob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpLFxuICAgICAgICB0eXBlRXJyb3I6ICdHbG9iYWxzIG11c3QgYmUgYW4gb2JqZWN0IChhbmQgbm90IGFuIGFycmF5KSEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAncGFnZXMnLFxuICAgICAgICBtZXNzYWdlOiAnQXNzdW1pbmcgdGhlcmUgYXJlIG5vIHBhZ2VzJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBbXSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdQYWdlcyBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbl07XG5cbi8qKlxuICogQXJyYXkgb2YgdmFsaWRhdGlvbiBvYmplY3RzIGZvciBhIGNvbmZpZyBwYWdlXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19QQUdFX1BST1BFUlRJRVM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICB1cmk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBVUkkgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBpZDoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIElEIGlzIHNldCwgaXQgbXVzdCBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG5hbWUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB0ZW1wbGF0ZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5pc0VtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRlbXBsYXRlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIG1lbnVzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbWVudXMgYXJlIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG4gICAgY2hpbGRfcGFnZXM6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBtZW51cyBhcmUgc2V0LCBpdCBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbiAgICBjaGlsZF9kaXJlY3Rvcmllczoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG1lbnVzIGFyZSBzZXQsIGl0IG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxufTtcblxuLyoqXG4gKiBBcnJheSBvZiB2YWxpZGF0aW9uIG9iamVjdHMgZm9yIGEgY29uZmlnIGRpcmVjdG9yeVxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBDT05GSUdfRElSRUNUT1JZX1BST1BFUlRJRVM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICB1cmk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBVUkkgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB1cmlfa2V5OiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgVVJJIGtleSBpcyBzZXQsIGl0IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nIScsXG4gICAgfSxcbiAgICBpZF9rZXk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBJRCBrZXkgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbmFtZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlX2RpcmVjdG9yeToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5pc0VtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRlbXBsYXRlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgdGVtcGxhdGUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZyEnLFxuICAgIH0sXG4gICAgY29udGVudF9kaXJlY3Rvcnk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIG1lbnVzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbWVudXMgYXJlIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG59O1xuXG4vKipcbiAqIEFycmF5IG9mIHZhbGlkYXRpb24gb2JqZWN0cyBmb3IgYSBjb25maWcgZGlyZWN0b3J5XG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19NRU5VX1BST1BFUlRJRVM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbmFtZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nIScsXG4gICAgfSxcbiAgICB0aXRsZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRpdGxlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGtleXM6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBrZXlzIGlzIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG59O1xuXG4vKipcbiAqIEBjbGFzcyBDbGFzcyByZXNwb25zaWJsZSBmb3IgbG9hZGluZyBhbmQgdmFsaWRhdGluZyB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZyB7XG4gICAgLyoqXG4gICAgICogUmF3IEphdmFTY3JpcHQgb2JqZWN0IGdlbmVyYXRlZCBmcm9tIFlBTUwgZm91bmQgaW4gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgcmF3Q29uZmlnOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzZWQgYW5kIHZhbGlkYXRlZCBjb25maWcgdGhhdCBmb2xsb3dzIHRoZSBpbnRlcmZhY2VzIGRlZmluZWQgYWJvdmVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlZENvbmZpZzogSUNvbmZpZztcblxuICAgIC8qKlxuICAgICAqIExvYWRzIGEgcmF3IGNvbmZpZyBmb3IgdmFsaWRhdGlvblxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkKHJhd0NvbmZpZzogYW55KSB7XG4gICAgICAgIHRoaXMucmF3Q29uZmlnID0gcmF3Q29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgcmF3IGNvbmZpZyB0byBjcmVhdGUgdGhlIHZhbGlkYXRlZCBjb25maWcsIGlmIHBvc3NpYmxlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHZhbGlkYXRlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnJhd0NvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbmZpZyB3YXMgbG9hZGVkIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJhd0NvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3VwcGxpZWQgY29uZmlnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsaWRhdGVkQ29uZmlnOiBhbnkgPSB7fTtcblxuICAgICAgICBsZXQgcHJvcGVydHlDb3VudCA9IENPTkZJR19QUk9QRVJUSUVTLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0eUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB2YWxpZGF0b3IgPSBDT05GSUdfUFJPUEVSVElFU1tpXTtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucmF3Q29uZmlnW3ZhbGlkYXRvci5uYW1lXTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gdW5kZWZpbmVkIHx8IHByb3BlcnR5ID09PSBudWxsKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tbnVsbC1rZXl3b3JkXG4gICAgICAgICAgICAgICAgbGV0IGRpc3BsYXlWYWx1ZSA9ICdgJyArIFN0cmluZ0hlbHBlci5zdHJpbmdpZnkodmFsaWRhdG9yLmRlZmF1bHRWYWx1ZSkgKyAnYCc7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblN0cmluZyA9IHZhbGlkYXRvci5tZXNzYWdlICsgJywgJyArIExvZ2dlci5icmFuZChkaXNwbGF5VmFsdWUpO1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coJ2AnICsgTG9nZ2VyLmJyYW5kKHZhbGlkYXRvci5uYW1lKSArICdgIGlzIG5vdCBkZWZpbmVkOiAnICsgYWN0aW9uU3RyaW5nLCBMb2dMZXZlbC5XYXJuKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZWRDb25maWdbdmFsaWRhdG9yLm5hbWVdID0gdmFsaWRhdG9yLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbGlkYXRvci50eXBlQ2hlY2tlcihwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnSW52YWxpZCB0eXBlIGZvciBgJyArIExvZ2dlci5icmFuZCh2YWxpZGF0b3IubmFtZSkgKyAnYDogJyArIHZhbGlkYXRvci50eXBlRXJyb3I7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVkQ29uZmlnW3ZhbGlkYXRvci5uYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFsaWRhdGVkQ29uZmlnLnBhZ2VzID0gdGhpcy52YWxpZGF0ZVBhZ2VzKHZhbGlkYXRlZENvbmZpZy5wYWdlcyk7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZWRDb25maWcgPSB2YWxpZGF0ZWRDb25maWcgYXMgSUNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgbXVsdGlwbGUgcGFnZXMgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVQYWdlcyhyYXdQYWdlczogYW55W10pOiBJQ29uZmlnUGFnZVtdIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZFBhZ2VzOiBJQ29uZmlnUGFnZVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3UGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZFBhZ2VzLnB1c2godGhpcy52YWxpZGF0ZVBhZ2UocmF3UGFnZXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkUGFnZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIHBhZ2UgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVQYWdlKHJhd1BhZ2U6IGFueSk6IElDb25maWdQYWdlIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZFBhZ2U6IElDb25maWdQYWdlID0gQ29uZmlnLnZhbGlkYXRlTmFtZWRQcm9wZXJ0aWVzKFxuICAgICAgICAgICAgcmF3UGFnZSxcbiAgICAgICAgICAgIENPTkZJR19QQUdFX1BST1BFUlRJRVMsXG4gICAgICAgICAgICAncGFnZSdcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodmFsaWRhdGVkUGFnZS5tZW51cykge1xuICAgICAgICAgICAgdmFsaWRhdGVkUGFnZS5tZW51cyA9IHRoaXMudmFsaWRhdGVNZW51cyh2YWxpZGF0ZWRQYWdlLm1lbnVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVkUGFnZS5jaGlsZF9wYWdlcykge1xuICAgICAgICAgICAgdmFsaWRhdGVkUGFnZS5jaGlsZF9wYWdlcyA9IHRoaXMudmFsaWRhdGVQYWdlcyh2YWxpZGF0ZWRQYWdlLmNoaWxkX3BhZ2VzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVkUGFnZS5jaGlsZF9kaXJlY3Rvcmllcykge1xuICAgICAgICAgICAgdmFsaWRhdGVkUGFnZS5jaGlsZF9kaXJlY3RvcmllcyA9IHRoaXMudmFsaWRhdGVEaXJlY3Rvcmllcyh2YWxpZGF0ZWRQYWdlLmNoaWxkX2RpcmVjdG9yaWVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkUGFnZSBhcyBJQ29uZmlnUGFnZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBzaW5nbGUgZGlyZWN0b3J5IGV4dHJhY3RlZCBmcm9tIHRoZSBjb25maWdcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlRGlyZWN0b3JpZXMocmF3RGlyZWN0b3JpZXM6IGFueVtdKTogSUNvbmZpZ0RpcmVjdG9yeVtdIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZERpcmVjdG9yaWVzOiBJQ29uZmlnRGlyZWN0b3J5W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXdEaXJlY3Rvcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsaWRhdGVkRGlyZWN0b3JpZXMucHVzaCh0aGlzLnZhbGlkYXRlRGlyZWN0b3J5KHJhd0RpcmVjdG9yaWVzW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZERpcmVjdG9yaWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHNpbmdsZSBkaXJlY3RvcnkgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVEaXJlY3RvcnkocmF3RGlyZWN0b3J5OiBhbnkpOiBJQ29uZmlnRGlyZWN0b3J5IHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZERpcmVjdG9yeTogSUNvbmZpZ0RpcmVjdG9yeSA9IENvbmZpZy52YWxpZGF0ZU5hbWVkUHJvcGVydGllcyhcbiAgICAgICAgICAgIHJhd0RpcmVjdG9yeSxcbiAgICAgICAgICAgIENPTkZJR19ESVJFQ1RPUllfUFJPUEVSVElFUyxcbiAgICAgICAgICAgICdkaXJlY3RvcnknXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlZERpcmVjdG9yeS50ZW1wbGF0ZSAmJiB2YWxpZGF0ZWREaXJlY3RvcnkudGVtcGxhdGVfZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnRXJyb3IgcGFyc2luZyBkaXJlY3RvcnkgcHJvcGVydHkgZnJvbSB0aGUgY29uZmlnOic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdZb3UgY2Fubm90IGhhdmUgYm90aCBgJyArIExvZ2dlci5icmFuZCgndGVtcGxhdGUnKSArICdgIGFuZCAnO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ2AnICsgTG9nZ2VyLmJyYW5kKCd0ZW1wbGF0ZV9kaXJlY3RvcnknKSArICdgIHNwZWNpZmllZCEnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVkRGlyZWN0b3J5LmNvbnRlbnQgJiYgdmFsaWRhdGVkRGlyZWN0b3J5LmNvbnRlbnRfZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnRXJyb3IgcGFyc2luZyBkaXJlY3RvcnkgcHJvcGVydHkgZnJvbSB0aGUgY29uZmlnOic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdZb3UgY2Fubm90IGhhdmUgYm90aCBgJyArIExvZ2dlci5icmFuZCgnY29udGVudCcpICsgJ2AgYW5kICc7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnYCcgKyBMb2dnZXIuYnJhbmQoJ2NvbnRlbnRfZGlyZWN0b3J5JykgKyAnYCBzcGVjaWZpZWQhJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkYXRlZERpcmVjdG9yeS50ZW1wbGF0ZV9kaXJlY3RvcnkgJiYgdmFsaWRhdGVkRGlyZWN0b3J5LmNvbnRlbnRfZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnRXJyb3IgcGFyc2luZyBkaXJlY3RvcnkgcHJvcGVydHkgZnJvbSB0aGUgY29uZmlnOic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdZb3UgY2Fubm90IGhhdmUgYm90aCBgJyArIExvZ2dlci5icmFuZCgndGVtcGxhdGVfZGlyZWN0b3J5JykgKyAnYCBhbmQgJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdgJyArIExvZ2dlci5icmFuZCgnY29udGVudF9kaXJlY3RvcnknKSArICdgIHNwZWNpZmllZCEnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWxpZGF0ZWREaXJlY3RvcnkubWVudXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZERpcmVjdG9yeS5tZW51cyA9IHRoaXMudmFsaWRhdGVNZW51cyh2YWxpZGF0ZWREaXJlY3RvcnkubWVudXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWREaXJlY3RvcnkgYXMgSUNvbmZpZ0RpcmVjdG9yeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBzaW5nbGUgbWVudSBleHRyYWN0ZWQgZnJvbSB0aGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlTWVudXMocmF3TWVudXM6IGFueVtdKTogSUNvbmZpZ01lbnVbXSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWRNZW51czogSUNvbmZpZ01lbnVbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd01lbnVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWRNZW51cy5wdXNoKENvbmZpZy52YWxpZGF0ZU1lbnUocmF3TWVudXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkTWVudXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIG1lbnUgZXh0cmFjdGVkIGZyb20gdGhlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVNZW51KHJhd01lbnU6IGFueSk6IElDb25maWdNZW51IHtcbiAgICAgICAgcmV0dXJuIENvbmZpZy52YWxpZGF0ZU5hbWVkUHJvcGVydGllcyhyYXdNZW51LCBDT05GSUdfTUVOVV9QUk9QRVJUSUVTLCAnbWVudScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhbiBvYmplY3QgdXNpbmcgcHJvdmlkZWQgbmFtZWQgcHJvcGVydHkgdmFsaWRhdG9yc1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHZhbGlkYXRlTmFtZWRQcm9wZXJ0aWVzKHNvdXJjZU9iamVjdDogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVR5cGU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWRPYmplY3Q6IGFueSA9IHt9O1xuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eU5hbWUgaW4gdmFsaWRhdG9ycykge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcnMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgICAgICAgIGxldCByYXdQcm9wZXJ0eSA9IHNvdXJjZU9iamVjdFtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eVZhbGlkYXRvciA9IHZhbGlkYXRvcnNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAocmF3UHJvcGVydHkgIT09IHVuZGVmaW5lZCAmJiByYXdQcm9wZXJ0eSAhPT0gbnVsbCkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3BlcnR5VmFsaWRhdG9yLnR5cGVDaGVja2VyKHJhd1Byb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yU3RyaW5nID0gJ0Vycm9yIHBhcnNpbmcgJyArIHByb3BlcnR5VHlwZSArICcgcHJvcGVydHkgZnJvbSB0aGUgY29uZmlnOic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdQcm9wZXJ0eSBgJyArIExvZ2dlci5icmFuZChTdHJpbmdIZWxwZXIuc3RyaW5naWZ5KHByb3BlcnR5TmFtZSkpICsgJ2AnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJyB3aXRoIHZhbHVlIGAnICsgTG9nZ2VyLmJyYW5kKFN0cmluZ0hlbHBlci5zdHJpbmdpZnkocmF3UHJvcGVydHkpKSArICdgOic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9IHByb3BlcnR5VmFsaWRhdG9yLnR5cGVFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZWRPYmplY3RbcHJvcGVydHlOYW1lXSA9IHJhd1Byb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRPYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsaWRhdGVkIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQoKTogSUNvbmZpZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlZENvbmZpZztcbiAgICB9XG59XG4iXX0=
