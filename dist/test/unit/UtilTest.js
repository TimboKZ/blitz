"use strict";
var chai_1 = require('chai');
var Util_1 = require('../../src/Util');
describe('Util', function () {
    describe('#stripSlashes()', function () {
        it('should return empty string if the string was initially empty', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes(''), '');
        });
        it('should return string unchanged if there are no slashes surrounding it', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('hello/hello'), 'hello/hello');
        });
        it('should correctly remove single trailing slash', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('hello/hello/'), 'hello/hello');
        });
        it('should correctly remove multiple trailing slashes', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('hello/hello////'), 'hello/hello');
        });
        it('should correctly remove single leading slash', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('/hello/hello'), 'hello/hello');
        });
        it('should correctly remove multiple leading slashes', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('//////hello/hello'), 'hello/hello');
        });
        it('should return empty string if there initially only slashes', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('/////'), '');
        });
        it('should correctly remove multiple leading and trailing slashes', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('//////hello/hello////'), 'hello/hello');
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('//////hello/hello/'), 'hello/hello');
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('/hello/hello/////'), 'hello/hello');
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('/hello/hello/'), 'hello/hello');
        });
    });
    describe('#getUriComponents()', function () {
        it('should return components correctly without surrounding slashes', function () {
            chai_1.assert.deepEqual(Util_1.Util.getUriComponents('hello/hello'), ['hello', 'hello']);
        });
        it('should return components correctly with a single leading slash', function () {
            chai_1.assert.deepEqual(Util_1.Util.getUriComponents('/hello/hello'), ['hello', 'hello']);
        });
        it('should return components correctly with multiple leading slashes', function () {
            chai_1.assert.deepEqual(Util_1.Util.getUriComponents('/////hello/hello'), ['hello', 'hello']);
        });
        it('should return components correctly with an empty string', function () {
            chai_1.assert.deepEqual(Util_1.Util.getUriComponents(''), []);
        });
    });
    describe('#extractFileName()', function () {
        it('should return string unchanged if it has no extension', function () {
            chai_1.assert.equal(Util_1.Util.extractFileName('hello'), 'hello');
        });
        it('should remove leading directories string unchanged if it has no extension', function () {
            chai_1.assert.equal(Util_1.Util.extractFileName('test/hello'), 'hello');
        });
        it('should remove leading directories string and extension', function () {
            chai_1.assert.equal(Util_1.Util.extractFileName('test/hello.test'), 'hello');
        });
        it('should remove only one extension', function () {
            chai_1.assert.equal(Util_1.Util.extractFileName('test/hello.qwe.test'), 'hello.qwe');
        });
    });
});
