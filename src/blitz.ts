/**
 * @file Main command line interface for Blitz.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.4
 */

import * as nomnom from 'nomnom';
import * as fs from 'fs';
import * as path from 'path';
import * as pug from 'pug';
import {Util} from './Util';
import {Config} from './Config';

/**
 * Blitz constants, self-explanatory
 * @since 0.0.2
 */
const CONTENT_PATH = 'content';
const TEMPLATES_PATH = 'templates';

/**
 * Command line arguments passed to Blitz
 * @since 0.0.1
 */
export let args;

/**
 * Entry point into Blitz. Parses arguments and routes the request to a relevant function.
 * @since 0.0.1
 */
export function main(argv: string[]) {
    args = nomnom.script('blitz')
        .options({
            action: {
                position: 2,
                help: 'Action to perform. Either `init`, `build` or `preview`',
            },
            yes: {
                abbr: 'y',
                flag: true,
                help: 'Skips all confirmation prompts by replying `yes`',
            },
            debug: {
                abbr: 'd',
                flag: true,
                help: 'Print debug info',
            },
        }).parse(argv);
    global.debug = args.debug;
    let action = args.action;
    switch (action) {
        case 'init':
            init();
            break;
        case 'build':
            build();
            break;
        case undefined:
            Util.log('Use `blitz -h` for help.');
            break;
        default:
            Util.log('Unrecognised action: `' + action + '`. Use `blitz -h` for help.');
    }
}

/**
 * Creates a new Blitz project in the current repository
 * @since 0.0.1
 */
function init() {
    Util.log('Initialising a new Blitz project...');
    let files = fs.readdirSync(process.cwd());
    if (files.length > 0 && !args.yes) {
        Util.log('Directory is not empty! Overwrite files?');
        // TODO: Ask for confirmation
    }
    // TODO: Create files for basic project once structure is established
}

/**
 * Builds static site using the config, if it exists
 * @since 0.0.2
 */
function build() {
    let directory = process.cwd();
    Util.log('Building static site files in ' + directory + '...');
    let config = Config.load();
    if (!config) {
        return Util.error('Could not load the config!');
    }
    if (!Config.verify(config)) {
        return Util.error('Config is invalid!');
    }
    Util.debug('Starting building process...');
    Util.log(config);
    let buildDirectory = path.join(directory, 'build');
    if (!fs.existsSync(buildDirectory)) {
        fs.mkdirSync(buildDirectory);
    }

}
