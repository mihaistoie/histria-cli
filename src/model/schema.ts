/// <reference path="../core/core.ts" />
namespace Histria {
	export module Schema {
		var
			_utils = utils;
		var
			_isRefObject = function(prop): boolean {
				return prop.type === "ref/object";
			},
			_isRefArray = function(prop): boolean {
				return prop.type === "ref/array";
			},
			_ignore = function(prop): boolean {
				return ["ref/array", "ref/object"].indexOf(prop.type) >= 0;
			},
			
			_isObject = function(prop): boolean {
				return prop.type === "object";
			},
			_isArray = function(prop): boolean {
				return prop.type === "array";
			},
			_enumProps = function(schema: any, cb: (propertyName: string, value: any, isObject: boolean, isArray: boolean) => void): void {
				Object.keys(schema.properties).forEach(function(propName: string) {
					let item = schema.properties[propName];
					if (_ignore(item)) return;
					cb(propName, item, _isObject(item), _isArray(item));
				});

			};
		export const enumProperties = _enumProps;
		export const 
		
	}

}