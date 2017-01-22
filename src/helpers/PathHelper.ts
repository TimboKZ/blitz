/**
 * @file Helper functions for filesystem paths with are not found in the native `path` module
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

import * as path from 'path';

export class PathHelper {

    public static join(...parts: any[]): string {
        let pathParts = [];
        for (let i = 0; i < parts.length; i++) {
            let object = parts[i];
            if (typeof object === 'string') {
                pathParts.push(object);
            } else {
                pathParts.push(PathHelper.join.apply(undefined, object));
            }
        }
        return path.join.apply(undefined, pathParts);
    }

    public static stripExtension(path: string): string {
        return path.replace(/\.[^.\/\\]*$/, '');
    }

}
