/**
 * @file Contains code related to website assets
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as fse from 'fs-extra';
import * as path from 'path';
import {EventEmitter} from 'events';
import {BUILD_CHANGE_EVENT} from './ProjectWatcher';
import {ListenerContainer} from './ListenerContainer';

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
    /**
     * Folder in which project assets are located
     * @since 0.2.0
     */
    private sourcePath: string;

    /**
     * Assets folder inside the `build` directory
     * @since 0.2.0
     */
    private targetPath: string;

    /**
     * AssetManager constructor
     * @since 0.2.0
     */
    public constructor(sourcePath: string, targetPath: string, eventEmitter?: EventEmitter) {
        if (eventEmitter) {
            let eventListenerPairs = [];
            super(eventEmitter, eventListenerPairs);
            eventListenerPairs.push({
                event: ASSET_CHANGE_EVENT,
                listener: this.copyAsset.bind(this),
            });
            eventListenerPairs.push({
                event: ASSET_REMOVE_EVENT,
                listener: this.removeAsset.bind(this),
            });
        } else {
            super();
        }
        this.sourcePath = sourcePath;
        this.targetPath = targetPath;
    }

    /**
     * Copies all assets into the build folder
     * @since 0.2.0
     */
    public copyAssets() {
        fse.copySync(this.sourcePath, this.targetPath);
    }

    /**
     * Copies a single asset, overwriting the file in target directory if needed
     * @since 0.2.0
     */
    public copyAsset(assetPath: string) {
        let assetSourcePath = path.join(this.sourcePath, assetPath);
        let assetTargetPath = path.join(this.targetPath, assetPath);
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
        fse.removeSync(path.join(this.targetPath, assetPath));
        if (this.eventEmitter) {
            this.eventEmitter.emit(BUILD_CHANGE_EVENT, path.join('assets', assetPath));
        }
    }
}
