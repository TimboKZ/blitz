"use strict";
var mock = require("mock-fs");
var chai_1 = require("chai");
var Util_1 = require("../../src/helpers/Util");
var ContentParser_1 = require("../../src/ContentParser");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9Db250ZW50UGFyc2VyVGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsOEJBQWdDO0FBQ2hDLDZCQUE0QjtBQUM1QiwrQ0FBNEM7QUFDNUMseURBQXNEO0FBRXRELFFBQVEsQ0FBQyxlQUFlLEVBQUU7SUFFdEIsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQU9qQixJQUFJLE9BQU8sR0FBYztZQUNyQjtnQkFDSSxJQUFJLEVBQUUsV0FBVztnQkFDakIsVUFBVSxFQUFFLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBQztnQkFDdkIsUUFBUSxFQUFFLG1CQUFtQjthQUNoQztZQUNEO2dCQUNJLElBQUksRUFBRSxPQUFPO2dCQUNiLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUM7Z0JBQzVCLFFBQVEsRUFBRSxtQkFBbUI7YUFDaEM7WUFDRDtnQkFDSSxJQUFJLEVBQUUsOEJBQThCO2dCQUNwQyxVQUFVLEVBQUUsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUM7Z0JBQ3hDLFFBQVEsRUFBRSx3Q0FBd0M7YUFDckQ7U0FDSixDQUFDO1FBQ0YsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxFQUFFLENBQUMscURBQXFELEVBQUU7WUFDdEQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxjQUFjLENBQUMsT0FBTyxHQUFHLFdBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLGFBQWEsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksR0FB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O2FBQ25CLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQixhQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sT0FBQSw2QkFBYSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBckMsQ0FBcUMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L0NvbnRlbnRQYXJzZXJUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBDb250ZW50UGFyc2VyIGNsYXNzIHRlc3RzXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuXG5pbXBvcnQgKiBhcyBtb2NrIGZyb20gJ21vY2stZnMnO1xuaW1wb3J0IHthc3NlcnR9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtVdGlsfSBmcm9tICcuLi8uLi9zcmMvaGVscGVycy9VdGlsJztcbmltcG9ydCB7Q29udGVudFBhcnNlcn0gZnJvbSAnLi4vLi4vc3JjL0NvbnRlbnRQYXJzZXInO1xuXG5kZXNjcmliZSgnQ29udGVudFBhcnNlcicsICgpID0+IHtcblxuICAgIGRlc2NyaWJlKCcjcGFyc2UoKScsICgpID0+IHtcblxuICAgICAgICBpbnRlcmZhY2UgSUxGQ2FzZSB7XG4gICAgICAgICAgICB5YW1sOiBzdHJpbmc7XG4gICAgICAgICAgICB5YW1sT2JqZWN0OiBhbnk7XG4gICAgICAgICAgICBtYXJrZG93bjogc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsZkNhc2VzOiBJTEZDYXNlW10gPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeWFtbDogJ3Rlc3Q6IDEyMycsXG4gICAgICAgICAgICAgICAgeWFtbE9iamVjdDoge3Rlc3Q6IDEyM30sXG4gICAgICAgICAgICAgICAgbWFya2Rvd246ICcjIFRlc3RpbmcgSGVhZGluZycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHlhbWw6ICdIZWxsbycsXG4gICAgICAgICAgICAgICAgeWFtbE9iamVjdDoge3RpdGxlOiAnSGVsbG8nfSxcbiAgICAgICAgICAgICAgICBtYXJrZG93bjogJyMgVGVzdGluZyBIZWFkaW5nJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeWFtbDogJ3Rlc3Q6IDEyM1xcbnN0cmluZzogXFwnaGVsbG9cXCcnLFxuICAgICAgICAgICAgICAgIHlhbWxPYmplY3Q6IHt0ZXN0OiAxMjMsIHN0cmluZzogJ2hlbGxvJ30sXG4gICAgICAgICAgICAgICAgbWFya2Rvd246ICcjIFRlc3RpbmcgSGVhZGluZ1xcbltUaGlzIGlzIGEgbGlua10oIyknLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICAgICAgbGV0IGxmQ2FzZXNDb3VudCA9IGxmQ2FzZXMubGVuZ3RoO1xuICAgICAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSBwYXJzZSBzdHJpbmdzIHdpdGggTEYgbGluZSBlbmRpbmdzJywgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZkNhc2VzQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBsZkNhc2UgPSBsZkNhc2VzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBleHBlY3RlZE9iamVjdCA9IGxmQ2FzZS55YW1sT2JqZWN0O1xuICAgICAgICAgICAgICAgIGV4cGVjdGVkT2JqZWN0LmNvbnRlbnQgPSBVdGlsLnBhcnNlTWFya2Rvd24obGZDYXNlLm1hcmtkb3duKTtcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudFN0cmluZyA9ICctLS1cXG4nICsgbGZDYXNlLnlhbWwgKyAnXFxuLS0tXFxuJyArIGxmQ2FzZS5tYXJrZG93bjtcbiAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKENvbnRlbnRQYXJzZXIucGFyc2UoY29udGVudFN0cmluZyksIGV4cGVjdGVkT2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZXh0cmFjdCBjb3JyZWN0IGRhdGEgZnJvbSBzdHJpbmdzIHdpdGggQ1JMRiBsaW5lIGVuZGluZ3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxmQ2FzZXNDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxmQ2FzZSA9IGxmQ2FzZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGV4cGVjdGVkT2JqZWN0ID0gbGZDYXNlLnlhbWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRPYmplY3QuY29udGVudCA9IFV0aWwucGFyc2VNYXJrZG93bihsZkNhc2UubWFya2Rvd24ucmVwbGFjZSgnXFxuJywgJ1xcclxcbicpKTtcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudFN0cmluZyA9ICctLS1cXHJcXG4nICsgbGZDYXNlLnlhbWwgKyAnLS0tXFxyXFxuJyArIGxmQ2FzZS5tYXJrZG93bjtcbiAgICAgICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKENvbnRlbnRQYXJzZXIucGFyc2UoY29udGVudFN0cmluZyksIGV4cGVjdGVkT2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG1hcmtkb3duT25seUNhc2VzID0gW1xuICAgICAgICAgICAgJyMgSGVsbG8gV29yZFxcbj4gVGhpcyBpcyBhIHF1b3RlJyxcbiAgICAgICAgICAgICdcXG5cXG5cXG5cXG5qdXN0IHRleHQnLFxuICAgICAgICAgICAgJ1tUaGlzIGlzIGEgbGlua10oIykgZm9sbG93ZWQgYnkgc29tZSAqKmJvbGQgdGV4dCoqJyxcbiAgICAgICAgICAgICdcXG5cXG5cXG5cXG5cXG5cXG4nLFxuICAgICAgICAgICAgJycsXG4gICAgICAgIF07XG4gICAgICAgIGxldCBtYXJrZG93bk9ubHlDYXNlc0NvdW50ID0gbWFya2Rvd25Pbmx5Q2FzZXMubGVuZ3RoO1xuICAgICAgICBpdCgnc2hvdWxkIHNhdmUgcGFyc2VkIE1hcmtkb3duIGludG8gYGNvbnRlbnRgIHdoZW4gdGhlcmUgaXMgbm8gWUFNTCcsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFya2Rvd25Pbmx5Q2FzZXNDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9ubHlDYXNlID0gbWFya2Rvd25Pbmx5Q2FzZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGV4cGVjdGVkT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBVdGlsLnBhcnNlTWFya2Rvd24ob25seUNhc2UpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChDb250ZW50UGFyc2VyLnBhcnNlKG9ubHlDYXNlKSwgZXhwZWN0ZWRPYmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgeWFtbE9ubHlDYXNlcyA9IFtcbiAgICAgICAgICAgICdoZWxsbzogMTIzJyxcbiAgICAgICAgICAgICdcXG4nLFxuICAgICAgICAgICAgJ3Rlc3Q6IFxcJ3N0cmluZ1xcJ1xcbmhlbGxvOiAzMjEnLFxuICAgICAgICBdO1xuICAgICAgICBsZXQgeWFtbE9ubHlDYXNlQ291bnQgPSB5YW1sT25seUNhc2VzLmxlbmd0aDtcbiAgICAgICAgaXQoJ3Nob3VsZCBwYXJzZSBZQU1MIGNvcnJlY3RseSB3aGVuIHRoZXJlIGlzIG5vIE1hcmtkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB5YW1sT25seUNhc2VDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9ubHlDYXNlID0geWFtbE9ubHlDYXNlc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgZXhwZWN0ZWRPYmplY3QgPSBVdGlsLnBhcnNlWWFtbChvbmx5Q2FzZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRPYmplY3QuY29udGVudCA9ICcnO1xuICAgICAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoQ29udGVudFBhcnNlci5wYXJzZSgnLS0tXFxuJyArIG9ubHlDYXNlICsgJ1xcbi0tLScpLCBleHBlY3RlZE9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIG9iamVjdCB3aXRoIGFuIGVtcHR5IGBjb250ZW50YCBwcm9wZXJ0eSBmb3IgZW1wdHkgc3RyaW5ncyBhbmQgYC0tLWAnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRPYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChDb250ZW50UGFyc2VyLnBhcnNlKCcnKSwgZXhwZWN0ZWRPYmplY3QpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChDb250ZW50UGFyc2VyLnBhcnNlKCctLS1cXG4tLS0nKSwgZXhwZWN0ZWRPYmplY3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCBgdGl0bGVgIHRvIHRoZSBzdHJpbmcgaW4gdGhlIGZyb250IG1hdHRlciwgaWYgZnJvbnQgbWF0dGVyIGlzIGEgc2luZ2xlIHN0cmluZycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBleHBlY3RlZE9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1RoaXMgaXMgYSBzdHJpbmcuJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKENvbnRlbnRQYXJzZXIucGFyc2UoJy0tLVxcblRoaXMgaXMgYSBzdHJpbmcuXFxuLS0tJyksIGV4cGVjdGVkT2JqZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCcjcGFyc2VGaWxlKCknLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBwYXJzZSB0aGUgY29udGVudCBvZiBhIGZpbGUgaWYgaXQgZXhpc3RzIGFuZCBpcyByZWFkYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiAnY29udGVudC5tZCcsXG4gICAgICAgICAgICAgICAgeWFtbDogJ3Rlc3Q6IDEyMycsXG4gICAgICAgICAgICAgICAgeWFtbE9iamVjdDoge3Rlc3Q6IDEyM30sXG4gICAgICAgICAgICAgICAgbWFya2Rvd246ICcjIFRlc3RpbmcgSGVhZGluZycsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IGV4cGVjdGVkT2JqZWN0OiBhbnkgPSBkYXRhLnlhbWxPYmplY3Q7XG4gICAgICAgICAgICBleHBlY3RlZE9iamVjdC5maWxlID0gZGF0YS5maWxlTmFtZTtcbiAgICAgICAgICAgIGV4cGVjdGVkT2JqZWN0LmNvbnRlbnQgPSBVdGlsLnBhcnNlTWFya2Rvd24oZGF0YS5tYXJrZG93bik7XG4gICAgICAgICAgICBsZXQgbW9ja0NvbmZpZyA9IHt9O1xuICAgICAgICAgICAgbW9ja0NvbmZpZ1tkYXRhLmZpbGVOYW1lXSA9IG1vY2suZmlsZSh7XG4gICAgICAgICAgICAgICAgY29udGVudDogJy0tLVxcbicgKyBkYXRhLnlhbWwgKyAnXFxuLS0tXFxuJyArIGRhdGEubWFya2Rvd24sXG4gICAgICAgICAgICAgICAgbW9kZTogNzc3LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2NrKG1vY2tDb25maWcpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChDb250ZW50UGFyc2VyLnBhcnNlRmlsZShkYXRhLmZpbGVOYW1lKSwgZXhwZWN0ZWRPYmplY3QpO1xuICAgICAgICAgICAgbW9jay5yZXN0b3JlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZpbGUgZnJvbSBjYWNoZSBpZiBpdCBpcyByZXF1ZXN0ZWQgbW9yZSB0aGFuIG9uY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogJ3VuY2FjaGVkLm1kJyxcbiAgICAgICAgICAgICAgICB5YW1sOiAndGVzdDogMTIzJyxcbiAgICAgICAgICAgICAgICB5YW1sT2JqZWN0OiB7dGVzdDogMTIzfSxcbiAgICAgICAgICAgICAgICBtYXJrZG93bjogJyMgVGVzdGluZyBIZWFkaW5nJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRPYmplY3Q6IGFueSA9IGRhdGEueWFtbE9iamVjdDtcbiAgICAgICAgICAgIGV4cGVjdGVkT2JqZWN0LmZpbGUgPSBkYXRhLmZpbGVOYW1lO1xuICAgICAgICAgICAgZXhwZWN0ZWRPYmplY3QuY29udGVudCA9IFV0aWwucGFyc2VNYXJrZG93bihkYXRhLm1hcmtkb3duKTtcbiAgICAgICAgICAgIGxldCBtb2NrQ29uZmlnID0ge307XG4gICAgICAgICAgICBtb2NrQ29uZmlnW2RhdGEuZmlsZU5hbWVdID0gbW9jay5maWxlKHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnLS0tXFxuJyArIGRhdGEueWFtbCArICdcXG4tLS1cXG4nICsgZGF0YS5tYXJrZG93bixcbiAgICAgICAgICAgICAgICBtb2RlOiA3NzcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIENvbmZpcm0gdGhhdCBmaWxlIGhhcyBub3QgYmVlbiBjYWNoZWQgYmVmb3JlXG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IENvbnRlbnRQYXJzZXIucGFyc2VGaWxlKGRhdGEuZmlsZU5hbWUpLCAnbm8gc3VjaCBmaWxlIG9yIGRpcmVjdG9yeScpO1xuICAgICAgICAgICAgbW9jayhtb2NrQ29uZmlnKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoQ29udGVudFBhcnNlci5wYXJzZUZpbGUoZGF0YS5maWxlTmFtZSksIGV4cGVjdGVkT2JqZWN0KTtcbiAgICAgICAgICAgIG1vY2sucmVzdG9yZSgpO1xuICAgICAgICAgICAgLy8gRW1wdHkgdGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlLCBpZiBjYWNoZSB3b3JrcyByZXR1cm4gdmFsdWUgd2lsbCBiZSBzYW1lIGFzIGFib3ZlXG4gICAgICAgICAgICBtb2NrQ29uZmlnW2RhdGEuZmlsZU5hbWVdLmNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgIG1vY2sobW9ja0NvbmZpZyk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKENvbnRlbnRQYXJzZXIucGFyc2VGaWxlKGRhdGEuZmlsZU5hbWUpLCBleHBlY3RlZE9iamVjdCk7XG4gICAgICAgICAgICBtb2NrLnJlc3RvcmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciB3aGVuIHRoZSBmaWxlIGRvZXMgbm90IGV4aXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgbW9jayh7fSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IENvbnRlbnRQYXJzZXIucGFyc2VGaWxlKCdub24tZXhpc3RlbnQubWQnKSwgJ25vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnknKTtcbiAgICAgICAgICAgIG1vY2sucmVzdG9yZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIHdoZW4gZmlsZSBjYW4gbm90IGJlIHJlYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBtb2NrKHtcbiAgICAgICAgICAgICAgICAnbm9uLXJlYWRhYmxlLm1kJzogbW9jay5maWxlKHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IDAsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gQ29udGVudFBhcnNlci5wYXJzZUZpbGUoJ25vbi1yZWFkYWJsZS5tZCcpLCAncGVybWlzc2lvbiBkZW5pZWQnKTtcbiAgICAgICAgICAgIG1vY2sucmVzdG9yZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJyNwYXJzZURpcmVjdG9yeSgpJywgKCkgPT4ge1xuXG4gICAgICAgIGxldCBmaWxlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogJ2RpcmVjdG9yeS0xLm1kJyxcbiAgICAgICAgICAgICAgICBtb2RlOiA3NzcsXG4gICAgICAgICAgICAgICAgeWFtbDogJ3Rlc3Q6IDEyMycsXG4gICAgICAgICAgICAgICAgeWFtbE9iamVjdDoge3Rlc3Q6IDEyM30sXG4gICAgICAgICAgICAgICAgbWFya2Rvd246ICcjIFRlc3RpbmcgSGVhZGluZycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiAnZGlyZWN0b3J5LTIubWQnLFxuICAgICAgICAgICAgICAgIG1vZGU6IDc3NyxcbiAgICAgICAgICAgICAgICB5YW1sOiAndGVzdDogMTIzJyxcbiAgICAgICAgICAgICAgICB5YW1sT2JqZWN0OiB7dGVzdDogMTIzfSxcbiAgICAgICAgICAgICAgICBtYXJrZG93bjogJyMgVGVzdGluZyBIZWFkaW5nJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBwYXJzZSB0aGUgY29udGVudCBvZiBhbGwgZmlsZXMgaW4gZGlyZWN0b3J5IGlmIGl0IGV4aXN0cyBhbmQgaXMgcmVhZGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGlyTmFtZSA9ICdkaXItbmFtZSc7XG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRPYmplY3QgPSBbXTtcbiAgICAgICAgICAgIGxldCBtb2NrRmlsZXMgPSB7fTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzZWRGaWxlOiBhbnkgPSBmaWxlLnlhbWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkRmlsZS5maWxlID0gZmlsZS5maWxlTmFtZTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRGaWxlLmNvbnRlbnQgPSBVdGlsLnBhcnNlTWFya2Rvd24oZmlsZS5tYXJrZG93bik7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRPYmplY3QucHVzaChwcm9jZXNzZWRGaWxlKTtcbiAgICAgICAgICAgICAgICBtb2NrRmlsZXNbZmlsZS5maWxlTmFtZV0gPSBtb2NrLmZpbGUoe1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnLS0tXFxuJyArIGZpbGUueWFtbCArICdcXG4tLS1cXG4nICsgZmlsZS5tYXJrZG93bixcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogZmlsZS5tb2RlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1vY2tDb25maWcgPSB7fTtcbiAgICAgICAgICAgIG1vY2tDb25maWdbZGlyTmFtZV0gPSBtb2NrLmRpcmVjdG9yeSh7XG4gICAgICAgICAgICAgICAgaXRlbXM6IG1vY2tGaWxlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9jayhtb2NrQ29uZmlnKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoQ29udGVudFBhcnNlci5wYXJzZURpcmVjdG9yeSgnZGlyLW5hbWUnKSwgZXhwZWN0ZWRPYmplY3QpO1xuICAgICAgICAgICAgbW9jay5yZXN0b3JlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGRpcmVjdG9yeSBjb250ZW50cyBmcm9tIGNhY2hlIGlmIGl0IGlzIHJlcXVlc3RlZCBtb3JlIHRoYW4gb25jZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkaXJOYW1lID0gJ3VuY2FjaGVkLWRpcic7XG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRPYmplY3QgPSBbXTtcbiAgICAgICAgICAgIGxldCBtb2NrRmlsZXMgPSB7fTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzZWRGaWxlOiBhbnkgPSBmaWxlLnlhbWxPYmplY3Q7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkRmlsZS5maWxlID0gZmlsZS5maWxlTmFtZTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRGaWxlLmNvbnRlbnQgPSBVdGlsLnBhcnNlTWFya2Rvd24oZmlsZS5tYXJrZG93bik7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRPYmplY3QucHVzaChwcm9jZXNzZWRGaWxlKTtcbiAgICAgICAgICAgICAgICBtb2NrRmlsZXNbZmlsZS5maWxlTmFtZV0gPSBtb2NrLmZpbGUoe1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnLS0tXFxuJyArIGZpbGUueWFtbCArICdcXG4tLS1cXG4nICsgZmlsZS5tYXJrZG93bixcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogZmlsZS5tb2RlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1vY2tDb25maWcgPSB7fTtcbiAgICAgICAgICAgIG1vY2tDb25maWdbZGlyTmFtZV0gPSBtb2NrLmRpcmVjdG9yeSh7XG4gICAgICAgICAgICAgICAgaXRlbXM6IG1vY2tGaWxlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gQ29uZmlybSB0aGF0IGRpcmVjdG9yeSBoYXMgbm90IGJlZW4gY2FjaGVkIGJlZm9yZVxuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiBDb250ZW50UGFyc2VyLnBhcnNlRGlyZWN0b3J5KGRpck5hbWUpLCAnbm8gc3VjaCBmaWxlIG9yIGRpcmVjdG9yeScpO1xuICAgICAgICAgICAgbW9jayhtb2NrQ29uZmlnKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoQ29udGVudFBhcnNlci5wYXJzZURpcmVjdG9yeShkaXJOYW1lKSwgZXhwZWN0ZWRPYmplY3QpO1xuICAgICAgICAgICAgbW9jay5yZXN0b3JlKCk7XG4gICAgICAgICAgICAvLyBFbXB0eSB0aGUgY29udGVudHMgb2YgdGhlIGRpcmVjdG9yeSwgaWYgY2FjaGUgd29ya3MgcmV0dXJuIHZhbHVlIHdpbGwgYmUgc2FtZSBhcyBhYm92ZVxuICAgICAgICAgICAgbW9ja0NvbmZpZ1tkaXJOYW1lXSA9IHt9O1xuICAgICAgICAgICAgbW9jayhtb2NrQ29uZmlnKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoQ29udGVudFBhcnNlci5wYXJzZURpcmVjdG9yeShkaXJOYW1lKSwgZXhwZWN0ZWRPYmplY3QpO1xuICAgICAgICAgICAgbW9jay5yZXN0b3JlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2hlbiB0aGUgZGlyZWN0b3J5IGRvZXMgbm90IGV4aXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgbW9jayh7fSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IENvbnRlbnRQYXJzZXIucGFyc2VEaXJlY3RvcnkoJ25vbi1leGlzdGVudCcpLCAnbm8gc3VjaCBmaWxlIG9yIGRpcmVjdG9yeScpO1xuICAgICAgICAgICAgbW9jay5yZXN0b3JlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2hlbiBkaXJlY3RvcnkgaXMgbm90IGVtcHR5IGFuZCBub3QgYmUgcmVhZGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGlyTmFtZSA9ICdkaXItd2l0aC11bnJlYWRhYmxlJztcbiAgICAgICAgICAgIGxldCBleHBlY3RlZE9iamVjdCA9IFtdO1xuICAgICAgICAgICAgbGV0IG1vY2tGaWxlcyA9IHt9O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBmaWxlID0gZmlsZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByb2Nlc3NlZEZpbGU6IGFueSA9IGZpbGUueWFtbE9iamVjdDtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRGaWxlLmZpbGUgPSBmaWxlLmZpbGVOYW1lO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEZpbGUuY29udGVudCA9IFV0aWwucGFyc2VNYXJrZG93bihmaWxlLm1hcmtkb3duKTtcbiAgICAgICAgICAgICAgICBleHBlY3RlZE9iamVjdC5wdXNoKHByb2Nlc3NlZEZpbGUpO1xuICAgICAgICAgICAgICAgIG1vY2tGaWxlc1tmaWxlLmZpbGVOYW1lXSA9IG1vY2suZmlsZSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICctLS1cXG4nICsgZmlsZS55YW1sICsgJ1xcbi0tLVxcbicgKyBmaWxlLm1hcmtkb3duLFxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBmaWxlLm1vZGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbW9ja0NvbmZpZyA9IHt9O1xuICAgICAgICAgICAgbW9ja0NvbmZpZ1tkaXJOYW1lXSA9IG1vY2suZGlyZWN0b3J5KHtcbiAgICAgICAgICAgICAgICBtb2RlOiAwLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBtb2NrRmlsZXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1vY2sobW9ja0NvbmZpZyk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IENvbnRlbnRQYXJzZXIucGFyc2VEaXJlY3RvcnkoZGlyTmFtZSksICdwZXJtaXNzaW9uIGRlbmllZCcpO1xuICAgICAgICAgICAgbW9jay5yZXN0b3JlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2hlbiBvbmUgb2YgdGhlIGZpbGUgaW4gZGlyZWN0b3J5IGNhbiBub3QgYmUgcmVhZCcsICgpID0+IHtcbiAgICAgICAgICAgIGZpbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiAnbm90LXJlYWRhYmxlLm1kJyxcbiAgICAgICAgICAgICAgICBtb2RlOiAwLFxuICAgICAgICAgICAgICAgIHlhbWw6ICd0ZXN0OiAxMjMnLFxuICAgICAgICAgICAgICAgIHlhbWxPYmplY3Q6IHt0ZXN0OiAxMjN9LFxuICAgICAgICAgICAgICAgIG1hcmtkb3duOiAnIyBUZXN0aW5nIEhlYWRpbmcnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgZGlyTmFtZSA9ICdkaXItd2l0aC11bnJlYWRhYmxlJztcbiAgICAgICAgICAgIGxldCBleHBlY3RlZE9iamVjdCA9IFtdO1xuICAgICAgICAgICAgbGV0IG1vY2tGaWxlcyA9IHt9O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBmaWxlID0gZmlsZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByb2Nlc3NlZEZpbGU6IGFueSA9IGZpbGUueWFtbE9iamVjdDtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRGaWxlLmZpbGUgPSBmaWxlLmZpbGVOYW1lO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEZpbGUuY29udGVudCA9IFV0aWwucGFyc2VNYXJrZG93bihmaWxlLm1hcmtkb3duKTtcbiAgICAgICAgICAgICAgICBleHBlY3RlZE9iamVjdC5wdXNoKHByb2Nlc3NlZEZpbGUpO1xuICAgICAgICAgICAgICAgIG1vY2tGaWxlc1tmaWxlLmZpbGVOYW1lXSA9IG1vY2suZmlsZSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICctLS1cXG4nICsgZmlsZS55YW1sICsgJ1xcbi0tLVxcbicgKyBmaWxlLm1hcmtkb3duLFxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBmaWxlLm1vZGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbW9ja0NvbmZpZyA9IHt9O1xuICAgICAgICAgICAgbW9ja0NvbmZpZ1tkaXJOYW1lXSA9IG1vY2suZGlyZWN0b3J5KHtcbiAgICAgICAgICAgICAgICBpdGVtczogbW9ja0ZpbGVzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2NrKG1vY2tDb25maWcpO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiBDb250ZW50UGFyc2VyLnBhcnNlRGlyZWN0b3J5KGRpck5hbWUpLCAncGVybWlzc2lvbiBkZW5pZWQnKTtcbiAgICAgICAgICAgIG1vY2sucmVzdG9yZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTtcbiJdfQ==
