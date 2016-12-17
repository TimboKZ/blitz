/**
 * @file StringHelper tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import {assert} from 'chai';
import {StringHelper} from '../../../src/helpers/StringHelper';

describe('StringHelper', () => {
    describe('#isString()', () => {
        it('correctly identifies strings', () => {
            assert.isTrue(StringHelper.isString(''));
            assert.isTrue(StringHelper.isString('hello'));
        });
        it('correctly identifies non-string objects', () => {
            assert.isFalse(StringHelper.isString(null)); // tslint:disable-line:no-null-keyword
            assert.isFalse(StringHelper.isString(undefined));
            assert.isFalse(StringHelper.isString({}));
            assert.isFalse(StringHelper.isString([]));
        });
    });
    describe('#isString()', () => {
        it('generates strings of the right length', () => {
            assert.equal(StringHelper.random(5).length, 5);
            assert.equal(StringHelper.random(10).length, 10);
            assert.equal(StringHelper.random(15).length, 15);
        });
        it('generates different strings', () => {
            let first = StringHelper.random(8);
            let second = StringHelper.random(8);
            let third = StringHelper.random(8);
            assert.notEqual(first, second);
            assert.notEqual(first, third);
            assert.notEqual(second, third);
        });
    });
    describe('#stringify()', () => {
        it('leaves string untouched', () => {
            assert.equal(StringHelper.stringify(''), '');
            assert.equal(StringHelper.stringify('hello'), 'hello');
        });
        it('converts non-string objects to their JSON representation', () => {
            assert.equal(StringHelper.stringify(null), JSON.stringify(null)); // tslint:disable-line:no-null-keyword
            assert.equal(StringHelper.stringify({}), JSON.stringify({}));
            assert.equal(StringHelper.stringify(['hello']), JSON.stringify(['hello']));
        });
    });
    describe('#isEmpty()', () => {
        it('correctly identifies empty strings', () => {
            assert.isTrue(StringHelper.isEmpty(null)); // tslint:disable-line:no-null-keyword
            assert.isTrue(StringHelper.isEmpty(undefined));
            assert.isTrue(StringHelper.isEmpty(''));
        });
        it('correctly identifies non-empty strings', () => {
            assert.isFalse(StringHelper.isEmpty('hello'));
        });
    });
});
