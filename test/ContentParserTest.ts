/**
 * @file ConfigParser class tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import {assert} from 'chai';
import {Util} from '../src/Util';
import {ContentParser} from '../src/ContentParser';

describe('ContentParser', () => {
    describe('#parse()', () => {
        let LF = 'test: 123\n---\n# MARKDOWN!';
        let CRLF = 'test: 123\r\n---\r\n# MARKDOWN!';
        let lineEndingsObject = {
            test: 123,
            content: Util.parseMarkdown('# MARKDOWN!'),
        };
        it('should extract correct data from files with LF line endings', () => {
            assert.deepEqual(ContentParser.parse(LF), lineEndingsObject);
        });
        it('should extract correct data from files with CRLF line endings', () => {
            assert.deepEqual(ContentParser.parse(CRLF), lineEndingsObject);
        });

        let markdownOnly = '---\n# MARKDOWN!';
        let markdownOnlyNewLine = '\n---\n# MARKDOWN!';
        let onlyMarkdownObject = {
            content: Util.parseMarkdown('# MARKDOWN!'),
        };
        it('should extract markdown correctly from a file with no YAML', () => {
            assert.deepEqual(ContentParser.parse(markdownOnly), onlyMarkdownObject);
            assert.deepEqual(ContentParser.parse(markdownOnlyNewLine), onlyMarkdownObject);
        });
    });
});
