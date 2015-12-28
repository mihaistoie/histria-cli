namespace Histria {
    export module Model {
        export interface ModelObject {
            owner: ModelObject;
            isArray(): boolean; 
            addErrors(alerts: { message: string, severity?: number }[], add?: boolean): void;
            notifyMetaDataChanged(propertyName: string, params: any): void;
        }
    }
}