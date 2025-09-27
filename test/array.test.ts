import { describe, it, expect } from 'vitest';
import { chunk, compact, flatten, flattenDeep, uniq, intersection } from '../src';

describe('array utils', () => {
  it('chunk', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3], 0)).toEqual([]);
  });

  it('compact', () => {
    expect(compact([0, 1, false, 2, '', 3, null as any, undefined as any])).toEqual([1, 2, 3]);
  });

  it('flatten (shallow)', () => {
    expect(flatten<number>([[1, 2], [3, [4]]])).toEqual([1, 2, 3, [4]]);
  });

  it('flattenDeep', () => {
    expect(flattenDeep<number>([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });

  it('uniq', () => {
    expect(uniq([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  it('intersection', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });
});