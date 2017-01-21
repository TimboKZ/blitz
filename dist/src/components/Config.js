"use strict";
var Util_1 = require("../helpers/Util");
var Logger_1 = require("../cli/Logger");
var StringHelper_1 = require("../helpers/StringHelper");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsd0NBQXFDO0FBQ3JDLHdDQUErQztBQUMvQyx3REFBcUQ7QUFzRnhDLFFBQUEsbUJBQW1CLEdBQUcsV0FBVyxDQUFDO0FBTWxDLFFBQUEsaUJBQWlCLEdBQStCO0lBQ3pEO1FBQ0ksSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxZQUFZLEVBQUUsV0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU87UUFDM0MsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxFQUExQixDQUEwQjtRQUNuRCxTQUFTLEVBQUUsMkNBQTJDO0tBQ3pEO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtRQUNoQixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLFlBQVksRUFBRSxFQUFFO1FBQ2hCLFdBQVcsRUFBRSxVQUFDLE1BQU0sSUFBSyxPQUFBLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBMUIsQ0FBMEI7UUFDbkQsU0FBUyxFQUFFLHNDQUFzQztLQUNwRDtJQUNEO1FBQ0ksSUFBSSxFQUFFLFdBQVc7UUFDakIsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxZQUFZLEVBQUUsRUFBRTtRQUNoQixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSx1Q0FBdUM7S0FDckQ7SUFDRDtRQUNJLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxzREFBc0Q7UUFDL0QsWUFBWSxFQUFFLEtBQUs7UUFDbkIsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssU0FBUyxFQUEzQixDQUEyQjtRQUNwRCxTQUFTLEVBQUUsMENBQTBDO0tBQ3hEO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsMEJBQTBCO1FBQ2hDLE9B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LFdBQVcsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7d0JBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ2pDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLFdBQVcsQ0FBQztvQkFDaEQsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFNTSxvQkFBRyxHQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQTFNQSxBQTBNQyxJQUFBO0FBMU1ZLHdCQUFNIiwiZmlsZSI6InNyYy9jb21wb25lbnRzL0NvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQWxsIGNsYXNzZXMgYW5kIGludGVyZmFjZXMgcmVsYXRlZCB0byB0aGUgQmxpdHogY29uZmlnIGFuZCBkYXRhIHR5cGVzIHVzZWQgaW4gaXRcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCB7VXRpbH0gZnJvbSAnLi4vaGVscGVycy9VdGlsJztcbmltcG9ydCB7TG9nZ2VyLCBMb2dMZXZlbH0gZnJvbSAnLi4vY2xpL0xvZ2dlcic7XG5pbXBvcnQge1N0cmluZ0hlbHBlcn0gZnJvbSAnLi4vaGVscGVycy9TdHJpbmdIZWxwZXInO1xuXG4vKipcbiAqIE1lbnUgaW50ZXJmYWNlIGFzIHNlZW4gaW4gdGhlIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ01lbnUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0aXRsZT86IHN0cmluZztcbiAgICB0aXRsZV9rZXk/OiBzdHJpbmc7XG4gICAga2V5cz86IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgdGhlIGNoaWxkIGRpcmVjdG9yeSBvZiBhIHBhZ2VcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdEaXJlY3Rvcnkge1xuICAgIHVyaT86IHN0cmluZztcbiAgICB1cmlfa2V5Pzogc3RyaW5nO1xuICAgIGlkX2tleT86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHRlbXBsYXRlX2RpcmVjdG9yeT86IHN0cmluZztcbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgICBjb250ZW50X2RpcmVjdG9yeT86IHN0cmluZztcbiAgICBjb250ZW50Pzogc3RyaW5nO1xuICAgIG1lbnVzPzogSUNvbmZpZ01lbnVbXTtcbn1cblxuLyoqXG4gKiBQYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnUGFnZSB7XG4gICAgdXJpPzogc3RyaW5nO1xuICAgIGlkPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gICAgY29udGVudD86IHN0cmluZztcbiAgICBtZW51cz86IElDb25maWdNZW51W107XG4gICAgY2hpbGRfcGFnZXM/OiBJQ29uZmlnUGFnZVtdO1xuICAgIGNoaWxkX2RpcmVjdG9yaWVzPzogSUNvbmZpZ0RpcmVjdG9yeVtdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHRvcCBsZXZlbCBjb25maWdcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xuICAgIGJsaXR6X3ZlcnNpb246IHN0cmluZztcbiAgICBzaXRlX3VybDogc3RyaW5nO1xuICAgIHNpdGVfcm9vdDogc3RyaW5nO1xuICAgIGFic29sdXRlX3VybHM6IGJvb2xlYW47XG4gICAgZXhwbGljaXRfaHRtbF9leHRlbnNpb25zOiBib29sZWFuO1xuICAgIHBsdWdpbnM6IHN0cmluZ1tdO1xuICAgIGdsb2JhbHM6IGFueTtcbiAgICBwYWdlczogSUNvbmZpZ1BhZ2VbXTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGFuIG9iamVjdCB1c2VkIHRvIHZhbGlkYXRlIGEgY2VydGFpbiBwcm9wZXJ0eSBvZiB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnUHJvcGVydHlWYWxpZGF0b3Ige1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgZGVmYXVsdFZhbHVlOiBhbnk7XG4gICAgdHlwZUNoZWNrZXI6IChvYmplY3Q6IGFueSkgPT4gYm9vbGVhbjtcbiAgICB0eXBlRXJyb3I6IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHBhZ2UvZGlyZWN0b3J5IHZhbGlkYXRvcnMsIGRvZXNuJ3QgaGF2ZSBkZWZhdWx0IHZhbHVlc1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ05hbWVkUHJvcGVydHlWYWxpZGF0b3JzIHtcbiAgICBbbmFtZTogc3RyaW5nXToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdDogYW55KSA9PiBib29sZWFuLFxuICAgICAgICB0eXBlRXJyb3I6IHN0cmluZyxcbiAgICB9O1xufVxuXG4vKipcbiAqIEdlbmVyaWNGaWxlIHRoYXQgaXMgdHJlYXRlZCBhcyB0aGUgQmxpdHogY29uZmlnIGJ5IGRlZmF1bHRcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05GSUdfTkFNRSA9ICdibGl0ei55bWwnO1xuXG4vKipcbiAqIEFycmF5IG9mIHZhbGlkYXRpb24gb2JqZWN0cyBmb3IgdGhlIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBDT05GSUdfUFJPUEVSVElFUzogSUNvbmZpZ1Byb3BlcnR5VmFsaWRhdG9yW10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnYmxpdHpfdmVyc2lvbicsXG4gICAgICAgIG1lc3NhZ2U6ICdVc2luZyBjdXJyZW50IEJsaXR6IHZlcnNpb24nLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IFV0aWwuZ2V0UGFja2FnZUluZm8oKS52ZXJzaW9uLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0JsaXR6IHZlcnNpb24gaXMgc3VwcG9zZWQgdG8gYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3NpdGVfdXJsJyxcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGFuIGVtcHR5IHN0cmluZycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnU2l0ZSBVUkwgaXMgc3VwcG9zZWQgdG8gYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3NpdGVfcm9vdCcsXG4gICAgICAgIG1lc3NhZ2U6ICdVc2luZyBhbiBlbXB0eSBzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICcnLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ1NpdGUgcm9vdCBpcyBzdXBwb3NlZCB0byBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnYWJzb2x1dGVfdXJscycsXG4gICAgICAgIG1lc3NhZ2U6ICdEaXNhYmxpbmcgYWJzb2x1dGUgVVJMcywgdXNpbmcgcmVsYXRpdmUgVVJMcyBpbnN0ZWFkJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdib29sZWFuJyxcbiAgICAgICAgdHlwZUVycm9yOiAnQWJzb2x1dGUgVVJMcyBzaG91bGQgYmUgYSBib29sZWFuIHZhbHVlIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdleHBsaWNpdF9odG1sX2V4dGVuc2lvbnMnLFxuICAgICAgICBtZXNzYWdlOiAnRW5hYmxpbmcgZXhwbGljaXQgSFRNTCBleHRlbnNpb25zJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ2Jvb2xlYW4nLFxuICAgICAgICB0eXBlRXJyb3I6ICdFeHBsaWNpdCBIVE1MIGV4dGVuc2lvbnMgc2hvdWxkIGJlIGEgYm9vbGVhbiB2YWx1ZSEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAncGx1Z2lucycsXG4gICAgICAgIG1lc3NhZ2U6ICdBc3N1bWluZyB0aGVyZSBhcmUgbm8gcGx1Z2lucycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogW10sXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgIShvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W2ldICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIHR5cGVFcnJvcjogJ1BsdWdpbnMgbXVzdCBiZSBhbiBhcnJheSBvZiBzdHJpbmdzIChwbHVnaW4gbmFtZXMpIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdnbG9iYWxzJyxcbiAgICAgICAgbWVzc2FnZTogJ0Fzc3VtaW5nIHRoZXJlIGFyZSBubyBnbG9iYWxzJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB7fSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmICEob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpLFxuICAgICAgICB0eXBlRXJyb3I6ICdHbG9iYWxzIG11c3QgYmUgYW4gb2JqZWN0IChhbmQgbm90IGFuIGFycmF5KSEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAncGFnZXMnLFxuICAgICAgICBtZXNzYWdlOiAnQXNzdW1pbmcgdGhlcmUgYXJlIG5vIHBhZ2VzJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBbXSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdQYWdlcyBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbl07XG5cbi8qKlxuICogQXJyYXkgb2YgdmFsaWRhdGlvbiBvYmplY3RzIGZvciBhIGNvbmZpZyBwYWdlXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19QQUdFX1BST1BFUlRJRVM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICB1cmk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBVUkkgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBpZDoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIElEIGlzIHNldCwgaXQgbXVzdCBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG5hbWUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB0ZW1wbGF0ZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5pc0VtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRlbXBsYXRlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIG1lbnVzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbWVudXMgYXJlIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG4gICAgY2hpbGRfcGFnZXM6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBtZW51cyBhcmUgc2V0LCBpdCBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbiAgICBjaGlsZF9kaXJlY3Rvcmllczoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG1lbnVzIGFyZSBzZXQsIGl0IG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxufTtcblxuLyoqXG4gKiBBcnJheSBvZiB2YWxpZGF0aW9uIG9iamVjdHMgZm9yIGEgY29uZmlnIGRpcmVjdG9yeVxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBDT05GSUdfRElSRUNUT1JZX1BST1BFUlRJRVM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICB1cmk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBVUkkgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB1cmlfa2V5OiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgVVJJIGtleSBpcyBzZXQsIGl0IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nIScsXG4gICAgfSxcbiAgICBpZF9rZXk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBJRCBrZXkgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbmFtZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlX2RpcmVjdG9yeToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5pc0VtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRlbXBsYXRlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgdGVtcGxhdGUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZyEnLFxuICAgIH0sXG4gICAgY29udGVudF9kaXJlY3Rvcnk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIG1lbnVzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbWVudXMgYXJlIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG59O1xuXG4vKipcbiAqIEFycmF5IG9mIHZhbGlkYXRpb24gb2JqZWN0cyBmb3IgYSBjb25maWcgZGlyZWN0b3J5XG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19NRU5VX1BST1BFUlRJRVM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbmFtZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nIScsXG4gICAgfSxcbiAgICB0aXRsZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRpdGxlIGlzIHNldCwgaXQgbXVzdCBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAgdGl0bGVfa2V5OiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgdGl0bGUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBrZXlzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYga2V5cyBpcyBzZXQsIGl0IG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxufTtcblxuLyoqXG4gKiBAY2xhc3MgQ2xhc3MgcmVzcG9uc2libGUgZm9yIGxvYWRpbmcgYW5kIHZhbGlkYXRpbmcgdGhlIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWcge1xuICAgIC8qKlxuICAgICAqIFJhdyBKYXZhU2NyaXB0IG9iamVjdCBnZW5lcmF0ZWQgZnJvbSBZQU1MIGZvdW5kIGluIHRoZSBjb25maWdcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHJhd0NvbmZpZzogYW55O1xuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VkIGFuZCB2YWxpZGF0ZWQgY29uZmlnIHRoYXQgZm9sbG93cyB0aGUgaW50ZXJmYWNlcyBkZWZpbmVkIGFib3ZlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZWRDb25maWc6IElDb25maWc7XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyBhIHJhdyBjb25maWcgZm9yIHZhbGlkYXRpb25cbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZChyYXdDb25maWc6IGFueSkge1xuICAgICAgICB0aGlzLnJhd0NvbmZpZyA9IHJhd0NvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIHJhdyBjb25maWcgdG8gY3JlYXRlIHRoZSB2YWxpZGF0ZWQgY29uZmlnLCBpZiBwb3NzaWJsZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyB2YWxpZGF0ZSgpIHtcblxuICAgICAgICBpZiAodGhpcy5yYXdDb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb25maWcgd2FzIGxvYWRlZCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yYXdDb25maWcgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1cHBsaWVkIGNvbmZpZyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbGlkYXRlZENvbmZpZzogYW55ID0ge307XG5cbiAgICAgICAgbGV0IHByb3BlcnR5Q291bnQgPSBDT05GSUdfUFJPUEVSVElFUy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydHlDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdG9yID0gQ09ORklHX1BST1BFUlRJRVNbaV07XG4gICAgICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnJhd0NvbmZpZ1t2YWxpZGF0b3IubmFtZV07XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT09IHVuZGVmaW5lZCB8fCBwcm9wZXJ0eSA9PT0gbnVsbCkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICAgICAgICAgIGxldCBkaXNwbGF5VmFsdWUgPSAnYCcgKyBTdHJpbmdIZWxwZXIuc3RyaW5naWZ5KHZhbGlkYXRvci5kZWZhdWx0VmFsdWUpICsgJ2AnO1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25TdHJpbmcgPSB2YWxpZGF0b3IubWVzc2FnZSArICcsICcgKyBMb2dnZXIuYnJhbmQoZGlzcGxheVZhbHVlKTtcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKCdgJyArIExvZ2dlci5icmFuZCh2YWxpZGF0b3IubmFtZSkgKyAnYCBpcyBub3QgZGVmaW5lZDogJyArIGFjdGlvblN0cmluZywgTG9nTGV2ZWwuV2Fybik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVkQ29uZmlnW3ZhbGlkYXRvci5uYW1lXSA9IHZhbGlkYXRvci5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWxpZGF0b3IudHlwZUNoZWNrZXIocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9yU3RyaW5nID0gJ0ludmFsaWQgdHlwZSBmb3IgYCcgKyBMb2dnZXIuYnJhbmQodmFsaWRhdG9yLm5hbWUpICsgJ2A6ICcgKyB2YWxpZGF0b3IudHlwZUVycm9yO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclN0cmluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlZENvbmZpZ1t2YWxpZGF0b3IubmFtZV0gPSBwcm9wZXJ0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhbGlkYXRlZENvbmZpZy5wYWdlcyA9IHRoaXMudmFsaWRhdGVQYWdlcyh2YWxpZGF0ZWRDb25maWcucGFnZXMpO1xuXG4gICAgICAgIHRoaXMudmFsaWRhdGVkQ29uZmlnID0gdmFsaWRhdGVkQ29uZmlnIGFzIElDb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIG11bHRpcGxlIHBhZ2VzIGV4dHJhY3RlZCBmcm9tIHRoZSBjb25maWdcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlUGFnZXMocmF3UGFnZXM6IGFueVtdKTogSUNvbmZpZ1BhZ2VbXSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWRQYWdlczogSUNvbmZpZ1BhZ2VbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd1BhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWRQYWdlcy5wdXNoKHRoaXMudmFsaWRhdGVQYWdlKHJhd1BhZ2VzW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZFBhZ2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHNpbmdsZSBwYWdlIGV4dHJhY3RlZCBmcm9tIHRoZSBjb25maWdcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlUGFnZShyYXdQYWdlOiBhbnkpOiBJQ29uZmlnUGFnZSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWRQYWdlOiBJQ29uZmlnUGFnZSA9IENvbmZpZy52YWxpZGF0ZU5hbWVkUHJvcGVydGllcyhcbiAgICAgICAgICAgIHJhd1BhZ2UsXG4gICAgICAgICAgICBDT05GSUdfUEFHRV9QUk9QRVJUSUVTLFxuICAgICAgICAgICAgJ3BhZ2UnXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlZFBhZ2UubWVudXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZFBhZ2UubWVudXMgPSB0aGlzLnZhbGlkYXRlTWVudXModmFsaWRhdGVkUGFnZS5tZW51cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkYXRlZFBhZ2UuY2hpbGRfcGFnZXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZFBhZ2UuY2hpbGRfcGFnZXMgPSB0aGlzLnZhbGlkYXRlUGFnZXModmFsaWRhdGVkUGFnZS5jaGlsZF9wYWdlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkYXRlZFBhZ2UuY2hpbGRfZGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZFBhZ2UuY2hpbGRfZGlyZWN0b3JpZXMgPSB0aGlzLnZhbGlkYXRlRGlyZWN0b3JpZXModmFsaWRhdGVkUGFnZS5jaGlsZF9kaXJlY3Rvcmllcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZFBhZ2UgYXMgSUNvbmZpZ1BhZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIGRpcmVjdG9yeSBleHRyYWN0ZWQgZnJvbSB0aGUgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZURpcmVjdG9yaWVzKHJhd0RpcmVjdG9yaWVzOiBhbnlbXSk6IElDb25maWdEaXJlY3RvcnlbXSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWREaXJlY3RvcmllczogSUNvbmZpZ0RpcmVjdG9yeVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3RGlyZWN0b3JpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZERpcmVjdG9yaWVzLnB1c2godGhpcy52YWxpZGF0ZURpcmVjdG9yeShyYXdEaXJlY3Rvcmllc1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWREaXJlY3RvcmllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBzaW5nbGUgZGlyZWN0b3J5IGV4dHJhY3RlZCBmcm9tIHRoZSBjb25maWdcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlRGlyZWN0b3J5KHJhd0RpcmVjdG9yeTogYW55KTogSUNvbmZpZ0RpcmVjdG9yeSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWREaXJlY3Rvcnk6IElDb25maWdEaXJlY3RvcnkgPSBDb25maWcudmFsaWRhdGVOYW1lZFByb3BlcnRpZXMoXG4gICAgICAgICAgICByYXdEaXJlY3RvcnksXG4gICAgICAgICAgICBDT05GSUdfRElSRUNUT1JZX1BST1BFUlRJRVMsXG4gICAgICAgICAgICAnZGlyZWN0b3J5J1xuICAgICAgICApO1xuXG4gICAgICAgIGlmICh2YWxpZGF0ZWREaXJlY3RvcnkudGVtcGxhdGUgJiYgdmFsaWRhdGVkRGlyZWN0b3J5LnRlbXBsYXRlX2RpcmVjdG9yeSkge1xuICAgICAgICAgICAgbGV0IGVycm9yU3RyaW5nID0gJ0Vycm9yIHBhcnNpbmcgZGlyZWN0b3J5IHByb3BlcnR5IGZyb20gdGhlIGNvbmZpZzonO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1xcbic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnWW91IGNhbm5vdCBoYXZlIGJvdGggYCcgKyBMb2dnZXIuYnJhbmQoJ3RlbXBsYXRlJykgKyAnYCBhbmQgJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdgJyArIExvZ2dlci5icmFuZCgndGVtcGxhdGVfZGlyZWN0b3J5JykgKyAnYCBzcGVjaWZpZWQhJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkYXRlZERpcmVjdG9yeS5jb250ZW50ICYmIHZhbGlkYXRlZERpcmVjdG9yeS5jb250ZW50X2RpcmVjdG9yeSkge1xuICAgICAgICAgICAgbGV0IGVycm9yU3RyaW5nID0gJ0Vycm9yIHBhcnNpbmcgZGlyZWN0b3J5IHByb3BlcnR5IGZyb20gdGhlIGNvbmZpZzonO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1xcbic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnWW91IGNhbm5vdCBoYXZlIGJvdGggYCcgKyBMb2dnZXIuYnJhbmQoJ2NvbnRlbnQnKSArICdgIGFuZCAnO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ2AnICsgTG9nZ2VyLmJyYW5kKCdjb250ZW50X2RpcmVjdG9yeScpICsgJ2Agc3BlY2lmaWVkISc7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWxpZGF0ZWREaXJlY3RvcnkudGVtcGxhdGVfZGlyZWN0b3J5ICYmIHZhbGlkYXRlZERpcmVjdG9yeS5jb250ZW50X2RpcmVjdG9yeSkge1xuICAgICAgICAgICAgbGV0IGVycm9yU3RyaW5nID0gJ0Vycm9yIHBhcnNpbmcgZGlyZWN0b3J5IHByb3BlcnR5IGZyb20gdGhlIGNvbmZpZzonO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1xcbic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnWW91IGNhbm5vdCBoYXZlIGJvdGggYCcgKyBMb2dnZXIuYnJhbmQoJ3RlbXBsYXRlX2RpcmVjdG9yeScpICsgJ2AgYW5kICc7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnYCcgKyBMb2dnZXIuYnJhbmQoJ2NvbnRlbnRfZGlyZWN0b3J5JykgKyAnYCBzcGVjaWZpZWQhJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsaWRhdGVkRGlyZWN0b3J5Lm1lbnVzKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWREaXJlY3RvcnkubWVudXMgPSB0aGlzLnZhbGlkYXRlTWVudXModmFsaWRhdGVkRGlyZWN0b3J5Lm1lbnVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkRGlyZWN0b3J5IGFzIElDb25maWdEaXJlY3Rvcnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIG1lbnUgZXh0cmFjdGVkIGZyb20gdGhlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZU1lbnVzKHJhd01lbnVzOiBhbnlbXSk6IElDb25maWdNZW51W10ge1xuICAgICAgICBsZXQgdmFsaWRhdGVkTWVudXM6IElDb25maWdNZW51W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXdNZW51cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsaWRhdGVkTWVudXMucHVzaChDb25maWcudmFsaWRhdGVNZW51KHJhd01lbnVzW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZE1lbnVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHNpbmdsZSBtZW51IGV4dHJhY3RlZCBmcm9tIHRoZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHZhbGlkYXRlTWVudShyYXdNZW51OiBhbnkpOiBJQ29uZmlnTWVudSB7XG4gICAgICAgIHJldHVybiBDb25maWcudmFsaWRhdGVOYW1lZFByb3BlcnRpZXMocmF3TWVudSwgQ09ORklHX01FTlVfUFJPUEVSVElFUywgJ21lbnUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYW4gb2JqZWN0IHVzaW5nIHByb3ZpZGVkIG5hbWVkIHByb3BlcnR5IHZhbGlkYXRvcnNcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyB2YWxpZGF0ZU5hbWVkUHJvcGVydGllcyhzb3VyY2VPYmplY3Q6IGFueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBJQ29uZmlnTmFtZWRQcm9wZXJ0eVZhbGlkYXRvcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlUeXBlOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBsZXQgdmFsaWRhdGVkT2JqZWN0OiBhbnkgPSB7fTtcbiAgICAgICAgZm9yIChsZXQgcHJvcGVydHlOYW1lIGluIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3JzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmF3UHJvcGVydHkgPSBzb3VyY2VPYmplY3RbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHlWYWxpZGF0b3IgPSB2YWxpZGF0b3JzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHJhd1Byb3BlcnR5ICE9PSB1bmRlZmluZWQgJiYgcmF3UHJvcGVydHkgIT09IG51bGwpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1udWxsLWtleXdvcmRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eVZhbGlkYXRvci50eXBlQ2hlY2tlcihyYXdQcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlcnJvclN0cmluZyA9ICdFcnJvciBwYXJzaW5nICcgKyBwcm9wZXJ0eVR5cGUgKyAnIHByb3BlcnR5IGZyb20gdGhlIGNvbmZpZzonO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclN0cmluZyArPSAnUHJvcGVydHkgYCcgKyBMb2dnZXIuYnJhbmQoU3RyaW5nSGVscGVyLnN0cmluZ2lmeShwcm9wZXJ0eU5hbWUpKSArICdgJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICcgd2l0aCB2YWx1ZSBgJyArIExvZ2dlci5icmFuZChTdHJpbmdIZWxwZXIuc3RyaW5naWZ5KHJhd1Byb3BlcnR5KSkgKyAnYDonO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclN0cmluZyArPSBwcm9wZXJ0eVZhbGlkYXRvci50eXBlRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVkT2JqZWN0W3Byb3BlcnR5TmFtZV0gPSByYXdQcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkT2JqZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbGlkYXRlZCBjb25maWdcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0KCk6IElDb25maWcge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZWRDb25maWc7XG4gICAgfVxufVxuIl19
