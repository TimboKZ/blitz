/**
 * @file Util class tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.1
 */

import {assert} from 'chai';
import {Util} from '../src/Util';

describe('Util', () => {
    describe('#stripSlashes()', () => {
        it('should return string unchanged if there are no slashes surrounding it', () => {
            assert.strictEqual(Util.stripSlashes('hello/hello'), 'hello/hello');
        });
        it('should correctly remove single trailing slash', () => {
            assert.strictEqual(Util.stripSlashes('hello/hello/'), 'hello/hello');
        });
        it('should correctly remove multiple trailing slashes', () => {
            assert.strictEqual(Util.stripSlashes('hello/hello////'), 'hello/hello');
        });
        it('should correctly remove single leading slash', () => {
            assert.strictEqual(Util.stripSlashes('/hello/hello'), 'hello/hello');
        });
        it('should correctly remove multiple leading slashes', () => {
            assert.strictEqual(Util.stripSlashes('//////hello/hello'), 'hello/hello');
        });
        it('should return empty string if there initially only slashes', () => {
            assert.strictEqual(Util.stripSlashes('/////'), '');
        });
        it('should correctly remove multiple leading and trailing slashes', () => {
            assert.strictEqual(Util.stripSlashes('//////hello/hello////'), 'hello/hello');
            assert.strictEqual(Util.stripSlashes('//////hello/hello/'), 'hello/hello');
            assert.strictEqual(Util.stripSlashes('/hello/hello/////'), 'hello/hello');
            assert.strictEqual(Util.stripSlashes('/hello/hello/'), 'hello/hello');
        });
    });
});
