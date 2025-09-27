import { describe, it, expect } from 'vitest';
import { isObject, mergeDeep, pick, omit, get } from '../src';

describe('object utils', () => {
  it('isObject', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([] as any)).toBe(false);
    expect(isObject(null as any)).toBe(false);
  });

  it('mergeDeep', () => {
    const a = { a: 1, b: { c: 2 } };
    const b = { b: { d: 3 }, e: 4 };
    const out = mergeDeep({}, a, b);
    expect(out).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
  });

  it('pick', () => {
    expect(pick({ a: 1, b: 2 } as const, ['a'])).toEqual({ a: 1 });
  });

  it('omit', () => {
    expect(omit({ a: 1, b: 2 } as const, ['a'])).toEqual({ b: 2 });
  });

  it('get', () => {
    const obj = { a: { b: { c: 42 } } };
    expect(get(obj, 'a.b.c')).toBe(42);
    expect(get(obj, 'a.b.x', 'fallback')).toBe('fallback');
  });
});