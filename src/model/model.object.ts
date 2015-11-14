/// <reference path="../core/core.ts" />
/// <reference path="./schema.ts" />
namespace Histria {
	export module Model {
		var
			_utils = utils,
			_schema = Schema;
		export class Model {
			public isNull: boolean;
			protected frozen: boolean;
			private _schema: any;
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
			private _init(value: any) {
				let that = this;
				that.isNull = value === null || value === undefined;
				value = value || {};
				value.$ = value.$ || {};
				value.$.$actions = value.$actions || {};
				_schema.enumProperties(that._schema, function(propertyName, item, isObject, isArray) {
					let val = value[propertyName];
					if (isArray && !val) {
						val = [];
						value[propertyName] = val;
					}
				});
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