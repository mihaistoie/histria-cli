
/// <reference path="../../typings/index.d.ts" />

var
    _copyArray = function (src: any[], recursive: boolean): any[] {
        let res = new Array(src.length);
        src.forEach(function (item, index) {
            if (recursive && Array.isArray(item)) {
                res[index] = _copyArray(item, true);
            } else if (recursive && typeof item === 'object') {
                res[index] = _copyObject(null, item, true);
            } else
                res[index] = item;
        });
        return res;
    },
    _copyObject = function (dst: any, src: any, recursive: boolean): any {
        let res = dst || {};
        Object.keys(src).forEach(function (pn) {
            let item = src[pn];
            if (recursive && Array.isArray(item)) {
                res[pn] = _copyArray(item, true);
            } else if (recursive && typeof item === 'object') {
                res[pn] = _copyObject(null, item, true);
            } else
                res[pn] = item;
        });
        return res;
    },
    _extend = function (dst: any, src: any, recursive: boolean): any {
        if (!src) return dst;
        if (Array.isArray(src)) {
            return _copyArray(src, recursive);
        } else if (typeof src === 'object') {
            return _copyObject(dst, src, recursive);
        } else
            return dst;
    },
    _formatByPosition = function (...args: any[]): string {
        let arg0 = args[0] + '';
        return arg0.replace(/{(\d+)}/g, function (match, num) {
            num = parseInt(num, 10);
            return args[num + 1];
        });
    },
    _formatByName = function (value: string, params: any): string {
        return value.replace(/{(.*)}/g, function (match, val) {
            return params[val] || '';
        });
    },
    _createPromise = function (resolve: (value?: any | Thenable<any>) => void, reject: (error?: any) => void): Promise<any> {
        let win: any = <any>window;
        let p: any = (win.Promise ? win.Promise : (win.ES6Promise ? win.ES6Promise.Promise : null));
        return <Promise<any>>new p(resolve, reject);
    },
    _p8 = function (addSeparator: boolean): string {
        var p = (Math.random().toString(16) + '000000000').substr(2, 8);
        return addSeparator ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
    },
    _genUuid = function (): string {
        return _p8(false) + _p8(true) + _p8(true) + _p8(false);
    },
    _createID = function (): string {
        return 'H' + _p8(false) + _p8(false) + _p8(false) + _p8(false);
    },
    _eq = function (o1: any, o2: any): boolean {
        if (o1 !== o2) {
            if (Array.isArray(o1)) {
                if (!Array.isArray(o2)) return false;
                return _arrayEquals(o1, o2);
            } else if (typeof o1 === 'object') {
                if (typeof o2 !== 'object') return false;
                return _objectsEquals(o1, o2);
            } else
                return false;
        }
        return true;
    },
    _objectsEquals = function (ia1: any, ia2: any): boolean {
        let la1 = Object.keys(ia1), la2 = Object.keys(ia2);
        if (la1.length !== la2.length) return false;
        for (let i = 0, len = la1.length; i < len; i++) {
            let p = la1[i];
            if (la2[i] !== p) return false;
            if (!_eq(ia1[p], ia1[p])) return false;
        }
        return true;
    },
    _arrayEquals = function (a1: any[], a2: any[]): boolean {
        if (a1.length !== a2.length) return false;
        for (let i = 0, len = a1.length; i < len; i++) {
            if (!_eq(a1[i], a2[i])) return false;
        }
        return true;
    },
    _equals = function (o1: any, o2: any): boolean {
        if (o1 === o2) return true;
        if (!o1 || !o2) return false;
        return _eq(o1, o2);

    };

export var createPromise = _createPromise;
export var extend = _extend;
export var uuid = _genUuid;
export var allocId = _createID;
export var equals = _equals;



