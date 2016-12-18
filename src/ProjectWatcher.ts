/**
 * @file Contains code related to watching project for changes and recompiling
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as path from 'path';
import * as chokidar from 'chokidar';
import {AssetManager, ASSET_CHANGE_EVENT, ASSET_REMOVE_EVENT} from './AssetManager';
import {EventEmitter} from 'events';

/**
 * Event called when a file inside the build folder changes
 * @since 0.2.0
 */
export const BUILD_CHANGE_EVENT = 'buildChange';

/**
 * @class Prepares the project for building and watches it for changes
 * @since 0.2.0
 */
export class ProjectWatcher {
    private configPath: string;
    private projectPath: string;
    private buildPath: string;
    private eventEmitter: EventEmitter;

    /**
     * ProjectWatcher constructor
     * @since 0.2.0
     */
    constructor(configPath: string, buildPath: string, eventEmitter: EventEmitter) {
        this.configPath = configPath;
        this.projectPath = path.dirname(configPath);
        this.buildPath = buildPath;
        this.eventEmitter = eventEmitter;
    }

    public watch() {
        this.setupFileWatchers();
        let assetManager = new AssetManager(
            path.join(this.projectPath, 'assets'),
            path.join(this.buildPath, 'assets'),
            this.eventEmitter
        );
        assetManager.setupListeners();
    }

    private setupFileWatchers() {
        this.setupFileWatcher('assets', ASSET_CHANGE_EVENT, ASSET_CHANGE_EVENT, ASSET_REMOVE_EVENT);
    }

    private setupFileWatcher(directory: string, addEvent: string, changeEvent: string, removeEvent: string) {
        let fullPath = path.join(this.projectPath, directory);
        let watcher = chokidar.watch(fullPath);
        watcher.on('add', (filePath) => this.eventEmitter.emit(addEvent, path.relative(fullPath, filePath)));
        watcher.on('change', (filePath) => this.eventEmitter.emit(changeEvent, path.relative(fullPath, filePath)));
        watcher.on('unlink', (filePath) => this.eventEmitter.emit(removeEvent, path.relative(fullPath, filePath)));
    }
}
