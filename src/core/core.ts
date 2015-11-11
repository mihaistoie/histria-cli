/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
namespace Phoenix {
    export module utils {
        var
            _createPromise = function(resolve: (value?: any | Thenable<any>) => void, reject: (error?: any) => void): Promise<any> {
                let p: any = (window['Promise'] ? window['Promise'] : (window['ES6Promise'] ? window['ES6Promise'].Promise : null));
                return <Promise<any>>new p(resolve, reject);
            },
            _p8 = function(addSeparator: boolean): string {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return addSeparator ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            },
            _createID = function(): string {
                return "I" + _p8(false) + _p8(false) + _p8(false) + _p8(false);
            },
            _genUuid = function(): string {
                return _p8(false) + _p8(true) + _p8(true) + _p8(false);
            },
            _extend = function(dst: any, src: any, recursive?: boolean): any {
                Object.keys(src).forEach(function(pn) {
                    dst[pn] = src[pn];
                });
                return dst;
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
            };
        export var createPromise = _createPromise;

    }
}