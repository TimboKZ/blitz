"use strict";
var mock = require('mock-fs');
var fse = require('fs-extra');
var chai_1 = require('chai');
var GenericFile_1 = require('../../../src/files/GenericFile');
describe('GenericFile', function () {
    describe('#read()', function () {
        it('reads file contents correctly', function () {
            var fileContents = 'Hello world!';
            var mockConfig = {
                'test.txt': mock.file({
                    content: fileContents,
                    mode: 777,
                }),
            };
            mock(mockConfig);
            var file = new GenericFile_1.GenericFile('test.txt');
            file.read();
            chai_1.assert.equal(file.contents, fileContents);
            mock.restore();
        });
    });
    describe('#write()', function () {
        it('writes file contents correctly', function () {
            var fileContents = 'Hello world!';
            var mockConfig = {
                'test.txt': mock.file({
                    content: '',
                    mode: 777,
                }),
            };
            mock(mockConfig);
            var file = new GenericFile_1.GenericFile('/test.txt');
            file.contents = fileContents;
            file.write();
            chai_1.assert.equal(fse.readFileSync('/test.txt', 'utf8'), fileContents);
            mock.restore();
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvdW5pdC9maWxlcy9HZW5lcmljRmlsZVRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBLElBQVksSUFBSSxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ2hDLElBQVksR0FBRyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLHFCQUFxQixNQUFNLENBQUMsQ0FBQTtBQUM1Qiw0QkFBMEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUUzRCxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3BCLFFBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDaEIsRUFBRSxDQUFDLCtCQUErQixFQUFFO1lBQ2hDLElBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQztZQUNsQyxJQUFJLFVBQVUsR0FBRztnQkFDYixVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDbEIsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUM7YUFDTCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pCLElBQUksSUFBSSxHQUFHLElBQUkseUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixhQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsVUFBVSxFQUFFO1FBQ2pCLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtZQUNqQyxJQUFJLFlBQVksR0FBRyxjQUFjLENBQUM7WUFDbEMsSUFBSSxVQUFVLEdBQUc7Z0JBQ2IsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ2xCLE9BQU8sRUFBRSxFQUFFO29CQUNYLElBQUksRUFBRSxHQUFHO2lCQUNaLENBQUM7YUFDTCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pCLElBQUksSUFBSSxHQUFHLElBQUkseUJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixhQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2ZpbGVzL0dlbmVyaWNGaWxlVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgR2VuZXJpY0ZpbGUgdGVzdHNcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCAqIGFzIG1vY2sgZnJvbSAnbW9jay1mcyc7XG5pbXBvcnQgKiBhcyBmc2UgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHthc3NlcnR9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtHZW5lcmljRmlsZX0gZnJvbSAnLi4vLi4vLi4vc3JjL2ZpbGVzL0dlbmVyaWNGaWxlJztcblxuZGVzY3JpYmUoJ0dlbmVyaWNGaWxlJywgKCkgPT4ge1xuICAgIGRlc2NyaWJlKCcjcmVhZCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmVhZHMgZmlsZSBjb250ZW50cyBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlsZUNvbnRlbnRzID0gJ0hlbGxvIHdvcmxkISc7XG4gICAgICAgICAgICBsZXQgbW9ja0NvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAndGVzdC50eHQnOiBtb2NrLmZpbGUoe1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBmaWxlQ29udGVudHMsXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IDc3NyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtb2NrKG1vY2tDb25maWcpO1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBuZXcgR2VuZXJpY0ZpbGUoJ3Rlc3QudHh0Jyk7XG4gICAgICAgICAgICBmaWxlLnJlYWQoKTtcbiAgICAgICAgICAgIGFzc2VydC5lcXVhbChmaWxlLmNvbnRlbnRzLCBmaWxlQ29udGVudHMpO1xuICAgICAgICAgICAgbW9jay5yZXN0b3JlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCcjd3JpdGUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3dyaXRlcyBmaWxlIGNvbnRlbnRzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaWxlQ29udGVudHMgPSAnSGVsbG8gd29ybGQhJztcbiAgICAgICAgICAgIGxldCBtb2NrQ29uZmlnID0ge1xuICAgICAgICAgICAgICAgICd0ZXN0LnR4dCc6IG1vY2suZmlsZSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBtb2RlOiA3NzcsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbW9jayhtb2NrQ29uZmlnKTtcbiAgICAgICAgICAgIGxldCBmaWxlID0gbmV3IEdlbmVyaWNGaWxlKCcvdGVzdC50eHQnKTtcbiAgICAgICAgICAgIGZpbGUuY29udGVudHMgPSBmaWxlQ29udGVudHM7XG4gICAgICAgICAgICBmaWxlLndyaXRlKCk7XG4gICAgICAgICAgICBhc3NlcnQuZXF1YWwoZnNlLnJlYWRGaWxlU3luYygnL3Rlc3QudHh0JywgJ3V0ZjgnKSwgZmlsZUNvbnRlbnRzKTtcbiAgICAgICAgICAgIG1vY2sucmVzdG9yZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19
