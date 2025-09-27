"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = capitalize;
exports.camelCase = camelCase;
exports.kebabCase = kebabCase;
exports.snakeCase = snakeCase;
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function camelCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
        .replace(/^(.)/, m => m.toLowerCase());
}
function kebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase();
}
/**
 * 将字符串转换为 snake_case（小写并以 _ 连接）。
 * @param str 源字符串（支持空格和驼峰拆分）
 * @returns snake_case 形式的字符串
 * @example
 * snakeCase('HelloWorld text') // => 'hello_world_text'
 */
function snakeCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/\s+/g, "_")
        .toLowerCase();
}
