/**
 * @file Content tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {assert} from 'chai';
import {Content} from '../../../src/components/Content';

describe('Content', () => {
    describe('#prepare()', () => {
        it('extracts IDs correctly', () => {
            let content = new Content();
            content.prepare('${url} ${url|about} ${url|hello} \\${url|notIncluded}');
            assert.deepEqual(content.getIds(), ['about', 'hello']);
        });
        it('extracts assets correctly', () => {
            let content = new Content();
            content.prepare('${asset} ${asset|image.jpg} ${asset|audio/clip.wav} \\${asset|notIncluded.pdf}');
            assert.deepEqual(content.getAssets(), ['image.jpg', 'audio/clip.wav']);
        });
    });
    describe('#generate()', () => {
        let urlGenerator = (id: string = 'default') => {
            return id;
        };
        let assetPathGenerator = (asset: string = 'defaultAsset') => {
            return asset;
        };
        let contentParser = (content: string) => {
            return 'xx' + content;
        };
        it('throws an error if no content was prepared', () => {
            let content = new Content();
            assert.throws(() => content.generate(urlGenerator, assetPathGenerator, contentParser));
        });
        it('uses content parser correctly', () => {
            let content = new Content();
            content.prepare('Hello World');
            assert.equal(content.generate(urlGenerator, assetPathGenerator, contentParser), 'xxHello World');
        });
        it('uses URL generator correctly', () => {
            let content = new Content();
            content.prepare('${url} ${url|about} \\${url|notIncluded}');
            let expectedSting  = 'xxdefault about ${url|notIncluded}';
            assert.equal(content.generate(urlGenerator, assetPathGenerator, contentParser), expectedSting);
        });
        it('uses asset path generator correctly', () => {
            let content = new Content();
            content.prepare('${asset} ${asset|image.jpg} \\${asset|notIncluded.pdf}');
            let expectedSting  = 'xxdefaultAsset image.jpg ${asset|notIncluded.pdf}';
            assert.equal(content.generate(urlGenerator, assetPathGenerator, contentParser), expectedSting);
        });
    });
});
