"use strict";
var mock = require("mock-fs");
var chai_1 = require("chai");
var ContentFile_1 = require("../../../src/files/ContentFile");
describe('ContentFile', function () {
    describe('#reload()', function () {
        it('extracts the content of the file correctly', function () {
            var contentString = 'Hello World!';
            var fileContents = '---\n---\n' + contentString;
            var mockConfig = {
                'test.txt': mock.file({
                    content: fileContents,
                    mode: 777,
                }),
            };
            mock(mockConfig);
            var file = new ContentFile_1.ContentFile('', [], 'test.txt');
            file.reload();
            var idFunction = function (input) { return input; };
            var generatedString = file.getContent().generate(idFunction, idFunction, idFunction);
            chai_1.assert.equal(generatedString, contentString);
            mock.restore();
        });
    });
    describe('#write()', function () {
        it('throws an error because operation is prohibited', function () {
            var contentFile = new ContentFile_1.ContentFile('', [], 'test.txt');
            chai_1.assert.throws(function () { return contentFile.write(); });
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9maWxlcy9Db250ZW50RmlsZVRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBLDhCQUFnQztBQUNoQyw2QkFBNEI7QUFDNUIsOERBQTJEO0FBRTNELFFBQVEsQ0FBQyxhQUFhLEVBQUU7SUFDcEIsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUVsQixFQUFFLENBQUMsNENBQTRDLEVBQUU7WUFDN0MsSUFBSSxhQUFhLEdBQUcsY0FBYyxDQUFDO1lBQ25DLElBQUksWUFBWSxHQUFHLFlBQVksR0FBRyxhQUFhLENBQUM7WUFDaEQsSUFBSSxVQUFVLEdBQUc7Z0JBQ2IsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ2xCLE9BQU8sRUFBRSxZQUFZO29CQUNyQixJQUFJLEVBQUUsR0FBRztpQkFDWixDQUFDO2FBQ0wsQ0FBQztZQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLHlCQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLFVBQVUsR0FBRyxVQUFDLEtBQWEsSUFBSyxPQUFBLEtBQUssRUFBTCxDQUFLLENBQUM7WUFDMUMsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3JGLGFBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNqQixFQUFFLENBQUMsaURBQWlELEVBQUU7WUFDbEQsSUFBSSxXQUFXLEdBQUcsSUFBSSx5QkFBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDdEQsYUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9maWxlcy9Db250ZW50RmlsZVRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIENvbnRlbnRGaWxlIHRlc3RzXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuXG5pbXBvcnQgKiBhcyBtb2NrIGZyb20gJ21vY2stZnMnO1xuaW1wb3J0IHthc3NlcnR9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtDb250ZW50RmlsZX0gZnJvbSAnLi4vLi4vLi4vc3JjL2ZpbGVzL0NvbnRlbnRGaWxlJztcblxuZGVzY3JpYmUoJ0NvbnRlbnRGaWxlJywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCcjcmVsb2FkKCknLCAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBtb3JlIHRlc3RzIGZvciByZWxvYWQoKSBvbmNlIGl0cyBjb21wbGV0ZVxuICAgICAgICBpdCgnZXh0cmFjdHMgdGhlIGNvbnRlbnQgb2YgdGhlIGZpbGUgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnRTdHJpbmcgPSAnSGVsbG8gV29ybGQhJztcbiAgICAgICAgICAgIGxldCBmaWxlQ29udGVudHMgPSAnLS0tXFxuLS0tXFxuJyArIGNvbnRlbnRTdHJpbmc7XG4gICAgICAgICAgICBsZXQgbW9ja0NvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAndGVzdC50eHQnOiBtb2NrLmZpbGUoe1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBmaWxlQ29udGVudHMsXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IDc3NyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtb2NrKG1vY2tDb25maWcpO1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBuZXcgQ29udGVudEZpbGUoJycsIFtdLCAndGVzdC50eHQnKTtcbiAgICAgICAgICAgIGZpbGUucmVsb2FkKCk7XG4gICAgICAgICAgICBsZXQgaWRGdW5jdGlvbiA9IChpbnB1dDogc3RyaW5nKSA9PiBpbnB1dDtcbiAgICAgICAgICAgIGxldCBnZW5lcmF0ZWRTdHJpbmcgPSBmaWxlLmdldENvbnRlbnQoKS5nZW5lcmF0ZShpZEZ1bmN0aW9uLCBpZEZ1bmN0aW9uLCBpZEZ1bmN0aW9uKTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChnZW5lcmF0ZWRTdHJpbmcsIGNvbnRlbnRTdHJpbmcpO1xuICAgICAgICAgICAgbW9jay5yZXN0b3JlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCcjd3JpdGUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Rocm93cyBhbiBlcnJvciBiZWNhdXNlIG9wZXJhdGlvbiBpcyBwcm9oaWJpdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnRGaWxlID0gbmV3IENvbnRlbnRGaWxlKCcnLCBbXSwgJ3Rlc3QudHh0Jyk7XG4gICAgICAgICAgICBhc3NlcnQudGhyb3dzKCgpID0+IGNvbnRlbnRGaWxlLndyaXRlKCkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
