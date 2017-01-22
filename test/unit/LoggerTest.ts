/**
 * @file Logger tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import * as colors from 'colors';
import {assert} from 'chai';
import {Logger, LogLevel} from '../../src/cli/Logger';

describe('Logger', () => {
    describe('#brand()', () => {
        it('colours a string', () => {
            let plainString = 'hello world';
            let colouredString = Logger.brand(plainString);
            if (colors.enabled) {
                assert.notEqual(colouredString, plainString);
            }
            assert.equal(colors.strip(colouredString), plainString);
        });
    });
    describe('#logWithPrefix()', () => {
        let consoleLog = console.log;
        let output = '';
        beforeEach((done) => {
            console.log = (message?: string) => {
                output = message;
            };
            done();
        });
        afterEach((done) => {
            console.log = consoleLog;
            done();
        });

        it('adds a prefix to a string', () => {
            Logger.logWithPrefix('hello', 'world');
            assert.equal(output, 'hello world');
            assert.equal(Logger.logWithPrefix('hello', 'world', false), 'hello world');
        });
    });
    describe('#log()', () => {
        let consoleLog = console.log;
        let output = '';
        beforeEach((done) => {
            output = '';
            console.log = (message?: string) => {
                output = message;
            };
            done();
        });
        afterEach((done) => {
            console.log = consoleLog;
            done();
        });

        it('only prints Log and Warn levels if verbose option is on', () => {
            global.verbose = false;
            Logger.log('Hello World', LogLevel.Log);
            assert.equal(output, '');
            Logger.log('Hello World', LogLevel.Warn);
            assert.equal(output, '');
            global.verbose = true;
            Logger.log('Hello', LogLevel.Log);
            assert.notEqual(output, '');
            output = '';
            Logger.log('World', LogLevel.Warn);
            assert.notEqual(output, '');
        });

        it('only prints Debug level if debug option is on', () => {
            global.debug = false;
            Logger.log('Hello World', LogLevel.Debug);
            assert.equal(output, '');
            global.debug = true;
            Logger.log('Hello', LogLevel.Debug);
            assert.notEqual(output, '');
        });

        it('always prints errors', () => {
            global.debug = false;
            global.verbose = false;
            Logger.log('Hello World', LogLevel.Error);
            assert.notEqual(output, '');
        });

        it('indents the string after the newline character', () => {
            global.debug = false;
            global.verbose = true;
            Logger.log('Hello\nWorld');
            assert.isTrue(/\n(\s)+/g.test(output));
        });
    });
    describe('#logMany()', () => {
        it('logs an array', () => {
            let consoleLog = console.log;
            let output = [];
            console.log = (message?: string) => {
                output.push(message);
            };
            Logger.logMany(['1', '2', '3']);
            assert.equal(output.length, 3);
            console.log = consoleLog;
        });
    });
    describe('#split()', () => {
        it('trims newline characters', () => {
            let testString = '\n\n\nHello\n\n\n';
            assert.deepEqual(Logger.split(testString), ['Hello']);
        });
        it('breaks string into an array correctly', () => {
            let testString = '\n\n\nHello\nWorld\n\n\n';
            assert.deepEqual(Logger.split(testString), ['Hello', 'World']);
        });
    });
});
