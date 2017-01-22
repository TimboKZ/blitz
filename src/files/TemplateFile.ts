/**
 * @file Contains code related Content File parsing
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {GenericFile} from './GenericFile';
import {Template} from '../components/Template';
import {ISiteMenuMap} from '../components/Menu';

/**
 * @class File responsible for representing content files
 * @since 0.2.0
 */
export class TemplateFile extends GenericFile {

    private _template: Template;

    public constructor(path: string) {
        super(path);
        this._template = new Template();
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
        this._template.prepare(this.contents, this.path, locals, menus);
    }

    public write() {
        throw new Error(
            'Attempted to write to a template file. This is not allowed!'
        );
    }

    public get template(): Template {
        return this._template;
    }
}
