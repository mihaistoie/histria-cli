/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
var Phoenix;
(function (Phoenix) {
    var utils;
    (function (utils) {
        var _createPromise = function (resolve, reject) {
            var p = (window['Promise'] ? window['Promise'] : (window['ES6Promise'] ? window['ES6Promise'].Promise : null));
            return new p(resolve, reject);
        }, _p8 = function (addSeparator) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return addSeparator ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }, _createID = function () {
            return "I" + _p8(false) + _p8(false) + _p8(false) + _p8(false);
        }, _genUuid = function () {
            return _p8(false) + _p8(true) + _p8(true) + _p8(false);
        }, _extend = function (dst, src, recursive) {
            Object.keys(src).forEach(function (pn) {
                dst[pn] = src[pn];
            });
            return dst;
        }, _formatByPosition = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var arg0 = args[0] + '';
            return arg0.replace(/{(\d+)}/g, function (match, num) {
                num = parseInt(num, 10);
                return args[num + 1];
            });
        }, _formatByName = function (value, params) {
            return value.replace(/{(.*)}/g, function (match, val) {
                return params[val] || '';
            });
        };
        utils.createPromise = _createPromise;
    })(utils = Phoenix.utils || (Phoenix.utils = {}));
})(Phoenix || (Phoenix = {}));
