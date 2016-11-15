"use strict";
var mock = require('mock-fs');
var chai_1 = require('chai');
var Util_1 = require('../src/Util');
var ContentParser_1 = require('../src/ContentParser');
describe('ContentParser', function () {
    describe('#parse()', function () {
        var lfCases = [
            {
                yaml: 'test: 123',
                yamlObject: { test: 123 },
                markdown: '# Testing Heading',
            },
            {
                yaml: 'Hello',
                yamlObject: { title: 'Hello' },
                markdown: '# Testing Heading',
            },
            {
                yaml: 'test: 123\nstring: \'hello\'',
                yamlObject: { test: 123, string: 'hello' },
                markdown: '# Testing Heading\n[This is a link](#)',
            },
        ];
        var lfCasesCount = lfCases.length;
        it('should correctly parse strings with LF line endings', function () {
            for (var i = 0; i < lfCasesCount; i++) {
                var lfCase = lfCases[i];
                var expectedObject = lfCase.yamlObject;
                expectedObject.content = Util_1.Util.parseMarkdown(lfCase.markdown);
                var contentString = '---\n' + lfCase.yaml + '\n---\n' + lfCase.markdown;
                chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse(contentString), expectedObject);
            }
        });
        it('should extract correct data from strings with CRLF line endings', function () {
            for (var i = 0; i < lfCasesCount; i++) {
                var lfCase = lfCases[i];
                var expectedObject = lfCase.yamlObject;
                expectedObject.content = Util_1.Util.parseMarkdown(lfCase.markdown.replace('\n', '\r\n'));
                var contentString = '---\r\n' + lfCase.yaml + '---\r\n' + lfCase.markdown;
                chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse(contentString), expectedObject);
            }
        });
        var markdownOnlyCases = [
            '# Hello Word\n> This is a quote',
            '\n\n\n\njust text',
            '[This is a link](#) followed by some **bold text**',
            '\n\n\n\n\n\n',
            '',
        ];
        var markdownOnlyCasesCount = markdownOnlyCases.length;
        it('should save parsed Markdown into `content` when there is no YAML', function () {
            for (var i = 0; i < markdownOnlyCasesCount; i++) {
                var onlyCase = markdownOnlyCases[i];
                var expectedObject = {
                    content: Util_1.Util.parseMarkdown(onlyCase),
                };
                chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse(onlyCase), expectedObject);
            }
        });
        var yamlOnlyCases = [
            'hello: 123',
            '\n',
            'test: \'string\'\nhello: 321',
        ];
        var yamlOnlyCaseCount = yamlOnlyCases.length;
        it('should parse YAML correctly when there is no Markdown', function () {
            for (var i = 0; i < yamlOnlyCaseCount; i++) {
                var onlyCase = yamlOnlyCases[i];
                var expectedObject = Util_1.Util.parseYaml(onlyCase);
                expectedObject.content = '';
                chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse('---\n' + onlyCase + '\n---'), expectedObject);
            }
        });
        it('should return an object with an empty `content` property for empty strings and `---`', function () {
            var expectedObject = {
                content: '',
            };
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse(''), expectedObject);
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse('---\n---'), expectedObject);
        });
        it('should set `title` to the string in the front matter, if front matter is a single string', function () {
            var expectedObject = {
                title: 'This is a string.',
                content: '',
            };
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse('---\nThis is a string.\n---'), expectedObject);
        });
    });
    describe('#parseFile()', function () {
        it('should parse the content of a file if it exists and is readable', function () {
            var data = {
                fileName: 'content.md',
                yaml: 'test: 123',
                yamlObject: { test: 123 },
                markdown: '# Testing Heading',
            };
            var expectedObject = data.yamlObject;
            expectedObject.file = data.fileName;
            expectedObject.content = Util_1.Util.parseMarkdown(data.markdown);
            var mockConfig = {};
            mockConfig[data.fileName] = mock.file({
                content: '---\n' + data.yaml + '\n---\n' + data.markdown,
                mode: 777,
            });
            mock(mockConfig);
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parseFile(data.fileName), expectedObject);
            mock.restore();
        });
        it('should return file from cache if it is requested more than once', function () {
            var data = {
                fileName: 'uncached.md',
                yaml: 'test: 123',
                yamlObject: { test: 123 },
                markdown: '# Testing Heading',
            };
            var expectedObject = data.yamlObject;
            expectedObject.file = data.fileName;
            expectedObject.content = Util_1.Util.parseMarkdown(data.markdown);
            var mockConfig = {};
            mockConfig[data.fileName] = mock.file({
                content: '---\n' + data.yaml + '\n---\n' + data.markdown,
                mode: 777,
            });
            chai_1.assert.throws(function () { return ContentParser_1.ContentParser.parseFile(data.fileName); }, 'no such file or directory');
            mock(mockConfig);
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parseFile(data.fileName), expectedObject);
            mock.restore();
            mockConfig[data.fileName].content = '';
            mock(mockConfig);
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parseFile(data.fileName), expectedObject);
            mock.restore();
        });
        it('should throw an error when the file does not exist', function () {
            mock({});
            chai_1.assert.throws(function () { return ContentParser_1.ContentParser.parseFile('non-existent.md'); }, 'no such file or directory');
            mock.restore();
        });
        it('should throw an error when file can not be read', function () {
            mock({
                'non-readable.md': mock.file({
                    content: '',
                    mode: 0,
                }),
            });
            chai_1.assert.throws(function () { return ContentParser_1.ContentParser.parseFile('non-readable.md'); }, 'permission denied');
            mock.restore();
        });
    });
    describe('#parseDirectory()', function () {
        var files = [
            {
                fileName: 'directory-1.md',
                mode: 777,
                yaml: 'test: 123',
                yamlObject: { test: 123 },
                markdown: '# Testing Heading',
            },
            {
                fileName: 'directory-2.md',
                mode: 777,
                yaml: 'test: 123',
                yamlObject: { test: 123 },
                markdown: '# Testing Heading',
            },
        ];
        it('should parse the content of all files in directory if it exists and is readable', function () {
            var dirName = 'dir-name';
            var expectedObject = [];
            var mockFiles = {};
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var processedFile = file.yamlObject;
                processedFile.file = file.fileName;
                processedFile.content = Util_1.Util.parseMarkdown(file.markdown);
                expectedObject.push(processedFile);
                mockFiles[file.fileName] = mock.file({
                    content: '---\n' + file.yaml + '\n---\n' + file.markdown,
                    mode: file.mode,
                });
            }
            var mockConfig = {};
            mockConfig[dirName] = mock.directory({
                items: mockFiles,
            });
            mock(mockConfig);
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parseDirectory('dir-name'), expectedObject);
            mock.restore();
        });
        it('should return directory contents from cache if it is requested more than once', function () {
            var dirName = 'uncached-dir';
            var expectedObject = [];
            var mockFiles = {};
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var processedFile = file.yamlObject;
                processedFile.file = file.fileName;
                processedFile.content = Util_1.Util.parseMarkdown(file.markdown);
                expectedObject.push(processedFile);
                mockFiles[file.fileName] = mock.file({
                    content: '---\n' + file.yaml + '\n---\n' + file.markdown,
                    mode: file.mode,
                });
            }
            var mockConfig = {};
            mockConfig[dirName] = mock.directory({
                items: mockFiles,
            });
            chai_1.assert.throws(function () { return ContentParser_1.ContentParser.parseDirectory(dirName); }, 'no such file or directory');
            mock(mockConfig);
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parseDirectory(dirName), expectedObject);
            mock.restore();
            mockConfig[dirName] = {};
            mock(mockConfig);
            chai_1.assert.deepEqual(ContentParser_1.ContentParser.parseDirectory(dirName), expectedObject);
            mock.restore();
        });
        it('should throw an error when the directory does not exist', function () {
            mock({});
            chai_1.assert.throws(function () { return ContentParser_1.ContentParser.parseDirectory('non-existent'); }, 'no such file or directory');
            mock.restore();
        });
        it('should throw an error when directory is not empty and not be readable', function () {
            var dirName = 'dir-with-unreadable';
            var expectedObject = [];
            var mockFiles = {};
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var processedFile = file.yamlObject;
                processedFile.file = file.fileName;
                processedFile.content = Util_1.Util.parseMarkdown(file.markdown);
                expectedObject.push(processedFile);
                mockFiles[file.fileName] = mock.file({
                    content: '---\n' + file.yaml + '\n---\n' + file.markdown,
                    mode: file.mode,
                });
            }
            var mockConfig = {};
            mockConfig[dirName] = mock.directory({
                mode: 0,
                items: mockFiles,
            });
            mock(mockConfig);
            chai_1.assert.throws(function () { return ContentParser_1.ContentParser.parseDirectory(dirName); }, 'permission denied');
            mock.restore();
        });
        it('should throw an error when one of the file in directory can not be read', function () {
            files.push({
                fileName: 'not-readable.md',
                mode: 0,
                yaml: 'test: 123',
                yamlObject: { test: 123 },
                markdown: '# Testing Heading',
            });
            var dirName = 'dir-with-unreadable';
            var expectedObject = [];
            var mockFiles = {};
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var processedFile = file.yamlObject;
                processedFile.file = file.fileName;
                processedFile.content = Util_1.Util.parseMarkdown(file.markdown);
                expectedObject.push(processedFile);
                mockFiles[file.fileName] = mock.file({
                    content: '---\n' + file.yaml + '\n---\n' + file.markdown,
                    mode: file.mode,
                });
            }
            var mockConfig = {};
            mockConfig[dirName] = mock.directory({
                items: mockFiles,
            });
            mock(mockConfig);
            chai_1.assert.throws(function () { return ContentParser_1.ContentParser.parseDirectory(dirName); }, 'permission denied');
            mock.restore();
        });
    });
});
