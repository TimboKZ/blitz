"use strict";
var chai_1 = require('chai');
var Util_1 = require('../src/Util');
var ContentParser_1 = require('../src/ContentParser');
describe('ContentParser', function () {
    describe('#parse()', function () {
        var LF = 'test: 123\n---\n# MARKDOWN!';
        var CRLF = 'test: 123\r\n---\r\n# MARKDOWN!';
        var parsedLF = ContentParser_1.ContentParser.parse(LF);
        var parsedCRLF = ContentParser_1.ContentParser.parse(CRLF);
        var expectedObject = {
            test: 123,
            content: Util_1.Util.parseMarkdown('# MARKDOWN!'),
        };
        it('should extract correct data from files with LF line endings', function () {
            chai_1.assert.deepEqual(parsedLF, expectedObject);
        });
        it('should extract correct data from files with CRLF line endings', function () {
            chai_1.assert.deepEqual(parsedCRLF, expectedObject);
        });
    });
});
