"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Logger_1 = require('../Logger');
var GenericFile_1 = require('./GenericFile');
var Template_1 = require('./Template');
var TemplateFile = (function (_super) {
    __extends(TemplateFile, _super);
    function TemplateFile(rootPath, relativePath) {
        _super.call(this, rootPath, [], relativePath);
        this.relativePath = relativePath;
        this.template = new Template_1.Template();
    }
    TemplateFile.prototype.reload = function (locals, menus) {
        var changes = {};
        var tempContents = this.contents;
        this.read();
        if (tempContents === this.contents) {
            return changes;
        }
        this.template.prepare(this.contents, locals, menus);
    };
    TemplateFile.prototype.write = function () {
        throw new Error('Attempted to write to a template file `' + Logger_1.Logger.brand(this.name) + '`. This is not allowed!');
    };
    TemplateFile.prototype.getTemplate = function () {
        return this.template;
    };
    return TemplateFile;
}(GenericFile_1.GenericFile));
exports.TemplateFile = TemplateFile;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9UZW1wbGF0ZUZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUEsdUJBQXFCLFdBQVcsQ0FBQyxDQUFBO0FBQ2pDLDRCQUEwQixlQUFlLENBQUMsQ0FBQTtBQUMxQyx5QkFBdUIsWUFBWSxDQUFDLENBQUE7QUFPcEM7SUFBa0MsZ0NBQVc7SUFnQnpDLHNCQUFtQixRQUFnQixFQUFFLFlBQW9CO1FBQ3JELGtCQUFNLFFBQVEsRUFBRSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBTU0sNkJBQU0sR0FBYixVQUFjLE1BQVksRUFBRSxLQUFvQjtRQUM1QyxJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUM7UUFDdEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQU1NLDRCQUFLLEdBQVo7UUFDSSxNQUFNLElBQUksS0FBSyxDQUNYLHlDQUF5QyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLHlCQUF5QixDQUNsRyxDQUFDO0lBQ04sQ0FBQztJQUtNLGtDQUFXLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FwREEsQUFvREMsQ0FwRGlDLHlCQUFXLEdBb0Q1QztBQXBEWSxvQkFBWSxlQW9EeEIsQ0FBQSIsImZpbGUiOiJzcmMvZmlsZXMvVGVtcGxhdGVGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBDb250YWlucyBjb2RlIHJlbGF0ZWQgQ29udGVudCBGaWxlIHBhcnNpbmdcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi9Mb2dnZXInO1xuaW1wb3J0IHtHZW5lcmljRmlsZX0gZnJvbSAnLi9HZW5lcmljRmlsZSc7XG5pbXBvcnQge1RlbXBsYXRlfSBmcm9tICcuL1RlbXBsYXRlJztcbmltcG9ydCB7SVNpdGVNZW51TWFwfSBmcm9tICcuLi9NZW51JztcblxuLyoqXG4gKiBAY2xhc3MgRmlsZSByZXNwb25zaWJsZSBmb3IgcmVwcmVzZW50aW5nIGNvbnRlbnQgZmlsZXNcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVGaWxlIGV4dGVuZHMgR2VuZXJpY0ZpbGUge1xuICAgIC8qKlxuICAgICAqIENvbXBpbGVkIHRlbXBsYXRlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZTogVGVtcGxhdGU7XG5cbiAgICAvKipcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbGF0aXZlUGF0aDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ29udGVudEZpbGUgY29uc3RydWN0b3JcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3Iocm9vdFBhdGg6IHN0cmluZywgcmVsYXRpdmVQYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIocm9vdFBhdGgsIFtdLCByZWxhdGl2ZVBhdGgpO1xuICAgICAgICB0aGlzLnJlbGF0aXZlUGF0aCA9IHJlbGF0aXZlUGF0aDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbG9hZHMgdGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlIGFuZCBwcm9jZXNzZXMgYW55IGNoYW5nZXNcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVsb2FkKGxvY2Fscz86IGFueSwgbWVudXM/OiBJU2l0ZU1lbnVNYXApIHtcbiAgICAgICAgbGV0IGNoYW5nZXM6IGFueSA9IHt9O1xuICAgICAgICBsZXQgdGVtcENvbnRlbnRzID0gdGhpcy5jb250ZW50cztcbiAgICAgICAgdGhpcy5yZWFkKCk7XG4gICAgICAgIGlmICh0ZW1wQ29udGVudHMgPT09IHRoaXMuY29udGVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGVtcGxhdGUucHJlcGFyZSh0aGlzLmNvbnRlbnRzLCBsb2NhbHMsIG1lbnVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgYmVjYXVzZSBjb250ZW50IGZpbGVzIHNob3VsZCBub3QgYmUgd3JpdHRlbiB0b1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyB3cml0ZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0F0dGVtcHRlZCB0byB3cml0ZSB0byBhIHRlbXBsYXRlIGZpbGUgYCcgKyBMb2dnZXIuYnJhbmQodGhpcy5uYW1lKSArICdgLiBUaGlzIGlzIG5vdCBhbGxvd2VkISdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0VGVtcGxhdGUoKTogVGVtcGxhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZTtcbiAgICB9XG59XG4iXX0=
