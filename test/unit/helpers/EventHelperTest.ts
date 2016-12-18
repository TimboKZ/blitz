/**
 * @file EvemtHelper tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {assert} from 'chai';
import {EventEmitter} from 'events';
import {IEventListenerPair, EventHelper} from '../../../src/helpers/EventHelper';

describe('EventHelper', () => {
    describe('#addListeners()', () => {
        it('correctly adds listeners to an event emitter', () => {
            let eventEmitter = new EventEmitter();
            let pairs: IEventListenerPair[] = [
                {
                    event: 'hello',
                    listener: () => true,
                },
                {
                    event: 'world',
                    listener: () => true,
                },
            ];
            EventHelper.addListeners(eventEmitter, pairs);
            assert.deepEqual(eventEmitter.eventNames(), ['hello', 'world']);
        });
    });
    describe('#removeListeners()', () => {
        it('correctly removes listeners from an event emitter', () => {
            let eventEmitter = new EventEmitter();
            let pairs: IEventListenerPair[] = [
                {
                    event: 'hello',
                    listener: () => true,
                },
                {
                    event: 'world',
                    listener: () => true,
                },
            ];
            EventHelper.addListeners(eventEmitter, pairs);
            assert.deepEqual(eventEmitter.eventNames(), ['hello', 'world']);
            EventHelper.removeListeners(eventEmitter, pairs);
            assert.equal(eventEmitter.eventNames().length, 0);
        });
    });
});
