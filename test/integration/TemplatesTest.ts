/**
 * @file Tests that websites are built correctly from templates
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.1.4
 */

import {assert} from 'chai';
import * as fs from 'fs-extra';
import * as path from 'path';
import {execSync} from 'child_process';
import {Util} from '../../src/helpers/Util';

describe('Blitz project initialiser', () => {

    // Get list of templates, prepare the `temp` folder
    let basePath = process.cwd();
    let blitzCli = 'node ' + path.join(basePath, 'blitz-cli');
    let templatesPath = path.join(basePath, 'templates');
    let tempPath = path.join(basePath, 'temp');
    if (Util.pathExists(tempPath)) {
        fs.removeSync(tempPath);
    }
    execSync('mkdir temp');
    let templateNames = fs.readdirSync(templatesPath);
    let nameCount = templateNames.length;

    // Initialise projects for all templates
    interface ITemplateTestInfo {
        name: string;
        projectPath: string;
        projectBuild: string;
        templatePath: string;
        templateBuild: string;
    }
    let templatesTestInfo: ITemplateTestInfo[] = [];
    let templateTestCount = 0;

    it('should not copy the `build` folder on init', (done) => {
        for (let i = 0; i < nameCount; i++) {
            let templateName = templateNames[i];
            execSync('mkdir ' + templateName, {cwd: tempPath});
            let projectPath = path.join(tempPath, templateName);
            execSync(blitzCli + ' init -t ' + templateName, {cwd: projectPath});
            templatesTestInfo.push({
                name: templateName,
                projectPath,
                projectBuild: path.join(projectPath, 'build'),
                templatePath: path.join(templatesPath, templateName),
                templateBuild: path.join(templatesPath, templateName, 'build'),
            });
        }
        templateTestCount = templatesTestInfo.length;
        for (let i = 0; i < templateTestCount; i++) {
            let templateTestInfo = templatesTestInfo[i];
            assert.isFalse(Util.pathExists(templateTestInfo.projectBuild), templateTestInfo.name + ' template');
        }
        done();
    }).timeout(6000);

    // it('should create a `build` folder on build', (done) => {
    //     // Build all projects
    //     for (let i = 0; i < templateTestCount; i++) {
    //         let templateTestInfo = templatesTestInfo[i];
    //         execSync(blitzCli + ' build', {cwd: templateTestInfo.projectPath});
    //     }
    //     for (let i = 0; i < templateTestCount; i++) {
    //         let templateTestInfo = templatesTestInfo[i];
    //         assert.isTrue(Util.pathExists(templateTestInfo.projectBuild), templateTestInfo.name + ' template');
    //     }
    //     done();
    // }).timeout(6000);
    //
    // it('should generate valid build', (done) => {
    //     for (let i = 0; i < templateTestCount; i++) {
    //         let templateTestInfo = templatesTestInfo[i];
    //         if (!Util.pathExists(templateTestInfo.templateBuild)) {
    //             assert.equal(fs.walkSync(templateTestInfo.projectBuild).length, 0);
    //             continue;
    //         }
    //         let templateBuildFiles = fs.walkSync(templateTestInfo.templateBuild);
    //         let projectBuildFiles = fs.walkSync(templateTestInfo.projectBuild);
    //         assert.equal(projectBuildFiles.length, templateBuildFiles.length);
    //         let count = templateBuildFiles.length;
    //         for (let k = 0; k < count; k++) {
    //             assert.deepEqual(path.relative(
    //                 templateTestInfo.templatePath,
    //                 templateBuildFiles[k]
    //             ), path.relative(
    //                 templateTestInfo.projectPath,
    //                 projectBuildFiles[k]
    //             ));
    //         }
    //         for (let k = 0; k < count; k++) {
    //             let templateFile = templateBuildFiles[k];
    //             let projectFile = projectBuildFiles[k];
    //             assert.equal(Util.getFileContents(projectFile), Util.getFileContents(templateFile));
    //         }
    //
    //     }
    //
    //     // Remove temp folder
    //     fs.removeSync(tempPath);
    //
    //     done();
    // }).timeout(6000);

});
