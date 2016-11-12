"use strict";
var chai_1 = require('chai');
var Util_1 = require('../src/Util');
describe('Util', function () {
    describe('#stripSlashes()', function () {
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
});
