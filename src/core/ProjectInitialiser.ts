/**
 * @file Contains code related to initialising of Blitz projects from templates
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as fse from 'fs-extra';
import * as path from 'path';
import * as yesNo from 'yesno';
import {Logger, LogLevel} from '../cli/Logger';
import {Util} from '../helpers/Util';

/**
 * Template used for project initialisation by default
 * @since 0.2.0
 */
export const DEFAULT_TEMPLATE = 'portfolio';

/**
 * @class Exposes API for initialising of a Blitz project from a template
 * @since 0.2.0
 */
export class ProjectInitialiser {
    /**
     * Directory in which the project will be initialised. Created if it doesn't exist.
     * @since 0.2.0
     */
    private projectPath: string;

    /**
     * Directory in which all templates are listed.
     * @since 0.2.0
     */
    private templatesPath: string;

    /**
     * ProjectInitialiser constructor
     * @since 0.2.0
     */
    public constructor(projectPath: string, templatesPath: string) {
        this.projectPath = projectPath;
        this.templatesPath = templatesPath;
    }

    /**
     * Returns the path to the template if it exists, throws an error otherwise
     * @since 0.2.0
     */
    private findTemplate(templateName: string): string {
        let allTemplates = fse.readdirSync(this.templatesPath);
        if (allTemplates.indexOf(templateName) === -1) {
            throw new Error('Template `' + Logger.brand(templateName) + '` does not exist!');
        }
        return path.join(this.templatesPath, templateName);
    }

    /**
     * Replaces various keywords in the config
     * @since 0.2.0
     */
    private static prepareConfig(configPath: string) {
        let configContents = fse.readFileSync(configPath, 'utf8');
        configContents = configContents.replace(/\$\{BLITZ_VERSION}/g, Util.getPackageInfo().version);
        fse.writeFileSync(configPath, configContents);
    }

    /**
     * Copies files from one directory into another, adjust contents of files where necessary
     * @since 0.2.0
     */
    private static copyTemplate(templatePath: string, targetPath: string) {
        let templateContents = fse.readdirSync(templatePath);
        for (let i = 0; i < templateContents.length; i++) {
            let templatePart = templateContents[i];
            switch (templatePart) {
                case 'build':
                    continue;
                case 'blitz.yml':
                    let configPath = path.join(targetPath, templatePart);
                    fse.copySync(path.join(templatePath, templatePart), configPath);
                    ProjectInitialiser.prepareConfig(configPath);
                    break;
                default:
                    fse.copySync(path.join(templatePath, templatePart), path.join(targetPath, templatePart));
            }
        }
    }

    /**
     * Initialises project in the specified directory using the specified template (if it exists)
     * @since 0.2.0
     */
    public initialise(templateName: string, callback: (error?: string) => void) {
        try {
            let templatePath = this.findTemplate(templateName);
            fse.ensureDirSync(this.projectPath);
            let projectPathContents = fse.readdirSync(this.projectPath);
            if (projectPathContents.length > 0) {
                let question = Logger.log(
                    'Target path is not empty. Overwrite files? [y/N]',
                    LogLevel.Warn,
                    false
                ) as string;
                yesNo.ask(question, false, (answer) => {
                    if (answer) {
                        ProjectInitialiser.copyTemplate(templatePath, this.projectPath);
                        return callback();
                    } else {
                        return callback('Initialisation aborted, project path is not empty.');
                    }
                }, ['y'], ['N']);
            } else {
                ProjectInitialiser.copyTemplate(templatePath, this.projectPath);
                return callback();
            }
        } catch (exception) {
            return callback('Could not initialise project: ' + exception.message);
        }
    }
}
