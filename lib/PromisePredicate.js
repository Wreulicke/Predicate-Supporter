"use strict";
var promisePredicate = function (predicate) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var result = predicate.apply(void 0, args);
        return typeof result === 'boolean' ?
            new Promise(function (resolve, reject) { return result ? resolve(args) : reject(args); })
            : new Promise(function (resolve, reject) { return result.then(function (flag) { return flag ? resolve(args) : reject(args); }, function () { return reject(args); }); });
    };
};
var AND = function (first) {
    var predicates = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        predicates[_i - 1] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return predicates.reduce(function (result, predicate) { return result.then(function () { return promisePredicate(predicate).apply(void 0, args); }); }, promisePredicate(first).apply(void 0, args));
    };
};
exports.AND = AND;
var OR = function (first) {
    var predicates = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        predicates[_i - 1] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return predicates.reduce(function (result, predicate) { return result.catch(function () { return promisePredicate(predicate).apply(void 0, args); }); }, promisePredicate(first).apply(void 0, args));
    };
};
exports.OR = OR;
var NOT = function (predicate) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return new Promise(function (resolve, reject) { return promisePredicate(predicate).apply(void 0, args).then(function () { return reject(args); }, function () { return resolve(args); }); });
}; };
exports.NOT = NOT;
var XOR = function (p1, p2) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return OR(AND(p1, NOT(p2)), AND(NOT(p1), p2)).apply(void 0, args);
}; };
exports.XOR = XOR;
var Predicte = function (predicate) {
    var IPredicate = promisePredicate(predicate);
    Object.defineProperty(IPredicate, 'AND', {
        value: function () {
            var predicates = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                predicates[_i - 0] = arguments[_i];
            }
            return Predicte(AND.apply(void 0, [IPredicate].concat(predicates)));
        }
    });
    Object.defineProperty(IPredicate, 'OR', {
        value: function () {
            var predicates = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                predicates[_i - 0] = arguments[_i];
            }
            return Predicte(OR.apply(void 0, [IPredicate].concat(predicates)));
        }
    });
    Object.defineProperty(IPredicate, 'NOT', {
        value: function () {
            return Predicte(NOT(IPredicate));
        }
    });
    Object.defineProperty(IPredicate, 'XOR', {
        value: function (predicate) {
            return Predicte(XOR(IPredicate, predicate));
        }
    });
    return IPredicate;
};
exports.Predicte = Predicte;
