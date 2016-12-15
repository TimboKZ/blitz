"use strict";
var fse = require('fs-extra');
var yaml = require('js-yaml');
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
var Config = (function () {
    function Config(configPath) {
        this.configPath = configPath;
    }
    Config.prototype.load = function () {
        var configContents = fse.readFileSync(this.configPath, 'utf8');
        var rawConfig = yaml.safeLoad(configContents);
        if (!rawConfig || typeof rawConfig !== 'object') {
            rawConfig = {};
        }
        this.rawConfig = rawConfig;
    };
    Config.prototype.validate = function () {
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
        var validatedPage = {};
        for (var propertyName in exports.CONFIG_PAGE_PROPERTIES) {
            if (exports.CONFIG_PAGE_PROPERTIES.hasOwnProperty(propertyName)) {
                var rawProperty = rawPage[propertyName];
                var propertyValidator = exports.CONFIG_PAGE_PROPERTIES[propertyName];
                if (rawProperty !== undefined && rawProperty !== null) {
                    if (!propertyValidator.typeChecker(rawProperty)) {
                        var errorString = 'Error parsing page property from the config:';
                        errorString += '\n';
                        errorString += 'Property `' + Logger_1.Logger.brand(StringHelper_1.StringHelper.stringify(propertyName)) + '`';
                        errorString += ' with value `' + Logger_1.Logger.brand(StringHelper_1.StringHelper.stringify(rawProperty)) + '`:';
                        errorString += '\n';
                        errorString += propertyValidator.typeError;
                        throw new Error(errorString);
                    }
                    else {
                        validatedPage[propertyName] = rawProperty;
                    }
                }
            }
        }
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
    };
    Config.prototype.validateMenus = function (rawMenus) {
        var validatedMenus = [];
        for (var i = 0; i < rawMenus.length; i++) {
            validatedMenus.push(this.validateMenu(rawMenus[i]));
        }
        return validatedMenus;
    };
    Config.prototype.validateMenu = function (rawMenu) {
    };
    Config.prototype.get = function () {
        return this.validatedConfig;
    };
    return Config;
}());
exports.Config = Config;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUEzQixVQUE0QixjQUFxQjtRQUM3QyxJQUFJLG9CQUFvQixHQUF1QixFQUFFLENBQUM7UUFDbEQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDN0Msb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxNQUFNLENBQUMsb0JBQW9CLENBQUM7SUFDaEMsQ0FBQztJQU1PLGtDQUFpQixHQUF6QixVQUEwQixZQUFpQjtJQUUzQyxDQUFDO0lBTU8sOEJBQWEsR0FBckIsVUFBc0IsUUFBZTtRQUNqQyxJQUFJLGNBQWMsR0FBa0IsRUFBRSxDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFNTyw2QkFBWSxHQUFwQixVQUFxQixPQUFZO0lBRWpDLENBQUM7SUFNTSxvQkFBRyxHQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQXhLQSxBQXdLQyxJQUFBO0FBeEtZLGNBQU0sU0F3S2xCLENBQUEiLCJmaWxlIjoic3JjL0NvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQWxsIGNsYXNzZXMgYW5kIGludGVyZmFjZXMgcmVsYXRlZCB0byB0aGUgQmxpdHogY29uZmlnIGFuZCBkYXRhIHR5cGVzIHVzZWQgaW4gaXRcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCAqIGFzIGZzZSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyB5YW1sIGZyb20gJ2pzLXlhbWwnO1xuaW1wb3J0IHtVdGlsfSBmcm9tICcuL1V0aWwnO1xuaW1wb3J0IHtMb2dnZXIsIExvZ0xldmVsfSBmcm9tICcuL0xvZ2dlcic7XG5pbXBvcnQge1N0cmluZ0hlbHBlcn0gZnJvbSAnLi9oZWxwZXJzL1N0cmluZ0hlbHBlcic7XG5cbi8qKlxuICogTWVudSBpbnRlcmZhY2UgYXMgc2VlbiBpbiB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnTWVudSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIGtleXM6IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgdGhlIGNoaWxkIGRpcmVjdG9yeSBvZiBhIHBhZ2VcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdEaXJlY3Rvcnkge1xuICAgIHVyaT86IHN0cmluZztcbiAgICB1cmlfa2V5Pzogc3RyaW5nO1xuICAgIGlkX2tleT86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIG1lbnVzPzogSUNvbmZpZ01lbnVbXTtcbiAgICB0ZW1wbGF0ZV9kaXJlY3Rvcnk/OiBzdHJpbmc7XG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gICAgY29udGVudF9kaXJlY3Rvcnk/OiBzdHJpbmc7XG4gICAgY29udGVudD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBQYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnUGFnZSB7XG4gICAgdXJpPzogc3RyaW5nO1xuICAgIGlkPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gICAgY29udGVudD86IHN0cmluZztcbiAgICBtZW51cz86IElDb25maWdNZW51W107XG4gICAgY2hpbGRfcGFnZXM/OiBJQ29uZmlnUGFnZVtdO1xuICAgIGNoaWxkX2RpcmVjdG9yaWVzPzogSUNvbmZpZ0RpcmVjdG9yeVtdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIHRvcCBsZXZlbCBjb25maWdcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWcge1xuICAgIGJsaXR6X3ZlcnNpb246IHN0cmluZztcbiAgICBzaXRlX3VybDogc3RyaW5nO1xuICAgIHNpdGVfcm9vdDogc3RyaW5nO1xuICAgIGFic29sdXRlX3VybHM6IGJvb2xlYW47XG4gICAgZXhwbGljaXRfaHRtbF9leHRlbnNpb25zOiBib29sZWFuO1xuICAgIHBsdWdpbnM6IHN0cmluZ1tdO1xuICAgIGdsb2JhbHM6IGFueTtcbiAgICBwYWdlczogSUNvbmZpZ1BhZ2VbXTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGFuIG9iamVjdCB1c2VkIHRvIHZhbGlkYXRlIGEgY2VydGFpbiBwcm9wZXJ0eSBvZiB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnUHJvcGVydHlWYWxpZGF0b3Ige1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgZGVmYXVsdFZhbHVlOiBhbnk7XG4gICAgdHlwZUNoZWNrZXI6IChvYmplY3Q6IGFueSkgPT4gYm9vbGVhbjtcbiAgICB0eXBlRXJyb3I6IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHBhZ2UvZGlyZWN0b3J5IHZhbGlkYXRvcnMsIGRvZXNuJ3QgaGF2ZSBkZWZhdWx0IHZhbHVlc1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ1BhZ2VQcm9wZXJ0eVZhbGlkYXRvcnMge1xuICAgIFtuYW1lOiBzdHJpbmddOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0OiBhbnkpID0+IGJvb2xlYW4sXG4gICAgICAgIHR5cGVFcnJvcjogc3RyaW5nLFxuICAgIH07XG59XG5cbi8qKlxuICogRmlsZSB0aGF0IGlzIHRyZWF0ZWQgYXMgdGhlIEJsaXR6IGNvbmZpZyBieSBkZWZhdWx0XG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09ORklHX05BTUUgPSAnYmxpdHoueW1sJztcblxuLyoqXG4gKiBBcnJheSBvZiB2YWxpZGF0aW9uIG9iamVjdHMgZm9yIHRoZSBjb25maWdcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgQ09ORklHX1BST1BFUlRJRVM6IElDb25maWdQcm9wZXJ0eVZhbGlkYXRvcltdID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ2JsaXR6X3ZlcnNpb24nLFxuICAgICAgICBtZXNzYWdlOiAnVXNpbmcgY3VycmVudCBCbGl0eiB2ZXJzaW9uJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBVdGlsLmdldFBhY2thZ2VJbmZvKCkudmVyc2lvbixcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdCbGl0eiB2ZXJzaW9uIGlzIHN1cHBvc2VkIHRvIGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdzaXRlX3VybCcsXG4gICAgICAgIG1lc3NhZ2U6ICdVc2luZyBhbiBlbXB0eSBzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6ICcnLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ1NpdGUgVVJMIGlzIHN1cHBvc2VkIHRvIGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdzaXRlX3Jvb3QnLFxuICAgICAgICBtZXNzYWdlOiAnVXNpbmcgYW4gZW1wdHkgc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdTaXRlIHJvb3QgaXMgc3VwcG9zZWQgdG8gYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2Fic29sdXRlX3VybHMnLFxuICAgICAgICBtZXNzYWdlOiAnRGlzYWJsaW5nIGFic29sdXRlIFVSTHMsIHVzaW5nIHJlbGF0aXZlIFVSTHMgaW5zdGVhZCcsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnYm9vbGVhbicsXG4gICAgICAgIHR5cGVFcnJvcjogJ0Fic29sdXRlIFVSTHMgc2hvdWxkIGJlIGEgYm9vbGVhbiB2YWx1ZSEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZXhwbGljaXRfaHRtbF9leHRlbnNpb25zJyxcbiAgICAgICAgbWVzc2FnZTogJ0VuYWJsaW5nIGV4cGxpY2l0IEhUTUwgZXh0ZW5zaW9ucycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdib29sZWFuJyxcbiAgICAgICAgdHlwZUVycm9yOiAnRXhwbGljaXQgSFRNTCBleHRlbnNpb25zIHNob3VsZCBiZSBhIGJvb2xlYW4gdmFsdWUhJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3BsdWdpbnMnLFxuICAgICAgICBtZXNzYWdlOiAnQXNzdW1pbmcgdGhlcmUgYXJlIG5vIHBsdWdpbnMnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IFtdLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnIHx8ICEob2JqZWN0IGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtpXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICB0eXBlRXJyb3I6ICdQbHVnaW5zIG11c3QgYmUgYW4gYXJyYXkgb2Ygc3RyaW5ncyAocGx1Z2luIG5hbWVzKSEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZ2xvYmFscycsXG4gICAgICAgIG1lc3NhZ2U6ICdBc3N1bWluZyB0aGVyZSBhcmUgbm8gZ2xvYmFscycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZToge30sXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiAhKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSxcbiAgICAgICAgdHlwZUVycm9yOiAnR2xvYmFscyBtdXN0IGJlIGFuIG9iamVjdCAoYW5kIG5vdCBhbiBhcnJheSkhJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3BhZ2VzJyxcbiAgICAgICAgbWVzc2FnZTogJ0Fzc3VtaW5nIHRoZXJlIGFyZSBubyBwYWdlcycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogW10sXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnUGFnZXMgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG5dO1xuXG4vKipcbiAqIEFycmF5IG9mIHZhbGlkYXRpb24gb2JqZWN0cyBmb3IgYSBjb25maWcgcGFnZVxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBDT05GSUdfUEFHRV9QUk9QRVJUSUVTOiBJQ29uZmlnUGFnZVByb3BlcnR5VmFsaWRhdG9ycyA9IHtcbiAgICB1cmk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBVUkkgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBpZDoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIElEIGlzIHNldCwgaXQgbXVzdCBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG5hbWUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB0ZW1wbGF0ZToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5pc0VtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIHRlbXBsYXRlIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBjb250ZW50IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIG1lbnVzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbWVudXMgYXJlIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG4gICAgY2hpbGRfcGFnZXM6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBtZW51cyBhcmUgc2V0LCBpdCBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbiAgICBjaGlsZF9kaXJlY3Rvcmllczoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG1lbnVzIGFyZSBzZXQsIGl0IG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxufTtcblxuLyoqXG4gKiBAY2xhc3MgQ2xhc3MgcmVzcG9uc2libGUgZm9yIGxvYWRpbmcgYW5kIHZhbGlkYXRpbmcgdGhlIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWcge1xuICAgIC8qKlxuICAgICAqIFBhdGggdG8gdGhlIGNvbmZpZyBmaWxlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb25maWdQYXRoOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSYXcgSmF2YVNjcmlwdCBvYmplY3QgZ2VuZXJhdGVkIGZyb20gWUFNTCBmb3VuZCBpbiB0aGUgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSByYXdDb25maWc6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlZCBhbmQgdmFsaWRhdGVkIGNvbmZpZyB0aGF0IGZvbGxvd3MgdGhlIGludGVyZmFjZXMgZGVmaW5lZCBhYm92ZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVkQ29uZmlnOiBJQ29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogQ29uZmlnIGNvbnN0cnVjdG9yXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnUGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29uZmlnUGF0aCA9IGNvbmZpZ1BhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIGNvbmZpZyBmcm9tIHRoZSBpbmplY3RlZCBwYXRoIGFuZCBwYXJzZXMgWUFNTCBpbnNpZGUgaXRcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZCgpIHtcbiAgICAgICAgbGV0IGNvbmZpZ0NvbnRlbnRzID0gZnNlLnJlYWRGaWxlU3luYyh0aGlzLmNvbmZpZ1BhdGgsICd1dGY4Jyk7XG4gICAgICAgIGxldCByYXdDb25maWcgPSB5YW1sLnNhZmVMb2FkKGNvbmZpZ0NvbnRlbnRzKTtcbiAgICAgICAgaWYgKCFyYXdDb25maWcgfHwgdHlwZW9mIHJhd0NvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJhd0NvbmZpZyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmF3Q29uZmlnID0gcmF3Q29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgcmF3IGNvbmZpZyB0byBjcmVhdGUgdGhlIHZhbGlkYXRlZCBjb25maWcsIGlmIHBvc3NpYmxlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHZhbGlkYXRlKCkge1xuICAgICAgICBsZXQgdmFsaWRhdGVkQ29uZmlnOiBhbnkgPSB7fTtcblxuICAgICAgICBsZXQgcHJvcGVydHlDb3VudCA9IENPTkZJR19QUk9QRVJUSUVTLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0eUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB2YWxpZGF0b3IgPSBDT05GSUdfUFJPUEVSVElFU1tpXTtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucmF3Q29uZmlnW3ZhbGlkYXRvci5uYW1lXTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gdW5kZWZpbmVkIHx8IHByb3BlcnR5ID09PSBudWxsKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tbnVsbC1rZXl3b3JkXG4gICAgICAgICAgICAgICAgbGV0IGRpc3BsYXlWYWx1ZSA9ICdgJyArIFN0cmluZ0hlbHBlci5zdHJpbmdpZnkodmFsaWRhdG9yLmRlZmF1bHRWYWx1ZSkgKyAnYCc7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblN0cmluZyA9IHZhbGlkYXRvci5tZXNzYWdlICsgJywgJyArIExvZ2dlci5icmFuZChkaXNwbGF5VmFsdWUpO1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coJ2AnICsgTG9nZ2VyLmJyYW5kKHZhbGlkYXRvci5uYW1lKSArICdgIGlzIG5vdCBkZWZpbmVkOiAnICsgYWN0aW9uU3RyaW5nLCBMb2dMZXZlbC5XYXJuKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZWRDb25maWdbdmFsaWRhdG9yLm5hbWVdID0gdmFsaWRhdG9yLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbGlkYXRvci50eXBlQ2hlY2tlcihwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnSW52YWxpZCB0eXBlIGZvciBgJyArIExvZ2dlci5icmFuZCh2YWxpZGF0b3IubmFtZSkgKyAnYDogJyArIHZhbGlkYXRvci50eXBlRXJyb3I7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVkQ29uZmlnW3ZhbGlkYXRvci5uYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFsaWRhdGVkQ29uZmlnLnBhZ2VzID0gdGhpcy52YWxpZGF0ZVBhZ2VzKHZhbGlkYXRlZENvbmZpZy5wYWdlcyk7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZWRDb25maWcgPSB2YWxpZGF0ZWRDb25maWcgYXMgSUNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgbXVsdGlwbGUgcGFnZXMgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVQYWdlcyhyYXdQYWdlczogYW55W10pOiBJQ29uZmlnUGFnZVtdIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZFBhZ2VzOiBJQ29uZmlnUGFnZVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3UGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZFBhZ2VzLnB1c2godGhpcy52YWxpZGF0ZVBhZ2UocmF3UGFnZXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkUGFnZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIHBhZ2UgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVQYWdlKHJhd1BhZ2U6IGFueSk6IElDb25maWdQYWdlIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZFBhZ2U6IGFueSA9IHt9O1xuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eU5hbWUgaW4gQ09ORklHX1BBR0VfUFJPUEVSVElFUykge1xuICAgICAgICAgICAgaWYgKENPTkZJR19QQUdFX1BST1BFUlRJRVMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgICAgICAgIGxldCByYXdQcm9wZXJ0eSA9IHJhd1BhZ2VbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHlWYWxpZGF0b3IgPSBDT05GSUdfUEFHRV9QUk9QRVJUSUVTW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHJhd1Byb3BlcnR5ICE9PSB1bmRlZmluZWQgJiYgcmF3UHJvcGVydHkgIT09IG51bGwpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1udWxsLWtleXdvcmRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eVZhbGlkYXRvci50eXBlQ2hlY2tlcihyYXdQcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlcnJvclN0cmluZyA9ICdFcnJvciBwYXJzaW5nIHBhZ2UgcHJvcGVydHkgZnJvbSB0aGUgY29uZmlnOic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdQcm9wZXJ0eSBgJyArIExvZ2dlci5icmFuZChTdHJpbmdIZWxwZXIuc3RyaW5naWZ5KHByb3BlcnR5TmFtZSkpICsgJ2AnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJyB3aXRoIHZhbHVlIGAnICsgTG9nZ2VyLmJyYW5kKFN0cmluZ0hlbHBlci5zdHJpbmdpZnkocmF3UHJvcGVydHkpKSArICdgOic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9IHByb3BlcnR5VmFsaWRhdG9yLnR5cGVFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZWRQYWdlW3Byb3BlcnR5TmFtZV0gPSByYXdQcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IENoZWNrIGZvciB2YXJpb3VzIGNvbWJpbmF0aW9ucyBvZiBvcHRpb25hbCBwcm9wZXJ0aWVzLlxuXG4gICAgICAgIGlmICh2YWxpZGF0ZWRQYWdlLm1lbnVzKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWRQYWdlLm1lbnVzID0gdGhpcy52YWxpZGF0ZU1lbnVzKHZhbGlkYXRlZFBhZ2UubWVudXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWxpZGF0ZWRQYWdlLmNoaWxkX3BhZ2VzKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWRQYWdlLmNoaWxkX3BhZ2VzID0gdGhpcy52YWxpZGF0ZVBhZ2VzKHZhbGlkYXRlZFBhZ2UuY2hpbGRfcGFnZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWxpZGF0ZWRQYWdlLmNoaWxkX2RpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWRQYWdlLmNoaWxkX2RpcmVjdG9yaWVzID0gdGhpcy52YWxpZGF0ZURpcmVjdG9yaWVzKHZhbGlkYXRlZFBhZ2UuY2hpbGRfZGlyZWN0b3JpZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRQYWdlIGFzIElDb25maWdQYWdlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHNpbmdsZSBkaXJlY3RvcnkgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVEaXJlY3RvcmllcyhyYXdEaXJlY3RvcmllczogYW55W10pOiBJQ29uZmlnRGlyZWN0b3J5W10ge1xuICAgICAgICBsZXQgdmFsaWRhdGVkRGlyZWN0b3JpZXM6IElDb25maWdEaXJlY3RvcnlbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd0RpcmVjdG9yaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWREaXJlY3Rvcmllcy5wdXNoKHRoaXMudmFsaWRhdGVEaXJlY3RvcnkocmF3RGlyZWN0b3JpZXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkRGlyZWN0b3JpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIGRpcmVjdG9yeSBleHRyYWN0ZWQgZnJvbSB0aGUgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZURpcmVjdG9yeShyYXdEaXJlY3Rvcnk6IGFueSk6IElDb25maWdEaXJlY3Rvcnkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIG1lbnUgZXh0cmFjdGVkIGZyb20gdGhlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZU1lbnVzKHJhd01lbnVzOiBhbnlbXSk6IElDb25maWdNZW51W10ge1xuICAgICAgICBsZXQgdmFsaWRhdGVkTWVudXM6IElDb25maWdNZW51W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXdNZW51cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsaWRhdGVkTWVudXMucHVzaCh0aGlzLnZhbGlkYXRlTWVudShyYXdNZW51c1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRNZW51cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBzaW5nbGUgbWVudSBleHRyYWN0ZWQgZnJvbSB0aGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlTWVudShyYXdNZW51OiBhbnkpOiBJQ29uZmlnTWVudSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWxpZGF0ZWQgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGdldCgpOiBJQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVkQ29uZmlnO1xuICAgIH1cbn1cbiJdfQ==
