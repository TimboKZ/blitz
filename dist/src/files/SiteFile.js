"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericFile_1 = require('./GenericFile');
var SiteFile = (function (_super) {
    __extends(SiteFile, _super);
    function SiteFile(path, templateFile, contentFile) {
        _super.call(this, path);
        this.templateFile = templateFile;
        this.contentFile = contentFile;
    }
    SiteFile.prototype.rebuild = function () {
        this.contents = this.templateFile.template.generate();
    };
    SiteFile.prototype.read = function () {
        throw new Error('Attempted to read from a site file. This is not allowed!');
    };
    return SiteFile;
}(GenericFile_1.GenericFile));
exports.SiteFile = SiteFile;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9TaXRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFPQSw0QkFBMEIsZUFBZSxDQUFDLENBQUE7QUFtQjFDO0lBQThCLDRCQUFXO0lBS3JDLGtCQUFtQixJQUFZLEVBQUUsWUFBMEIsRUFBRSxXQUF5QjtRQUNsRixrQkFBTSxJQUFJLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ25DLENBQUM7SUFFTSwwQkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRU0sdUJBQUksR0FBWDtRQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0wsZUFBQztBQUFELENBbEJBLEFBa0JDLENBbEI2Qix5QkFBVyxHQWtCeEM7QUFsQlksZ0JBQVEsV0FrQnBCLENBQUEiLCJmaWxlIjoic3JjL2ZpbGVzL1NpdGVGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBBIFR5cGVTY3JpcHQgZmlsZS5cbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqL1xuXG5pbXBvcnQge0dlbmVyaWNGaWxlfSBmcm9tICcuL0dlbmVyaWNGaWxlJztcbmltcG9ydCB7VGVtcGxhdGVGaWxlfSBmcm9tICcuL1RlbXBsYXRlRmlsZSc7XG5pbXBvcnQge0NvbnRlbnRGaWxlfSBmcm9tICcuL0NvbnRlbnRGaWxlJztcbmltcG9ydCB7SVVybEdlbmVyYXRvciwgSUFzc2V0UGF0aEdlbmVyYXRvcn0gZnJvbSAnLi4vY29yZS9Qcm9qZWN0QnVpbGRlcic7XG5pbXBvcnQge0lTaXRlTWVudU1hcH0gZnJvbSAnLi4vY29tcG9uZW50cy9NZW51JztcblxuZXhwb3J0IGludGVyZmFjZSBJQmxpdHpQYWdlTG9jYWxzIHtcbiAgICB1cmw6IElVcmxHZW5lcmF0b3I7XG4gICAgYXNzZXQ6IElBc3NldFBhdGhHZW5lcmF0b3I7XG4gICAgY2hpbGRfcGFnZXM6IGFueVtdO1xuICAgIG1lbnVzOiBJU2l0ZU1lbnVNYXA7XG4gICAgaGFzaDogc3RyaW5nO1xuICAgIHNpdGVfdXJsOiBzdHJpbmc7XG4gICAgc2l0ZV9yb290OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQGNsYXNzIEEgY2xhc3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBTaXRlRmlsZSBleHRlbmRzIEdlbmVyaWNGaWxlIHtcblxuICAgIHByaXZhdGUgdGVtcGxhdGVGaWxlOiBUZW1wbGF0ZUZpbGU7XG4gICAgcHJpdmF0ZSBjb250ZW50RmlsZTogQ29udGVudEZpbGU7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGF0aDogc3RyaW5nLCB0ZW1wbGF0ZUZpbGU6IFRlbXBsYXRlRmlsZSwgY29udGVudEZpbGU/OiBDb250ZW50RmlsZSkge1xuICAgICAgICBzdXBlcihwYXRoKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUZpbGUgPSB0ZW1wbGF0ZUZpbGU7XG4gICAgICAgIHRoaXMuY29udGVudEZpbGUgPSBjb250ZW50RmlsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVidWlsZCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50cyA9IHRoaXMudGVtcGxhdGVGaWxlLnRlbXBsYXRlLmdlbmVyYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlYWQoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGVkIHRvIHJlYWQgZnJvbSBhIHNpdGUgZmlsZS4gVGhpcyBpcyBub3QgYWxsb3dlZCEnKTtcbiAgICB9XG59XG4iXX0=
