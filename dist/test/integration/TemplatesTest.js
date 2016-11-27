"use strict";
var chai_1 = require('chai');
var fs = require('fs-extra');
var path = require('path');
var child_process_1 = require('child_process');
var Util_1 = require('../../src/Util');
describe('Blitz project initialiser', function () {
    var basePath = process.cwd();
    var blitzCli = 'node ' + path.join(basePath, 'blitz-cli');
    var templatesPath = path.join(basePath, 'templates');
    var tempPath = path.join(basePath, 'temp');
    if (Util_1.Util.pathExists(tempPath)) {
        fs.removeSync(tempPath);
    }
    child_process_1.execSync('mkdir temp');
    var templateNames = fs.readdirSync(templatesPath);
    var nameCount = templateNames.length;
    var templatesTestInfo = [];
    var templateTestCount = 0;
    it('should not copy the `build` folder on init', function (done) {
        for (var i = 0; i < nameCount; i++) {
            var templateName = templateNames[i];
            child_process_1.execSync('mkdir ' + templateName, { cwd: tempPath });
            var projectPath = path.join(tempPath, templateName);
            child_process_1.execSync(blitzCli + ' init -t ' + templateName, { cwd: projectPath });
            templatesTestInfo.push({
                name: templateName,
                projectPath: projectPath,
                projectBuild: path.join(projectPath, 'build'),
                templatePath: path.join(templatesPath, templateName),
                templateBuild: path.join(templatesPath, templateName, 'build'),
            });
        }
        templateTestCount = templatesTestInfo.length;
        for (var i = 0; i < templateTestCount; i++) {
            var templateTestInfo = templatesTestInfo[i];
            chai_1.assert.isFalse(Util_1.Util.pathExists(templateTestInfo.projectBuild), templateTestInfo.name + ' template');
        }
        done();
    }).timeout(6000);
    it('should create a `build` folder on build', function (done) {
        for (var i = 0; i < templateTestCount; i++) {
            var templateTestInfo = templatesTestInfo[i];
            child_process_1.execSync(blitzCli + ' build', { cwd: templateTestInfo.projectPath });
        }
        for (var i = 0; i < templateTestCount; i++) {
            var templateTestInfo = templatesTestInfo[i];
            chai_1.assert.isTrue(Util_1.Util.pathExists(templateTestInfo.projectBuild), templateTestInfo.name + ' template');
        }
        done();
    }).timeout(6000);
    it('should generate valid build', function (done) {
        for (var i = 0; i < templateTestCount; i++) {
            var templateTestInfo = templatesTestInfo[i];
            if (!Util_1.Util.pathExists(templateTestInfo.templateBuild)) {
                chai_1.assert.equal(fs.walkSync(templateTestInfo.projectBuild).length, 0);
                continue;
            }
            var templateBuildFiles = fs.walkSync(templateTestInfo.templateBuild);
            var projectBuildFiles = fs.walkSync(templateTestInfo.projectBuild);
            chai_1.assert.equal(projectBuildFiles.length, templateBuildFiles.length);
            var count = templateBuildFiles.length;
            for (var k = 0; k < count; k++) {
                chai_1.assert.deepEqual(path.relative(templateTestInfo.templatePath, templateBuildFiles[k]), path.relative(templateTestInfo.projectPath, projectBuildFiles[k]));
            }
            for (var k = 0; k < count; k++) {
                var templateFile = templateBuildFiles[k];
                var projectFile = projectBuildFiles[k];
                chai_1.assert.equal(Util_1.Util.getFileContents(projectFile), Util_1.Util.getFileContents(templateFile));
            }
        }
        fs.removeSync(tempPath);
        done();
    }).timeout(6000);
});
