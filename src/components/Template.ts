/**
 * @file All code related to the represetntation of a template file
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as pug from 'pug';
import * as objectAssign from 'object-assign';
import {ISiteMenuMap} from './Menu';

/**
 * @class Wrapper around a specific templating engine, currently only Pug
 * @since 0.2.0
 *
 */
export class Template {
    /**
     * Compiled Pug template
     * @since 0.2.0
     */
    private compiledTemplate: (locals?: any) => string;

    /**
     * Arrays of IDs, assets and menus referenced in the template
     * @since 0.2.0
     */
    private ids: string[];
    private assets: string[];
    private menus: string[];

    /**
     * Extracts list of referenced IDs, assets and menus from the template after compiling it
     * @since 0.2.0
     */
    public prepare(templateString: string, locals: any, menus: ISiteMenuMap) {
        this.ids = [];
        this.assets = [];
        this.menus = [];

        this.compiledTemplate = pug.compile(templateString);
        this.extractIdsAndAssets(objectAssign({}, locals, {menus}));
        this.extractMenus(locals, menus);
    }

    /**
     * Extract IDs and assets from a compiled template using mock generators
     * @since 0.2.0
     */
    private extractIdsAndAssets(locals: any) {
        let extraLocals = {
            url: this.mockGenerator(this.ids),
            asset: this.mockGenerator(this.assets),
        };
        this.compiledTemplate(objectAssign({}, locals, extraLocals));
    }

    /**
     * Extracts menus referenced in the compiled template
     * @since 0.2.0
     */
    private extractMenus(locals: any, menus: ISiteMenuMap) {
        for (let menu in menus) {
            if (menus.hasOwnProperty(menu)) {
                let cutMenus = objectAssign({}, menus);
                cutMenus[menu] = undefined;
                try {
                    this.compiledTemplate(objectAssign({}, locals, {menus: cutMenus}));
                } catch (exception) {
                    this.menus.push(menu);
                }
            }
        }
    }

    /**
     * Returns a mock string generator that logs call parameters into an array
     * @since 0.2.0
     */
    private mockGenerator(logArray: string[]): (value?: string) => string {
        return (value?: string) => {
            if (value) {
                logArray.push(value);
            }
            return './some/path';
        };
    }

    /**
     * Generates a HTML page from the template
     * @since 0.2.0
     */
    public generate(locals?: any): string {
        if (this.compiledTemplate() === undefined) {
            throw new Error('Cannot generate a page from template with nothing prepared!');
        }
        return this.compiledTemplate(locals);
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

    /**
     * @since 0.2.0
     */
    public getMenus(): string[] {
        return this.menus;
    }
}
