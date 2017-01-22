/**
 * @file Contains all generic File classes and interfaces
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as path from 'path';
import * as fse from 'fs-extra';

/**
 * Specifies that the file is able to reload itself
 * @since 0.2.0
 */
export interface IReloadable {
    reload: () => void;
}

/**
 * @class A class.
 * @since 0.2.0
 */
export class GenericFile {
    /**
     * Full path to the file
     * @since 0.2.0
     */
    private _path: string;

    /**
     * The contents of the file
     * @since 0.2.0
     */
    private _contents: string;

    /**
     * GenericFile constructor
     * @since 0.2.0
     */
    constructor(path: string) {
        this._path = path;
    }

    /**
     * Reads file system to extract the contents of the file
     * @since 0.2.0
     */
    public read() {
        this._contents = fse.readFileSync(this._path, 'utf8');
    }

    /**
     * Writes a file to the file system
     * @since 0.2.0
     */
    public write() {
        fse.ensureDirSync(path.dirname(this._path));
        fse.writeFileSync(this._path, this._contents);
    }

    public get path(): string {
        return this._path;
    }

    public set path(value: string) {
        this._path = value;
    }

    public get contents(): string {
        return this._contents;
    }

    public set contents(value: string) {
        this._contents = value;
    }
}
