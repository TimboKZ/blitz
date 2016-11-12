/**
 * @file Main command line interface for Blitz.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.1
 */

import * as nomnom from 'nomnom';
import * as fs from 'fs';

let args;

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
        case undefined:
            console.log('Use `blitz -h` for help.');
            break;
        default:
            console.log('Unrecognised action: `' + action + '`. Use `blitz -h` for help.');
    }
}

function init() {
    console.log('Initialising a new Blitz project...');
    let files = fs.readdirSync(__dirname);
    if (files.length > 0 && !args.yes) {
        console.log('Directory is not empty! Overwrite files?');
        // TODO: Ask for confirmation
    }

}
