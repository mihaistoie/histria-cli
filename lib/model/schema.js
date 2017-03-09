import { currentLocale, currentLang, formatMoney, formatDecimal } from '../localisation/locale';
import { messages } from '../localisation/messages';
import { formatByPosition, allocId } from '../core/utils';
export const JSONTYPES = {
    string: 'string',
    integer: 'integer',
    boolean: 'boolean',
    number: 'number',
    object: 'object',
    array: 'array',
    // extended
    date: 'date',
    datetime: 'date-time'
};
export const JSONFORMATS = {
    email: 'email',
    json: 'json',
    money: 'money',
    code: 'code',
    rate: 'rate'
};
const DEF_LINK = '#/definitions/';
const DEF_LINK_LEN = DEF_LINK.length;
var _expandRefProp = (schema, rootSchema) => {
    if (schema.$ref) {
        let refEntity = schema.$ref.substr(DEF_LINK_LEN);
        let refSchema = rootSchema.definitions ? rootSchema.definitions[refEntity] : null;
        if (!refSchema)
            throw 'Schema $ref not found : ' + schema.$ref;
        return refSchema;
    }
    return schema;
}, _ignore = (prop, rootSchema) => {
    return ['ref/array', 'ref/object'].indexOf(prop.type) >= 0;
}, _isObject = (prop, rootSchema) => {
    return prop.type === JSONTYPES.object;
}, _isArray = (prop, rootSchema) => {
    return prop.type === JSONTYPES.array;
}, _isNumber = (prop) => {
    return prop.type === JSONTYPES.number || prop.type === JSONTYPES.integer;
}, _isInteger = (prop) => {
    return prop.type === JSONTYPES.integer;
}, _isArrayOfObjects = (prop, rootSchema) => {
    if (prop.type === JSONTYPES.array) {
        let pitems = _expandRefProp(prop.items, rootSchema);
        return pitems.type === JSONTYPES.object;
    }
    else
        return false;
}, _enumProps = (schema, rootSchema, cb) => {
    Object.keys(schema.properties).forEach((propName) => {
        let item = schema.properties[propName];
        if (_ignore(item, rootSchema))
            return;
        cb(propName, item, _isObject(item, rootSchema), _isArray(item, rootSchema));
    });
}, _getDefault = (vDefault) => {
    return vDefault;
}, _typeOfProperty = (propSchema) => {
    let ps = propSchema.type || JSONTYPES.string;
    if (!JSONTYPES[ps])
        throw 'Unsupported schema type : ' + propSchema.type;
    if (propSchema.format) {
        if (ps === JSONTYPES.string) {
            if (propSchema.format === JSONTYPES.date)
                return JSONTYPES.date;
            else if (propSchema.format === JSONTYPES.datetime)
                return JSONTYPES.datetime;
            else if (propSchema.format === JSONTYPES.id)
                return JSONTYPES.id;
        }
        else if (ps === JSONTYPES.integer) {
            if (propSchema.format === JSONTYPES.id)
                return JSONTYPES.id;
        }
    }
    return ps;
}, _enumCompositions = (schema, rootSchema, path, isArray, cb, expandStack) => {
    rootSchema = rootSchema || schema;
    expandStack = expandStack || [];
    if (!cb(path, schema, rootSchema, isArray))
        return;
    Object.keys(schema.properties).forEach((name) => {
        let prop = schema.properties[name];
        if (_ignore(prop, rootSchema))
            return;
        let ref = schema.$ref;
        if (ref) {
            if (expandStack.indexOf(ref) >= 0)
                return;
            expandStack.push(schema.$ref);
            prop = expandRefProp(prop, rootSchema);
        }
        try {
            if (prop.type === JSONTYPES.object) {
                let cp = path ? path + '.' + name : name;
                _enumCompositions(prop, rootSchema, cp, false, cb);
            }
            else if (prop.type === JSONTYPES.array) {
                let pitems = _expandRefProp(prop.items, rootSchema);
                if (pitems.type === JSONTYPES.object) {
                    let cp = path ? path + '.' + name : name;
                    _enumCompositions(pitems, rootSchema, cp, true, cb);
                }
            }
        }
        finally {
            if (ref)
                expandStack.pop();
        }
    });
}, _extractClassNames = (schema, rootSchema) => {
    let res = {};
    _enumCompositions(schema, rootSchema, '', false, (prefix, cs, rs, array) => {
        if (cs.name) {
            if (res[cs.name])
                return false;
            res[cs.name] = true;
        }
        return true;
    });
    return Object.keys(res).length ? res : null;
}, _initializeSchemaState = (schema, roolSchema, schemaStates) => {
    let pt = _typeOfProperty(schema);
    switch (pt) {
        case JSONTYPES.integer:
            schema.decimals = 0;
            break;
        case JSONTYPES.number:
            if (schema.format === JSONFORMATS.rate) {
                if (schema.decimals === undefined)
                    schema.decimals = 2;
                if (schema.minimum === undefined)
                    schema.minimum = 0;
                if (schema.maximum === undefined)
                    schema.maximum = 100;
                if (schema.symbol === undefined)
                    schema.symbol = '%';
            }
            else if (schema.format === JSONFORMATS.money) {
                if (schema.decimals === undefined)
                    schema.decimals = currentLocale.number.decimalPlaces;
                if (schema.symbol === undefined)
                    schema.symbol = currentLocale.number.symbol;
            }
            break;
        case JSONTYPES.string:
            break;
    }
    if (_isNumber(schema)) {
        if (schema.minimum !== undefined)
            schemaStates.minimum = schema.minimum;
        if (schema.maximum !== undefined)
            schemaStates.maximum = schema.maximum;
        if (schema.exclusiveMaximum !== undefined)
            schemaStates.exclusiveMaximum = schema.exclusiveMaximum;
        if (schema.exclusiveMinimum !== undefined)
            schemaStates.exclusiveMinimum = schema.exclusiveMinimum;
        if (schema.decimals !== undefined)
            schemaStates.decimals = schema.decimals;
        if (schema.symbol !== undefined)
            schemaStates.symbol = schema.symbol;
    }
}, _formatNumber = (state, schema, value) => {
    if (schema.format == JSONFORMATS.money)
        return formatMoney(value, false);
    return formatDecimal(value, schema.decimals || 0, null);
}, _checkNumber = (value, state, schema, errors) => {
    let res = true;
    if (schema.exclusiveMinimum) {
        if (state.minimum != undefined && value <= state.minimum) {
            errors.addError(formatByPosition(messages(currentLang).schema.minNumberExclusive, schema.title, _formatNumber(state, schema, state.minimum)));
            res = false;
        }
    }
    else {
        if (schema.minimum != undefined && value < schema.minimum) {
            errors.addError(formatByPosition(messages(currentLang).schema.minNumber, schema.title, _formatNumber(state, schema, state.minimum)));
            res = false;
        }
    }
    if (schema.exclusiveMaximum) {
        if (schema.maximum != undefined && value >= schema.maximum) {
            errors.addError(formatByPosition(messages(currentLang).schema.maxNumberExclusive, schema.title, _formatNumber(state, schema, state.maximum)));
            res = false;
        }
    }
    else {
        if (schema.maximum != undefined && value > schema.maximum) {
            errors.addError(formatByPosition(messages(currentLang).schema.maxNumber, schema.title, _formatNumber(state, schema, state.maximum)));
            res = false;
        }
    }
    return res;
}, _validateEmail = (email, error) => {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}, _validateJson = (value, error) => {
    try {
        JSON.parse(value);
    }
    catch (ex) {
        error.ex = ex;
        return false;
    }
    return true;
}, _checkString = (value, state, schema, errors) => {
    let res = true;
    let v = (value || '');
    if (state.minLength && v.length < state.minLength) {
        errors.addError(formatByPosition(messages(currentLang).schema.minLength, schema.title, state.minLength));
        res = false;
    }
    if (state.isMandatory) {
        if (v === '') {
            errors.addError(formatByPosition(messages(currentLang).schema.required, schema.title));
            res = false;
        }
    }
    if (schema.format) {
        if (schema.format === JSONFORMATS.email) {
            if (value && !_validateEmail(value, {})) {
                errors.addError(messages(currentLang).schema.invalidEmail);
                res = false;
            }
        }
        else if (schema.format === JSONFORMATS.json) {
            let error = {};
            if (value && !_validateJson(value, error)) {
                errors.addError(error.ex.message);
                res = false;
            }
        }
    }
    return res;
}, _pkFields = (pk) => {
    if (Array.isArray(pk))
        return pk;
    else
        return pk.split(',').map((v) => { return v.trim(); });
}, _extractPkValue = (item, map) => {
    if (map.length == 1)
        return item[map[0]];
    let o = {};
    map.forEach((p) => { o[p] = item[p]; });
    return o;
}, _checkArray = (value, state, schema, rootSchema, errors) => {
    let res = true;
    let pitems = _expandRefProp(schema.items, rootSchema);
    if (pitems.primaryKey && pitems.type === JSONTYPES.object && value && value.length) {
        let keys = _pkFields(pitems.primaryKey);
        let error = false;
        let pks = [];
        value.forEach((item) => {
            if (error)
                return;
            let model = item.model();
            let ivalue = JSON.stringify(_extractPkValue(model, keys));
            if (pks.indexOf(ivalue) < 0)
                pks.push(ivalue);
            else
                error = true;
        });
        if (error) {
            let msg = keys.length > 1 ? messages(currentLang).schema.uniqueColumns : messages(currentLang).schema.uniqueColumn;
            value.addError(formatByPosition(msg, keys.join(', ')));
            res = false;
        }
    }
    return res;
}, _validateSchema = (value, schema, rootSchema, state, errors) => {
    let res = true;
    if (!schema)
        return;
    if (state) {
        if (state.isHidden || state.isDisabled)
            return res;
    }
    switch (schema.type) {
        case JSONTYPES.number:
        case JSONTYPES.integer:
            res = _checkNumber(value, state, schema, errors);
            break;
        case JSONTYPES.string:
            res = _checkString(value, state, schema, errors);
            break;
        case JSONTYPES.array:
            res = _checkArray(value, state, schema, rootSchema, errors);
            break;
    }
    return res;
}, _expandRules = (rules, names) => {
    let res = { rulesByClass: {}, rulesById: {} };
    rules.forEach(rule => {
        if (!rule.ruleType)
            return;
        rule.triggers = rule.triggers.split(',').map((trigger) => trigger.trim());
        rule.id = allocId();
        res.rulesById[rule.id] = rule;
        rule.entities && rule.entities.forEach((entity) => {
            if (names[entity.entity]) {
                rule.triggers.forEach((trigger) => {
                    let ct = rule.ruleType;
                    if (trigger === '$events.created')
                        ct = 'created';
                    else if (trigger === '$events.loaded')
                        ct = 'loaded';
                    else if (trigger === '$events.saving')
                        ct = 'saving';
                    res.rulesByClass[ct] = res.rulesByClass[ct] || {};
                    if (ct === 'created' || ct === 'loaded' || ct === 'saving') {
                        res.rulesByClass[ct][entity.entity] = res.rulesByClass[ct][entity.entity] || [];
                        res.rulesByClass[ct][entity.entity].push(rule.id);
                    }
                    else {
                        let rbe = res.rulesByClass[ct][entity.entity] = res.rulesByClass[ct][entity.entity] || {};
                        rbe[trigger] = rbe[trigger] || [];
                        rbe[trigger].push(rule.id);
                    }
                });
            }
        });
    });
    return res;
}, _checkSchema = (schema, rootSchema) => {
    if (schema._checked)
        return;
    schema._checked = true;
    let names = schema.loadRules ? _extractClassNames(schema, schema) : null;
    if (names && schema.rules) {
        let rulesCfg = _expandRules(schema.rules, names);
        schema.rules = rulesCfg.rulesByClass;
        schema.rulesMap = rulesCfg.rulesById;
    }
}, _initFromSchema = (schema, rootSchema, value, isCreate) => {
    value.$states = value.$states || {};
    value.$create = isCreate;
    schema.states = schema.states || {};
    Object.keys(schema.properties).forEach((pn) => {
        let cs = schema.properties[pn];
        if (!_isObject(cs, rootSchema)) {
            let state = schema.states[pn] = schema.states[pn] || {};
            let ns = value.$states[pn] = value.$states[pn] || {};
            if (!state._initialized) {
                _initializeSchemaState(cs, rootSchema, state);
                state._initialized = true;
            }
            Object.keys(state).forEach((sn) => {
                if (ns[sn] === undefined) {
                    ns[sn] = state[sn];
                }
            });
        }
        if (_isObject(cs, rootSchema)) {
            value[pn] = value[pn] || (isCreate ? {} : null);
            if (value[pn])
                _initFromSchema(cs, rootSchema, value[pn], isCreate);
        }
        else if (_isArrayOfObjects(cs, rootSchema)) {
            value[pn] = value[pn] || (isCreate ? [] : null);
            if (value[pn] && value[pn].length) {
                let itemsSchema = _expandRefProp(cs.items, rootSchema);
                value[pn].forEach((ii) => {
                    _initFromSchema(itemsSchema, rootSchema, ii, isCreate);
                });
            }
        }
        else {
            if (isCreate) {
                // in create mode load default values
                if (value[pn] === undefined) {
                    if (cs.default !== undefined && cs.default !== null)
                        value[pn] = _getDefault(cs.default);
                    else if (cs.enum)
                        value[pn] = cs.enum[0];
                    else {
                        switch (_typeOfProperty(cs)) {
                            case JSONTYPES.number:
                            case JSONTYPES.integer:
                                if (cs.default !== null)
                                    value[pn] = 0;
                                break;
                        }
                    }
                }
            }
        }
    });
};
export const enumProperties = _enumProps;
export const isObject = _isObject;
export const isArrayOfObjects = _isArrayOfObjects;
export const expandRefProp = _expandRefProp;
export const initFromSchema = _initFromSchema;
export const typeOfProperty = _typeOfProperty;
export const isNumber = _isNumber;
export const validateProperty = _validateSchema;
export const checkSchema = _checkSchema;
