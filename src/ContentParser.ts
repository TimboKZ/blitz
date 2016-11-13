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
     * Creates a YAML object from everything before the line containing `---`. Then, adds a property called `content`
     * to the newly created object and populates it with everything after `---` line, converted from Markdown into HTML.
     * @since 0.0.1
     */
    public static parse(content: string): any {
        // TODO: Find a more efficient alternative to the code below.
        let components = content.split(/---\r?\n/);
        let yamlString = components.shift();
        let markdownString = components.join('---\n');
        let yamlObject = Util.parseYaml(yamlString);
        let htmlContent = Util.parseMarkdown(markdownString);
        if (yamlObject === undefined) {
            Util.debug('Could not parse YAML extracted from content!');
            return undefined;
        }
        yamlObject.content = htmlContent;
        return yamlObject;
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
            this.fileCache[filePath] = objectAssign({}, rawData, { file: path.basename(filePath) });
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
