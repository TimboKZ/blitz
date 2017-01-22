/**
 * @file A TypeScript file.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 */

import {TemplateFile} from './TemplateFile';
import {ContentFile} from './ContentFile';

export class SiteFileGenerator {
    private contentFile: ContentFile;
    private templateFIle: TemplateFile;

    constructor(contentFile: ContentFile, templateFIle: TemplateFile) {
        this.contentFile = contentFile;
        this.templateFIle = templateFIle;
    }
}
