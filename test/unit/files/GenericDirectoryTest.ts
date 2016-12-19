/**
 * @file GenericDirectory tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as path from 'path';
import {assert} from 'chai';
import {GenericDirectory} from '../../../src/files/GenericDirectory';

describe('GenericDirectory', () => {
    describe('#getFullPath()', () => {
        it('combines paths correctly', () => {
            assert.equal(
                new GenericDirectory('first', ['second', 'third']).getFullPath(),
                path.join('first', 'second', 'third')
            );
        });
    });
});
