/**
 * @file File containing the core of Blitz
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as path from 'path';
import * as fse from 'fs-extra';
import * as yaml from 'js-yaml';
import {ProjectInitialiser} from './ProjectInitialiser';
import {Logger, LogLevel} from './Logger';
import {Config} from './Config';
import {ProjectWatcher} from './ProjectWatcher';
import {EventEmitter} from 'events';
import {ProjectPreviewer} from './ProjectPreviewer';

/**
 * @class Main class of Blitz, exposes the API for external modules to use
 * @since 0.2.0
 */
export class Blitz {
    /**
     * Initialises a Blitz project from a template
     * @since 0.2.0
     */
    public static init(templateName: string, projectPath: string) {
        Logger.log('Initialising a new project in `' +
            Logger.brand(projectPath) + '` using the template `' +
            Logger.brand(templateName) + '`...', LogLevel.Debug);
        let templatesPath = path.join(__dirname, '..', '..', 'templates');
        let projectInitialiser = new ProjectInitialiser(projectPath, templatesPath);
        projectInitialiser.initialise(templateName, (error) => {
            if (error) {
                Logger.logMany(Logger.split(error), LogLevel.Error);
                process.exit(1);
            }
            Logger.log('Project initialised!');
            process.exit(0);
        });
    }

    /**
     * Builds the website using the specified config. Assumes that all relevant folders (e.g. `assets`, `content`,
     * `plugins`, `templates`, etc.) exist in the same directory as the config. The generated files are placed into the
     * specified build directory.
     * @since 0.2.0
     */
    public static build(configPath: string, buildPath: string) {
        Logger.log('Building site...');
        Logger.log('Building site using `' +
            Logger.brand(configPath) + '` in directory `' +
            Logger.brand(buildPath) + '`...', LogLevel.Debug);
        let configContents = fse.readFileSync(configPath, 'utf8');
        let rawConfig = yaml.safeLoad(configContents);
        if (!rawConfig) {
            rawConfig = {};
        }
        let config = new Config();
        config.load(rawConfig);
        try {
            config.validate();
        } catch (exception) {
            Logger.log('Error validating the config:', LogLevel.Error);
            Logger.logMany(Logger.split(exception.message), LogLevel.Error);
            process.exit(1);
        }
        console.log(config.get());
    }

    /**
     * Watches the current directory and rebuilds certain parts of the website when necessary
     * @since 0.2.0
     */
    public static watch(configPath: string, buildPath: string) {
        Logger.log('Starting project watcher...');
        Logger.log('Watching the project using `' +
            Logger.brand(configPath) + '` with build located in `' +
            Logger.brand(buildPath) + '`...', LogLevel.Debug);
        let eventEmitter = new EventEmitter();
        let projectWatcher = new ProjectWatcher(configPath, buildPath, eventEmitter);
        projectWatcher.watch();
    }

    /**
     * Runs a web server with the preview of the website
     * @since 0.2.0
     */
    public static preview(configPath: string, buildPath: string) {
        Logger.log('Starting preview server...');
        Logger.log('Previewing the project using `' +
            Logger.brand(configPath) + '` with build located in `' +
            Logger.brand(buildPath) + '`...', LogLevel.Debug);
        let eventEmitter = new EventEmitter();
        let projectPreviewer = new ProjectPreviewer(configPath, buildPath, eventEmitter);
        projectPreviewer.startServer();
    }
}
