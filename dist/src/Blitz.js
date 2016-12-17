"use strict";
var path = require('path');
var fse = require('fs-extra');
var yaml = require('js-yaml');
var ProjectInitialiser_1 = require('./ProjectInitialiser');
var Logger_1 = require('./Logger');
var Config_1 = require('./Config');
var Blitz = (function () {
    function Blitz() {
    }
    Blitz.init = function (templateName, projectPath) {
        Logger_1.Logger.log('Initialising a new project in `' +
            Logger_1.Logger.brand(projectPath) + '` using the template `' +
            Logger_1.Logger.brand(templateName) + '`...', Logger_1.LogLevel.Debug);
        var templatesPath = path.join(__dirname, '..', '..', 'templates');
        var projectInitialiser = new ProjectInitialiser_1.ProjectInitialiser(projectPath, templatesPath);
        projectInitialiser.initialise(templateName, function (error) {
            if (error) {
                Logger_1.Logger.logMany(Logger_1.Logger.split(error), Logger_1.LogLevel.Error);
                process.exit(1);
            }
            Logger_1.Logger.log('Project initialised!');
            process.exit(0);
        });
    };
    Blitz.build = function (configPath, buildDirectory) {
        Logger_1.Logger.log('Building site using `' +
            Logger_1.Logger.brand(configPath) + '` in directory `' +
            Logger_1.Logger.brand(buildDirectory) + '`...', Logger_1.LogLevel.Debug);
        var configContents = fse.readFileSync(configPath, 'utf8');
        var rawConfig = yaml.safeLoad(configContents);
        if (!rawConfig || typeof rawConfig !== 'object') {
            rawConfig = {};
        }
        var config = new Config_1.Config();
        config.load(rawConfig);
        try {
            config.validate();
        }
        catch (exception) {
            Logger_1.Logger.log('Error validating the config:', Logger_1.LogLevel.Error);
            Logger_1.Logger.logMany(Logger_1.Logger.split(exception.message), Logger_1.LogLevel.Error);
            process.exit(1);
        }
        console.log(config.get());
    };
    Blitz.watch = function () {
    };
    Blitz.preview = function () {
    };
    return Blitz;
}());
exports.Blitz = Blitz;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQU1hLFdBQUssR0FBbkI7SUFFQSxDQUFDO0lBTWEsYUFBTyxHQUFyQjtJQUVBLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0EvREEsQUErREMsSUFBQTtBQS9EWSxhQUFLLFFBK0RqQixDQUFBIiwiZmlsZSI6InNyYy9CbGl0ei5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgRmlsZSBjb250YWluaW5nIHRoZSBjb3JlIG9mIEJsaXR6XG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgZnNlIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIHlhbWwgZnJvbSAnanMteWFtbCc7XG5pbXBvcnQge1Byb2plY3RJbml0aWFsaXNlcn0gZnJvbSAnLi9Qcm9qZWN0SW5pdGlhbGlzZXInO1xuaW1wb3J0IHtMb2dnZXIsIExvZ0xldmVsfSBmcm9tICcuL0xvZ2dlcic7XG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnLi9Db25maWcnO1xuXG4vKipcbiAqIEBjbGFzcyBNYWluIGNsYXNzIG9mIEJsaXR6LCBleHBvc2VzIHRoZSBBUEkgZm9yIGV4dGVybmFsIG1vZHVsZXMgdG8gdXNlXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuZXhwb3J0IGNsYXNzIEJsaXR6IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXNlcyBhIEJsaXR6IHByb2plY3QgZnJvbSBhIHRlbXBsYXRlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpbml0KHRlbXBsYXRlTmFtZTogc3RyaW5nLCBwcm9qZWN0UGF0aDogc3RyaW5nKSB7XG4gICAgICAgIExvZ2dlci5sb2coJ0luaXRpYWxpc2luZyBhIG5ldyBwcm9qZWN0IGluIGAnICtcbiAgICAgICAgICAgIExvZ2dlci5icmFuZChwcm9qZWN0UGF0aCkgKyAnYCB1c2luZyB0aGUgdGVtcGxhdGUgYCcgK1xuICAgICAgICAgICAgTG9nZ2VyLmJyYW5kKHRlbXBsYXRlTmFtZSkgKyAnYC4uLicsIExvZ0xldmVsLkRlYnVnKTtcbiAgICAgICAgbGV0IHRlbXBsYXRlc1BhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAndGVtcGxhdGVzJyk7XG4gICAgICAgIGxldCBwcm9qZWN0SW5pdGlhbGlzZXIgPSBuZXcgUHJvamVjdEluaXRpYWxpc2VyKHByb2plY3RQYXRoLCB0ZW1wbGF0ZXNQYXRoKTtcbiAgICAgICAgcHJvamVjdEluaXRpYWxpc2VyLmluaXRpYWxpc2UodGVtcGxhdGVOYW1lLCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2dNYW55KExvZ2dlci5zcGxpdChlcnJvciksIExvZ0xldmVsLkVycm9yKTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBMb2dnZXIubG9nKCdQcm9qZWN0IGluaXRpYWxpc2VkIScpO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIHdlYnNpdGUgdXNpbmcgdGhlIHNwZWNpZmllZCBjb25maWcuIEFzc3VtZXMgdGhhdCBhbGwgcmVsZXZhbnQgZm9sZGVycyAoZS5nLiBgYXNzZXRzYCwgYGNvbnRlbnRgLFxuICAgICAqIGBwbHVnaW5zYCwgYHRlbXBsYXRlc2AsIGV0Yy4pIGV4aXN0IGluIHRoZSBzYW1lIGRpcmVjdG9yeSBhcyB0aGUgY29uZmlnLiBUaGUgZ2VuZXJhdGVkIGZpbGVzIGFyZSBwbGFjZWQgaW50byB0aGVcbiAgICAgKiBzcGVjaWZpZWQgYnVpbGQgZGlyZWN0b3J5LlxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGQoY29uZmlnUGF0aDogc3RyaW5nLCBidWlsZERpcmVjdG9yeTogc3RyaW5nKSB7XG4gICAgICAgIExvZ2dlci5sb2coJ0J1aWxkaW5nIHNpdGUgdXNpbmcgYCcgK1xuICAgICAgICAgICAgTG9nZ2VyLmJyYW5kKGNvbmZpZ1BhdGgpICsgJ2AgaW4gZGlyZWN0b3J5IGAnICtcbiAgICAgICAgICAgIExvZ2dlci5icmFuZChidWlsZERpcmVjdG9yeSkgKyAnYC4uLicsIExvZ0xldmVsLkRlYnVnKTtcbiAgICAgICAgbGV0IGNvbmZpZ0NvbnRlbnRzID0gZnNlLnJlYWRGaWxlU3luYyhjb25maWdQYXRoLCAndXRmOCcpO1xuICAgICAgICBsZXQgcmF3Q29uZmlnID0geWFtbC5zYWZlTG9hZChjb25maWdDb250ZW50cyk7XG4gICAgICAgIGlmICghcmF3Q29uZmlnIHx8IHR5cGVvZiByYXdDb25maWcgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByYXdDb25maWcgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICBjb25maWcubG9hZChyYXdDb25maWcpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgTG9nZ2VyLmxvZygnRXJyb3IgdmFsaWRhdGluZyB0aGUgY29uZmlnOicgLCBMb2dMZXZlbC5FcnJvcik7XG4gICAgICAgICAgICBMb2dnZXIubG9nTWFueShMb2dnZXIuc3BsaXQoZXhjZXB0aW9uLm1lc3NhZ2UpLCBMb2dMZXZlbC5FcnJvcik7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coY29uZmlnLmdldCgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXYXRjaGVzIHRoZSBjdXJyZW50IGRpcmVjdG9yeSBhbmQgcmVidWlsZHMgY2VydGFpbiBwYXJ0cyBvZiB0aGUgd2Vic2l0ZSB3aGVuIG5lY2Vzc2FyeVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgd2F0Y2goKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW5zIGEgd2ViIHNlcnZlciB3aXRoIHRoZSBwcmV2aWV3IG9mIHRoZSB3ZWJzaXRlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwcmV2aWV3KCkge1xuXG4gICAgfVxufVxuIl19
