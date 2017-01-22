/**
 * @file Contains code related to website assets
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as fse from 'fs-extra';
import * as path from 'path';
import {BUILD_CHANGE_EVENT} from '../core/ProjectWatcher';
import {ListenerContainer} from '../ListenerContainer';
import {Logger} from '../cli/Logger';
import {ProjectSettings} from './ProjectSettings';

/**
 * Event triggered when an asset is changed or created
 * @since 0.2.0
 */
export const ASSET_CHANGE_EVENT = 'assetChange';

/**
 * Event triggered when an asset is deleted
 * @since 0.2.0
 */
export const ASSET_REMOVE_EVENT = 'assetRemove';

/**
 * @class Responsible for copying and
 * @since 0.2.0
 */
export class AssetManager extends ListenerContainer {

    private settings: ProjectSettings;

    public constructor(settings: ProjectSettings) {
        let eventListenerPairs = [];
        super(settings.eventEmitter, eventListenerPairs);
        this.settings = settings;
        eventListenerPairs.push({
            event: ASSET_CHANGE_EVENT,
            listener: (assetPath) => {
                Logger.log('Updating `' + Logger.brand(path.join('assets', assetPath)) + '`...');
                this.copyAsset(assetPath);
            },
        });
        eventListenerPairs.push({
            event: ASSET_REMOVE_EVENT,
            listener: (assetPath) => {
                Logger.log('Removing `' + Logger.brand(path.join('assets', assetPath)) + '`...');
                this.removeAsset(assetPath);
            },
        });
    }

    /**
     * Copies all assets into the build folder
     * @since 0.2.0
     */
    public copyAssets() {
        if (fse.exists(this.settings.assetPath)) {
            fse.copySync(this.settings.assetPath, this.settings.buildAssetPath);
        }
    }

    /**
     * Copies a single asset, overwriting the file in target directory if needed
     * @since 0.2.0
     */
    public copyAsset(assetPath: string) {
        let assetSourcePath = path.join(this.settings.assetPath, assetPath);
        let assetTargetPath = path.join(this.settings.buildAssetPath, assetPath);
        fse.ensureDirSync(path.dirname(assetTargetPath));
        fse.copySync(assetSourcePath, assetTargetPath);
        if (this.eventEmitter) {
            this.eventEmitter.emit(BUILD_CHANGE_EVENT, path.join('assets', assetPath));
        }
    }

    /**
     * @since 0.2.0
     */
    public removeAsset(assetPath: string) {
        fse.removeSync(path.join(this.settings.buildAssetPath, assetPath));
        if (this.eventEmitter) {
            this.eventEmitter.emit(BUILD_CHANGE_EVENT, path.join('assets', assetPath));
        }
    }
}
