/**
 * @file ConfigParser class tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.1.3
 */

import * as mock from 'mock-fs';
import * as yaml from 'js-yaml';
import {assert} from 'chai';
import {ConfigParser, CONFIG_PROPERTIES} from '../src/ConfigParser';

describe('ConfigParser', () => {

    describe('#load()', () => {

        it('should throw an error when file either does not exist or is not readable', () => {
            mock({
                'blitz.yml': mock.file({
                    content: '',
                    mode: 0,
                }),
            });
            assert.throws(() => ConfigParser.load('blitz.yml'), 'permission denied');
            mock.restore();
            mock({});
            assert.throws(() => ConfigParser.load('blitz.yml'), 'no such file or directory');
            mock.restore();
        });

        it('should use the default values correctly', () => {
            mock({
                'blitz.yml': mock.file({
                    content: '',
                    mode: 777,
                }),
            });
            let config = ConfigParser.load('blitz.yml');
            mock.restore();
            let propertyCount = CONFIG_PROPERTIES.length;
            for (let i = 0; i < propertyCount; i++) {
                let property = CONFIG_PROPERTIES[i];
                assert.deepEqual(config[property.name], property.defaultValue);
            }
        });

        it('should read the config correctly', () => {
            let configObject = {
                blitz_version: '9.9.9',
                globals: {
                    hello: 'world',
                    integer: 123,
                },
                pages: {
                    uri: '/',
                    template: 'index.pug',
                },
            };
            mock({
                'blitz.yml': mock.file({
                    content: yaml.safeDump(configObject),
                    mode: 777,
                }),
            });
            let config = ConfigParser.load('blitz.yml');
            mock.restore();
            for (let propertyName in configObject) {
                if (configObject.hasOwnProperty(propertyName)) {
                    assert.deepEqual(config[propertyName], configObject[propertyName]);
                }
            }
        });

        it('should throw an error when an incorrect type for a required parameters is supplied', () => {
            let propertyCount = CONFIG_PROPERTIES.length;
            for (let i = 0; i < propertyCount; i++) {
                let property = CONFIG_PROPERTIES[i];
                let contentObject = {};
                let badValue;
                switch (typeof property.defaultValue) {
                    case 'string':
                    case 'boolean':
                        badValue = {};
                        break;
                    default:
                        badValue = 'string';
                }
                contentObject[property.name] = badValue;
                mock({
                    'blitz.yml': mock.file({
                        content: yaml.safeDump(contentObject),
                        mode: 777,
                    }),
                });
                assert.throws(() => ConfigParser.load('blitz.yml'), 'Invalid type');
                mock.restore();
            }
        });

    });

});
