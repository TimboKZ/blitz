"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericFile_1 = require("./GenericFile");
var Logger_1 = require("../cli/Logger");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9TaXRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFTQSw2Q0FBMEM7QUFDMUMsd0NBQXFDO0FBTXJDO0lBQThCLDRCQUFXO0lBR3JDLGtCQUFZLFFBQWdCLEVBQUUsWUFBc0IsRUFBRSxJQUFZLEVBQUUsU0FBd0I7UUFBNUYsWUFDSSxrQkFBTSxRQUFRLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUV0QztRQURHLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOztJQUMvQixDQUFDO0lBRU0sdUJBQUksR0FBWDtRQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLEdBQUcsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcseUJBQXlCLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBQ0wsZUFBQztBQUFELENBWEEsQUFXQyxDQVg2Qix5QkFBVyxHQVd4QztBQVhZLDRCQUFRIiwiZmlsZSI6InNyYy9maWxlcy9TaXRlRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQSBUeXBlU2NyaXB0IGZpbGUuXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuXG5pbXBvcnQge0ZpbGVHZW5lcmF0b3J9IGZyb20gJy4vRmlsZUdlbmVyYXRvcic7XG5pbXBvcnQge0dlbmVyaWNGaWxlfSBmcm9tICcuL0dlbmVyaWNGaWxlJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi9jbGkvTG9nZ2VyJztcblxuLyoqXG4gKiBAY2xhc3MgQSBjbGFzcy5cbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY2xhc3MgU2l0ZUZpbGUgZXh0ZW5kcyBHZW5lcmljRmlsZSB7XG4gICAgcHJpdmF0ZSBnZW5lcmF0b3I6IEZpbGVHZW5lcmF0b3I7XG5cbiAgICBjb25zdHJ1Y3Rvcihyb290UGF0aDogc3RyaW5nLCByZWxhdGl2ZVBhdGg6IHN0cmluZ1tdLCBuYW1lOiBzdHJpbmcsIGdlbmVyYXRvcjogRmlsZUdlbmVyYXRvcikge1xuICAgICAgICBzdXBlcihyb290UGF0aCwgcmVsYXRpdmVQYXRoLCBuYW1lKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XG4gICAgfVxuXG4gICAgcHVibGljIHJlYWQoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGVkIHRvIHJlYWQgZnJvbSBhIHNpdGUgZmlsZSBgJyArIExvZ2dlci5icmFuZCh0aGlzLm5hbWUpICsgJ2AuIFRoaXMgaXMgbm90IGFsbG93ZWQhJyk7XG4gICAgfVxufVxuIl19
