"use strict";
var chai_1 = require("chai");
var Util_1 = require("../../src/Util");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9VdGlsVGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsNkJBQTRCO0FBQzVCLHVDQUFvQztBQUVwQyxRQUFRLENBQUMsTUFBTSxFQUFFO0lBQ2IsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQ3hCLEVBQUUsQ0FBQyw4REFBOEQsRUFBRTtZQUMvRCxhQUFNLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsdUVBQXVFLEVBQUU7WUFDeEUsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLCtDQUErQyxFQUFFO1lBQ2hELGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxtREFBbUQsRUFBRTtZQUNwRCxhQUFNLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtZQUMvQyxhQUFNLENBQUMsV0FBVyxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsa0RBQWtELEVBQUU7WUFDbkQsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDOUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsNERBQTRELEVBQUU7WUFDN0QsYUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLCtEQUErRCxFQUFFO1lBQ2hFLGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzlFLGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzNFLGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzFFLGFBQU0sQ0FBQyxXQUFXLENBQUMsV0FBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzVCLEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRTtZQUNqRSxhQUFNLENBQUMsU0FBUyxDQUFDLFdBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLGdFQUFnRSxFQUFFO1lBQ2pFLGFBQU0sQ0FBQyxTQUFTLENBQUMsV0FBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEYsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsa0VBQWtFLEVBQUU7WUFDbkUsYUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHlEQUF5RCxFQUFFO1lBQzFELGFBQU0sQ0FBQyxTQUFTLENBQUMsV0FBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDM0IsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO1lBQ3hELGFBQU0sQ0FBQyxLQUFLLENBQUMsV0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywyRUFBMkUsRUFBRTtZQUM1RSxhQUFNLENBQUMsS0FBSyxDQUFDLFdBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsd0RBQXdELEVBQUU7WUFDekQsYUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsa0NBQWtDLEVBQUU7WUFDbkMsYUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9VdGlsVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgVXRpbCBjbGFzcyB0ZXN0c1xuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMC4xXG4gKi9cblxuaW1wb3J0IHthc3NlcnR9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtVdGlsfSBmcm9tICcuLi8uLi9zcmMvVXRpbCc7XG5cbmRlc2NyaWJlKCdVdGlsJywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCcjc3RyaXBTbGFzaGVzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGVtcHR5IHN0cmluZyBpZiB0aGUgc3RyaW5nIHdhcyBpbml0aWFsbHkgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJycpLCAnJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBzdHJpbmcgdW5jaGFuZ2VkIGlmIHRoZXJlIGFyZSBubyBzbGFzaGVzIHN1cnJvdW5kaW5nIGl0JywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCdoZWxsby9oZWxsbycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHJlbW92ZSBzaW5nbGUgdHJhaWxpbmcgc2xhc2gnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJ2hlbGxvL2hlbGxvLycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHJlbW92ZSBtdWx0aXBsZSB0cmFpbGluZyBzbGFzaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCdoZWxsby9oZWxsby8vLy8nKSwgJ2hlbGxvL2hlbGxvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSByZW1vdmUgc2luZ2xlIGxlYWRpbmcgc2xhc2gnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJy9oZWxsby9oZWxsbycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHJlbW92ZSBtdWx0aXBsZSBsZWFkaW5nIHNsYXNoZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJy8vLy8vL2hlbGxvL2hlbGxvJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIHRoZXJlIGluaXRpYWxseSBvbmx5IHNsYXNoZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJy8vLy8vJyksICcnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHJlbW92ZSBtdWx0aXBsZSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCcvLy8vLy9oZWxsby9oZWxsby8vLy8nKSwgJ2hlbGxvL2hlbGxvJyk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJy8vLy8vL2hlbGxvL2hlbGxvLycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnL2hlbGxvL2hlbGxvLy8vLy8nKSwgJ2hlbGxvL2hlbGxvJyk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJy9oZWxsby9oZWxsby8nKSwgJ2hlbGxvL2hlbGxvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCcjZ2V0VXJpQ29tcG9uZW50cygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBjb21wb25lbnRzIGNvcnJlY3RseSB3aXRob3V0IHN1cnJvdW5kaW5nIHNsYXNoZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFV0aWwuZ2V0VXJpQ29tcG9uZW50cygnaGVsbG8vaGVsbG8nKSwgWydoZWxsbycsICdoZWxsbyddKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvbXBvbmVudHMgY29ycmVjdGx5IHdpdGggYSBzaW5nbGUgbGVhZGluZyBzbGFzaCcsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoVXRpbC5nZXRVcmlDb21wb25lbnRzKCcvaGVsbG8vaGVsbG8nKSwgWydoZWxsbycsICdoZWxsbyddKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvbXBvbmVudHMgY29ycmVjdGx5IHdpdGggbXVsdGlwbGUgbGVhZGluZyBzbGFzaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChVdGlsLmdldFVyaUNvbXBvbmVudHMoJy8vLy8vaGVsbG8vaGVsbG8nKSwgWydoZWxsbycsICdoZWxsbyddKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvbXBvbmVudHMgY29ycmVjdGx5IHdpdGggYW4gZW1wdHkgc3RyaW5nJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChVdGlsLmdldFVyaUNvbXBvbmVudHMoJycpLCBbXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCcjZXh0cmFjdEZpbGVOYW1lKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHN0cmluZyB1bmNoYW5nZWQgaWYgaXQgaGFzIG5vIGV4dGVuc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChVdGlsLmV4dHJhY3RGaWxlTmFtZSgnaGVsbG8nKSwgJ2hlbGxvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBsZWFkaW5nIGRpcmVjdG9yaWVzIHN0cmluZyB1bmNoYW5nZWQgaWYgaXQgaGFzIG5vIGV4dGVuc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChVdGlsLmV4dHJhY3RGaWxlTmFtZSgndGVzdC9oZWxsbycpLCAnaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVtb3ZlIGxlYWRpbmcgZGlyZWN0b3JpZXMgc3RyaW5nIGFuZCBleHRlbnNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoVXRpbC5leHRyYWN0RmlsZU5hbWUoJ3Rlc3QvaGVsbG8udGVzdCcpLCAnaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVtb3ZlIG9ubHkgb25lIGV4dGVuc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChVdGlsLmV4dHJhY3RGaWxlTmFtZSgndGVzdC9oZWxsby5xd2UudGVzdCcpLCAnaGVsbG8ucXdlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
