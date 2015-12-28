/// <reference path="../core/core.ts" />
/// <reference path="./model.errors.ts" />
/// <reference path="./model.interfaces.ts" />

namespace Histria {
    export module Model {
		let _utils = utils;
		export class BaseMeta {
			private _owner: ModelObject;
			protected _meta: any;
			private _propName: string;
			constructor(owner: ModelObject, propName: string, value: any) {
				var that = this;
				that._owner = owner;
				that._propName = propName;
				that._meta = value || {};
				that.init();
			}
			public destroy() {
				var that = this;
				that._meta = null;
				that._owner = null;

			}
			protected init() {
				let that = this;
				that._meta.$hidden = that._meta.$hidden || false;
				that._meta.$disabled = that._meta.$disabled || false;
			}
			protected notify(propertyName: string) {
				let that = this;
				if (that._owner)
					that._owner.notifyMetaDataChanged(that._propName + '.' + propertyName, {});
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
			constructor(owner: ModelObject, propName: string, value: any) {
				super(owner, propName, value);
			}
		}
		export class MetaObject extends BaseMeta {
			private _$errors: Errors;
			constructor(owner: ModelObject, propName: string, value: any) {
				super(owner, propName, value);
				let that = this;
				that._$errors = new Errors(owner, propName, that._meta.$errors);
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
			public get $errors(): Errors {
				return this._$errors;
			}
		}
		export class MetaProperty extends MetaObject {
			constructor(owner: ModelObject, propName: string, value: any) {
				super(owner, propName, value);
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
