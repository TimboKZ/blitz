"use strict";
var chai_1 = require("chai");
var Config_1 = require("../../src/components/Config");
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
            var _loop_1 = function (i) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9Db25maWdUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQSw2QkFBNEI7QUFDNUIsc0RBQXNFO0FBRXRFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDZixRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2hCLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtZQUMvQixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1lBQzFCLGFBQU0sQ0FBQyxZQUFZLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7WUFDM0MsYUFBTSxDQUFDLFlBQVksQ0FBQyxjQUFNLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUNwQixFQUFFLENBQUMsOERBQThELEVBQUU7WUFDL0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBUyxDQUFDO1lBQzFDLGFBQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLGFBQU0sQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtZQUNwRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsYUFBYSxFQUFFLE9BQU87Z0JBQ3RCLE9BQU8sRUFBRTtvQkFDTCxLQUFLLEVBQUUsT0FBTztpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixLQUFLLEVBQUU7b0JBQ0g7d0JBQ0ksR0FBRyxFQUFFLEdBQUc7d0JBQ1IsUUFBUSxFQUFFLFdBQVc7d0JBQ3JCLEtBQUssRUFBRTs0QkFDSDtnQ0FDSSxJQUFJLEVBQUUsTUFBTTtnQ0FDWixLQUFLLEVBQUUsWUFBWTs2QkFDdEI7eUJBQ0o7cUJBQ0o7b0JBQ0Q7d0JBQ0ksUUFBUSxFQUFFLFdBQVc7d0JBQ3JCLFdBQVcsRUFBRTs0QkFDVDtnQ0FDSSxFQUFFLEVBQUUsVUFBVTtnQ0FDZCxPQUFPLEVBQUUsYUFBYTtnQ0FDdEIsUUFBUSxFQUFFLGNBQWM7NkJBQzNCO3lCQUNKO3dCQUNELGlCQUFpQixFQUFFOzRCQUNmO2dDQUNJLElBQUksRUFBRSxVQUFVO2dDQUNoQixrQkFBa0IsRUFBRSxVQUFVO2dDQUM5QixLQUFLLEVBQUU7b0NBQ0g7d0NBQ0ksSUFBSSxFQUFFLE1BQU07d0NBQ1osU0FBUyxFQUFFLGFBQWE7cUNBQzNCO2lDQUNKOzZCQUNKO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDaEIsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMseUNBQXlDLEVBQUU7WUFDMUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztZQUMxQixhQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sT0FBQSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRTtZQUNqRCxhQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNWLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUNILGFBQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ1YsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDckIsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsb0RBQW9ELEVBQUU7WUFDckQsSUFBSSxhQUFhLEdBQUcsMEJBQWlCLENBQUMsTUFBTSxDQUFDO29DQUNwQyxDQUFDO2dCQUNOLElBQUksUUFBUSxHQUFHLDBCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksUUFBUSxTQUFBLENBQUM7Z0JBQ2IsTUFBTSxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDbkMsS0FBSyxRQUFRLENBQUM7b0JBQ2QsS0FBSyxTQUFTO3dCQUNWLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBQ2QsS0FBSyxDQUFDO29CQUNWO3dCQUNJLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQzVCLENBQUM7Z0JBQ0QsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7Z0JBQ3hDLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNCLGFBQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFoQkQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsQ0FBQyxFQUFFO3dCQUE3QixDQUFDO2FBZ0JUO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsa0RBQWtELEVBQUU7WUFDbkQsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLEdBQUcsRUFBRSxFQUFFO3lCQUNWLENBQUM7aUJBQ0wsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUNILGFBQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ1YsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQzs0QkFDSixFQUFFLEVBQUUsRUFBRTt5QkFDVCxDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxhQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNWLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7NEJBQ0osSUFBSSxFQUFFLEVBQUU7eUJBQ1gsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLFFBQVEsRUFBRSxFQUFFO3lCQUNmLENBQUM7aUJBQ0wsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUNILGFBQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ1YsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQzs0QkFDSixPQUFPLEVBQUUsRUFBRTt5QkFDZCxDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxhQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNWLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7NEJBQ0osS0FBSyxFQUFFLEVBQUU7eUJBQ1osQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLFdBQVcsRUFBRSxFQUFFO3lCQUNsQixDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxhQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNWLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7NEJBQ0osaUJBQWlCLEVBQUUsRUFBRTt5QkFDeEIsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsdURBQXVELEVBQUU7WUFDeEQsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLGlCQUFpQixFQUFFLENBQUM7b0NBQ2hCLEdBQUcsRUFBRSxFQUFFO2lDQUNWLENBQUM7eUJBQ0wsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLGlCQUFpQixFQUFFLENBQUM7b0NBQ2hCLE9BQU8sRUFBRSxFQUFFO2lDQUNkLENBQUM7eUJBQ0wsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLGlCQUFpQixFQUFFLENBQUM7b0NBQ2hCLE1BQU0sRUFBRSxFQUFFO2lDQUNiLENBQUM7eUJBQ0wsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLGlCQUFpQixFQUFFLENBQUM7b0NBQ2hCLElBQUksRUFBRSxFQUFFO2lDQUNYLENBQUM7eUJBQ0wsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLGlCQUFpQixFQUFFLENBQUM7b0NBQ2hCLGtCQUFrQixFQUFFLEVBQUU7aUNBQ3pCLENBQUM7eUJBQ0wsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLGlCQUFpQixFQUFFLENBQUM7b0NBQ2hCLFFBQVEsRUFBRSxFQUFFO2lDQUNmLENBQUM7eUJBQ0wsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLGlCQUFpQixFQUFFLENBQUM7b0NBQ2hCLGlCQUFpQixFQUFFLEVBQUU7aUNBQ3hCLENBQUM7eUJBQ0wsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLGlCQUFpQixFQUFFLENBQUM7b0NBQ2hCLE9BQU8sRUFBRSxFQUFFO2lDQUNkLENBQUM7eUJBQ0wsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLGlCQUFpQixFQUFFLENBQUM7b0NBQ2hCLEtBQUssRUFBRSxFQUFFO2lDQUNaLENBQUM7eUJBQ0wsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsaUVBQWlFLEVBQUU7WUFDbEUsYUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDVixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNKLGlCQUFpQixFQUFFO2dDQUNmO29DQUNJLGtCQUFrQixFQUFFLE9BQU87b0NBQzNCLFFBQVEsRUFBRSxPQUFPO2lDQUNwQjs2QkFDSjt5QkFDSixDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxhQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNWLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7NEJBQ0osaUJBQWlCLEVBQUU7Z0NBQ2Y7b0NBQ0ksaUJBQWlCLEVBQUUsT0FBTztvQ0FDMUIsT0FBTyxFQUFFLE9BQU87aUNBQ25COzZCQUNKO3lCQUNKLENBQUM7aUJBQ0wsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUNILGFBQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ1YsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQzs0QkFDSixpQkFBaUIsRUFBRTtnQ0FDZjtvQ0FDSSxrQkFBa0IsRUFBRSxPQUFPO29DQUMzQixpQkFBaUIsRUFBRSxPQUFPO2lDQUM3Qjs2QkFDSjt5QkFDSixDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxrREFBa0QsRUFBRTtZQUNuRCxhQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNWLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7NEJBQ0osS0FBSyxFQUFFLENBQUM7b0NBQ0osSUFBSSxFQUFFLEdBQUc7aUNBQ1osQ0FBQzt5QkFDTCxDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxhQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNWLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7NEJBQ0osS0FBSyxFQUFFLENBQUM7b0NBQ0osS0FBSyxFQUFFLEVBQUU7aUNBQ1osQ0FBQzt5QkFDTCxDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxhQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNWLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7NEJBQ0osS0FBSyxFQUFFLENBQUM7b0NBQ0osSUFBSSxFQUFFLFFBQVE7aUNBQ2pCLENBQUM7eUJBQ0wsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDZixFQUFFLENBQUMsNEJBQTRCLEVBQUU7WUFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLGFBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLGFBQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9Db25maWdUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBDb25maWcgdGVzdHNcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCB7YXNzZXJ0fSBmcm9tICdjaGFpJztcbmltcG9ydCB7Q29uZmlnLCBDT05GSUdfUFJPUEVSVElFU30gZnJvbSAnLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29uZmlnJztcblxuZGVzY3JpYmUoJ0NvbmZpZycsICgpID0+IHtcbiAgICBkZXNjcmliZSgnI2xvYWQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2NhbiBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgYXNzZXJ0LmRvZXNOb3RUaHJvdygoKSA9PiBjb25maWcubG9hZCh7fSkpO1xuICAgICAgICAgICAgYXNzZXJ0LmRvZXNOb3RUaHJvdygoKSA9PiBjb25maWcubG9hZCh7fSkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI3ZhbGlkYXRlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdkb2VzIG5vdCBhZGQgdW5yZWNvZ25pc2VkIHByb3BlcnRpZXMgdG8gdGhlIHZhbGlkYXRlZCBjb25maWcnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgY29uZmlnLmxvYWQoe2hlbGxvOiAnV29ybGQnLCBwYWdlczogW3t3b3JsZDogMTIzfV19KTtcbiAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgbGV0IHZhbGlkYXRlZENvbmZpZyA9IGNvbmZpZy5nZXQoKSBhcyBhbnk7XG4gICAgICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQodmFsaWRhdGVkQ29uZmlnLmhlbGxvKTtcbiAgICAgICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZCh2YWxpZGF0ZWRDb25maWcucGFnZXNbMF0ud29ybGQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ2NoZWNrcyBhIHZhbGlkIGNvbmZpZyB3aXRob3V0IHRocm93aW5nIGFueSBlcnJvcnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgIGJsaXR6X3ZlcnNpb246ICcwLjIuMCcsXG4gICAgICAgICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgICAgICAgICBoZWxsbzogJ1dvcmxkJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBsdWdpbnM6IFsncGFnaW5hdGlvbiddLFxuICAgICAgICAgICAgICAgIHBhZ2VzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogJy8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdpbmRleC5wdWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdtYWluJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdJbmRleCBQYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdhYm91dC5wdWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfcGFnZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnbG9jYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnbG9jYXRpb24ubWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2xvY2F0aW9uLnB1ZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Byb2plY3RzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVfZGlyZWN0b3J5OiAncHJvamVjdHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdtYWluJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZV9rZXk6ICdzcGVjaWFsX2tleScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC5kb2VzTm90VGhyb3coKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndGhyb3dzIGFuIGVycm9yIGlmIG5vIGNvbmZpZyB3YXMgbG9hZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gY29uZmlnLnZhbGlkYXRlKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Rocm93cyBhbiBlcnJvciBpZiB0aGUgY29uZmlnIGlzIG5vdCBhbiBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKG51bGwpOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLW51bGwta2V5d29yZFxuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKCdoZWxsbycpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndGhyb3dzIGFuIGVycm9yIG9uIGluY29ycmVjdCBjb25maWcgcHJvcGVydHkgdHlwZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvcGVydHlDb3VudCA9IENPTkZJR19QUk9QRVJUSUVTLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydHlDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gQ09ORklHX1BST1BFUlRJRVNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRPYmplY3QgPSB7fTtcbiAgICAgICAgICAgICAgICBsZXQgYmFkVmFsdWU7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgcHJvcGVydHkuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgYmFkVmFsdWUgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYmFkVmFsdWUgPSAnc3RyaW5nJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGVudE9iamVjdFtwcm9wZXJ0eS5uYW1lXSA9IGJhZFZhbHVlO1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoY29udGVudE9iamVjdCk7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiBjb25maWcudmFsaWRhdGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndGhyb3dzIGFuIGVycm9yIG9uIGluY29ycmVjdCBwYWdlIHByb3BlcnR5IHR5cGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJpOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHt9LFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDoge30sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51czoge30sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9wYWdlczoge30sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3Rvcmllczoge30sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndGhyb3dzIGFuIGVycm9yIG9uIGluY29ycmVjdCBkaXJlY3RvcnkgcHJvcGVydHkgdHlwZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmk6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmlfa2V5OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRfa2V5OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZToge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX2RpcmVjdG9yaWVzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlX2RpcmVjdG9yeToge30sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkX2RpcmVjdG9yaWVzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudF9kaXJlY3Rvcnk6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudXM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndGhyb3dzIGFuIGVycm9yIG9uIGlsbGVnYWwgY29tYmluYXRpb25zIG9mIGRpcmVjdG9yeSBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRfZGlyZWN0b3JpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlX2RpcmVjdG9yeTogJ2hlbGxvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICd3b3JsZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudF9kaXJlY3Rvcnk6ICdoZWxsbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICd3b3JsZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbmZpZy52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZF9kaXJlY3RvcmllczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVfZGlyZWN0b3J5OiAnaGVsbG8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50X2RpcmVjdG9yeTogJ3dvcmxkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCd0aHJvd3MgYW4gZXJyb3Igb24gaW5jb3JyZWN0IG1lbnUgcHJvcGVydHkgdHlwZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZy5sb2FkKHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51czogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAxMjMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLmxvYWQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcudmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25maWcubG9hZCh7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJyNnZXQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgYSB2YWxpZGF0ZWQgY29uZmlnJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgICAgIGNvbmZpZy5sb2FkKHt9KTtcbiAgICAgICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChjb25maWcuZ2V0KCkpO1xuICAgICAgICAgICAgY29uZmlnLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICBhc3NlcnQuaXNEZWZpbmVkKGNvbmZpZy5nZXQoKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
