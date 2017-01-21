"use strict";
var path = require("path");
var fse = require("fs-extra");
var GenericFile = (function () {
    function GenericFile(rootPath, relativePath, name) {
        this.rootPath = rootPath;
        this.relativePath = relativePath;
        this.name = name;
        var relativePathString = path.join.apply(undefined, this.relativePath);
        this.fullPath = path.join(this.rootPath, relativePathString, this.name);
    }
    GenericFile.prototype.read = function () {
        this.contents = fse.readFileSync(this.getFullPath(), 'utf8');
    };
    GenericFile.prototype.write = function () {
        fse.writeFileSync(this.getFullPath(), this.contents);
    };
    GenericFile.prototype.getFullPath = function () {
        return this.fullPath;
    };
    GenericFile.prototype.getName = function () {
        return this.name;
    };
    GenericFile.prototype.getContents = function () {
        return this.contents;
    };
    GenericFile.prototype.setContents = function (contents) {
        this.contents = contents;
    };
    return GenericFile;
}());
exports.GenericFile = GenericFile;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9HZW5lcmljRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsMkJBQTZCO0FBQzdCLDhCQUFnQztBQWNoQztJQW1DSSxxQkFBWSxRQUFnQixFQUFFLFlBQXNCLEVBQUUsSUFBWTtRQUM5RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFNTSwwQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBTU0sMkJBQUssR0FBWjtRQUNJLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBTU0saUNBQVcsR0FBbEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBS00sNkJBQU8sR0FBZDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFLTSxpQ0FBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFLTSxpQ0FBVyxHQUFsQixVQUFtQixRQUFnQjtRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQXZGQSxBQXVGQyxJQUFBO0FBdkZZLGtDQUFXIiwiZmlsZSI6InNyYy9maWxlcy9HZW5lcmljRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQ29udGFpbnMgYWxsIGdlbmVyaWMgRmlsZSBjbGFzc2VzIGFuZCBpbnRlcmZhY2VzXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgZnNlIGZyb20gJ2ZzLWV4dHJhJztcblxuLyoqXG4gKiBTcGVjaWZpZXMgdGhhdCB0aGUgZmlsZSBpcyBhYmxlIHRvIHJlbG9hZCBpdHNlbGZcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElSZWxvYWRhYmxlIHtcbiAgICByZWxvYWQ6ICgpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQGNsYXNzIEEgY2xhc3MuXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIEdlbmVyaWNGaWxlIHtcbiAgICAvKipcbiAgICAgKiBQYXRoIGluIGEgZmlsZSBzeXN0ZW0gdGhhdCB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoZSByZWxhdGl2ZSBwYXRoXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHJvb3RQYXRoOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBQYXRoIHJlbGF0aXZlIHRvIHRoZSByb290IHBhdGggc3BlY2lmaWVkIGFib3ZlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHJlbGF0aXZlUGF0aDogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBmaWxlLCBpbmNsdWRpbmcgZXh0ZW5zaW9uXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJvdGVjdGVkIG5hbWU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEZ1bGwgcGF0aCB0byB0aGUgZmlsZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBmdWxsUGF0aDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNvbnRlbnRzOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmljRmlsZSBjb25zdHJ1Y3RvclxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJvb3RQYXRoOiBzdHJpbmcsIHJlbGF0aXZlUGF0aDogc3RyaW5nW10sIG5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJvb3RQYXRoID0gcm9vdFBhdGg7XG4gICAgICAgIHRoaXMucmVsYXRpdmVQYXRoID0gcmVsYXRpdmVQYXRoO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBsZXQgcmVsYXRpdmVQYXRoU3RyaW5nID0gcGF0aC5qb2luLmFwcGx5KHVuZGVmaW5lZCwgdGhpcy5yZWxhdGl2ZVBhdGgpO1xuICAgICAgICB0aGlzLmZ1bGxQYXRoID0gcGF0aC5qb2luKHRoaXMucm9vdFBhdGgsIHJlbGF0aXZlUGF0aFN0cmluZywgdGhpcy5uYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkcyBmaWxlIHN5c3RlbSB0byBleHRyYWN0IHRoZSBjb250ZW50cyBvZiB0aGUgZmlsZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRzID0gZnNlLnJlYWRGaWxlU3luYyh0aGlzLmdldEZ1bGxQYXRoKCksICd1dGY4Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgZmlsZSB0byB0aGUgZmlsZSBzeXN0ZW1cbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgd3JpdGUoKSB7XG4gICAgICAgIGZzZS53cml0ZUZpbGVTeW5jKHRoaXMuZ2V0RnVsbFBhdGgoKSwgdGhpcy5jb250ZW50cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBmdWxsIHBhdGggdG8gdGhlIGZpbGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RnVsbFBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnVsbFBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGdldE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q29udGVudHMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHNldENvbnRlbnRzKGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250ZW50cyA9IGNvbnRlbnRzO1xuICAgIH1cbn1cbiJdfQ==
