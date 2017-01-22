/**
 * @file A TypeScript file.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 * @since 0.0.1
 */

import * as path from 'path';
import * as fse from 'fs-extra';
import * as yaml from 'js-yaml';
import {Config} from './Config';
import {EventEmitter} from 'events';

export const DEFAULT_CONFIG_NAME = 'blitz.yml';
export const DEFAULT_ASSET_DIRECTORY_NAME = 'assets';
export const DEFAULT_BUILD_DIRECTORY_NAME = 'build';
export const DEFAULT_CONTENT_DIRECTORY_NAME = 'content';
export const DEFAULT_TEMPLATE_DIRECTORY_NAME = 'templates';

/**
 * @class Represents the runtime settings for Blitz instance, not to be confused with `Config` class
 */
export class ProjectSettings {

    private _configPath: string;
    private _config: Config;
    private _projectPath: string;
    private _assetPath: string;
    private _buildPath: string;
    private _contentPath: string;
    private _templatePath: string;
    private _eventEmitter: EventEmitter;

    public constructor(configPath: string) {
        this._configPath = configPath;
        this.loadConfig();
        this.setupDirectories();
        this._eventEmitter = new EventEmitter();
    }

    private loadConfig() {
        let configContents = fse.readFileSync(this._configPath, 'utf8');
        let rawConfig = yaml.safeLoad(configContents);
        if (!rawConfig) {
            rawConfig = {};
        }
        this._config = new Config();
        this._config.load(rawConfig);
    }

    private setupDirectories() {
        this._projectPath = path.dirname(this._configPath);
        this._assetPath = path.join(this._projectPath, DEFAULT_ASSET_DIRECTORY_NAME);
        this._buildPath = path.join(this._projectPath, DEFAULT_BUILD_DIRECTORY_NAME);
        this._contentPath = path.join(this._projectPath, DEFAULT_CONTENT_DIRECTORY_NAME);
        this._templatePath = path.join(this._projectPath, DEFAULT_TEMPLATE_DIRECTORY_NAME);
    }

    public get configPath(): string {
        return this._configPath;
    }

    public get config(): Config {
        return this._config;
    }

    public get projectPath(): string {
        return this._projectPath;
    }

    public get assetPath(): string {
        return this._assetPath;
    }

    public get buildPath(): string {
        return this._buildPath;
    }

    public get contentPath(): string {
        return this._contentPath;
    }

    public get templatePath(): string {
        return this._templatePath;
    }

    public get eventEmitter(): EventEmitter {
        return this._eventEmitter;
    }
}
