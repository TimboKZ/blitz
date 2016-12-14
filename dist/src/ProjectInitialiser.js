"use strict";
var fse = require('fs-extra');
var path = require('path');
var yesNo = require('yesno');
var Logger_1 = require('./Logger');
var Util_1 = require('./Util');
exports.DEFAULT_TEMPLATE = 'portfolio';
var ProjectInitialiser = (function () {
    function ProjectInitialiser(projectPath, templatesPath) {
        this.projectPath = projectPath;
        this.templatesPath = templatesPath;
    }
    ProjectInitialiser.prototype.findTemplate = function (templateName) {
        var allTemplates = fse.readdirSync(this.templatesPath);
        if (allTemplates.indexOf(templateName) === -1) {
            throw new Error('Template `' + Logger_1.Logger.brand(templateName) + '` does not exist!');
        }
        return path.join(this.templatesPath, templateName);
    };
    ProjectInitialiser.prototype.prepareConfig = function (configPath) {
        var configContents = fse.readFileSync(configPath, 'utf8');
        configContents = configContents.replace(/\$\{BLITZ_VERSION}/g, Util_1.Util.getPackageInfo().version);
        fse.writeFileSync(configPath, configContents);
    };
    ProjectInitialiser.prototype.copyTemplate = function (templatePath, targetPath) {
        var templateContents = fse.readdirSync(templatePath);
        for (var i = 0; i < templateContents.length; i++) {
            var templatePart = templateContents[i];
            switch (templatePart) {
                case 'build':
                    continue;
                case 'blitz.yml':
                    var configPath = path.join(targetPath, templatePart);
                    fse.copySync(path.join(templatePath, templatePart), configPath);
                    this.prepareConfig(configPath);
                    break;
                default:
                    fse.copySync(path.join(templatePath, templatePart), path.join(targetPath, templatePart));
            }
        }
    };
    ProjectInitialiser.prototype.initialise = function (templateName, callback) {
        var _this = this;
        try {
            var templatePath_1 = this.findTemplate(templateName);
            fse.ensureDirSync(this.projectPath);
            var projectPathContents = fse.readdirSync(this.projectPath);
            if (projectPathContents.length > 0) {
                var question = Logger_1.Logger.log('Target path is not empty. Overwrite files? [y/N]', Logger_1.LogLevel.Warn, false);
                yesNo.ask(question, false, function (answer) {
                    if (answer) {
                        _this.copyTemplate(templatePath_1, _this.projectPath);
                        return callback();
                    }
                    else {
                        return callback('Initialisation aborted, project path is not empty.');
                    }
                }, ['y'], ['N']);
            }
            else {
                this.copyTemplate(templatePath_1, this.projectPath);
                return callback();
            }
        }
        catch (exception) {
            return callback('Could not initialise project: ' + exception.message);
        }
    };
    return ProjectInitialiser;
}());
exports.ProjectInitialiser = ProjectInitialiser;
