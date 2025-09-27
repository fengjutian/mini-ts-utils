"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = isObject;
exports.mergeDeep = mergeDeep;
exports.pick = pick;
exports.omit = omit;
exports.get = get;
function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
function mergeDeep(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            const srcVal = source[key];
            if (isObject(srcVal)) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                mergeDeep(target[key], srcVal);
            }
            else {
                Object.assign(target, { [key]: srcVal });
            }
        }
    }
    return mergeDeep(target, ...sources);
}
function pick(obj, keys) {
    const res = {};
    keys.forEach(k => { if (k in obj)
        res[k] = obj[k]; });
    return res;
}
function omit(obj, keys) {
    const res = { ...obj };
    keys.forEach(k => { delete res[k]; });
    return res;
}
function get(obj, path, defaultVal) {
    const result = path.split('.')
        .reduce((o, key) => {
        if (o != null && (typeof o === 'object' || typeof o === 'function') && key in o) {
            return o[key];
        }
        return undefined;
    }, obj);
    return (result === undefined ? defaultVal : result);
}
