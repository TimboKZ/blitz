/**
 * @file A TypeScript file.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 */

import {GenericFile} from './GenericFile';
import {TemplateFile} from './TemplateFile';
import {ContentFile} from './ContentFile';

/**
 * @class A class.
 */
export class SiteFile extends GenericFile {

    private templateFile: TemplateFile;
    private contentFile: ContentFile;

    public constructor(path: string, templateFile: TemplateFile, contentFile?: ContentFile) {
        super(path);
        this.templateFile = templateFile;
        this.contentFile = contentFile;
    }

    public rebuild() {
        this.contents = this.templateFile.template.generate();
    }

    public read() {
        throw new Error('Attempted to read from a site file. This is not allowed!');
    }
}
