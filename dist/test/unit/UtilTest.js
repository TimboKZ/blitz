"use strict";
var chai_1 = require('chai');
var Util_1 = require('../../src/helpers/Util');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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U0FBUyxDQUFDLFdBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEYsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMseURBQXlELEVBQUU7WUFDMUQsYUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtRQUMzQixFQUFFLENBQUMsdURBQXVELEVBQUU7WUFDeEQsYUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDJFQUEyRSxFQUFFO1lBQzVFLGFBQU0sQ0FBQyxLQUFLLENBQUMsV0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx3REFBd0QsRUFBRTtZQUN6RCxhQUFNLENBQUMsS0FBSyxDQUFDLFdBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtZQUNuQyxhQUFNLENBQUMsS0FBSyxDQUFDLFdBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L1V0aWxUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBVdGlsIGNsYXNzIHRlc3RzXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuXG5pbXBvcnQge2Fzc2VydH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQge1V0aWx9IGZyb20gJy4uLy4uL3NyYy9oZWxwZXJzL1V0aWwnO1xuXG5kZXNjcmliZSgnVXRpbCcsICgpID0+IHtcbiAgICBkZXNjcmliZSgnI3N0cmlwU2xhc2hlcygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgdGhlIHN0cmluZyB3YXMgaW5pdGlhbGx5IGVtcHR5JywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCcnKSwgJycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gc3RyaW5nIHVuY2hhbmdlZCBpZiB0aGVyZSBhcmUgbm8gc2xhc2hlcyBzdXJyb3VuZGluZyBpdCcsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnaGVsbG8vaGVsbG8nKSwgJ2hlbGxvL2hlbGxvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSByZW1vdmUgc2luZ2xlIHRyYWlsaW5nIHNsYXNoJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCdoZWxsby9oZWxsby8nKSwgJ2hlbGxvL2hlbGxvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSByZW1vdmUgbXVsdGlwbGUgdHJhaWxpbmcgc2xhc2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnaGVsbG8vaGVsbG8vLy8vJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcmVtb3ZlIHNpbmdsZSBsZWFkaW5nIHNsYXNoJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCcvaGVsbG8vaGVsbG8nKSwgJ2hlbGxvL2hlbGxvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSByZW1vdmUgbXVsdGlwbGUgbGVhZGluZyBzbGFzaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCcvLy8vLy9oZWxsby9oZWxsbycpLCAnaGVsbG8vaGVsbG8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGVtcHR5IHN0cmluZyBpZiB0aGVyZSBpbml0aWFsbHkgb25seSBzbGFzaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCcvLy8vLycpLCAnJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSByZW1vdmUgbXVsdGlwbGUgbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChVdGlsLnN0cmlwU2xhc2hlcygnLy8vLy8vaGVsbG8vaGVsbG8vLy8vJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCcvLy8vLy9oZWxsby9oZWxsby8nKSwgJ2hlbGxvL2hlbGxvJyk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoVXRpbC5zdHJpcFNsYXNoZXMoJy9oZWxsby9oZWxsby8vLy8vJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFV0aWwuc3RyaXBTbGFzaGVzKCcvaGVsbG8vaGVsbG8vJyksICdoZWxsby9oZWxsbycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI2dldFVyaUNvbXBvbmVudHMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29tcG9uZW50cyBjb3JyZWN0bHkgd2l0aG91dCBzdXJyb3VuZGluZyBzbGFzaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChVdGlsLmdldFVyaUNvbXBvbmVudHMoJ2hlbGxvL2hlbGxvJyksIFsnaGVsbG8nLCAnaGVsbG8nXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBjb21wb25lbnRzIGNvcnJlY3RseSB3aXRoIGEgc2luZ2xlIGxlYWRpbmcgc2xhc2gnLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFV0aWwuZ2V0VXJpQ29tcG9uZW50cygnL2hlbGxvL2hlbGxvJyksIFsnaGVsbG8nLCAnaGVsbG8nXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBjb21wb25lbnRzIGNvcnJlY3RseSB3aXRoIG11bHRpcGxlIGxlYWRpbmcgc2xhc2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoVXRpbC5nZXRVcmlDb21wb25lbnRzKCcvLy8vL2hlbGxvL2hlbGxvJyksIFsnaGVsbG8nLCAnaGVsbG8nXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBjb21wb25lbnRzIGNvcnJlY3RseSB3aXRoIGFuIGVtcHR5IHN0cmluZycsICgpID0+IHtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoVXRpbC5nZXRVcmlDb21wb25lbnRzKCcnKSwgW10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI2V4dHJhY3RGaWxlTmFtZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBzdHJpbmcgdW5jaGFuZ2VkIGlmIGl0IGhhcyBubyBleHRlbnNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoVXRpbC5leHRyYWN0RmlsZU5hbWUoJ2hlbGxvJyksICdoZWxsbycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgbGVhZGluZyBkaXJlY3RvcmllcyBzdHJpbmcgdW5jaGFuZ2VkIGlmIGl0IGhhcyBubyBleHRlbnNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoVXRpbC5leHRyYWN0RmlsZU5hbWUoJ3Rlc3QvaGVsbG8nKSwgJ2hlbGxvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBsZWFkaW5nIGRpcmVjdG9yaWVzIHN0cmluZyBhbmQgZXh0ZW5zaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKFV0aWwuZXh0cmFjdEZpbGVOYW1lKCd0ZXN0L2hlbGxvLnRlc3QnKSwgJ2hlbGxvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBvbmx5IG9uZSBleHRlbnNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoVXRpbC5leHRyYWN0RmlsZU5hbWUoJ3Rlc3QvaGVsbG8ucXdlLnRlc3QnKSwgJ2hlbGxvLnF3ZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
