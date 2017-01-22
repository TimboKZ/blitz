"use strict";
var chai_1 = require('chai');
var fs = require('fs-extra');
var path = require('path');
var child_process_1 = require('child_process');
var Util_1 = require('../../src/helpers/Util');
describe('Blitz project initialiser', function () {
    var basePath = process.cwd();
    var blitzCli = 'node ' + path.join(basePath, 'blitz-cli');
    var templatesPath = path.join(basePath, 'templates');
    var tempPath = path.join(basePath, 'temp');
    if (Util_1.Util.pathExists(tempPath)) {
        fs.removeSync(tempPath);
    }
    child_process_1.execSync('mkdir temp');
    var templateNames = fs.readdirSync(templatesPath);
    var nameCount = templateNames.length;
    var templatesTestInfo = [];
    var templateTestCount = 0;
    it('should not copy the `build` folder on init', function (done) {
        for (var i = 0; i < nameCount; i++) {
            var templateName = templateNames[i];
            child_process_1.execSync('mkdir ' + templateName, { cwd: tempPath });
            var projectPath = path.join(tempPath, templateName);
            child_process_1.execSync(blitzCli + ' init -t ' + templateName, { cwd: projectPath });
            templatesTestInfo.push({
                name: templateName,
                projectPath: projectPath,
                projectBuild: path.join(projectPath, 'build'),
                templatePath: path.join(templatesPath, templateName),
                templateBuild: path.join(templatesPath, templateName, 'build'),
            });
        }
        templateTestCount = templatesTestInfo.length;
        for (var i = 0; i < templateTestCount; i++) {
            var templateTestInfo = templatesTestInfo[i];
            chai_1.assert.isFalse(Util_1.Util.pathExists(templateTestInfo.projectBuild), templateTestInfo.name + ' template');
        }
        done();
    }).timeout(6000);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3Rlc3QvaW50ZWdyYXRpb24vVGVtcGxhdGVzVGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEscUJBQXFCLE1BQU0sQ0FBQyxDQUFBO0FBQzVCLElBQVksRUFBRSxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBQy9CLElBQVksSUFBSSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBQzdCLDhCQUF1QixlQUFlLENBQUMsQ0FBQTtBQUN2QyxxQkFBbUIsd0JBQXdCLENBQUMsQ0FBQTtBQUU1QyxRQUFRLENBQUMsMkJBQTJCLEVBQUU7SUFHbEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzdCLElBQUksUUFBUSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMxRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNyRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzQyxFQUFFLENBQUMsQ0FBQyxXQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCx3QkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZCLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEQsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQVVyQyxJQUFJLGlCQUFpQixHQUF3QixFQUFFLENBQUM7SUFDaEQsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFFMUIsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLFVBQUMsSUFBSTtRQUNsRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pDLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyx3QkFBUSxDQUFDLFFBQVEsR0FBRyxZQUFZLEVBQUUsRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNwRCx3QkFBUSxDQUFDLFFBQVEsR0FBRyxXQUFXLEdBQUcsWUFBWSxFQUFFLEVBQUMsR0FBRyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7WUFDcEUsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2dCQUNuQixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsd0JBQVc7Z0JBQ1gsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQztnQkFDN0MsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQztnQkFDcEQsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUM7YUFDakUsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztRQUM3QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekMsSUFBSSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxhQUFNLENBQUMsT0FBTyxDQUFDLFdBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDO1FBQ3hHLENBQUM7UUFDRCxJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQWlEckIsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9pbnRlZ3JhdGlvbi9UZW1wbGF0ZXNUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBUZXN0cyB0aGF0IHdlYnNpdGVzIGFyZSBidWlsdCBjb3JyZWN0bHkgZnJvbSB0ZW1wbGF0ZXNcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjEuNFxuICovXG5cbmltcG9ydCB7YXNzZXJ0fSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge2V4ZWNTeW5jfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCB7VXRpbH0gZnJvbSAnLi4vLi4vc3JjL2hlbHBlcnMvVXRpbCc7XG5cbmRlc2NyaWJlKCdCbGl0eiBwcm9qZWN0IGluaXRpYWxpc2VyJywgKCkgPT4ge1xuXG4gICAgLy8gR2V0IGxpc3Qgb2YgdGVtcGxhdGVzLCBwcmVwYXJlIHRoZSBgdGVtcGAgZm9sZGVyXG4gICAgbGV0IGJhc2VQYXRoID0gcHJvY2Vzcy5jd2QoKTtcbiAgICBsZXQgYmxpdHpDbGkgPSAnbm9kZSAnICsgcGF0aC5qb2luKGJhc2VQYXRoLCAnYmxpdHotY2xpJyk7XG4gICAgbGV0IHRlbXBsYXRlc1BhdGggPSBwYXRoLmpvaW4oYmFzZVBhdGgsICd0ZW1wbGF0ZXMnKTtcbiAgICBsZXQgdGVtcFBhdGggPSBwYXRoLmpvaW4oYmFzZVBhdGgsICd0ZW1wJyk7XG4gICAgaWYgKFV0aWwucGF0aEV4aXN0cyh0ZW1wUGF0aCkpIHtcbiAgICAgICAgZnMucmVtb3ZlU3luYyh0ZW1wUGF0aCk7XG4gICAgfVxuICAgIGV4ZWNTeW5jKCdta2RpciB0ZW1wJyk7XG4gICAgbGV0IHRlbXBsYXRlTmFtZXMgPSBmcy5yZWFkZGlyU3luYyh0ZW1wbGF0ZXNQYXRoKTtcbiAgICBsZXQgbmFtZUNvdW50ID0gdGVtcGxhdGVOYW1lcy5sZW5ndGg7XG5cbiAgICAvLyBJbml0aWFsaXNlIHByb2plY3RzIGZvciBhbGwgdGVtcGxhdGVzXG4gICAgaW50ZXJmYWNlIElUZW1wbGF0ZVRlc3RJbmZvIHtcbiAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICBwcm9qZWN0UGF0aDogc3RyaW5nO1xuICAgICAgICBwcm9qZWN0QnVpbGQ6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGVQYXRoOiBzdHJpbmc7XG4gICAgICAgIHRlbXBsYXRlQnVpbGQ6IHN0cmluZztcbiAgICB9XG4gICAgbGV0IHRlbXBsYXRlc1Rlc3RJbmZvOiBJVGVtcGxhdGVUZXN0SW5mb1tdID0gW107XG4gICAgbGV0IHRlbXBsYXRlVGVzdENvdW50ID0gMDtcblxuICAgIGl0KCdzaG91bGQgbm90IGNvcHkgdGhlIGBidWlsZGAgZm9sZGVyIG9uIGluaXQnLCAoZG9uZSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGVOYW1lID0gdGVtcGxhdGVOYW1lc1tpXTtcbiAgICAgICAgICAgIGV4ZWNTeW5jKCdta2RpciAnICsgdGVtcGxhdGVOYW1lLCB7Y3dkOiB0ZW1wUGF0aH0pO1xuICAgICAgICAgICAgbGV0IHByb2plY3RQYXRoID0gcGF0aC5qb2luKHRlbXBQYXRoLCB0ZW1wbGF0ZU5hbWUpO1xuICAgICAgICAgICAgZXhlY1N5bmMoYmxpdHpDbGkgKyAnIGluaXQgLXQgJyArIHRlbXBsYXRlTmFtZSwge2N3ZDogcHJvamVjdFBhdGh9KTtcbiAgICAgICAgICAgIHRlbXBsYXRlc1Rlc3RJbmZvLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IHRlbXBsYXRlTmFtZSxcbiAgICAgICAgICAgICAgICBwcm9qZWN0UGF0aCxcbiAgICAgICAgICAgICAgICBwcm9qZWN0QnVpbGQ6IHBhdGguam9pbihwcm9qZWN0UGF0aCwgJ2J1aWxkJyksXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBwYXRoLmpvaW4odGVtcGxhdGVzUGF0aCwgdGVtcGxhdGVOYW1lKSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZUJ1aWxkOiBwYXRoLmpvaW4odGVtcGxhdGVzUGF0aCwgdGVtcGxhdGVOYW1lLCAnYnVpbGQnKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBsYXRlVGVzdENvdW50ID0gdGVtcGxhdGVzVGVzdEluZm8ubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBsYXRlVGVzdENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZVRlc3RJbmZvID0gdGVtcGxhdGVzVGVzdEluZm9baV07XG4gICAgICAgICAgICBhc3NlcnQuaXNGYWxzZShVdGlsLnBhdGhFeGlzdHModGVtcGxhdGVUZXN0SW5mby5wcm9qZWN0QnVpbGQpLCB0ZW1wbGF0ZVRlc3RJbmZvLm5hbWUgKyAnIHRlbXBsYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZG9uZSgpO1xuICAgIH0pLnRpbWVvdXQoNjAwMCk7XG5cbiAgICAvLyBpdCgnc2hvdWxkIGNyZWF0ZSBhIGBidWlsZGAgZm9sZGVyIG9uIGJ1aWxkJywgKGRvbmUpID0+IHtcbiAgICAvLyAgICAgLy8gQnVpbGQgYWxsIHByb2plY3RzXG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcGxhdGVUZXN0Q291bnQ7IGkrKykge1xuICAgIC8vICAgICAgICAgbGV0IHRlbXBsYXRlVGVzdEluZm8gPSB0ZW1wbGF0ZXNUZXN0SW5mb1tpXTtcbiAgICAvLyAgICAgICAgIGV4ZWNTeW5jKGJsaXR6Q2xpICsgJyBidWlsZCcsIHtjd2Q6IHRlbXBsYXRlVGVzdEluZm8ucHJvamVjdFBhdGh9KTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBsYXRlVGVzdENvdW50OyBpKyspIHtcbiAgICAvLyAgICAgICAgIGxldCB0ZW1wbGF0ZVRlc3RJbmZvID0gdGVtcGxhdGVzVGVzdEluZm9baV07XG4gICAgLy8gICAgICAgICBhc3NlcnQuaXNUcnVlKFV0aWwucGF0aEV4aXN0cyh0ZW1wbGF0ZVRlc3RJbmZvLnByb2plY3RCdWlsZCksIHRlbXBsYXRlVGVzdEluZm8ubmFtZSArICcgdGVtcGxhdGUnKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBkb25lKCk7XG4gICAgLy8gfSkudGltZW91dCg2MDAwKTtcbiAgICAvL1xuICAgIC8vIGl0KCdzaG91bGQgZ2VuZXJhdGUgdmFsaWQgYnVpbGQnLCAoZG9uZSkgPT4ge1xuICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBsYXRlVGVzdENvdW50OyBpKyspIHtcbiAgICAvLyAgICAgICAgIGxldCB0ZW1wbGF0ZVRlc3RJbmZvID0gdGVtcGxhdGVzVGVzdEluZm9baV07XG4gICAgLy8gICAgICAgICBpZiAoIVV0aWwucGF0aEV4aXN0cyh0ZW1wbGF0ZVRlc3RJbmZvLnRlbXBsYXRlQnVpbGQpKSB7XG4gICAgLy8gICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKGZzLndhbGtTeW5jKHRlbXBsYXRlVGVzdEluZm8ucHJvamVjdEJ1aWxkKS5sZW5ndGgsIDApO1xuICAgIC8vICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgbGV0IHRlbXBsYXRlQnVpbGRGaWxlcyA9IGZzLndhbGtTeW5jKHRlbXBsYXRlVGVzdEluZm8udGVtcGxhdGVCdWlsZCk7XG4gICAgLy8gICAgICAgICBsZXQgcHJvamVjdEJ1aWxkRmlsZXMgPSBmcy53YWxrU3luYyh0ZW1wbGF0ZVRlc3RJbmZvLnByb2plY3RCdWlsZCk7XG4gICAgLy8gICAgICAgICBhc3NlcnQuZXF1YWwocHJvamVjdEJ1aWxkRmlsZXMubGVuZ3RoLCB0ZW1wbGF0ZUJ1aWxkRmlsZXMubGVuZ3RoKTtcbiAgICAvLyAgICAgICAgIGxldCBjb3VudCA9IHRlbXBsYXRlQnVpbGRGaWxlcy5sZW5ndGg7XG4gICAgLy8gICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGNvdW50OyBrKyspIHtcbiAgICAvLyAgICAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHBhdGgucmVsYXRpdmUoXG4gICAgLy8gICAgICAgICAgICAgICAgIHRlbXBsYXRlVGVzdEluZm8udGVtcGxhdGVQYXRoLFxuICAgIC8vICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUJ1aWxkRmlsZXNba11cbiAgICAvLyAgICAgICAgICAgICApLCBwYXRoLnJlbGF0aXZlKFxuICAgIC8vICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVRlc3RJbmZvLnByb2plY3RQYXRoLFxuICAgIC8vICAgICAgICAgICAgICAgICBwcm9qZWN0QnVpbGRGaWxlc1trXVxuICAgIC8vICAgICAgICAgICAgICkpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjb3VudDsgaysrKSB7XG4gICAgLy8gICAgICAgICAgICAgbGV0IHRlbXBsYXRlRmlsZSA9IHRlbXBsYXRlQnVpbGRGaWxlc1trXTtcbiAgICAvLyAgICAgICAgICAgICBsZXQgcHJvamVjdEZpbGUgPSBwcm9qZWN0QnVpbGRGaWxlc1trXTtcbiAgICAvLyAgICAgICAgICAgICBhc3NlcnQuZXF1YWwoVXRpbC5nZXRGaWxlQ29udGVudHMocHJvamVjdEZpbGUpLCBVdGlsLmdldEZpbGVDb250ZW50cyh0ZW1wbGF0ZUZpbGUpKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvL1xuICAgIC8vICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgLy8gUmVtb3ZlIHRlbXAgZm9sZGVyXG4gICAgLy8gICAgIGZzLnJlbW92ZVN5bmModGVtcFBhdGgpO1xuICAgIC8vXG4gICAgLy8gICAgIGRvbmUoKTtcbiAgICAvLyB9KS50aW1lb3V0KDYwMDApO1xuXG59KTtcbiJdfQ==
