/**
 * @file File containing everything related to content parsing
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.2
 */

import {Util} from './Util';

/**
 * @class Collection of static methods for content parsing
 * @since 0.0.1
 */
export class ContentParser {
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
     * Loads content of the supplied file and pipes it into `Util.parse()`
     * @since 0.0.2
     */
    public static parseFile(path: string): any {
        let fileContents = Util.getFileContents(path);
        if (!fileContents) {
            Util.error('Could not load the specified file for parsing!');
            return undefined;
        }
        return ContentParser.parse(fileContents);
    }
}
