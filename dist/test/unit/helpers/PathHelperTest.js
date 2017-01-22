"use strict";
var path = require('path');
var chai_1 = require('chai');
var PathHelper_1 = require('../../../src/helpers/PathHelper');
describe('PathHelper', function () {
    describe('#join()', function () {
        it('identical to `path.join` for multiple strings', function () {
            chai_1.assert.equal(PathHelper_1.PathHelper.join('hello', 'world'), path.join('hello', 'world'));
        });
        it('correctly joins arrays', function () {
            chai_1.assert.equal(PathHelper_1.PathHelper.join(['hello', 'world']), path.join('hello', 'world'));
        });
        it('correctly joins arrays and string', function () {
            chai_1.assert.equal(PathHelper_1.PathHelper.join(['hello', 'world'], 'wooo'), path.join('hello', 'world', 'wooo'));
        });
        it('correctly joins nested arrays', function () {
            chai_1.assert.equal(PathHelper_1.PathHelper.join(['hello', ['world', 'wooo']]), path.join('hello', 'world', 'wooo'));
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9oZWxwZXJzL1BhdGhIZWxwZXJUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQSxJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUM3QixxQkFBcUIsTUFBTSxDQUFDLENBQUE7QUFDNUIsMkJBQXlCLGlDQUFpQyxDQUFDLENBQUE7QUFFM0QsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUNuQixRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2hCLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtZQUNoRCxhQUFNLENBQUMsS0FBSyxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHdCQUF3QixFQUFFO1lBQ3pCLGFBQU0sQ0FBQyxLQUFLLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO1lBQ3BDLGFBQU0sQ0FBQyxLQUFLLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkcsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsK0JBQStCLEVBQUU7WUFDaEMsYUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckcsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9oZWxwZXJzL1BhdGhIZWxwZXJUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7YXNzZXJ0fSBmcm9tICdjaGFpJztcbmltcG9ydCB7UGF0aEhlbHBlcn0gZnJvbSAnLi4vLi4vLi4vc3JjL2hlbHBlcnMvUGF0aEhlbHBlcic7XG5cbmRlc2NyaWJlKCdQYXRoSGVscGVyJywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCcjam9pbigpJywgKCkgPT4ge1xuICAgICAgICBpdCgnaWRlbnRpY2FsIHRvIGBwYXRoLmpvaW5gIGZvciBtdWx0aXBsZSBzdHJpbmdzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFBhdGhIZWxwZXIuam9pbignaGVsbG8nLCAnd29ybGQnKSwgcGF0aC5qb2luKCdoZWxsbycsICd3b3JsZCcpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdjb3JyZWN0bHkgam9pbnMgYXJyYXlzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFBhdGhIZWxwZXIuam9pbihbJ2hlbGxvJywgJ3dvcmxkJ10pLCBwYXRoLmpvaW4oJ2hlbGxvJywgJ3dvcmxkJykpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ2NvcnJlY3RseSBqb2lucyBhcnJheXMgYW5kIHN0cmluZycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChQYXRoSGVscGVyLmpvaW4oWydoZWxsbycsICd3b3JsZCddLCAnd29vbycpLCBwYXRoLmpvaW4oJ2hlbGxvJywgJ3dvcmxkJywgJ3dvb28nKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnY29ycmVjdGx5IGpvaW5zIG5lc3RlZCBhcnJheXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoUGF0aEhlbHBlci5qb2luKFsnaGVsbG8nLCBbJ3dvcmxkJywgJ3dvb28nXV0pLCBwYXRoLmpvaW4oJ2hlbGxvJywgJ3dvcmxkJywgJ3dvb28nKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
