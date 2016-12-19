/**
 * @file Contains all generic File classes and interfaces
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as path from 'path';
import * as fse from 'fs-extra';
import {GenericFile} from './GenericFile';

/**
 * Interface for a map of files in the directory
 * @since 0.2.0
 */
export interface IDirectoryFileMap {
    [fileName: string]: GenericFile;
}

/**
 * @class A class.
 * @since 0.2.0
 */
export class GenericDirectory {
    /**
     * Path in a file system that will be appended to the relative path
     * @since 0.2.0
     */
    protected rootPath: string;

    /**
     * Path relative to the root path specified above
     * @since 0.2.0
     */
    protected relativePath: string[];

    /**
     * Full path to the directory
     * @since 0.2.0
     */
    protected fullPath: string;

    /**
     * Files in the directory
     * @since 0.2.0
     */
    protected files: IDirectoryFileMap;

    /**
     * GenericFile constructor
     * @since 0.2.0
     */
    constructor(rootPath: string, relativePath: string[], files: IDirectoryFileMap = {}) {
        this.rootPath = rootPath;
        this.relativePath = relativePath;
        let relativePathString = path.join.apply(undefined, this.relativePath);
        this.fullPath = path.join(this.rootPath, relativePathString);
        this.files = files;
    }

    /**
     * Returns full path to the file
     * @since 0.2.0
     */
    public getFullPath(): string {
        return this.fullPath;
    }
}
