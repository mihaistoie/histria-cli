//OK
import * as utils from '../core/utils';
export const AlertType = {
    Error: 0,
    Warning: 1,
    Success: 2
};
export class Errors {
    constructor(owner, propName, value) {
        var that = this;
        that._errors = value || [];
        that._propName = propName;
        that._owner = owner;
    }
    destroy() {
        var that = this;
        that._errors = null;
        that._owner = null;
    }
    notify() {
        var that = this;
        that._owner.fireMetaDataChanged(that._propName + '.$errors', null);
    }
    _addErrors(alerts, add) {
        let that = this;
        if (add || !utils.equals(that._errors, alerts)) {
            that._errors.length = 0;
            that._errors = utils.extend(that._errors, alerts || [], true);
            that.notify();
        }
    }
    clearErrors() {
        this.clear(true);
    }
    clear(notify) {
        var that = this;
        if (that._errors.length) {
            that._errors.length = 0;
            if (notify)
                that.notify();
            return true;
        }
        return false;
    }
    hasErrors() {
        let that = this;
        return that._errors && that._errors.length ? true : false;
    }
    addError(message) {
        let that = this;
        that._addErrors([{ severity: AlertType.Error, message: message }], true);
    }
    addSuccess(message) {
        let that = this;
        that._addErrors([{ severity: AlertType.Success, message: message }], true);
    }
    addWarning(message) {
        let that = this;
        that._addErrors([{ severity: AlertType.Warning, message: message }], true);
    }
    rmvError(message) {
        let that = this;
        if (that._errors && that._errors.length) {
            let ii = that._errors.findIndex(error => {
                return error.severity === AlertType.Error && error.message === message;
            });
            if (ii >= 0) {
                that._errors.splice(ii, 1);
                that.notify();
            }
        }
    }
}
