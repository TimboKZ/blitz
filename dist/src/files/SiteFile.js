"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericFile_1 = require('./GenericFile');
var Logger_1 = require('../Logger');
var SiteFile = (function (_super) {
    __extends(SiteFile, _super);
    function SiteFile(rootPath, relativePath, name, generator) {
        _super.call(this, rootPath, relativePath, name);
        this.generator = generator;
    }
    SiteFile.prototype.read = function () {
        throw new Error('Attempted to read from a site file `' + Logger_1.Logger.brand(this.name) + '`. This is not allowed!');
    };
    return SiteFile;
}(GenericFile_1.GenericFile));
exports.SiteFile = SiteFile;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9TaXRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFTQSw0QkFBMEIsZUFBZSxDQUFDLENBQUE7QUFDMUMsdUJBQXFCLFdBQVcsQ0FBQyxDQUFBO0FBTWpDO0lBQThCLDRCQUFXO0lBR3JDLGtCQUFZLFFBQWdCLEVBQUUsWUFBc0IsRUFBRSxJQUFZLEVBQUUsU0FBd0I7UUFDeEYsa0JBQU0sUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRU0sdUJBQUksR0FBWDtRQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcseUJBQXlCLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBQ0wsZUFBQztBQUFELENBWEEsQUFXQyxDQVg2Qix5QkFBVyxHQVd4QztBQVhZLGdCQUFRLFdBV3BCLENBQUEiLCJmaWxlIjoic3JjL2ZpbGVzL1NpdGVGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBBIFR5cGVTY3JpcHQgZmlsZS5cbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjAuMVxuICovXG5cbmltcG9ydCB7RmlsZUdlbmVyYXRvcn0gZnJvbSAnLi9GaWxlR2VuZXJhdG9yJztcbmltcG9ydCB7R2VuZXJpY0ZpbGV9IGZyb20gJy4vR2VuZXJpY0ZpbGUnO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4uL0xvZ2dlcic7XG5cbi8qKlxuICogQGNsYXNzIEEgY2xhc3MuXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIFNpdGVGaWxlIGV4dGVuZHMgR2VuZXJpY0ZpbGUge1xuICAgIHByaXZhdGUgZ2VuZXJhdG9yOiBGaWxlR2VuZXJhdG9yO1xuXG4gICAgY29uc3RydWN0b3Iocm9vdFBhdGg6IHN0cmluZywgcmVsYXRpdmVQYXRoOiBzdHJpbmdbXSwgbmFtZTogc3RyaW5nLCBnZW5lcmF0b3I6IEZpbGVHZW5lcmF0b3IpIHtcbiAgICAgICAgc3VwZXIocm9vdFBhdGgsIHJlbGF0aXZlUGF0aCwgbmFtZSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yID0gZ2VuZXJhdG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWFkKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byByZWFkIGZyb20gYSBzaXRlIGZpbGUgYCcgKyBMb2dnZXIuYnJhbmQodGhpcy5uYW1lKSArICdgLiBUaGlzIGlzIG5vdCBhbGxvd2VkIScpO1xuICAgIH1cbn1cbiJdfQ==
