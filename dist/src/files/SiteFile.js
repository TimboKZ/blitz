"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericFile_1 = require("./GenericFile");
var Logger_1 = require("../Logger");
var SiteFile = (function (_super) {
    __extends(SiteFile, _super);
    function SiteFile(rootPath, relativePath, name, generator) {
        var _this = _super.call(this, rootPath, relativePath, name) || this;
        _this.generator = generator;
        return _this;
    }
    SiteFile.prototype.read = function () {
        throw new Error('Attempted to read from a site file `' + Logger_1.Logger.brand(this.name) + '`. This is not allowed!');
    };
    return SiteFile;
}(GenericFile_1.GenericFile));
exports.SiteFile = SiteFile;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9TaXRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFTQSw2Q0FBMEM7QUFDMUMsb0NBQWlDO0FBTWpDO0lBQThCLDRCQUFXO0lBR3JDLGtCQUFZLFFBQWdCLEVBQUUsWUFBc0IsRUFBRSxJQUFZLEVBQUUsU0FBd0I7UUFBNUYsWUFDSSxrQkFBTSxRQUFRLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUV0QztRQURHLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOztJQUMvQixDQUFDO0lBRU0sdUJBQUksR0FBWDtRQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcseUJBQXlCLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBQ0wsZUFBQztBQUFELENBWEEsQUFXQyxDQVg2Qix5QkFBVyxHQVd4QztBQVhZLDRCQUFRIiwiZmlsZSI6InNyYy9maWxlcy9TaXRlRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQSBUeXBlU2NyaXB0IGZpbGUuXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuXG5pbXBvcnQge0ZpbGVHZW5lcmF0b3J9IGZyb20gJy4vRmlsZUdlbmVyYXRvcic7XG5pbXBvcnQge0dlbmVyaWNGaWxlfSBmcm9tICcuL0dlbmVyaWNGaWxlJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi9Mb2dnZXInO1xuXG4vKipcbiAqIEBjbGFzcyBBIGNsYXNzLlxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjbGFzcyBTaXRlRmlsZSBleHRlbmRzIEdlbmVyaWNGaWxlIHtcbiAgICBwcml2YXRlIGdlbmVyYXRvcjogRmlsZUdlbmVyYXRvcjtcblxuICAgIGNvbnN0cnVjdG9yKHJvb3RQYXRoOiBzdHJpbmcsIHJlbGF0aXZlUGF0aDogc3RyaW5nW10sIG5hbWU6IHN0cmluZywgZ2VuZXJhdG9yOiBGaWxlR2VuZXJhdG9yKSB7XG4gICAgICAgIHN1cGVyKHJvb3RQYXRoLCByZWxhdGl2ZVBhdGgsIG5hbWUpO1xuICAgICAgICB0aGlzLmdlbmVyYXRvciA9IGdlbmVyYXRvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVhZCgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0ZWQgdG8gcmVhZCBmcm9tIGEgc2l0ZSBmaWxlIGAnICsgTG9nZ2VyLmJyYW5kKHRoaXMubmFtZSkgKyAnYC4gVGhpcyBpcyBub3QgYWxsb3dlZCEnKTtcbiAgICB9XG59XG4iXX0=
