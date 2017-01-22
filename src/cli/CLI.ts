/**
 * @file Contains code responsible for routing `blitz` CLI commands to the `blitz` module
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as nomnom from 'nomnom';
import * as path from 'path';
import {DEFAULT_TEMPLATE} from '../core/ProjectInitialiser';
import {Logger} from './Logger';
import {Blitz} from '../Blitz';
import {DEFAULT_CONFIG_NAME, DEFAULT_BUILD_DIRECTORY_NAME} from '../components/ProjectSettings';
import {} from '../core/SiteGenerator';
import {Util} from '../helpers/Util';

/**
 * Name of the cli command used to run Blitz
 * @since 0.2.0
 */
export const CLI_NAME = 'blitz';

/**
 * Parsed arguments
 * @since 0.2.0
 */
export let args;

/**
 * @class Exposes an API for the cli
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
        global.verbose = false;

        parser.script(CLI_NAME);
        parser.nocommand().callback(() => CLI.version());
        parser.option('verbose', {
            abbr: 'v',
            flag: true,
            help: 'displays warnings and log output',
            callback: (flagSet) => global.verbose = flagSet,
        });
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
            .callback((opts) => Blitz.init(opts.template, opts.path));
        parser.command('build')
            .option('config', {
                abbr: 'c',
                default: path.join(process.cwd(), DEFAULT_CONFIG_NAME),
                help: 'path to Blitz config',
            })
            .option('build', {
                abbr: 'b',
                default: path.join(process.cwd(), DEFAULT_BUILD_DIRECTORY_NAME),
                help: 'path to target build directory',
            })
            .help('builds site using `blitz.yml`')
            .callback((opts) => Blitz.build(opts.config, opts.build));
        parser.command('watch')
            .option('config', {
                abbr: 'c',
                default: path.join(process.cwd(), DEFAULT_CONFIG_NAME),
                help: 'path to Blitz config',
            })
            .option('build', {
                abbr: 'b',
                default: path.join(process.cwd(), DEFAULT_BUILD_DIRECTORY_NAME),
                help: 'path to target build directory',
            })
            .help('watches source code and rebuilds the website when necessary')
            .callback((opts) => {
                global.verbose = true;
                Blitz.watch(opts.config, opts.build);
            });
        parser.command('preview')
            .option('config', {
                abbr: 'c',
                default: path.join(process.cwd(), DEFAULT_CONFIG_NAME),
                help: 'path to Blitz config',
            })
            .option('build', {
                abbr: 'b',
                default: path.join(process.cwd(), DEFAULT_BUILD_DIRECTORY_NAME),
                help: 'path to target build directory',
            })
            .help('starts a web server for real-time change preview')
            .callback((opts) => {
                global.verbose = true;
                Blitz.preview(opts.config, opts.build);
            });

        let normalisedArgv = argv.slice(2);
        args = parser.parse(normalisedArgv);
    }

    /**
     * Prints information about the version
     * @since 0.2.0
     */
    public static version() {
        let verboseState = global.verbose;
        global.verbose = true;
        Logger.log('Blitz v' + Util.getPackageInfo().version + ', use `' + Logger.brand('blitz -h') + '` for help');
        Logger.log('For documentation, refer to ' + Logger.brand('https://getblitz.io/'));
        global.verbose = verboseState;
    }
}
