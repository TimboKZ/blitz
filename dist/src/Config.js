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
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.empty(object); },
        typeError: 'If template is set, it must be a non-empty string!',
    },
    content: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.empty(object); },
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
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.empty(object); },
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
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.empty(object); },
        typeError: 'If template is set, it must be a non-empty string!',
    },
    template: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.empty(object); },
        typeError: 'If template is set, it must be a non-empty string!',
    },
    content_directory: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.empty(object); },
        typeError: 'If content is set, it must be a non-empty string!',
    },
    content: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.empty(object); },
        typeError: 'If content is set, it must be a non-empty string!',
    },
    menus: {
        typeChecker: function (object) { return typeof object === 'object' && object instanceof Array; },
        typeError: 'If menus are set, it must be an array!',
    },
};
exports.CONFIG_MENU_PROPERTIES = {
    name: {
        typeChecker: function (object) { return typeof object === 'string' && !StringHelper_1.StringHelper.empty(object); },
        typeError: 'If name is set, it must be a non-empty string!',
    },
    title: {
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'If title is set, it must be a string!',
    },
    title_key: {
        typeChecker: function (object) { return typeof object === 'string'; },
        typeError: 'If title is set, it must be a string!',
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQzt3QkFDcEIsV0FBVyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQzt3QkFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDakMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixlQUFlLENBQUMsWUFBWSxDQUFDLEdBQUcsV0FBVyxDQUFDO29CQUNoRCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQU1NLG9CQUFHLEdBQVY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBQ0wsYUFBQztBQUFELENBMU1BLEFBME1DLElBQUE7QUExTVksY0FBTSxTQTBNbEIsQ0FBQSIsImZpbGUiOiJzcmMvQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBBbGwgY2xhc3NlcyBhbmQgaW50ZXJmYWNlcyByZWxhdGVkIHRvIHRoZSBCbGl0eiBjb25maWcgYW5kIGRhdGEgdHlwZXMgdXNlZCBpbiBpdFxuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuaW1wb3J0IHtVdGlsfSBmcm9tICcuL1V0aWwnO1xuaW1wb3J0IHtMb2dnZXIsIExvZ0xldmVsfSBmcm9tICcuL0xvZ2dlcic7XG5pbXBvcnQge1N0cmluZ0hlbHBlcn0gZnJvbSAnLi9oZWxwZXJzL1N0cmluZ0hlbHBlcic7XG5cbi8qKlxuICogTWVudSBpbnRlcmZhY2UgYXMgc2VlbiBpbiB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnTWVudSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIHRpdGxlX2tleT86IHN0cmluZztcbiAgICBrZXlzPzogc3RyaW5nW107XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciB0aGUgY2hpbGQgZGlyZWN0b3J5IG9mIGEgcGFnZVxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ0RpcmVjdG9yeSB7XG4gICAgdXJpPzogc3RyaW5nO1xuICAgIHVyaV9rZXk/OiBzdHJpbmc7XG4gICAgaWRfa2V5Pzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdGVtcGxhdGVfZGlyZWN0b3J5Pzogc3RyaW5nO1xuICAgIHRlbXBsYXRlPzogc3RyaW5nO1xuICAgIGNvbnRlbnRfZGlyZWN0b3J5Pzogc3RyaW5nO1xuICAgIGNvbnRlbnQ/OiBzdHJpbmc7XG4gICAgbWVudXM/OiBJQ29uZmlnTWVudVtdO1xufVxuXG4vKipcbiAqIFBhZ2UgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdQYWdlIHtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgICBjb250ZW50Pzogc3RyaW5nO1xuICAgIG1lbnVzPzogSUNvbmZpZ01lbnVbXTtcbiAgICBjaGlsZF9wYWdlcz86IElDb25maWdQYWdlW107XG4gICAgY2hpbGRfZGlyZWN0b3JpZXM/OiBJQ29uZmlnRGlyZWN0b3J5W107XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgdG9wIGxldmVsIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gICAgYmxpdHpfdmVyc2lvbjogc3RyaW5nO1xuICAgIHNpdGVfdXJsOiBzdHJpbmc7XG4gICAgc2l0ZV9yb290OiBzdHJpbmc7XG4gICAgYWJzb2x1dGVfdXJsczogYm9vbGVhbjtcbiAgICBleHBsaWNpdF9odG1sX2V4dGVuc2lvbnM6IGJvb2xlYW47XG4gICAgcGx1Z2luczogc3RyaW5nW107XG4gICAgZ2xvYmFsczogYW55O1xuICAgIHBhZ2VzOiBJQ29uZmlnUGFnZVtdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgYW4gb2JqZWN0IHVzZWQgdG8gdmFsaWRhdGUgYSBjZXJ0YWluIHByb3BlcnR5IG9mIHRoZSBjb25maWdcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdQcm9wZXJ0eVZhbGlkYXRvciB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBkZWZhdWx0VmFsdWU6IGFueTtcbiAgICB0eXBlQ2hlY2tlcjogKG9iamVjdDogYW55KSA9PiBib29sZWFuO1xuICAgIHR5cGVFcnJvcjogc3RyaW5nO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgcGFnZS9kaXJlY3RvcnkgdmFsaWRhdG9ycywgZG9lc24ndCBoYXZlIGRlZmF1bHQgdmFsdWVzXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnTmFtZWRQcm9wZXJ0eVZhbGlkYXRvcnMge1xuICAgIFtuYW1lOiBzdHJpbmddOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0OiBhbnkpID0+IGJvb2xlYW4sXG4gICAgICAgIHR5cGVFcnJvcjogc3RyaW5nLFxuICAgIH07XG59XG5cbi8qKlxuICogR2VuZXJpY0ZpbGUgdGhhdCBpcyB0cmVhdGVkIGFzIHRoZSBCbGl0eiBjb25maWcgYnkgZGVmYXVsdFxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJR19OQU1FID0gJ2JsaXR6LnltbCc7XG5cbi8qKlxuICogQXJyYXkgb2YgdmFsaWRhdGlvbiBvYmplY3RzIGZvciB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19QUk9QRVJUSUVTOiBJQ29uZmlnUHJvcGVydHlWYWxpZGF0b3JbXSA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdibGl0el92ZXJzaW9uJyxcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGN1cnJlbnQgQmxpdHogdmVyc2lvbicsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogVXRpbC5nZXRQYWNrYWdlSW5mbygpLnZlcnNpb24sXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnQmxpdHogdmVyc2lvbiBpcyBzdXBwb3NlZCB0byBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnc2l0ZV91cmwnLFxuICAgICAgICBtZXNzYWdlOiAnVXNpbmcgYW4gZW1wdHkgc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdTaXRlIFVSTCBpcyBzdXBwb3NlZCB0byBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnc2l0ZV9yb290JyxcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGFuIGVtcHR5IHN0cmluZycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnU2l0ZSByb290IGlzIHN1cHBvc2VkIHRvIGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdhYnNvbHV0ZV91cmxzJyxcbiAgICAgICAgbWVzc2FnZTogJ0Rpc2FibGluZyBhYnNvbHV0ZSBVUkxzLCB1c2luZyByZWxhdGl2ZSBVUkxzIGluc3RlYWQnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ2Jvb2xlYW4nLFxuICAgICAgICB0eXBlRXJyb3I6ICdBYnNvbHV0ZSBVUkxzIHNob3VsZCBiZSBhIGJvb2xlYW4gdmFsdWUhJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2V4cGxpY2l0X2h0bWxfZXh0ZW5zaW9ucycsXG4gICAgICAgIG1lc3NhZ2U6ICdFbmFibGluZyBleHBsaWNpdCBIVE1MIGV4dGVuc2lvbnMnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnYm9vbGVhbicsXG4gICAgICAgIHR5cGVFcnJvcjogJ0V4cGxpY2l0IEhUTUwgZXh0ZW5zaW9ucyBzaG91bGQgYmUgYSBib29sZWFuIHZhbHVlIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdwbHVnaW5zJyxcbiAgICAgICAgbWVzc2FnZTogJ0Fzc3VtaW5nIHRoZXJlIGFyZSBubyBwbHVnaW5zJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBbXSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0JyB8fCAhKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZUVycm9yOiAnUGx1Z2lucyBtdXN0IGJlIGFuIGFycmF5IG9mIHN0cmluZ3MgKHBsdWdpbiBuYW1lcykhJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2dsb2JhbHMnLFxuICAgICAgICBtZXNzYWdlOiAnQXNzdW1pbmcgdGhlcmUgYXJlIG5vIGdsb2JhbHMnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHt9LFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgIShvYmplY3QgaW5zdGFuY2VvZiBBcnJheSksXG4gICAgICAgIHR5cGVFcnJvcjogJ0dsb2JhbHMgbXVzdCBiZSBhbiBvYmplY3QgKGFuZCBub3QgYW4gYXJyYXkpIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdwYWdlcycsXG4gICAgICAgIG1lc3NhZ2U6ICdBc3N1bWluZyB0aGVyZSBhcmUgbm8gcGFnZXMnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IFtdLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXksXG4gICAgICAgIHR5cGVFcnJvcjogJ1BhZ2VzIG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxuXTtcblxuLyoqXG4gKiBBcnJheSBvZiB2YWxpZGF0aW9uIG9iamVjdHMgZm9yIGEgY29uZmlnIHBhZ2VcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgQ09ORklHX1BBR0VfUFJPUEVSVElFUzogSUNvbmZpZ05hbWVkUHJvcGVydHlWYWxpZGF0b3JzID0ge1xuICAgIHVyaToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIFVSSSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGlkOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgSUQgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbmFtZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmVtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRlbXBsYXRlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuZW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgY29udGVudCBpcyBzZXQsIGl0IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nIScsXG4gICAgfSxcbiAgICBtZW51czoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG1lbnVzIGFyZSBzZXQsIGl0IG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxuICAgIGNoaWxkX3BhZ2VzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbWVudXMgYXJlIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG4gICAgY2hpbGRfZGlyZWN0b3JpZXM6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBtZW51cyBhcmUgc2V0LCBpdCBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbn07XG5cbi8qKlxuICogQXJyYXkgb2YgdmFsaWRhdGlvbiBvYmplY3RzIGZvciBhIGNvbmZpZyBkaXJlY3RvcnlcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgQ09ORklHX0RJUkVDVE9SWV9QUk9QRVJUSUVTOiBJQ29uZmlnTmFtZWRQcm9wZXJ0eVZhbGlkYXRvcnMgPSB7XG4gICAgdXJpOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgVVJJIGlzIHNldCwgaXQgbXVzdCBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAgdXJpX2tleToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5lbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBVUkkga2V5IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGlkX2tleToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIElEIGtleSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBuYW1lIGlzIHNldCwgaXQgbXVzdCBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAgdGVtcGxhdGVfZGlyZWN0b3J5OiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmVtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRlbXBsYXRlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmVtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRlbXBsYXRlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGNvbnRlbnRfZGlyZWN0b3J5OiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmVtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIGNvbnRlbnQgaXMgc2V0LCBpdCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZyEnLFxuICAgIH0sXG4gICAgY29udGVudDoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5lbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIG1lbnVzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbWVudXMgYXJlIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG59O1xuXG4vKipcbiAqIEFycmF5IG9mIHZhbGlkYXRpb24gb2JqZWN0cyBmb3IgYSBjb25maWcgZGlyZWN0b3J5XG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19NRU5VX1BST1BFUlRJRVM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmVtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG5hbWUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZyEnLFxuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiB0aXRsZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRpdGxlX2tleToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRpdGxlIGlzIHNldCwgaXQgbXVzdCBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAga2V5czoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIGtleXMgaXMgc2V0LCBpdCBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbn07XG5cbi8qKlxuICogQGNsYXNzIENsYXNzIHJlc3BvbnNpYmxlIGZvciBsb2FkaW5nIGFuZCB2YWxpZGF0aW5nIHRoZSBjb25maWdcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBSYXcgSmF2YVNjcmlwdCBvYmplY3QgZ2VuZXJhdGVkIGZyb20gWUFNTCBmb3VuZCBpbiB0aGUgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSByYXdDb25maWc6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlZCBhbmQgdmFsaWRhdGVkIGNvbmZpZyB0aGF0IGZvbGxvd3MgdGhlIGludGVyZmFjZXMgZGVmaW5lZCBhYm92ZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVkQ29uZmlnOiBJQ29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogTG9hZHMgYSByYXcgY29uZmlnIGZvciB2YWxpZGF0aW9uXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGxvYWQocmF3Q29uZmlnOiBhbnkpIHtcbiAgICAgICAgdGhpcy5yYXdDb25maWcgPSByYXdDb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSByYXcgY29uZmlnIHRvIGNyZWF0ZSB0aGUgdmFsaWRhdGVkIGNvbmZpZywgaWYgcG9zc2libGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgdmFsaWRhdGUoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMucmF3Q29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY29uZmlnIHdhcyBsb2FkZWQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucmF3Q29uZmlnICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdXBwbGllZCBjb25maWcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YWxpZGF0ZWRDb25maWc6IGFueSA9IHt9O1xuXG4gICAgICAgIGxldCBwcm9wZXJ0eUNvdW50ID0gQ09ORklHX1BST1BFUlRJRVMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnR5Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHZhbGlkYXRvciA9IENPTkZJR19QUk9QRVJUSUVTW2ldO1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5yYXdDb25maWdbdmFsaWRhdG9yLm5hbWVdO1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09PSB1bmRlZmluZWQgfHwgcHJvcGVydHkgPT09IG51bGwpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1udWxsLWtleXdvcmRcbiAgICAgICAgICAgICAgICBsZXQgZGlzcGxheVZhbHVlID0gJ2AnICsgU3RyaW5nSGVscGVyLnN0cmluZ2lmeSh2YWxpZGF0b3IuZGVmYXVsdFZhbHVlKSArICdgJztcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uU3RyaW5nID0gdmFsaWRhdG9yLm1lc3NhZ2UgKyAnLCAnICsgTG9nZ2VyLmJyYW5kKGRpc3BsYXlWYWx1ZSk7XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZygnYCcgKyBMb2dnZXIuYnJhbmQodmFsaWRhdG9yLm5hbWUpICsgJ2AgaXMgbm90IGRlZmluZWQ6ICcgKyBhY3Rpb25TdHJpbmcsIExvZ0xldmVsLldhcm4pO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlZENvbmZpZ1t2YWxpZGF0b3IubmFtZV0gPSB2YWxpZGF0b3IuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsaWRhdG9yLnR5cGVDaGVja2VyKHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIGxldCBlcnJvclN0cmluZyA9ICdJbnZhbGlkIHR5cGUgZm9yIGAnICsgTG9nZ2VyLmJyYW5kKHZhbGlkYXRvci5uYW1lKSArICdgOiAnICsgdmFsaWRhdG9yLnR5cGVFcnJvcjtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTdHJpbmcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZWRDb25maWdbdmFsaWRhdG9yLm5hbWVdID0gcHJvcGVydHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YWxpZGF0ZWRDb25maWcucGFnZXMgPSB0aGlzLnZhbGlkYXRlUGFnZXModmFsaWRhdGVkQ29uZmlnLnBhZ2VzKTtcblxuICAgICAgICB0aGlzLnZhbGlkYXRlZENvbmZpZyA9IHZhbGlkYXRlZENvbmZpZyBhcyBJQ29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBtdWx0aXBsZSBwYWdlcyBleHRyYWN0ZWQgZnJvbSB0aGUgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVBhZ2VzKHJhd1BhZ2VzOiBhbnlbXSk6IElDb25maWdQYWdlW10ge1xuICAgICAgICBsZXQgdmFsaWRhdGVkUGFnZXM6IElDb25maWdQYWdlW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXdQYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsaWRhdGVkUGFnZXMucHVzaCh0aGlzLnZhbGlkYXRlUGFnZShyYXdQYWdlc1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRQYWdlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBzaW5nbGUgcGFnZSBleHRyYWN0ZWQgZnJvbSB0aGUgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVBhZ2UocmF3UGFnZTogYW55KTogSUNvbmZpZ1BhZ2Uge1xuICAgICAgICBsZXQgdmFsaWRhdGVkUGFnZTogSUNvbmZpZ1BhZ2UgPSBDb25maWcudmFsaWRhdGVOYW1lZFByb3BlcnRpZXMoXG4gICAgICAgICAgICByYXdQYWdlLFxuICAgICAgICAgICAgQ09ORklHX1BBR0VfUFJPUEVSVElFUyxcbiAgICAgICAgICAgICdwYWdlJ1xuICAgICAgICApO1xuXG4gICAgICAgIGlmICh2YWxpZGF0ZWRQYWdlLm1lbnVzKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWRQYWdlLm1lbnVzID0gdGhpcy52YWxpZGF0ZU1lbnVzKHZhbGlkYXRlZFBhZ2UubWVudXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWxpZGF0ZWRQYWdlLmNoaWxkX3BhZ2VzKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWRQYWdlLmNoaWxkX3BhZ2VzID0gdGhpcy52YWxpZGF0ZVBhZ2VzKHZhbGlkYXRlZFBhZ2UuY2hpbGRfcGFnZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWxpZGF0ZWRQYWdlLmNoaWxkX2RpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWRQYWdlLmNoaWxkX2RpcmVjdG9yaWVzID0gdGhpcy52YWxpZGF0ZURpcmVjdG9yaWVzKHZhbGlkYXRlZFBhZ2UuY2hpbGRfZGlyZWN0b3JpZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRQYWdlIGFzIElDb25maWdQYWdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHNpbmdsZSBkaXJlY3RvcnkgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVEaXJlY3RvcmllcyhyYXdEaXJlY3RvcmllczogYW55W10pOiBJQ29uZmlnRGlyZWN0b3J5W10ge1xuICAgICAgICBsZXQgdmFsaWRhdGVkRGlyZWN0b3JpZXM6IElDb25maWdEaXJlY3RvcnlbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd0RpcmVjdG9yaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWREaXJlY3Rvcmllcy5wdXNoKHRoaXMudmFsaWRhdGVEaXJlY3RvcnkocmF3RGlyZWN0b3JpZXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkRGlyZWN0b3JpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIGRpcmVjdG9yeSBleHRyYWN0ZWQgZnJvbSB0aGUgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZURpcmVjdG9yeShyYXdEaXJlY3Rvcnk6IGFueSk6IElDb25maWdEaXJlY3Rvcnkge1xuICAgICAgICBsZXQgdmFsaWRhdGVkRGlyZWN0b3J5OiBJQ29uZmlnRGlyZWN0b3J5ID0gQ29uZmlnLnZhbGlkYXRlTmFtZWRQcm9wZXJ0aWVzKFxuICAgICAgICAgICAgcmF3RGlyZWN0b3J5LFxuICAgICAgICAgICAgQ09ORklHX0RJUkVDVE9SWV9QUk9QRVJUSUVTLFxuICAgICAgICAgICAgJ2RpcmVjdG9yeSdcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodmFsaWRhdGVkRGlyZWN0b3J5LnRlbXBsYXRlICYmIHZhbGlkYXRlZERpcmVjdG9yeS50ZW1wbGF0ZV9kaXJlY3RvcnkpIHtcbiAgICAgICAgICAgIGxldCBlcnJvclN0cmluZyA9ICdFcnJvciBwYXJzaW5nIGRpcmVjdG9yeSBwcm9wZXJ0eSBmcm9tIHRoZSBjb25maWc6JztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdcXG4nO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1lvdSBjYW5ub3QgaGF2ZSBib3RoIGAnICsgTG9nZ2VyLmJyYW5kKCd0ZW1wbGF0ZScpICsgJ2AgYW5kICc7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnYCcgKyBMb2dnZXIuYnJhbmQoJ3RlbXBsYXRlX2RpcmVjdG9yeScpICsgJ2Agc3BlY2lmaWVkISc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWxpZGF0ZWREaXJlY3RvcnkuY29udGVudCAmJiB2YWxpZGF0ZWREaXJlY3RvcnkuY29udGVudF9kaXJlY3RvcnkpIHtcbiAgICAgICAgICAgIGxldCBlcnJvclN0cmluZyA9ICdFcnJvciBwYXJzaW5nIGRpcmVjdG9yeSBwcm9wZXJ0eSBmcm9tIHRoZSBjb25maWc6JztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdcXG4nO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1lvdSBjYW5ub3QgaGF2ZSBib3RoIGAnICsgTG9nZ2VyLmJyYW5kKCdjb250ZW50JykgKyAnYCBhbmQgJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdgJyArIExvZ2dlci5icmFuZCgnY29udGVudF9kaXJlY3RvcnknKSArICdgIHNwZWNpZmllZCEnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVkRGlyZWN0b3J5LnRlbXBsYXRlX2RpcmVjdG9yeSAmJiB2YWxpZGF0ZWREaXJlY3RvcnkuY29udGVudF9kaXJlY3RvcnkpIHtcbiAgICAgICAgICAgIGxldCBlcnJvclN0cmluZyA9ICdFcnJvciBwYXJzaW5nIGRpcmVjdG9yeSBwcm9wZXJ0eSBmcm9tIHRoZSBjb25maWc6JztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdcXG4nO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1lvdSBjYW5ub3QgaGF2ZSBib3RoIGAnICsgTG9nZ2VyLmJyYW5kKCd0ZW1wbGF0ZV9kaXJlY3RvcnknKSArICdgIGFuZCAnO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ2AnICsgTG9nZ2VyLmJyYW5kKCdjb250ZW50X2RpcmVjdG9yeScpICsgJ2Agc3BlY2lmaWVkISc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlZERpcmVjdG9yeS5tZW51cykge1xuICAgICAgICAgICAgdmFsaWRhdGVkRGlyZWN0b3J5Lm1lbnVzID0gdGhpcy52YWxpZGF0ZU1lbnVzKHZhbGlkYXRlZERpcmVjdG9yeS5tZW51cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZERpcmVjdG9yeSBhcyBJQ29uZmlnRGlyZWN0b3J5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHNpbmdsZSBtZW51IGV4dHJhY3RlZCBmcm9tIHRoZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVNZW51cyhyYXdNZW51czogYW55W10pOiBJQ29uZmlnTWVudVtdIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZE1lbnVzOiBJQ29uZmlnTWVudVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3TWVudXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZE1lbnVzLnB1c2goQ29uZmlnLnZhbGlkYXRlTWVudShyYXdNZW51c1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRNZW51cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBzaW5nbGUgbWVudSBleHRyYWN0ZWQgZnJvbSB0aGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyB2YWxpZGF0ZU1lbnUocmF3TWVudTogYW55KTogSUNvbmZpZ01lbnUge1xuICAgICAgICByZXR1cm4gQ29uZmlnLnZhbGlkYXRlTmFtZWRQcm9wZXJ0aWVzKHJhd01lbnUsIENPTkZJR19NRU5VX1BST1BFUlRJRVMsICdtZW51Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGFuIG9iamVjdCB1c2luZyBwcm92aWRlZCBuYW1lZCBwcm9wZXJ0eSB2YWxpZGF0b3JzXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVOYW1lZFByb3BlcnRpZXMoc291cmNlT2JqZWN0OiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogSUNvbmZpZ05hbWVkUHJvcGVydHlWYWxpZGF0b3JzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VHlwZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZE9iamVjdDogYW55ID0ge307XG4gICAgICAgIGZvciAobGV0IHByb3BlcnR5TmFtZSBpbiB2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9ycy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJhd1Byb3BlcnR5ID0gc291cmNlT2JqZWN0W3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5VmFsaWRhdG9yID0gdmFsaWRhdG9yc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChyYXdQcm9wZXJ0eSAhPT0gdW5kZWZpbmVkICYmIHJhd1Byb3BlcnR5ICE9PSBudWxsKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tbnVsbC1rZXl3b3JkXG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJvcGVydHlWYWxpZGF0b3IudHlwZUNoZWNrZXIocmF3UHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnRXJyb3IgcGFyc2luZyAnICsgcHJvcGVydHlUeXBlICsgJyBwcm9wZXJ0eSBmcm9tIHRoZSBjb25maWc6JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1Byb3BlcnR5IGAnICsgTG9nZ2VyLmJyYW5kKFN0cmluZ0hlbHBlci5zdHJpbmdpZnkocHJvcGVydHlOYW1lKSkgKyAnYCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclN0cmluZyArPSAnIHdpdGggdmFsdWUgYCcgKyBMb2dnZXIuYnJhbmQoU3RyaW5nSGVscGVyLnN0cmluZ2lmeShyYXdQcm9wZXJ0eSkpICsgJ2A6JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gcHJvcGVydHlWYWxpZGF0b3IudHlwZUVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlZE9iamVjdFtwcm9wZXJ0eU5hbWVdID0gcmF3UHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZE9iamVjdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWxpZGF0ZWQgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGdldCgpOiBJQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVkQ29uZmlnO1xuICAgIH1cbn1cbiJdfQ==
