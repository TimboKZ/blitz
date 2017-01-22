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

    public static randomString(length: number): string {
        let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
        return result;
    }

    public static endsWith(source: string, suffix: string): boolean {
        return source.indexOf(suffix, source.length - suffix.length) !== -1;
    }

    public static stringify(object: any): string {
        if (StringHelper.isString(object)) {
            return object;
        }
        return JSON.stringify(object);
    }

    public static isString(object: any): boolean {
        return typeof object === 'string';
    }

    public static isEmpty(str: string) {
        return str === undefined || str === null || str === ''; // tslint:disable-line:no-null-keyword
    }

}
