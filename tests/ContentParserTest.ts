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
        let parsedLF = ContentParser.parse(LF);
        let parsedCRLF = ContentParser.parse(CRLF);
        let expectedObject = {
            test: 123,
            content: Util.parseMarkdown('# MARKDOWN!'),
        };
        it('should extract correct data from files with LF line endings', () => {
            assert.deepEqual(parsedLF, expectedObject);
        });
        it('should extract correct data from files with CRLF line endings', () => {
            assert.deepEqual(parsedCRLF, expectedObject);
        });
    });
});
