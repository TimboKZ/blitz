"use strict";
var chai_1 = require('chai');
var Util_1 = require('../../src/Util');
describe('Util', function () {
    describe('#stripSlashes()', function () {
        it('should return empty string if the string was initially empty', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes(''), '');
        });
        it('should return string unchanged if there are no slashes surrounding it', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('hello/hello'), 'hello/hello');
        });
        it('should correctly remove single trailing slash', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('hello/hello/'), 'hello/hello');
        });
        it('should correctly remove multiple trailing slashes', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('hello/hello////'), 'hello/hello');
        });
        it('should correctly remove single leading slash', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('/hello/hello'), 'hello/hello');
        });
        it('should correctly remove multiple leading slashes', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('//////hello/hello'), 'hello/hello');
        });
        it('should return empty string if there initially only slashes', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('/////'), '');
        });
        it('should correctly remove multiple leading and trailing slashes', function () {
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('//////hello/hello////'), 'hello/hello');
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('//////hello/hello/'), 'hello/hello');
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('/hello/hello/////'), 'hello/hello');
            chai_1.assert.strictEqual(Util_1.Util.stripSlashes('/hello/hello/'), 'hello/hello');
        });
    });
    describe('#getUriComponents()', function () {
        it('should return components correctly without surrounding slashes', function () {
            chai_1.assert.deepEqual(Util_1.Util.getUriComponents('hello/hello'), ['hello', 'hello']);
        });
        it('should return components correctly with a single leading slash', function () {
            chai_1.assert.deepEqual(Util_1.Util.getUriComponents('/hello/hello'), ['hello', 'hello']);
        });
        it('should return components correctly with multiple leading slashes', function () {
            chai_1.assert.deepEqual(Util_1.Util.getUriComponents('/////hello/hello'), ['hello', 'hello']);
        });
        it('should return components correctly with an empty string', function () {
            chai_1.assert.deepEqual(Util_1.Util.getUriComponents(''), []);
        });
    });
    describe('#extractFileName()', function () {
        it('should return string unchanged if it has no extension', function () {
            chai_1.assert.equal(Util_1.Util.extractFileName('hello'), 'hello');
        });
        it('should remove leading directories string unchanged if it has no extension', function () {
            chai_1.assert.equal(Util_1.Util.extractFileName('test/hello'), 'hello');
        });
        it('should remove leading directories string and extension', function () {
            chai_1.assert.equal(Util_1.Util.extractFileName('test/hello.test'), 'hello');
        });
        it('should remove only one extension', function () {
            chai_1.assert.equal(Util_1.Util.extractFileName('test/hello.qwe.test'), 'hello.qwe');
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9VdGlsVGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEscUJBQXFCLE1BQU0sQ0FBQyxDQUFBO0FBQzVCLHFCQUFtQixnQkFBZ0IsQ0FBQyxDQUFBO0FBRXBDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7SUFDYixRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDeEIsRUFBRSxDQUFDLDhEQUE4RCxFQUFFO1lBQy9ELGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx1RUFBdUUsRUFBRTtZQUN4RSxhQUFNLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsK0NBQStDLEVBQUU7WUFDaEQsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1EQUFtRCxFQUFFO1lBQ3BELGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO1lBQy9DLGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxrREFBa0QsRUFBRTtZQUNuRCxhQUFNLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM5RSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyw0REFBNEQsRUFBRTtZQUM3RCxhQUFNLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsK0RBQStELEVBQUU7WUFDaEUsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDOUUsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDM0UsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDMUUsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMscUJBQXFCLEVBQUU7UUFDNUIsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO1lBQ2pFLGFBQU0sQ0FBQyxTQUFTLENBQUMsV0FBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDL0UsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsZ0VBQWdFLEVBQUU7WUFDakUsYUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoRixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxrRUFBa0UsRUFBRTtZQUNuRSxhQUFNLENBQUMsU0FBUyxDQUFDLFdBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEYsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMseURBQXlELEVBQUU7WUFDMUQsYUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtRQUMzQixFQUFFLENBQUMsdURBQXVELEVBQUU7WUFDeEQsYUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDJFQUEyRSxFQUFFO1lBQzVFLGFBQU0sQ0FBQyxLQUFLLENBQUMsV0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx3REFBd0QsRUFBRTtZQUN6RCxhQUFNLENBQUMsS0FBSyxDQUFDLFdBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtZQUNuQyxhQUFNLENBQUMsS0FBSyxDQUFDLFdBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L1V0aWxUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBVdGlsIGNsYXNzIHRlc3RzXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuXG5pbXBvcnQge2Fzc2VydH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQge1V0aWx9IGZyb20gJy4uLy4uL3NyYy9VdGlsJztcblxuZGVzY3JpYmUoJ1V0aWwnLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJyNzdHJpcFNsYXNoZXMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIHRoZSBzdHJpbmcgd2FzIGluaXRpYWxseSBlbXB0eScsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnJyksICcnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHN0cmluZyB1bmNoYW5nZWQgaWYgdGhlcmUgYXJlIG5vIHNsYXNoZXMgc3Vycm91bmRpbmcgaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJ2hlbGxvL2hlbGxvJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcmVtb3ZlIHNpbmdsZSB0cmFpbGluZyBzbGFzaCcsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnaGVsbG8vaGVsbG8vJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcmVtb3ZlIG11bHRpcGxlIHRyYWlsaW5nIHNsYXNoZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJ2hlbGxvL2hlbGxvLy8vLycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHJlbW92ZSBzaW5nbGUgbGVhZGluZyBzbGFzaCcsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnL2hlbGxvL2hlbGxvJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcmVtb3ZlIG11bHRpcGxlIGxlYWRpbmcgc2xhc2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnLy8vLy8vaGVsbG8vaGVsbG8nKSwgJ2hlbGxvL2hlbGxvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgdGhlcmUgaW5pdGlhbGx5IG9ubHkgc2xhc2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnLy8vLy8nKSwgJycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcmVtb3ZlIG11bHRpcGxlIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJy8vLy8vL2hlbGxvL2hlbGxvLy8vLycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnLy8vLy8vaGVsbG8vaGVsbG8vJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCcvaGVsbG8vaGVsbG8vLy8vLycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnL2hlbGxvL2hlbGxvLycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJyNnZXRVcmlDb21wb25lbnRzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvbXBvbmVudHMgY29ycmVjdGx5IHdpdGhvdXQgc3Vycm91bmRpbmcgc2xhc2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoVXRpbC5nZXRVcmlDb21wb25lbnRzKCdoZWxsby9oZWxsbycpLCBbJ2hlbGxvJywgJ2hlbGxvJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29tcG9uZW50cyBjb3JyZWN0bHkgd2l0aCBhIHNpbmdsZSBsZWFkaW5nIHNsYXNoJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChVdGlsLmdldFVyaUNvbXBvbmVudHMoJy9oZWxsby9oZWxsbycpLCBbJ2hlbGxvJywgJ2hlbGxvJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29tcG9uZW50cyBjb3JyZWN0bHkgd2l0aCBtdWx0aXBsZSBsZWFkaW5nIHNsYXNoZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFV0aWwuZ2V0VXJpQ29tcG9uZW50cygnLy8vLy9oZWxsby9oZWxsbycpLCBbJ2hlbGxvJywgJ2hlbGxvJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29tcG9uZW50cyBjb3JyZWN0bHkgd2l0aCBhbiBlbXB0eSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFV0aWwuZ2V0VXJpQ29tcG9uZW50cygnJyksIFtdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJyNleHRyYWN0RmlsZU5hbWUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gc3RyaW5nIHVuY2hhbmdlZCBpZiBpdCBoYXMgbm8gZXh0ZW5zaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFV0aWwuZXh0cmFjdEZpbGVOYW1lKCdoZWxsbycpLCAnaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVtb3ZlIGxlYWRpbmcgZGlyZWN0b3JpZXMgc3RyaW5nIHVuY2hhbmdlZCBpZiBpdCBoYXMgbm8gZXh0ZW5zaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFV0aWwuZXh0cmFjdEZpbGVOYW1lKCd0ZXN0L2hlbGxvJyksICdoZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgbGVhZGluZyBkaXJlY3RvcmllcyBzdHJpbmcgYW5kIGV4dGVuc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChVdGlsLmV4dHJhY3RGaWxlTmFtZSgndGVzdC9oZWxsby50ZXN0JyksICdoZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgb25seSBvbmUgZXh0ZW5zaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFV0aWwuZXh0cmFjdEZpbGVOYW1lKCd0ZXN0L2hlbGxvLnF3ZS50ZXN0JyksICdoZWxsby5xd2UnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdfQ==
