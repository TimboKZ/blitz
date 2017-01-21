"use strict";
var path = require("path");
var fse = require("fs-extra");
var yaml = require("js-yaml");
var ProjectInitialiser_1 = require("./core/ProjectInitialiser");
var Logger_1 = require("./cli/Logger");
var Config_1 = require("./components/Config");
var ProjectWatcher_1 = require("./core/ProjectWatcher");
var events_1 = require("events");
var ProjectPreviewer_1 = require("./core/ProjectPreviewer");
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
    Blitz.build = function (configPath, buildPath) {
        Logger_1.Logger.log('Building site...');
        Logger_1.Logger.log('Building site using `' +
            Logger_1.Logger.brand(configPath) + '` in directory `' +
            Logger_1.Logger.brand(buildPath) + '`...', Logger_1.LogLevel.Debug);
        var configContents = fse.readFileSync(configPath, 'utf8');
        var rawConfig = yaml.safeLoad(configContents);
        if (!rawConfig) {
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
    Blitz.watch = function (configPath, buildPath) {
        Logger_1.Logger.log('Starting project watcher...');
        Logger_1.Logger.log('Watching the project using `' +
            Logger_1.Logger.brand(configPath) + '` with build located in `' +
            Logger_1.Logger.brand(buildPath) + '`...', Logger_1.LogLevel.Debug);
        var eventEmitter = new events_1.EventEmitter();
        var projectWatcher = new ProjectWatcher_1.ProjectWatcher(configPath, buildPath, eventEmitter);
        projectWatcher.watch();
    };
    Blitz.preview = function (configPath, buildPath) {
        Logger_1.Logger.log('Starting preview server...');
        Logger_1.Logger.log('Previewing the project using `' +
            Logger_1.Logger.brand(configPath) + '` with build located in `' +
            Logger_1.Logger.brand(buildPath) + '`...', Logger_1.LogLevel.Debug);
        var eventEmitter = new events_1.EventEmitter();
        var projectPreviewer = new ProjectPreviewer_1.ProjectPreviewer(configPath, buildPath, eventEmitter);
        projectPreviewer.startServer();
    };
    return Blitz;
}());
exports.Blitz = Blitz;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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IGNvbnRhaW5pbmcgdGhlIGNvcmUgb2YgQmxpdHpcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBmc2UgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0ICogYXMgeWFtbCBmcm9tICdqcy15YW1sJztcbmltcG9ydCB7UHJvamVjdEluaXRpYWxpc2VyfSBmcm9tICcuL2NvcmUvUHJvamVjdEluaXRpYWxpc2VyJztcbmltcG9ydCB7TG9nZ2VyLCBMb2dMZXZlbH0gZnJvbSAnLi9jbGkvTG9nZ2VyJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL2NvbXBvbmVudHMvQ29uZmlnJztcbmltcG9ydCB7UHJvamVjdFdhdGNoZXJ9IGZyb20gJy4vY29yZS9Qcm9qZWN0V2F0Y2hlcic7XG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7UHJvamVjdFByZXZpZXdlcn0gZnJvbSAnLi9jb3JlL1Byb2plY3RQcmV2aWV3ZXInO1xuXG4vKipcbiAqIEBjbGFzcyBNYWluIGNsYXNzIG9mIEJsaXR6LCBleHBvc2VzIHRoZSBBUEkgZm9yIGV4dGVybmFsIG1vZHVsZXMgdG8gdXNlXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIEJsaXR6IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXNlcyBhIEJsaXR6IHByb2plY3QgZnJvbSBhIHRlbXBsYXRlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpbml0KHRlbXBsYXRlTmFtZTogc3RyaW5nLCBwcm9qZWN0UGF0aDogc3RyaW5nKSB7XG4gICAgICAgIExvZ2dlci5sb2coJ0luaXRpYWxpc2luZyBhIG5ldyBwcm9qZWN0IGluIGAnICtcbiAgICAgICAgICAgIExvZ2dlci5icmFuZChwcm9qZWN0UGF0aCkgKyAnYCB1c2luZyB0aGUgdGVtcGxhdGUgYCcgK1xuICAgICAgICAgICAgTG9nZ2VyLmJyYW5kKHRlbXBsYXRlTmFtZSkgKyAnYC4uLicsIExvZ0xldmVsLkRlYnVnKTtcbiAgICAgICAgbGV0IHRlbXBsYXRlc1BhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAndGVtcGxhdGVzJyk7XG4gICAgICAgIGxldCBwcm9qZWN0SW5pdGlhbGlzZXIgPSBuZXcgUHJvamVjdEluaXRpYWxpc2VyKHByb2plY3RQYXRoLCB0ZW1wbGF0ZXNQYXRoKTtcbiAgICAgICAgcHJvamVjdEluaXRpYWxpc2VyLmluaXRpYWxpc2UodGVtcGxhdGVOYW1lLCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2dNYW55KExvZ2dlci5zcGxpdChlcnJvciksIExvZ0xldmVsLkVycm9yKTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBMb2dnZXIubG9nKCdQcm9qZWN0IGluaXRpYWxpc2VkIScpO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIHdlYnNpdGUgdXNpbmcgdGhlIHNwZWNpZmllZCBjb25maWcuIEFzc3VtZXMgdGhhdCBhbGwgcmVsZXZhbnQgZm9sZGVycyAoZS5nLiBgYXNzZXRzYCwgYGNvbnRlbnRgLFxuICAgICAqIGBwbHVnaW5zYCwgYHRlbXBsYXRlc2AsIGV0Yy4pIGV4aXN0IGluIHRoZSBzYW1lIGRpcmVjdG9yeSBhcyB0aGUgY29uZmlnLiBUaGUgZ2VuZXJhdGVkIGZpbGVzIGFyZSBwbGFjZWQgaW50byB0aGVcbiAgICAgKiBzcGVjaWZpZWQgYnVpbGQgZGlyZWN0b3J5LlxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGQoY29uZmlnUGF0aDogc3RyaW5nLCBidWlsZFBhdGg6IHN0cmluZykge1xuICAgICAgICBMb2dnZXIubG9nKCdCdWlsZGluZyBzaXRlLi4uJyk7XG4gICAgICAgIExvZ2dlci5sb2coJ0J1aWxkaW5nIHNpdGUgdXNpbmcgYCcgK1xuICAgICAgICAgICAgTG9nZ2VyLmJyYW5kKGNvbmZpZ1BhdGgpICsgJ2AgaW4gZGlyZWN0b3J5IGAnICtcbiAgICAgICAgICAgIExvZ2dlci5icmFuZChidWlsZFBhdGgpICsgJ2AuLi4nLCBMb2dMZXZlbC5EZWJ1Zyk7XG4gICAgICAgIGxldCBjb25maWdDb250ZW50cyA9IGZzZS5yZWFkRmlsZVN5bmMoY29uZmlnUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgbGV0IHJhd0NvbmZpZyA9IHlhbWwuc2FmZUxvYWQoY29uZmlnQ29udGVudHMpO1xuICAgICAgICBpZiAoIXJhd0NvbmZpZykge1xuICAgICAgICAgICAgcmF3Q29uZmlnID0ge307XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgY29uZmlnLmxvYWQocmF3Q29uZmlnKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIExvZ2dlci5sb2coJ0Vycm9yIHZhbGlkYXRpbmcgdGhlIGNvbmZpZzonLCBMb2dMZXZlbC5FcnJvcik7XG4gICAgICAgICAgICBMb2dnZXIubG9nTWFueShMb2dnZXIuc3BsaXQoZXhjZXB0aW9uLm1lc3NhZ2UpLCBMb2dMZXZlbC5FcnJvcik7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coY29uZmlnLmdldCgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXYXRjaGVzIHRoZSBjdXJyZW50IGRpcmVjdG9yeSBhbmQgcmVidWlsZHMgY2VydGFpbiBwYXJ0cyBvZiB0aGUgd2Vic2l0ZSB3aGVuIG5lY2Vzc2FyeVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgd2F0Y2goY29uZmlnUGF0aDogc3RyaW5nLCBidWlsZFBhdGg6IHN0cmluZykge1xuICAgICAgICBMb2dnZXIubG9nKCdTdGFydGluZyBwcm9qZWN0IHdhdGNoZXIuLi4nKTtcbiAgICAgICAgTG9nZ2VyLmxvZygnV2F0Y2hpbmcgdGhlIHByb2plY3QgdXNpbmcgYCcgK1xuICAgICAgICAgICAgTG9nZ2VyLmJyYW5kKGNvbmZpZ1BhdGgpICsgJ2Agd2l0aCBidWlsZCBsb2NhdGVkIGluIGAnICtcbiAgICAgICAgICAgIExvZ2dlci5icmFuZChidWlsZFBhdGgpICsgJ2AuLi4nLCBMb2dMZXZlbC5EZWJ1Zyk7XG4gICAgICAgIGxldCBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIGxldCBwcm9qZWN0V2F0Y2hlciA9IG5ldyBQcm9qZWN0V2F0Y2hlcihjb25maWdQYXRoLCBidWlsZFBhdGgsIGV2ZW50RW1pdHRlcik7XG4gICAgICAgIHByb2plY3RXYXRjaGVyLndhdGNoKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUnVucyBhIHdlYiBzZXJ2ZXIgd2l0aCB0aGUgcHJldmlldyBvZiB0aGUgd2Vic2l0ZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcHJldmlldyhjb25maWdQYXRoOiBzdHJpbmcsIGJ1aWxkUGF0aDogc3RyaW5nKSB7XG4gICAgICAgIExvZ2dlci5sb2coJ1N0YXJ0aW5nIHByZXZpZXcgc2VydmVyLi4uJyk7XG4gICAgICAgIExvZ2dlci5sb2coJ1ByZXZpZXdpbmcgdGhlIHByb2plY3QgdXNpbmcgYCcgK1xuICAgICAgICAgICAgTG9nZ2VyLmJyYW5kKGNvbmZpZ1BhdGgpICsgJ2Agd2l0aCBidWlsZCBsb2NhdGVkIGluIGAnICtcbiAgICAgICAgICAgIExvZ2dlci5icmFuZChidWlsZFBhdGgpICsgJ2AuLi4nLCBMb2dMZXZlbC5EZWJ1Zyk7XG4gICAgICAgIGxldCBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIGxldCBwcm9qZWN0UHJldmlld2VyID0gbmV3IFByb2plY3RQcmV2aWV3ZXIoY29uZmlnUGF0aCwgYnVpbGRQYXRoLCBldmVudEVtaXR0ZXIpO1xuICAgICAgICBwcm9qZWN0UHJldmlld2VyLnN0YXJ0U2VydmVyKCk7XG4gICAgfVxufVxuIl19
