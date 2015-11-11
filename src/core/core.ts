/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
namespace Phoenix {
    export module utils {
        var
            _copyArray = function(ss: any[], recursive): any[] {
                let res = new Array(ss.length);
                ss.forEach(function(item, index) {
                    if (recursive && Array.isArray(item)) {
                        res[index] = _copyArray(item, true);
                    } else if (recursive && typeof item === 'object') {
                        res[index] = _copyObject(item, true);
                    } else
                        res[index] = item;
                });
                return res;
            },
            _copyObject = function(src: any, recursive): any {
                let res = {};
                Object.keys(src).forEach(function(pn) {
                    let item = src[pn];
                    if (recursive && Array.isArray(item)) {
                        res[pn] = _copyArray(item, true);
                    } else if (recursive && typeof item === 'object') {
                        res[pn] = _copyObject(item, true);
                    } else
                        res[pn] = item;
                });
                return res;
            },
            _extend = function(dst: any, src: any, recursive?: boolean): any {
                if (!src) return src;
                if (Array.isArray(src)) {
                    return _copyArray(src, recursive);
                } else if (typeof src === 'object') {
                    return _copyObject(src, recursive);
                } else
                    return src;
            },
            _formatByPosition = function(...args: any[]): string {
                let arg0 = args[0] + '';
                return arg0.replace(/{(\d+)}/g, function(match, num) {
                    num = parseInt(num, 10);
                    return args[num + 1];
                });
            },
            _formatByName = function(value: string, params: any): string {
                return value.replace(/{(.*)}/g, function(match, val) {
                    return params[val] || '';
                });
            },
            _createPromise = function(resolve: (value?: any | Thenable<any>) => void, reject: (error?: any) => void): Promise<any> {
                let p: any = (window['Promise'] ? window['Promise'] : (window['ES6Promise'] ? window['ES6Promise'].Promise : null));
                return <Promise<any>>new p(resolve, reject);
            },
            _p8 = function(addSeparator: boolean): string {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return addSeparator ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            },
            _genUuid = function(): string {
                return _p8(false) + _p8(true) + _p8(true) + _p8(false);
            },
            _createID = function(): string {
                return "H" + _p8(false) + _p8(false) + _p8(false) + _p8(false);
            };
        export var createPromise = _createPromise;
        export var extend = _extend;
        export var uuid = _genUuid;
        export var allocId = _createID;

    }
}