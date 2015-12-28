/// <reference path="../core/core.ts" />
/// <reference path="./schema.ts" />
/// <reference path="./metadata.ts" />
/// <reference path="./model.utils.ts" />
/// <reference path="./model.interfaces.ts" />

namespace Histria {
    export module Model {
        var
            _utils = utils,
            _schema = Schema;

        export class BaseModel implements ModelObject {
            public isNull: boolean;
            public isUndefined: boolean;
            protected frozen: boolean;
            protected _owner: any;
            //is true for one-to-one composition and for items of an array (one-to-many)
            protected _metaInParent: boolean;
            // is not empty for compositions (one-to-one and one-to-many)
            // for items of an array (one-to-many) _propertyName === '$item'
            protected _propertyName: string;
            
            public isArray(): boolean { return false; }
            public get owner(): ModelObject {
                return <ModelObject>this._owner;
            }
            public addErrors(alerts: { message: string, severity?: number }[], add?: boolean): void {
            }
            public notifyMetaDataChanged(propertyName: string, params: any): void {
                let that = this, parent = that.owner;
                if (parent) {
                    let pn = that._propertyName  + (propertyName ? '.' + propertyName : '');
                    if (parent.isArray()) {
                        params = params || {};
                        
                        
                    }
                    
                    that.owner.notifyMetaDataChanged(pn, params);
                } else {
                    
                }
                
            }
        }

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
        }

    }

}


/*
OB

*/