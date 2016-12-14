"use strict";
var fse = require('fs-extra');
var Logger_1 = require('./Logger');
exports.DEFAULT_TEMPLATE = 'portfolio';
var ProjectInitialiser = (function () {
    function ProjectInitialiser(projectPath, templatesPath) {
        this.projectPath = projectPath;
        this.templatesPath = templatesPath;
    }
    ProjectInitialiser.prototype.initialise = function (templateName, callback) {
        var allTemplates;
        try {
            allTemplates = fse.readdirSync(this.templatesPath);
            if (allTemplates.indexOf(templateName) === -1) {
                return callback('Template ' + Logger_1.Logger.brand(templateName) + ' does not exist!');
            }
            fse.ensureDirSync(this.projectPath);
            var projectPathContents = fse.readdirSync(this.projectPath);
            if (projectPathContents.length > 0) {
            }
        }
        catch (exception) {
            return callback('Could not initialise project: ' + exception.message);
        }
    };
    return ProjectInitialiser;
}());
exports.ProjectInitialiser = ProjectInitialiser;
