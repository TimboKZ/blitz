/**
 * @file File containing everything related to content parsing
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import * as fs from 'fs';
import * as path from 'path';
import * as objectAssign from 'object-assign';
import * as fm from 'front-matter';
import {Util} from './Util';

/**
 * Interface for content cache
 * @since 0.0.1
 */
export interface IDirectoryContentCache {
    [path: string]: IProcessedFileContent[];
}
export interface IFileContentCache {
    [path: string]: IProcessedFileContent;
}

/**
 * Interface for processed data
 * @since 0.0.1
 */
export interface IProcessedFileContent {
    file: string;
    content: string;
    [key: string]: any;
}

/**
 * @class Collection of static methods for content parsing
 * @since 0.0.1
 */
export class ContentParser {
    /**
     * Cache for the contents of a directory
     * @since 0.0.1
     */
    public static directoryCache: IDirectoryContentCache = {};

    /**
     * Cache for the contents of a file
     * @since 0.0.1
     */
    public static fileCache: IFileContentCache = {};

    /**
     * Extracts front matter using the `front-matter` package and adds a `content` property
     * @see https://github.com/jxson/front-matter
     * @since 0.1.2 Now uses `front-matter` package
     * @since 0.0.1
     */
    public static parse(content: string): any {

        let parsedPage = fm(content);

        let result = parsedPage.attributes;
        result.content = Util.parseMarkdown(parsedPage.body);

        return result;
    }

    /**
     * Loads content of the supplied file and pipes it into `Util.parse()` or returns from cache if possible.
     *
     * Adds a property called `file` to the raw data.
     *
     * @since 0.0.1
     */
    public static parseFile(filePath: string): IProcessedFileContent {
        if (!Util.pathExists(filePath)) {
            Util.error('Could not access `' + filePath + '`! Are you sure it exists?');
            return undefined;
        }
        if (this.fileCache[filePath] === undefined) {
            let fileContents = Util.getFileContents(filePath);
            if (!fileContents) {
                Util.error('Could not load the specified file for parsing!');
                return undefined;
            }
            let rawData = ContentParser.parse(fileContents);
            if (rawData === undefined) {
                Util.error('Could not parse file contents!');
                return undefined;
            }
            this.fileCache[filePath] = objectAssign({}, rawData, {file: path.basename(filePath)});
        }
        return this.fileCache[filePath];
    }

    /**
     * Loads content of a directory, as an array with an element for each file, or returns from cache if possible.
     *
     * This function is NOT recursive, i.e. it will parse nested directories.
     *
     * @since 0.0.1
     */
    public static parseDirectory(directoryPath: string): IProcessedFileContent[] {
        if (!Util.pathExists(directoryPath)) {
            Util.error('Could not access `' + path + '`! Are you sure it exists?');
            return undefined;
        }
        let files = fs.readdirSync(directoryPath);
        let fileCount = files.length;
        let directoryData: any[] = [];
        for (let i = 0; i < fileCount; i++) {
            let filePath = path.join(directoryPath, files[i]);
            let fileStats;
            try {
                fileStats = fs.lstatSync(filePath);
            } catch (e) {
                Util.error('Could not fetch stats for `' + filePath + '`!');
                Util.stackTrace(e);
                return undefined;
            }
            if (fileStats.isFile()) {
                let fileData = ContentParser.parseFile(filePath);
                if (fileData === undefined) {
                    Util.error('Could not parse content of one of the files in `' + directoryPath + '`!');
                    return undefined;
                }
                directoryData.push(fileData);
            }
        }
        return directoryData;
    }
}
