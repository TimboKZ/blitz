"use strict";
var chai_1 = require("chai");
var Util_1 = require("../../src/helpers/Util");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9VdGlsVGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsNkJBQTRCO0FBQzVCLCtDQUE0QztBQUU1QyxRQUFRLENBQUMsTUFBTSxFQUFFO0lBQ2IsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQ3hCLEVBQUUsQ0FBQyw4REFBOEQsRUFBRTtZQUMvRCxhQUFNLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsdUVBQXVFLEVBQUU7WUFDeEUsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLCtDQUErQyxFQUFFO1lBQ2hELGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtZQUNwRCxhQUFNLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtZQUMvQyxhQUFNLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsa0RBQWtELEVBQUU7WUFDbkQsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDOUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsNERBQTRELEVBQUU7WUFDN0QsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLCtEQUErRCxFQUFFO1lBQ2hFLGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzlFLGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzNFLGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzFFLGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzVCLEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRTtZQUNqRSxhQUFNLENBQUMsU0FBUyxDQUFDLFdBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO1lBQ2pFLGFBQU0sQ0FBQyxTQUFTLENBQUMsV0FBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEYsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsa0VBQWtFLEVBQUU7WUFDbkUsYUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHlEQUF5RCxFQUFFO1lBQzFELGFBQU0sQ0FBQyxTQUFTLENBQUMsV0FBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDM0IsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO1lBQ3hELGFBQU0sQ0FBQyxLQUFLLENBQUMsV0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywyRUFBMkUsRUFBRTtZQUM1RSxhQUFNLENBQUMsS0FBSyxDQUFDLFdBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsd0RBQXdELEVBQUU7WUFDekQsYUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsa0NBQWtDLEVBQUU7WUFDbkMsYUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9VdGlsVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgVXRpbCBjbGFzcyB0ZXN0c1xuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMC4xXG4gKi9cblxuaW1wb3J0IHthc3NlcnR9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtVdGlsfSBmcm9tICcuLi8uLi9zcmMvaGVscGVycy9VdGlsJztcblxuZGVzY3JpYmUoJ1V0aWwnLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJyNzdHJpcFNsYXNoZXMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIHRoZSBzdHJpbmcgd2FzIGluaXRpYWxseSBlbXB0eScsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnJyksICcnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHN0cmluZyB1bmNoYW5nZWQgaWYgdGhlcmUgYXJlIG5vIHNsYXNoZXMgc3Vycm91bmRpbmcgaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJ2hlbGxvL2hlbGxvJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcmVtb3ZlIHNpbmdsZSB0cmFpbGluZyBzbGFzaCcsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnaGVsbG8vaGVsbG8vJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcmVtb3ZlIG11bHRpcGxlIHRyYWlsaW5nIHNsYXNoZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJ2hlbGxvL2hlbGxvLy8vLycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHJlbW92ZSBzaW5nbGUgbGVhZGluZyBzbGFzaCcsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnL2hlbGxvL2hlbGxvJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcmVtb3ZlIG11bHRpcGxlIGxlYWRpbmcgc2xhc2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnLy8vLy8vaGVsbG8vaGVsbG8nKSwgJ2hlbGxvL2hlbGxvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgdGhlcmUgaW5pdGlhbGx5IG9ubHkgc2xhc2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnLy8vLy8nKSwgJycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcmVtb3ZlIG11bHRpcGxlIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJy8vLy8vL2hlbGxvL2hlbGxvLy8vLycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnLy8vLy8vaGVsbG8vaGVsbG8vJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCcvaGVsbG8vaGVsbG8vLy8vLycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnL2hlbGxvL2hlbGxvLycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJyNnZXRVcmlDb21wb25lbnRzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvbXBvbmVudHMgY29ycmVjdGx5IHdpdGhvdXQgc3Vycm91bmRpbmcgc2xhc2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoVXRpbC5nZXRVcmlDb21wb25lbnRzKCdoZWxsby9oZWxsbycpLCBbJ2hlbGxvJywgJ2hlbGxvJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29tcG9uZW50cyBjb3JyZWN0bHkgd2l0aCBhIHNpbmdsZSBsZWFkaW5nIHNsYXNoJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChVdGlsLmdldFVyaUNvbXBvbmVudHMoJy9oZWxsby9oZWxsbycpLCBbJ2hlbGxvJywgJ2hlbGxvJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29tcG9uZW50cyBjb3JyZWN0bHkgd2l0aCBtdWx0aXBsZSBsZWFkaW5nIHNsYXNoZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFV0aWwuZ2V0VXJpQ29tcG9uZW50cygnLy8vLy9oZWxsby9oZWxsbycpLCBbJ2hlbGxvJywgJ2hlbGxvJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29tcG9uZW50cyBjb3JyZWN0bHkgd2l0aCBhbiBlbXB0eSBzdHJpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFV0aWwuZ2V0VXJpQ29tcG9uZW50cygnJyksIFtdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJyNleHRyYWN0RmlsZU5hbWUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gc3RyaW5nIHVuY2hhbmdlZCBpZiBpdCBoYXMgbm8gZXh0ZW5zaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFV0aWwuZXh0cmFjdEZpbGVOYW1lKCdoZWxsbycpLCAnaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVtb3ZlIGxlYWRpbmcgZGlyZWN0b3JpZXMgc3RyaW5nIHVuY2hhbmdlZCBpZiBpdCBoYXMgbm8gZXh0ZW5zaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFV0aWwuZXh0cmFjdEZpbGVOYW1lKCd0ZXN0L2hlbGxvJyksICdoZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgbGVhZGluZyBkaXJlY3RvcmllcyBzdHJpbmcgYW5kIGV4dGVuc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChVdGlsLmV4dHJhY3RGaWxlTmFtZSgndGVzdC9oZWxsby50ZXN0JyksICdoZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgb25seSBvbmUgZXh0ZW5zaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFV0aWwuZXh0cmFjdEZpbGVOYW1lKCd0ZXN0L2hlbGxvLnF3ZS50ZXN0JyksICdoZWxsby5xd2UnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdfQ==
