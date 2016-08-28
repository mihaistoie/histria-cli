/*!
 * Copyright 2016-2017, Mihai STOIE.
 * All rights reserved.
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @providesModule Histria Client Framework
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Histria"] = factory();
	else
		root["Histria"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	/// <reference path="../../typings/index.d.ts" />
	"use strict";
	var _copyArray = function (src, recursive) {
	    var res = new Array(src.length);
	    src.forEach(function (item, index) {
	        if (recursive && Array.isArray(item)) {
	            res[index] = _copyArray(item, true);
	        }
	        else if (recursive && typeof item === 'object') {
	            res[index] = _copyObject(null, item, true);
	        }
	        else
	            res[index] = item;
	    });
	    return res;
	}, _copyObject = function (dst, src, recursive) {
	    var res = dst || {};
	    Object.keys(src).forEach(function (pn) {
	        var item = src[pn];
	        if (recursive && Array.isArray(item)) {
	            res[pn] = _copyArray(item, true);
	        }
	        else if (recursive && typeof item === 'object') {
	            res[pn] = _copyObject(null, item, true);
	        }
	        else
	            res[pn] = item;
	    });
	    return res;
	}, _extend = function (dst, src, recursive) {
	    if (!src)
	        return dst;
	    if (Array.isArray(src)) {
	        return _copyArray(src, recursive);
	    }
	    else if (typeof src === 'object') {
	        return _copyObject(dst, src, recursive);
	    }
	    else
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
	}, _createPromise = function (resolve, reject) {
	    var win = window;
	    var p = (win.Promise ? win.Promise : (win.ES6Promise ? win.ES6Promise.Promise : null));
	    return new p(resolve, reject);
	}, _p8 = function (addSeparator) {
	    var p = (Math.random().toString(16) + '000000000').substr(2, 8);
	    return addSeparator ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
	}, _genUuid = function () {
	    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
	}, _createID = function () {
	    return 'H' + _p8(false) + _p8(false) + _p8(false) + _p8(false);
	}, _eq = function (o1, o2) {
	    if (o1 !== o2) {
	        if (Array.isArray(o1)) {
	            if (!Array.isArray(o2))
	                return false;
	            return _arrayEquals(o1, o2);
	        }
	        else if (typeof o1 === 'object') {
	            if (typeof o2 !== 'object')
	                return false;
	            return _objectsEquals(o1, o2);
	        }
	        else
	            return false;
	    }
	    return true;
	}, _objectsEquals = function (ia1, ia2) {
	    var la1 = Object.keys(ia1), la2 = Object.keys(ia2);
	    if (la1.length !== la2.length)
	        return false;
	    for (var i = 0, len = la1.length; i < len; i++) {
	        var p = la1[i];
	        if (la2[i] !== p)
	            return false;
	        if (!_eq(ia1[p], ia1[p]))
	            return false;
	    }
	    return true;
	}, _arrayEquals = function (a1, a2) {
	    if (a1.length !== a2.length)
	        return false;
	    for (var i = 0, len = a1.length; i < len; i++) {
	        if (!_eq(a1[i], a2[i]))
	            return false;
	    }
	    return true;
	}, _equals = function (o1, o2) {
	    if (o1 === o2)
	        return true;
	    if (!o1 || !o2)
	        return false;
	    return _eq(o1, o2);
	};
	exports.createPromise = _createPromise;
	exports.extend = _extend;
	exports.uuid = _genUuid;
	exports.allocId = _createID;
	exports.equals = _equals;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utilsLib = __webpack_require__(1);
	var modelLib = __webpack_require__(3);
	exports.utils = utilsLib;
	exports.model = modelLib;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var BaseModel = (function () {
	    function BaseModel() {
	    }
	    BaseModel.prototype.getFullPath = function () {
	        var that = this;
	        if (that._cachePath)
	            return that._cachePath;
	        var segments = [];
	        var parent = that;
	        while (parent && parent._propertyName) {
	            segments.unshift(parent._propertyName);
	            parent = parent._owner;
	        }
	        that._cachePath = segments.join('.');
	        return that._cachePath;
	    };
	    BaseModel.prototype.isArray = function () { return false; };
	    Object.defineProperty(BaseModel.prototype, "owner", {
	        get: function () {
	            return this._owner;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BaseModel.prototype.addErrors = function (alerts, add) {
	    };
	    BaseModel.prototype.fireMetaDataChanged = function (propertyName, params) {
	        var that = this, parent = that.owner;
	        if (that.frozen)
	            return;
	        if (parent) {
	            var pn = that._propertyName + (propertyName ? ('.' + propertyName) : '');
	            if (parent.isArray()) {
	                params = params || {};
	                params[that.getFullPath()] = that.uuid;
	            }
	            that.owner.fireMetaDataChanged(pn, params);
	        }
	        else {
	            if (that.onStateChange)
	                that.onStateChange(propertyName, params);
	        }
	    };
	    return BaseModel;
	}());
	exports.BaseModel = BaseModel;
	/*
	        export class Model extends BaseModel {
	            private _addMeta: boolean;
	            private _actions: any;
	            private _meta: any;
	            private _model: any;
	            private _associations: any;
	            private _objectMeta: MetaProperty;
	            private _schema: any;
	            public IsObject: boolean = true;

	            constructor(owner: any, propertyName: string, schema: any, value) {
	                let that = this;
	                that._owner = owner;
	                that._propertyName = propertyName;
	                that._schema = schema;
	                // take the object state from parent
	                that._metaInParent = that._owner && that._owner.isObject;

	                if (that._metaInParent) {
	                    that._objectMeta = that._owner.$[propertyName];
	                } else {
	                    //	that._objectMeta = new value = that._checkValue(value)
	 
	                }
	            }
	            private _checkValue(value: any): any {
	                let that = this;
	                that.isNull = value === null;
	                that.isUndefined = value === undefined;
	                value = value || {};
	                value.$ = value.$ || {};
	                return value;
	            }

	            destroy() {
	                let that = this;
	                if (!that._metaInParent) {
	                    if (that._objectMeta) {
	                        that._objectMeta.destroy();
	                    }
	                }
	                that._objectMeta = null;
	                that._owner = null;

	            }
	            public get $(): any {
	                return this._meta;
	            }
	            public get $actions(): any {
	                return this._actions;
	            }

	            private _freeze(cb: () => void) {
	                let that = this;
	                let ofv = that.frozen;
	                that.frozen = true;
	                try {
	                    cb();
	                } finally {
	                    that.frozen = ofv;
	                }
	            }
	            private _initFromSchema(schema) {
	                let that = this;
	                if (!that._model) return;
	                let states = (schema.states ? _utils.extend(null, schema.states) : null),
	                    links = (schema.links ? $.extend(true, {}, schema.links) : null),
	                    errors = (schema.errors ? $.extend(true, {}, schema.errors) : null);
	                _schema.enumProperties(that._schema, function(propertyName, item, isObject, isArray) {
	                    _createProp(that, propertyName);
	                    _createStateProp(that, propertyName, states ? states[propertyName] : null);
	                    _createErrorProp(that, propertyName, errors ? errors[propertyName] : null);
	                });
	                if (schema.links) {
	                    Object.keys(schema.links).forEach((name) => { _createStateLinks(that, name, links ? links[name] : null); });
	                }
	                // root error
	                if (!that._owner) {
	                    that.$errors.$ = new _observable.Errors(that, '$', [], false);
	                }
	            }

	            private _init(value: any) {
	                let that = this;
	                that.isNullOrUndefined = value === null || value === undefined;
	                value = value || {};
	                value.$ = value.$ || {};

	                if (that._addMeta) {
	                    if (that.isNullOrUndefined)
	                        if (that._meta) that._meta.destroy();
	                    that._meta = new MetaProperty(that, that._propertyName, value.$);
	                }
	                _schema.enumProperties(that._schema, function(propertyName, item, isObject, isArray) {
	                    let val = value[propertyName];
	                    if (isArray && !val) {
	                        val = [];
	                        value[propertyName] = val;
	                    }
	                    if (isObject) {

	                    } else if (isArray) {

	                    }

	                });
	                that._model = value;

	            }
	            /*
	                        _setModel(value, frozen) {
	                            let that = this;
	                            let ofv = that.frozen;
	                            if (frozen) that.frozen = true;
	                            that.isNull = value === null;
	                            that.isUndefined = value === undefined;
	                            value = value || {};
	                            value.$states = value.$states || {};
	                            value.$links = value.$links || {};
	                            value.$errors = value.$errors || {};
	                            let props = Object.keys(that._schema.properties);
	                            
	                            //for each property set value && state
	                            props.forEach(function(name) {
	                                let si = that._schema.properties[name];
	                                if (!_su.inModel(si)) return;
	                                let val = value[name];
	                                if (!val && _su.isCompositionList(si)) {
	                                    val = [];
	                                    value[name] = val
	                                }
	                                that[name] = val;
	                                if (value.$states && value.$states[name]) {
	                                    let ss = value.$states[name];
	                                    Object.keys(ss).forEach((sn) => { that.$states[name][sn] = ss[sn]; });
	                                }
	                                value.$states[name] = that.$states[name].state();
	            
	                                if (value.$errors && value.$errors[name]) {
	                                    let errors = value.$errors[name];
	                                    let ne = [];
	                                    errors.forEach((err) => { ne.push(err) });
	                                    that.$errors[name].addErrors(ne);
	                                }
	                                value.$errors[name] = that.$errors[name].errors();
	            
	                            });
	                            //for each link set state
	                            if (that._model.$links) {
	                                props = Object.keys(that._schema.links || {})
	                                props.forEach(function(name) {
	                                    let ss = that._model.$links[name];
	                                    if (ss) {
	                                        Object.keys(ss).forEach((sn) => { that.$links[sn] = ss[sn]; });
	                                    }
	                                    value.$links[name] = that.$links[name].state();
	                                });
	                            }
	                            that._model = value;
	                            that.frozen = ofv;
	                        } */
	// }
	/*
	OB

	*/ 


/***/ }
/******/ ])
});
;