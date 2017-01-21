"use strict";
var pug = require("pug");
var chai_1 = require("chai");
var Template_1 = require("../../../src/files/Template");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9maWxlcy9UZW1wbGF0ZVRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBLHlCQUEyQjtBQUMzQiw2QkFBNEI7QUFDNUIsd0RBQXFEO0FBR3JELFFBQVEsQ0FBQyxVQUFVLEVBQUU7SUFDakIsUUFBUSxDQUFDLFlBQVksRUFBRTtRQUNuQixFQUFFLENBQUMsd0JBQXdCLEVBQUU7WUFDekIsSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxjQUFjLEdBQUcsZ0RBQWdELENBQUM7WUFDdEUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLGFBQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMkJBQTJCLEVBQUU7WUFDNUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxjQUFjLEdBQUcsaURBQWlELENBQUM7WUFDdkUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLGFBQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMEJBQTBCLEVBQUU7WUFDM0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxjQUFjLEdBQUcsc0NBQXNDLENBQUM7WUFDNUQsY0FBYyxJQUFJLDZDQUE2QyxDQUFDO1lBQ2hFLElBQUksV0FBVyxHQUFpQjtnQkFDNUIsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsU0FBUyxFQUFFLEVBQUU7YUFDaEIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNsRCxhQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3BCLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTtZQUMxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztZQUM5QixhQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtZQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztZQUM5QixJQUFJLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztZQUN0QyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekMsYUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvZmlsZXMvVGVtcGxhdGVUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBUZW1wbGF0ZSB0ZXN0c1xuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuaW1wb3J0ICogYXMgcHVnIGZyb20gJ3B1Zyc7XG5pbXBvcnQge2Fzc2VydH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQge1RlbXBsYXRlfSBmcm9tICcuLi8uLi8uLi9zcmMvZmlsZXMvVGVtcGxhdGUnO1xuaW1wb3J0IHtJU2l0ZU1lbnVNYXB9IGZyb20gJy4uLy4uLy4uL3NyYy9NZW51JztcblxuZGVzY3JpYmUoJ1RlbXBsYXRlJywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCcjcHJlcGFyZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnZXh0cmFjdHMgSURzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlU3RyaW5nID0gJy0tIHVybChcXCdoZWxsb1xcJylcXG4tLSB1cmwoXFwnd29ybGRcXCcpXFxuLS0gdXJsKCknO1xuICAgICAgICAgICAgdGVtcGxhdGUucHJlcGFyZSh0ZW1wbGF0ZVN0cmluZywge30sIHt9KTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwodGVtcGxhdGUuZ2V0SWRzKCksIFsnaGVsbG8nLCAnd29ybGQnXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnZXh0cmFjdHMgYXNzZXRzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlU3RyaW5nID0gJy0tIGFzc2V0KFxcJ3N0eWxlLmNzc1xcJylcXG4tLSBhc3NldChcXCd3b3JsZC5qc1xcJyknO1xuICAgICAgICAgICAgdGVtcGxhdGUucHJlcGFyZSh0ZW1wbGF0ZVN0cmluZywge30sIHt9KTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwodGVtcGxhdGUuZ2V0QXNzZXRzKCksIFsnc3R5bGUuY3NzJywgJ3dvcmxkLmpzJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ2V4dHJhY3RzIG1lbnVzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlU3RyaW5nID0gJ2VhY2ggdmFsdWUgaW4gbWVudXMubWFpblxcbiAgcD0gdmFsdWUnO1xuICAgICAgICAgICAgdGVtcGxhdGVTdHJpbmcgKz0gJ1xcbmVhY2ggdmFsdWUgaW4gbWVudXMuc2Vjb25kYXJ5XFxuICBwPSB2YWx1ZSc7XG4gICAgICAgICAgICBsZXQgbWVudXNPYmplY3Q6IElTaXRlTWVudU1hcCA9IHtcbiAgICAgICAgICAgICAgICBtYWluOiBbXSxcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnk6IFtdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRlbXBsYXRlLnByZXBhcmUodGVtcGxhdGVTdHJpbmcsIHt9LCBtZW51c09iamVjdCk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHRlbXBsYXRlLmdldE1lbnVzKCksIFsnbWFpbicsICdzZWNvbmRhcnknXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCcjZ2VuZXJhdGUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Rocm93cyBhbiBlcnJvciBpZiBub3RoaW5nIHdhcyBwcmVwYXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xuICAgICAgICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB0ZW1wbGF0ZS5nZW5lcmF0ZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdnZW5lcmF0ZXMgSFRNTCBzdHJpbmcgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gbmV3IFRlbXBsYXRlKCk7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGVTdHJpbmcgPSAncCBIZWxsbyBXb3JsZCEnO1xuICAgICAgICAgICAgdGVtcGxhdGUucHJlcGFyZSh0ZW1wbGF0ZVN0cmluZywge30sIHt9KTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbCh0ZW1wbGF0ZS5nZW5lcmF0ZSgpLCBwdWcucmVuZGVyKHRlbXBsYXRlU3RyaW5nKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
