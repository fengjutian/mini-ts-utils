export function chunk<T>(array: T[], size = 1): T[][] {
  if (size < 1) return [];
  const res: T[][] = [];
  for (let i = 0; i < array.length; i += size) res.push(array.slice(i, i + size));
  return res;
}

export function compact<T>(array: (T | null | undefined | false | 0 | "")[]): T[] {
  return array.filter(Boolean) as T[];
}

export function flatten<T>(array: any[]): T[] {
  return array.reduce((acc, val) => acc.concat(val), []);
}

export function flattenDeep<T>(array: any[]): T[] {
  return array.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenDeep(val) : val),
    []
  );
}

export function uniq<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter(x => setB.has(x));
}
