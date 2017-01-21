/**
 * @file A TypeScript file.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import {FileGenerator} from './FileGenerator';
import {GenericFile} from './GenericFile';
import {Logger} from '../cli/Logger';

/**
 * @class A class.
 * @since 0.2.0
 */
export class SiteFile extends GenericFile {
    private generator: FileGenerator;

    constructor(rootPath: string, relativePath: string[], name: string, generator: FileGenerator) {
        super(rootPath, relativePath, name);
        this.generator = generator;
    }

    public read() {
        throw new Error('Attempted to read from a site file `' + Logger.brand(this.name) + '`. This is not allowed!');
    }
}
