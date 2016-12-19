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
export interface IChildFileMap {
    [fileName: string]: GenericFile;
}

/**
 * Interface for a map of child directories
 * @since 0.2.0
 */
export interface IChildDirectoryMap {
    [directoryName: string]: GenericDirectory;
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
     * Path relative to the root path specified above, excluding the name of the directory
     * @since 0.2.0
     */
    protected relativePath: string[];

    /**
     * Name of the directory
     * @since 0.2.0
     */
    protected name: string;

    /**
     * Full path to the directory
     * @since 0.2.0
     */
    protected fullPath: string;

    /**
     * Files in the directory
     * @since 0.2.0
     */
    protected files: IChildFileMap;

    /**
     * Child directories
     * @since 0.2.0
     */
    protected directories: IChildDirectoryMap;

    /**
     * GenericFile constructor
     * @since 0.2.0
     */
    constructor(rootPath: string,
                relativePath: string[] = [],
                name: string = '',
                files: IChildFileMap = {},
                directories: IChildDirectoryMap = {}) {
        this.rootPath = rootPath;
        this.relativePath = relativePath;
        this.name = name;
        let relativePathString = path.join.apply(undefined, this.relativePath);
        this.fullPath = path.join(this.rootPath, relativePathString, this.name);
        this.files = files;
        this.directories = directories;
    }

    /**
     * @since 0.2.0
     */
    public addFile(file: GenericFile) {
        this.files[file.getName()] = file;
    }

    /**
     * @since 0.2.0
     */
    public removeFile(fileName: string) {
        if (this.files[fileName]) {
            delete this.files[fileName];
        }
    }

    /**
     * @since 0.2.0
     */
    public addDirectory(directory: GenericDirectory) {
        this.directories[directory.getName()] = directory;
    }

    /**
     * @since 0.2.0
     */
    public removeDirectory(directoryName: string) {
        if (this.directories[directoryName]) {
            delete this.directories[directoryName];
        }
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
}
