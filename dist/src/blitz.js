"use strict";
var nomnom = require('nomnom');
var fse = require('fs-extra');
var path = require('path');
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
        template: {
            abbr: 't',
            default: 'portfolio',
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
            Util_1.Util.log('Use ' + 'blitz -h'.cyan + ' for help.');
            Util_1.Util.log('For full documentation, refer to ' + 'https://github.com/TimboKZ/blitz'.cyan);
            break;
        default:
            Util_1.Util.log('Unrecognised action: ' + action.cyan + '. Use `blitz -h` for help.');
            Util_1.Util.log('For full documentation, refer to ' + 'https://github.com/TimboKZ/blitz'.cyan);
    }
}
exports.main = main;
function init() {
    var template = exports.args.template;
    var templateDisplay = template.cyan;
    Util_1.Util.log('Initialising a new Blitz project using template ' + templateDisplay + '...');
    try {
        var blitzTemplatePath = path.join(__dirname, '..', '..', 'templates');
        var allTemplates = fse.readdirSync(blitzTemplatePath);
        if (allTemplates.indexOf(template) === -1) {
            Util_1.Util.error('Template ' + templateDisplay + ' does not exist!');
            return;
        }
        var templateDir = path.join(blitzTemplatePath, template);
        var currentDirectoryContents = fse.readdirSync(process.cwd());
        if (currentDirectoryContents.length > 0 && !exports.args.yes) {
            Util_1.Util.log('Directory is not empty! Overwrite files...');
        }
        fse.copySync(templateDir, process.cwd());
        fse.removeSync(path.join(process.cwd(), 'build'));
    }
    catch (e) {
        Util_1.Util.error('Could not initialise a new project!');
        Util_1.Util.stackTrace(e);
        return;
    }
    Util_1.Util.log('Done! Use ' + 'blitz build'.cyan + ' to build the template.');
}
function build() {
    var directory = process.cwd();
    Util_1.Util.log('Building static site files in ' + directory + '...');
    var config = ConfigParser_1.ConfigParser.load(path.join(process.cwd(), ConfigParser_1.DEFAULT_CONFIG_NAME));
    Util_1.Util.debug('Starting building process...');
    var builder = new SiteBuilder_1.SiteBuilder(config, directory, 'build');
    builder.build();
}
