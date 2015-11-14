/// <reference path="../core/core.ts" />
namespace Histria {
    export module Model {
		let _utils = utils;
		export const AlertType = {
			Error: 0,
			Warning: 1,
			Success: 2
		}
		export class Alerts {
			private _propName: string;
			private _parent: any;
			private _alerts: { severity: number, message: string }[];
			private _forwardToParent: boolean;
			constructor(parent, propName, forwardToParent) {
				var that = this;
				that._alerts = [];
				that._propName = propName;
				that._parent = parent;
				that._forwardToParent = forwardToParent;
			}
			public destroy() {
				var that = this;
				that._alerts = null;
				that._parent = null;
			}
			private notify() {
				var that = this;
				if (that._parent && that._parent.notifyMetaDataChanged)
					that._parent.notifyMetaDataChanged(that._propName + '.alerts', null);
			}
			public clear(notify: boolean): boolean {
				var that = this;
				if (that._alerts.length) {
					that._alerts.length = 0;
					if (notify) that.notify();
					return true;
				}
				return false;
			}
			public hasAlerts(): boolean {
				let that = this;
				return that._alerts && that._alerts.length ? true : false;
			}
			public addAlerts(alerts: any, add?: boolean) {
				let that = this;
				if (that._forwardToParent) {
					if (that._parent && that._parent.addErrors)
						that._parent.addErrors(alerts, add);
				} else if (add || !_utils.equals(that._alerts, alerts)) {
					that._alerts = alerts || [];
					that.notify();
				}
			}
			public addError(message: string) {
				let that = this;
				that.addAlerts([{ severity: AlertType.Error, message: message }], true);
			}
			public addSuccess(message: string) {
				let that = this;
				that.addAlerts([{ severity: AlertType.Success, message: message, timeout: 2 }], true);
			}
			public addWarning(message: string) {
				let that = this;
				that.addAlerts([{ severity: AlertType.Warning, message: message, timeout: 2 }], true);
			}

		}
	}
}
