"use strict";
var nomnom = require('nomnom');
var fs = require('fs');
var path = require('path');
var Util_1 = require('./Util');
var Config_1 = require('./Config');
var CONTENT_PATH = 'content';
var TEMPLATES_PATH = 'templates';
function main(argv) {
    exports.args = nomnom.script('blitz')
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
    var action = exports.args.action;
    switch (action) {
        case 'init':
            init();
            break;
        case 'build':
            build();
            break;
        case undefined:
            Util_1.Util.log('Use `blitz -h` for help.');
            break;
        default:
            Util_1.Util.log('Unrecognised action: `' + action + '`. Use `blitz -h` for help.');
    }
}
exports.main = main;
function init() {
    Util_1.Util.log('Initialising a new Blitz project...');
    var files = fs.readdirSync(process.cwd());
    if (files.length > 0 && !exports.args.yes) {
        Util_1.Util.log('Directory is not empty! Overwrite files?');
    }
}
function build() {
    var directory = process.cwd();
    Util_1.Util.log('Building static site files in ' + directory + '...');
    var config = Config_1.Config.load();
    if (!config) {
        return Util_1.Util.error('Could not load the config!');
    }
    if (!Config_1.Config.verify(config)) {
        return Util_1.Util.error('Config is invalid!');
    }
    Util_1.Util.debug('Starting building process...');
    Util_1.Util.log(config);
    var buildDirectory = path.join(directory, 'build');
    if (!fs.existsSync(buildDirectory)) {
        fs.mkdirSync(buildDirectory);
    }
}
