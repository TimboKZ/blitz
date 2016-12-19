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
 *
 * @since 0.2.0
 */
export interface IFSEventPair {
    fsEvent: string;
    blitzEvent: string;
}

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
    /**
     * Location of the config that will be used for generation of the website
     * @since 0.2.0
     */
    private configPath: string;

    /**
     * Root project folder, which contains `assets`, `content`, `templates` etc.
     * @since 0.2.0
     */
    private projectPath: string;

    /**
     * Target build path
     * @since 0.2.0
     */
    private buildPath: string;

    /**
     * Injected event emitter reference
     * @since 0.2.0
     */
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

    /**
     *
     * @since 0.2.0
     */
    public watch() {
        this.setupFileWatchers();
        let assetManager = new AssetManager(
            path.join(this.projectPath, 'assets'),
            path.join(this.buildPath, 'assets'),
            this.eventEmitter
        );
        assetManager.setupListeners();
    }

    /**
     * Setup
     * @since 0.2.0
     */
    private setupFileWatchers() {
        this.setupFileWatcher('assets', [
            {
                fsEvent: 'add',
                blitzEvent: ASSET_CHANGE_EVENT,
            },
            {
                fsEvent: 'addDir',
                blitzEvent: ASSET_CHANGE_EVENT,
            },
            {
                fsEvent: 'change',
                blitzEvent: ASSET_CHANGE_EVENT,
            },
            {
                fsEvent: 'unlink',
                blitzEvent: ASSET_REMOVE_EVENT,
            },
            {
                fsEvent: 'unlinkDir',
                blitzEvent: ASSET_REMOVE_EVENT,
            },
        ]);
    }

    /**
     * Setup watchers for a directory using an event pair
     * @since 0.2.0
     */
    private setupFileWatcher(directory: string, events: IFSEventPair[]) {
        let fullPath = path.join(this.projectPath, directory);
        let watcher = chokidar.watch(fullPath);
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            watcher.on(
                event.fsEvent,
                (filePath) => this.eventEmitter.emit(event.blitzEvent, path.relative(fullPath, filePath))
            );
        }
        watcher.on('error', (error: any) => {
            // Workaround for the "Windows rough edge" regarding the deletion of directories
            if (process.platform === 'win32'
                && error.code === 'EPERM'
                && error.filename === null) { // tslint:disable-line:no-null-keyword
                return;
            }
            return error;
        });
    }
}
