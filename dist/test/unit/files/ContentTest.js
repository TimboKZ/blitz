"use strict";
var chai_1 = require("chai");
var Content_1 = require("../../../src/components/Content");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9maWxlcy9Db250ZW50VGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsNkJBQTRCO0FBQzVCLDJEQUF3RDtBQUV4RCxRQUFRLENBQUMsU0FBUyxFQUFFO0lBQ2hCLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDbkIsRUFBRSxDQUFDLHdCQUF3QixFQUFFO1lBQ3pCLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUN6RSxhQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1lBQzVCLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQztZQUNsRyxhQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDcEIsSUFBSSxZQUFZLEdBQUcsVUFBQyxFQUFzQjtZQUF0QixtQkFBQSxFQUFBLGNBQXNCO1lBQ3RDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUM7UUFDRixJQUFJLGtCQUFrQixHQUFHLFVBQUMsS0FBOEI7WUFBOUIsc0JBQUEsRUFBQSxzQkFBOEI7WUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUM7UUFDRixJQUFJLGFBQWEsR0FBRyxVQUFDLE9BQWU7WUFDaEMsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDMUIsQ0FBQyxDQUFDO1FBQ0YsRUFBRSxDQUFDLDRDQUE0QyxFQUFFO1lBQzdDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLGFBQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxFQUFqRSxDQUFpRSxDQUFDLENBQUM7UUFDM0YsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsK0JBQStCLEVBQUU7WUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvQixhQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3JHLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1lBQy9CLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsMENBQTBDLENBQUMsQ0FBQztZQUM1RCxJQUFJLGFBQWEsR0FBSSxvQ0FBb0MsQ0FBQztZQUMxRCxhQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25HLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHFDQUFxQyxFQUFFO1lBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsd0RBQXdELENBQUMsQ0FBQztZQUMxRSxJQUFJLGFBQWEsR0FBSSxtREFBbUQsQ0FBQztZQUN6RSxhQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ25HLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvZmlsZXMvQ29udGVudFRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIENvbnRlbnQgdGVzdHNcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCB7YXNzZXJ0fSBmcm9tICdjaGFpJztcbmltcG9ydCB7Q29udGVudH0gZnJvbSAnLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudCc7XG5cbmRlc2NyaWJlKCdDb250ZW50JywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCcjcHJlcGFyZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnZXh0cmFjdHMgSURzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gbmV3IENvbnRlbnQoKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHJlcGFyZSgnJHt1cmx9ICR7dXJsfGFib3V0fSAke3VybHxoZWxsb30gXFxcXCR7dXJsfG5vdEluY2x1ZGVkfScpO1xuICAgICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChjb250ZW50LmdldElkcygpLCBbJ2Fib3V0JywgJ2hlbGxvJ10pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ2V4dHJhY3RzIGFzc2V0cyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IG5ldyBDb250ZW50KCk7XG4gICAgICAgICAgICBjb250ZW50LnByZXBhcmUoJyR7YXNzZXR9ICR7YXNzZXR8aW1hZ2UuanBnfSAke2Fzc2V0fGF1ZGlvL2NsaXAud2F2fSBcXFxcJHthc3NldHxub3RJbmNsdWRlZC5wZGZ9Jyk7XG4gICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGNvbnRlbnQuZ2V0QXNzZXRzKCksIFsnaW1hZ2UuanBnJywgJ2F1ZGlvL2NsaXAud2F2J10pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI2dlbmVyYXRlKCknLCAoKSA9PiB7XG4gICAgICAgIGxldCB1cmxHZW5lcmF0b3IgPSAoaWQ6IHN0cmluZyA9ICdkZWZhdWx0JykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgYXNzZXRQYXRoR2VuZXJhdG9yID0gKGFzc2V0OiBzdHJpbmcgPSAnZGVmYXVsdEFzc2V0JykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFzc2V0O1xuICAgICAgICB9O1xuICAgICAgICBsZXQgY29udGVudFBhcnNlciA9IChjb250ZW50OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAneHgnICsgY29udGVudDtcbiAgICAgICAgfTtcbiAgICAgICAgaXQoJ3Rocm93cyBhbiBlcnJvciBpZiBubyBjb250ZW50IHdhcyBwcmVwYXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gbmV3IENvbnRlbnQoKTtcbiAgICAgICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gY29udGVudC5nZW5lcmF0ZSh1cmxHZW5lcmF0b3IsIGFzc2V0UGF0aEdlbmVyYXRvciwgY29udGVudFBhcnNlcikpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3VzZXMgY29udGVudCBwYXJzZXIgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBuZXcgQ29udGVudCgpO1xuICAgICAgICAgICAgY29udGVudC5wcmVwYXJlKCdIZWxsbyBXb3JsZCcpO1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKGNvbnRlbnQuZ2VuZXJhdGUodXJsR2VuZXJhdG9yLCBhc3NldFBhdGhHZW5lcmF0b3IsIGNvbnRlbnRQYXJzZXIpLCAneHhIZWxsbyBXb3JsZCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3VzZXMgVVJMIGdlbmVyYXRvciBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IG5ldyBDb250ZW50KCk7XG4gICAgICAgICAgICBjb250ZW50LnByZXBhcmUoJyR7dXJsfSAke3VybHxhYm91dH0gXFxcXCR7dXJsfG5vdEluY2x1ZGVkfScpO1xuICAgICAgICAgICAgbGV0IGV4cGVjdGVkU3RpbmcgID0gJ3h4ZGVmYXVsdCBhYm91dCAke3VybHxub3RJbmNsdWRlZH0nO1xuICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKGNvbnRlbnQuZ2VuZXJhdGUodXJsR2VuZXJhdG9yLCBhc3NldFBhdGhHZW5lcmF0b3IsIGNvbnRlbnRQYXJzZXIpLCBleHBlY3RlZFN0aW5nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCd1c2VzIGFzc2V0IHBhdGggZ2VuZXJhdG9yIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gbmV3IENvbnRlbnQoKTtcbiAgICAgICAgICAgIGNvbnRlbnQucHJlcGFyZSgnJHthc3NldH0gJHthc3NldHxpbWFnZS5qcGd9IFxcXFwke2Fzc2V0fG5vdEluY2x1ZGVkLnBkZn0nKTtcbiAgICAgICAgICAgIGxldCBleHBlY3RlZFN0aW5nICA9ICd4eGRlZmF1bHRBc3NldCBpbWFnZS5qcGcgJHthc3NldHxub3RJbmNsdWRlZC5wZGZ9JztcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChjb250ZW50LmdlbmVyYXRlKHVybEdlbmVyYXRvciwgYXNzZXRQYXRoR2VuZXJhdG9yLCBjb250ZW50UGFyc2VyKSwgZXhwZWN0ZWRTdGluZyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXX0=
