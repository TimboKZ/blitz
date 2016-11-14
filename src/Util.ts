/**
 * @file Utility classes and interfaces for Blitz.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import * as yaml from 'js-yaml';
import * as marked from 'marked';
import * as fs from 'fs';
import * as path from 'path';
import * as colors from 'colors';

/**
 * @class Utility class for Blitz.
 * @since 0.0.1
 */
export class Util {
    /**
     * Logs an object to console prefixing it with the specified string.
     * @since 0.0.1
     */
    public static logWithPrefix(prefix: string, object: any) {
        console.log(prefix + ' ' + object.toString());
    }

    /**
     * Logs data into console
     * @since 0.0.1
     */
    public static log(object: any) {
        Util.logWithPrefix(colors.cyan('[Blitz LOG]'), object);
    }

    /**
     * Logs error data into console
     * @since 0.0.1
     */
    public static error(object: any) {
        Util.logWithPrefix(colors.red('[Blitz ERROR]'), object);
    }

    /**
     * Print out the error as is
     * @since 0.0.1
     */
    public static stackTrace(object: any) {
        console.log(object);
    }

    /**
     * Logs debug data into console
     * @since 0.0.1
     */
    public static debug(object: any) {
        if (global.debug) {
            Util.logWithPrefix(colors.yellow('[Blitz DEBUG]'), object);
        }
    }

    /**
     * Produces an object from YAML string if possible, returns undefined otherwise.
     * @since 0.1.2 Returns empty object for files that only have whitespace
     * @since 0.0.1
     */
    public static parseYaml(yamlString: string): any {
        Util.debug('Parsing  YAML...');
        yamlString = yamlString.replace(/^\s+|\s+$/g, '');
        if (yamlString === '') {
            return {};
        }
        let parsedYaml: any;
        try {
            parsedYaml = yaml.safeLoad(yamlString);
        } catch (e) {
            Util.error('Error parsing YAML!');
            Util.stackTrace(e);
            return undefined;
        }
        return parsedYaml;
    }

    /**
     * Converts Markdown into HTML
     * @since 0.0.1
     */
    public static parseMarkdown(markdown: string): string {
        return marked(markdown);
    }

    /**
     * Checks that a directory or a file exists
     * @since 0.0.1
     */
    public static pathExists(path: string): boolean {
        try {
            // TODO: Add mode to `accessSync()`
            fs.accessSync(path);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Creates folders with names identical to that in the array, and uses the last element in the array as the file
     * name to which the contents will be written.
     * @since 0.0.1
     */
    public static writeFileFromArray(basePath: string, array: string[], contents: string): boolean {
        if (array.length === 0) {
            Util.error('Cannot write file from an empty array!');
            console.trace();
            return false;
        }
        let currentPath = basePath;
        let count = array.length;
        for (let i = 0; i < count - 1; i++) {
            currentPath = path.join(currentPath, array[i]);
            if (!Util.createDirectory(currentPath)) {
                return false;
            }
        }
        try {
            fs.writeFileSync(path.join(currentPath, array[count - 1]), contents);
        } catch (e) {
            Util.error('Error writing to `' + basePath + '`!');
            Util.stackTrace(e);
            return false;
        }
        return true;
    }

    /**
     * Loads file from the specified path if possible, returns undefined otherwise
     * @since 0.0.1
     */
    public static getFileContents(filePath: string): string {
        let fileContents: string;
        Util.debug('Reading contents of `' + filePath + '`...');
        try {
            fileContents = fs.readFileSync(filePath, 'utf8');
        } catch (e) {
            Util.error('Error reading `' + filePath + '`. Are you sure it exists?');
            Util.stackTrace(e);
            return undefined;
        }
        return fileContents;
    }

    /**
     * Creates a directory if it doesn't exist
     * @since 0.0.1
     */
    public static createDirectory(directoryPath: string): boolean {
        try {
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath);
            }
            return true;
        } catch (e) {
            Util.error('Error creating directory `' + directoryPath + '`.');
            Util.stackTrace(e);
            return false;
        }
    }

    /**
     * Recursively removes a directory if it exists
     * @since 0.0.1
     */
    public static removeDirectory(directoryPath: string): boolean {
        let files = [];
        try {
            if (fs.existsSync(directoryPath)) {
                files = fs.readdirSync(directoryPath);
                files.forEach((file) => {
                    let currentPath = path.join(directoryPath, file);
                    if (fs.lstatSync(currentPath).isDirectory()) {
                        Util.removeDirectory(currentPath);
                    } else {
                        fs.unlinkSync(currentPath);
                    }
                });
                fs.rmdirSync(directoryPath);
            }
        } catch (e) {
            Util.error('Could not recursively remove a directory!');
            Util.stackTrace(e);
            return false;
        }
        return true;
    }

    /**
     * Removes all consequent leading and trailing forward slashes
     * @since 0.0.1
     */
    public static stripSlashes(stringWithSlashes: string): string {
        stringWithSlashes = stringWithSlashes.replace(new RegExp('^/*'), '');
        stringWithSlashes = stringWithSlashes.replace(new RegExp('/*$'), '');
        return stringWithSlashes;
    }

    /**
     * Breaks a URI down into components
     * @since 0.0.1
     */
    public static getUriComponents(uri: string): string[] {
        let strippedUri = Util.stripSlashes(uri);
        let components = strippedUri.split('/');
        if (components[0] === '') {
            return [];
        }
        return components;
    }

    /**
     * Extracts the filename from path, removing the extension
     * @since 0.0.1
     */
    public static extractFileName(filePath: string) {
        return path.basename(filePath).replace(/\.[^/.]+$/, '');
    }

    /**
     *
     * @since 0.1.0
     */
    public static generateRandomString(length: number): string {
        let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
        return result;
    }
}

