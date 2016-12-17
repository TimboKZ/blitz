/**
 * @file A TypeScript file.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {IAssetPathGenerator, IUrlGenerator, ContentParser} from './SiteGenerator';
import {StringHelper} from './helpers/StringHelper';

/**
 * Interface for functions in the content
 * @since 0.2.0
 */
export interface ContentFunctionMap {
    [token: string]: string;
}

/**
 * @class Data type for the processed content of a Blitz content file
 * @since 0.2.0
 */
export class Content {
    /**
     * Content string as found in the content file
     * @since 0.2.0
     */
    private preparedContent: string;

    /**
     * Maps of URL and Asset functions with their parameters
     * @since 0.2.0
     */
    private urlFunctionMap: ContentFunctionMap;
    private assetFunctionMap: ContentFunctionMap;

    /**
     * Arrays of IDs and assets referenced in the content
     * @since 0.2.0
     */
    private ids: string[];
    private assets: string[];

    /**
     * Extracts functions from the raw content string and replaces them with tokens
     * @since 0.2.0
     */
    public prepare(rawContent: string) {

        this.urlFunctionMap = {};
        this.assetFunctionMap = {};
        this.ids = [];
        this.assets = [];

        let preparedContent = this.parseFunction(rawContent, 'url', this.urlFunctionMap, this.ids);
        preparedContent = this.parseFunction(preparedContent, 'asset', this.assetFunctionMap, this.assets);
        this.preparedContent = preparedContent;
    }

    /**
     * Extracts function from a content string
     * @since 0.2.0
     */
    public parseFunction(content: string, functionName: string, map: ContentFunctionMap, values: string[]): string {
        let regex = new RegExp('\\\\?\\$\{' + functionName + '(\|((?!}).)*)?}', 'gi');
        return content.replace(regex, (match) => {
            if (match.substr(0, 1) === '\\') {
                return match.substr(1);
            }
            let token = '<%' + functionName + '-' + StringHelper.random(6) + '%>';
            if (match.substr(2 + functionName.length, 1) !== '|') {
                map[token] = undefined;
            } else {
                let parameter = match.substr(3 + functionName.length);
                parameter = parameter.substr(0, parameter.length - 1);
                values.push(parameter);
                map[token] = parameter;
            }
            return token;
        });
    }

    /**
     * Takes partially applied generators and generates the page content
     * @since 0.2.0
     */
    public generate(urlGenerator: IUrlGenerator,
                    assetPathGenerator: IAssetPathGenerator,
                    contentParser: ContentParser): string {
        if (this.preparedContent === undefined) {
            throw new Error('Cannot generate content with nothing prepared!');
        }
        let content = this.preparedContent;
        for (let urlToken in this.urlFunctionMap) {
            if (this.urlFunctionMap.hasOwnProperty(urlToken)) {
                content = content.replace(urlToken, urlGenerator(this.urlFunctionMap[urlToken]));
            }
        }
        for (let assetToken in this.assetFunctionMap) {
            if (this.assetFunctionMap.hasOwnProperty(assetToken)) {
                content = content.replace(assetToken, assetPathGenerator(this.assetFunctionMap[assetToken]));
            }
        }
        return contentParser(content);
    }

    /**
     * @since 0.2.0
     */
    public getIds(): string[] {
        return this.ids;
    }

    /**
     * @since 0.2.0
     */
    public getAssets(): string[] {
        return this.assets;
    }
}
