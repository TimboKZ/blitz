"use strict";
var path = require('path');
var fse = require('fs-extra');
var yaml = require('js-yaml');
var Config_1 = require('./Config');
var events_1 = require('events');
exports.DEFAULT_CONFIG_NAME = 'blitz.yml';
exports.DEFAULT_ASSET_DIRECTORY_NAME = 'assets';
exports.DEFAULT_BUILD_DIRECTORY_NAME = 'build';
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL1Byb2plY3RTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsSUFBWSxJQUFJLFdBQU0sTUFBTSxDQUFDLENBQUE7QUFDN0IsSUFBWSxHQUFHLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFDaEMsSUFBWSxJQUFJLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDaEMsdUJBQXFCLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLHVCQUEyQixRQUFRLENBQUMsQ0FBQTtBQUV2QiwyQkFBbUIsR0FBRyxXQUFXLENBQUM7QUFDbEMsb0NBQTRCLEdBQUcsUUFBUSxDQUFDO0FBQ3hDLG9DQUE0QixHQUFHLE9BQU8sQ0FBQztBQUN2QyxzQ0FBOEIsR0FBRyxTQUFTLENBQUM7QUFDM0MsdUNBQStCLEdBQUcsV0FBVyxDQUFDO0FBSzNEO0lBV0kseUJBQW1CLFVBQWtCO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFTyxvQ0FBVSxHQUFsQjtRQUNJLElBQUksY0FBYyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoRSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNiLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8sMENBQWdCLEdBQXhCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxvQ0FBNEIsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLG9DQUE0QixDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsc0NBQThCLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSx1Q0FBK0IsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxzQkFBVyx1Q0FBVTthQUFyQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsbUNBQU07YUFBakI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHdDQUFXO2FBQXRCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxzQ0FBUzthQUFwQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsc0NBQVM7YUFBcEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHdDQUFXO2FBQXRCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx5Q0FBWTthQUF2QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcseUNBQVk7YUFBdkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUNMLHNCQUFDO0FBQUQsQ0FuRUEsQUFtRUMsSUFBQTtBQW5FWSx1QkFBZSxrQkFtRTNCLENBQUEiLCJmaWxlIjoic3JjL2NvbXBvbmVudHMvUHJvamVjdFNldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBBIFR5cGVTY3JpcHQgZmlsZS5cbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTdcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBmc2UgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0ICogYXMgeWFtbCBmcm9tICdqcy15YW1sJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL0NvbmZpZyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09ORklHX05BTUUgPSAnYmxpdHoueW1sJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX0FTU0VUX0RJUkVDVE9SWV9OQU1FID0gJ2Fzc2V0cyc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9CVUlMRF9ESVJFQ1RPUllfTkFNRSA9ICdidWlsZCc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05URU5UX0RJUkVDVE9SWV9OQU1FID0gJ2NvbnRlbnQnO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVEVNUExBVEVfRElSRUNUT1JZX05BTUUgPSAndGVtcGxhdGVzJztcblxuLyoqXG4gKiBAY2xhc3MgUmVwcmVzZW50cyB0aGUgcnVudGltZSBzZXR0aW5ncyBmb3IgQmxpdHogaW5zdGFuY2UsIG5vdCB0byBiZSBjb25mdXNlZCB3aXRoIGBDb25maWdgIGNsYXNzXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9qZWN0U2V0dGluZ3Mge1xuXG4gICAgcHJpdmF0ZSBfY29uZmlnUGF0aDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2NvbmZpZzogQ29uZmlnO1xuICAgIHByaXZhdGUgX3Byb2plY3RQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfYXNzZXRQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfYnVpbGRQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfY29udGVudFBhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIF90ZW1wbGF0ZVBhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIF9ldmVudEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWdQYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY29uZmlnUGF0aCA9IGNvbmZpZ1BhdGg7XG4gICAgICAgIHRoaXMubG9hZENvbmZpZygpO1xuICAgICAgICB0aGlzLnNldHVwRGlyZWN0b3JpZXMoKTtcbiAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZENvbmZpZygpIHtcbiAgICAgICAgbGV0IGNvbmZpZ0NvbnRlbnRzID0gZnNlLnJlYWRGaWxlU3luYyh0aGlzLl9jb25maWdQYXRoLCAndXRmOCcpO1xuICAgICAgICBsZXQgcmF3Q29uZmlnID0geWFtbC5zYWZlTG9hZChjb25maWdDb250ZW50cyk7XG4gICAgICAgIGlmICghcmF3Q29uZmlnKSB7XG4gICAgICAgICAgICByYXdDb25maWcgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5sb2FkKHJhd0NvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cERpcmVjdG9yaWVzKCkge1xuICAgICAgICB0aGlzLl9wcm9qZWN0UGF0aCA9IHBhdGguZGlybmFtZSh0aGlzLl9jb25maWdQYXRoKTtcbiAgICAgICAgdGhpcy5fYXNzZXRQYXRoID0gcGF0aC5qb2luKHRoaXMuX3Byb2plY3RQYXRoLCBERUZBVUxUX0FTU0VUX0RJUkVDVE9SWV9OQU1FKTtcbiAgICAgICAgdGhpcy5fYnVpbGRQYXRoID0gcGF0aC5qb2luKHRoaXMuX3Byb2plY3RQYXRoLCBERUZBVUxUX0JVSUxEX0RJUkVDVE9SWV9OQU1FKTtcbiAgICAgICAgdGhpcy5fY29udGVudFBhdGggPSBwYXRoLmpvaW4odGhpcy5fcHJvamVjdFBhdGgsIERFRkFVTFRfQ09OVEVOVF9ESVJFQ1RPUllfTkFNRSk7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlUGF0aCA9IHBhdGguam9pbih0aGlzLl9wcm9qZWN0UGF0aCwgREVGQVVMVF9URU1QTEFURV9ESVJFQ1RPUllfTkFNRSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb25maWdQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWdQYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IENvbmZpZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBwcm9qZWN0UGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvamVjdFBhdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhc3NldFBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fzc2V0UGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGJ1aWxkUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnVpbGRQYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY29udGVudFBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRQYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdGVtcGxhdGVQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZVBhdGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBldmVudEVtaXR0ZXIoKTogRXZlbnRFbWl0dGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50RW1pdHRlcjtcbiAgICB9XG59XG4iXX0=
