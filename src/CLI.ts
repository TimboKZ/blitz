/**
 * @file Contains code responsible for routing `blitz` CLI commands to the `blitz` module
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as nomnom from 'nomnom';
import * as path from 'path';
import {DEFAULT_TEMPLATE, ProjectInitialiser} from './ProjectInitialiser';
import {Util} from './Util';
import {Logger, LogLevel} from './Logger';

/**
 * Name of the CLI command used to run Blitz
 * @since 0.2.0
 */
export const CLI_NAME = 'blitz';

/**
 * Parsed arguments
 * @since 0.2.0
 */
export let args;

/**
 * @class Exposes an API for the CLI
 * @since 0.2.0
 */
export class CLI {
    /**
     * Parses command line arguments and runs relevant methods
     * @since 0.2.0
     */
    public static run(argv: string[]) {
        let parser = nomnom();

        global.debug = false;

        parser.script(CLI_NAME);
        parser.printer((message) => {
            let strings = Logger.split(message);
            for (let i = 0; i < strings.length; i++) {
                if (strings[i].match(/^command/)) {
                    strings[i] = 'Commands:';
                }
            }
            Logger.logMany(strings);
        });
        parser.nocommand().callback(() => CLI.version());
        parser.option('debug', {
            abbr: 'd',
            flag: true,
            help: 'displays debug output',
            callback: (flagSet) => global.debug = flagSet,
        });
        parser.command('init')
            .option('template', {
                abbr: 't',
                default: DEFAULT_TEMPLATE,
                help: 'template name',
            })
            .option('path', {
                abbr: 'p',
                default: process.cwd(),
                help: 'path to project folder',
            })
            .help('initialise a project from template')
            .callback((opts) => CLI.init(opts.template, opts.path));
        parser.command('build')
            .help('builds site using `blitz.yml`')
            .callback(() => CLI.build());
        parser.command('watch')
            .help('watches source code and rebuilds the website when necessary')
            .callback(() => CLI.watch());
        parser.command('preview')
            .help('starts a web server for real-time change preview')
            .callback(() => CLI.preview());

        let normalisedArgv = argv.slice(2);
        args = parser.parse(normalisedArgv);
    }

    /**
     * Prints information about the version
     * @since 0.2.0
     */
    public static version() {
        Logger.log('Blitz v' + Util.getPackageInfo().version + ', use ' + Logger.brand('blitz -h') + ' for help');
        Logger.log('For documentation, refer to ' + Logger.brand('https://getblitz.io/'));
    }

    /**
     * Initialises a Blitz project from a template
     * @since 0.2.0
     */
    public static init(templateName: string, projectPath: string) {
        Logger.log('Initialising a new project in ' +
            Logger.brand(projectPath) + ' using the template ' +
            Logger.brand(templateName) + '...', LogLevel.Debug);
        let templatesPath = path.join(__dirname, '..', '..', 'templates');
        let projectInitialiser = new ProjectInitialiser(projectPath, templatesPath);
        projectInitialiser.initialise(templateName, (error) => {

        });
        Logger.log('test', LogLevel.Debug);
    }

    /**
     * Builds the website using `blitz.yml`
     * @since 0.2.0
     */
    public static build() {

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
