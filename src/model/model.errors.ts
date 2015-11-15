/// <reference path="../core/core.ts" />
namespace Histria {
    export module Model {
		let _utils = utils;
		export const AlertType = {
			Error: 0,
			Warning: 1,
			Success: 2
		}
		export class ModelErrors {
			private _propName: string;
			private _parent: any;
			private _errors: { severity: number, message: string }[];
			private _forwardToParent: boolean;
			constructor(parent: any, propName: string, value: { severity: number, message: string }[], forwardToParent: boolean) {
				var that = this;
				that._errors = value || [];
				that._propName = propName;
				that._parent = parent;
				that._forwardToParent = forwardToParent;
			}
			public destroy() {
				var that = this;
				that._errors = [];
				that._parent = null;
			}
			private notify() {
				var that = this;
				if (that._parent && that._parent.notifyMetaDataChanged)
					that._parent.notifyMetaDataChanged(that._propName + '.$errors', null);
			}
			public clear(notify: boolean): boolean {
				var that = this;
				if (that._errors.length) {
					that._errors.length = 0;
					if (notify) that.notify();
					return true;
				}
				return false;
			}
			public hasErrors(): boolean {
				let that = this;
				return that._errors && that._errors.length ? true : false;
			}
			public addErrors(alerts: { message: string, severity?: number }[], add?: boolean) {
				let that = this;
				if (that._forwardToParent) {
					if (that._parent && that._parent.addErrors)
						that._parent.addErrors(alerts, add);
				} else if (add || !_utils.equals(that._errors, alerts)) {
					that._errors.length = 0;
					_utils.extend(that._errors, alerts || []);
					that.notify();
				}
			}
			public addError(message: string) {
				let that = this;
				that.addErrors([{ severity: AlertType.Error, message: message }], true);
			}
			public addSuccess(message: string) {
				let that = this;
				that.addErrors([{ severity: AlertType.Success, message: message }], true);
			}
			public addWarning(message: string) {
				let that = this;
				that.addErrors([{ severity: AlertType.Warning, message: message }], true);
			}

		}
	}
}
