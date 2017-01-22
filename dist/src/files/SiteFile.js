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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9TaXRlRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFPQSw0QkFBMEIsZUFBZSxDQUFDLENBQUE7QUFPMUM7SUFBOEIsNEJBQVc7SUFLckMsa0JBQW1CLElBQVksRUFBRSxZQUEwQixFQUFFLFdBQXlCO1FBQ2xGLGtCQUFNLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQUVNLDBCQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFELENBQUM7SUFFTSx1QkFBSSxHQUFYO1FBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FsQkEsQUFrQkMsQ0FsQjZCLHlCQUFXLEdBa0J4QztBQWxCWSxnQkFBUSxXQWtCcEIsQ0FBQSIsImZpbGUiOiJzcmMvZmlsZXMvU2l0ZUZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIEEgVHlwZVNjcmlwdCBmaWxlLlxuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICovXG5cbmltcG9ydCB7R2VuZXJpY0ZpbGV9IGZyb20gJy4vR2VuZXJpY0ZpbGUnO1xuaW1wb3J0IHtUZW1wbGF0ZUZpbGV9IGZyb20gJy4vVGVtcGxhdGVGaWxlJztcbmltcG9ydCB7Q29udGVudEZpbGV9IGZyb20gJy4vQ29udGVudEZpbGUnO1xuXG4vKipcbiAqIEBjbGFzcyBBIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgU2l0ZUZpbGUgZXh0ZW5kcyBHZW5lcmljRmlsZSB7XG5cbiAgICBwcml2YXRlIHRlbXBsYXRlRmlsZTogVGVtcGxhdGVGaWxlO1xuICAgIHByaXZhdGUgY29udGVudEZpbGU6IENvbnRlbnRGaWxlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZywgdGVtcGxhdGVGaWxlOiBUZW1wbGF0ZUZpbGUsIGNvbnRlbnRGaWxlPzogQ29udGVudEZpbGUpIHtcbiAgICAgICAgc3VwZXIocGF0aCk7XG4gICAgICAgIHRoaXMudGVtcGxhdGVGaWxlID0gdGVtcGxhdGVGaWxlO1xuICAgICAgICB0aGlzLmNvbnRlbnRGaWxlID0gY29udGVudEZpbGU7XG4gICAgfVxuXG4gICAgcHVibGljIHJlYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudHMgPSB0aGlzLnRlbXBsYXRlRmlsZS50ZW1wbGF0ZS5nZW5lcmF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWFkKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byByZWFkIGZyb20gYSBzaXRlIGZpbGUuIFRoaXMgaXMgbm90IGFsbG93ZWQhJyk7XG4gICAgfVxufVxuIl19
