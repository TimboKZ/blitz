/**
 * @file Main command line interface for Blitz.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.2
 */

import * as nomnom from 'nomnom';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

/**
 * Blitz constants, self-explanatory
 * @since 0.0.2
 */
const CONFIG_NAME = 'blitz.yml';
const CONTENT_PATH = 'content';
const TEMPLATES_PATH = 'templates';

/**
 * Command line arguments passed to Blitz
 * @since 0.0.1
 */
let args;

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
        }).parse(argv);
    let action = args.action;
    switch (action) {
        case 'init':
            init();
            break;
        case 'build':
            build();
            break;
        case undefined:
            console.log('Use `blitz -h` for help.');
            break;
        default:
            console.log('Unrecognised action: `' + action + '`. Use `blitz -h` for help.');
    }
}

/**
 * Creates a new Blitz project in the current repository
 * @since 0.0.1
 */
function init() {
    console.log('Initialising a new Blitz project...');
    let files = fs.readdirSync(process.cwd());
    if (files.length > 0 && !args.yes) {
        console.log('Directory is not empty! Overwrite files?');
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
    console.log('Building static site files in ' + directory + '...');
    let configPath = path.join(directory, CONFIG_NAME);
    let configContent: string;
    try {
        configContent = fs.readFileSync(configPath, 'utf8');
    } catch (e: Error) {
        console.log('Error reading `' + configPath + '`. Are you sure it exists?');
        console.log(e);
        return;
    }
    let config: any;
    try {
        config = yaml.safeLoad(configContent);
    } catch (e: Error) {
        console.log('Error parsing YAML! Are you sure `' + configPath + '` is valid?');
        console.log(e);
        return;
    }
    console.log(config);
}
