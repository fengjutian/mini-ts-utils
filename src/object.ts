export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

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

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const res = {} as Pick<T, K>;
  keys.forEach(k => { if (k in obj) res[k] = obj[k]; });
  return res;
}

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const res = { ...obj } as Omit<T, K>;
  keys.forEach(k => { delete res[k]; });
  return res;
}

export function get<T, K extends string>(
  obj: T,
  path: K,
  defaultVal?: any
): any {
  return path.split(".").reduce((o, k) => (o && k in o ? o[k] : undefined), obj) ?? defaultVal;
}
