/**
 * @file All interfaces and classes related to the generation of the map of the site
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as path from 'path';
import {Config, IConfigPage} from './Config';
import {SiteDirectory} from './files/SiteDirectory';
import {IChildDirectoryMap} from './files/GenericDirectory';
import {TemplateFile} from './files/TemplateFile';
import {ContentFile} from './files/ContentFile';
import {URLHelper} from './helpers/URLHelper';
import {StringHelper} from './helpers/StringHelper';
import {FileGenerator} from './files/FileGenerator';
import {file} from 'mock-fs';
import {SiteFile} from './files/SiteFile';

/**
 * @class Class responsible for building of the map relating the config and the file system to the site
 * @since 0.2.0
 */
export class MapBuilder {
    /**
     * Instance of the config used to generate the site
     * @since 0.2.0
     */
    private config: Config;

    /**
     * Folder in which `assets`, `content`, `templates`, etc. are located
     * @since 0.2.0
     */
    private projectRoot: string;

    private contentRoot: string;
    private templateRoot: string;

    /**
     * Folder in which the site will be generated
     * @since 0.2.0
     */
    private buildPath: string;

    /**
     * Map of the directories generated while the builder is running
     * @since 0.2.0
     */
    private directoryMap: IChildDirectoryMap;

    /**
     * MapBuilder constructor
     * @since 0.2.0
     */
    public constructor(config: Config, projectRoot: string, buildPath: string) {
        this.config = config;
        this.projectRoot = projectRoot;
        this.contentRoot = path.join(projectRoot, 'content');
        this.templateRoot = path.join(projectRoot, 'template');
        this.buildPath = buildPath;
        this.directoryMap = {};
    }

    public build() {
        this.directoryMap[''] = new SiteDirectory(this.buildPath);
        this.parsePages('', this.config.get().pages);
    }

    private parsePages(currentUri: string, pages: IConfigPage[]) {
        let pageCount = pages.length;
        for (let i = 0; i < pageCount; i++) {
            let page = pages[i];
            let contentFile;
            let templateFile;
            if (page.content) {
                contentFile = new ContentFile(this.contentRoot, page.content);
                contentFile.reload();
            }
            if (page.template) {
                let pageUri;
                if (page.uri && !URLHelper.empty(page.uri)) {
                    pageUri = URLHelper.trimSlashes(URLHelper.join(currentUri, page.uri));
                } else {
                    pageUri = URLHelper.trimSlashes(
                        URLHelper.join(currentUri, StringHelper.stripExtension(page.template))
                    );
                }
                let fileUri = this.fileFromUri(pageUri);
                templateFile = new TemplateFile(this.templateRoot, page.template);
                templateFile.reload();
                let fileGenerator = new FileGenerator(contentFile, templateFile);
                let siteFile = new SiteFile(
                    this.buildPath,
                    URLHelper.split(path.dirname(fileUri)),
                    path.basename(fileUri),
                    fileGenerator
                );
            }
        }
    }

    private getDirectory(uri: string): SiteDirectory {
        let strippedUri = URLHelper.trimSlashes(uri);
        if (!this.directoryMap[strippedUri]) {
            this.directoryMap[''] = new SiteDirectory(this.buildPath);
        }

    }

    private fileFromUri(uri: string) {
        return URLHelper.fileFromUri(uri, this.config.get().explicit_html_extensions);
    }
}
