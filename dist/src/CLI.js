"use strict";
var nomnom = require('nomnom');
var path = require('path');
var ProjectInitialiser_1 = require('./ProjectInitialiser');
var Util_1 = require('./Util');
var Logger_1 = require('./Logger');
exports.CLI_NAME = 'blitz';
var CLI = (function () {
    function CLI() {
    }
    CLI.run = function (argv) {
        var parser = nomnom();
        global.debug = false;
        parser.script(exports.CLI_NAME);
        parser.printer(function (message) {
            var strings = Logger_1.Logger.split(message);
            for (var i = 0; i < strings.length; i++) {
                if (strings[i].match(/^command/)) {
                    strings[i] = 'Commands:';
                }
            }
            Logger_1.Logger.logMany(strings);
        });
        parser.nocommand().callback(function () { return CLI.version(); });
        parser.option('debug', {
            abbr: 'd',
            flag: true,
            help: 'displays debug output',
            callback: function (flagSet) { return global.debug = flagSet; },
        });
        parser.command('init')
            .option('template', {
            abbr: 't',
            default: ProjectInitialiser_1.DEFAULT_TEMPLATE,
            help: 'template name',
        })
            .option('path', {
            abbr: 'p',
            default: process.cwd(),
            help: 'path to project folder',
        })
            .help('initialise a project from template')
            .callback(function (opts) { return CLI.init(opts.template, opts.path); });
        parser.command('build')
            .help('builds site using `blitz.yml`')
            .callback(function () { return CLI.build(); });
        parser.command('watch')
            .help('watches source code and rebuilds the website when necessary')
            .callback(function () { return CLI.watch(); });
        parser.command('preview')
            .help('starts a web server for real-time change preview')
            .callback(function () { return CLI.preview(); });
        var normalisedArgv = argv.slice(2);
        exports.args = parser.parse(normalisedArgv);
    };
    CLI.version = function () {
        Logger_1.Logger.log('Blitz v' + Util_1.Util.getPackageInfo().version + ', use ' + Logger_1.Logger.brand('blitz -h') + ' for help');
        Logger_1.Logger.log('For documentation, refer to ' + Logger_1.Logger.brand('https://getblitz.io/'));
    };
    CLI.init = function (templateName, projectPath) {
        Logger_1.Logger.log('Initialising a new project in ' +
            Logger_1.Logger.brand(projectPath) + ' using the template ' +
            Logger_1.Logger.brand(templateName) + '...', Logger_1.LogLevel.Debug);
        var templatesPath = path.join(__dirname, '..', '..', 'templates');
        var projectInitialiser = new ProjectInitialiser_1.ProjectInitialiser(projectPath, templatesPath);
        projectInitialiser.initialise(templateName, function (error) {
            if (error) {
                Logger_1.Logger.log(error, Logger_1.LogLevel.Error);
                process.exit(1);
            }
            Logger_1.Logger.log('Project initialised!');
            process.exit(0);
        });
    };
    CLI.build = function () {
    };
    CLI.watch = function () {
    };
    CLI.preview = function () {
    };
    return CLI;
}());
exports.CLI = CLI;
