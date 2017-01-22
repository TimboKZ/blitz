/**
 * @file A TypeScript file.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 */

import {GenericFile} from './GenericFile';
import {TemplateFile} from './TemplateFile';
import {ContentFile} from './ContentFile';
import {IUrlGenerator, IAssetPathGenerator} from '../core/ProjectBuilder';
import {ISiteMenuMap} from '../components/Menu';

export interface IBlitzPageLocals {
    url: IUrlGenerator;
    asset: IAssetPathGenerator;
    child_pages: any[];
    menus: ISiteMenuMap;
    hash: string;
    site_url: string;
    site_root: string;
}

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
