"use strict";
var Util_1 = require('../helpers/Util');
var Logger_1 = require('../cli/Logger');
var StringHelper_1 = require('../helpers/StringHelper');
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
            validatedPage.menus = Config.validateMenus(validatedPage.menus);
        }
        if (validatedPage.child_pages) {
            validatedPage.child_pages = this.validatePages(validatedPage.child_pages);
        }
        if (validatedPage.child_directories) {
            validatedPage.child_directories = Config.validateDirectories(validatedPage.child_directories);
        }
        if (!validatedPage.template && validatedPage.id) {
            var errorString = 'Error parsing page property from the config:';
            errorString += '\n';
            errorString += 'You cannot have an `' + Logger_1.Logger.brand('id') + '` without ';
            errorString += '`' + Logger_1.Logger.brand('template') + '` specified!';
            throw new Error(errorString);
        }
        if (!validatedPage.template && validatedPage.menus) {
            var errorString = 'Error parsing page property from the config:';
            errorString += '\n';
            errorString += 'You cannot have an `' + Logger_1.Logger.brand('menus') + '` without ';
            errorString += '`' + Logger_1.Logger.brand('template') + '` specified!';
            throw new Error(errorString);
        }
        return validatedPage;
    };
    Config.validateDirectories = function (rawDirectories) {
        var validatedDirectories = [];
        for (var i = 0; i < rawDirectories.length; i++) {
            validatedDirectories.push(Config.validateDirectory(rawDirectories[i]));
        }
        return validatedDirectories;
    };
    Config.validateDirectory = function (rawDirectory) {
        var validatedDirectory = Config.validateNamedProperties(rawDirectory, exports.CONFIG_DIRECTORY_PROPERTIES, 'directory');
        var errorString = 'Error parsing directory property from the config:';
        errorString += '\n';
        if (validatedDirectory.template && validatedDirectory.template_directory) {
            errorString += 'You cannot have both `' + Logger_1.Logger.brand('template') + '` and ';
            errorString += '`' + Logger_1.Logger.brand('template_directory') + '` specified!';
            throw new Error(errorString);
        }
        if (validatedDirectory.content && validatedDirectory.content_directory) {
            errorString += 'You cannot have both `' + Logger_1.Logger.brand('content') + '` and ';
            errorString += '`' + Logger_1.Logger.brand('content_directory') + '` specified!';
            throw new Error(errorString);
        }
        if (validatedDirectory.template_directory && validatedDirectory.content_directory) {
            errorString += 'You cannot have both `' + Logger_1.Logger.brand('template_directory') + '` and ';
            errorString += '`' + Logger_1.Logger.brand('content_directory') + '` specified!';
            throw new Error(errorString);
        }
        if (!validatedDirectory.template_directory && validatedDirectory.id_key) {
            errorString += 'You cannot have an `' + Logger_1.Logger.brand('id_key') + '` without ';
            errorString += '`' + Logger_1.Logger.brand('template_directory') + '` specified!';
            throw new Error(errorString);
        }
        if (validatedDirectory.menus) {
            validatedDirectory.menus = Config.validateMenus(validatedDirectory.menus);
        }
        return validatedDirectory;
    };
    Config.validateMenus = function (rawMenus) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEscUJBQW1CLGlCQUFpQixDQUFDLENBQUE7QUFDckMsdUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLDZCQUEyQix5QkFBeUIsQ0FBQyxDQUFBO0FBc0Z4Qyx5QkFBaUIsR0FBK0I7SUFDekQ7UUFDSSxJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsNkJBQTZCO1FBQ3RDLFlBQVksRUFBRSxXQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsT0FBTztRQUMzQyxXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSwyQ0FBMkM7S0FDekQ7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsWUFBWSxFQUFFLEVBQUU7UUFDaEIsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxFQUExQixDQUEwQjtRQUNuRCxTQUFTLEVBQUUsc0NBQXNDO0tBQ3BEO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLFlBQVksRUFBRSxFQUFFO1FBQ2hCLFdBQVcsRUFBRSxVQUFDLE1BQU0sSUFBSyxPQUFBLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBMUIsQ0FBMEI7UUFDbkQsU0FBUyxFQUFFLHVDQUF1QztLQUNyRDtJQUNEO1FBQ0ksSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLHNEQUFzRDtRQUMvRCxZQUFZLEVBQUUsS0FBSztRQUNuQixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxTQUFTLEVBQTNCLENBQTJCO1FBQ3BELFNBQVMsRUFBRSwwQ0FBMEM7S0FDeEQ7SUFDRDtRQUNJLElBQUksRUFBRSwwQkFB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QUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLGVBQWUsQ0FBQyxZQUFZLENBQUMsR0FBRyxXQUFXLENBQUM7b0JBQ2hELENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBTU0sb0JBQUcsR0FBVjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0F6TkEsQUF5TkMsSUFBQTtBQXpOWSxjQUFNLFNBeU5sQixDQUFBIiwiZmlsZSI6InNyYy9jb21wb25lbnRzL0NvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQWxsIGNsYXNzZXMgYW5kIGludGVyZmFjZXMgcmVsYXRlZCB0byB0aGUgQmxpdHogY29uZmlnIGFuZCBkYXRhIHR5cGVzIHVzZWQgaW4gaXRcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCB7VXRpbH0gZnJvbSAnLi4vaGVscGVycy9VdGlsJztcbmltcG9ydCB7TG9nZ2VyLCBMb2dMZXZlbH0gZnJvbSAnLi4vY2xpL0xvZ2dlcic7XG5pbXBvcnQge1N0cmluZ0hlbHBlcn0gZnJvbSAnLi4vaGVscGVycy9TdHJpbmdIZWxwZXInO1xuXG4vKipcbiAqIE1lbnUgaW50ZXJmYWNlIGFzIHNlZW4gaW4gdGhlIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ01lbnUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0aXRsZT86IHN0cmluZztcbiAgICB0aXRsZV9rZXk/OiBzdHJpbmc7XG4gICAga2V5cz86IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgdGhlIGNoaWxkIGRpcmVjdG9yeSBvZiBhIHBhZ2VcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdEaXJlY3Rvcnkge1xuICAgIHVyaT86IHN0cmluZztcbiAgICB1cmlfa2V5Pzogc3RyaW5nO1xuICAgIGlkX2tleT86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHRlbXBsYXRlX2RpcmVjdG9yeT86IHN0cmluZztcbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgICBjb250ZW50X2RpcmVjdG9yeT86IHN0cmluZztcbiAgICBjb250ZW50Pzogc3RyaW5nO1xuICAgIG1lbnVzPzogSUNvbmZpZ01lbnVbXTtcbn1cblxuLyoqXG4gKiBQYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnUGFnZSB7XG4gICAgdXJpPzogc3RyaW5nO1xuICAgIGlkPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gICAgY29udGVudD86IHN0cmluZztcbiAgICBtZW51cz86IElDb25maWdNZW51W107XG4gICAgY2hpbGRfcGFnZXM/OiBJQ29uZmlnUGFnZVtdO1xuICAgIGNoaWxkX2RpcmVjdG9yaWVzPzogSUNvbmZpZ0RpcmVjdG9yeVtdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHRvcCBsZXZlbCBjb25maWdcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xuICAgIGJsaXR6X3ZlcnNpb246IHN0cmluZztcbiAgICBzaXRlX3VybDogc3RyaW5nO1xuICAgIHNpdGVfcm9vdDogc3RyaW5nO1xuICAgIGFic29sdXRlX3VybHM6IGJvb2xlYW47XG4gICAgZXhwbGljaXRfaHRtbF9leHRlbnNpb25zOiBib29sZWFuO1xuICAgIHBsdWdpbnM6IHN0cmluZ1tdO1xuICAgIGdsb2JhbHM6IGFueTtcbiAgICBwYWdlczogSUNvbmZpZ1BhZ2VbXTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGFuIG9iamVjdCB1c2VkIHRvIHZhbGlkYXRlIGEgY2VydGFpbiBwcm9wZXJ0eSBvZiB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnUHJvcGVydHlWYWxpZGF0b3Ige1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgZGVmYXVsdFZhbHVlOiBhbnk7XG4gICAgdHlwZUNoZWNrZXI6IChvYmplY3Q6IGFueSkgPT4gYm9vbGVhbjtcbiAgICB0eXBlRXJyb3I6IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHBhZ2UvZGlyZWN0b3J5IHZhbGlkYXRvcnMsIGRvZXNuJ3QgaGF2ZSBkZWZhdWx0IHZhbHVlc1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ05hbWVkUHJvcGVydHlWYWxpZGF0b3JzIHtcbiAgICBbbmFtZTogc3RyaW5nXToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdDogYW55KSA9PiBib29sZWFuLFxuICAgICAgICB0eXBlRXJyb3I6IHN0cmluZyxcbiAgICB9O1xufVxuXG4vKipcbiAqIEFycmF5IG9mIHZhbGlkYXRpb24gb2JqZWN0cyBmb3IgdGhlIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBDT05GSUdfUFJPUEVSVElFUzogSUNvbmZpZ1Byb3BlcnR5VmFsaWRhdG9yW10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnYmxpdHpfdmVyc2lvbicsXG4gICAgICAgIG1lc3NhZ2U6ICdVc2luZyBjdXJyZW50IEJsaXR6IHZlcnNpb24nLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IFV0aWwuZ2V0UGFja2FnZUluZm8oKS52ZXJzaW9uLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0JsaXR6IHZlcnNpb24gaXMgc3VwcG9zZWQgdG8gYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3NpdGVfdXJsJyxcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGFuIGVtcHR5IHN0cmluZycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnU2l0ZSBVUkwgaXMgc3VwcG9zZWQgdG8gYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3NpdGVfcm9vdCcsXG4gICAgICAgIG1lc3NhZ2U6ICdVc2luZyBhbiBlbXB0eSBzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICcnLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ1NpdGUgcm9vdCBpcyBzdXBwb3NlZCB0byBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnYWJzb2x1dGVfdXJscycsXG4gICAgICAgIG1lc3NhZ2U6ICdEaXNhYmxpbmcgYWJzb2x1dGUgVVJMcywgdXNpbmcgcmVsYXRpdmUgVVJMcyBpbnN0ZWFkJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdib29sZWFuJyxcbiAgICAgICAgdHlwZUVycm9yOiAnQWJzb2x1dGUgVVJMcyBzaG91bGQgYmUgYSBib29sZWFuIHZhbHVlIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdleHBsaWNpdF9odG1sX2V4dGVuc2lvbnMnLFxuICAgICAgICBtZXNzYWdlOiAnRW5hYmxpbmcgZXhwbGljaXQgSFRNTCBleHRlbnNpb25zJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ2Jvb2xlYW4nLFxuICAgICAgICB0eXBlRXJyb3I6ICdFeHBsaWNpdCBIVE1MIGV4dGVuc2lvbnMgc2hvdWxkIGJlIGEgYm9vbGVhbiB2YWx1ZSEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAncGx1Z2lucycsXG4gICAgICAgIG1lc3NhZ2U6ICdBc3N1bWluZyB0aGVyZSBhcmUgbm8gcGx1Z2lucycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogW10sXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgIShvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHR5cGVFcnJvcjogJ1BsdWdpbnMgbXVzdCBiZSBhbiBhcnJheSBvZiBzdHJpbmdzIChwbHVnaW4gbmFtZXMpIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdnbG9iYWxzJyxcbiAgICAgICAgbWVzc2FnZTogJ0Fzc3VtaW5nIHRoZXJlIGFyZSBubyBnbG9iYWxzJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB7fSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmICEob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpLFxuICAgICAgICB0eXBlRXJyb3I6ICdHbG9iYWxzIG11c3QgYmUgYW4gb2JqZWN0IChhbmQgbm90IGFuIGFycmF5KSEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAncGFnZXMnLFxuICAgICAgICBtZXNzYWdlOiAnQXNzdW1pbmcgdGhlcmUgYXJlIG5vIHBhZ2VzJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBbXSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdQYWdlcyBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbl07XG5cbi8qKlxuICogQXJyYXkgb2YgdmFsaWRhdGlvbiBvYmplY3RzIGZvciBhIGNvbmZpZyBwYWdlXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19QQUdFX1BST1BFUlRJRVM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICB1cmk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBVUkkgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBpZDoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIElEIGlzIHNldCwgaXQgbXVzdCBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG5hbWUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB0ZW1wbGF0ZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5pc0VtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRlbXBsYXRlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIG1lbnVzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbWVudXMgYXJlIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG4gICAgY2hpbGRfcGFnZXM6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBtZW51cyBhcmUgc2V0LCBpdCBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbiAgICBjaGlsZF9kaXJlY3Rvcmllczoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG1lbnVzIGFyZSBzZXQsIGl0IG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxufTtcblxuLyoqXG4gKiBBcnJheSBvZiB2YWxpZGF0aW9uIG9iamVjdHMgZm9yIGEgY29uZmlnIGRpcmVjdG9yeVxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBDT05GSUdfRElSRUNUT1JZX1BST1BFUlRJRVM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICB1cmk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBVUkkgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB1cmlfa2V5OiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgVVJJIGtleSBpcyBzZXQsIGl0IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nIScsXG4gICAgfSxcbiAgICBpZF9rZXk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBJRCBrZXkgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbmFtZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlX2RpcmVjdG9yeToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5pc0VtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRlbXBsYXRlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgdGVtcGxhdGUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZyEnLFxuICAgIH0sXG4gICAgY29udGVudF9kaXJlY3Rvcnk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIG1lbnVzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbWVudXMgYXJlIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG59O1xuXG4vKipcbiAqIEFycmF5IG9mIHZhbGlkYXRpb24gb2JqZWN0cyBmb3IgYSBjb25maWcgZGlyZWN0b3J5XG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19NRU5VX1BST1BFUlRJRVM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbmFtZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nIScsXG4gICAgfSxcbiAgICB0aXRsZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRpdGxlIGlzIHNldCwgaXQgbXVzdCBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAgdGl0bGVfa2V5OiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgdGl0bGUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBrZXlzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYga2V5cyBpcyBzZXQsIGl0IG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxufTtcblxuLyoqXG4gKiBAY2xhc3MgQ2xhc3MgcmVzcG9uc2libGUgZm9yIGxvYWRpbmcgYW5kIHZhbGlkYXRpbmcgdGhlIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWcge1xuICAgIC8qKlxuICAgICAqIFJhdyBKYXZhU2NyaXB0IG9iamVjdCBnZW5lcmF0ZWQgZnJvbSBZQU1MIGZvdW5kIGluIHRoZSBjb25maWdcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHJhd0NvbmZpZzogYW55O1xuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VkIGFuZCB2YWxpZGF0ZWQgY29uZmlnIHRoYXQgZm9sbG93cyB0aGUgaW50ZXJmYWNlcyBkZWZpbmVkIGFib3ZlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZWRDb25maWc6IElDb25maWc7XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyBhIHJhdyBjb25maWcgZm9yIHZhbGlkYXRpb25cbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZChyYXdDb25maWc6IGFueSkge1xuICAgICAgICB0aGlzLnJhd0NvbmZpZyA9IHJhd0NvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIHJhdyBjb25maWcgdG8gY3JlYXRlIHRoZSB2YWxpZGF0ZWQgY29uZmlnLCBpZiBwb3NzaWJsZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyB2YWxpZGF0ZSgpIHtcblxuICAgICAgICBpZiAodGhpcy5yYXdDb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb25maWcgd2FzIGxvYWRlZCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yYXdDb25maWcgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1cHBsaWVkIGNvbmZpZyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbGlkYXRlZENvbmZpZzogYW55ID0ge307XG5cbiAgICAgICAgbGV0IHByb3BlcnR5Q291bnQgPSBDT05GSUdfUFJPUEVSVElFUy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydHlDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdG9yID0gQ09ORklHX1BST1BFUlRJRVNbaV07XG4gICAgICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnJhd0NvbmZpZ1t2YWxpZGF0b3IubmFtZV07XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT09IHVuZGVmaW5lZCB8fCBwcm9wZXJ0eSA9PT0gbnVsbCkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICAgICAgICAgIGxldCBkaXNwbGF5VmFsdWUgPSAnYCcgKyBTdHJpbmdIZWxwZXIuc3RyaW5naWZ5KHZhbGlkYXRvci5kZWZhdWx0VmFsdWUpICsgJ2AnO1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25TdHJpbmcgPSB2YWxpZGF0b3IubWVzc2FnZSArICcsICcgKyBMb2dnZXIuYnJhbmQoZGlzcGxheVZhbHVlKTtcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKCdgJyArIExvZ2dlci5icmFuZCh2YWxpZGF0b3IubmFtZSkgKyAnYCBpcyBub3QgZGVmaW5lZDogJyArIGFjdGlvblN0cmluZywgTG9nTGV2ZWwuV2Fybik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVkQ29uZmlnW3ZhbGlkYXRvci5uYW1lXSA9IHZhbGlkYXRvci5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWxpZGF0b3IudHlwZUNoZWNrZXIocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9yU3RyaW5nID0gJ0ludmFsaWQgdHlwZSBmb3IgYCcgKyBMb2dnZXIuYnJhbmQodmFsaWRhdG9yLm5hbWUpICsgJ2A6ICcgKyB2YWxpZGF0b3IudHlwZUVycm9yO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclN0cmluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlZENvbmZpZ1t2YWxpZGF0b3IubmFtZV0gPSBwcm9wZXJ0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhbGlkYXRlZENvbmZpZy5wYWdlcyA9IHRoaXMudmFsaWRhdGVQYWdlcyh2YWxpZGF0ZWRDb25maWcucGFnZXMpO1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGVkQ29uZmlnID0gdmFsaWRhdGVkQ29uZmlnIGFzIElDb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIG11bHRpcGxlIHBhZ2VzIGV4dHJhY3RlZCBmcm9tIHRoZSBjb25maWdcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlUGFnZXMocmF3UGFnZXM6IGFueVtdKTogSUNvbmZpZ1BhZ2VbXSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWRQYWdlczogSUNvbmZpZ1BhZ2VbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd1BhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWRQYWdlcy5wdXNoKHRoaXMudmFsaWRhdGVQYWdlKHJhd1BhZ2VzW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZFBhZ2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHNpbmdsZSBwYWdlIGV4dHJhY3RlZCBmcm9tIHRoZSBjb25maWdcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlUGFnZShyYXdQYWdlOiBhbnkpOiBJQ29uZmlnUGFnZSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWRQYWdlOiBJQ29uZmlnUGFnZSA9IENvbmZpZy52YWxpZGF0ZU5hbWVkUHJvcGVydGllcyhcbiAgICAgICAgICAgIHJhd1BhZ2UsXG4gICAgICAgICAgICBDT05GSUdfUEFHRV9QUk9QRVJUSUVTLFxuICAgICAgICAgICAgJ3BhZ2UnXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlZFBhZ2UubWVudXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZFBhZ2UubWVudXMgPSBDb25maWcudmFsaWRhdGVNZW51cyh2YWxpZGF0ZWRQYWdlLm1lbnVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVkUGFnZS5jaGlsZF9wYWdlcykge1xuICAgICAgICAgICAgdmFsaWRhdGVkUGFnZS5jaGlsZF9wYWdlcyA9IHRoaXMudmFsaWRhdGVQYWdlcyh2YWxpZGF0ZWRQYWdlLmNoaWxkX3BhZ2VzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVkUGFnZS5jaGlsZF9kaXJlY3Rvcmllcykge1xuICAgICAgICAgICAgdmFsaWRhdGVkUGFnZS5jaGlsZF9kaXJlY3RvcmllcyA9IENvbmZpZy52YWxpZGF0ZURpcmVjdG9yaWVzKHZhbGlkYXRlZFBhZ2UuY2hpbGRfZGlyZWN0b3JpZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWRhdGVkUGFnZS50ZW1wbGF0ZSAmJiB2YWxpZGF0ZWRQYWdlLmlkKSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnRXJyb3IgcGFyc2luZyBwYWdlIHByb3BlcnR5IGZyb20gdGhlIGNvbmZpZzonO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1xcbic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnWW91IGNhbm5vdCBoYXZlIGFuIGAnICsgTG9nZ2VyLmJyYW5kKCdpZCcpICsgJ2Agd2l0aG91dCAnO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ2AnICsgTG9nZ2VyLmJyYW5kKCd0ZW1wbGF0ZScpICsgJ2Agc3BlY2lmaWVkISc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWRhdGVkUGFnZS50ZW1wbGF0ZSAmJiB2YWxpZGF0ZWRQYWdlLm1lbnVzKSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnRXJyb3IgcGFyc2luZyBwYWdlIHByb3BlcnR5IGZyb20gdGhlIGNvbmZpZzonO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1xcbic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnWW91IGNhbm5vdCBoYXZlIGFuIGAnICsgTG9nZ2VyLmJyYW5kKCdtZW51cycpICsgJ2Agd2l0aG91dCAnO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ2AnICsgTG9nZ2VyLmJyYW5kKCd0ZW1wbGF0ZScpICsgJ2Agc3BlY2lmaWVkISc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRQYWdlIGFzIElDb25maWdQYWdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHNpbmdsZSBkaXJlY3RvcnkgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHZhbGlkYXRlRGlyZWN0b3JpZXMocmF3RGlyZWN0b3JpZXM6IGFueVtdKTogSUNvbmZpZ0RpcmVjdG9yeVtdIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZERpcmVjdG9yaWVzOiBJQ29uZmlnRGlyZWN0b3J5W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXdEaXJlY3Rvcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsaWRhdGVkRGlyZWN0b3JpZXMucHVzaChDb25maWcudmFsaWRhdGVEaXJlY3RvcnkocmF3RGlyZWN0b3JpZXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkRGlyZWN0b3JpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIGRpcmVjdG9yeSBleHRyYWN0ZWQgZnJvbSB0aGUgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVEaXJlY3RvcnkocmF3RGlyZWN0b3J5OiBhbnkpOiBJQ29uZmlnRGlyZWN0b3J5IHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZERpcmVjdG9yeTogSUNvbmZpZ0RpcmVjdG9yeSA9IENvbmZpZy52YWxpZGF0ZU5hbWVkUHJvcGVydGllcyhcbiAgICAgICAgICAgIHJhd0RpcmVjdG9yeSxcbiAgICAgICAgICAgIENPTkZJR19ESVJFQ1RPUllfUFJPUEVSVElFUyxcbiAgICAgICAgICAgICdkaXJlY3RvcnknXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IGVycm9yU3RyaW5nID0gJ0Vycm9yIHBhcnNpbmcgZGlyZWN0b3J5IHByb3BlcnR5IGZyb20gdGhlIGNvbmZpZzonO1xuICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgaWYgKHZhbGlkYXRlZERpcmVjdG9yeS50ZW1wbGF0ZSAmJiB2YWxpZGF0ZWREaXJlY3RvcnkudGVtcGxhdGVfZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnWW91IGNhbm5vdCBoYXZlIGJvdGggYCcgKyBMb2dnZXIuYnJhbmQoJ3RlbXBsYXRlJykgKyAnYCBhbmQgJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdgJyArIExvZ2dlci5icmFuZCgndGVtcGxhdGVfZGlyZWN0b3J5JykgKyAnYCBzcGVjaWZpZWQhJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkYXRlZERpcmVjdG9yeS5jb250ZW50ICYmIHZhbGlkYXRlZERpcmVjdG9yeS5jb250ZW50X2RpcmVjdG9yeSkge1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1lvdSBjYW5ub3QgaGF2ZSBib3RoIGAnICsgTG9nZ2VyLmJyYW5kKCdjb250ZW50JykgKyAnYCBhbmQgJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdgJyArIExvZ2dlci5icmFuZCgnY29udGVudF9kaXJlY3RvcnknKSArICdgIHNwZWNpZmllZCEnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVkRGlyZWN0b3J5LnRlbXBsYXRlX2RpcmVjdG9yeSAmJiB2YWxpZGF0ZWREaXJlY3RvcnkuY29udGVudF9kaXJlY3RvcnkpIHtcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdZb3UgY2Fubm90IGhhdmUgYm90aCBgJyArIExvZ2dlci5icmFuZCgndGVtcGxhdGVfZGlyZWN0b3J5JykgKyAnYCBhbmQgJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdgJyArIExvZ2dlci5icmFuZCgnY29udGVudF9kaXJlY3RvcnknKSArICdgIHNwZWNpZmllZCEnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZhbGlkYXRlZERpcmVjdG9yeS50ZW1wbGF0ZV9kaXJlY3RvcnkgJiYgdmFsaWRhdGVkRGlyZWN0b3J5LmlkX2tleSkge1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1lvdSBjYW5ub3QgaGF2ZSBhbiBgJyArIExvZ2dlci5icmFuZCgnaWRfa2V5JykgKyAnYCB3aXRob3V0ICc7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnYCcgKyBMb2dnZXIuYnJhbmQoJ3RlbXBsYXRlX2RpcmVjdG9yeScpICsgJ2Agc3BlY2lmaWVkISc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlZERpcmVjdG9yeS5tZW51cykge1xuICAgICAgICAgICAgdmFsaWRhdGVkRGlyZWN0b3J5Lm1lbnVzID0gQ29uZmlnLnZhbGlkYXRlTWVudXModmFsaWRhdGVkRGlyZWN0b3J5Lm1lbnVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkRGlyZWN0b3J5IGFzIElDb25maWdEaXJlY3Rvcnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIG1lbnUgZXh0cmFjdGVkIGZyb20gdGhlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVNZW51cyhyYXdNZW51czogYW55W10pOiBJQ29uZmlnTWVudVtdIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZE1lbnVzOiBJQ29uZmlnTWVudVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3TWVudXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZE1lbnVzLnB1c2goQ29uZmlnLnZhbGlkYXRlTWVudShyYXdNZW51c1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRNZW51cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBzaW5nbGUgbWVudSBleHRyYWN0ZWQgZnJvbSB0aGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyB2YWxpZGF0ZU1lbnUocmF3TWVudTogYW55KTogSUNvbmZpZ01lbnUge1xuICAgICAgICByZXR1cm4gQ29uZmlnLnZhbGlkYXRlTmFtZWRQcm9wZXJ0aWVzKHJhd01lbnUsIENPTkZJR19NRU5VX1BST1BFUlRJRVMsICdtZW51Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGFuIG9iamVjdCB1c2luZyBwcm92aWRlZCBuYW1lZCBwcm9wZXJ0eSB2YWxpZGF0b3JzXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVOYW1lZFByb3BlcnRpZXMoc291cmNlT2JqZWN0OiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogSUNvbmZpZ05hbWVkUHJvcGVydHlWYWxpZGF0b3JzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VHlwZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZE9iamVjdDogYW55ID0ge307XG4gICAgICAgIGZvciAobGV0IHByb3BlcnR5TmFtZSBpbiB2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9ycy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJhd1Byb3BlcnR5ID0gc291cmNlT2JqZWN0W3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5VmFsaWRhdG9yID0gdmFsaWRhdG9yc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChyYXdQcm9wZXJ0eSAhPT0gdW5kZWZpbmVkICYmIHJhd1Byb3BlcnR5ICE9PSBudWxsKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tbnVsbC1rZXl3b3JkXG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJvcGVydHlWYWxpZGF0b3IudHlwZUNoZWNrZXIocmF3UHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnRXJyb3IgcGFyc2luZyAnICsgcHJvcGVydHlUeXBlICsgJyBwcm9wZXJ0eSBmcm9tIHRoZSBjb25maWc6JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1Byb3BlcnR5IGAnICsgTG9nZ2VyLmJyYW5kKFN0cmluZ0hlbHBlci5zdHJpbmdpZnkocHJvcGVydHlOYW1lKSkgKyAnYCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclN0cmluZyArPSAnIHdpdGggdmFsdWUgYCcgKyBMb2dnZXIuYnJhbmQoU3RyaW5nSGVscGVyLnN0cmluZ2lmeShyYXdQcm9wZXJ0eSkpICsgJ2A6JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gcHJvcGVydHlWYWxpZGF0b3IudHlwZUVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlZE9iamVjdFtwcm9wZXJ0eU5hbWVdID0gcmF3UHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZE9iamVjdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWxpZGF0ZWQgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGdldCgpOiBJQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVkQ29uZmlnO1xuICAgIH1cbn1cbiJdfQ==
