"use strict";
var path = require('path');
var chokidar = require('chokidar');
var AssetManager_1 = require('./AssetManager');
exports.BUILD_CHANGE_EVENT = 'buildChange';
var ProjectWatcher = (function () {
    function ProjectWatcher(configPath, buildPath, eventEmitter) {
        this.configPath = configPath;
        this.projectPath = path.dirname(configPath);
        this.buildPath = buildPath;
        this.eventEmitter = eventEmitter;
    }
    ProjectWatcher.prototype.watch = function () {
        this.setupFileWatchers();
        var assetManager = new AssetManager_1.AssetManager(path.join(this.projectPath, 'assets'), path.join(this.buildPath, 'assets'), this.eventEmitter);
        assetManager.setupListeners();
    };
    ProjectWatcher.prototype.setupFileWatchers = function () {
        this.setupFileWatcher('assets', AssetManager_1.ASSET_CHANGE_EVENT, AssetManager_1.ASSET_CHANGE_EVENT, AssetManager_1.ASSET_REMOVE_EVENT);
    };
    ProjectWatcher.prototype.setupFileWatcher = function (directory, addEvent, changeEvent, removeEvent) {
        var _this = this;
        var fullPath = path.join(this.projectPath, directory);
        var watcher = chokidar.watch(fullPath);
        watcher.on('add', function (filePath) { return _this.eventEmitter.emit(addEvent, path.relative(fullPath, filePath)); });
        watcher.on('change', function (filePath) { return _this.eventEmitter.emit(changeEvent, path.relative(fullPath, filePath)); });
        watcher.on('unlink', function (filePath) { return _this.eventEmitter.emit(removeEvent, path.relative(fullPath, filePath)); });
    };
    return ProjectWatcher;
}());
exports.ProjectWatcher = ProjectWatcher;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm9qZWN0V2F0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsSUFBWSxJQUFJLFdBQU0sTUFBTSxDQUFDLENBQUE7QUFDN0IsSUFBWSxRQUFRLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFDckMsNkJBQW1FLGdCQUFnQixDQUFDLENBQUE7QUFPdkUsMEJBQWtCLEdBQUcsYUFBYSxDQUFDO0FBTWhEO0lBVUksd0JBQVksVUFBa0IsRUFBRSxTQUFpQixFQUFFLFlBQTBCO1FBQ3pFLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRU0sOEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksWUFBWSxHQUFHLElBQUksMkJBQVksQ0FDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQ25DLElBQUksQ0FBQyxZQUFZLENBQ3BCLENBQUM7UUFDRixZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVPLDBDQUFpQixHQUF6QjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsaUNBQWtCLEVBQUUsaUNBQWtCLEVBQUUsaUNBQWtCLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRU8seUNBQWdCLEdBQXhCLFVBQXlCLFNBQWlCLEVBQUUsUUFBZ0IsRUFBRSxXQUFtQixFQUFFLFdBQW1CO1FBQXRHLGlCQU1DO1FBTEcsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxRQUFRLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBbkUsQ0FBbUUsQ0FBQyxDQUFDO1FBQ3JHLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUMsUUFBUSxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQXRFLENBQXNFLENBQUMsQ0FBQztRQUMzRyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLFFBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUF0RSxDQUFzRSxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsSUFBQTtBQXRDWSxzQkFBYyxpQkFzQzFCLENBQUEiLCJmaWxlIjoic3JjL1Byb2plY3RXYXRjaGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBDb250YWlucyBjb2RlIHJlbGF0ZWQgdG8gd2F0Y2hpbmcgcHJvamVjdCBmb3IgY2hhbmdlcyBhbmQgcmVjb21waWxpbmdcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBjaG9raWRhciBmcm9tICdjaG9raWRhcic7XG5pbXBvcnQge0Fzc2V0TWFuYWdlciwgQVNTRVRfQ0hBTkdFX0VWRU5ULCBBU1NFVF9SRU1PVkVfRVZFTlR9IGZyb20gJy4vQXNzZXRNYW5hZ2VyJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuXG4vKipcbiAqIEV2ZW50IGNhbGxlZCB3aGVuIGEgZmlsZSBpbnNpZGUgdGhlIGJ1aWxkIGZvbGRlciBjaGFuZ2VzXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNvbnN0IEJVSUxEX0NIQU5HRV9FVkVOVCA9ICdidWlsZENoYW5nZSc7XG5cbi8qKlxuICogQGNsYXNzIFByZXBhcmVzIHRoZSBwcm9qZWN0IGZvciBidWlsZGluZyBhbmQgd2F0Y2hlcyBpdCBmb3IgY2hhbmdlc1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9qZWN0V2F0Y2hlciB7XG4gICAgcHJpdmF0ZSBjb25maWdQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBwcm9qZWN0UGF0aDogc3RyaW5nO1xuICAgIHByaXZhdGUgYnVpbGRQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBldmVudEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjtcblxuICAgIC8qKlxuICAgICAqIFByb2plY3RXYXRjaGVyIGNvbnN0cnVjdG9yXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnUGF0aDogc3RyaW5nLCBidWlsZFBhdGg6IHN0cmluZywgZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXIpIHtcbiAgICAgICAgdGhpcy5jb25maWdQYXRoID0gY29uZmlnUGF0aDtcbiAgICAgICAgdGhpcy5wcm9qZWN0UGF0aCA9IHBhdGguZGlybmFtZShjb25maWdQYXRoKTtcbiAgICAgICAgdGhpcy5idWlsZFBhdGggPSBidWlsZFBhdGg7XG4gICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyID0gZXZlbnRFbWl0dGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YXRjaCgpIHtcbiAgICAgICAgdGhpcy5zZXR1cEZpbGVXYXRjaGVycygpO1xuICAgICAgICBsZXQgYXNzZXRNYW5hZ2VyID0gbmV3IEFzc2V0TWFuYWdlcihcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnByb2plY3RQYXRoLCAnYXNzZXRzJyksXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5idWlsZFBhdGgsICdhc3NldHMnKSxcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyXG4gICAgICAgICk7XG4gICAgICAgIGFzc2V0TWFuYWdlci5zZXR1cExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBGaWxlV2F0Y2hlcnMoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBGaWxlV2F0Y2hlcignYXNzZXRzJywgQVNTRVRfQ0hBTkdFX0VWRU5ULCBBU1NFVF9DSEFOR0VfRVZFTlQsIEFTU0VUX1JFTU9WRV9FVkVOVCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cEZpbGVXYXRjaGVyKGRpcmVjdG9yeTogc3RyaW5nLCBhZGRFdmVudDogc3RyaW5nLCBjaGFuZ2VFdmVudDogc3RyaW5nLCByZW1vdmVFdmVudDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBmdWxsUGF0aCA9IHBhdGguam9pbih0aGlzLnByb2plY3RQYXRoLCBkaXJlY3RvcnkpO1xuICAgICAgICBsZXQgd2F0Y2hlciA9IGNob2tpZGFyLndhdGNoKGZ1bGxQYXRoKTtcbiAgICAgICAgd2F0Y2hlci5vbignYWRkJywgKGZpbGVQYXRoKSA9PiB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KGFkZEV2ZW50LCBwYXRoLnJlbGF0aXZlKGZ1bGxQYXRoLCBmaWxlUGF0aCkpKTtcbiAgICAgICAgd2F0Y2hlci5vbignY2hhbmdlJywgKGZpbGVQYXRoKSA9PiB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KGNoYW5nZUV2ZW50LCBwYXRoLnJlbGF0aXZlKGZ1bGxQYXRoLCBmaWxlUGF0aCkpKTtcbiAgICAgICAgd2F0Y2hlci5vbigndW5saW5rJywgKGZpbGVQYXRoKSA9PiB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KHJlbW92ZUV2ZW50LCBwYXRoLnJlbGF0aXZlKGZ1bGxQYXRoLCBmaWxlUGF0aCkpKTtcbiAgICB9XG59XG4iXX0=
