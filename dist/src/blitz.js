"use strict";
var nomnom = require('nomnom');
var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var CONFIG_NAME = 'blitz.yml';
var CONTENT_PATH = 'content';
var TEMPLATES_PATH = 'templates';
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
exports.main = main;
function init() {
    console.log('Initialising a new Blitz project...');
    var files = fs.readdirSync(process.cwd());
    if (files.length > 0 && !args.yes) {
        console.log('Directory is not empty! Overwrite files?');
    }
}
function build() {
    var directory = process.cwd();
    console.log('Building static site files in ' + directory + '...');
    var configPath = path.join(directory, CONFIG_NAME);
    var configContent;
    try {
        configContent = fs.readFileSync(configPath, 'utf8');
    }
    catch (e) {
        console.log('Error reading `' + configPath + '`. Are you sure it exists?');
        console.log(e);
        return;
    }
    var config;
    try {
        config = yaml.safeLoad(configContent);
    }
    catch (e) {
        console.log('Error parsing YAML! Are you sure `' + configPath + '` is valid?');
        console.log(e);
        return;
    }
    console.log(config);
}
