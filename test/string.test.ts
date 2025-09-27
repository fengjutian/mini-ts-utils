import { describe, it, expect } from 'vitest';
import { capitalize, camelCase, kebabCase, snakeCase } from '../src';

describe('string utils', () => {
  it('capitalize', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('')).toBe('');
  });

  it('camelCase', () => {
    expect(camelCase('hello_world-test str')).toBe('helloWorldTestStr');
  });

  it('kebabCase', () => {
    expect(kebabCase('helloWorld Test')).toBe('hello-world-test');
  });

  it('snakeCase', () => {
    expect(snakeCase('helloWorld Test')).toBe('hello_world_test');
  });
});