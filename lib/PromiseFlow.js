"use strict";
function promisify(item) {
    if (item instanceof Promise)
        return item;
    return Promise.resolve(item);
}
var pipe = Function.prototype.call.bind(Promise.prototype.then);
function flow(item) {
    var funcs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        funcs[_i - 1] = arguments[_i];
    }
    return funcs.reduce(pipe, promisify(item));
}
exports.flow = flow;
