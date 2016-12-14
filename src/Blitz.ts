/**
 * @file File containing the core of Blitz
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as path from 'path';
import {ProjectInitialiser} from './ProjectInitialiser';
import {Util} from './Util';
import {Logger, LogLevel} from './Logger';
import {Config} from './Config';

/**
 * @class Main class of Blitz, exposes the API for external modules to use
 * @since 0.0.1
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
                Logger.log(error, LogLevel.Error);
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
    public static build(configPath: string, buildDirectory: string) {
        Logger.log('Building site using `' +
            Logger.brand(configPath) + '` in directory `' +
            Logger.brand(buildDirectory) + '`...', LogLevel.Debug);
        let config = new Config(configPath);
        config.load();
        config.validate();
        console.log(config.get());
    }

    /**
     * Watches the current directory and rebuilds certain parts of the website when necessary
     * @since 0.2.0
     */
    public static watch() {

    }

    /**
     * Runs a web server with the preview of the website
     * @since 0.2.0
     */
    public static preview() {

    }
}
