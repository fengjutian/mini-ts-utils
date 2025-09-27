/**
 * 判断是否为普通对象（非数组且非 null）。
 * @param value 待检测的值
 * @returns 若为 Record 对象则返回 true
 */
export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * 深合并多个源对象到目标对象中（会修改 target）。
 * - 仅在源值为普通对象时递归合并；否则直接覆盖。
 * @template T 目标对象类型
 * @param target 目标对象（会被原地修改）
 * @param sources 若干个源对象
 * @returns 合并后的 target 引用
 * @example
 * mergeDeep({}, { a: 1, b: { c: 2 } }, { b: { d: 3 } })
 * // => { a: 1, b: { c: 2, d: 3 } }
 */
export function mergeDeep<T>(target: T, ...sources: any[]): T {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      const srcVal = source[key];
      if (isObject(srcVal)) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], srcVal);
      } else {
        Object.assign(target, { [key]: srcVal });
      }
    }
  }
  return mergeDeep(target, ...sources);
}

/**
 * 从对象中挑选指定键，返回一个新对象。
 * @template T 源对象类型
 * @template K 需要挑选的键集合
 * @param obj 源对象
 * @param keys 需要挑选的键数组
 * @returns 仅包含 keys 的新对象
 * @example
 * pick({ a: 1, b: 2 }, ['a']) // => { a: 1 }
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const res = {} as Pick<T, K>;
  keys.forEach(k => { if (k in obj) (res as any)[k] = (obj as any)[k]; });
  return res;
}

/**
 * 从对象中移除指定键，返回一个新对象。
 * @template T 源对象类型
 * @template K 需要移除的键集合
 * @param obj 源对象
 * @param keys 需要移除的键数组
 * @returns 不包含 keys 的新对象
 * @example
 * omit({ a: 1, b: 2 }, ['a']) // => { b: 2 }
 */
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const res = { ...obj } as Omit<T, K>;
  keys.forEach(k => { delete res[k]; });
  return res;
}

/**
 * 根据点路径安全获取对象属性，不存在时返回默认值。
 * @template T 源对象类型
 * @param obj 源对象
 * @param path 访问路径（如 "a.b.c"）
 * @param defaultVal 属性不存在时返回的默认值
 * @returns 取到的值或默认值
 * @example
 * get({ a: { b: 1 } }, 'a.b') // => 1
 * get({ a: {} }, 'a.c', 0) // => 0
 */
export function get<T, K extends string>(
  obj: T,
  path: K,
  defaultVal?: any
): any {
  return path.split(".").reduce((o, k) => (o && k in o ? o[k] : undefined), obj) ?? defaultVal;
}
