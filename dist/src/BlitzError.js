var BlitzError = (function () {
    function BlitzError(message, extra) {
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
        this.extra = extra;
    }
    return BlitzError;
}());
