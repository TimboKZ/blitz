/**
 * @file ContentFile tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as mock from 'mock-fs';
import {assert} from 'chai';
import {ContentFile} from '../../../src/files/ContentFile';

describe('ContentFile', () => {
    describe('#reload()', () => {
        // TODO: Add more tests for reload() once its complete
        it('extracts the content of the file correctly', () => {
            let contentString = 'Hello World!';
            let fileContents = '---\n---\n' + contentString;
            let mockConfig = {
                'test.txt': mock.file({
                    content: fileContents,
                    mode: 777,
                }),
            };
            mock(mockConfig);
            let file = new ContentFile('', 'test.txt');
            file.reload();
            let idFunction = (input: string) => input;
            let generatedString = file.getContent().generate(idFunction, idFunction, idFunction);
            assert.equal(generatedString, contentString);
            mock.restore();
        });
    });
    describe('#write()', () => {
        it('throws an error because operation is prohibited', () => {
            let contentFile = new ContentFile('', 'test.txt');
            assert.throws(() => contentFile.write());
        });
    });
});
