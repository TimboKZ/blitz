"use strict";
var mock = require('mock-fs');
var yaml = require('js-yaml');
var chai_1 = require('chai');
var ConfigParser_1 = require('../../src/ConfigParser');
describe('ConfigParser', function () {
    describe('#load()', function () {
        it('should throw an error when file either does not exist or is not readable', function () {
            mock({
                'blitz.yml': mock.file({
                    content: '',
                    mode: 0,
                }),
            });
            chai_1.assert.throws(function () { return ConfigParser_1.ConfigParser.load('blitz.yml'); }, 'permission denied');
            mock.restore();
            mock({});
            chai_1.assert.throws(function () { return ConfigParser_1.ConfigParser.load('blitz.yml'); }, 'no such file or directory');
            mock.restore();
        });
        it('should use the default values correctly', function () {
            mock({
                'blitz.yml': mock.file({
                    content: '',
                    mode: 777,
                }),
            });
            var config = ConfigParser_1.ConfigParser.load('blitz.yml');
            mock.restore();
            var propertyCount = ConfigParser_1.CONFIG_PROPERTIES.length;
            for (var i = 0; i < propertyCount; i++) {
                var property = ConfigParser_1.CONFIG_PROPERTIES[i];
                chai_1.assert.deepEqual(config[property.name], property.defaultValue);
            }
        });
        it('should read the config correctly', function () {
            var configObject = {
                blitz_version: '9.9.9',
                globals: {
                    hello: 'world',
                    integer: 123,
                },
                pages: [
                    {
                        uri: '/',
                        template: 'index.pug',
                    },
                    {
                        template: 'help.pug',
                    },
                ],
            };
            mock({
                'blitz.yml': mock.file({
                    content: yaml.safeDump(configObject),
                    mode: 777,
                }),
            });
            var config = ConfigParser_1.ConfigParser.load('blitz.yml');
            mock.restore();
            for (var propertyName in configObject) {
                if (configObject.hasOwnProperty(propertyName)) {
                    chai_1.assert.deepEqual(config[propertyName], configObject[propertyName]);
                }
            }
        });
        it('should throw an error when an incorrect type for a required parameters is supplied', function () {
            var propertyCount = ConfigParser_1.CONFIG_PROPERTIES.length;
            for (var i = 0; i < propertyCount; i++) {
                var property = ConfigParser_1.CONFIG_PROPERTIES[i];
                var contentObject = {};
                var badValue = void 0;
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
                chai_1.assert.throws(function () { return ConfigParser_1.ConfigParser.load('blitz.yml'); }, 'Invalid type');
                mock.restore();
            }
        });
    });
});
