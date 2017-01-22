"use strict";
var pug = require('pug');
var chai_1 = require('chai');
var Template_1 = require('../../../src/components/Template');
describe('Template', function () {
    describe('#prepare()', function () {
        it('extracts IDs correctly', function () {
            var template = new Template_1.Template();
            var templateString = '-- url(\'hello\')\n-- url(\'world\')\n-- url()';
            template.prepare(templateString, '', {}, {});
            chai_1.assert.deepEqual(template.getIds(), ['hello', 'world']);
        });
        it('extracts assets correctly', function () {
            var template = new Template_1.Template();
            var templateString = '-- asset(\'style.css\')\n-- asset(\'world.js\')';
            template.prepare(templateString, '', {}, {});
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
            template.prepare(templateString, '', {}, menusObject);
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
            template.prepare(templateString, '', {}, {});
            chai_1.assert.equal(template.generate(), pug.render(templateString));
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9maWxlcy9UZW1wbGF0ZVRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBLElBQVksR0FBRyxXQUFNLEtBQUssQ0FBQyxDQUFBO0FBQzNCLHFCQUFxQixNQUFNLENBQUMsQ0FBQTtBQUM1Qix5QkFBdUIsa0NBQWtDLENBQUMsQ0FBQTtBQUcxRCxRQUFRLENBQUMsVUFBVSxFQUFFO0lBQ2pCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDbkIsRUFBRSxDQUFDLHdCQUF3QixFQUFFO1lBQ3pCLElBQUksUUFBUSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksY0FBYyxHQUFHLGdEQUFnRCxDQUFDO1lBQ3RFLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0MsYUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywyQkFBMkIsRUFBRTtZQUM1QixJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztZQUM5QixJQUFJLGNBQWMsR0FBRyxpREFBaUQsQ0FBQztZQUN2RSxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLGFBQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMEJBQTBCLEVBQUU7WUFDM0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxjQUFjLEdBQUcsc0NBQXNDLENBQUM7WUFDNUQsY0FBYyxJQUFJLDZDQUE2QyxDQUFDO1lBQ2hFLElBQUksV0FBVyxHQUFpQjtnQkFDNUIsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsU0FBUyxFQUFFLEVBQUU7YUFDaEIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDdEQsYUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUNwQixFQUFFLENBQUMseUNBQXlDLEVBQUU7WUFDMUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDOUIsYUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsaUNBQWlDLEVBQUU7WUFDbEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7WUFDdEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3QyxhQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9maWxlcy9UZW1wbGF0ZVRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIFRlbXBsYXRlIHRlc3RzXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuXG5pbXBvcnQgKiBhcyBwdWcgZnJvbSAncHVnJztcbmltcG9ydCB7YXNzZXJ0fSBmcm9tICdjaGFpJztcbmltcG9ydCB7VGVtcGxhdGV9IGZyb20gJy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1RlbXBsYXRlJztcbmltcG9ydCB7SVNpdGVNZW51TWFwfSBmcm9tICcuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9NZW51JztcblxuZGVzY3JpYmUoJ1RlbXBsYXRlJywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCcjcHJlcGFyZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnZXh0cmFjdHMgSURzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlU3RyaW5nID0gJy0tIHVybChcXCdoZWxsb1xcJylcXG4tLSB1cmwoXFwnd29ybGRcXCcpXFxuLS0gdXJsKCknO1xuICAgICAgICAgICAgdGVtcGxhdGUucHJlcGFyZSh0ZW1wbGF0ZVN0cmluZywgJycsIHt9LCB7fSk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHRlbXBsYXRlLmdldElkcygpLCBbJ2hlbGxvJywgJ3dvcmxkJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ2V4dHJhY3RzIGFzc2V0cyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZVN0cmluZyA9ICctLSBhc3NldChcXCdzdHlsZS5jc3NcXCcpXFxuLS0gYXNzZXQoXFwnd29ybGQuanNcXCcpJztcbiAgICAgICAgICAgIHRlbXBsYXRlLnByZXBhcmUodGVtcGxhdGVTdHJpbmcsICcnLCB7fSwge30pO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh0ZW1wbGF0ZS5nZXRBc3NldHMoKSwgWydzdHlsZS5jc3MnLCAnd29ybGQuanMnXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnZXh0cmFjdHMgbWVudXMgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gbmV3IFRlbXBsYXRlKCk7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGVTdHJpbmcgPSAnZWFjaCB2YWx1ZSBpbiBtZW51cy5tYWluXFxuICBwPSB2YWx1ZSc7XG4gICAgICAgICAgICB0ZW1wbGF0ZVN0cmluZyArPSAnXFxuZWFjaCB2YWx1ZSBpbiBtZW51cy5zZWNvbmRhcnlcXG4gIHA9IHZhbHVlJztcbiAgICAgICAgICAgIGxldCBtZW51c09iamVjdDogSVNpdGVNZW51TWFwID0ge1xuICAgICAgICAgICAgICAgIG1haW46IFtdLFxuICAgICAgICAgICAgICAgIHNlY29uZGFyeTogW10sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGVtcGxhdGUucHJlcGFyZSh0ZW1wbGF0ZVN0cmluZywgJycsIHt9LCBtZW51c09iamVjdCk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHRlbXBsYXRlLmdldE1lbnVzKCksIFsnbWFpbicsICdzZWNvbmRhcnknXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCcjZ2VuZXJhdGUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Rocm93cyBhbiBlcnJvciBpZiBub3RoaW5nIHdhcyBwcmVwYXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB0ZW1wbGF0ZS5nZW5lcmF0ZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdnZW5lcmF0ZXMgSFRNTCBzdHJpbmcgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gbmV3IFRlbXBsYXRlKCk7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGVTdHJpbmcgPSAncCBIZWxsbyBXb3JsZCEnO1xuICAgICAgICAgICAgdGVtcGxhdGUucHJlcGFyZSh0ZW1wbGF0ZVN0cmluZywgJycsIHt9LCB7fSk7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwodGVtcGxhdGUuZ2VuZXJhdGUoKSwgcHVnLnJlbmRlcih0ZW1wbGF0ZVN0cmluZykpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
