"use strict";
exports.PAGE_FILE_EXTENSION = '.html';
exports.INDEX_FILE_NAME = 'index' + exports.PAGE_FILE_EXTENSION;
var URLHelper = (function () {
    function URLHelper() {
    }
    URLHelper.join = function () {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i - 0] = arguments[_i];
        }
        return parts.join('/');
    };
    URLHelper.trimSlashes = function (url) {
        url = url.replace(/^\/*/g, '');
        url = url.replace(/\/*$/g, '');
        return url;
    };
    URLHelper.split = function (url) {
        return URLHelper.trimSlashes(url).split('/');
    };
    URLHelper.empty = function (url) {
        return url === undefined || url === null || this.trimSlashes(url) === '';
    };
    URLHelper.fileFromUri = function (uri, explicitExtension) {
        var strippedUri = URLHelper.trimSlashes(uri);
        if (strippedUri === '') {
            return exports.INDEX_FILE_NAME;
        }
        if (explicitExtension) {
            return strippedUri + exports.PAGE_FILE_EXTENSION;
        }
        return URLHelper.join(strippedUri, exports.INDEX_FILE_NAME);
    };
    return URLHelper;
}());
exports.URLHelper = URLHelper;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzL1VSTEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBWWEsMkJBQW1CLEdBQUcsT0FBTyxDQUFDO0FBTTlCLHVCQUFlLEdBQUcsT0FBTyxHQUFHLDJCQUFtQixDQUFDO0FBTTdEO0lBQUE7SUFpREEsQ0FBQztJQTVDaUIsY0FBSSxHQUFsQjtRQUFtQixlQUFrQjthQUFsQixXQUFrQixDQUFsQixzQkFBa0IsQ0FBbEIsSUFBa0I7WUFBbEIsOEJBQWtCOztRQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBTWEscUJBQVcsR0FBekIsVUFBMEIsR0FBVztRQUNqQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBTWEsZUFBSyxHQUFuQixVQUFvQixHQUFXO1FBQzNCLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBTWEsZUFBSyxHQUFuQixVQUFvQixHQUFXO1FBQzNCLE1BQU0sQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0UsQ0FBQztJQU1hLHFCQUFXLEdBQXpCLFVBQTBCLEdBQVcsRUFBRSxpQkFBMEI7UUFDN0QsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsdUJBQWUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxXQUFXLEdBQUcsMkJBQW1CLENBQUM7UUFDN0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSx1QkFBZSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FqREEsQUFpREMsSUFBQTtBQWpEWSxpQkFBUyxZQWlEckIsQ0FBQSIsImZpbGUiOiJzcmMvaGVscGVycy9VUkxIZWxwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIFZhcmlvdXMgaGVscGVyIHV0aWxpdGllcyByZWxhdGVkIHRvIFVSTHNcbiAqIEBhdXRob3IgVGltdXIgS3V6aGFnYWxpeWV2IDx0aW0ua3V6aEBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTZcbiAqIEBsaWNlbnNlIEdQTC0zLjBcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5cbi8qKlxuICogRXh0ZW5zaW9uIGFwcGVuZGVkIHRvIHBhZ2UgZmlsZXNcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgUEFHRV9GSUxFX0VYVEVOU0lPTiA9ICcuaHRtbCc7XG5cbi8qKlxuICogTmFtZSBvZiB0aGUgZmlsZSB0aGF0IHdpbGwgYmUgY29uc2lkZXJlZCB0aGUgaW5kZXgsIG1pZ2h0IGNoYW5nZSBkZXBlbmRpbmcgb24gc2VydmVyIGNvbmZpZ3VyYXRpb25cbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgY29uc3QgSU5ERVhfRklMRV9OQU1FID0gJ2luZGV4JyArIFBBR0VfRklMRV9FWFRFTlNJT047XG5cbi8qKlxuICogQGNsYXNzIENvbGxlY3Rpb24gb2Ygc3RhdGljIG1ldGhvZHMgZm9yIGNvbW1vbiBvcGVyYXRpb25zIHdpdGggVVJMc1xuICogQHNpbmNlIDAuMi4wXG4gKi9cbmV4cG9ydCBjbGFzcyBVUkxIZWxwZXIge1xuICAgIC8qKlxuICAgICAqIEpvaW5zIFVSSSBwYXJ0cywgbXVjaCBsaWtlIGBwYXRoLmpvaW4oKWBcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGpvaW4oLi4ucGFydHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCB0cmFpbGluZyBhbmQgbGVhZGluZyBzbGFzaGVzXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0cmltU2xhc2hlcyh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9eXFwvKi9nLCAnJyk7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC8qJC9nLCAnJyk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnJlYWtzIGEgVVJJIGRvd24gaW50byBjb21wb25lbmV0c1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc3BsaXQodXJsOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBVUkxIZWxwZXIudHJpbVNsYXNoZXModXJsKS5zcGxpdCgnLycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB1cmwgaXMgdW5kZWZpbmVkIG9yIGFuIGVtcHR5IHN0cmluZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZW1wdHkodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHVybCA9PT0gdW5kZWZpbmVkIHx8IHVybCA9PT0gbnVsbCB8fCB0aGlzLnRyaW1TbGFzaGVzKHVybCkgPT09ICcnOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLW51bGwta2V5d29yZFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgdGFyZ2V0IFVSSSBhbmQgZ2VuZXJhdGVzIGEgZmlsZW5hbWUgZnJvbSBpdFxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsZUZyb21VcmkodXJpOiBzdHJpbmcsIGV4cGxpY2l0RXh0ZW5zaW9uOiBib29sZWFuKSB7XG4gICAgICAgIGxldCBzdHJpcHBlZFVyaSA9IFVSTEhlbHBlci50cmltU2xhc2hlcyh1cmkpO1xuICAgICAgICBpZiAoc3RyaXBwZWRVcmkgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gSU5ERVhfRklMRV9OQU1FO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleHBsaWNpdEV4dGVuc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmlwcGVkVXJpICsgUEFHRV9GSUxFX0VYVEVOU0lPTjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVVJMSGVscGVyLmpvaW4oc3RyaXBwZWRVcmksIElOREVYX0ZJTEVfTkFNRSk7XG4gICAgfVxufVxuIl19
