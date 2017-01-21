/**
 * @file Contains code related Content File parsing
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as fm from 'front-matter';
import * as deepEqual from 'deep-equal';
import * as deepDiff from 'deep-diff';
import {Logger} from '../Logger';
import {GenericFile} from './GenericFile';
import {Content} from './Content';
import {ContentParser} from '../ContentParser';
import {IAssetPathGenerator, IUrlGenerator} from '../SiteGenerator';

/**
 * Attributes defined in the front matter of a content file
 * @since 0.2.0
 */
export interface IContentFileAttributes {
    [key: string]: any;
}

/**
 *
 * @since 0.2.0
 */
export interface IContentFileChanges {
    attributes: deepDiff.IDiff[];
    content: {
        ids: string[],
        assets: string[],
        generator: (urlGenerator: IUrlGenerator,
                    assetPathGenerator: IAssetPathGenerator,
                    contentParser: ContentParser) => string,
    };
}

/**
 * @class File responsible for representing content files
 * @since 0.2.0
 */
export class ContentFile extends GenericFile {
    /**
     * @since 0.2.0
     */
    private relativePath: string;

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
    public constructor(rootPath: string, relativePath: string) {
        super(rootPath, [], relativePath);
        this.relativePath = relativePath;
        this.attributes = {};
        this.content = new Content();
    }

    /**
     * Reloads the contents of the file and processes any changes
     * @since 0.2.0
     */
    public reload(): IContentFileChanges {
        let changes: any = {};
        let tempContents = this.contents;
        this.read();
        if (tempContents === this.contents) {
            return changes;
        }
        let contentsObject = fm(this.contents);
        if (!deepEqual(this.attributes, contentsObject.attributes)) {
            changes.attributes = deepDiff.diff(this.attributes, contentsObject.attributes);
            this.attributes = contentsObject.attributes;
        }
        if (this.rawContent !== contentsObject.body) {
            this.rawContent = contentsObject.body;
            this.content.prepare(this.rawContent);
            changes.content = {};
            changes.content.ids = this.content.getIds();
            changes.content.assets = this.content.getAssets();
            changes.content.generator = this.content.generate;
        }
        return changes as IContentFileChanges;
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
