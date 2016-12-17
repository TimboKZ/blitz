/**
 * @file Contains code related to data logging
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as colors from 'colors';
import {Util} from './Util';

/**
 * Log levels which change prefixes, conditions for logging and colours
 */
export enum LogLevel {
    Log,
    Warn,
    Error,
    Debug,
}

/**
 * @class Holds various static methods for logging of data into console
 * @since 0.2.0
 */
export class Logger {
    /**
     * Changes the color of supplied string to Blitz brand color
     * @since 0.2.0
     */
    public static brand(text: string): string {
        return colors.cyan(text);
    }

    /**
     * Logs an object to console prefixing it with the specified string.
     * @since 0.2.0
     */
    public static logWithPrefix(prefix: string, object: any, print: boolean = true): string|void {
        let logString = prefix + ' ' + object.toString();
        if (print) {
            return console.log(logString);
        }
        return logString;
    }

    /**
     * Logs a single object into console. Trims newline characters and indents all remaining new lines to the length
     * of the prefix.
     * @since 0.2.0
     */
    public static log(object: any, level: LogLevel = LogLevel.Log, print: boolean = true): string|void {
        if (level === LogLevel.Debug && !global.debug) {
            return;
        }
        if ((level === LogLevel.Log || level === LogLevel.Warn) && !global.verbose) {
            return;
        }
        let prefix;
        switch (level) {
            case LogLevel.Warn:
                prefix = colors.yellow('[Blitz WRN]');
                break;
            case LogLevel.Error:
                prefix = colors.red('[Blitz ERR]');
                break;
            case LogLevel.Debug:
                prefix = colors.magenta('[Blitz DBG]');
                break;
            default:
                prefix = Logger.brand('[Blitz LOG]');
        }
        if (Util.isString(object)) {
            object = object.replace(/\n/g, '\n' + (new Array(colors.strip(prefix).length + 2)).join(' '));
        }
        return Logger.logWithPrefix(prefix, object, print);
    }

    /**
     * Logs an array of objects to console
     * @since 0.2.0
     */
    public static logMany(objects: any[], level: LogLevel = LogLevel.Log) {
        for (let i = 0; i < objects.length; i++) {
            Logger.log(objects[i], level);
        }
    }

    /**
     * Strips leading and trailing newlines before splitting into substrings using newline as delimiter
     * @since 0.2.0
     */
    public static split(stringWithNewlines: string): string[] {
        stringWithNewlines = stringWithNewlines.replace(/^(\n)*/g, '');
        stringWithNewlines = stringWithNewlines.replace(/(\n)*$/g, '');
        return stringWithNewlines.split('\n');
    }
}
