"use strict";
var path = require('path');
var ProjectInitialiser_1 = require('./core/ProjectInitialiser');
var Logger_1 = require('./cli/Logger');
var ProjectWatcher_1 = require('./core/ProjectWatcher');
var events_1 = require('events');
var ProjectPreviewer_1 = require('./core/ProjectPreviewer');
var ProjectSettings_1 = require('./components/ProjectSettings');
var ProjectBuilder_1 = require('./core/ProjectBuilder');
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
        var settings = new ProjectSettings_1.ProjectSettings(configPath);
        try {
            settings.config.validate();
            var builder = new ProjectBuilder_1.ProjectBuilder(settings);
            builder.build();
        }
        catch (exception) {
            Logger_1.Logger.log('Error building the project:', Logger_1.LogLevel.Error);
            Logger_1.Logger.logMany(Logger_1.Logger.split(exception.message), Logger_1.LogLevel.Error);
            console.log(exception);
            process.exit(1);
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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RSxTQUFpQjtRQUNyRCxlQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDMUMsZUFBTSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEI7WUFDckMsZUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRywyQkFBMkI7WUFDdEQsZUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLEVBQUUsaUJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLFlBQVksR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJLGNBQWMsR0FBRyxJQUFJLCtCQUFjLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3RSxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQU1hLGFBQU8sR0FBckIsVUFBc0IsVUFBa0IsRUFBRSxTQUFpQjtRQUN2RCxlQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDekMsZUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0M7WUFDdkMsZUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRywyQkFBMkI7WUFDdEQsZUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLEVBQUUsaUJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLFlBQVksR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQ0wsWUFBQztBQUFELENBeEVBLEFBd0VDLElBQUE7QUF4RVksYUFBSyxRQXdFakIsQ0FBQSIsImZpbGUiOiJzcmMvQmxpdHouanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIEZpbGUgY29udGFpbmluZyB0aGUgY29yZSBvZiBCbGl0elxuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzZSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgKiBhcyB5YW1sIGZyb20gJ2pzLXlhbWwnO1xuaW1wb3J0IHtQcm9qZWN0SW5pdGlhbGlzZXJ9IGZyb20gJy4vY29yZS9Qcm9qZWN0SW5pdGlhbGlzZXInO1xuaW1wb3J0IHtMb2dnZXIsIExvZ0xldmVsfSBmcm9tICcuL2NsaS9Mb2dnZXInO1xuaW1wb3J0IHtDb25maWd9IGZyb20gJy4vY29tcG9uZW50cy9Db25maWcnO1xuaW1wb3J0IHtQcm9qZWN0V2F0Y2hlcn0gZnJvbSAnLi9jb3JlL1Byb2plY3RXYXRjaGVyJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHtQcm9qZWN0UHJldmlld2VyfSBmcm9tICcuL2NvcmUvUHJvamVjdFByZXZpZXdlcic7XG5pbXBvcnQge1Byb2plY3RTZXR0aW5nc30gZnJvbSAnLi9jb21wb25lbnRzL1Byb2plY3RTZXR0aW5ncyc7XG5pbXBvcnQge1Byb2plY3RCdWlsZGVyfSBmcm9tICcuL2NvcmUvUHJvamVjdEJ1aWxkZXInO1xuXG4vKipcbiAqIEBjbGFzcyBNYWluIGNsYXNzIG9mIEJsaXR6LCBleHBvc2VzIHRoZSBBUEkgZm9yIGV4dGVybmFsIG1vZHVsZXMgdG8gdXNlXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIEJsaXR6IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXNlcyBhIEJsaXR6IHByb2plY3QgZnJvbSBhIHRlbXBsYXRlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpbml0KHRlbXBsYXRlTmFtZTogc3RyaW5nLCBwcm9qZWN0UGF0aDogc3RyaW5nKSB7XG4gICAgICAgIExvZ2dlci5sb2coJ0luaXRpYWxpc2luZyBhIG5ldyBwcm9qZWN0IGluIGAnICtcbiAgICAgICAgICAgIExvZ2dlci5icmFuZChwcm9qZWN0UGF0aCkgKyAnYCB1c2luZyB0aGUgdGVtcGxhdGUgYCcgK1xuICAgICAgICAgICAgTG9nZ2VyLmJyYW5kKHRlbXBsYXRlTmFtZSkgKyAnYC4uLicsIExvZ0xldmVsLkRlYnVnKTtcbiAgICAgICAgbGV0IHRlbXBsYXRlc1BhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAndGVtcGxhdGVzJyk7XG4gICAgICAgIGxldCBwcm9qZWN0SW5pdGlhbGlzZXIgPSBuZXcgUHJvamVjdEluaXRpYWxpc2VyKHByb2plY3RQYXRoLCB0ZW1wbGF0ZXNQYXRoKTtcbiAgICAgICAgcHJvamVjdEluaXRpYWxpc2VyLmluaXRpYWxpc2UodGVtcGxhdGVOYW1lLCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2dNYW55KExvZ2dlci5zcGxpdChlcnJvciksIExvZ0xldmVsLkVycm9yKTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBMb2dnZXIubG9nKCdQcm9qZWN0IGluaXRpYWxpc2VkIScpO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIHdlYnNpdGUgdXNpbmcgdGhlIHNwZWNpZmllZCBjb25maWcuIEFzc3VtZXMgdGhhdCBhbGwgcmVsZXZhbnQgZm9sZGVycyAoZS5nLiBgYXNzZXRzYCwgYGNvbnRlbnRgLFxuICAgICAqIGBwbHVnaW5zYCwgYHRlbXBsYXRlc2AsIGV0Yy4pIGV4aXN0IGluIHRoZSBzYW1lIGRpcmVjdG9yeSBhcyB0aGUgY29uZmlnLiBUaGUgZ2VuZXJhdGVkIGZpbGVzIGFyZSBwbGFjZWQgaW50byB0aGVcbiAgICAgKiBzcGVjaWZpZWQgYnVpbGQgZGlyZWN0b3J5LlxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYnVpbGQoY29uZmlnUGF0aDogc3RyaW5nLCBidWlsZFBhdGg6IHN0cmluZykge1xuICAgICAgICBMb2dnZXIubG9nKCdCdWlsZGluZyBzaXRlLi4uJyk7XG4gICAgICAgIExvZ2dlci5sb2coJ0J1aWxkaW5nIHNpdGUgdXNpbmcgYCcgK1xuICAgICAgICAgICAgTG9nZ2VyLmJyYW5kKGNvbmZpZ1BhdGgpICsgJ2AgaW4gZGlyZWN0b3J5IGAnICtcbiAgICAgICAgICAgIExvZ2dlci5icmFuZChidWlsZFBhdGgpICsgJ2AuLi4nLCBMb2dMZXZlbC5EZWJ1Zyk7XG4gICAgICAgIGxldCBzZXR0aW5ncyA9IG5ldyBQcm9qZWN0U2V0dGluZ3MoY29uZmlnUGF0aCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5jb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIGxldCBidWlsZGVyID0gbmV3IFByb2plY3RCdWlsZGVyKHNldHRpbmdzKTtcbiAgICAgICAgICAgIGJ1aWxkZXIuYnVpbGQoKTtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBMb2dnZXIubG9nKCdFcnJvciBidWlsZGluZyB0aGUgcHJvamVjdDonLCBMb2dMZXZlbC5FcnJvcik7XG4gICAgICAgICAgICBMb2dnZXIubG9nTWFueShMb2dnZXIuc3BsaXQoZXhjZXB0aW9uLm1lc3NhZ2UpLCBMb2dMZXZlbC5FcnJvcik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhleGNlcHRpb24pO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2F0Y2hlcyB0aGUgY3VycmVudCBkaXJlY3RvcnkgYW5kIHJlYnVpbGRzIGNlcnRhaW4gcGFydHMgb2YgdGhlIHdlYnNpdGUgd2hlbiBuZWNlc3NhcnlcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHdhdGNoKGNvbmZpZ1BhdGg6IHN0cmluZywgYnVpbGRQYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgTG9nZ2VyLmxvZygnU3RhcnRpbmcgcHJvamVjdCB3YXRjaGVyLi4uJyk7XG4gICAgICAgIExvZ2dlci5sb2coJ1dhdGNoaW5nIHRoZSBwcm9qZWN0IHVzaW5nIGAnICtcbiAgICAgICAgICAgIExvZ2dlci5icmFuZChjb25maWdQYXRoKSArICdgIHdpdGggYnVpbGQgbG9jYXRlZCBpbiBgJyArXG4gICAgICAgICAgICBMb2dnZXIuYnJhbmQoYnVpbGRQYXRoKSArICdgLi4uJywgTG9nTGV2ZWwuRGVidWcpO1xuICAgICAgICBsZXQgZXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICBsZXQgcHJvamVjdFdhdGNoZXIgPSBuZXcgUHJvamVjdFdhdGNoZXIoY29uZmlnUGF0aCwgYnVpbGRQYXRoLCBldmVudEVtaXR0ZXIpO1xuICAgICAgICBwcm9qZWN0V2F0Y2hlci53YXRjaCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1bnMgYSB3ZWIgc2VydmVyIHdpdGggdGhlIHByZXZpZXcgb2YgdGhlIHdlYnNpdGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHByZXZpZXcoY29uZmlnUGF0aDogc3RyaW5nLCBidWlsZFBhdGg6IHN0cmluZykge1xuICAgICAgICBMb2dnZXIubG9nKCdTdGFydGluZyBwcmV2aWV3IHNlcnZlci4uLicpO1xuICAgICAgICBMb2dnZXIubG9nKCdQcmV2aWV3aW5nIHRoZSBwcm9qZWN0IHVzaW5nIGAnICtcbiAgICAgICAgICAgIExvZ2dlci5icmFuZChjb25maWdQYXRoKSArICdgIHdpdGggYnVpbGQgbG9jYXRlZCBpbiBgJyArXG4gICAgICAgICAgICBMb2dnZXIuYnJhbmQoYnVpbGRQYXRoKSArICdgLi4uJywgTG9nTGV2ZWwuRGVidWcpO1xuICAgICAgICBsZXQgZXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICBsZXQgcHJvamVjdFByZXZpZXdlciA9IG5ldyBQcm9qZWN0UHJldmlld2VyKGNvbmZpZ1BhdGgsIGJ1aWxkUGF0aCwgZXZlbnRFbWl0dGVyKTtcbiAgICAgICAgcHJvamVjdFByZXZpZXdlci5zdGFydFNlcnZlcigpO1xuICAgIH1cbn1cbiJdfQ==
