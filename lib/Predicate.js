"use strict";
var AND = function () {
    var predicates = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        predicates[_i - 0] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return predicates.every(function (predicate) { return predicate.apply(void 0, args); });
    };
};
exports.AND = AND;
var OR = function () {
    var predicates = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        predicates[_i - 0] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return predicates.some(function (predicate) { return predicate.apply(void 0, args); });
    };
};
exports.OR = OR;
var NOT = function (predicate) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return !predicate.apply(void 0, args);
}; };
exports.NOT = NOT;
var EVERY = AND;
exports.EVERY = EVERY;
var SOME = OR;
exports.SOME = SOME;
var ANY = OR;
exports.ANY = ANY;
var XOR = function (p1, p2) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return p1.apply(void 0, args) && !p2.apply(void 0, args) || !p1.apply(void 0, args) && p2.apply(void 0, args);
}; };
exports.XOR = XOR;
function wrappedPredicate(predicate) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return predicate.apply(void 0, args);
    };
}
var Predicate = function (predicate) {
    var IPredicate = wrappedPredicate(predicate);
    Object.defineProperty(IPredicate, 'AND', {
        value: function () {
            var predicates = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                predicates[_i - 0] = arguments[_i];
            }
            return Predicate(AND.apply(void 0, [IPredicate].concat(predicates)));
        }
    });
    Object.defineProperty(IPredicate, 'OR', {
        value: function () {
            var predicates = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                predicates[_i - 0] = arguments[_i];
            }
            return Predicate(OR.apply(void 0, [IPredicate].concat(predicates)));
        }
    });
    Object.defineProperty(IPredicate, 'NOT', {
        value: function () {
            return Predicate(NOT(IPredicate));
        }
    });
    Object.defineProperty(IPredicate, 'XOR', {
        value: function (predicate) {
            return Predicate(XOR(IPredicate, predicate));
        }
    });
    return IPredicate;
};
exports.Predicate = Predicate;
