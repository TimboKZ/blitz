/**
 * @file Main command line interface for Blitz.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.4
 */

import * as nomnom from 'nomnom';
import * as fse from 'fs-extra';
import * as path from 'path';
import {SiteBuilder} from './SiteBuilder';
import {Util} from './Util';
import {ConfigParser} from './ConfigParser';

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
            template: {
                abbr: 't',
                default: 'minimal',
                metavar: 'TEMPLATE',
                help: 'Template to use for initialisation',
            },
            yes: {
                abbr: 'y',
                flag: true,
                help: 'Skips all confirmation prompts by replying `yes`',
            },
            map: {
                abbr: 'm',
                flag: true,
                help: 'Print out a Blitz site map before building it',
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
        case 'preview':
            Util.log('This command has not yet been implemented.');
            // TODO: Implement preview feature.
            break;
        case undefined:
            Util.log('Use ' + 'blitz -h'.cyan + ' for help.');
            Util.log('For full documentation, refer to ' + 'https://github.com/TimboKZ/blitz'.cyan);
            break;
        default:
            Util.log('Unrecognised action: ' + action.cyan + '. Use `blitz -h` for help.');
            Util.log('For full documentation, refer to ' + 'https://github.com/TimboKZ/blitz'.cyan);
    }
}

/**
 * Creates a new Blitz project in the current repository
 * @since 0.0.1
 */
function init() {
    let template = args.template;
    let templateDisplay = template.cyan;
    Util.log('Initialising a new Blitz project using template ' + templateDisplay + '...');

    try {
        let blitzTemplatePath = path.join(__dirname, '..', '..', 'templates');
        let allTemplates = fse.readdirSync(blitzTemplatePath);
        if (allTemplates.indexOf(template) === -1) {
            Util.error('Template ' + templateDisplay + ' does not exist!');
            return;
        }
        let templateDir = path.join(blitzTemplatePath, template);
        let currentDirectoryContents = fse.readdirSync(process.cwd());
        if (currentDirectoryContents.length > 0 && !args.yes) {
            Util.log('Directory is not empty! Overwrite files...');
            // TODO: Ask for confirmation
        }
        fse.copySync(templateDir, process.cwd());
    } catch (e) {
        Util.error('Could not initialise a new project!');
        Util.stackTrace(e);
        return;
    }

    Util.log('Done! Use ' + 'blitz build'.cyan + ' to build the template.');
}

/**
 * Builds static site using the config, if it exists
 * @since 0.0.2
 */
function build() {
    let directory = process.cwd();
    Util.log('Building static site files in ' + directory + '...');
    let config = ConfigParser.load();
    if (!config) {
        return Util.error('Could not load the config!');
    }
    if (!ConfigParser.verify(config)) {
        return Util.error('ConfigParser is invalid!');
    }
    Util.debug('Starting building process...');
    let builder = new SiteBuilder(config, directory, 'build');
    builder.build();
}
