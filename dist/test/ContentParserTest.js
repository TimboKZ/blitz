"use strict";
var chai_1 = require('chai');
var Util_1 = require('../src/Util');
var ContentParser_1 = require('../src/ContentParser');
describe('ContentParser', function () {
    describe('#parse()', function () {
        var lfCases = [
            {
                yaml: 'test: 123',
                markdown: '# Testing Heading',
            },
            {
                yaml: 'test: 123\nstring: \'hello\'',
                markdown: '# Testing Heading\n[This is a link](#)',
            },
        ];
        var lfCasesCount = lfCases.length;
        it('should correctly parse strings with LF line endings', function () {
            for (var i = 0; i < lfCasesCount; i++) {
                var lfCase = lfCases[i];
                var expectedObject = Util_1.Util.parseYaml(lfCase.yaml);
                expectedObject.content = Util_1.Util.parseMarkdown(lfCase.markdown);
                var contentString = '---\n' + lfCase.yaml + '\n---\n' + lfCase.markdown;
                chai_1.assert.deepEqual(ContentParser_1.ContentParser.parse(contentString), expectedObject);
            }
        });
        it('should extract correct data from strings with CRLF line endings', function () {
            for (var i = 0; i < lfCasesCount; i++) {
                var lfCase = lfCases[i];
                var expectedObject = Util_1.Util.parseYaml(lfCase.yaml.replace('\n', '\r\n'));
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
    });
});
