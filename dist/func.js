"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = debounce;
exports.throttle = throttle;
exports.once = once;
/**
 * 创建一个防抖函数：在指定延迟内多次触发，仅在最后一次触发后执行。
 * @template T 函数类型
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒），默认 300ms
 * @returns 包装后的防抖函数
 * @example
 * const d = debounce(() => console.log('run'), 200)
 * d(); d(); // 仅在 200ms 静默后触发一次
 */
function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
/**
 * 创建一个节流函数：限定在每个时间窗口内最多执行一次（leading 立即触发）。
 * @template T 函数类型
 * @param fn 需要节流的函数
 * @param limit 时间窗口（毫秒），默认 300ms
 * @returns 包装后的节流函数
 * @example
 * const t = throttle(() => console.log('tick'), 300)
 * t(); t(); // 仅第一次会立即触发，后续需等待 >= 300ms
 */
function throttle(fn, limit = 300) {
    let last = -Infinity; // 确保首次调用立即触发（leading）
    return (...args) => {
        const now = Date.now();
        if (now - last >= limit) {
            last = now;
            fn(...args);
        }
    };
}
/**
 * 创建一个只会执行一次的函数：后续调用均返回首次执行结果。
 * @template T 函数类型
 * @param fn 仅执行一次的函数
 * @returns 包装后的仅执行一次的函数
 * @example
 * const initOnce = once(init)
 * initOnce(); initOnce(); // 第二次不会再次执行 init
 */
function once(fn) {
    let called = false;
    let result;
    return ((...args) => {
        if (!called) {
            called = true;
            result = fn(...args);
        }
        return result;
    });
}
