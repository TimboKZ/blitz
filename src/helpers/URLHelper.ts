/**
 * @file Various helper utilities related to URLs
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

/**
 * Extension appended to page files
 * @since 0.2.0
 */
export const PAGE_FILE_EXTENSION = '.html';

/**
 * Name of the file that will be considered the index, might change depending on server configuration
 * @since 0.2.0
 */
export const INDEX_FILE_NAME = 'index' + PAGE_FILE_EXTENSION;

/**
 * @class Collection of static methods for common operations with URLs
 * @since 0.2.0
 */
export class URLHelper {
    /**
     * Joins URI parts, much like `path.join()`
     * @since 0.2.0
     */
    public static join(...parts: string[]): string {
        return parts.join('/');
    }

    /**
     * Removes all trailing and leading slashes
     * @since 0.2.0
     */
    public static trimSlashes(url: string): string {
        url = url.replace(/^\/*/g, '');
        url = url.replace(/\/*$/g, '');
        return url;
    }

    /**
     * Breaks a URI down into componenets
     * @since 0.2.0
     */
    public static split(url: string): string[] {
        return URLHelper.trimSlashes(url).split('/');
    }

    /**
     * Checks if url is undefined or an empty string
     * @since 0.2.0
     */
    public static empty(url: string): boolean {
        return url === undefined || url === null || this.trimSlashes(url) === ''; // tslint:disable-line:no-null-keyword
    }

    /**
     * Takes a target URI and generates a filename from it
     * @since 0.2.0
     */
    public static fileFromUri(uri: string, explicitExtension: boolean) {
        let strippedUri = URLHelper.trimSlashes(uri);
        if (strippedUri === '') {
            return INDEX_FILE_NAME;
        }
        if (explicitExtension) {
            return strippedUri + PAGE_FILE_EXTENSION;
        }
        return URLHelper.join(strippedUri, INDEX_FILE_NAME);
    }
}
