"use strict";
var yaml = require('js-yaml');
var marked = require('marked');
var fs = require('fs');
var path = require('path');
var colors = require('colors');
var Util = (function () {
    function Util() {
    }
    Util.getPackageInfo = function () {
        if (this.packageInfoCache === undefined) {
            this.packageInfoCache = require('../../package.json');
        }
        return this.packageInfoCache;
    };
    Util.logWithPrefix = function (prefix, object) {
        console.log(prefix + ' ' + object.toString());
    };
    Util.log = function (object) {
        Util.logWithPrefix(colors.cyan('[Blitz LOG]'), object);
    };
    Util.warn = function (object) {
        Util.logWithPrefix(colors.yellow('[Blitz WRN]'), object);
    };
    Util.error = function (object) {
        Util.logWithPrefix(colors.red('[Blitz ERR]'), object);
    };
    Util.stackTrace = function (object) {
        console.log(object);
    };
    Util.debug = function (object) {
        if (global.debug) {
            Util.logWithPrefix(colors.yellow('[Blitz DEBUG]'), object);
        }
    };
    Util.parseYaml = function (yamlString) {
        Util.debug('Parsing  YAML...');
        yamlString = yamlString.replace(/^\s+|\s+$/g, '');
        if (yamlString === '') {
            return {};
        }
        return yaml.safeLoad(yamlString);
    };
    Util.parseMarkdown = function (markdown) {
        return marked(markdown);
    };
    Util.pathExists = function (path) {
        try {
            fs.accessSync(path);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    Util.writeFileFromArray = function (basePath, array, contents) {
        if (array.length === 0) {
            Util.error('Cannot write file from an empty array!');
            console.trace();
            return false;
        }
        var currentPath = basePath;
        var count = array.length;
        for (var i = 0; i < count - 1; i++) {
            currentPath = path.join(currentPath, array[i]);
            if (!Util.createDirectory(currentPath)) {
                return false;
            }
        }
        try {
            fs.writeFileSync(path.join(currentPath, array[count - 1]), contents);
        }
        catch (e) {
            Util.error('Error writing to `' + basePath + '`!');
            Util.stackTrace(e);
            return false;
        }
        return true;
    };
    Util.getFileContents = function (filePath) {
        Util.debug('Reading contents of `' + filePath + '`...');
        return fs.readFileSync(filePath, 'utf8');
    };
    Util.createDirectory = function (directoryPath) {
        try {
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath);
            }
            return true;
        }
        catch (e) {
            Util.error('Error creating directory `' + directoryPath + '`.');
            Util.stackTrace(e);
            return false;
        }
    };
    Util.removeDirectory = function (directoryPath) {
        var files = [];
        try {
            if (fs.existsSync(directoryPath)) {
                files = fs.readdirSync(directoryPath);
                files.forEach(function (file) {
                    var currentPath = path.join(directoryPath, file);
                    if (fs.lstatSync(currentPath).isDirectory()) {
                        Util.removeDirectory(currentPath);
                    }
                    else {
                        fs.unlinkSync(currentPath);
                    }
                });
                fs.rmdirSync(directoryPath);
            }
        }
        catch (e) {
            Util.error('Could not recursively remove a directory!');
            Util.stackTrace(e);
            return false;
        }
        return true;
    };
    Util.stripSlashes = function (stringWithSlashes) {
        stringWithSlashes = stringWithSlashes.replace(new RegExp('^/*'), '');
        stringWithSlashes = stringWithSlashes.replace(new RegExp('/*$'), '');
        return stringWithSlashes;
    };
    Util.getUriComponents = function (uri) {
        var strippedUri = Util.stripSlashes(uri);
        var components = strippedUri.split('/');
        if (components[0] === '') {
            return [];
        }
        return components;
    };
    Util.extractFileName = function (filePath) {
        return path.basename(filePath).replace(/\.[^/.]+$/, '');
    };
    Util.generateRandomString = function (length) {
        var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) {
            result += characters[Math.floor(Math.random() * characters.length)];
        }
        return result;
    };
    Util.isEmpty = function (object) {
        return Object.keys(object).length === 0;
    };
    Util.isString = function (object) {
        return typeof object === 'string';
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBTWEsb0JBQWUsR0FBN0IsVUFBOEIsUUFBZ0I7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBTWEseUJBQW9CLEdBQWxDLFVBQW1DLE1BQWM7UUFDN0MsSUFBSSxVQUFVLEdBQUcsZ0VBQWdFLENBQUM7UUFDbEYsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDOUIsTUFBTSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBTWEsWUFBTyxHQUFyQixVQUFzQixNQUFXO1FBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQU1hLGFBQVEsR0FBdEIsVUFBdUIsTUFBVztRQUM5QixNQUFNLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0E3UEEsQUE2UEMsSUFBQTtBQTdQWSxZQUFJLE9BNlBoQixDQUFBIiwiZmlsZSI6InNyYy9VdGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBVdGlsaXR5IGNsYXNzZXMgYW5kIGludGVyZmFjZXMgZm9yIEJsaXR6LlxuICogQGF1dGhvciBUaW11ciBLdXpoYWdhbGl5ZXYgPHRpbS5rdXpoQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNlxuICogQGxpY2Vuc2UgR1BMLTMuMFxuICogQHNpbmNlIDAuMC4xXG4gKi9cblxuaW1wb3J0ICogYXMgeWFtbCBmcm9tICdqcy15YW1sJztcbmltcG9ydCAqIGFzIG1hcmtlZCBmcm9tICdtYXJrZWQnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGNvbG9ycyBmcm9tICdjb2xvcnMnO1xuXG4vKipcbiAqIEBjbGFzcyBVdGlsaXR5IGNsYXNzIGZvciBCbGl0ei5cbiAqIEBzaW5jZSAwLjAuMVxuICovXG5leHBvcnQgY2xhc3MgVXRpbCB7XG4gICAgLyoqXG4gICAgICogQ2FjaGUgZm9yIHBhY2thZ2UgaW5mb1xuICAgICAqIEBzaW5jZSAwLjEuM1xuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHBhY2thZ2VJbmZvQ2FjaGU6IGFueTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcGFja2FnZSBpbmZvIGZyb20gYHBhY2thZ2UuanNvbmBcbiAgICAgKiBAc2luY2UgMC4xLjNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFBhY2thZ2VJbmZvKCkge1xuICAgICAgICBpZiAodGhpcy5wYWNrYWdlSW5mb0NhY2hlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFja2FnZUluZm9DYWNoZSA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBhY2thZ2VJbmZvQ2FjaGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBhbiBvYmplY3QgdG8gY29uc29sZSBwcmVmaXhpbmcgaXQgd2l0aCB0aGUgc3BlY2lmaWVkIHN0cmluZy5cbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgTG9nZ2VyLmxvZ1dpdGhQcmVmaXgoKSBpbnN0ZWFkXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBsb2dXaXRoUHJlZml4KHByZWZpeDogc3RyaW5nLCBvYmplY3Q6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhwcmVmaXggKyAnICcgKyBvYmplY3QudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9ncyBkYXRhIGludG8gY29uc29sZVxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBMb2dnZXIubG9nKCkgaW5zdGVhZFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbG9nKG9iamVjdDogYW55KSB7XG4gICAgICAgIFV0aWwubG9nV2l0aFByZWZpeChjb2xvcnMuY3lhbignW0JsaXR6IExPR10nKSwgb2JqZWN0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dzIGEgd2FybmluZyBpbnRvIGNvbnNvbGVcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgTG9nZ2VyLndhcm4oKSBpbnN0ZWFkXG4gICAgICogQHNpbmNlIDAuMS4zXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB3YXJuKG9iamVjdDogYW55KSB7XG4gICAgICAgIFV0aWwubG9nV2l0aFByZWZpeChjb2xvcnMueWVsbG93KCdbQmxpdHogV1JOXScpLCBvYmplY3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgZXJyb3IgZGF0YSBpbnRvIGNvbnNvbGVcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgTG9nZ2VyLmVycm9yKCkgaW5zdGVhZFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZXJyb3Iob2JqZWN0OiBhbnkpIHtcbiAgICAgICAgVXRpbC5sb2dXaXRoUHJlZml4KGNvbG9ycy5yZWQoJ1tCbGl0eiBFUlJdJyksIG9iamVjdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJpbnQgb3V0IHRoZSBlcnJvciBhcyBpc1xuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc3RhY2tUcmFjZShvYmplY3Q6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ3MgZGVidWcgZGF0YSBpbnRvIGNvbnNvbGVcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgTG9nZ2VyLmRlYnVnKCkgaW5zdGVhZFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGVidWcob2JqZWN0OiBhbnkpIHtcbiAgICAgICAgaWYgKGdsb2JhbC5kZWJ1Zykge1xuICAgICAgICAgICAgVXRpbC5sb2dXaXRoUHJlZml4KGNvbG9ycy55ZWxsb3coJ1tCbGl0eiBERUJVR10nKSwgb2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2R1Y2VzIGFuIG9iamVjdCBmcm9tIFlBTUwgc3RyaW5nIGlmIHBvc3NpYmxlLCByZXR1cm5zIHVuZGVmaW5lZCBvdGhlcndpc2UuXG4gICAgICogQHNpbmNlIDAuMS4yIFJldHVybnMgZW1wdHkgb2JqZWN0IGZvciBmaWxlcyB0aGF0IG9ubHkgaGF2ZSB3aGl0ZXNwYWNlXG4gICAgICogQHNpbmNlIDAuMS4yIFJlbW92ZWQgdHJ5L2NhdGNoIGJsb2NrXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZVlhbWwoeWFtbFN0cmluZzogc3RyaW5nKTogYW55IHtcbiAgICAgICAgVXRpbC5kZWJ1ZygnUGFyc2luZyAgWUFNTC4uLicpO1xuICAgICAgICB5YW1sU3RyaW5nID0geWFtbFN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgICAgIGlmICh5YW1sU3RyaW5nID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB5YW1sLnNhZmVMb2FkKHlhbWxTdHJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIE1hcmtkb3duIGludG8gSFRNTFxuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2VNYXJrZG93bihtYXJrZG93bjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG1hcmtlZChtYXJrZG93bik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRoYXQgYSBkaXJlY3Rvcnkgb3IgYSBmaWxlIGV4aXN0c1xuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcGF0aEV4aXN0cyhwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCBtb2RlIHRvIGBhY2Nlc3NTeW5jKClgXG4gICAgICAgICAgICBmcy5hY2Nlc3NTeW5jKHBhdGgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgZm9sZGVycyB3aXRoIG5hbWVzIGlkZW50aWNhbCB0byB0aGF0IGluIHRoZSBhcnJheSwgYW5kIHVzZXMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgYXJyYXkgYXMgdGhlIGZpbGVcbiAgICAgKiBuYW1lIHRvIHdoaWNoIHRoZSBjb250ZW50cyB3aWxsIGJlIHdyaXR0ZW4uXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB3cml0ZUZpbGVGcm9tQXJyYXkoYmFzZVBhdGg6IHN0cmluZywgYXJyYXk6IHN0cmluZ1tdLCBjb250ZW50czogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChhcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0Nhbm5vdCB3cml0ZSBmaWxlIGZyb20gYW4gZW1wdHkgYXJyYXkhJyk7XG4gICAgICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1cnJlbnRQYXRoID0gYmFzZVBhdGg7XG4gICAgICAgIGxldCBjb3VudCA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudCAtIDE7IGkrKykge1xuICAgICAgICAgICAgY3VycmVudFBhdGggPSBwYXRoLmpvaW4oY3VycmVudFBhdGgsIGFycmF5W2ldKTtcbiAgICAgICAgICAgIGlmICghVXRpbC5jcmVhdGVEaXJlY3RvcnkoY3VycmVudFBhdGgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGguam9pbihjdXJyZW50UGF0aCwgYXJyYXlbY291bnQgLSAxXSksIGNvbnRlbnRzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcignRXJyb3Igd3JpdGluZyB0byBgJyArIGJhc2VQYXRoICsgJ2AhJyk7XG4gICAgICAgICAgICBVdGlsLnN0YWNrVHJhY2UoZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgZmlsZSBmcm9tIHRoZSBzcGVjaWZpZWQgcGF0aCBpZiBwb3NzaWJsZSwgcmV0dXJucyB1bmRlZmluZWQgb3RoZXJ3aXNlXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBmcy5yZWFkRmlsZVN5bmMoKWAgZGlyZWN0bHlcbiAgICAgKiBAc2luY2UgMC4xLjIgUmVtb3ZlZCB0cnkvY2F0Y2ggYmxvY2tcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEZpbGVDb250ZW50cyhmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgVXRpbC5kZWJ1ZygnUmVhZGluZyBjb250ZW50cyBvZiBgJyArIGZpbGVQYXRoICsgJ2AuLi4nKTtcbiAgICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGlyZWN0b3J5IGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXJlY3RvcnlQYXRoKSkge1xuICAgICAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkaXJlY3RvcnlQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBVdGlsLmVycm9yKCdFcnJvciBjcmVhdGluZyBkaXJlY3RvcnkgYCcgKyBkaXJlY3RvcnlQYXRoICsgJ2AuJyk7XG4gICAgICAgICAgICBVdGlsLnN0YWNrVHJhY2UoZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSByZW1vdmVzIGEgZGlyZWN0b3J5IGlmIGl0IGV4aXN0c1xuICAgICAqIEBzaW5jZSAwLjAuMVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZmlsZXMgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGRpcmVjdG9yeVBhdGgpKSB7XG4gICAgICAgICAgICAgICAgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhkaXJlY3RvcnlQYXRoKTtcbiAgICAgICAgICAgICAgICBmaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UGF0aCA9IHBhdGguam9pbihkaXJlY3RvcnlQYXRoLCBmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZzLmxzdGF0U3luYyhjdXJyZW50UGF0aCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC5yZW1vdmVEaXJlY3RvcnkoY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnMudW5saW5rU3luYyhjdXJyZW50UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmcy5ybWRpclN5bmMoZGlyZWN0b3J5UGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0NvdWxkIG5vdCByZWN1cnNpdmVseSByZW1vdmUgYSBkaXJlY3RvcnkhJyk7XG4gICAgICAgICAgICBVdGlsLnN0YWNrVHJhY2UoZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgY29uc2VxdWVudCBsZWFkaW5nIGFuZCB0cmFpbGluZyBmb3J3YXJkIHNsYXNoZXNcbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN0cmlwU2xhc2hlcyhzdHJpbmdXaXRoU2xhc2hlczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgc3RyaW5nV2l0aFNsYXNoZXMgPSBzdHJpbmdXaXRoU2xhc2hlcy5yZXBsYWNlKG5ldyBSZWdFeHAoJ14vKicpLCAnJyk7XG4gICAgICAgIHN0cmluZ1dpdGhTbGFzaGVzID0gc3RyaW5nV2l0aFNsYXNoZXMucmVwbGFjZShuZXcgUmVnRXhwKCcvKiQnKSwgJycpO1xuICAgICAgICByZXR1cm4gc3RyaW5nV2l0aFNsYXNoZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnJlYWtzIGEgVVJJIGRvd24gaW50byBjb21wb25lbnRzXG4gICAgICogQHNpbmNlIDAuMC4xXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRVcmlDb21wb25lbnRzKHVyaTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBsZXQgc3RyaXBwZWRVcmkgPSBVdGlsLnN0cmlwU2xhc2hlcyh1cmkpO1xuICAgICAgICBsZXQgY29tcG9uZW50cyA9IHN0cmlwcGVkVXJpLnNwbGl0KCcvJyk7XG4gICAgICAgIGlmIChjb21wb25lbnRzWzBdID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dHJhY3RzIHRoZSBmaWxlbmFtZSBmcm9tIHBhdGgsIHJlbW92aW5nIHRoZSBleHRlbnNpb25cbiAgICAgKiBAc2luY2UgMC4wLjFcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGV4dHJhY3RGaWxlTmFtZShmaWxlUGF0aDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmJhc2VuYW1lKGZpbGVQYXRoKS5yZXBsYWNlKC9cXC5bXi8uXSskLywgJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHNpbmNlIDAuMS4wXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZW5lcmF0ZVJhbmRvbVN0cmluZyhsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGxldCBjaGFyYWN0ZXJzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoOyBpID4gMDsgLS1pKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzLmxlbmd0aCldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGFuIG9iamVjdCBpcyBlbXB0eSwgaS5lLiBpcyBge31gXG4gICAgICogQHNpbmNlIDAuMS40XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc0VtcHR5KG9iamVjdDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGlmIG9iamVjdCBpcyBhIHN0cmluZyBhbmQgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICogQHNpbmNlIDAuMi4wXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBpc1N0cmluZyhvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZyc7XG4gICAgfVxufVxuIl19
