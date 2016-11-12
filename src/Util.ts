/**
 * @file Utility classes and interfaces for Blitz.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.2
 */

import * as yaml from 'js-yaml';
import * as marked from 'marked';
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
     * Logs error data into console
     * @since 0.0.2
     */
    public static error(object: any) {
        console.log(object);
    }

    /**
     * Logs debug data into console
     * @since 0.0.1
     */
    public static debug(object: any) {
        if (global.debug) {
            console.log(object);
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
            Util.error(e);
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
}

