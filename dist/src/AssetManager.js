"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fse = require('fs-extra');
var path = require('path');
var ProjectWatcher_1 = require('./ProjectWatcher');
var ListenerContainer_1 = require('./ListenerContainer');
exports.ASSET_CHANGE_EVENT = 'assetChange';
exports.ASSET_REMOVE_EVENT = 'assetRemove';
var AssetManager = (function (_super) {
    __extends(AssetManager, _super);
    function AssetManager(sourcePath, targetPath, eventEmitter) {
        if (eventEmitter) {
            var eventListenerPairs = [];
            _super.call(this, eventEmitter, eventListenerPairs);
            eventListenerPairs.push({
                event: exports.ASSET_CHANGE_EVENT,
                listener: this.copyAsset.bind(this),
            });
            eventListenerPairs.push({
                event: exports.ASSET_REMOVE_EVENT,
                listener: this.removeAsset.bind(this),
            });
        }
        else {
            _super.call(this);
        }
        this.sourcePath = sourcePath;
        this.targetPath = targetPath;
    }
    AssetManager.prototype.copyAssets = function () {
        fse.copySync(this.sourcePath, this.targetPath);
    };
    AssetManager.prototype.copyAsset = function (assetPath) {
        var assetSourcePath = path.join(this.sourcePath, assetPath);
        var assetTargetPath = path.join(this.targetPath, assetPath);
        fse.ensureDirSync(path.dirname(assetTargetPath));
        fse.copySync(assetSourcePath, assetTargetPath);
        if (this.eventEmitter) {
            this.eventEmitter.emit(ProjectWatcher_1.BUILD_CHANGE_EVENT, path.join('assets', assetPath));
        }
    };
    AssetManager.prototype.removeAsset = function (assetPath) {
        fse.removeSync(path.join(this.targetPath, assetPath));
        if (this.eventEmitter) {
            this.eventEmitter.emit(ProjectWatcher_1.BUILD_CHANGE_EVENT, path.join('assets', assetPath));
        }
    };
    return AssetManager;
}(ListenerContainer_1.ListenerContainer));
exports.AssetManager = AssetManager;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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KipcbiAqIEBmaWxlIENvbnRhaW5zIGNvZGUgcmVsYXRlZCB0byB3ZWJzaXRlIGFzc2V0c1xuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuaW1wb3J0ICogYXMgZnNlIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7QlVJTERfQ0hBTkdFX0VWRU5UfSBmcm9tICcuL1Byb2plY3RXYXRjaGVyJztcbmltcG9ydCB7TGlzdGVuZXJDb250YWluZXJ9IGZyb20gJy4vTGlzdGVuZXJDb250YWluZXInO1xuXG4vKipcbiAqIEV2ZW50IHRyaWdnZXJlZCB3aGVuIGFuIGFzc2V0IGlzIGNoYW5nZWQgb3IgY3JlYXRlZFxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjb25zdCBBU1NFVF9DSEFOR0VfRVZFTlQgPSAnYXNzZXRDaGFuZ2UnO1xuXG4vKipcbiAqIEV2ZW50IHRyaWdnZXJlZCB3aGVuIGFuIGFzc2V0IGlzIGRlbGV0ZWRcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgQVNTRVRfUkVNT1ZFX0VWRU5UID0gJ2Fzc2V0UmVtb3ZlJztcblxuLyoqXG4gKiBAY2xhc3MgUmVzcG9uc2libGUgZm9yIGNvcHlpbmcgYW5kXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIEFzc2V0TWFuYWdlciBleHRlbmRzIExpc3RlbmVyQ29udGFpbmVyIHtcbiAgICAvKipcbiAgICAgKiBGb2xkZXIgaW4gd2hpY2ggcHJvamVjdCBhc3NldHMgYXJlIGxvY2F0ZWRcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHNvdXJjZVBhdGg6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEFzc2V0cyBmb2xkZXIgaW5zaWRlIHRoZSBgYnVpbGRgIGRpcmVjdG9yeVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdGFyZ2V0UGF0aDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQXNzZXRNYW5hZ2VyIGNvbnN0cnVjdG9yXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHNvdXJjZVBhdGg6IHN0cmluZywgdGFyZ2V0UGF0aDogc3RyaW5nLCBldmVudEVtaXR0ZXI/OiBFdmVudEVtaXR0ZXIpIHtcbiAgICAgICAgaWYgKGV2ZW50RW1pdHRlcikge1xuICAgICAgICAgICAgbGV0IGV2ZW50TGlzdGVuZXJQYWlycyA9IFtdO1xuICAgICAgICAgICAgc3VwZXIoZXZlbnRFbWl0dGVyLCBldmVudExpc3RlbmVyUGFpcnMpO1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lclBhaXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIGV2ZW50OiBBU1NFVF9DSEFOR0VfRVZFTlQsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXI6IHRoaXMuY29weUFzc2V0LmJpbmQodGhpcyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJQYWlycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBldmVudDogQVNTRVRfUkVNT1ZFX0VWRU5ULFxuICAgICAgICAgICAgICAgIGxpc3RlbmVyOiB0aGlzLnJlbW92ZUFzc2V0LmJpbmQodGhpcyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb3VyY2VQYXRoID0gc291cmNlUGF0aDtcbiAgICAgICAgdGhpcy50YXJnZXRQYXRoID0gdGFyZ2V0UGF0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgYWxsIGFzc2V0cyBpbnRvIHRoZSBidWlsZCBmb2xkZXJcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgY29weUFzc2V0cygpIHtcbiAgICAgICAgZnNlLmNvcHlTeW5jKHRoaXMuc291cmNlUGF0aCwgdGhpcy50YXJnZXRQYXRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgYSBzaW5nbGUgYXNzZXQsIG92ZXJ3cml0aW5nIHRoZSBmaWxlIGluIHRhcmdldCBkaXJlY3RvcnkgaWYgbmVlZGVkXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGNvcHlBc3NldChhc3NldFBhdGg6IHN0cmluZykge1xuICAgICAgICBsZXQgYXNzZXRTb3VyY2VQYXRoID0gcGF0aC5qb2luKHRoaXMuc291cmNlUGF0aCwgYXNzZXRQYXRoKTtcbiAgICAgICAgbGV0IGFzc2V0VGFyZ2V0UGF0aCA9IHBhdGguam9pbih0aGlzLnRhcmdldFBhdGgsIGFzc2V0UGF0aCk7XG4gICAgICAgIGZzZS5lbnN1cmVEaXJTeW5jKHBhdGguZGlybmFtZShhc3NldFRhcmdldFBhdGgpKTtcbiAgICAgICAgZnNlLmNvcHlTeW5jKGFzc2V0U291cmNlUGF0aCwgYXNzZXRUYXJnZXRQYXRoKTtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KEJVSUxEX0NIQU5HRV9FVkVOVCwgcGF0aC5qb2luKCdhc3NldHMnLCBhc3NldFBhdGgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVBc3NldChhc3NldFBhdGg6IHN0cmluZykge1xuICAgICAgICBmc2UucmVtb3ZlU3luYyhwYXRoLmpvaW4odGhpcy50YXJnZXRQYXRoLCBhc3NldFBhdGgpKTtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KEJVSUxEX0NIQU5HRV9FVkVOVCwgcGF0aC5qb2luKCdhc3NldHMnLCBhc3NldFBhdGgpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
