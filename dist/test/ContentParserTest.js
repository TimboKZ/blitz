"use strict";
var chai_1 = require('chai');
var Util_1 = require('../src/Util');
var ContentParser_1 = require('../src/ContentParser');
describe('ContentParser', function () {
    describe('#parse()', function () {
        var LF = 'test: 123\n---\n# MARKDOWN!';
        var CRLF = 'test: 123\r\n---\r\n# MARKDOWN!';
        var lineEndingsObject = {
            test: 123,
            content: Util_1.Util.parseMarkdown('# MARKDOWN!'),
        };
        it('should extract correct data from files with LF line endings', function () {
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse(LF), lineEndingsObject);
        });
        it('should extract correct data from files with CRLF line endings', function () {
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse(CRLF), lineEndingsObject);
        });
        var markdownOnly = '---\n# MARKDOWN!';
        var markdownOnlyNewLine = '\n---\n# MARKDOWN!';
        var onlyMarkdownObject = {
            content: Util_1.Util.parseMarkdown('# MARKDOWN!'),
        };
        it('should extract markdown correctly from a file with no YAML', function () {
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse(markdownOnly), onlyMarkdownObject);
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse(markdownOnlyNewLine), onlyMarkdownObject);
        });
    });
});
