"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericFile_1 = require('./GenericFile');
var Template_1 = require('../components/Template');
var TemplateFile = (function (_super) {
    __extends(TemplateFile, _super);
    function TemplateFile(path) {
        _super.call(this, path);
        this._template = new Template_1.Template();
    }
    TemplateFile.prototype.reload = function (locals, menus) {
        var changes = {};
        var tempContents = this.contents;
        this.read();
        if (tempContents === this.contents) {
            return changes;
        }
        this._template.prepare(this.contents, locals, menus);
    };
    TemplateFile.prototype.write = function () {
        throw new Error('Attempted to write to a template file. This is not allowed!');
    };
    Object.defineProperty(TemplateFile.prototype, "template", {
        get: function () {
            return this._template;
        },
        enumerable: true,
        configurable: true
    });
    return TemplateFile;
}(GenericFile_1.GenericFile));
exports.TemplateFile = TemplateFile;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9UZW1wbGF0ZUZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUEsNEJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBQzFDLHlCQUF1Qix3QkFBd0IsQ0FBQyxDQUFBO0FBT2hEO0lBQWtDLGdDQUFXO0lBSXpDLHNCQUFtQixJQUFZO1FBQzNCLGtCQUFNLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBTU0sNkJBQU0sR0FBYixVQUFjLE1BQVksRUFBRSxLQUFvQjtRQUM1QyxJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUM7UUFDdEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLDRCQUFLLEdBQVo7UUFDSSxNQUFNLElBQUksS0FBSyxDQUNYLDZEQUE2RCxDQUNoRSxDQUFDO0lBQ04sQ0FBQztJQUVELHNCQUFXLGtDQUFRO2FBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFDTCxtQkFBQztBQUFELENBaENBLEFBZ0NDLENBaENpQyx5QkFBVyxHQWdDNUM7QUFoQ1ksb0JBQVksZUFnQ3hCLENBQUEiLCJmaWxlIjoic3JjL2ZpbGVzL1RlbXBsYXRlRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQ29udGFpbnMgY29kZSByZWxhdGVkIENvbnRlbnQgRmlsZSBwYXJzaW5nXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuXG5pbXBvcnQge0dlbmVyaWNGaWxlfSBmcm9tICcuL0dlbmVyaWNGaWxlJztcbmltcG9ydCB7VGVtcGxhdGV9IGZyb20gJy4uL2NvbXBvbmVudHMvVGVtcGxhdGUnO1xuaW1wb3J0IHtJU2l0ZU1lbnVNYXB9IGZyb20gJy4uL2NvbXBvbmVudHMvTWVudSc7XG5cbi8qKlxuICogQGNsYXNzIEZpbGUgcmVzcG9uc2libGUgZm9yIHJlcHJlc2VudGluZyBjb250ZW50IGZpbGVzXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIFRlbXBsYXRlRmlsZSBleHRlbmRzIEdlbmVyaWNGaWxlIHtcblxuICAgIHByaXZhdGUgX3RlbXBsYXRlOiBUZW1wbGF0ZTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIocGF0aCk7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID0gbmV3IFRlbXBsYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsb2FkcyB0aGUgY29udGVudHMgb2YgdGhlIGZpbGUgYW5kIHByb2Nlc3NlcyBhbnkgY2hhbmdlc1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyByZWxvYWQobG9jYWxzPzogYW55LCBtZW51cz86IElTaXRlTWVudU1hcCkge1xuICAgICAgICBsZXQgY2hhbmdlczogYW55ID0ge307XG4gICAgICAgIGxldCB0ZW1wQ29udGVudHMgPSB0aGlzLmNvbnRlbnRzO1xuICAgICAgICB0aGlzLnJlYWQoKTtcbiAgICAgICAgaWYgKHRlbXBDb250ZW50cyA9PT0gdGhpcy5jb250ZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIGNoYW5nZXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdGVtcGxhdGUucHJlcGFyZSh0aGlzLmNvbnRlbnRzLCBsb2NhbHMsIG1lbnVzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdBdHRlbXB0ZWQgdG8gd3JpdGUgdG8gYSB0ZW1wbGF0ZSBmaWxlLiBUaGlzIGlzIG5vdCBhbGxvd2VkISdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRlbXBsYXRlKCk6IFRlbXBsYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xuICAgIH1cbn1cbiJdfQ==
