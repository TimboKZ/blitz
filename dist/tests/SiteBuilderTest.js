"use strict";
var chai_1 = require('chai');
var SiteBuilder_1 = require('../src/SiteBuilder');
describe('SiteBuilder', function () {
    describe('#generateUrl()', function () {
        it('should work when absolute URLs => ENABLED and explicit HTML extensions => DISABLED, no site root', function () {
            var configMock = {
                absolute_urls: true,
                explicit_html_extensions: false,
            };
            var builder = new SiteBuilder_1.SiteBuilder(configMock, '', '');
            chai_1.assert.equal(builder.generateUrl(['index.html'], []), '/');
            chai_1.assert.equal(builder.generateUrl(['hello', 'index.html'], []), '/hello');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test.html'], []), '/hello/test.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], []), '/hello/test/test.html');
            chai_1.assert.equal(builder.generateUrl(['test.html'], []), '/test.html');
        });
        it('should work when absolute URLs => ENABLED and explicit HTML extensions => DISABLED, with site root', function () {
            var configMock = {
                site_root: 'test/root',
                absolute_urls: true,
                explicit_html_extensions: false,
            };
            var builder = new SiteBuilder_1.SiteBuilder(configMock, '', '');
            chai_1.assert.equal(builder.generateUrl(['index.html'], []), '/test/root');
            chai_1.assert.equal(builder.generateUrl(['hello', 'index.html'], []), '/test/root/hello');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test.html'], []), '/test/root/hello/test.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], []), '/test/root/hello/test/test.html');
            chai_1.assert.equal(builder.generateUrl(['test.html'], []), '/test/root/test.html');
        });
        it('should work when absolute URLs => ENABLED and explicit HTML extensions => ENABLED, with site root', function () {
            var configMock = {
                site_root: 'test/root',
                absolute_urls: true,
                explicit_html_extensions: true,
            };
            var builder = new SiteBuilder_1.SiteBuilder(configMock, '', '');
            chai_1.assert.equal(builder.generateUrl(['index.html'], []), '/test/root/index.html');
            chai_1.assert.equal(builder.generateUrl(['hello.html'], []), '/test/root/hello.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test.html'], []), '/test/root/hello/test.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], []), '/test/root/hello/test/test.html');
            chai_1.assert.equal(builder.generateUrl(['test.html'], []), '/test/root/test.html');
        });
        it('should work when absolute URLs => DISABLED and explicit HTML extensions => DISABLED', function () {
            var configMock = {
                absolute_urls: false,
                explicit_html_extensions: false,
            };
            var builder = new SiteBuilder_1.SiteBuilder(configMock, '', '');
            chai_1.assert.equal(builder.generateUrl(['index.html'], []), './');
            chai_1.assert.equal(builder.generateUrl(['hello', 'index.html'], []), './hello');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test.html'], []), './hello/test.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], []), './hello/test/test.html');
            chai_1.assert.equal(builder.generateUrl(['test.html'], []), './test.html');
        });
        it('should work with absolute URLs DISABLED, explicit HTML extensions ENABLED', function () {
            var configMock = {
                absolute_urls: false,
                explicit_html_extensions: true,
            };
            var builder = new SiteBuilder_1.SiteBuilder(configMock, '', '');
            chai_1.assert.equal(builder.generateUrl(['index.html'], []), './index.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'index.html'], []), './hello/index.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test.html'], []), './hello/test.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], []), './hello/test/test.html');
            chai_1.assert.equal(builder.generateUrl(['test.html'], []), './test.html');
        });
        it('should work when absolute URLs => DISABLED and explicit HTML extensions => DISABLED, non-root ', function () {
            var configMock = {
                absolute_urls: false,
                explicit_html_extensions: false,
            };
            var builder = new SiteBuilder_1.SiteBuilder(configMock, '', '');
            chai_1.assert.equal(builder.generateUrl(['index.html'], ['test', '123']), './../..');
            chai_1.assert.equal(builder.generateUrl(['hello', 'index.html'], ['test']), './../hello');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test.html'], ['hello', '123']), './../test.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], ['hello']), './test/test.html');
            chai_1.assert.equal(builder.generateUrl(['test.html'], ['123']), './../test.html');
        });
        it('should work when absolute URLs => DISABLED and explicit HTML extensions => ENABLED, non-root ', function () {
            var configMock = {
                absolute_urls: false,
                explicit_html_extensions: true,
            };
            var builder = new SiteBuilder_1.SiteBuilder(configMock, '', '');
            chai_1.assert.equal(builder.generateUrl(['index.html'], ['test', '123']), './../../index.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'index.html'], ['test']), './../hello/index.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test.html'], ['hello', '123']), './../test.html');
            chai_1.assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], ['hello']), './test/test.html');
            chai_1.assert.equal(builder.generateUrl(['test.html'], ['123']), './../test.html');
        });
    });
});
