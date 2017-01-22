/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 */

import * as path from 'path';
import {assert} from 'chai';
import {PathHelper} from '../../../src/helpers/PathHelper';

describe('PathHelper', () => {
    describe('#join()', () => {
        it('identical to `path.join` for multiple strings', () => {
            assert.equal(PathHelper.join('hello', 'world'), path.join('hello', 'world'));
        });
        it('correctly joins arrays', () => {
            assert.equal(PathHelper.join(['hello', 'world']), path.join('hello', 'world'));
        });
        it('correctly joins arrays and string', () => {
            assert.equal(PathHelper.join(['hello', 'world'], 'wooo'), path.join('hello', 'world', 'wooo'));
        });
        it('correctly joins nested arrays', () => {
            assert.equal(PathHelper.join(['hello', ['world', 'wooo']]), path.join('hello', 'world', 'wooo'));
        });
    });
});
