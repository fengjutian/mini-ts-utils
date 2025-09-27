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

export function pick<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> {
  const res = {} as Pick<T, K>;
  keys.forEach(k => { if (k in obj) (res as any)[k] = (obj as any)[k]; });
  return res;
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K> {
  const res = { ...obj } as any;
  keys.forEach(k => { delete res[k]; });
  return res as Omit<T, K>;
}

export function get<T, R = any>(
  obj: T,
  path: string,
  defaultVal?: R
): R {
  const result = path.split('.')
    .reduce<any>((o, key) => {
      if (o != null && (typeof o === 'object' || typeof o === 'function') && key in (o as any)) {
        return (o as any)[key];
      }
      return undefined;
    }, obj as any);
  return (result === undefined ? defaultVal : result) as R;
}
