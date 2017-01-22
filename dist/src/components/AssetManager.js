"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fse = require('fs-extra');
var path = require('path');
var ProjectWatcher_1 = require('../core/ProjectWatcher');
var ListenerContainer_1 = require('../ListenerContainer');
var Logger_1 = require('../cli/Logger');
exports.ASSET_CHANGE_EVENT = 'assetChange';
exports.ASSET_REMOVE_EVENT = 'assetRemove';
var AssetManager = (function (_super) {
    __extends(AssetManager, _super);
    function AssetManager(settings) {
        var _this = this;
        var eventListenerPairs = [];
        _super.call(this, settings.eventEmitter, eventListenerPairs);
        this.settings = settings;
        eventListenerPairs.push({
            event: exports.ASSET_CHANGE_EVENT,
            listener: function (assetPath) {
                Logger_1.Logger.log('Updating `' + Logger_1.Logger.brand(path.join('assets', assetPath)) + '`...');
                _this.copyAsset(assetPath);
            },
        });
        eventListenerPairs.push({
            event: exports.ASSET_REMOVE_EVENT,
            listener: function (assetPath) {
                Logger_1.Logger.log('Removing `' + Logger_1.Logger.brand(path.join('assets', assetPath)) + '`...');
                _this.removeAsset(assetPath);
            },
        });
    }
    AssetManager.prototype.copyAssets = function () {
        if (fse.exists(this.settings.assetPath)) {
            fse.copySync(this.settings.assetPath, this.settings.buildAssetPath);
        }
    };
    AssetManager.prototype.copyAsset = function (assetPath) {
        var assetSourcePath = path.join(this.settings.assetPath, assetPath);
        var assetTargetPath = path.join(this.settings.buildAssetPath, assetPath);
        fse.ensureDirSync(path.dirname(assetTargetPath));
        fse.copySync(assetSourcePath, assetTargetPath);
        if (this.eventEmitter) {
            this.eventEmitter.emit(ProjectWatcher_1.BUILD_CHANGE_EVENT, path.join('assets', assetPath));
        }
    };
    AssetManager.prototype.removeAsset = function (assetPath) {
        fse.removeSync(path.join(this.settings.buildAssetPath, assetPath));
        if (this.eventEmitter) {
            this.eventEmitter.emit(ProjectWatcher_1.BUILD_CHANGE_EVENT, path.join('assets', assetPath));
        }
    };
    return AssetManager;
}(ListenerContainer_1.ListenerContainer));
exports.AssetManager = AssetManager;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL0Fzc2V0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFRQSxJQUFZLEdBQUcsV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUNoQyxJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUM3QiwrQkFBaUMsd0JBQXdCLENBQUMsQ0FBQTtBQUMxRCxrQ0FBZ0Msc0JBQXNCLENBQUMsQ0FBQTtBQUN2RCx1QkFBcUIsZUFBZSxDQUFDLENBQUE7QUFPeEIsMEJBQWtCLEdBQUcsYUFBYSxDQUFDO0FBTW5DLDBCQUFrQixHQUFHLGFBQWEsQ0FBQztBQU1oRDtJQUFrQyxnQ0FBaUI7SUFJL0Msc0JBQW1CLFFBQXlCO1FBSmhELGlCQXlEQztRQXBETyxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUM1QixrQkFBTSxRQUFRLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1lBQ3BCLEtBQUssRUFBRSwwQkFBa0I7WUFDekIsUUFBUSxFQUFFLFVBQUMsU0FBUztnQkFDaEIsZUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRixLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7UUFDSCxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7WUFDcEIsS0FBSyxFQUFFLDBCQUFrQjtZQUN6QixRQUFRLEVBQUUsVUFBQyxTQUFTO2dCQUNoQixlQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ2pGLEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFNTSxpQ0FBVSxHQUFqQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDTCxDQUFDO0lBTU0sZ0NBQVMsR0FBaEIsVUFBaUIsU0FBaUI7UUFDOUIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwRSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3pFLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG1DQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsQ0FBQztJQUNMLENBQUM7SUFLTSxrQ0FBVyxHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNuRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxtQ0FBa0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUM7SUFDTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXpEQSxBQXlEQyxDQXpEaUMscUNBQWlCLEdBeURsRDtBQXpEWSxvQkFBWSxlQXlEeEIsQ0FBQSIsImZpbGUiOiJzcmMvY29tcG9uZW50cy9Bc3NldE1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIENvbnRhaW5zIGNvZGUgcmVsYXRlZCB0byB3ZWJzaXRlIGFzc2V0c1xuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuaW1wb3J0ICogYXMgZnNlIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge0JVSUxEX0NIQU5HRV9FVkVOVH0gZnJvbSAnLi4vY29yZS9Qcm9qZWN0V2F0Y2hlcic7XG5pbXBvcnQge0xpc3RlbmVyQ29udGFpbmVyfSBmcm9tICcuLi9MaXN0ZW5lckNvbnRhaW5lcic7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi4vY2xpL0xvZ2dlcic7XG5pbXBvcnQge1Byb2plY3RTZXR0aW5nc30gZnJvbSAnLi9Qcm9qZWN0U2V0dGluZ3MnO1xuXG4vKipcbiAqIEV2ZW50IHRyaWdnZXJlZCB3aGVuIGFuIGFzc2V0IGlzIGNoYW5nZWQgb3IgY3JlYXRlZFxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBBU1NFVF9DSEFOR0VfRVZFTlQgPSAnYXNzZXRDaGFuZ2UnO1xuXG4vKipcbiAqIEV2ZW50IHRyaWdnZXJlZCB3aGVuIGFuIGFzc2V0IGlzIGRlbGV0ZWRcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgQVNTRVRfUkVNT1ZFX0VWRU5UID0gJ2Fzc2V0UmVtb3ZlJztcblxuLyoqXG4gKiBAY2xhc3MgUmVzcG9uc2libGUgZm9yIGNvcHlpbmcgYW5kXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIEFzc2V0TWFuYWdlciBleHRlbmRzIExpc3RlbmVyQ29udGFpbmVyIHtcblxuICAgIHByaXZhdGUgc2V0dGluZ3M6IFByb2plY3RTZXR0aW5ncztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihzZXR0aW5nczogUHJvamVjdFNldHRpbmdzKSB7XG4gICAgICAgIGxldCBldmVudExpc3RlbmVyUGFpcnMgPSBbXTtcbiAgICAgICAgc3VwZXIoc2V0dGluZ3MuZXZlbnRFbWl0dGVyLCBldmVudExpc3RlbmVyUGFpcnMpO1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIGV2ZW50TGlzdGVuZXJQYWlycy5wdXNoKHtcbiAgICAgICAgICAgIGV2ZW50OiBBU1NFVF9DSEFOR0VfRVZFTlQsXG4gICAgICAgICAgICBsaXN0ZW5lcjogKGFzc2V0UGF0aCkgPT4ge1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coJ1VwZGF0aW5nIGAnICsgTG9nZ2VyLmJyYW5kKHBhdGguam9pbignYXNzZXRzJywgYXNzZXRQYXRoKSkgKyAnYC4uLicpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29weUFzc2V0KGFzc2V0UGF0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnRMaXN0ZW5lclBhaXJzLnB1c2goe1xuICAgICAgICAgICAgZXZlbnQ6IEFTU0VUX1JFTU9WRV9FVkVOVCxcbiAgICAgICAgICAgIGxpc3RlbmVyOiAoYXNzZXRQYXRoKSA9PiB7XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZygnUmVtb3ZpbmcgYCcgKyBMb2dnZXIuYnJhbmQocGF0aC5qb2luKCdhc3NldHMnLCBhc3NldFBhdGgpKSArICdgLi4uJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBc3NldChhc3NldFBhdGgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29waWVzIGFsbCBhc3NldHMgaW50byB0aGUgYnVpbGQgZm9sZGVyXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGNvcHlBc3NldHMoKSB7XG4gICAgICAgIGlmIChmc2UuZXhpc3RzKHRoaXMuc2V0dGluZ3MuYXNzZXRQYXRoKSkge1xuICAgICAgICAgICAgZnNlLmNvcHlTeW5jKHRoaXMuc2V0dGluZ3MuYXNzZXRQYXRoLCB0aGlzLnNldHRpbmdzLmJ1aWxkQXNzZXRQYXRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcGllcyBhIHNpbmdsZSBhc3NldCwgb3ZlcndyaXRpbmcgdGhlIGZpbGUgaW4gdGFyZ2V0IGRpcmVjdG9yeSBpZiBuZWVkZWRcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgY29weUFzc2V0KGFzc2V0UGF0aDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBhc3NldFNvdXJjZVBhdGggPSBwYXRoLmpvaW4odGhpcy5zZXR0aW5ncy5hc3NldFBhdGgsIGFzc2V0UGF0aCk7XG4gICAgICAgIGxldCBhc3NldFRhcmdldFBhdGggPSBwYXRoLmpvaW4odGhpcy5zZXR0aW5ncy5idWlsZEFzc2V0UGF0aCwgYXNzZXRQYXRoKTtcbiAgICAgICAgZnNlLmVuc3VyZURpclN5bmMocGF0aC5kaXJuYW1lKGFzc2V0VGFyZ2V0UGF0aCkpO1xuICAgICAgICBmc2UuY29weVN5bmMoYXNzZXRTb3VyY2VQYXRoLCBhc3NldFRhcmdldFBhdGgpO1xuICAgICAgICBpZiAodGhpcy5ldmVudEVtaXR0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoQlVJTERfQ0hBTkdFX0VWRU5ULCBwYXRoLmpvaW4oJ2Fzc2V0cycsIGFzc2V0UGF0aCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUFzc2V0KGFzc2V0UGF0aDogc3RyaW5nKSB7XG4gICAgICAgIGZzZS5yZW1vdmVTeW5jKHBhdGguam9pbih0aGlzLnNldHRpbmdzLmJ1aWxkQXNzZXRQYXRoLCBhc3NldFBhdGgpKTtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KEJVSUxEX0NIQU5HRV9FVkVOVCwgcGF0aC5qb2luKCdhc3NldHMnLCBhc3NldFBhdGgpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
