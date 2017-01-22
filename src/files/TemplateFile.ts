/**
 * @file Contains code related Content File parsing
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {Logger} from '../cli/Logger';
import {GenericFile} from './GenericFile';
import {Template} from '../components/Template';
import {ISiteMenuMap} from '../components/Menu';

/**
 * @class File responsible for representing content files
 * @since 0.2.0
 */
export class TemplateFile extends GenericFile {
    /**
     * Compiled template
     * @since 0.2.0
     */
    private template: Template;

    /**
     * ContentFile constructor
     * @since 0.2.0
     */
    public constructor(rootPath: string, relativePath: string) {
        super(rootPath, [], relativePath);
        this.relativePath = relativePath;
        this.template = new Template();
    }

    /**
     * Reloads the contents of the file and processes any changes
     * @since 0.2.0
     */
    public reload(locals?: any, menus?: ISiteMenuMap) {
        let changes: any = {};
        let tempContents = this.contents;
        this.read();
        if (tempContents === this.contents) {
            return changes;
        }
        this.template.prepare(this.contents, locals, menus);
    }

    /**
     * Throws an error because content files should not be written to
     * @since 0.2.0
     */
    public write() {
        throw new Error(
            'Attempted to write to a template file `' + Logger.brand(this.name) + '`. This is not allowed!'
        );
    }

    /**
     * @since 0.2.0
     */
    public getTemplate(): Template {
        return this.template;
    }
}