/**
 * @file Contains code related to extra event functionality
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {EventEmitter} from 'events';

/**
 * Interface for pairs of events and listeners
 * @since 0.2.0
 */
export interface IEventListenerPair {
    event: string;
    listener: Function;
}

/**
 * @class Collection of static helper methods related to events
 * @since 0.2.0
 */
export class EventHelper {
    /**
     * Adds event listeners to an event emitter
     * @since 0.2.0
     */
    public static addListeners(eventEmitter: EventEmitter, pairs: IEventListenerPair[]) {
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i];
            eventEmitter.addListener(pair.event, pair.listener);
        }
    }

    /**
     * Removes event listeners to an event emitter
     * @since 0.2.0
     */
    public static removeListeners(eventEmitter: EventEmitter, pairs: IEventListenerPair[]) {
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i];
            eventEmitter.removeListener(pair.event, pair.listener);
        }
    }
}
