"use strict";
var nomnom = require('nomnom');
var fs = require('fs');
var args;
function main(argv) {
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
    var action = args.action;
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
exports.main = main;
function init() {
    console.log('Initialising a new Blitz project...');
    var files = fs.readdirSync(__dirname);
    if (files.length > 0 && !args.yes) {
        console.log('Directory is not empty! Overwrite files?');
    }
}
