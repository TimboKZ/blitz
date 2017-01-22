"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericFile_1 = require('./GenericFile');
var SiteFile = (function (_super) {
    __extends(SiteFile, _super);
    function SiteFile(path, generator) {
        _super.call(this, path);
        this.generator = generator;
    }
    SiteFile.prototype.read = function () {
        throw new Error('Attempted to read from a site file. This is not allowed!');
    };
    return SiteFile;
}(GenericFile_1.GenericFile));
exports.SiteFile = SiteFile;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9TaXRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFTQSw0QkFBMEIsZUFBZSxDQUFDLENBQUE7QUFNMUM7SUFBOEIsNEJBQVc7SUFHckMsa0JBQVksSUFBWSxFQUFFLFNBQTRCO1FBQ2xELGtCQUFNLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVNLHVCQUFJLEdBQVg7UUFDSSxNQUFNLElBQUksS0FBSyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQVhBLEFBV0MsQ0FYNkIseUJBQVcsR0FXeEM7QUFYWSxnQkFBUSxXQVdwQixDQUFBIiwiZmlsZSI6InNyYy9maWxlcy9TaXRlRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQSBUeXBlU2NyaXB0IGZpbGUuXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuXG5pbXBvcnQge1NpdGVGaWxlR2VuZXJhdG9yfSBmcm9tICcuL1NpdGVGaWxlR2VuZXJhdG9yJztcbmltcG9ydCB7R2VuZXJpY0ZpbGV9IGZyb20gJy4vR2VuZXJpY0ZpbGUnO1xuXG4vKipcbiAqIEBjbGFzcyBBIGNsYXNzLlxuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjbGFzcyBTaXRlRmlsZSBleHRlbmRzIEdlbmVyaWNGaWxlIHtcbiAgICBwcml2YXRlIGdlbmVyYXRvcjogU2l0ZUZpbGVHZW5lcmF0b3I7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcsIGdlbmVyYXRvcjogU2l0ZUZpbGVHZW5lcmF0b3IpIHtcbiAgICAgICAgc3VwZXIocGF0aCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdG9yID0gZ2VuZXJhdG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWFkKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byByZWFkIGZyb20gYSBzaXRlIGZpbGUuIFRoaXMgaXMgbm90IGFsbG93ZWQhJyk7XG4gICAgfVxufVxuIl19
