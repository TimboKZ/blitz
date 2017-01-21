"use strict";
var colors = require("colors");
var chai_1 = require("chai");
var Logger_1 = require("../../src/Logger");
describe('Logger', function () {
    describe('#brand()', function () {
        it('colours a string', function () {
            var plainString = 'hello world';
            var colouredString = Logger_1.Logger.brand(plainString);
            if (colors.enabled) {
                chai_1.assert.notEqual(colouredString, plainString);
            }
            chai_1.assert.equal(colors.strip(colouredString), plainString);
        });
    });
    describe('#logWithPrefix()', function () {
        var consoleLog = console.log;
        var output = '';
        beforeEach(function (done) {
            console.log = function (message) {
                output = message;
            };
            done();
        });
        afterEach(function (done) {
            console.log = consoleLog;
            done();
        });
        it('adds a prefix to a string', function () {
            Logger_1.Logger.logWithPrefix('hello', 'world');
            chai_1.assert.equal(output, 'hello world');
            chai_1.assert.equal(Logger_1.Logger.logWithPrefix('hello', 'world', false), 'hello world');
        });
    });
    describe('#log()', function () {
        var consoleLog = console.log;
        var output = '';
        beforeEach(function (done) {
            output = '';
            console.log = function (message) {
                output = message;
            };
            done();
        });
        afterEach(function (done) {
            console.log = consoleLog;
            done();
        });
        it('only prints Log and Warn levels if verbose option is on', function () {
            global.verbose = false;
            Logger_1.Logger.log('Hello World', Logger_1.LogLevel.Log);
            chai_1.assert.equal(output, '');
            Logger_1.Logger.log('Hello World', Logger_1.LogLevel.Warn);
            chai_1.assert.equal(output, '');
            global.verbose = true;
            Logger_1.Logger.log('Hello', Logger_1.LogLevel.Log);
            chai_1.assert.notEqual(output, '');
            output = '';
            Logger_1.Logger.log('World', Logger_1.LogLevel.Warn);
            chai_1.assert.notEqual(output, '');
        });
        it('only prints Debug level if debug option is on', function () {
            global.debug = false;
            Logger_1.Logger.log('Hello World', Logger_1.LogLevel.Debug);
            chai_1.assert.equal(output, '');
            global.debug = true;
            Logger_1.Logger.log('Hello', Logger_1.LogLevel.Debug);
            chai_1.assert.notEqual(output, '');
        });
        it('always prints errors', function () {
            global.debug = false;
            global.verbose = false;
            Logger_1.Logger.log('Hello World', Logger_1.LogLevel.Error);
            chai_1.assert.notEqual(output, '');
        });
        it('indents the string after the newline character', function () {
            global.debug = false;
            global.verbose = true;
            Logger_1.Logger.log('Hello\nWorld');
            chai_1.assert.isTrue(/\n(\s)+/g.test(output));
        });
    });
    describe('#logMany()', function () {
        it('logs an array', function () {
            var consoleLog = console.log;
            var output = [];
            console.log = function (message) {
                output.push(message);
            };
            Logger_1.Logger.logMany(['1', '2', '3']);
            chai_1.assert.equal(output.length, 3);
            console.log = consoleLog;
        });
    });
    describe('#split()', function () {
        it('trims newline characters', function () {
            var testString = '\n\n\nHello\n\n\n';
            chai_1.assert.deepEqual(Logger_1.Logger.split(testString), ['Hello']);
        });
        it('breaks string into an array correctly', function () {
            var testString = '\n\n\nHello\nWorld\n\n\n';
            chai_1.assert.deepEqual(Logger_1.Logger.split(testString), ['Hello', 'World']);
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9Mb2dnZXJUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQSwrQkFBaUM7QUFDakMsNkJBQTRCO0FBQzVCLDJDQUFrRDtBQUVsRCxRQUFRLENBQUMsUUFBUSxFQUFFO0lBQ2YsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNqQixFQUFFLENBQUMsa0JBQWtCLEVBQUU7WUFDbkIsSUFBSSxXQUFXLEdBQUcsYUFBYSxDQUFDO1lBQ2hDLElBQUksY0FBYyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0MsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLGFBQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFDRCxhQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtRQUN6QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQzdCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixVQUFVLENBQUMsVUFBQyxJQUFJO1lBQ1osT0FBTyxDQUFDLEdBQUcsR0FBRyxVQUFDLE9BQWdCO2dCQUMzQixNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ3JCLENBQUMsQ0FBQztZQUNGLElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDSCxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ1gsT0FBTyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7WUFDekIsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywyQkFBMkIsRUFBRTtZQUM1QixlQUFNLENBQUMs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QU0sQ0FBQyxTQUFTLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvTG9nZ2VyVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgTG9nZ2VyIHRlc3RzXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuXG5pbXBvcnQgKiBhcyBjb2xvcnMgZnJvbSAnY29sb3JzJztcbmltcG9ydCB7YXNzZXJ0fSBmcm9tICdjaGFpJztcbmltcG9ydCB7TG9nZ2VyLCBMb2dMZXZlbH0gZnJvbSAnLi4vLi4vc3JjL0xvZ2dlcic7XG5cbmRlc2NyaWJlKCdMb2dnZXInLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJyNicmFuZCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnY29sb3VycyBhIHN0cmluZycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwbGFpblN0cmluZyA9ICdoZWxsbyB3b3JsZCc7XG4gICAgICAgICAgICBsZXQgY29sb3VyZWRTdHJpbmcgPSBMb2dnZXIuYnJhbmQocGxhaW5TdHJpbmcpO1xuICAgICAgICAgICAgaWYgKGNvbG9ycy5lbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKGNvbG91cmVkU3RyaW5nLCBwbGFpblN0cmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoY29sb3JzLnN0cmlwKGNvbG91cmVkU3RyaW5nKSwgcGxhaW5TdHJpbmcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI2xvZ1dpdGhQcmVmaXgoKScsICgpID0+IHtcbiAgICAgICAgbGV0IGNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcbiAgICAgICAgbGV0IG91dHB1dCA9ICcnO1xuICAgICAgICBiZWZvcmVFYWNoKChkb25lKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyA9IChtZXNzYWdlPzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhZnRlckVhY2goKGRvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nID0gY29uc29sZUxvZztcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FkZHMgYSBwcmVmaXggdG8gYSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICBMb2dnZXIubG9nV2l0aFByZWZpeCgnaGVsbG8nLCAnd29ybGQnKTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChvdXRwdXQsICdoZWxsbyB3b3JsZCcpO1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKExvZ2dlci5sb2dXaXRoUHJlZml4KCdoZWxsbycsICd3b3JsZCcsIGZhbHNlKSwgJ2hlbGxvIHdvcmxkJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCcjbG9nKCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBjb25zb2xlTG9nID0gY29uc29sZS5sb2c7XG4gICAgICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICAgICAgYmVmb3JlRWFjaCgoZG9uZSkgPT4ge1xuICAgICAgICAgICAgb3V0cHV0ID0gJyc7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyA9IChtZXNzYWdlPzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhZnRlckVhY2goKGRvbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nID0gY29uc29sZUxvZztcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ29ubHkgcHJpbnRzIExvZyBhbmQgV2FybiBsZXZlbHMgaWYgdmVyYm9zZSBvcHRpb24gaXMgb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwudmVyYm9zZSA9IGZhbHNlO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZygnSGVsbG8gV29ybGQnLCBMb2dMZXZlbC5Mb2cpO1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKG91dHB1dCwgJycpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZygnSGVsbG8gV29ybGQnLCBMb2dMZXZlbC5XYXJuKTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChvdXRwdXQsICcnKTtcbiAgICAgICAgICAgIGdsb2JhbC52ZXJib3NlID0gdHJ1ZTtcbiAgICAgICAgICAgIExvZ2dlci5sb2coJ0hlbGxvJywgTG9nTGV2ZWwuTG9nKTtcbiAgICAgICAgICAgIGFzc2VydC5ub3RFcXVhbChvdXRwdXQsICcnKTtcbiAgICAgICAgICAgIG91dHB1dCA9ICcnO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZygnV29ybGQnLCBMb2dMZXZlbC5XYXJuKTtcbiAgICAgICAgICAgIGFzc2VydC5ub3RFcXVhbChvdXRwdXQsICcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ29ubHkgcHJpbnRzIERlYnVnIGxldmVsIGlmIGRlYnVnIG9wdGlvbiBpcyBvbicsICgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5kZWJ1ZyA9IGZhbHNlO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZygnSGVsbG8gV29ybGQnLCBMb2dMZXZlbC5EZWJ1Zyk7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwob3V0cHV0LCAnJyk7XG4gICAgICAgICAgICBnbG9iYWwuZGVidWcgPSB0cnVlO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZygnSGVsbG8nLCBMb2dMZXZlbC5EZWJ1Zyk7XG4gICAgICAgICAgICBhc3NlcnQubm90RXF1YWwob3V0cHV0LCAnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhbHdheXMgcHJpbnRzIGVycm9ycycsICgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5kZWJ1ZyA9IGZhbHNlO1xuICAgICAgICAgICAgZ2xvYmFsLnZlcmJvc2UgPSBmYWxzZTtcbiAgICAgICAgICAgIExvZ2dlci5sb2coJ0hlbGxvIFdvcmxkJywgTG9nTGV2ZWwuRXJyb3IpO1xuICAgICAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKG91dHB1dCwgJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaW5kZW50cyB0aGUgc3RyaW5nIGFmdGVyIHRoZSBuZXdsaW5lIGNoYXJhY3RlcicsICgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5kZWJ1ZyA9IGZhbHNlO1xuICAgICAgICAgICAgZ2xvYmFsLnZlcmJvc2UgPSB0cnVlO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZygnSGVsbG9cXG5Xb3JsZCcpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZSgvXFxuKFxccykrL2cudGVzdChvdXRwdXQpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJyNsb2dNYW55KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdsb2dzIGFuIGFycmF5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcbiAgICAgICAgICAgIGxldCBvdXRwdXQgPSBbXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nID0gKG1lc3NhZ2U/OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBMb2dnZXIubG9nTWFueShbJzEnLCAnMicsICczJ10pO1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKG91dHB1dC5sZW5ndGgsIDMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cgPSBjb25zb2xlTG9nO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI3NwbGl0KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0cmltcyBuZXdsaW5lIGNoYXJhY3RlcnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVzdFN0cmluZyA9ICdcXG5cXG5cXG5IZWxsb1xcblxcblxcbic7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKExvZ2dlci5zcGxpdCh0ZXN0U3RyaW5nKSwgWydIZWxsbyddKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdicmVha3Mgc3RyaW5nIGludG8gYW4gYXJyYXkgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRlc3RTdHJpbmcgPSAnXFxuXFxuXFxuSGVsbG9cXG5Xb3JsZFxcblxcblxcbic7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKExvZ2dlci5zcGxpdCh0ZXN0U3RyaW5nKSwgWydIZWxsbycsICdXb3JsZCddKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdfQ==
