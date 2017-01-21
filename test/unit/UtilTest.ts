/**
 * @file Util class tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import {assert} from 'chai';
import {Util} from '../../src/helpers/Util';

describe('Util', () => {
    describe('#stripSlashes()', () => {
        it('should return empty string if the string was initially empty', () => {
            assert.strictEqual(Util.stripSlashes(''), '');
        });
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
    describe('#getUriComponents()', () => {
        it('should return components correctly without surrounding slashes', () => {
            assert.deepEqual(Util.getUriComponents('hello/hello'), ['hello', 'hello']);
        });
        it('should return components correctly with a single leading slash', () => {
            assert.deepEqual(Util.getUriComponents('/hello/hello'), ['hello', 'hello']);
        });
        it('should return components correctly with multiple leading slashes', () => {
            assert.deepEqual(Util.getUriComponents('/////hello/hello'), ['hello', 'hello']);
        });
        it('should return components correctly with an empty string', () => {
            assert.deepEqual(Util.getUriComponents(''), []);
        });
    });
    describe('#extractFileName()', () => {
        it('should return string unchanged if it has no extension', () => {
            assert.equal(Util.extractFileName('hello'), 'hello');
        });
        it('should remove leading directories string unchanged if it has no extension', () => {
            assert.equal(Util.extractFileName('test/hello'), 'hello');
        });
        it('should remove leading directories string and extension', () => {
            assert.equal(Util.extractFileName('test/hello.test'), 'hello');
        });
        it('should remove only one extension', () => {
            assert.equal(Util.extractFileName('test/hello.qwe.test'), 'hello.qwe');
        });
    });
});
