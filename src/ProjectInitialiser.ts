/**
 * @file Contains code related to initialising of Blitz projects from templates
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as fse from 'fs-extra';
import {Logger} from './Logger';
import {ensureDirSync} from 'fs-extra';

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
     * Initialises project in the specified directory using the specified template (if it exists)
     * @since 0.2.0
     */
    public initialise(templateName: string, callback: (error?: string) => void) {
        let allTemplates;
        try {
            allTemplates = fse.readdirSync(this.templatesPath);
            if (allTemplates.indexOf(templateName) === -1) {
                return callback('Template ' + Logger.brand(templateName) + ' does not exist!');
            }
            fse.ensureDirSync(this.projectPath);
            let projectPathContents = fse.readdirSync(this.projectPath);
            if (projectPathContents.length > 0) {

            }
        } catch (exception) {
            return callback('Could not initialise project: ' + exception.message);
        }
    }
}
