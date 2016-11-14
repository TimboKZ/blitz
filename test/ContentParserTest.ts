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
import * as mock from 'mock-fs';

describe('ContentParser', () => {
    describe('#parse()', () => {

        interface ILFCase {
            yaml: string;
            markdown: string;
        }
        let lfCases: ILFCase[] = [
            {
                yaml: 'test: 123',
                markdown: '# Testing Heading',
            },
            {
                yaml: 'test: 123\nstring: \'hello\'',
                markdown: '# Testing Heading\n[This is a link](#)',
            },
        ];
        let lfCasesCount = lfCases.length;
        it('should correctly parse strings with LF line endings', () => {
            for (let i = 0; i < lfCasesCount; i++) {
                let lfCase = lfCases[i];
                let expectedObject = Util.parseYaml(lfCase.yaml);
                expectedObject.content = Util.parseMarkdown(lfCase.markdown);
                let contentString = '---\n' + lfCase.yaml + '\n---\n' + lfCase.markdown;
                assert.deepEqual(ContentParser.parse(contentString), expectedObject);
            }
        });
        it('should extract correct data from strings with CRLF line endings', () => {
            for (let i = 0; i < lfCasesCount; i++) {
                let lfCase = lfCases[i];
                let expectedObject = Util.parseYaml(lfCase.yaml.replace('\n', '\r\n'));
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
    });
});
