/**
 * @file SiteBuilder class tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import {assert} from 'chai';
import {SiteBuilder} from '../../src/SiteBuilder';
import {IBlitzConfig} from '../../src/ConfigParser';

describe('SiteBuilder', () => {
    describe('#generateUrl()', () => {
        it('should work with absolute URLs => ENABLED, explicit .html => DISABLED, no site root, no site url', () => {
            let configMock = {
                absolute_urls: true,
                explicit_html_extensions: false,
            };
            let builder = new SiteBuilder(configMock as IBlitzConfig, '', '');
            assert.equal(builder.generateUrl(['index.html'], []), '/');
            assert.equal(builder.generateUrl(['hello', 'index.html'], []), '/hello');
            assert.equal(builder.generateUrl(['hello', 'test.html'], []), '/hello/test.html');
            assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], []), '/hello/test/test.html');
            assert.equal(builder.generateUrl(['test.html'], []), '/test.html');
        });
        it('should work with absolute URLs => ENABLED, explicit .html => DISABLED, site root, no site url', () => {
            let configMock = {
                site_root: 'test/root',
                absolute_urls: true,
                explicit_html_extensions: false,
            };
            let builder = new SiteBuilder(configMock as IBlitzConfig, '', '');
            assert.equal(builder.generateUrl(['index.html'], []), '/test/root');
            assert.equal(builder.generateUrl(['hello', 'index.html'], []), '/test/root/hello');
            assert.equal(builder.generateUrl(['hello', 'test.html'], []), '/test/root/hello/test.html');
            assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], []), '/test/root/hello/test/test.html');
            assert.equal(builder.generateUrl(['test.html'], []), '/test/root/test.html');
        });
        it('should work with absolute URLs => ENABLED, explicit .html => DISABLED, site root, site url', () => {
            let configMock = {
                site_url: 'http://test.com',
                site_root: 'test/root',
                absolute_urls: true,
                explicit_html_extensions: false,
            };
            let builder = new SiteBuilder(configMock as IBlitzConfig, '', '');
            assert.equal(builder.generateUrl(['index.html'], []), 'http://test.com/test/root');
            assert.equal(builder.generateUrl(['hello', 'index.html'], []), 'http://test.com/test/root/hello');
            assert.equal(builder.generateUrl(['hello', 'test.html'], []), 'http://test.com/test/root/hello/test.html');
            assert.equal(builder.generateUrl(
                ['hello', 'test', 'test.html'], []),
                'http://test.com/test/root/hello/test/test.html'
            );
            assert.equal(builder.generateUrl(['test.html'], []), 'http://test.com/test/root/test.html');
        });
        it('should work when absolute URLs => ENABLED and explicit HTML extensions => ENABLED, with site root', () => {
            let configMock = {
                site_root: 'test/root',
                absolute_urls: true,
                explicit_html_extensions: true,
            };
            let builder = new SiteBuilder(configMock as IBlitzConfig, '', '');
            assert.equal(builder.generateUrl(['index.html'], []), '/test/root/index.html');
            assert.equal(builder.generateUrl(['hello.html'], []), '/test/root/hello.html');
            assert.equal(builder.generateUrl(['hello', 'test.html'], []), '/test/root/hello/test.html');
            assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], []), '/test/root/hello/test/test.html');
            assert.equal(builder.generateUrl(['test.html'], []), '/test/root/test.html');
        });
        it('should work when absolute URLs => DISABLED and explicit HTML extensions => DISABLED', () => {
            let configMock = {
                absolute_urls: false,
                explicit_html_extensions: false,
            };
            let builder = new SiteBuilder(configMock as IBlitzConfig, '', '');
            assert.equal(builder.generateUrl(['index.html'], []), './');
            assert.equal(builder.generateUrl(['hello', 'index.html'], []), './hello');
            assert.equal(builder.generateUrl(['hello', 'test.html'], []), './hello/test.html');
            assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], []), './hello/test/test.html');
            assert.equal(builder.generateUrl(['test.html'], []), './test.html');
        });
        it('should work with absolute URLs DISABLED, explicit HTML extensions ENABLED', () => {
            let configMock = {
                absolute_urls: false,
                explicit_html_extensions: true,
            };
            let builder = new SiteBuilder(configMock as IBlitzConfig, '', '');
            assert.equal(builder.generateUrl(['index.html'], []), './index.html');
            assert.equal(builder.generateUrl(['hello', 'index.html'], []), './hello/index.html');
            assert.equal(builder.generateUrl(['hello', 'test.html'], []), './hello/test.html');
            assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], []), './hello/test/test.html');
            assert.equal(builder.generateUrl(['test.html'], []), './test.html');
        });
        it('should work when absolute URLs => DISABLED and explicit HTML extensions => DISABLED, non-root ', () => {
            let configMock = {
                absolute_urls: false,
                explicit_html_extensions: false,
            };
            let builder = new SiteBuilder(configMock as IBlitzConfig, '', '');
            assert.equal(builder.generateUrl(['index.html'], ['test', '123']), './../..');
            assert.equal(builder.generateUrl(['hello', 'index.html'], ['test']), './../hello');
            assert.equal(builder.generateUrl(['hello', 'test.html'], ['hello', '123']), './../test.html');
            assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], ['hello']), './test/test.html');
            assert.equal(builder.generateUrl(['test.html'], ['123']), './../test.html');
        });
        it('should work when absolute URLs => DISABLED and explicit HTML extensions => ENABLED, non-root ', () => {
            let configMock = {
                absolute_urls: false,
                explicit_html_extensions: true,
            };
            let builder = new SiteBuilder(configMock as IBlitzConfig, '', '');
            assert.equal(builder.generateUrl(['index.html'], ['test', '123']), './../../index.html');
            assert.equal(builder.generateUrl(['hello', 'index.html'], ['test']), './../hello/index.html');
            assert.equal(builder.generateUrl(['hello', 'test.html'], ['hello', '123']), './../test.html');
            assert.equal(builder.generateUrl(['hello', 'test', 'test.html'], ['hello']), './test/test.html');
            assert.equal(builder.generateUrl(['test.html'], ['123']), './../test.html');
        });
    });
});
