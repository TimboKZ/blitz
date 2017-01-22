/**
 * @file A TypeScript file.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.0.1
 */

import {EventEmitter} from 'events';
import {IEventListenerPair, EventHelper} from './helpers/EventHelper';

/**
 * @class A class.
 * @since 0.2.0
 */
export class ListenerContainer {
    /**
     * Reference to an event emitter which will be used to attach listeners
     * @since 0.2.0
     */
    protected eventEmitter: EventEmitter;

    /**
     * Event-listener pairs for the asset manager
     * @since 0.2.0
     */
    private eventListenerPairs: IEventListenerPair[];

    /**
     * ListenerContainer constructor
     * @since 0.2.0
     */
    constructor(eventEmitter?: EventEmitter, eventListenerPairs?: IEventListenerPair[]) {
        this.eventEmitter = eventEmitter;
        this.eventListenerPairs = eventListenerPairs;
    }

    /**
     * @since 0.2.0
     */
    public setupListeners() {
        if (!this.eventEmitter) {
            throw new Error('Cannot setup listeners without an event emitter!');
        }
        EventHelper.addListeners(this.eventEmitter, this.eventListenerPairs);
    }

    /**
     * @since 0.2.0
     */
    public destroyListeners() {
        if (!this.eventEmitter) {
            throw new Error('Cannot setup listeners without an event emitter!');
        }
        EventHelper.removeListeners(this.eventEmitter, this.eventListenerPairs);
    }
}
