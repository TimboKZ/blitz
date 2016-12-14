"use strict";
var fse = require('fs-extra');
var yaml = require('js-yaml');
var Util_1 = require('./Util');
var Logger_1 = require('./Logger');
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
                var displayValue = void 0;
                if (typeof validator.defaultValue === 'string') {
                    displayValue = '\'' + validator.defaultValue + '\'';
                }
                else {
                    displayValue = JSON.stringify(validator.defaultValue);
                }
                var actionString = validator.message + ' (' + Logger_1.Logger.brand(displayValue) + ')';
                Logger_1.Logger.log('`' + Logger_1.Logger.brand(validator.name) + '` is not defined: ' + actionString);
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
        this.validatedConfig = validatedConfig;
    };
    Config.prototype.get = function () {
        return this.validatedConfig;
    };
    return Config;
}());
exports.Config = Config;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBLElBQVksR0FBRyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLElBQVksSUFBSSxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ2hDLHFCQUFtQixRQUFRLENBQUMsQ0FBQTtBQUM1Qix1QkFBcUIsVUFBVSxDQUFDLENBQUE7QUF5RW5CLDJCQUFtQixHQUFHLFdBQVcsQ0FBQztBQU1sQyx5QkFBaUIsR0FBK0I7SUFDekQ7UUFDSSxJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsNkJBQTZCO1FBQ3RDLFlBQVksRUFBRSxXQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsT0FBTztRQUMzQyxXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQTFCLENBQTBCO1FBQ25ELFNBQVMsRUFBRSwyQ0FBMkM7S0FDekQ7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLE9BQU8sRUFBRSx1QkFBdUI7UUFDaEMsWUFBWSxFQUFFLEVBQUU7UUFDaEIsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxFQUExQixDQUEwQjtRQUNuRCxTQUFTLEVBQUUsc0NBQXNDO0tBQ3BEO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLFlBQVksRUFBRSxFQUFFO1FBQ2hCLFdBQVcsRUFBRSxVQUFDLE1BQU0sSUFBSyxPQUFBLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBMUIsQ0FBMEI7UUFDbkQsU0FBUyxFQUFFLHVDQUF1QztLQUNyRDtJQUNEO1FBQ0ksSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLHNEQUFzRDtRQUMvRCxZQUFZLEVBQUUsS0FBSztRQUNuQixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxTQUFTLEVBQTNCLENBQTJCO1FBQ3BELFNBQVMsRUFBRSwwQ0FBMEM7S0FDeEQ7SUFDRDtRQUNJLElBQUksRUFBRSwwQkFBMEI7UUFDaEMsT0FBTyxFQUFFLG1DQUFtQztRQUM1QyxZQUFZLEVBQUUsSUFBSTtRQUNsQixXQUFXLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxPQUFPLE1BQU0sS0FBSyxTQUFTLEVBQTNCLENBQTJCO1FBQ3BELFNBQVMsRUFBRSxxREFBcUQ7S0FDbkU7SUFDRDtRQUNJLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLCtCQUErQjtRQUN4QyxZQUFZLEVBQUUsRUFBRTtRQUNoQixXQUFXLEVBQUUsVUFBQyxNQUFNO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsU0FBUyxFQUFFLHFEQUFxRDtLQUNuRTtJQUNEO1FBQ0ksSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsK0JBQStCO1FBQ3hDLFlBQVksRUFBRSxFQUFFO1FBQ2hCLFdBQVcsRUFBRSxVQUFDLE1BQU0sSUFBSyxPQUFBLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLEtBQUssQ0FBQyxFQUF4RCxDQUF3RDtRQUNqRixTQUFTLEVBQUUsK0NBQStDO0tBQzdEO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSw2QkFBNkI7UUFDdEMsWUFBWSxFQUFFLEVBQUU7UUFDaEIsV0FBVyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sWUFBWSxLQUFLLEVBQXJELENBQXFEO1FBQzlFLFNBQVMsRUFBRSx5QkFBeUI7S0FDdkM7Q0FDSixDQUFDO0FBTUY7SUF1QkksZ0JBQVksVUFBa0I7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQU1NLHFCQUFJLEdBQVg7UUFDSSxJQUFJLGNBQWMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzlDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFNTSx5QkFBUSxHQUFmO1FBQ0ksSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBRXpCLElBQUksYUFBYSxHQUFHLHlCQUFpQixDQUFDLE1BQU0sQ0FBQztRQUM3QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3JDLElBQUksU0FBUyxHQUFHLHlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksWUFBWSxTQUFBLENBQUM7Z0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLFlBQVksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxZQUFZLEdBQUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN4RCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDMUQsQ0FBQztnQkFDRCxJQUFJLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDL0UsZUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsb0JBQW9CLEdBQUcsWUFBWSxDQUFDLENBQUM7Z0JBQ3JGLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUM3RCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLElBQUksV0FBVyxHQUFHLG9CQUFvQixHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO2dCQUNwRyxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUMvQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBMEIsQ0FBQztJQUN0RCxDQUFDO0lBTU0sb0JBQUcsR0FBVjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0EvRUEsQUErRUMsSUFBQTtBQS9FWSxjQUFNLFNBK0VsQixDQUFBIiwiZmlsZSI6InNyYy9Db25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIEFsbCBjbGFzc2VzIGFuZCBpbnRlcmZhY2VzIHJlbGF0ZWQgdG8gdGhlIEJsaXR6IGNvbmZpZyBhbmQgZGF0YSB0eXBlcyB1c2VkIGluIGl0XG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuXG5pbXBvcnQgKiBhcyBmc2UgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0ICogYXMgeWFtbCBmcm9tICdqcy15YW1sJztcbmltcG9ydCB7VXRpbH0gZnJvbSAnLi9VdGlsJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuL0xvZ2dlcic7XG5cbi8qKlxuICogTWVudSBpbnRlcmZhY2UgYXMgc2VlbiBpbiB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29uZmlnTWVudSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIGtleXM6IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgdGhlIGNoaWxkIGRpcmVjdG9yeSBvZiBhIHBhZ2VcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdEaXJlY3Rvcnkge1xuICAgIHVyaT86IHN0cmluZztcbiAgICB1cmlfa2V5Pzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgbWVudXM/OiBJQ29uZmlnTWVudVtdO1xuICAgIHRlbXBsYXRlX2RpcmVjdG9yeT86IHN0cmluZztcbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgICBjb250ZW50X2RpcmVjdG9yeT86IHN0cmluZztcbiAgICBjb250ZW50Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFBhZ2UgY29uZmlndXJhdGlvbiBvYmplY3RcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdQYWdlIHtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgICBjb250ZW50Pzogc3RyaW5nO1xuICAgIG1lbnVzPzogSUNvbmZpZ01lbnVbXTtcbiAgICBjaGlsZF9wYWdlcz86IElDb25maWdQYWdlW107XG4gICAgY2hpbGRfZGlyZWN0b3JpZXM/OiBJQ29uZmlnRGlyZWN0b3J5W107XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgdG9wIGxldmVsIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gICAgYmxpdHpfdmVyc2lvbjogc3RyaW5nO1xuICAgIHNpdGVfdXJsOiBzdHJpbmc7XG4gICAgc2l0ZV9yb290OiBzdHJpbmc7XG4gICAgYWJzb2x1dGVfdXJsczogYm9vbGVhbjtcbiAgICBleHBsaWNpdF9odG1sX2V4dGVuc2lvbnM6IGJvb2xlYW47XG4gICAgcGx1Z2luczogc3RyaW5nW107XG4gICAgZ2xvYmFsczogYW55O1xuICAgIHBhZ2VzOiBJQ29uZmlnUGFnZVtdO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgYW4gb2JqZWN0IHVzZWQgdG8gdmFsaWRhdGUgYSBjZXJ0YWluIHByb3BlcnR5IG9mIHRoZSBjb25maWdcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElDb25maWdWYWxpZGF0b3JQcm9wZXJ0eSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBkZWZhdWx0VmFsdWU6IGFueTtcbiAgICB0eXBlQ2hlY2tlcjogKG9iamVjdDogYW55KSA9PiBib29sZWFuO1xuICAgIHR5cGVFcnJvcjogc3RyaW5nO1xufVxuXG4vKipcbiAqIEZpbGUgdGhhdCBpcyB0cmVhdGVkIGFzIHRoZSBCbGl0eiBjb25maWcgYnkgZGVmYXVsdFxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJR19OQU1FID0gJ2JsaXR6LnltbCc7XG5cbi8qKlxuICogQXJyYXkgb2YgdmFsaWRhdGlvbiBvYmplY3RzIGZvciB0aGUgY29uZmlnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IENPTkZJR19QUk9QRVJUSUVTOiBJQ29uZmlnVmFsaWRhdG9yUHJvcGVydHlbXSA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdibGl0el92ZXJzaW9uJyxcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGN1cnJlbnQgQmxpdHogdmVyc2lvbicsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogVXRpbC5nZXRQYWNrYWdlSW5mbygpLnZlcnNpb24sXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnQmxpdHogdmVyc2lvbiBpcyBzdXBwb3NlZCB0byBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnc2l0ZV91cmwnLFxuICAgICAgICBtZXNzYWdlOiAnVXNpbmcgYW4gZW1wdHkgc3RyaW5nJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnLFxuICAgICAgICB0eXBlRXJyb3I6ICdTaXRlIFVSTCBpcyBzdXBwb3NlZCB0byBiZSBhIHN0cmluZyEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnc2l0ZV9yb290JyxcbiAgICAgICAgbWVzc2FnZTogJ1VzaW5nIGFuIGVtcHR5IHN0cmluZycsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyxcbiAgICAgICAgdHlwZUVycm9yOiAnU2l0ZSByb290IGlzIHN1cHBvc2VkIHRvIGJlIGEgc3RyaW5nIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdhYnNvbHV0ZV91cmxzJyxcbiAgICAgICAgbWVzc2FnZTogJ0Rpc2FibGluZyBhYnNvbHV0ZSBVUkxzLCB1c2luZyByZWxhdGl2ZSBVUkxzIGluc3RlYWQnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZhbHNlLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ2Jvb2xlYW4nLFxuICAgICAgICB0eXBlRXJyb3I6ICdBYnNvbHV0ZSBVUkxzIHNob3VsZCBiZSBhIGJvb2xlYW4gdmFsdWUhJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2V4cGxpY2l0X2h0bWxfZXh0ZW5zaW9ucycsXG4gICAgICAgIG1lc3NhZ2U6ICdFbmFibGluZyBleHBsaWNpdCBIVE1MIGV4dGVuc2lvbnMnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgICAgIHR5cGVDaGVja2VyOiAob2JqZWN0KSA9PiB0eXBlb2Ygb2JqZWN0ID09PSAnYm9vbGVhbicsXG4gICAgICAgIHR5cGVFcnJvcjogJ0V4cGxpY2l0IEhUTUwgZXh0ZW5zaW9ucyBzaG91bGQgYmUgYSBib29sZWFuIHZhbHVlIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdwbHVnaW5zJyxcbiAgICAgICAgbWVzc2FnZTogJ0Fzc3VtaW5nIHRoZXJlIGFyZSBubyBwbHVnaW5zJyxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBbXSxcbiAgICAgICAgdHlwZUNoZWNrZXI6IChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0JyB8fCAhKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZUVycm9yOiAnUGx1Z2lucyBtdXN0IGJlIGFuIGFycmF5IG9mIHN0cmluZ3MgKHBsdWdpbiBuYW1lcykhJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2dsb2JhbHMnLFxuICAgICAgICBtZXNzYWdlOiAnQXNzdW1pbmcgdGhlcmUgYXJlIG5vIGdsb2JhbHMnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHt9LFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgIShvYmplY3QgaW5zdGFuY2VvZiBBcnJheSksXG4gICAgICAgIHR5cGVFcnJvcjogJ0dsb2JhbHMgbXVzdCBiZSBhbiBvYmplY3QgKGFuZCBub3QgYW4gYXJyYXkpIScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdwYWdlcycsXG4gICAgICAgIG1lc3NhZ2U6ICdBc3N1bWluZyB0aGVyZSBhcmUgbm8gcGFnZXMnLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IFtdLFxuICAgICAgICB0eXBlQ2hlY2tlcjogKG9iamVjdCkgPT4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0IGluc3RhbmNlb2YgQXJyYXksXG4gICAgICAgIHR5cGVFcnJvcjogJ1BhZ2VzIG11c3QgYmUgYW4gYXJyYXkhJyxcbiAgICB9LFxuXTtcblxuLyoqXG4gKiBAY2xhc3MgQ2xhc3MgcmVzcG9uc2libGUgZm9yIGxvYWRpbmcgYW5kIHZhbGlkYXRpbmcgdGhlIGNvbmZpZ1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWcge1xuICAgIC8qKlxuICAgICAqIFBhdGggdG8gdGhlIGNvbmZpZyBmaWxlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb25maWdQYXRoOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBSYXcgSmF2YVNjcmlwdCBvYmplY3QgZ2VuZXJhdGVkIGZyb20gWUFNTCBmb3VuZCBpbiB0aGUgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSByYXdDb25maWc6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlZCBhbmQgdmFsaWRhdGVkIGNvbmZpZyB0aGF0IGZvbGxvd3MgdGhlIGludGVyZmFjZXMgZGVmaW5lZCBhYm92ZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdmFsaWRhdGVkQ29uZmlnOiBJQ29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogQ29uZmlnIGNvbnN0cnVjdG9yXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnUGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29uZmlnUGF0aCA9IGNvbmZpZ1BhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIGNvbmZpZyBmcm9tIHRoZSBpbmplY3RlZCBwYXRoIGFuZCBwYXJzZXMgWUFNTCBpbnNpZGUgaXRcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZCgpIHtcbiAgICAgICAgbGV0IGNvbmZpZ0NvbnRlbnRzID0gZnNlLnJlYWRGaWxlU3luYyh0aGlzLmNvbmZpZ1BhdGgsICd1dGY4Jyk7XG4gICAgICAgIGxldCByYXdDb25maWcgPSB5YW1sLnNhZmVMb2FkKGNvbmZpZ0NvbnRlbnRzKTtcbiAgICAgICAgaWYgKCFyYXdDb25maWcgfHwgdHlwZW9mIHJhd0NvbmZpZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJhd0NvbmZpZyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmF3Q29uZmlnID0gcmF3Q29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgcmF3IGNvbmZpZyB0byBjcmVhdGUgdGhlIHZhbGlkYXRlZCBjb25maWcsIGlmIHBvc3NpYmxlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHZhbGlkYXRlKCkge1xuICAgICAgICBsZXQgdmFsaWRhdGVkQ29uZmlnID0ge307XG5cbiAgICAgICAgbGV0IHByb3BlcnR5Q291bnQgPSBDT05GSUdfUFJPUEVSVElFUy5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydHlDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdG9yID0gQ09ORklHX1BST1BFUlRJRVNbaV07XG4gICAgICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnJhd0NvbmZpZ1t2YWxpZGF0b3IubmFtZV07XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT09IHVuZGVmaW5lZCB8fCBwcm9wZXJ0eSA9PT0gbnVsbCkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICAgICAgICAgIGxldCBkaXNwbGF5VmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0b3IuZGVmYXVsdFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWUgPSAnXFwnJyArIHZhbGlkYXRvci5kZWZhdWx0VmFsdWUgKyAnXFwnJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWxpZGF0b3IuZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblN0cmluZyA9IHZhbGlkYXRvci5tZXNzYWdlICsgJyAoJyArIExvZ2dlci5icmFuZChkaXNwbGF5VmFsdWUpICsgJyknO1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coJ2AnICsgTG9nZ2VyLmJyYW5kKHZhbGlkYXRvci5uYW1lKSArICdgIGlzIG5vdCBkZWZpbmVkOiAnICsgYWN0aW9uU3RyaW5nKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZWRDb25maWdbdmFsaWRhdG9yLm5hbWVdID0gdmFsaWRhdG9yLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbGlkYXRvci50eXBlQ2hlY2tlcihwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JTdHJpbmcgPSAnSW52YWxpZCB0eXBlIGZvciBgJyArIExvZ2dlci5icmFuZCh2YWxpZGF0b3IubmFtZSkgKyAnYDogJyArIHZhbGlkYXRvci50eXBlRXJyb3I7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVkQ29uZmlnW3ZhbGlkYXRvci5uYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZWRDb25maWcgPSB2YWxpZGF0ZWRDb25maWcgYXMgSUNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWxpZGF0ZWQgY29uZmlnXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGdldCgpOiBJQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVkQ29uZmlnO1xuICAgIH1cbn1cbiJdfQ==
