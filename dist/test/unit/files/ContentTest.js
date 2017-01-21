"use strict";
var chai_1 = require("chai");
var Content_1 = require("../../../src/files/Content");
describe('Content', function () {
    describe('#prepare()', function () {
        it('extracts IDs correctly', function () {
            var content = new Content_1.Content();
            content.prepare('${url} ${url|about} ${url|hello} \\${url|notIncluded}');
            chai_1.assert.deepEqual(content.getIds(), ['about', 'hello']);
        });
        it('extracts assets correctly', function () {
            var content = new Content_1.Content();
            content.prepare('${asset} ${asset|image.jpg} ${asset|audio/clip.wav} \\${asset|notIncluded.pdf}');
            chai_1.assert.deepEqual(content.getAssets(), ['image.jpg', 'audio/clip.wav']);
        });
    });
    describe('#generate()', function () {
        var urlGenerator = function (id) {
            if (id === void 0) { id = 'default'; }
            return id;
        };
        var assetPathGenerator = function (asset) {
            if (asset === void 0) { asset = 'defaultAsset'; }
            return asset;
        };
        var contentParser = function (content) {
            return 'xx' + content;
        };
        it('throws an error if no content was prepared', function () {
            var content = new Content_1.Content();
            chai_1.assert.throws(function () { return content.generate(urlGenerator, assetPathGenerator, contentParser); });
        });
        it('uses content parser correctly', function () {
            var content = new Content_1.Content();
            content.prepare('Hello World');
            chai_1.assert.equal(content.generate(urlGenerator, assetPathGenerator, contentParser), 'xxHello World');
        });
        it('uses URL generator correctly', function () {
            var content = new Content_1.Content();
            content.prepare('${url} ${url|about} \\${url|notIncluded}');
            var expectedSting = 'xxdefault about ${url|notIncluded}';
            chai_1.assert.equal(content.generate(urlGenerator, assetPathGenerator, contentParser), expectedSting);
        });
        it('uses asset path generator correctly', function () {
            var content = new Content_1.Content();
            content.prepare('${asset} ${asset|image.jpg} \\${asset|notIncluded.pdf}');
            var expectedSting = 'xxdefaultAsset image.jpg ${asset|notIncluded.pdf}';
            chai_1.assert.equal(content.generate(urlGenerator, assetPathGenerator, contentParser), expectedSting);
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9maWxlcy9Db250ZW50VGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsNkJBQTRCO0FBQzVCLHNEQUFtRDtBQUVuRCxRQUFRLENBQUMsU0FBUyxFQUFFO0lBQ2hCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDbkIsRUFBRSxDQUFDLHdCQUF3QixFQUFFO1lBQ3pCLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUN6RSxhQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1lBQzVCLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQztZQUNsRyxhQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDcEIsSUFBSSxZQUFZLEdBQUcsVUFBQyxFQUFzQjtZQUF0QixtQkFBQSxFQUFBLGNBQXNCO1lBQ3RDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUM7UUFDRixJQUFJLGtCQUFrQixHQUFHLFVBQUMsS0FBOEI7WUFBOUIsc0JBQUEsRUFBQSxzQkFBOEI7WUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUM7UUFDRixJQUFJLGFBQWEsR0FBRyxVQUFDLE9BQWU7WUFDaEMsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDMUIsQ0FBQyxDQUFDO1FBQ0YsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO1lBQzdDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLGFBQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxFQUFqRSxDQUFpRSxDQUFDLENBQUM7UUFDM0YsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsK0JBQStCLEVBQUU7WUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvQixhQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3JHLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1lBQy9CLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsMENBQTBDLENBQUMsQ0FBQztZQUM1RCxJQUFJLGFBQWEsR0FBSSxvQ0FBb0MsQ0FBQztZQUMxRCxhQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25HLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHFDQUFxQyxFQUFFO1lBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsd0RBQXdELENBQUMsQ0FBQztZQUMxRSxJQUFJLGFBQWEsR0FBSSxtREFBbUQsQ0FBQztZQUN6RSxhQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25HLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvZmlsZXMvQ29udGVudFRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIENvbnRlbnQgdGVzdHNcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCB7YXNzZXJ0fSBmcm9tICdjaGFpJztcbmltcG9ydCB7Q29udGVudH0gZnJvbSAnLi4vLi4vLi4vc3JjL2ZpbGVzL0NvbnRlbnQnO1xuXG5kZXNjcmliZSgnQ29udGVudCcsICgpID0+IHtcbiAgICBkZXNjcmliZSgnI3ByZXBhcmUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2V4dHJhY3RzIElEcyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IG5ldyBDb250ZW50KCk7XG4gICAgICAgICAgICBjb250ZW50LnByZXBhcmUoJyR7dXJsfSAke3VybHxhYm91dH0gJHt1cmx8aGVsbG99IFxcXFwke3VybHxub3RJbmNsdWRlZH0nKTtcbiAgICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoY29udGVudC5nZXRJZHMoKSwgWydhYm91dCcsICdoZWxsbyddKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdleHRyYWN0cyBhc3NldHMgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBuZXcgQ29udGVudCgpO1xuICAgICAgICAgICAgY29udGVudC5wcmVwYXJlKCcke2Fzc2V0fSAke2Fzc2V0fGltYWdlLmpwZ30gJHthc3NldHxhdWRpby9jbGlwLndhdn0gXFxcXCR7YXNzZXR8bm90SW5jbHVkZWQucGRmfScpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChjb250ZW50LmdldEFzc2V0cygpLCBbJ2ltYWdlLmpwZycsICdhdWRpby9jbGlwLndhdiddKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJyNnZW5lcmF0ZSgpJywgKCkgPT4ge1xuICAgICAgICBsZXQgdXJsR2VuZXJhdG9yID0gKGlkOiBzdHJpbmcgPSAnZGVmYXVsdCcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGFzc2V0UGF0aEdlbmVyYXRvciA9IChhc3NldDogc3RyaW5nID0gJ2RlZmF1bHRBc3NldCcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhc3NldDtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGNvbnRlbnRQYXJzZXIgPSAoY29udGVudDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJ3h4JyArIGNvbnRlbnQ7XG4gICAgICAgIH07XG4gICAgICAgIGl0KCd0aHJvd3MgYW4gZXJyb3IgaWYgbm8gY29udGVudCB3YXMgcHJlcGFyZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IG5ldyBDb250ZW50KCk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IGNvbnRlbnQuZ2VuZXJhdGUodXJsR2VuZXJhdG9yLCBhc3NldFBhdGhHZW5lcmF0b3IsIGNvbnRlbnRQYXJzZXIpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCd1c2VzIGNvbnRlbnQgcGFyc2VyIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gbmV3IENvbnRlbnQoKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHJlcGFyZSgnSGVsbG8gV29ybGQnKTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChjb250ZW50LmdlbmVyYXRlKHVybEdlbmVyYXRvciwgYXNzZXRQYXRoR2VuZXJhdG9yLCBjb250ZW50UGFyc2VyKSwgJ3h4SGVsbG8gV29ybGQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCd1c2VzIFVSTCBnZW5lcmF0b3IgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBuZXcgQ29udGVudCgpO1xuICAgICAgICAgICAgY29udGVudC5wcmVwYXJlKCcke3VybH0gJHt1cmx8YWJvdXR9IFxcXFwke3VybHxub3RJbmNsdWRlZH0nKTtcbiAgICAgICAgICAgIGxldCBleHBlY3RlZFN0aW5nICA9ICd4eGRlZmF1bHQgYWJvdXQgJHt1cmx8bm90SW5jbHVkZWR9JztcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChjb250ZW50LmdlbmVyYXRlKHVybEdlbmVyYXRvciwgYXNzZXRQYXRoR2VuZXJhdG9yLCBjb250ZW50UGFyc2VyKSwgZXhwZWN0ZWRTdGluZyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgndXNlcyBhc3NldCBwYXRoIGdlbmVyYXRvciBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IG5ldyBDb250ZW50KCk7XG4gICAgICAgICAgICBjb250ZW50LnByZXBhcmUoJyR7YXNzZXR9ICR7YXNzZXR8aW1hZ2UuanBnfSBcXFxcJHthc3NldHxub3RJbmNsdWRlZC5wZGZ9Jyk7XG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRTdGluZyAgPSAneHhkZWZhdWx0QXNzZXQgaW1hZ2UuanBnICR7YXNzZXR8bm90SW5jbHVkZWQucGRmfSc7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoY29udGVudC5nZW5lcmF0ZSh1cmxHZW5lcmF0b3IsIGFzc2V0UGF0aEdlbmVyYXRvciwgY29udGVudFBhcnNlciksIGV4cGVjdGVkU3RpbmcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
