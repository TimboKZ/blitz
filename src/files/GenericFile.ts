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
 * @class A class.
 * @since 0.2.0
 */
export class GenericFile {
    /**
     * Path in a file system that will be appended to the relative path
     * @since 0.2.0
     */
    protected rootPath: string;

    /**
     * Path relative to the root path specified above
     * @since 0.2.0
     */
    protected relativePathArray: string[];

    /**
     * Name of the file, including extension
     * @since 0.2.0
     */
    protected name: string;

    /**
     * Full path to the file
     * @since 0.2.0
     */
    protected fullPath: string;

    /**
     * The contents of the file
     * @since 0.2.0
     */
    protected contents: string;

    /**
     * GenericFile constructor
     * @since 0.2.0
     */
    constructor(rootPath: string, relativePath: string[], name: string) {
        this.rootPath = rootPath;
        this.relativePathArray = relativePath;
        this.name = name;
        let relativePathString = path.join.apply(undefined, this.relativePathArray);
        this.fullPath = path.join(this.rootPath, relativePathString, this.name);
    }

    /**
     * Reads file system to extract the contents of the file
     * @since 0.2.0
     */
    public read() {
        this.contents = fse.readFileSync(this.getFullPath(), 'utf8');
    }

    /**
     * Writes a file to the file system
     * @since 0.2.0
     */
    public write() {
        fse.writeFileSync(this.getFullPath(), this.contents);
    }

    /**
     * Returns full path to the file
     * @since 0.2.0
     */
    public getFullPath(): string {
        return this.fullPath;
    }

    /**
     * @since 0.2.0
     */
    public getName(): string {
        return this.name;
    }

    /**
     * @since 0.2.0
     */
    public getContents(): string {
        return this.contents;
    }

    /**
     * @since 0.2.0
     */
    public setContents(contents: string) {
        this.contents = contents;
    }
}
