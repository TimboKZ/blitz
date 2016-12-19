/**
 * @file Contains code responsible for building, watching and preview server
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as path from 'path';
import * as browserSync from 'browser-sync';
import {EventEmitter} from 'events';
import {ProjectWatcher, BUILD_CHANGE_EVENT} from './ProjectWatcher';
import {BrowserSyncInstance} from 'browser-sync';

/**
 * @class Creates a watched and a preview server
 * @since 0.2.0
 */
export class ProjectPreviewer {
    /**
     * Location of the config that will be used for generation of the website
     * @since 0.2.0
     */
    private configPath: string;

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
     * @since 0.2.0
     */
    private server: BrowserSyncInstance;

    /**
     * ProjectWatcher constructor
     * @since 0.2.0
     */
    constructor(configPath: string, buildPath: string, eventEmitter: EventEmitter) {
        this.configPath = configPath;
        this.buildPath = buildPath;
        this.eventEmitter = eventEmitter;
        this.server = browserSync.create();
    }

    /**
     *
     * @since 0.2.0
     */
    public startServer() {
        let projectWatcher = new ProjectWatcher(this.configPath, this.buildPath, this.eventEmitter);
        projectWatcher.watch();
        this.server.init({
            server: this.buildPath,
            logPrefix: '> Preview',
        });
        this.eventEmitter.on(BUILD_CHANGE_EVENT, (filePath) => {
            this.server.reload(path.join(this.buildPath, filePath));
        });
    }
}
