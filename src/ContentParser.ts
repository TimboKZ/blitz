/**
 * @file File containing everything related to content parsing
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import * as fs from 'fs';
import * as path from 'path';
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
 * Interfaces for processed data
 * @since 0.1.2 Added `IProcessedContent`
 * @since 0.0.1
 */
export interface IProcessedContent {
    title?: string;
    content: string;
    [key: string]: any;
}
export interface IProcessedFileContent extends IProcessedContent {
    file: string;
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
    private static directoryCache: IDirectoryContentCache = {};

    /**
     * Cache for the contents of a file
     * @since 0.0.1
     */
    private static fileCache: IFileContentCache = {};

    /**
     * Extracts front matter using the `front-matter` package and adds a `content` property
     *
     * If YAML extracted from front matter is a string, make it the `title`.
     *
     * @see https://github.com/jxson/front-matter
     * @since 0.1.2 Now uses `front-matter` package
     * @since 0.0.1
     */
    public static parse(content: string): IProcessedContent {
        let result;
        let parsedFrontMatter = fm(content);
        if (typeof parsedFrontMatter.attributes === 'string') {
            result = {
                title: parsedFrontMatter.attributes,
            };
        } else {
            result = parsedFrontMatter.attributes;
        }
        result.content = Util.parseMarkdown(parsedFrontMatter.body);
        return result;
    }

    /**
     * Loads content of the supplied file and pipes it into `Util.parse()` or returns from cache if possible.
     *
     * Adds a property called `file` to the raw data.
     *
     * @since 0.1.2 Removed try/catch blocks
     * @since 0.0.1
     */
    public static parseFile(filePath: string): IProcessedFileContent {
        if (this.fileCache[filePath] === undefined) {
            let fileContents = Util.getFileContents(filePath);
            let rawData = ContentParser.parse(fileContents);
            (rawData as IProcessedFileContent).file = path.basename(filePath);
            this.fileCache[filePath] = (rawData as IProcessedFileContent);
        }
        return this.fileCache[filePath];
    }

    /**
     * Loads content of a directory, as an array with an element for each file, or returns from cache if possible.
     *
     * This function is NOT recursive, i.e. it will NOT parse nested directories.
     *
     * @since 0.1.2 Removed try/catch blocks
     * @since 0.0.1
     */
    public static parseDirectory(directoryPath: string): IProcessedFileContent[] {
        if (this.directoryCache[directoryPath] === undefined) {
            let files = fs.readdirSync(directoryPath);
            let fileCount = files.length;
            let directoryData: any[] = [];
            for (let i = 0; i < fileCount; i++) {
                let filePath = path.join(directoryPath, files[i]);
                let fileStats = fs.lstatSync(filePath);
                if (fileStats.isFile()) {
                    let fileData = ContentParser.parseFile(filePath);
                    directoryData.push(fileData);
                }
            }
            this.directoryCache[directoryPath] = directoryData;
        }
        return this.directoryCache[directoryPath];
    }
}
