/**
 * @file A TypeScript file.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import {SiteFileGenerator} from './SiteFileGenerator';
import {GenericFile} from './GenericFile';

/**
 * @class A class.
 * @since 0.2.0
 */
export class SiteFile extends GenericFile {
    private generator: SiteFileGenerator;

    constructor(path: string, generator: SiteFileGenerator) {
        super(path);
        this.generator = generator;
    }

    public read() {
        throw new Error('Attempted to read from a site file. This is not allowed!');
    }
}
