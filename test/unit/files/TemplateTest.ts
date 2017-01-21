/**
 * @file Template tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as pug from 'pug';
import {assert} from 'chai';
import {Template} from '../../../src/components/Template';
import {ISiteMenuMap} from '../../../src/components/Menu';

describe('Template', () => {
    describe('#prepare()', () => {
        it('extracts IDs correctly', () => {
            let template = new Template();
            let templateString = '-- url(\'hello\')\n-- url(\'world\')\n-- url()';
            template.prepare(templateString, {}, {});
            assert.deepEqual(template.getIds(), ['hello', 'world']);
        });
        it('extracts assets correctly', () => {
            let template = new Template();
            let templateString = '-- asset(\'style.css\')\n-- asset(\'world.js\')';
            template.prepare(templateString, {}, {});
            assert.deepEqual(template.getAssets(), ['style.css', 'world.js']);
        });
        it('extracts menus correctly', () => {
            let template = new Template();
            let templateString = 'each value in menus.main\n  p= value';
            templateString += '\neach value in menus.secondary\n  p= value';
            let menusObject: ISiteMenuMap = {
                main: [],
                secondary: [],
            };
            template.prepare(templateString, {}, menusObject);
            assert.deepEqual(template.getMenus(), ['main', 'secondary']);
        });
    });
    describe('#generate()', () => {
        it('throws an error if nothing was prepared', () => {
            let template = new Template();
            assert.throws(() => template.generate());
        });
        it('generates HTML string correctly', () => {
            let template = new Template();
            let templateString = 'p Hello World!';
            template.prepare(templateString, {}, {});
            assert.equal(template.generate(), pug.render(templateString));
        });
    });
});
