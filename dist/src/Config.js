"use strict";
var Util_1 = require("./Util");
var Logger_1 = require("./Logger");
var StringHelper_1 = require("./helpers/StringHelper");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBLCtCQUE0QjtBQUM1QixtQ0FBMEM7QUFDMUMsdURBQW9EO0FBc0Z2QyxRQUFBLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztBQU1sQyxRQUFBLGlCQUFpQixHQUErQjtJQUN6RDtRQUNJLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSw2QkFBNkI7UUFDdEMsWUFBWSxFQUFFLFdBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPO1FBQzNDLFdBQVcsRUFBRSxVQUFDLE1BQU0sSUFBSyxPQUFBLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBMUIsQ0FBMEI7UUFDbkQsU0FBUyxFQUFFLDJDQUEyQztLQUN6RDtJQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7UUFDaEIsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxZQUFZLEVBQUUsRUFBRTtRQUNoQixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSxzQ0FBc0M7S0FDcEQ7SUFDRDtRQUNJLElBQUksRUFBRSxXQUFXO1FBQ2pCLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsWUFBWSxFQUFFLEVBQUU7UUFDaEIsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxFQUExQixDQUEwQjtRQUNuRCxTQUFTLEVBQUUsdUNBQXVDO0tBQ3JEO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsc0RBQXNEO1FBQy9ELFlBQVksRUFBRSxLQUFLO1FBQ25CLFdBQVcsRUFBRSxVQUFDLE1BQU0sSUFBSyxPQUFBLE9BQU8sTUFBTSxLQUFLLFNBQVMsRUFBM0IsQ0FBMkI7UUFDcEQsU0FBUyxFQUFFLDBDQUEwQztLQUN4RDtJQUNEO1FBQ0ksSUFBSSxFQUFFLDBCQUEwQjtRQUNoQyxPQUFPLEVBQUUsbUNBQW1DO1FBQzVDLFlBQVksRUFBRSxJQUFJO1FBQ2xCLFdBQVcsRUFBRSxVQUFDLE1BQU0sSUFBSyxPQUFBLE9BQU8sTUFBTSxLQUFLLFNBQVMsRUFBM0IsQ0FBMkI7UUFDcEQsU0FBUyxFQUFFLHFEQUFxRDtLQUNuRTtJQUNEO1FBQ0ksSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsK0JBQStCO1FBQ3hDLFlBQVksRUFBRSxFQUFFO1FBQ2hCLFdBQVcsRUFBRSxVQUFDLE1BQU07WUFDaEIsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDckMsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDakIsQ0FBQztZQUNMLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxTQUFTLEVBQUUscURBQXFEO0tBQ25FO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSwrQkFBK0I7UUFDeEMsWUFBWSxFQUFFLEVBQUU7UUFDaEIsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksS0FBSyxDQUFDLEVBQXhELENBQXdEO1FBQ2pGLFNBQVMsRUFBRSwrQ0FBK0M7S0FDN0Q7SUFDRDtRQUNJLElBQUksRUFBRSxPQUFPO1FBQ2IsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxZQUFZLEVBQUUsRUFBRTtRQUNoQixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxZQUFZLEtBQUssRUFBckQsQ0FBcUQ7UUFDOUUsU0FBUyxFQUFFLHlCQUF5QjtLQUN2QztDQUNKLENBQUM7QUFNVyxRQUFBLHNCQUFzQixHQUFtQztJQUNsRSxHQUFHLEVBQUU7UUFDRCxXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSxxQ0FBcUM7S0FDbkQ7SUFDRCxFQUFFLEVBQUU7UUFDQSxXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSxvQ0FBb0M7S0FDbEQ7SUFDRCxJQUFJLEVBQUU7UUFDRixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSxzQ0FBc0M7S0FDcEQ7SUFDRCxRQUFRLEVBQUU7UUFDTixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBM0QsQ0FBMkQ7UUFDcEYsU0FBUyxFQUFFLG9EQUFvRDtLQUNsRTtJQUNELE9BQU8sRUFBRTtRQUNMLFdBQVcsRUFBRSxVQUFDLE1BQU0sSUFBSyxPQUFBLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLDJCQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUEzRCxDQUEyRDtRQUNwRixTQUFTLEVBQUUsbURBQW1EO0tBQ2pFO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sWUFBWSxLQUFLLEVBQXJELENBQXFEO1FBQzlFLFNBQVMsRUFBRSx3Q0FBd0M7S0FDdEQ7SUFDRCxXQUFXLEVBQUU7UUFDVCxXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxZQUFZLEtBQUssRUFBckQsQ0FBcUQ7UUFDOUUsU0FBUyxFQUFFLHdDQUF3QztLQUN0RDtJQUNELGlCQUFpQixFQUFFO1FBQ2YsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sWUFBWSxLQUFLLEVBQXJELENBQXFEO1FBQzlFLFNBQVMsRUFBRSx3Q0FBd0M7S0FDdEQ7Q0FDSixDQUFDO0FBTVcsUUFBQSwyQkFBMkIsR0FBbUM7SUFDdkUsR0FBRyxFQUFFO1FBQ0QsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxFQUExQixDQUEwQjtRQUNuRCxTQUFTLEVBQUUscUNBQXFDO0tBQ25EO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUMsMkJBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQTNELENBQTJEO1FBQ3BGLFNBQVMsRUFBRSxtREFBbUQ7S0FDakU7SUFDRCxNQUFNLEVBQUU7UUFDSixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSx3Q0FBd0M7S0FDdEQ7SUFDRCxJQUFJLEVBQUU7UUFDRixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSxzQ0FBc0M7S0FDcEQ7SUFDRCxrQkFBa0IsRUFBRTtRQUNoQixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBM0QsQ0FBMkQ7UUFDcEYsU0FBUyxFQUFFLG9EQUFvRDtLQUNsRTtJQUNELFFBQVEsRUFBRTtRQUNOLFdBQVcsRUFBRSxVQUFDLE1BQU0sSUFBSyxPQUFBLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLDJCQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUEzRCxDQUEyRDtRQUNwRixTQUFTLEVBQUUsb0RBQW9EO0tBQ2xFO0lBQ0QsaUJBQWlCLEVBQUU7UUFDZixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBM0QsQ0FBMkQ7UUFDcEYsU0FBUyxFQUFFLG1EQUFtRDtLQUNqRTtJQUNELE9BQU8sRUFBRTtRQUNMLFdBQVcsRUFBRSxVQUFDLE1BQU0sSUFBSyxPQUFBLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLDJCQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUEzRCxDQUEyRDtRQUNwRixTQUFTLEVBQUUsbURBQW1EO0tBQ2pFO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sWUFBWSxLQUFLLEVBQXJELENBQXFEO1FBQzlFLFNBQVMsRUFBRSx3Q0FBd0M7S0FDdEQ7Q0FDSixDQUFDO0FBTVcsUUFBQSxzQkFBc0IsR0FBbUM7SUFDbEUsSUFBSSxFQUFFO1FBQ0YsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUMsMkJBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQTNELENBQTJEO1FBQ3BGLFNBQVMsRUFBRSxnREFBZ0Q7S0FDOUQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSx1Q0FBdUM7S0FDckQ7SUFDRCxTQUFTLEVBQUU7UUFDUCxXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSx1Q0FBdUM7S0FDckQ7SUFDRCxJQUFJLEVBQUU7UUFDRixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxZQUFZLEtBQUssRUFBckQsQ0FBcUQ7UUFDOUUsU0FBUyxFQUFFLHNDQUFzQztLQUNwRDtDQUNKLENBQUM7QUFNRjtJQUFBO0lBME1BLENBQUM7SUF6TFUscUJBQUksR0FBWCxVQUFZLFNBQWM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQU1NLHlCQUFRLEdBQWY7UUFFSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUVELElBQUksZUFBZSxHQUFRLEVBQUUsQ0FBQztRQUU5QixJQUFJLGFBQWEsR0FBRyx5QkFBaUIsQ0FBQyxNQUFNLENBQUM7UUFDN0MsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNyQyxJQUFJLFNBQVMsR0FBRyx5QkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLFlBQVksR0FBRyxHQUFHLEdBQUcsMkJBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDOUUsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDekUsZUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsb0JBQW9CLEdBQUcsWUFBWSxFQUFFLGlCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BHLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUM3RCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLElBQUksV0FBVyxHQUFHLG9CQUFvQixHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO2dCQUNwRyxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGVBQWUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUEwQixDQUFDO0lBQ3RELENBQUM7SUFNTyw4QkFBYSxHQUFyQixVQUFzQixRQUFlO1FBQ2pDLElBQUksY0FBYyxHQUFrQixFQUFFLENBQUM7UUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdkMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQU1PLDZCQUFZLEdBQXBCLFVBQXFCLE9BQVk7UUFDN0IsSUFBSSxhQUFhLEdBQWdCLE1BQU0sQ0FBQyx1QkFBdUIsQ0FDM0QsT0FBTyxFQUNQLDhCQUFzQixFQUN0QixNQUFNLENBQ1QsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVCLGFBQWEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDbEMsYUFBYSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNoRyxDQUFDO1FBQ0QsTUFBTSxDQUFDLGFBQTRCLENBQUM7SUFDeEMsQ0FBQztJQU1PLG9DQUFtQixHQUEzQixVQUE0QixjQUFxQjtRQUM3QyxJQUFJLG9CQUFvQixHQUF1QixFQUFFLENBQUM7UUFDbEQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDN0Msb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxNQUFNLENBQUMsb0JBQW9CLENBQUM7SUFDaEMsQ0FBQztJQU1PLGtDQUFpQixHQUF6QixVQUEwQixZQUFpQjtRQUN2QyxJQUFJLGtCQUFrQixHQUFxQixNQUFNLENBQUMsdUJBQXVCLENBQ3JFLFlBQVksRUFDWixtQ0FBMkIsRUFDM0IsV0FBVyxDQUNkLENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLElBQUksa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksV0FBVyxHQUFHLG1EQUFtRCxDQUFDO1lBQ3RFLFdBQVcsSUFBSSxJQUFJLENBQUM7WUFDcEIsV0FBVyxJQUFJLHdCQUF3QixHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQzlFLFdBQVcsSUFBSSxHQUFHLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLGNBQWMsQ0FBQztZQUN6RSxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLElBQUksa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksV0FBVyxHQUFHLG1EQUFtRCxDQUFDO1lBQ3RFLFdBQVcsSUFBSSxJQUFJLENBQUM7WUFDcEIsV0FBVyxJQUFJLHdCQUF3QixHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQzdFLFdBQVcsSUFBSSxHQUFHLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLGNBQWMsQ0FBQztZQUN4RSxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDaEYsSUFBSSxXQUFXLEdBQUcsbURBQW1ELENBQUM7WUFDdEUsV0FBVyxJQUFJLElBQUksQ0FBQztZQUNwQixXQUFXLElBQUksd0JBQXdCLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUN4RixXQUFXLElBQUksR0FBRyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsR0FBRyxjQUFjLENBQUM7WUFDeEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzQixrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBQ0QsTUFBTSxDQUFDLGtCQUFzQyxDQUFDO0lBQ2xELENBQUM7SUFNTyw4QkFBYSxHQUFyQixVQUFzQixRQUFlO1FBQ2pDLElBQUksY0FBYyxHQUFrQixFQUFFLENBQUM7UUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdkMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUNELE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQU1jLG1CQUFZLEdBQTNCLFVBQTRCLE9BQVk7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsOEJBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQU1jLDhCQUF1QixHQUF0QyxVQUF1QyxZQUFpQixFQUNqQixVQUEwQyxFQUMxQyxZQUFvQjtRQUN2RCxJQUFJLGVBQWUsR0FBUSxFQUFFLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakQsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxXQUFXLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDcEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QyxJQUFJLFdBQVcsR0FBRyxnQkFBZ0IsR0FBRyxZQUFZLEdBQUcsNEJBQTRCLENBQUM7d0JBQ2pGLFdBQVcsSUFBSSxJQUFJLENBQUM7d0JBQ3BCLFdBQVcsSUFBSSxZQUFZLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzt3QkFDdkYsV0FBVyxJQUFJLGVBQWUsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLDJCQUFZLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUMxRixXQUFXLElBQUksSUFBSSxDQUFDO3dCQUNwQixXQUFXLElBQUksaUJBQWlCLENBQUMsU0FBUyxDQUFDO3dCQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNqQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLGVBQWUsQ0FBQyxZQUFZLENBQUMsR0FBRyxXQUFXLENBQUM7b0JBQ2hELENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBTU0sb0JBQUcsR0FBVjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0ExTUEsQUEwTUMsSUFBQTtBQTFNWSx3QkFBTSIsImZpbGUiOiJzcmMvQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBBbGwgY2xhc3NlcyBhbmQgaW50ZXJmYWNlcyByZWxhdGVkIHRvIHRoZSBCbGl0eiBjb25maWcgYW5kIGRhdGEgdHlwZXMgdXNlZCBpbiBpdFxuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuaW1wb3J0IHtVdGlsfSBmcm9tICcuL1V0aWwnO1xuaW1wb3J0IHtMb2dnZXIsIExvZ0xldmVsfSBmcm9tICcuL0xvZ2dlcic7XG5pbXBvcnQge1N0cmluZ0hlbHBlcn0gZnJvbSAnLi9oZWxwZXJzL1N0cmluZ0hlbHBlcic7XG5cbi8qKlxuICogTWVudSBpbnRlcmZhY2UgYXMgc2VlbiBpbiB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnTWVudSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIHRpdGxlX2tleT86IHN0cmluZztcbiAgICBrZXlzPzogc3RyaW5nW107XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciB0aGUgY2hpbGQgZGlyZWN0b3J5IG9mIGEgcGFnZVxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ0RpcmVjdG9yeSB7XG4gICAgdXJpPzogc3RyaW5nO1xuICAgIHVyaV9rZXk/OiBzdHJpbmc7XG4gICAgaWRfa2V5Pzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdGVtcGxhdGVfZGlyZWN0b3J5Pzogc3RyaW5nO1xuICAgIHRlbXBsYXRlPzogc3RyaW5nO1xuICAgIGNvbnRlbnRfZGlyZWN0b3J5Pzogc3RyaW5nO1xuICAgIGNvbnRlbnQ/OiBzdHJpbmc7XG4gICAgbWVudXM/OiBJQ29uZmlnTWVudVtdO1xufVxuXG4vKipcbiAqIFBhZ2UgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdQYWdlIHtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgICBjb250ZW50Pzogc3RyaW5nO1xuICAgIG1lbnVzPzogSUNvbmZpZ01lbnVbXTtcbiAgICBjaGlsZF9wYWdlcz86IElDb25maWdQYWdlW107XG4gICAgY2hpbGRfZGlyZWN0b3JpZXM/OiBJQ29uZmlnRGlyZWN0b3J5W107XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgdG9wIGxldmVsIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gICAgYmxpdHpfdmVyc2lvbjogc3RyaW5nO1xuICAgIHNpdGVfdXJsOiBzdHJpbmc7XG4gICAgc2l0ZV9yb290OiBzdHJpbmc7XG4gICAgYWJzb2x1dGVfdXJsczogYm9vbGVhbjtcbiAgICBleHBsaWNpdF9odG1sX2V4dGVuc2lvbnM6IGJvb2xlYW47XG4gICAgcGx1Z2luczogc3RyaW5nW107XG4gICAgZ2xvYmFsczogYW55O1xuICAgIHBhZ2VzOiBJQ29uZmlnUGFnZVtdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgYW4gb2JqZWN0IHVzZWQgdG8gdmFsaWRhdGUgYSBjZXJ0YWluIHByb3BlcnR5IG9mIHRoZSBjb25maWdcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdQcm9wZXJ0eVZhbGlkYXRvciB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBkZWZhdWx0VmFsdWU6IGFueTtcbiAgICB0eXBlQ2hlY2tlcjogKG9iamVjdDogYW55KSA9PiBib29sZWFuO1xuICAgIHR5cGVFcnJvcjogc3RyaW5nO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgcGFnZS9kaXJlY3RvcnkgdmFsaWRhdG9ycywgZG9lc24ndCBoYXZlIGRlZmF1bHQgdmFsdWVzXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnTmFtZWRQcm9wZXJ0eVZhbGlkYXRvcnMge1xuICAgIFtuYW1lOiBzdHJpbmddOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0OiBhbnkpID0+IGJvb2xlYW4sXG4gICAgICAgIHR5cGVFcnJvcjogc3RyaW5nLFxuICAgIH07XG59XG5cbi8qKlxuICogR2VuZXJpY0ZpbGUgdGhhdCBpcyB0cmVhdGVkIGFzIHRoZSBCbGl0eiBjb25maWcgYnkgZGVmYXVsdFxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJR19OQU1FID0gJ2JsaXR6LnltbCc7XG5cbi8qKlxuICogQXJyYXkgb2YgdmFsaWRhdGlvbiBvYmplY3RzIGZvciB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19QUk9QRVJUSUVTOiBJQ29uZmlnUHJvcGVydHlWYWxpZGF0b3JbXSA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdibGl0el92ZXJzaW9uJyxcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGN1cnJlbnQgQmxpdHogdmVyc2lvbicsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogVXRpbC5nZXRQYWNrYWdlSW5mbygpLnZlcnNpb24sXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnQmxpdHogdmVyc2lvbiBpcyBzdXBwb3NlZCB0byBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnc2l0ZV91cmwnLFxuICAgICAgICBtZXNzYWdlOiAnVXNpbmcgYW4gZW1wdHkgc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdTaXRlIFVSTCBpcyBzdXBwb3NlZCB0byBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnc2l0ZV9yb290JyxcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGFuIGVtcHR5IHN0cmluZycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnU2l0ZSByb290IGlzIHN1cHBvc2VkIHRvIGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdhYnNvbHV0ZV91cmxzJyxcbiAgICAgICAgbWVzc2FnZTogJ0Rpc2FibGluZyBhYnNvbHV0ZSBVUkxzLCB1c2luZyByZWxhdGl2ZSBVUkxzIGluc3RlYWQnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ2Jvb2xlYW4nLFxuICAgICAgICB0eXBlRXJyb3I6ICdBYnNvbHV0ZSBVUkxzIHNob3VsZCBiZSBhIGJvb2xlYW4gdmFsdWUhJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2V4cGxpY2l0X2h0bWxfZXh0ZW5zaW9ucycsXG4gICAgICAgIG1lc3NhZ2U6ICdFbmFibGluZyBleHBsaWNpdCBIVE1MIGV4dGVuc2lvbnMnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnYm9vbGVhbicsXG4gICAgICAgIHR5cGVFcnJvcjogJ0V4cGxpY2l0IEhUTUwgZXh0ZW5zaW9ucyBzaG91bGQgYmUgYSBib29sZWFuIHZhbHVlIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdwbHVnaW5zJyxcbiAgICAgICAgbWVzc2FnZTogJ0Fzc3VtaW5nIHRoZXJlIGFyZSBubyBwbHVnaW5zJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBbXSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0JyB8fCAhKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZUVycm9yOiAnUGx1Z2lucyBtdXN0IGJlIGFuIGFycmF5IG9mIHN0cmluZ3MgKHBsdWdpbiBuYW1lcykhJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2dsb2JhbHMnLFxuICAgICAgICBtZXNzYWdlOiAnQXNzdW1pbmcgdGhlcmUgYXJlIG5vIGdsb2JhbHMnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHt9LFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgIShvYmplY3QgaW5zdGFuY2VvZiBBcnJheSksXG4gICAgICAgIHR5cGVFcnJvcjogJ0dsb2JhbHMgbXVzdCBiZSBhbiBvYmplY3QgKGFuZCBub3QgYW4gYXJyYXkpIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdwYWdlcycsXG4gICAgICAgIG1lc3NhZ2U6ICdBc3N1bWluZyB0aGVyZSBhcmUgbm8gcGFnZXMnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IFtdLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXksXG4gICAgICAgIHR5cGVFcnJvcjogJ1BhZ2VzIG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxuXTtcblxuLyoqXG4gKiBBcnJheSBvZiB2YWxpZGF0aW9uIG9iamVjdHMgZm9yIGEgY29uZmlnIHBhZ2VcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgQ09ORklHX1BBR0VfUFJPUEVSVElFUzogSUNvbmZpZ05hbWVkUHJvcGVydHlWYWxpZGF0b3JzID0ge1xuICAgIHVyaToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIFVSSSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGlkOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgSUQgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbmFtZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgdGVtcGxhdGUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZyEnLFxuICAgIH0sXG4gICAgY29udGVudDoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5pc0VtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIGNvbnRlbnQgaXMgc2V0LCBpdCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZyEnLFxuICAgIH0sXG4gICAgbWVudXM6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBtZW51cyBhcmUgc2V0LCBpdCBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbiAgICBjaGlsZF9wYWdlczoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIG1lbnVzIGFyZSBzZXQsIGl0IG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxuICAgIGNoaWxkX2RpcmVjdG9yaWVzOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgbWVudXMgYXJlIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG59O1xuXG4vKipcbiAqIEFycmF5IG9mIHZhbGlkYXRpb24gb2JqZWN0cyBmb3IgYSBjb25maWcgZGlyZWN0b3J5XG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19ESVJFQ1RPUllfUFJPUEVSVElFUzogSUNvbmZpZ05hbWVkUHJvcGVydHlWYWxpZGF0b3JzID0ge1xuICAgIHVyaToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIFVSSSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHVyaV9rZXk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBVUkkga2V5IGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGlkX2tleToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycsXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIElEIGtleSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBuYW1lIGlzIHNldCwgaXQgbXVzdCBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAgdGVtcGxhdGVfZGlyZWN0b3J5OiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyAmJiAhU3RyaW5nSGVscGVyLmlzRW1wdHkob2JqZWN0KSxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgdGVtcGxhdGUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZyEnLFxuICAgIH0sXG4gICAgdGVtcGxhdGU6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiB0ZW1wbGF0ZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nIScsXG4gICAgfSxcbiAgICBjb250ZW50X2RpcmVjdG9yeToge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5pc0VtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIGNvbnRlbnQgaXMgc2V0LCBpdCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZyEnLFxuICAgIH0sXG4gICAgY29udGVudDoge1xuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgIVN0cmluZ0hlbHBlci5pc0VtcHR5KG9iamVjdCksXG4gICAgICAgIHR5cGVFcnJvcjogJ0lmIGNvbnRlbnQgaXMgc2V0LCBpdCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZyEnLFxuICAgIH0sXG4gICAgbWVudXM6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBtZW51cyBhcmUgc2V0LCBpdCBtdXN0IGJlIGFuIGFycmF5IScsXG4gICAgfSxcbn07XG5cbi8qKlxuICogQXJyYXkgb2YgdmFsaWRhdGlvbiBvYmplY3RzIGZvciBhIGNvbmZpZyBkaXJlY3RvcnlcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgQ09ORklHX01FTlVfUFJPUEVSVElFUzogSUNvbmZpZ05hbWVkUHJvcGVydHlWYWxpZGF0b3JzID0ge1xuICAgIG5hbWU6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnICYmICFTdHJpbmdIZWxwZXIuaXNFbXB0eShvYmplY3QpLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBuYW1lIGlzIHNldCwgaXQgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmchJyxcbiAgICB9LFxuICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnSWYgdGl0bGUgaXMgc2V0LCBpdCBtdXN0IGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB0aXRsZV9rZXk6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiB0aXRsZSBpcyBzZXQsIGl0IG11c3QgYmUgYSBzdHJpbmchJyxcbiAgICB9LFxuICAgIGtleXM6IHtcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCBpbnN0YW5jZW9mIEFycmF5LFxuICAgICAgICB0eXBlRXJyb3I6ICdJZiBrZXlzIGlzIHNldCwgaXQgbXVzdCBiZSBhbiBhcnJheSEnLFxuICAgIH0sXG59O1xuXG4vKipcbiAqIEBjbGFzcyBDbGFzcyByZXNwb25zaWJsZSBmb3IgbG9hZGluZyBhbmQgdmFsaWRhdGluZyB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZyB7XG4gICAgLyoqXG4gICAgICogUmF3IEphdmFTY3JpcHQgb2JqZWN0IGdlbmVyYXRlZCBmcm9tIFlBTUwgZm91bmQgaW4gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgcmF3Q29uZmlnOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzZWQgYW5kIHZhbGlkYXRlZCBjb25maWcgdGhhdCBmb2xsb3dzIHRoZSBpbnRlcmZhY2VzIGRlZmluZWQgYWJvdmVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlZENvbmZpZzogSUNvbmZpZztcblxuICAgIC8qKlxuICAgICAqIExvYWRzIGEgcmF3IGNvbmZpZyBmb3IgdmFsaWRhdGlvblxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkKHJhd0NvbmZpZzogYW55KSB7XG4gICAgICAgIHRoaXMucmF3Q29uZmlnID0gcmF3Q29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgcmF3IGNvbmZpZyB0byBjcmVhdGUgdGhlIHZhbGlkYXRlZCBjb25maWcsIGlmIHBvc3NpYmxlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHZhbGlkYXRlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnJhd0NvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbmZpZyB3YXMgbG9hZGVkIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnJhd0NvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU3VwcGxpZWQgY29uZmlnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsaWRhdGVkQ29uZmlnOiBhbnkgPSB7fTtcblxuICAgICAgICBsZXQgcHJvcGVydHlDb3VudCA9IENPTkZJR19QUk9QRVJUSUVTLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0eUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB2YWxpZGF0b3IgPSBDT05GSUdfUFJPUEVSVElFU1tpXTtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucmF3Q29uZmlnW3ZhbGlkYXRvci5uYW1lXTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gdW5kZWZpbmVkIHx8IHByb3BlcnR5ID09PSBudWxsKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tbnVsbC1rZXl3b3JkXG4gICAgICAgICAgICAgICAgbGV0IGRpc3BsYXlWYWx1ZSA9ICdgJyArIFN0cmluZ0hlbHBlci5zdHJpbmdpZnkodmFsaWRhdG9yLmRlZmF1bHRWYWx1ZSkgKyAnYCc7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblN0cmluZyA9IHZhbGlkYXRvci5tZXNzYWdlICsgJywgJyArIExvZ2dlci5icmFuZChkaXNwbGF5VmFsdWUpO1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coJ2AnICsgTG9nZ2VyLmJyYW5kKHZhbGlkYXRvci5uYW1lKSArICdgIGlzIG5vdCBkZWZpbmVkOiAnICsgYWN0aW9uU3RyaW5nLCBMb2dMZXZlbC5XYXJuKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZWRDb25maWdbdmFsaWRhdG9yLm5hbWVdID0gdmFsaWRhdG9yLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbGlkYXRvci50eXBlQ2hlY2tlcihwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnSW52YWxpZCB0eXBlIGZvciBgJyArIExvZ2dlci5icmFuZCh2YWxpZGF0b3IubmFtZSkgKyAnYDogJyArIHZhbGlkYXRvci50eXBlRXJyb3I7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVkQ29uZmlnW3ZhbGlkYXRvci5uYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFsaWRhdGVkQ29uZmlnLnBhZ2VzID0gdGhpcy52YWxpZGF0ZVBhZ2VzKHZhbGlkYXRlZENvbmZpZy5wYWdlcyk7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZWRDb25maWcgPSB2YWxpZGF0ZWRDb25maWcgYXMgSUNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgbXVsdGlwbGUgcGFnZXMgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVQYWdlcyhyYXdQYWdlczogYW55W10pOiBJQ29uZmlnUGFnZVtdIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZFBhZ2VzOiBJQ29uZmlnUGFnZVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3UGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZFBhZ2VzLnB1c2godGhpcy52YWxpZGF0ZVBhZ2UocmF3UGFnZXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkUGFnZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIHBhZ2UgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVQYWdlKHJhd1BhZ2U6IGFueSk6IElDb25maWdQYWdlIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZFBhZ2U6IElDb25maWdQYWdlID0gQ29uZmlnLnZhbGlkYXRlTmFtZWRQcm9wZXJ0aWVzKFxuICAgICAgICAgICAgcmF3UGFnZSxcbiAgICAgICAgICAgIENPTkZJR19QQUdFX1BST1BFUlRJRVMsXG4gICAgICAgICAgICAncGFnZSdcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodmFsaWRhdGVkUGFnZS5tZW51cykge1xuICAgICAgICAgICAgdmFsaWRhdGVkUGFnZS5tZW51cyA9IHRoaXMudmFsaWRhdGVNZW51cyh2YWxpZGF0ZWRQYWdlLm1lbnVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVkUGFnZS5jaGlsZF9wYWdlcykge1xuICAgICAgICAgICAgdmFsaWRhdGVkUGFnZS5jaGlsZF9wYWdlcyA9IHRoaXMudmFsaWRhdGVQYWdlcyh2YWxpZGF0ZWRQYWdlLmNoaWxkX3BhZ2VzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVkUGFnZS5jaGlsZF9kaXJlY3Rvcmllcykge1xuICAgICAgICAgICAgdmFsaWRhdGVkUGFnZS5jaGlsZF9kaXJlY3RvcmllcyA9IHRoaXMudmFsaWRhdGVEaXJlY3Rvcmllcyh2YWxpZGF0ZWRQYWdlLmNoaWxkX2RpcmVjdG9yaWVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkUGFnZSBhcyBJQ29uZmlnUGFnZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBzaW5nbGUgZGlyZWN0b3J5IGV4dHJhY3RlZCBmcm9tIHRoZSBjb25maWdcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlRGlyZWN0b3JpZXMocmF3RGlyZWN0b3JpZXM6IGFueVtdKTogSUNvbmZpZ0RpcmVjdG9yeVtdIHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZERpcmVjdG9yaWVzOiBJQ29uZmlnRGlyZWN0b3J5W10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYXdEaXJlY3Rvcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsaWRhdGVkRGlyZWN0b3JpZXMucHVzaCh0aGlzLnZhbGlkYXRlRGlyZWN0b3J5KHJhd0RpcmVjdG9yaWVzW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZERpcmVjdG9yaWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhIHNpbmdsZSBkaXJlY3RvcnkgZXh0cmFjdGVkIGZyb20gdGhlIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVEaXJlY3RvcnkocmF3RGlyZWN0b3J5OiBhbnkpOiBJQ29uZmlnRGlyZWN0b3J5IHtcbiAgICAgICAgbGV0IHZhbGlkYXRlZERpcmVjdG9yeTogSUNvbmZpZ0RpcmVjdG9yeSA9IENvbmZpZy52YWxpZGF0ZU5hbWVkUHJvcGVydGllcyhcbiAgICAgICAgICAgIHJhd0RpcmVjdG9yeSxcbiAgICAgICAgICAgIENPTkZJR19ESVJFQ1RPUllfUFJPUEVSVElFUyxcbiAgICAgICAgICAgICdkaXJlY3RvcnknXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlZERpcmVjdG9yeS50ZW1wbGF0ZSAmJiB2YWxpZGF0ZWREaXJlY3RvcnkudGVtcGxhdGVfZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnRXJyb3IgcGFyc2luZyBkaXJlY3RvcnkgcHJvcGVydHkgZnJvbSB0aGUgY29uZmlnOic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdZb3UgY2Fubm90IGhhdmUgYm90aCBgJyArIExvZ2dlci5icmFuZCgndGVtcGxhdGUnKSArICdgIGFuZCAnO1xuICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJ2AnICsgTG9nZ2VyLmJyYW5kKCd0ZW1wbGF0ZV9kaXJlY3RvcnknKSArICdgIHNwZWNpZmllZCEnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVkRGlyZWN0b3J5LmNvbnRlbnQgJiYgdmFsaWRhdGVkRGlyZWN0b3J5LmNvbnRlbnRfZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnRXJyb3IgcGFyc2luZyBkaXJlY3RvcnkgcHJvcGVydHkgZnJvbSB0aGUgY29uZmlnOic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdZb3UgY2Fubm90IGhhdmUgYm90aCBgJyArIExvZ2dlci5icmFuZCgnY29udGVudCcpICsgJ2AgYW5kICc7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnYCcgKyBMb2dnZXIuYnJhbmQoJ2NvbnRlbnRfZGlyZWN0b3J5JykgKyAnYCBzcGVjaWZpZWQhJztcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclN0cmluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkYXRlZERpcmVjdG9yeS50ZW1wbGF0ZV9kaXJlY3RvcnkgJiYgdmFsaWRhdGVkRGlyZWN0b3J5LmNvbnRlbnRfZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnRXJyb3IgcGFyc2luZyBkaXJlY3RvcnkgcHJvcGVydHkgZnJvbSB0aGUgY29uZmlnOic7XG4gICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdZb3UgY2Fubm90IGhhdmUgYm90aCBgJyArIExvZ2dlci5icmFuZCgndGVtcGxhdGVfZGlyZWN0b3J5JykgKyAnYCBhbmQgJztcbiAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdgJyArIExvZ2dlci5icmFuZCgnY29udGVudF9kaXJlY3RvcnknKSArICdgIHNwZWNpZmllZCEnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWxpZGF0ZWREaXJlY3RvcnkubWVudXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlZERpcmVjdG9yeS5tZW51cyA9IHRoaXMudmFsaWRhdGVNZW51cyh2YWxpZGF0ZWREaXJlY3RvcnkubWVudXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWREaXJlY3RvcnkgYXMgSUNvbmZpZ0RpcmVjdG9yeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBzaW5nbGUgbWVudSBleHRyYWN0ZWQgZnJvbSB0aGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHZhbGlkYXRlTWVudXMocmF3TWVudXM6IGFueVtdKTogSUNvbmZpZ01lbnVbXSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWRNZW51czogSUNvbmZpZ01lbnVbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd01lbnVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZWRNZW51cy5wdXNoKENvbmZpZy52YWxpZGF0ZU1lbnUocmF3TWVudXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkTWVudXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgc2luZ2xlIG1lbnUgZXh0cmFjdGVkIGZyb20gdGhlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmFsaWRhdGVNZW51KHJhd01lbnU6IGFueSk6IElDb25maWdNZW51IHtcbiAgICAgICAgcmV0dXJuIENvbmZpZy52YWxpZGF0ZU5hbWVkUHJvcGVydGllcyhyYXdNZW51LCBDT05GSUdfTUVOVV9QUk9QRVJUSUVTLCAnbWVudScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyBhbiBvYmplY3QgdXNpbmcgcHJvdmlkZWQgbmFtZWQgcHJvcGVydHkgdmFsaWRhdG9yc1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHZhbGlkYXRlTmFtZWRQcm9wZXJ0aWVzKHNvdXJjZU9iamVjdDogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IElDb25maWdOYW1lZFByb3BlcnR5VmFsaWRhdG9ycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVR5cGU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWRPYmplY3Q6IGFueSA9IHt9O1xuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eU5hbWUgaW4gdmFsaWRhdG9ycykge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcnMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgICAgICAgIGxldCByYXdQcm9wZXJ0eSA9IHNvdXJjZU9iamVjdFtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eVZhbGlkYXRvciA9IHZhbGlkYXRvcnNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAocmF3UHJvcGVydHkgIT09IHVuZGVmaW5lZCAmJiByYXdQcm9wZXJ0eSAhPT0gbnVsbCkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3BlcnR5VmFsaWRhdG9yLnR5cGVDaGVja2VyKHJhd1Byb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yU3RyaW5nID0gJ0Vycm9yIHBhcnNpbmcgJyArIHByb3BlcnR5VHlwZSArICcgcHJvcGVydHkgZnJvbSB0aGUgY29uZmlnOic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9ICdQcm9wZXJ0eSBgJyArIExvZ2dlci5icmFuZChTdHJpbmdIZWxwZXIuc3RyaW5naWZ5KHByb3BlcnR5TmFtZSkpICsgJ2AnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JTdHJpbmcgKz0gJyB3aXRoIHZhbHVlIGAnICsgTG9nZ2VyLmJyYW5kKFN0cmluZ0hlbHBlci5zdHJpbmdpZnkocmF3UHJvcGVydHkpKSArICdgOic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclN0cmluZyArPSAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yU3RyaW5nICs9IHByb3BlcnR5VmFsaWRhdG9yLnR5cGVFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZWRPYmplY3RbcHJvcGVydHlOYW1lXSA9IHJhd1Byb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZWRPYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsaWRhdGVkIGNvbmZpZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQoKTogSUNvbmZpZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlZENvbmZpZztcbiAgICB9XG59XG4iXX0=
