/**
 * @file File containing all generic File classes and interfaces
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
export class File {
    /**
     * Path in a file system that will be appended to the relative path
     * @since 0.2.0
     */
    private rootPath: string;

    /**
     * Path relative to the root path specified above
     * @since 0.2.0
     */
    private relativePath: string[];

    /**
     * Name of the file, including extension
     * @since 0.2.0
     */
    private name: string;

    /**
     * The contents of the file
     * @since 0.2.0
     */
    private contents: string;

    /**
     * File constructor
     * @since 0.2.0
     */
    constructor(rootPath: string, relativePath: string[], name: string) {
        this.rootPath = rootPath;
        this.relativePath = relativePath;
        this.name = name;
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
        let relativePathString = path.join.apply(undefined, this.relativePath);
        return path.join(this.rootPath, relativePathString, this.name);
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
