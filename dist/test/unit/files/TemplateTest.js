"use strict";
var pug = require('pug');
var chai_1 = require('chai');
var Template_1 = require('../../../src/files/Template');
describe('Template', function () {
    describe('#prepare()', function () {
        it('extracts IDs correctly', function () {
            var template = new Template_1.Template();
            var templateString = '-- url(\'hello\')\n-- url(\'world\')\n-- url()';
            template.prepare(templateString, {}, {});
            chai_1.assert.deepEqual(template.getIds(), ['hello', 'world']);
        });
        it('extracts assets correctly', function () {
            var template = new Template_1.Template();
            var templateString = '-- asset(\'style.css\')\n-- asset(\'world.js\')';
            template.prepare(templateString, {}, {});
            chai_1.assert.deepEqual(template.getAssets(), ['style.css', 'world.js']);
        });
        it('extracts menus correctly', function () {
            var template = new Template_1.Template();
            var templateString = 'each value in menus.main\n  p= value';
            templateString += '\neach value in menus.secondary\n  p= value';
            var menusObject = {
                main: [],
                secondary: [],
            };
            template.prepare(templateString, {}, menusObject);
            chai_1.assert.deepEqual(template.getMenus(), ['main', 'secondary']);
        });
    });
    describe('#generate()', function () {
        it('throws an error if nothing was prepared', function () {
            var template = new Template_1.Template();
            chai_1.assert.throws(function () { return template.generate(); });
        });
        it('generates HTML string correctly', function () {
            var template = new Template_1.Template();
            var templateString = 'p Hello World!';
            template.prepare(templateString, {}, {});
            chai_1.assert.equal(template.generate(), pug.render(templateString));
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9maWxlcy9UZW1wbGF0ZVRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBLElBQVksR0FBRyxXQUFNLEtBQUssQ0FBQyxDQUFBO0FBQzNCLHFCQUFxQixNQUFNLENBQUMsQ0FBQTtBQUM1Qix5QkFBdUIsNkJBQTZCLENBQUMsQ0FBQTtBQUdyRCxRQUFRLENBQUMsVUFBVSxFQUFFO0lBQ2pCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDbkIsRUFBRSxDQUFDLHdCQUF3QixFQUFFO1lBQ3pCLElBQUksUUFBUSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksY0FBYyxHQUFHLGdEQUFnRCxDQUFDO1lBQ3RFLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6QyxhQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1lBQzVCLElBQUksUUFBUSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksY0FBYyxHQUFHLGlEQUFpRCxDQUFDO1lBQ3ZFLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6QyxhQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDBCQUEwQixFQUFFO1lBQzNCLElBQUksUUFBUSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksY0FBYyxHQUFHLHNDQUFzQyxDQUFDO1lBQzVELGNBQWMsSUFBSSw2Q0FBNkMsQ0FBQztZQUNoRSxJQUFJLFdBQVcsR0FBaUI7Z0JBQzVCLElBQUksRUFBRSxFQUFFO2dCQUNSLFNBQVMsRUFBRSxFQUFFO2FBQ2hCLENBQUM7WUFDRixRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDbEQsYUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUNwQixFQUFFLENBQUMseUNBQXlDLEVBQUU7WUFDMUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDOUIsYUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsaUNBQWlDLEVBQUU7WUFDbEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7WUFDdEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLGFBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2ZpbGVzL1RlbXBsYXRlVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgVGVtcGxhdGUgdGVzdHNcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCAqIGFzIHB1ZyBmcm9tICdwdWcnO1xuaW1wb3J0IHthc3NlcnR9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtUZW1wbGF0ZX0gZnJvbSAnLi4vLi4vLi4vc3JjL2ZpbGVzL1RlbXBsYXRlJztcbmltcG9ydCB7SVNpdGVNZW51TWFwfSBmcm9tICcuLi8uLi8uLi9zcmMvTWVudSc7XG5cbmRlc2NyaWJlKCdUZW1wbGF0ZScsICgpID0+IHtcbiAgICBkZXNjcmliZSgnI3ByZXBhcmUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2V4dHJhY3RzIElEcyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZVN0cmluZyA9ICctLSB1cmwoXFwnaGVsbG9cXCcpXFxuLS0gdXJsKFxcJ3dvcmxkXFwnKVxcbi0tIHVybCgpJztcbiAgICAgICAgICAgIHRlbXBsYXRlLnByZXBhcmUodGVtcGxhdGVTdHJpbmcsIHt9LCB7fSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHRlbXBsYXRlLmdldElkcygpLCBbJ2hlbGxvJywgJ3dvcmxkJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ2V4dHJhY3RzIGFzc2V0cyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZVN0cmluZyA9ICctLSBhc3NldChcXCdzdHlsZS5jc3NcXCcpXFxuLS0gYXNzZXQoXFwnd29ybGQuanNcXCcpJztcbiAgICAgICAgICAgIHRlbXBsYXRlLnByZXBhcmUodGVtcGxhdGVTdHJpbmcsIHt9LCB7fSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHRlbXBsYXRlLmdldEFzc2V0cygpLCBbJ3N0eWxlLmNzcycsICd3b3JsZC5qcyddKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdleHRyYWN0cyBtZW51cyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZVN0cmluZyA9ICdlYWNoIHZhbHVlIGluIG1lbnVzLm1haW5cXG4gIHA9IHZhbHVlJztcbiAgICAgICAgICAgIHRlbXBsYXRlU3RyaW5nICs9ICdcXG5lYWNoIHZhbHVlIGluIG1lbnVzLnNlY29uZGFyeVxcbiAgcD0gdmFsdWUnO1xuICAgICAgICAgICAgbGV0IG1lbnVzT2JqZWN0OiBJU2l0ZU1lbnVNYXAgPSB7XG4gICAgICAgICAgICAgICAgbWFpbjogW10sXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiBbXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0ZW1wbGF0ZS5wcmVwYXJlKHRlbXBsYXRlU3RyaW5nLCB7fSwgbWVudXNPYmplY3QpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh0ZW1wbGF0ZS5nZXRNZW51cygpLCBbJ21haW4nLCAnc2Vjb25kYXJ5J10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI2dlbmVyYXRlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0aHJvd3MgYW4gZXJyb3IgaWYgbm90aGluZyB3YXMgcHJlcGFyZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gdGVtcGxhdGUuZ2VuZXJhdGUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnZ2VuZXJhdGVzIEhUTUwgc3RyaW5nIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlU3RyaW5nID0gJ3AgSGVsbG8gV29ybGQhJztcbiAgICAgICAgICAgIHRlbXBsYXRlLnByZXBhcmUodGVtcGxhdGVTdHJpbmcsIHt9LCB7fSk7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwodGVtcGxhdGUuZ2VuZXJhdGUoKSwgcHVnLnJlbmRlcih0ZW1wbGF0ZVN0cmluZykpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19