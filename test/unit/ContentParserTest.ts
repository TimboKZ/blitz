/**
 * @file ContentParser class tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import * as mock from 'mock-fs';
import {assert} from 'chai';
import {Util} from '../../src/helpers/Util';
import {ContentParser} from '../../src/ContentParser';

describe('ContentParser', () => {

    describe('#parse()', () => {

        interface ILFCase {
            yaml: string;
            yamlObject: any;
            markdown: string;
        }
        let lfCases: ILFCase[] = [
            {
                yaml: 'test: 123',
                yamlObject: {test: 123},
                markdown: '# Testing Heading',
            },
            {
                yaml: 'Hello',
                yamlObject: {title: 'Hello'},
                markdown: '# Testing Heading',
            },
            {
                yaml: 'test: 123\nstring: \'hello\'',
                yamlObject: {test: 123, string: 'hello'},
                markdown: '# Testing Heading\n[This is a link](#)',
            },
        ];
        let lfCasesCount = lfCases.length;
        it('should correctly parse strings with LF line endings', () => {
            for (let i = 0; i < lfCasesCount; i++) {
                let lfCase = lfCases[i];
                let expectedObject = lfCase.yamlObject;
                expectedObject.content = Util.parseMarkdown(lfCase.markdown);
                let contentString = '---\n' + lfCase.yaml + '\n---\n' + lfCase.markdown;
                assert.deepEqual(ContentParser.parse(contentString), expectedObject);
            }
        });
        it('should extract correct data from strings with CRLF line endings', () => {
            for (let i = 0; i < lfCasesCount; i++) {
                let lfCase = lfCases[i];
                let expectedObject = lfCase.yamlObject;
                expectedObject.content = Util.parseMarkdown(lfCase.markdown.replace('\n', '\r\n'));
                let contentString = '---\r\n' + lfCase.yaml + '---\r\n' + lfCase.markdown;
                assert.deepEqual(ContentParser.parse(contentString), expectedObject);
            }
        });

        let markdownOnlyCases = [
            '# Hello Word\n> This is a quote',
            '\n\n\n\njust text',
            '[This is a link](#) followed by some **bold text**',
            '\n\n\n\n\n\n',
            '',
        ];
        let markdownOnlyCasesCount = markdownOnlyCases.length;
        it('should save parsed Markdown into `content` when there is no YAML', () => {
            for (let i = 0; i < markdownOnlyCasesCount; i++) {
                let onlyCase = markdownOnlyCases[i];
                let expectedObject = {
                    content: Util.parseMarkdown(onlyCase),
                };
                assert.deepEqual(ContentParser.parse(onlyCase), expectedObject);
            }
        });

        let yamlOnlyCases = [
            'hello: 123',
            '\n',
            'test: \'string\'\nhello: 321',
        ];
        let yamlOnlyCaseCount = yamlOnlyCases.length;
        it('should parse YAML correctly when there is no Markdown', () => {
            for (let i = 0; i < yamlOnlyCaseCount; i++) {
                let onlyCase = yamlOnlyCases[i];
                let expectedObject = Util.parseYaml(onlyCase);
                expectedObject.content = '';
                assert.deepEqual(ContentParser.parse('---\n' + onlyCase + '\n---'), expectedObject);
            }
        });

        it('should return an object with an empty `content` property for empty strings and `---`', () => {
            let expectedObject = {
                content: '',
            };
            assert.deepEqual(ContentParser.parse(''), expectedObject);
            assert.deepEqual(ContentParser.parse('---\n---'), expectedObject);
        });

        it('should set `title` to the string in the front matter, if front matter is a single string', () => {
            let expectedObject = {
                title: 'This is a string.',
                content: '',
            };
            assert.deepEqual(ContentParser.parse('---\nThis is a string.\n---'), expectedObject);
        });

    });

    describe('#parseFile()', () => {

        it('should parse the content of a file if it exists and is readable', () => {
            let data = {
                fileName: 'content.md',
                yaml: 'test: 123',
                yamlObject: {test: 123},
                markdown: '# Testing Heading',
            };
            let expectedObject: any = data.yamlObject;
            expectedObject.file = data.fileName;
            expectedObject.content = Util.parseMarkdown(data.markdown);
            let mockConfig = {};
            mockConfig[data.fileName] = mock.file({
                content: '---\n' + data.yaml + '\n---\n' + data.markdown,
                mode: 777,
            });
            mock(mockConfig);
            assert.deepEqual(ContentParser.parseFile(data.fileName), expectedObject);
            mock.restore();
        });

        it('should return file from cache if it is requested more than once', () => {
            let data = {
                fileName: 'uncached.md',
                yaml: 'test: 123',
                yamlObject: {test: 123},
                markdown: '# Testing Heading',
            };
            let expectedObject: any = data.yamlObject;
            expectedObject.file = data.fileName;
            expectedObject.content = Util.parseMarkdown(data.markdown);
            let mockConfig = {};
            mockConfig[data.fileName] = mock.file({
                content: '---\n' + data.yaml + '\n---\n' + data.markdown,
                mode: 777,
            });
            // Confirm that file has not been cached before
            assert.throws(() => ContentParser.parseFile(data.fileName), 'no such file or directory');
            mock(mockConfig);
            assert.deepEqual(ContentParser.parseFile(data.fileName), expectedObject);
            mock.restore();
            // Empty the contents of the file, if cache works return value will be same as above
            mockConfig[data.fileName].content = '';
            mock(mockConfig);
            assert.deepEqual(ContentParser.parseFile(data.fileName), expectedObject);
            mock.restore();
        });

        it('should throw an error when the file does not exist', () => {
            mock({});
            assert.throws(() => ContentParser.parseFile('non-existent.md'), 'no such file or directory');
            mock.restore();
        });

        it('should throw an error when file can not be read', () => {
            mock({
                'non-readable.md': mock.file({
                    content: '',
                    mode: 0,
                }),
            });
            assert.throws(() => ContentParser.parseFile('non-readable.md'), 'permission denied');
            mock.restore();
        });

    });

    describe('#parseDirectory()', () => {

        let files = [
            {
                fileName: 'directory-1.md',
                mode: 777,
                yaml: 'test: 123',
                yamlObject: {test: 123},
                markdown: '# Testing Heading',
            },
            {
                fileName: 'directory-2.md',
                mode: 777,
                yaml: 'test: 123',
                yamlObject: {test: 123},
                markdown: '# Testing Heading',
            },
        ];

        it('should parse the content of all files in directory if it exists and is readable', () => {
            let dirName = 'dir-name';
            let expectedObject = [];
            let mockFiles = {};
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let processedFile: any = file.yamlObject;
                processedFile.file = file.fileName;
                processedFile.content = Util.parseMarkdown(file.markdown);
                expectedObject.push(processedFile);
                mockFiles[file.fileName] = mock.file({
                    content: '---\n' + file.yaml + '\n---\n' + file.markdown,
                    mode: file.mode,
                });
            }
            let mockConfig = {};
            mockConfig[dirName] = mock.directory({
                items: mockFiles,
            });
            mock(mockConfig);
            assert.deepEqual(ContentParser.parseDirectory('dir-name'), expectedObject);
            mock.restore();
        });

        it('should return directory contents from cache if it is requested more than once', () => {
            let dirName = 'uncached-dir';
            let expectedObject = [];
            let mockFiles = {};
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let processedFile: any = file.yamlObject;
                processedFile.file = file.fileName;
                processedFile.content = Util.parseMarkdown(file.markdown);
                expectedObject.push(processedFile);
                mockFiles[file.fileName] = mock.file({
                    content: '---\n' + file.yaml + '\n---\n' + file.markdown,
                    mode: file.mode,
                });
            }
            let mockConfig = {};
            mockConfig[dirName] = mock.directory({
                items: mockFiles,
            });
            // Confirm that directory has not been cached before
            assert.throws(() => ContentParser.parseDirectory(dirName), 'no such file or directory');
            mock(mockConfig);
            assert.deepEqual(ContentParser.parseDirectory(dirName), expectedObject);
            mock.restore();
            // Empty the contents of the directory, if cache works return value will be same as above
            mockConfig[dirName] = {};
            mock(mockConfig);
            assert.deepEqual(ContentParser.parseDirectory(dirName), expectedObject);
            mock.restore();
        });

        it('should throw an error when the directory does not exist', () => {
            mock({});
            assert.throws(() => ContentParser.parseDirectory('non-existent'), 'no such file or directory');
            mock.restore();
        });

        it('should throw an error when directory is not empty and not be readable', () => {
            let dirName = 'dir-with-unreadable';
            let expectedObject = [];
            let mockFiles = {};
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let processedFile: any = file.yamlObject;
                processedFile.file = file.fileName;
                processedFile.content = Util.parseMarkdown(file.markdown);
                expectedObject.push(processedFile);
                mockFiles[file.fileName] = mock.file({
                    content: '---\n' + file.yaml + '\n---\n' + file.markdown,
                    mode: file.mode,
                });
            }
            let mockConfig = {};
            mockConfig[dirName] = mock.directory({
                mode: 0,
                items: mockFiles,
            });
            mock(mockConfig);
            assert.throws(() => ContentParser.parseDirectory(dirName), 'permission denied');
            mock.restore();
        });

        it('should throw an error when one of the file in directory can not be read', () => {
            files.push({
                fileName: 'not-readable.md',
                mode: 0,
                yaml: 'test: 123',
                yamlObject: {test: 123},
                markdown: '# Testing Heading',
            });
            let dirName = 'dir-with-unreadable';
            let expectedObject = [];
            let mockFiles = {};
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let processedFile: any = file.yamlObject;
                processedFile.file = file.fileName;
                processedFile.content = Util.parseMarkdown(file.markdown);
                expectedObject.push(processedFile);
                mockFiles[file.fileName] = mock.file({
                    content: '---\n' + file.yaml + '\n---\n' + file.markdown,
                    mode: file.mode,
                });
            }
            let mockConfig = {};
            mockConfig[dirName] = mock.directory({
                items: mockFiles,
            });
            mock(mockConfig);
            assert.throws(() => ContentParser.parseDirectory(dirName), 'permission denied');
            mock.restore();
        });

    });

});
