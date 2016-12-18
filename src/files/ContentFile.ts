/**
 * @file Contains code related Content File parsing
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as fm from 'front-matter';
import * as deepEqual from 'deep-equal';
import {Logger} from '../Logger';
import {GenericFile, IReloadable} from './GenericFile';
import {Content} from './Content';

export interface IContentFileAttributes {
    [key: string]: any;
}

/**
 * @class File responsible for representing content files
 * @since 0.2.0
 */
export class ContentFile extends GenericFile implements IReloadable {
    /**
     * Attributes extracted from the front matter
     * @since 0.2.0
     */
    private attributes: IContentFileAttributes;

    /**
     * Raw content of a content file (everything except the front matter)
     * @since 0.2.0
     */
    private rawContent: string;

    /**
     * Processed content
     * @since 0.2.0
     */
    private content: Content;

    /**
     * ContentFile constructor
     * @since 0.2.0
     */
    public constructor(rootPath: string, relativePath: string[], name: string) {
        super(rootPath, relativePath, name);
        this.attributes = {};
        this.content = new Content();
    }

    /**
     * Reloads the contents of the file and processes any changes
     * @since 0.2.0
     */
    public reload() {
        let tempContents = this.contents;
        this.read();
        if (tempContents === this.contents) {
            return;
        }
        let contentsObject = fm(this.contents);
        if (!deepEqual(this.attributes, contentsObject.attributes)) {
            // TODO: Process changes
        }
        if (this.rawContent !== contentsObject.body) {
            this.rawContent = contentsObject.body;
            this.content.prepare(contentsObject.body);
            // TODO: Process changes
        }
    }

    /**
     * Throws an error because content files should not be written to
     * @since 0.2.0
     */
    public write() {
        throw new Error('Attempted to write to a content file `' + Logger.brand(this.name) + '`. This is not allowed!');
    }

    /**
     * @since 0.2.0
     */
    public getAttributes(): IContentFileAttributes {
        return this.attributes;
    }

    /**
     * @since 0.2.0
     */
    public getContent(): Content {
        return this.content;
    }
}
