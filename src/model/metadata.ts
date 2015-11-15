/// <reference path="../core/core.ts" />
/// <reference path="./model.errors.ts" />
namespace Histria {
    export module Model {
		let _utils = utils;
		export class BaseMeta {
			private _parent: any;
			protected _meta: any;
			private _propName: string;
			constructor(parent: any, propName: string, value: any) {
				var that = this;
				that._parent = parent;
				that._propName = propName;
				that._meta = value || {};
				that.init();
			}
			public destroy() {
				var that = this;
				that._meta = null;
				that._parent = null;

			}
			protected init() {
				let that = this;
				that._meta.$hidden = that._meta.$hidden || false;
				that._meta.$disabled = that._meta.$disabled || false;
			}
			protected notify(propertyName: string) {
				let that = this;
				if (that._parent && that._parent.notifyMetaDataChanged)
					that._parent.notifyMetaDataChanged(that._propName + '.' + propertyName, {});
			}
			public meta() {
				return this._meta;
			}
			public get $hidden(): boolean {
				return this._meta.$hidden;
			}

			public set $hidden(value: boolean) {
				let that = this;
				if (that._meta.$hidden != value) {
					that._meta.$hidden = value;
					that.notify('$hidden');
				}
			}
			public get $disabled(): boolean {
				return this._meta.$disabled;
			}

			public set $disabled(value: boolean) {
				let that = this;
				if (that._meta.$disabled != value) {
					that._meta.$disabled = value;
					that.notify('$disabled');
				}
			}

		};
		export class MetaLink extends BaseMeta {
			constructor(parent: any, propName: string, value: any) {
				super(parent, propName, value);
			}
		}
		export class MetaObject extends BaseMeta {
			private _$errors: ModelErrors;
			constructor(parent: any, propName: string, value: any) {
				super(parent, propName, value);
				let that = this;
				that._$errors = new ModelErrors(parent, propName, that._meta.$errors, false);
			}
			protected init() {
				super.init();
				let that = this;
				that._meta.$errors = that._meta.$errors || [];
			}
			public destroy() {
				var that = this;
				if (that._$errors) {
					that.destroy();
					that = null;
				}
				super.destroy();
			}
			public get $errors(): ModelErrors {
				return this._$errors;
			}
		}
		export class MetaProperty extends MetaObject {
			constructor(parent: any, propName: string, value: any) {
				super(parent, propName, value);
			}

			protected init() {
				super.init();
				let that = this;
				that._meta.$mandatory = that._meta.$mandatory || false;
				that._meta.$readOnly = that._meta.$readOnly || false;
			}
			public get $mandatory(): boolean {
				return this._meta.$mandatory;
			}

			public set $mandatory(value: boolean) {
				let that = this;
				if (that._meta.$mandatory != value) {
					that._meta.$mandatory = value;
					that.notify('$mandatory');
				}
			}
			public get $readOnly(): boolean {
				return this._meta.$readOnly;
			}

			public set $readOnly(value: boolean) {
				let that = this;
				if (that._meta.$readOnly != value) {
					that._meta.$readOnly = value;
					that.notify('$readOnly');
				}
			}
		}
	}
}
