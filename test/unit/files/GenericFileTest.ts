/**
 * @file GenericFile tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as mock from 'mock-fs';
import * as fse from 'fs-extra';
import {assert} from 'chai';
import {GenericFile} from '../../../src/files/GenericFile';

describe('GenericFile', () => {
    describe('#read()', () => {
        it('reads file contents correctly', () => {
            let fileContents = 'Hello world!';
            let mockConfig = {
                'test.txt': mock.file({
                    content: fileContents,
                    mode: 777,
                }),
            };
            mock(mockConfig);
            let file = new GenericFile('test.txt');
            file.read();
            assert.equal(file.contents, fileContents);
            mock.restore();
        });
    });
    describe('#write()', () => {
        it('writes file contents correctly', () => {
            let fileContents = 'Hello world!';
            let mockConfig = {
                'test.txt': mock.file({
                    content: '',
                    mode: 777,
                }),
            };
            mock(mockConfig);
            let file = new GenericFile('/test.txt');
            file.contents = fileContents;
            file.write();
            assert.equal(fse.readFileSync('/test.txt', 'utf8'), fileContents);
            mock.restore();
        });
    });
});
