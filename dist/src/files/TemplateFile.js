"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Logger_1 = require('../cli/Logger');
var GenericFile_1 = require('./GenericFile');
var Template_1 = require('../components/Template');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9UZW1wbGF0ZUZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUEsdUJBQXFCLGVBQWUsQ0FBQyxDQUFBO0FBQ3JDLDRCQUEwQixlQUFlLENBQUMsQ0FBQTtBQUMxQyx5QkFBdUIsd0JBQXdCLENBQUMsQ0FBQTtBQU9oRDtJQUFrQyxnQ0FBVztJQVd6QyxzQkFBbUIsUUFBZ0IsRUFBRSxZQUFvQjtRQUNyRCxrQkFBTSxRQUFRLEVBQUUsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQU1NLDZCQUFNLEdBQWIsVUFBYyxNQUFZLEVBQUUsS0FBb0I7UUFDNUMsSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFNTSw0QkFBSyxHQUFaO1FBQ0ksTUFBTSxJQUFJLEtBQUssQ0FDWCx5Q0FBeUMsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyx5QkFBeUIsQ0FDbEcsQ0FBQztJQUNOLENBQUM7SUFLTSxrQ0FBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxtQkFBQztBQUFELENBL0NBLEFBK0NDLENBL0NpQyx5QkFBVyxHQStDNUM7QUEvQ1ksb0JBQVksZUErQ3hCLENBQUEiLCJmaWxlIjoic3JjL2ZpbGVzL1RlbXBsYXRlRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQ29udGFpbnMgY29kZSByZWxhdGVkIENvbnRlbnQgRmlsZSBwYXJzaW5nXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuXG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnLi4vY2xpL0xvZ2dlcic7XG5pbXBvcnQge0dlbmVyaWNGaWxlfSBmcm9tICcuL0dlbmVyaWNGaWxlJztcbmltcG9ydCB7VGVtcGxhdGV9IGZyb20gJy4uL2NvbXBvbmVudHMvVGVtcGxhdGUnO1xuaW1wb3J0IHtJU2l0ZU1lbnVNYXB9IGZyb20gJy4uL2NvbXBvbmVudHMvTWVudSc7XG5cbi8qKlxuICogQGNsYXNzIEZpbGUgcmVzcG9uc2libGUgZm9yIHJlcHJlc2VudGluZyBjb250ZW50IGZpbGVzXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIFRlbXBsYXRlRmlsZSBleHRlbmRzIEdlbmVyaWNGaWxlIHtcbiAgICAvKipcbiAgICAgKiBDb21waWxlZCB0ZW1wbGF0ZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlO1xuXG4gICAgLyoqXG4gICAgICogQ29udGVudEZpbGUgY29uc3RydWN0b3JcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3Iocm9vdFBhdGg6IHN0cmluZywgcmVsYXRpdmVQYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIocm9vdFBhdGgsIFtdLCByZWxhdGl2ZVBhdGgpO1xuICAgICAgICB0aGlzLnJlbGF0aXZlUGF0aCA9IHJlbGF0aXZlUGF0aDtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbG9hZHMgdGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlIGFuZCBwcm9jZXNzZXMgYW55IGNoYW5nZXNcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVsb2FkKGxvY2Fscz86IGFueSwgbWVudXM/OiBJU2l0ZU1lbnVNYXApIHtcbiAgICAgICAgbGV0IGNoYW5nZXM6IGFueSA9IHt9O1xuICAgICAgICBsZXQgdGVtcENvbnRlbnRzID0gdGhpcy5jb250ZW50cztcbiAgICAgICAgdGhpcy5yZWFkKCk7XG4gICAgICAgIGlmICh0ZW1wQ29udGVudHMgPT09IHRoaXMuY29udGVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGVtcGxhdGUucHJlcGFyZSh0aGlzLmNvbnRlbnRzLCBsb2NhbHMsIG1lbnVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgYmVjYXVzZSBjb250ZW50IGZpbGVzIHNob3VsZCBub3QgYmUgd3JpdHRlbiB0b1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyB3cml0ZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0F0dGVtcHRlZCB0byB3cml0ZSB0byBhIHRlbXBsYXRlIGZpbGUgYCcgKyBMb2dnZXIuYnJhbmQodGhpcy5uYW1lKSArICdgLiBUaGlzIGlzIG5vdCBhbGxvd2VkISdcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0VGVtcGxhdGUoKTogVGVtcGxhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZTtcbiAgICB9XG59Il19
