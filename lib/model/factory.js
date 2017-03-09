import { ObjectModel } from './object-model';
export function createInstance(schema, data) {
    return new ObjectModel(null, '', schema, { $create: true, lines: [{ codeItem: 'A' }, { codeItem: 'B' }] });
}
