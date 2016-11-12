"use strict";
var nomnom = require('nomnom');
var fs = require('fs');
var SiteBuilder_1 = require('./SiteBuilder');
var Util_1 = require('./Util');
var ConfigParser_1 = require('./ConfigParser');
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
    global.debug = exports.args.debug;
    var action = exports.args.action;
    switch (action) {
        case 'init':
            init();
            break;
        case 'build':
            build();
            break;
        case 'preview':
            Util_1.Util.log('This command has not yet been implemented.');
            break;
        case undefined:
            Util_1.Util.log('Use `blitz -h` for help.');
            break;
        default:
            Util_1.Util.log('Unrecognised action: `' + action + '`. Use `blitz -h` for help.');
            Util_1.Util.log('For full documentation, refer to ' + 'https://github.com/TimboKZ/blitz'.cyan);
    }
    Util_1.Util.log('Done!');
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
    var config = ConfigParser_1.ConfigParser.load();
    if (!config) {
        return Util_1.Util.error('Could not load the config!');
    }
    if (!ConfigParser_1.ConfigParser.verify(config)) {
        return Util_1.Util.error('ConfigParser is invalid!');
    }
    Util_1.Util.debug('Starting building process...');
    var builder = new SiteBuilder_1.SiteBuilder(config, directory, 'build');
    builder.build();
}
