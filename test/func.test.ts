import { describe, it, expect, vi } from 'vitest';
import { debounce, throttle, once } from '../src';

describe('func utils', () => {
  it('once', () => {
    const fn = vi.fn((x: number) => x * 2);
    const wrapped = once(fn);
    const r1 = wrapped(2);
    const r2 = wrapped(3);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(r1).toBe(4);
    expect(r2).toBe(4);
  });

  it('debounce', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const d = debounce(fn, 200);

    d(1);
    d(2);

    vi.advanceTimersByTime(199);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);

    vi.useRealTimers();
  });

  it('throttle', () => {
    const fn = vi.fn();
    const t = throttle(fn, 300);

    vi.useFakeTimers();
    vi.setSystemTime(0);

    t(1);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.setSystemTime(100);
    t(2);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.setSystemTime(300);
    t(3);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(3);

    vi.useRealTimers();
  });
});