/**
 * @file Utility classes and interfaces for Blitz.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.5
 */

import * as yaml from 'js-yaml';
import * as marked from 'marked';
import * as fs from 'fs';
import * as colors from 'colors';

/**
 * @class Utility class for Blitz.
 * @since 0.0.1
 */
export class Util {
    /**
     * Logs an object to console prefixing it with the specified string.
     * @since 0.0.5
     */
    public static logWithPrefix(prefix: string, object: any) {
        console.log(prefix + ' ' + object.toString());
    }

    /**
     * Logs data into console
     * @since 0.0.5 Now uses `logWithPrefix()` and `colors`
     * @since 0.0.1
     */
    public static log(object: any) {
        Util.logWithPrefix(colors.cyan('[Blitz LOG]'), object);
    }

    /**
     * Logs error data into console
     * @since 0.0.5 Now uses `logWithPrefix()` and `colors`
     * @since 0.0.2
     */
    public static error(object: any) {
        Util.logWithPrefix(colors.red('[Blitz ERROR]'), object);
    }

    /**
     * Print out the error as is
     * @since 0.0.5
     */
    public static stackTrace(object: any) {
        console.log(object);
    }

    /**
     * Logs debug data into console
     * @since 0.0.5 Now uses `logWithPrefix()` and `colors`
     * @since 0.0.1
     */
    public static debug(object: any) {
        if (global.debug) {
            Util.logWithPrefix(colors.yellow('[Blitz DEBUG]'), object);
        }
    }

    /**
     * Produces an object from YAML string if possible, returns undefined otherwise.
     * @since 0.0.2
     */
    public static parseYaml(yamlString: string): any {
        Util.debug('Parsing  YAML...');
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
     * @since 0.0.2
     */
    public static parseMarkdown(markdown: string): string {
        return marked(markdown);
    }

    /**
     * Loads file from the specified path if possible, returns undefined otherwise
     * @since 0.0.3
     */
    public static getFileContents(path: string): string {
        let fileContents: string;
        Util.debug('Reading contents of `' + path + '`...');
        try {
            fileContents = fs.readFileSync(path, 'utf8');
        } catch (e) {
            Util.error('Error reading `' + path + '`. Are you sure it exists?');
            Util.stackTrace(e);
            return undefined;
        }
        return fileContents;
    }

    /**
     * Creates a directory if it doesn't exist
     * @since 0.0.4
     */
    public static createDirectory(path: string): boolean {
        try {
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            return true;
        } catch (e) {
            Util.error('Error creating directory `' + path + '`.');
            Util.stackTrace(e);
            return false;
        }
    }

    /**
     * Removes all consequent leading and trailing forward slashes
     * @since 0.0.4
     */
    public static stripSlashes(stringWithSlashes: string): string {
        stringWithSlashes = stringWithSlashes.replace(new RegExp('^/*'), '');
        stringWithSlashes = stringWithSlashes.replace(new RegExp('/*$'), '');
        return stringWithSlashes;
    }
}

