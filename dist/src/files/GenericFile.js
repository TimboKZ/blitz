"use strict";
var path = require('path');
var fse = require('fs-extra');
var GenericFile = (function () {
    function GenericFile(path) {
        this._path = path;
    }
    GenericFile.prototype.read = function () {
        this._contents = fse.readFileSync(this._path, 'utf8');
    };
    GenericFile.prototype.write = function () {
        fse.ensureDirSync(path.dirname(this._path));
        fse.writeFileSync(this._path, this._contents);
    };
    Object.defineProperty(GenericFile.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (value) {
            this._path = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GenericFile.prototype, "contents", {
        get: function () {
            return this._contents;
        },
        set: function (value) {
            this._contents = value;
        },
        enumerable: true,
        configurable: true
    });
    return GenericFile;
}());
exports.GenericFile = GenericFile;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9HZW5lcmljRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsSUFBWSxJQUFJLFdBQU0sTUFBTSxDQUFDLENBQUE7QUFDN0IsSUFBWSxHQUFHLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFjaEM7SUFpQkkscUJBQVksSUFBWTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBTU0sMEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFNTSwyQkFBSyxHQUFaO1FBQ0ksR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELHNCQUFXLDZCQUFJO2FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsS0FBYTtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLGlDQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzthQUVELFVBQW9CLEtBQWE7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BSkE7SUFLTCxrQkFBQztBQUFELENBckRBLEFBcURDLElBQUE7QUFyRFksbUJBQVcsY0FxRHZCLENBQUEiLCJmaWxlIjoic3JjL2ZpbGVzL0dlbmVyaWNGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBDb250YWlucyBhbGwgZ2VuZXJpYyBGaWxlIGNsYXNzZXMgYW5kIGludGVyZmFjZXNcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBmc2UgZnJvbSAnZnMtZXh0cmEnO1xuXG4vKipcbiAqIFNwZWNpZmllcyB0aGF0IHRoZSBmaWxlIGlzIGFibGUgdG8gcmVsb2FkIGl0c2VsZlxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVJlbG9hZGFibGUge1xuICAgIHJlbG9hZDogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBAY2xhc3MgQSBjbGFzcy5cbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY2xhc3MgR2VuZXJpY0ZpbGUge1xuICAgIC8qKlxuICAgICAqIEZ1bGwgcGF0aCB0byB0aGUgZmlsZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgX3BhdGg6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb250ZW50cyBvZiB0aGUgZmlsZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgX2NvbnRlbnRzOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmljRmlsZSBjb25zdHJ1Y3RvclxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9wYXRoID0gcGF0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkcyBmaWxlIHN5c3RlbSB0byBleHRyYWN0IHRoZSBjb250ZW50cyBvZiB0aGUgZmlsZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkKCkge1xuICAgICAgICB0aGlzLl9jb250ZW50cyA9IGZzZS5yZWFkRmlsZVN5bmModGhpcy5fcGF0aCwgJ3V0ZjgnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYSBmaWxlIHRvIHRoZSBmaWxlIHN5c3RlbVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyB3cml0ZSgpIHtcbiAgICAgICAgZnNlLmVuc3VyZURpclN5bmMocGF0aC5kaXJuYW1lKHRoaXMuX3BhdGgpKTtcbiAgICAgICAgZnNlLndyaXRlRmlsZVN5bmModGhpcy5fcGF0aCwgdGhpcy5fY29udGVudHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHBhdGgodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9wYXRoID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjb250ZW50cygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudHM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBjb250ZW50cyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRzID0gdmFsdWU7XG4gICAgfVxufVxuIl19
