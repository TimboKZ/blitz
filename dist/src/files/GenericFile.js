"use strict";
var fse = require('fs-extra');
var GenericFile = (function () {
    function GenericFile(path) {
        this._path = path;
    }
    GenericFile.prototype.read = function () {
        this._contents = fse.readFileSync(this._path, 'utf8');
    };
    GenericFile.prototype.write = function () {
        fse.writeFileSync(this._path, this._contents);
    };
    Object.defineProperty(GenericFile.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (value) {
            this._path = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GenericFile.prototype, "contents", {
        get: function () {
            return this._contents;
        },
        set: function (value) {
            this._contents = value;
        },
        enumerable: true,
        configurable: true
    });
    return GenericFile;
}());
exports.GenericFile = GenericFile;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlcy9HZW5lcmljRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsSUFBWSxHQUFHLFdBQU0sVUFBVSxDQUFDLENBQUE7QUFjaEM7SUFpQkkscUJBQVksSUFBWTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBTU0sMEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFNTSwyQkFBSyxHQUFaO1FBQ0ksR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsc0JBQVcsNkJBQUk7YUFBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUFhO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsaUNBQVE7YUFBbkI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO2FBRUQsVUFBb0IsS0FBYTtZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDOzs7T0FKQTtJQUtMLGtCQUFDO0FBQUQsQ0FwREEsQUFvREMsSUFBQTtBQXBEWSxtQkFBVyxjQW9EdkIsQ0FBQSIsImZpbGUiOiJzcmMvZmlsZXMvR2VuZXJpY0ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIENvbnRhaW5zIGFsbCBnZW5lcmljIEZpbGUgY2xhc3NlcyBhbmQgaW50ZXJmYWNlc1xuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMi4wXG4gKi9cblxuaW1wb3J0ICogYXMgZnNlIGZyb20gJ2ZzLWV4dHJhJztcblxuLyoqXG4gKiBTcGVjaWZpZXMgdGhhdCB0aGUgZmlsZSBpcyBhYmxlIHRvIHJlbG9hZCBpdHNlbGZcbiAqIEBzaW5jZSAwLjIuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIElSZWxvYWRhYmxlIHtcbiAgICByZWxvYWQ6ICgpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogQGNsYXNzIEEgY2xhc3MuXG4gKiBAc2luY2UgMC4yLjBcbiAqL1xuZXhwb3J0IGNsYXNzIEdlbmVyaWNGaWxlIHtcbiAgICAvKipcbiAgICAgKiBGdWxsIHBhdGggdG8gdGhlIGZpbGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29udGVudHMgb2YgdGhlIGZpbGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9jb250ZW50czogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2VuZXJpY0ZpbGUgY29uc3RydWN0b3JcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGF0aCA9IHBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVhZHMgZmlsZSBzeXN0ZW0gdG8gZXh0cmFjdCB0aGUgY29udGVudHMgb2YgdGhlIGZpbGVcbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVhZCgpIHtcbiAgICAgICAgdGhpcy5fY29udGVudHMgPSBmc2UucmVhZEZpbGVTeW5jKHRoaXMuX3BhdGgsICd1dGY4Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgZmlsZSB0byB0aGUgZmlsZSBzeXN0ZW1cbiAgICAgKiBAc2luY2UgMC4yLjBcbiAgICAgKi9cbiAgICBwdWJsaWMgd3JpdGUoKSB7XG4gICAgICAgIGZzZS53cml0ZUZpbGVTeW5jKHRoaXMuX3BhdGgsIHRoaXMuX2NvbnRlbnRzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBwYXRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fcGF0aCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY29udGVudHMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgY29udGVudHModmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9jb250ZW50cyA9IHZhbHVlO1xuICAgIH1cbn1cbiJdfQ==
