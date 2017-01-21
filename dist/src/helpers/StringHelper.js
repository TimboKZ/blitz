"use strict";
var StringHelper = (function () {
    function StringHelper() {
    }
    StringHelper.isString = function (object) {
        return typeof object === 'string';
    };
    StringHelper.random = function (length) {
        var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
        return result;
    };
    StringHelper.stringify = function (object) {
        if (StringHelper.isString(object)) {
            return object;
        }
        return JSON.stringify(object);
    };
    StringHelper.empty = function (str) {
        return str === undefined || str === null || str === '';
    };
    StringHelper.stripExtension = function (path) {
        return path.replace(/\.[^.]*$/g, '');
    };
    return StringHelper;
}());
exports.StringHelper = StringHelper;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzL1N0cmluZ0hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBWUE7SUFBQTtJQWdEQSxDQUFDO0lBM0NpQixxQkFBUSxHQUF0QixVQUF1QixNQUFXO1FBQzlCLE1BQU0sQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQU1hLG1CQUFNLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsSUFBSSxVQUFVLEdBQUcsZ0VBQWdFLENBQUM7UUFDbEYsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDOUIsTUFBTSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBTWEsc0JBQVMsR0FBdkIsVUFBd0IsTUFBVztRQUMvQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBTWEsa0JBQUssR0FBbkIsVUFBb0IsR0FBVztRQUMzQixNQUFNLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQU1hLDJCQUFjLEdBQTVCLFVBQTZCLElBQVk7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDTCxtQkFBQztBQUFELENBaERBLEFBZ0RDLElBQUE7QUFoRFksb0JBQVksZUFnRHhCLENBQUEiLCJmaWxlIjoic3JjL2hlbHBlcnMvU3RyaW5nSGVscGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBWYXJpb3VzIHV0aWxpdHkgZnVuY3Rpb25zIHJlbGF0ZWQgdG8gc3RyaW5nc1xuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuLyoqXG4gKiBAY2xhc3MgQ29sbGVjdGlvbiBvZiBzdGF0aWMgbWV0aG9kcyBmb3IgY29tbW9uIG9wZXJhdGlvbnMgd2l0aCBzdHJpbmdzXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIFN0cmluZ0hlbHBlciB7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBhIHN0cmluZ1xuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaXNTdHJpbmcob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdzdHJpbmcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHJhbmRvbSBzdHJpbmcgb2YgdGhlIHNwZWNpZmllZCBsZW5ndGhcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbShsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGxldCBjaGFyYWN0ZXJzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoOyBpID4gMDsgLS1pKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzLmxlbmd0aCldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFzLWlzIGlmIHRoZSBvYmplY3QgaXMgYSBzdHJpbmcsIHN0cmluZ2lmeSBhcyBKU09OIG90aGVyd2lzZVxuICAgICAqIEBzaW5jZSAwLjIuMFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5naWZ5KG9iamVjdDogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKFN0cmluZ0hlbHBlci5pc1N0cmluZyhvYmplY3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgc3RyaW5nIGNvbnRhaW5zIGFueXRoaW5nXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBlbXB0eShzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyID09PSB1bmRlZmluZWQgfHwgc3RyID09PSBudWxsIHx8IHN0ciA9PT0gJyc7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tbnVsbC1rZXl3b3JkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBmaWxlIGV4dGVuc2lvbiBmcm9tIHRoZSBmaWxlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzdHJpcEV4dGVuc2lvbihwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuW14uXSokL2csICcnKTtcbiAgICB9XG59XG4iXX0=
