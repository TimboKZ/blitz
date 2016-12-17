"use strict";
var chai_1 = require('chai');
var Config_1 = require('../../src/Config');
describe('Config', function () {
    describe('#load()', function () {
        it('can be called multiple times', function () {
            var config = new Config_1.Config();
            chai_1.assert.doesNotThrow(function () { return config.load({}); });
            chai_1.assert.doesNotThrow(function () { return config.load({}); });
        });
    });
    describe('#validate()', function () {
        it('does not add unrecognised properties to the validated config', function () {
            var config = new Config_1.Config();
            config.load({ hello: 'World', pages: [{ world: 123 }] });
            config.validate();
            var validatedConfig = config.get();
            chai_1.assert.isUndefined(validatedConfig.hello);
            chai_1.assert.isUndefined(validatedConfig.pages[0].world);
        });
        it('checks a valid config without throwing any errors', function () {
            var config = new Config_1.Config();
            config.load({
                blitz_version: '0.2.0',
                globals: {
                    hello: 'World',
                },
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
                            },
                        ],
                    },
                ],
            });
            chai_1.assert.doesNotThrow(function () {
                config.validate();
            });
        });
        it('throws an error if no config was loaded', function () {
            var config = new Config_1.Config();
            chai_1.assert.throws(function () { return config.validate(); });
        });
        it('throws an error if the config is not an object', function () {
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load(null);
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load('hello');
                config.validate();
            });
        });
        it('throws an error on incorrect config property types', function () {
            var propertyCount = Config_1.CONFIG_PROPERTIES.length;
            var _loop_1 = function(i) {
                var property = Config_1.CONFIG_PROPERTIES[i];
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
                var config = new Config_1.Config();
                config.load(contentObject);
                chai_1.assert.throws(function () { return config.validate(); });
            };
            for (var i = 0; i < propertyCount; i++) {
                _loop_1(i);
            }
        });
        it('throws an error on incorrect page property types', function () {
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            uri: {},
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            id: {},
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            name: {},
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            template: {},
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            content: {},
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            menus: {},
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            child_pages: {},
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            child_directories: {},
                        }],
                });
                config.validate();
            });
        });
        it('throws an error on incorrect directory property types', function () {
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            child_directories: [{
                                    uri: {},
                                }],
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            child_directories: [{
                                    uri_key: {},
                                }],
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            child_directories: [{
                                    id_key: {},
                                }],
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            child_directories: [{
                                    name: {},
                                }],
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            child_directories: [{
                                    template_directory: {},
                                }],
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            child_directories: [{
                                    template: {},
                                }],
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            child_directories: [{
                                    content_directory: {},
                                }],
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            child_directories: [{
                                    content: {},
                                }],
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
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
        it('throws an error on illegal combinations of directory properties', function () {
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
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
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
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
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
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
        it('throws an error on incorrect menu property types', function () {
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            menus: [{
                                    name: 123,
                                }],
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
                config.load({
                    pages: [{
                            menus: [{
                                    title: {},
                                }],
                        }],
                });
                config.validate();
            });
            chai_1.assert.throws(function () {
                var config = new Config_1.Config();
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
    describe('#get()', function () {
        it('returns a validated config', function () {
            var config = new Config_1.Config();
            config.load({});
            chai_1.assert.isUndefined(config.get());
            config.validate();
            chai_1.assert.isDefined(config.get());
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9Db25maWdUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQSxxQkFBcUIsTUFBTSxDQUFDLENBQUE7QUFDNUIsdUJBQXdDLGtCQUFrQixDQUFDLENBQUE7QUFFM0QsUUFBUSxDQUFDLFFBQVEsRUFBRTtJQUNmLFFBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDaEIsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1lBQy9CLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7WUFDMUIsYUFBTSxDQUFDLFlBQVksQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQztZQUMzQyxhQUFNLENBQUMsWUFBWSxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3BCLEVBQUUsQ0FBQyw4REFBOEQsRUFBRTtZQUMvRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixJQUFJLGVBQWUsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFTLENBQUM7WUFDMUMsYUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsYUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FB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QztvQ0FDSixLQUFLLEVBQUUsRUFBRTtpQ0FDWixDQUFDO3lCQUNMLENBQUM7aUJBQ0wsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUNILGFBQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ1YsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQzs0QkFDSixLQUFLLEVBQUUsQ0FBQztvQ0FDSixJQUFJLEVBQUUsUUFBUTtpQ0FDakIsQ0FBQzt5QkFDTCxDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNmLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRTtZQUM3QixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEIsYUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsYUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L0NvbmZpZ1Rlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIENvbmZpZyB0ZXN0c1xuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuaW1wb3J0IHthc3NlcnR9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtDb25maWcsIENPTkZJR19QUk9QRVJUSUVTfSBmcm9tICcuLi8uLi9zcmMvQ29uZmlnJztcblxuZGVzY3JpYmUoJ0NvbmZpZycsICgpID0+IHtcbiAgICBkZXNjcmliZSgnI2xvYWQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2NhbiBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgYXNzZXJ0LmRvZXNOb3RUaHJvdygoKSA9PiBjb25maWcubG9hZCh7fSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRvZXNOb3RUaHJvdygoKSA9PiBjb25maWcubG9hZCh7fSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI3ZhbGlkYXRlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdkb2VzIG5vdCBhZGQgdW5yZWNvZ25pc2VkIHByb3BlcnRpZXMgdG8gdGhlIHZhbGlkYXRlZCBjb25maWcnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgY29uZmlnLmxvYWQoe2hlbGxvOiAnV29ybGQnLCBwYWdlczogW3t3b3JsZDogMTIzfV19KTtcbiAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgbGV0IHZhbGlkYXRlZENvbmZpZyA9IGNvbmZpZy5nZXQoKSBhcyBhbnk7XG4gICAgICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQodmFsaWRhdGVkQ29uZmlnLmhlbGxvKTtcbiAgICAgICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZCh2YWxpZGF0ZWRDb25maWcucGFnZXNbMF0ud29ybGQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ2NoZWNrcyBhIHZhbGlkIGNvbmZpZyB3aXRob3V0IHRocm93aW5nIGFueSBlcnJvcnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgIGJsaXR6X3ZlcnNpb246ICcwLjIuMCcsXG4gICAgICAgICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgICAgICAgICBoZWxsbzogJ1dvcmxkJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhZ2VzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogJy8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdpbmRleC5wdWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdtYWluJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdJbmRleCBQYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdhYm91dC5wdWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfcGFnZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnbG9jYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnbG9jYXRpb24ubWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2xvY2F0aW9uLnB1ZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Byb2plY3RzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVfZGlyZWN0b3J5OiAncHJvamVjdHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndGhyb3dzIGFuIGVycm9yIGlmIG5vIGNvbmZpZyB3YXMgbG9hZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gY29uZmlnLnZhbGlkYXRlKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Rocm93cyBhbiBlcnJvciBpZiB0aGUgY29uZmlnIGlzIG5vdCBhbiBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKG51bGwpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKCdoZWxsbycpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndGhyb3dzIGFuIGVycm9yIG9uIGluY29ycmVjdCBjb25maWcgcHJvcGVydHkgdHlwZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvcGVydHlDb3VudCA9IENPTkZJR19QUk9QRVJUSUVTLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydHlDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gQ09ORklHX1BST1BFUlRJRVNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRPYmplY3QgPSB7fTtcbiAgICAgICAgICAgICAgICBsZXQgYmFkVmFsdWU7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgcHJvcGVydHkuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgYmFkVmFsdWUgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYmFkVmFsdWUgPSAnc3RyaW5nJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGVudE9iamVjdFtwcm9wZXJ0eS5uYW1lXSA9IGJhZFZhbHVlO1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoY29udGVudE9iamVjdCk7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiBjb25maWcudmFsaWRhdGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndGhyb3dzIGFuIGVycm9yIG9uIGluY29ycmVjdCBwYWdlIHByb3BlcnR5IHR5cGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHt9LFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDoge30sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51czoge30sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9wYWdlczoge30sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3Rvcmllczoge30sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndGhyb3dzIGFuIGVycm9yIG9uIGluY29ycmVjdCBkaXJlY3RvcnkgcHJvcGVydHkgdHlwZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmk6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmlfa2V5OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRfa2V5OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZToge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX2RpcmVjdG9yaWVzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlX2RpcmVjdG9yeToge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX2RpcmVjdG9yaWVzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudF9kaXJlY3Rvcnk6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudXM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndGhyb3dzIGFuIGVycm9yIG9uIGlsbGVnYWwgY29tYmluYXRpb25zIG9mIGRpcmVjdG9yeSBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlX2RpcmVjdG9yeTogJ2hlbGxvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd3b3JsZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudF9kaXJlY3Rvcnk6ICdoZWxsbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICd3b3JsZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVfZGlyZWN0b3J5OiAnaGVsbG8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50X2RpcmVjdG9yeTogJ3dvcmxkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCd0aHJvd3MgYW4gZXJyb3Igb24gaW5jb3JyZWN0IG1lbnUgcHJvcGVydHkgdHlwZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51czogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAxMjMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJyNnZXQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgYSB2YWxpZGF0ZWQgY29uZmlnJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgIGNvbmZpZy5sb2FkKHt9KTtcbiAgICAgICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChjb25maWcuZ2V0KCkpO1xuICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICBhc3NlcnQuaXNEZWZpbmVkKGNvbmZpZy5nZXQoKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
