"use strict";
var path = require('path');
var fse = require('fs-extra');
var yaml = require('js-yaml');
var Config_1 = require('./Config');
var events_1 = require('events');
exports.DEFAULT_CONFIG_NAME = 'blitz.yml';
exports.DEFAULT_ASSET_DIRECTORY_NAME = 'assets';
exports.DEFAULT_BUILD_DIRECTORY_NAME = 'build';
exports.DEFAULT_BUILD_ASSET_DIRECTORY_NAME = 'assets';
exports.DEFAULT_CONTENT_DIRECTORY_NAME = 'content';
exports.DEFAULT_TEMPLATE_DIRECTORY_NAME = 'templates';
var ProjectSettings = (function () {
    function ProjectSettings(configPath) {
        this._configPath = configPath;
        this.loadConfig();
        this.setupDirectories();
        this._eventEmitter = new events_1.EventEmitter();
    }
    ProjectSettings.prototype.loadConfig = function () {
        var configContents = fse.readFileSync(this._configPath, 'utf8');
        var rawConfig = yaml.safeLoad(configContents);
        if (!rawConfig) {
            rawConfig = {};
        }
        this._config = new Config_1.Config();
        this._config.load(rawConfig);
    };
    ProjectSettings.prototype.setupDirectories = function () {
        this._projectPath = path.dirname(this._configPath);
        this._assetPath = path.join(this._projectPath, exports.DEFAULT_ASSET_DIRECTORY_NAME);
        this._buildPath = path.join(this._projectPath, exports.DEFAULT_BUILD_DIRECTORY_NAME);
        this._buildAssetPath = path.join(this._buildPath, exports.DEFAULT_BUILD_ASSET_DIRECTORY_NAME);
        this._contentPath = path.join(this._projectPath, exports.DEFAULT_CONTENT_DIRECTORY_NAME);
        this._templatePath = path.join(this._projectPath, exports.DEFAULT_TEMPLATE_DIRECTORY_NAME);
    };
    Object.defineProperty(ProjectSettings.prototype, "configPath", {
        get: function () {
            return this._configPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "projectPath", {
        get: function () {
            return this._projectPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "assetPath", {
        get: function () {
            return this._assetPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "buildPath", {
        get: function () {
            return this._buildPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "buildAssetPath", {
        get: function () {
            return this._buildAssetPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "contentPath", {
        get: function () {
            return this._contentPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "templatePath", {
        get: function () {
            return this._templatePath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "eventEmitter", {
        get: function () {
            return this._eventEmitter;
        },
        enumerable: true,
        configurable: true
    });
    return ProjectSettings;
}());
exports.ProjectSettings = ProjectSettings;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL1Byb2plY3RTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsSUFBWSxJQUFJLFdBQU0sTUFBTSxDQUFDLENBQUE7QUFDN0IsSUFBWSxHQUFHLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFDaEMsSUFBWSxJQUFJLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDaEMsdUJBQXFCLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLHVCQUEyQixRQUFRLENBQUMsQ0FBQTtBQUV2QiwyQkFBbUIsR0FBRyxXQUFXLENBQUM7QUFDbEMsb0NBQTRCLEdBQUcsUUFBUSxDQUFDO0FBQ3hDLG9DQUE0QixHQUFHLE9BQU8sQ0FBQztBQUN2QywwQ0FBa0MsR0FBRyxRQUFRLENBQUM7QUFDOUMsc0NBQThCLEdBQUcsU0FBUyxDQUFDO0FBQzNDLHVDQUErQixHQUFHLFdBQVcsQ0FBQztBQUszRDtJQVlJLHlCQUFtQixVQUFrQjtRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRU8sb0NBQVUsR0FBbEI7UUFDSSxJQUFJLGNBQWMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDYixTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLDBDQUFnQixHQUF4QjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsb0NBQTRCLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxvQ0FBNEIsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLDBDQUFrQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsc0NBQThCLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSx1Q0FBK0IsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxzQkFBVyx1Q0FBVTthQUFyQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsbUNBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHdDQUFXO2FBQXRCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxzQ0FBUzthQUFwQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsc0NBQVM7YUFBcEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDJDQUFjO2FBQXpCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx3Q0FBVzthQUF0QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcseUNBQVk7YUFBdkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHlDQUFZO2FBQXZCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFDTCxzQkFBQztBQUFELENBekVBLEFBeUVDLElBQUE7QUF6RVksdUJBQWUsa0JBeUUzQixDQUFBIiwiZmlsZSI6InNyYy9jb21wb25lbnRzL1Byb2plY3RTZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQSBUeXBlU2NyaXB0IGZpbGUuXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE3XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgZnNlIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIHlhbWwgZnJvbSAnanMteWFtbCc7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9Db25maWcnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cyc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJR19OQU1FID0gJ2JsaXR6LnltbCc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9BU1NFVF9ESVJFQ1RPUllfTkFNRSA9ICdhc3NldHMnO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQlVJTERfRElSRUNUT1JZX05BTUUgPSAnYnVpbGQnO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQlVJTERfQVNTRVRfRElSRUNUT1JZX05BTUUgPSAnYXNzZXRzJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTlRFTlRfRElSRUNUT1JZX05BTUUgPSAnY29udGVudCc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9URU1QTEFURV9ESVJFQ1RPUllfTkFNRSA9ICd0ZW1wbGF0ZXMnO1xuXG4vKipcbiAqIEBjbGFzcyBSZXByZXNlbnRzIHRoZSBydW50aW1lIHNldHRpbmdzIGZvciBCbGl0eiBpbnN0YW5jZSwgbm90IHRvIGJlIGNvbmZ1c2VkIHdpdGggYENvbmZpZ2AgY2xhc3NcbiAqL1xuZXhwb3J0IGNsYXNzIFByb2plY3RTZXR0aW5ncyB7XG5cbiAgICBwcml2YXRlIF9jb25maWdQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfY29uZmlnOiBDb25maWc7XG4gICAgcHJpdmF0ZSBfcHJvamVjdFBhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIF9hc3NldFBhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIF9idWlsZFBhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIF9idWlsZEFzc2V0UGF0aDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2NvbnRlbnRQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfdGVtcGxhdGVQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnUGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZ1BhdGggPSBjb25maWdQYXRoO1xuICAgICAgICB0aGlzLmxvYWRDb25maWcoKTtcbiAgICAgICAgdGhpcy5zZXR1cERpcmVjdG9yaWVzKCk7XG4gICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRDb25maWcoKSB7XG4gICAgICAgIGxldCBjb25maWdDb250ZW50cyA9IGZzZS5yZWFkRmlsZVN5bmModGhpcy5fY29uZmlnUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgbGV0IHJhd0NvbmZpZyA9IHlhbWwuc2FmZUxvYWQoY29uZmlnQ29udGVudHMpO1xuICAgICAgICBpZiAoIXJhd0NvbmZpZykge1xuICAgICAgICAgICAgcmF3Q29uZmlnID0ge307XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICB0aGlzLl9jb25maWcubG9hZChyYXdDb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBEaXJlY3RvcmllcygpIHtcbiAgICAgICAgdGhpcy5fcHJvamVjdFBhdGggPSBwYXRoLmRpcm5hbWUodGhpcy5fY29uZmlnUGF0aCk7XG4gICAgICAgIHRoaXMuX2Fzc2V0UGF0aCA9IHBhdGguam9pbih0aGlzLl9wcm9qZWN0UGF0aCwgREVGQVVMVF9BU1NFVF9ESVJFQ1RPUllfTkFNRSk7XG4gICAgICAgIHRoaXMuX2J1aWxkUGF0aCA9IHBhdGguam9pbih0aGlzLl9wcm9qZWN0UGF0aCwgREVGQVVMVF9CVUlMRF9ESVJFQ1RPUllfTkFNRSk7XG4gICAgICAgIHRoaXMuX2J1aWxkQXNzZXRQYXRoID0gcGF0aC5qb2luKHRoaXMuX2J1aWxkUGF0aCwgREVGQVVMVF9CVUlMRF9BU1NFVF9ESVJFQ1RPUllfTkFNRSk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRQYXRoID0gcGF0aC5qb2luKHRoaXMuX3Byb2plY3RQYXRoLCBERUZBVUxUX0NPTlRFTlRfRElSRUNUT1JZX05BTUUpO1xuICAgICAgICB0aGlzLl90ZW1wbGF0ZVBhdGggPSBwYXRoLmpvaW4odGhpcy5fcHJvamVjdFBhdGgsIERFRkFVTFRfVEVNUExBVEVfRElSRUNUT1JZX05BTUUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY29uZmlnUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnUGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBDb25maWcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcHJvamVjdFBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2plY3RQYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYXNzZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hc3NldFBhdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBidWlsZFBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkUGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGJ1aWxkQXNzZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idWlsZEFzc2V0UGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvbnRlbnRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50UGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRlbXBsYXRlUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGVQYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZXZlbnRFbWl0dGVyKCk6IEV2ZW50RW1pdHRlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudEVtaXR0ZXI7XG4gICAgfVxufVxuIl19
