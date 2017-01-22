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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL1RlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFRQSxJQUFZLEdBQUcsV0FBTSxLQUFLLENBQUMsQ0FBQTtBQUMzQixJQUFZLFlBQVksV0FBTSxlQUFlLENBQUMsQ0FBQTtBQVE5QztJQUFBO0lBdUdBLENBQUM7SUFwRlUsMEJBQU8sR0FBZCxVQUFlLGNBQXNCLEVBQUUsTUFBVyxFQUFFLEtBQW1CO1FBQ25FLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUMsWUFBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFNTyxzQ0FBbUIsR0FBM0IsVUFBNEIsTUFBVztRQUNuQyxJQUFJLFdBQVcsR0FBRztZQUNkLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDakMsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN6QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQU1PLCtCQUFZLEdBQXBCLFVBQXFCLE1BQVcsRUFBRSxLQUFtQjtRQUNqRCxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLFFBQVEsR0FBRyxZQUFZLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUMzQixJQUFJLENBQUM7b0JBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkUsQ0FBRTtnQkFBQSxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQU1PLGdDQUFhLEdBQXJCLFVBQXNCLFFBQWtCO1FBQ3BDLE1BQU0sQ0FBQyxVQUFDLEtBQWM7WUFDbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLENBQUM7WUFDRCxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQ3pCLENBQUMsQ0FBQztJQUNOLENBQUM7SUFNTSwyQkFBUSxHQUFmLFVBQWdCLE1BQVk7UUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7UUFDbkYsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUtNLHlCQUFNLEdBQWI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBS00sNEJBQVMsR0FBaEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBS00sMkJBQVEsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0F2R0EsQUF1R0MsSUFBQTtBQXZHWSxnQkFBUSxXQXVHcEIsQ0FBQSIsImZpbGUiOiJzcmMvY29tcG9uZW50cy9UZW1wbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgQWxsIGNvZGUgcmVsYXRlZCB0byB0aGUgcmVwcmVzZXRudGF0aW9uIG9mIGEgdGVtcGxhdGUgZmlsZVxuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuaW1wb3J0ICogYXMgcHVnIGZyb20gJ3B1Zyc7XG5pbXBvcnQgKiBhcyBvYmplY3RBc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XG5pbXBvcnQge0lTaXRlTWVudU1hcH0gZnJvbSAnLi9NZW51JztcblxuLyoqXG4gKiBAY2xhc3MgV3JhcHBlciBhcm91bmQgYSBzcGVjaWZpYyB0ZW1wbGF0aW5nIGVuZ2luZSwgY3VycmVudGx5IG9ubHkgUHVnXG4gKiBAc2luY2UgMC4yLjBcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZSB7XG4gICAgLyoqXG4gICAgICogQ29tcGlsZWQgUHVnIHRlbXBsYXRlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb21waWxlZFRlbXBsYXRlOiAobG9jYWxzPzogYW55KSA9PiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBBcnJheXMgb2YgSURzLCBhc3NldHMgYW5kIG1lbnVzIHJlZmVyZW5jZWQgaW4gdGhlIHRlbXBsYXRlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBpZHM6IHN0cmluZ1tdO1xuICAgIHByaXZhdGUgYXNzZXRzOiBzdHJpbmdbXTtcbiAgICBwcml2YXRlIG1lbnVzOiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIEV4dHJhY3RzIGxpc3Qgb2YgcmVmZXJlbmNlZCBJRHMsIGFzc2V0cyBhbmQgbWVudXMgZnJvbSB0aGUgdGVtcGxhdGUgYWZ0ZXIgY29tcGlsaW5nIGl0XG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHByZXBhcmUodGVtcGxhdGVTdHJpbmc6IHN0cmluZywgbG9jYWxzOiBhbnksIG1lbnVzOiBJU2l0ZU1lbnVNYXApIHtcbiAgICAgICAgdGhpcy5pZHMgPSBbXTtcbiAgICAgICAgdGhpcy5hc3NldHMgPSBbXTtcbiAgICAgICAgdGhpcy5tZW51cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuY29tcGlsZWRUZW1wbGF0ZSA9IHB1Zy5jb21waWxlKHRlbXBsYXRlU3RyaW5nKTtcbiAgICAgICAgdGhpcy5leHRyYWN0SWRzQW5kQXNzZXRzKG9iamVjdEFzc2lnbih7fSwgbG9jYWxzLCB7bWVudXN9KSk7XG4gICAgICAgIHRoaXMuZXh0cmFjdE1lbnVzKGxvY2FscywgbWVudXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dHJhY3QgSURzIGFuZCBhc3NldHMgZnJvbSBhIGNvbXBpbGVkIHRlbXBsYXRlIHVzaW5nIG1vY2sgZ2VuZXJhdG9yc1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHByaXZhdGUgZXh0cmFjdElkc0FuZEFzc2V0cyhsb2NhbHM6IGFueSkge1xuICAgICAgICBsZXQgZXh0cmFMb2NhbHMgPSB7XG4gICAgICAgICAgICB1cmw6IHRoaXMubW9ja0dlbmVyYXRvcih0aGlzLmlkcyksXG4gICAgICAgICAgICBhc3NldDogdGhpcy5tb2NrR2VuZXJhdG9yKHRoaXMuYXNzZXRzKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb21waWxlZFRlbXBsYXRlKG9iamVjdEFzc2lnbih7fSwgbG9jYWxzLCBleHRyYUxvY2FscykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dHJhY3RzIG1lbnVzIHJlZmVyZW5jZWQgaW4gdGhlIGNvbXBpbGVkIHRlbXBsYXRlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHJpdmF0ZSBleHRyYWN0TWVudXMobG9jYWxzOiBhbnksIG1lbnVzOiBJU2l0ZU1lbnVNYXApIHtcbiAgICAgICAgZm9yIChsZXQgbWVudSBpbiBtZW51cykge1xuICAgICAgICAgICAgaWYgKG1lbnVzLmhhc093blByb3BlcnR5KG1lbnUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1dE1lbnVzID0gb2JqZWN0QXNzaWduKHt9LCBtZW51cyk7XG4gICAgICAgICAgICAgICAgY3V0TWVudXNbbWVudV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21waWxlZFRlbXBsYXRlKG9iamVjdEFzc2lnbih7fSwgbG9jYWxzLCB7bWVudXM6IGN1dE1lbnVzfSkpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVzLnB1c2gobWVudSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG1vY2sgc3RyaW5nIGdlbmVyYXRvciB0aGF0IGxvZ3MgY2FsbCBwYXJhbWV0ZXJzIGludG8gYW4gYXJyYXlcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIG1vY2tHZW5lcmF0b3IobG9nQXJyYXk6IHN0cmluZ1tdKTogKHZhbHVlPzogc3RyaW5nKSA9PiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gKHZhbHVlPzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsb2dBcnJheS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnLi9zb21lL3BhdGgnO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIEhUTUwgcGFnZSBmcm9tIHRoZSB0ZW1wbGF0ZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBnZW5lcmF0ZShsb2NhbHM/OiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5jb21waWxlZFRlbXBsYXRlKCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZ2VuZXJhdGUgYSBwYWdlIGZyb20gdGVtcGxhdGUgd2l0aCBub3RoaW5nIHByZXBhcmVkIScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBpbGVkVGVtcGxhdGUobG9jYWxzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SWRzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRBc3NldHMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5hc3NldHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIGdldE1lbnVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVudXM7XG4gICAgfVxufVxuIl19
