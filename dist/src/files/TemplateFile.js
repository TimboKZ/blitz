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
        this._template.prepare(this.contents, this.path, locals, menus);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9UZW1wbGF0ZUZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUEsNEJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBQzFDLHlCQUF1Qix3QkFBd0IsQ0FBQyxDQUFBO0FBT2hEO0lBQWtDLGdDQUFXO0lBSXpDLHNCQUFtQixJQUFZO1FBQzNCLGtCQUFNLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBTU0sNkJBQU0sR0FBYixVQUFjLE1BQVksRUFBRSxLQUFvQjtRQUM1QyxJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUM7UUFDdEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRU0sNEJBQUssR0FBWjtRQUNJLE1BQU0sSUFBSSxLQUFLLENBQ1gsNkRBQTZELENBQ2hFLENBQUM7SUFDTixDQUFDO0lBRUQsc0JBQVcsa0NBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsQ0FoQ2lDLHlCQUFXLEdBZ0M1QztBQWhDWSxvQkFBWSxlQWdDeEIsQ0FBQSIsImZpbGUiOiJzcmMvZmlsZXMvVGVtcGxhdGVGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBDb250YWlucyBjb2RlIHJlbGF0ZWQgQ29udGVudCBGaWxlIHBhcnNpbmdcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCB7R2VuZXJpY0ZpbGV9IGZyb20gJy4vR2VuZXJpY0ZpbGUnO1xuaW1wb3J0IHtUZW1wbGF0ZX0gZnJvbSAnLi4vY29tcG9uZW50cy9UZW1wbGF0ZSc7XG5pbXBvcnQge0lTaXRlTWVudU1hcH0gZnJvbSAnLi4vY29tcG9uZW50cy9NZW51JztcblxuLyoqXG4gKiBAY2xhc3MgRmlsZSByZXNwb25zaWJsZSBmb3IgcmVwcmVzZW50aW5nIGNvbnRlbnQgZmlsZXNcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVGaWxlIGV4dGVuZHMgR2VuZXJpY0ZpbGUge1xuXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGU6IFRlbXBsYXRlO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykge1xuICAgICAgICBzdXBlcihwYXRoKTtcbiAgICAgICAgdGhpcy5fdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWxvYWRzIHRoZSBjb250ZW50cyBvZiB0aGUgZmlsZSBhbmQgcHJvY2Vzc2VzIGFueSBjaGFuZ2VzXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHJlbG9hZChsb2NhbHM/OiBhbnksIG1lbnVzPzogSVNpdGVNZW51TWFwKSB7XG4gICAgICAgIGxldCBjaGFuZ2VzOiBhbnkgPSB7fTtcbiAgICAgICAgbGV0IHRlbXBDb250ZW50cyA9IHRoaXMuY29udGVudHM7XG4gICAgICAgIHRoaXMucmVhZCgpO1xuICAgICAgICBpZiAodGVtcENvbnRlbnRzID09PSB0aGlzLmNvbnRlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hhbmdlcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90ZW1wbGF0ZS5wcmVwYXJlKHRoaXMuY29udGVudHMsIHRoaXMucGF0aCwgbG9jYWxzLCBtZW51cyk7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQXR0ZW1wdGVkIHRvIHdyaXRlIHRvIGEgdGVtcGxhdGUgZmlsZS4gVGhpcyBpcyBub3QgYWxsb3dlZCEnXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB0ZW1wbGF0ZSgpOiBUZW1wbGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZTtcbiAgICB9XG59XG4iXX0=
