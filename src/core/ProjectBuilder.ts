/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

import {ProjectSettings} from '../components/ProjectSettings';
import {IConfigPage, IConfig} from '../components/Config';
import {URLHelper} from '../helpers/URLHelper';
import {PathHelper} from '../helpers/PathHelper';

const DEFAULT_PAGE_EXTENSION = '.html';
const DEFAULT_INDEX_PAGE = 'index' + DEFAULT_PAGE_EXTENSION;

export class ProjectBuilder {

    private settings: ProjectSettings;
    private config: IConfig;

    constructor(projectSettings: ProjectSettings) {
        this.settings = projectSettings;
        this.config = this.settings.config.get();
    }

    public build() {
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
        let relativePagePathArray = this.determinePagePathArray(relativeUriArray);
        let pageUri = this.determineUri(relativePagePathArray);
        let fullPagePath = PathHelper.join(this.settings.buildPath, currentPath, relativePagePathArray);

        // TODO: Recursively prepare pages/directories

        let contentFile

        console.log(fullPagePath);
        console.log(pageUri);

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

    private determineUri(pagePathArray: string[]): string {
        let array = pagePathArray.slice(0);
        let lastIndex = array.length - 1;
        if (array[lastIndex] === DEFAULT_INDEX_PAGE
            && !this.config.explicit_html_extensions) {
            array.pop();
        }
        return URLHelper.join(array);
    }

}
