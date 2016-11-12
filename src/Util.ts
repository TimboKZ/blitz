/**
 * @file Utility classes and interfaces for Blitz.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.1
 */

import {args} from './blitz';

/**
 * @class Utility class for Blitz.
 * @since 0.0.1
 */
export class Util {
    /**
     * Logs data into console
     * @since 0.0.1
     */
    public static log(object: any) {
        console.log(object);
    }

    /**
     * Logs debug data into console
     * @since 0.0.1
     */
    public static debug(object: any) {
        if (args.debug) {
            console.log(object);
        }
    }
}

