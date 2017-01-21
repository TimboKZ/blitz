/**
 * @file Various utility functions related to strings
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

/**
 * @class Collection of static methods for common operations with strings
 * @since 0.2.0
 */
export class StringHelper {
    /**
     * Checks if an object is a string
     * @since 0.2.0
     */
    public static isString(object: any): boolean {
        return typeof object === 'string';
    }

    /**
     * Generates a random string of the specified length
     * @since 0.2.0
     */
    public static random(length: number): string {
        let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
        return result;
    }

    /**
     * Return as-is if the object is a string, stringify as JSON otherwise
     * @since 0.2.0
     */
    public static stringify(object: any): string {
        if (StringHelper.isString(object)) {
            return object;
        }
        return JSON.stringify(object);
    }

    /**
     * Checks if the string contains anything
     * @since 0.2.0
     */
    public static empty(str: string) {
        return str === undefined || str === null || str === ''; // tslint:disable-line:no-null-keyword
    }

    /**
     * Removes file extension from the file
     * @since 0.2.0
     */
    public static stripExtension(path: string) {
        return path.replace(/\.[^.]*$/g, '');
    }
}
