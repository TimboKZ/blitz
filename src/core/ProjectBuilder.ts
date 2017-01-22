/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

import * as path from 'path';
import {ProjectSettings} from '../components/ProjectSettings';
import {IConfigPage, IConfig, IConfigMenu} from '../components/Config';
import {URLHelper} from '../helpers/URLHelper';
import {PathHelper} from '../helpers/PathHelper';
import {SiteFile, IBlitzPageLocals} from '../files/SiteFile';
import {TemplateFile} from '../files/TemplateFile';
import {AssetManager} from '../components/AssetManager';
import {ContentFile} from '../files/ContentFile';
import {StringHelper} from '../helpers/StringHelper';

const DEFAULT_PAGE_EXTENSION = '.html';
const DEFAULT_INDEX_PAGE = 'index' + DEFAULT_PAGE_EXTENSION;

export interface IUrlGenerator {
    (id: string): string;
}

export interface IAssetPathGenerator {
    (assetPath: string): string;
}

export interface IContentGenerator {
    (rawContent: string): string;
}

export class ProjectBuilder {

    private settings: ProjectSettings;
    private config: IConfig;

    constructor(projectSettings: ProjectSettings) {
        this.settings = projectSettings;
        this.config = this.settings.config.get();
    }

    public build() {
        let assetManager = new AssetManager(this.settings);
        assetManager.setupListeners();
        assetManager.copyAssets();
        this.preparePages(this.config.pages, []);
    }

    private preparePages(pages: IConfigPage[], currentPath: string[]) {
        let length = pages.length;
        for (let i = 0; i < length; i++) {
            this.preparePage(pages[i], currentPath);
        }
    }

    private preparePage(page: IConfigPage, currentPath: string[]) {
        let relativeUriArray = ProjectBuilder.extractRelativeUriArray(page);

        // TODO: Recursively prepare pages/directories

        let contentFile: ContentFile;

        if (page.content) {

            let contentPath = PathHelper.join(this.settings.contentPath, page.content);
            contentFile = new ContentFile(contentPath);
            contentFile.reload();

        }

        if (page.template) {

            let relativePagePathArray = this.determinePagePathArray(relativeUriArray);
            let relativeUrl = URLHelper.join(relativePagePathArray);
            let fullPagePath = PathHelper.join(this.settings.buildPath, currentPath, relativePagePathArray);

            let urlGenerator = URLHelper.prepareUrlGenerator(relativeUrl);

            for (let i = 0; i < page.menus.length; i++) {
                let menu = page.menus[i];
                let itemTitle = this.determineMenuItemTitle(menu, contentFile.getAttributes());
                if (itemTitle === undefined) {
                    itemTitle = path.basename(fullPagePath, DEFAULT_PAGE_EXTENSION);
                }
            }

            let locals: IBlitzPageLocals = {
                url: urlGenerator,
                asset: '',
                menus: {},
                hash: StringHelper.randomString(8),
                site_url: this.config.site_url,
                site_root: this.config.site_root,
            };

            let templatePath = PathHelper.join(this.settings.templatePath, page.template);
            let templateFile = new TemplateFile(templatePath);
            templateFile.reload();

            let siteFile = new SiteFile(fullPagePath, templateFile);
            siteFile.rebuild();
            siteFile.write();

        } else {

        }

    }

    private static extractRelativeUriArray(page: IConfigPage): string[] {
        let relativePathArray;
        if (page.uri !== undefined) {
            relativePathArray = URLHelper.split(page.uri);
        } else if (page.content !== undefined) {
            relativePathArray = URLHelper.split(PathHelper.stripExtension(page.content));
        } else if (page.template !== undefined) {
            relativePathArray = URLHelper.split(PathHelper.stripExtension(page.template));
        } else {
            throw new Error('Could not determine page path!');
        }
        return relativePathArray;
    }

    private determinePagePathArray(uriArray: string[]): string[] {
        let isIndex = uriArray.length === 0 || (uriArray.length === 1 && uriArray[0] === 'index');
        if (isIndex) {
            return [DEFAULT_INDEX_PAGE];
        }
        let lastIndex = uriArray.length - 1;
        if (this.config.explicit_html_extensions) {
            uriArray[lastIndex] = uriArray[lastIndex] + DEFAULT_PAGE_EXTENSION;
        } else {
            uriArray.push(DEFAULT_INDEX_PAGE);
        }
        return uriArray;
    }

    private determineMenuItemTitle(menu: IConfigMenu, contentAttributes: any): string {
        let title;
        if (menu.title_key && contentAttributes[menu.title_key]) {
            title = contentAttributes[menu.title_key];
        } else if (menu.title) {
            title = menu.title;
        } else if (contentAttributes.menu_title) {
            title = contentAttributes.menu_title;
        } else if (contentAttributes.title) {
            title = contentAttributes.title;
        }
        return title;
    }

}
