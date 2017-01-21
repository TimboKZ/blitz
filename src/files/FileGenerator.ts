/**
 * @file Combines a te
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {ContentFile} from './ContentFile';
import {TemplateFile} from './TemplateFile';

/**
 * @class A class.
 * @since 0.2.0
 */
export class FileGenerator {
    private contentFile: ContentFile;
    private templateFIle: TemplateFile;

    constructor(contentFile: ContentFile, templateFIle: TemplateFile) {
        this.contentFile = contentFile;
        this.templateFIle = templateFIle;
    }
}
