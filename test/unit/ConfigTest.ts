/**
 * @file Config tests
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {assert} from 'chai';
import {Config, CONFIG_PROPERTIES} from '../../src/Config';

describe('Config', () => {
    describe('#load()', () => {
        it('can be called multiple times', () => {
            let config = new Config();
            assert.doesNotThrow(() => config.load({}));
            assert.doesNotThrow(() => config.load({}));
        });
    });
    describe('#validate()', () => {
        it('does not add unrecognised properties to the validated config', () => {
            let config = new Config();
            config.load({hello: 'World', pages: [{world: 123}]});
            config.validate();
            let validatedConfig = config.get() as any;
            assert.isUndefined(validatedConfig.hello);
            assert.isUndefined(validatedConfig.pages[0].world);
        });
        it('checks a valid config without throwing any errors', () => {
            let config = new Config();
            config.load({
                blitz_version: '0.2.0',
                globals: {
                    hello: 'World',
                },
                plugins: ['pagination'],
                pages: [
                    {
                        uri: '/',
                        template: 'index.pug',
                        menus: [
                            {
                                name: 'main',
                                title: 'Index Page',
                            },
                        ],
                    },
                    {
                        template: 'about.pug',
                        child_pages: [
                            {
                                id: 'location',
                                content: 'location.md',
                                template: 'location.pug',
                            },
                        ],
                        child_directories: [
                            {
                                name: 'projects',
                                template_directory: 'projects',
                                menus: [
                                    {
                                        name: 'main',
                                        title_key: 'special_key',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            assert.doesNotThrow(() => {
                config.validate();
            });
        });
        it('throws an error if no config was loaded', () => {
            let config = new Config();
            assert.throws(() => config.validate());
        });
        it('throws an error if the config is not an object', () => {
            assert.throws(() => {
                let config = new Config();
                config.load(null); // tslint:disable-line:no-null-keyword
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load('hello');
                config.validate();
            });
        });
        it('throws an error on incorrect config property types', () => {
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
                let config = new Config();
                config.load(contentObject);
                assert.throws(() => config.validate());
            }
        });
        it('throws an error on incorrect page property types', () => {
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        uri: {},
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        id: {},
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        name: {},
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        template: {},
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        content: {},
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        menus: {},
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_pages: {},
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: {},
                    }],
                });
                config.validate();
            });
        });
        it('throws an error on incorrect directory property types', () => {
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [{
                            uri: {},
                        }],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [{
                            uri_key: {},
                        }],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [{
                            id_key: {},
                        }],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [{
                            name: {},
                        }],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [{
                            template_directory: {},
                        }],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [{
                            template: {},
                        }],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [{
                            content_directory: {},
                        }],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [{
                            content: {},
                        }],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [{
                            menus: {},
                        }],
                    }],
                });
                config.validate();
            });
        });
        it('throws an error on illegal combinations of directory properties', () => {
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [
                            {
                                template_directory: 'hello',
                                template: 'world',
                            },
                        ],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [
                            {
                                content_directory: 'hello',
                                content: 'world',
                            },
                        ],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        child_directories: [
                            {
                                template_directory: 'hello',
                                content_directory: 'world',
                            },
                        ],
                    }],
                });
                config.validate();
            });
        });
        it('throws an error on incorrect menu property types', () => {
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        menus: [{
                            name: 123,
                        }],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        menus: [{
                            title: {},
                        }],
                    }],
                });
                config.validate();
            });
            assert.throws(() => {
                let config = new Config();
                config.load({
                    pages: [{
                        menus: [{
                            keys: 'string',
                        }],
                    }],
                });
                config.validate();
            });
        });
    });
    describe('#get()', () => {
        it('returns a validated config', () => {
            let config = new Config();
            config.load({});
            assert.isUndefined(config.get());
            config.validate();
            assert.isDefined(config.get());
        });
    });
});
