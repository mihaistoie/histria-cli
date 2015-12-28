/// <reference path="../core/core.ts" />
/// <reference path="./model.interfaces.ts" />


namespace Histria {
    export module Model {
        let _utils = utils;
        export const AlertType = {
            Error: 0,
            Warning: 1,
            Success: 2
        }
        export class Errors {
            private _propName: string;
            private _owner: ModelObject;
            private _errors: { severity: number, message: string }[];
            constructor(owner: ModelObject, propName: string, value: { severity: number, message: string }[]) {
                var that = this;
                that._errors = value || [];
                that._propName = propName;
                that._owner = owner;
            }
            public destroy() {
                var that = this;
                that._errors = null;
                that._owner = null;
            }
            private notify() {
                var that = this;
                that._owner.notifyMetaDataChanged(that._propName + '.$errors', null);
            }
            private _addErrors(alerts: { message: string, severity?: number }[], add?: boolean) {
                let that = this;
                if (add || !_utils.equals(that._errors, alerts)) {
                    that._errors.length = 0;
                    that._errors = _utils.extend(that._errors, alerts || [], true);
                    that.notify();
                }
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
            
            public addError(message: string) {
                let that = this;
                that._addErrors([{ severity: AlertType.Error, message: message }], true);
            }
            public addSuccess(message: string) {
                let that = this;
                that._addErrors([{ severity: AlertType.Success, message: message }], true);
            }
            public addWarning(message: string) {
                let that = this;
                that._addErrors([{ severity: AlertType.Warning, message: message }], true);
            }

        }
    }
}
