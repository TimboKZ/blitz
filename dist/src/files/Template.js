"use strict";
var pug = require('pug');
var objectAssign = require('object-assign');
var Template = (function () {
    function Template() {
    }
    Template.prototype.prepare = function (templateString, locals, menus) {
        this.ids = [];
        this.assets = [];
        this.menus = [];
        this.compiledTemplate = pug.compile(templateString);
        this.extractIdsAndAssets(objectAssign({}, locals, { menus: menus }));
        this.extractMenus(locals, menus);
    };
    Template.prototype.extractIdsAndAssets = function (locals) {
        var extraLocals = {
            url: this.mockGenerator(this.ids),
            asset: this.mockGenerator(this.assets),
        };
        this.compiledTemplate(objectAssign({}, locals, extraLocals));
    };
    Template.prototype.extractMenus = function (locals, menus) {
        for (var menu in menus) {
            if (menus.hasOwnProperty(menu)) {
                var cutMenus = objectAssign({}, menus);
                cutMenus[menu] = undefined;
                try {
                    this.compiledTemplate(objectAssign({}, locals, { menus: cutMenus }));
                }
                catch (exception) {
                    this.menus.push(menu);
                }
            }
        }
    };
    Template.prototype.mockGenerator = function (logArray) {
        return function (value) {
            if (value) {
                logArray.push(value);
            }
            return './some/path';
        };
    };
    Template.prototype.generate = function (locals) {
        if (this.compiledTemplate() === undefined) {
            throw new Error('Cannot generate a page from template with nothing prepared!');
        }
        return this.compiledTemplate(locals);
    };
    Template.prototype.getIds = function () {
        return this.ids;
    };
    Template.prototype.getAssets = function () {
        return this.assets;
    };
    Template.prototype.getMenus = function () {
        return this.menus;
    };
    return Template;
}());
exports.Template = Template;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9UZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsSUFBWSxHQUFHLFdBQU0sS0FBSyxDQUFDLENBQUE7QUFDM0IsSUFBWSxZQUFZLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFPOUM7SUFBQTtJQXdHQSxDQUFDO0lBcEZVLDBCQUFPLEdBQWQsVUFBZSxjQUFzQixFQUFFLE1BQVcsRUFBRSxLQUFtQjtRQUNuRSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFDLFlBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBTU8sc0NBQW1CLEdBQTNCLFVBQTRCLE1BQVc7UUFDbkMsSUFBSSxXQUFXLEdBQUc7WUFDZCxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ2pDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDekMsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFNTywrQkFBWSxHQUFwQixVQUFxQixNQUFXLEVBQUUsS0FBbUI7UUFDakQsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDO29CQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLENBQUU7Z0JBQUEsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFNTyxnQ0FBYSxHQUFyQixVQUFzQixRQUFrQjtRQUNwQyxNQUFNLENBQUMsVUFBQyxLQUFjO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixDQUFDO1lBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUN6QixDQUFDLENBQUM7SUFDTixDQUFDO0lBTU0sMkJBQVEsR0FBZixVQUFnQixNQUFZO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1FBQ25GLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFLTSx5QkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUtNLDRCQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUtNLDJCQUFRLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0wsZUFBQztBQUFELENBeEdBLEFBd0dDLElBQUE7QUF4R1ksZ0JBQVEsV0F3R3BCLENBQUEiLCJmaWxlIjoic3JjL2ZpbGVzL1RlbXBsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBBbGwgY29kZSByZWxhdGVkIHRvIHRoZSByZXByZXNldG50YXRpb24gb2YgYSB0ZW1wbGF0ZSBmaWxlXG4gKiBAYXV0aG9yIFRpbXVyIEt1emhhZ2FsaXlldiA8dGltLmt1emhAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2XG4gKiBAbGljZW5zZSBHUEwtMy4wXG4gKiBAc2luY2UgMC4wLjFcbiAqL1xuXG5pbXBvcnQgKiBhcyBwdWcgZnJvbSAncHVnJztcbmltcG9ydCAqIGFzIG9iamVjdEFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcbmltcG9ydCB7SVNpdGVNZW51TWFwfSBmcm9tICcuLi9NZW51JztcblxuLyoqXG4gKiBAY2xhc3MgV3JhcHBlciBhcm91bmQgYSBzcGVjaWZpYyB0ZW1wbGF0aW5nIGVuZ2luZSwgY3VycmVudGx5IG9ubHkgUHVnXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIFRlbXBsYXRlIHtcblxuICAgIC8qKlxuICAgICAqIENvbXBpbGVkIFB1ZyB0ZW1wbGF0ZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgY29tcGlsZWRUZW1wbGF0ZTogKGxvY2Fscz86IGFueSkgPT4gc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQXJyYXlzIG9mIElEcywgYXNzZXRzIGFuZCBtZW51cyByZWZlcmVuY2VkIGluIHRoZSB0ZW1wbGF0ZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgaWRzOiBzdHJpbmdbXTtcbiAgICBwcml2YXRlIGFzc2V0czogc3RyaW5nW107XG4gICAgcHJpdmF0ZSBtZW51czogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBFeHRyYWN0cyBsaXN0IG9mIHJlZmVyZW5jZWQgSURzLCBhc3NldHMgYW5kIG1lbnVzIGZyb20gdGhlIHRlbXBsYXRlIGFmdGVyIGNvbXBpbGluZyBpdFxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBwcmVwYXJlKHRlbXBsYXRlU3RyaW5nOiBzdHJpbmcsIGxvY2FsczogYW55LCBtZW51czogSVNpdGVNZW51TWFwKSB7XG4gICAgICAgIHRoaXMuaWRzID0gW107XG4gICAgICAgIHRoaXMuYXNzZXRzID0gW107XG4gICAgICAgIHRoaXMubWVudXMgPSBbXTtcblxuICAgICAgICB0aGlzLmNvbXBpbGVkVGVtcGxhdGUgPSBwdWcuY29tcGlsZSh0ZW1wbGF0ZVN0cmluZyk7XG4gICAgICAgIHRoaXMuZXh0cmFjdElkc0FuZEFzc2V0cyhvYmplY3RBc3NpZ24oe30sIGxvY2Fscywge21lbnVzfSkpO1xuICAgICAgICB0aGlzLmV4dHJhY3RNZW51cyhsb2NhbHMsIG1lbnVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRyYWN0IElEcyBhbmQgYXNzZXRzIGZyb20gYSBjb21waWxlZCB0ZW1wbGF0ZSB1c2luZyBtb2NrIGdlbmVyYXRvcnNcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIGV4dHJhY3RJZHNBbmRBc3NldHMobG9jYWxzOiBhbnkpIHtcbiAgICAgICAgbGV0IGV4dHJhTG9jYWxzID0ge1xuICAgICAgICAgICAgdXJsOiB0aGlzLm1vY2tHZW5lcmF0b3IodGhpcy5pZHMpLFxuICAgICAgICAgICAgYXNzZXQ6IHRoaXMubW9ja0dlbmVyYXRvcih0aGlzLmFzc2V0cyksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29tcGlsZWRUZW1wbGF0ZShvYmplY3RBc3NpZ24oe30sIGxvY2FscywgZXh0cmFMb2NhbHMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRyYWN0cyBtZW51cyByZWZlcmVuY2VkIGluIHRoZSBjb21waWxlZCB0ZW1wbGF0ZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgZXh0cmFjdE1lbnVzKGxvY2FsczogYW55LCBtZW51czogSVNpdGVNZW51TWFwKSB7XG4gICAgICAgIGZvciAobGV0IG1lbnUgaW4gbWVudXMpIHtcbiAgICAgICAgICAgIGlmIChtZW51cy5oYXNPd25Qcm9wZXJ0eShtZW51KSkge1xuICAgICAgICAgICAgICAgIGxldCBjdXRNZW51cyA9IG9iamVjdEFzc2lnbih7fSwgbWVudXMpO1xuICAgICAgICAgICAgICAgIGN1dE1lbnVzW21lbnVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGlsZWRUZW1wbGF0ZShvYmplY3RBc3NpZ24oe30sIGxvY2Fscywge21lbnVzOiBjdXRNZW51c30pKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51cy5wdXNoKG1lbnUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBtb2NrIHN0cmluZyBnZW5lcmF0b3IgdGhhdCBsb2dzIGNhbGwgcGFyYW1ldGVycyBpbnRvIGFuIGFycmF5XG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBtb2NrR2VuZXJhdG9yKGxvZ0FycmF5OiBzdHJpbmdbXSk6ICh2YWx1ZT86IHN0cmluZykgPT4gc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICh2YWx1ZT86IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbG9nQXJyYXkucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJy4vc29tZS9wYXRoJztcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBIVE1MIHBhZ2UgZnJvbSB0aGUgdGVtcGxhdGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2VuZXJhdGUobG9jYWxzPzogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuY29tcGlsZWRUZW1wbGF0ZSgpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGdlbmVyYXRlIGEgcGFnZSBmcm9tIHRlbXBsYXRlIHdpdGggbm90aGluZyBwcmVwYXJlZCEnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb21waWxlZFRlbXBsYXRlKGxvY2Fscyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGdldElkcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0QXNzZXRzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXNzZXRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNZW51cygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lbnVzO1xuICAgIH1cbn1cbiJdfQ==
