# mini-ts-utils

一个面向 TypeScript 的轻量工具集，聚焦常用的数组、对象、字符串与函数工具，小而美、易于学习与使用。

- 体积小：只包含常用方法，易于按需树摇
- 类型友好：完善的 TypeScript 类型定义
- 易集成：零配置即可使用

## 安装

```bash
npm i mini-ts-utils
```

```bash
yarn add mini-ts-utils
```

```bash
pnpm add mini-ts-utils
```

## 快速开始

```ts
import { chunk, mergeDeep, camelCase, debounce } from 'mini-ts-utils';

// 数组
const groups = chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]

// 对象
const merged = mergeDeep({}, { a: 1, b: { c: 2 } }, { b: { d: 3 } });
// => { a: 1, b: { c: 2, d: 3 } }

// 字符串
const s = camelCase('hello_world test'); // 'helloWorldTest'

// 函数
const log = debounce(() => console.log('run'), 200);
log();
```

### 导入方式

- ESM（推荐）
```ts
import { chunk, shuffle } from 'mini-ts-utils';
```

- CommonJS
```js
const { chunk, shuffle } = require('mini-ts-utils');
```

> 提示：库提供完整的类型声明，支持 Tree-Shaking；选择性导入即可按需打包。

## API

### Array
- `chunk<T>(array: T[], size = 1): T[][]` 按大小分组
- `compact<T>(array: (T | null | undefined | false | 0 | "")[]): T[]` 过滤假值
- `flatten<T>(array: any[]): T[]` 一层扁平
- `flattenDeep<T>(array: any[]): T[]` 深度扁平
- `uniq<T>(array: T[]): T[]` 去重
- `intersection<T>(a: T[], b: T[]): T[]` 交集
- `shuffle<T>(array: T[]): T[]` 随机洗牌（Fisher–Yates，返回新数组，不改原数组）

### Object
- `isObject(value: any): value is Record<string, any>` 是否为普通对象
- `mergeDeep<T>(target: T, ...sources: any[]): T` 深合并（原地合并）
- `pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>` 取子集
- `omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>` 去子集
- `get<T>(obj: T, path: string, defaultVal?: any): any` 安全取值（支持 `a.b.c` 路径）

### String
- `capitalize(str: string): string` 首字母大写
- `camelCase(str: string): string` 转为驼峰
- `kebabCase(str: string): string` 转为短横线
- `snakeCase(str: string): string` 转为下划线

### Function
- `debounce<T extends (...args: any[]) => void>(fn: T, delay = 300)` 防抖
- `throttle<T extends (...args: any[]) => void>(fn: T, limit = 300)` 节流
- `once<T extends (...args: any[]) => any>(fn: T): T` 只执行一次

## 更多示例

```ts
import { 
  chunk, compact, flatten, flattenDeep, uniq, intersection, shuffle,
  mergeDeep, pick, omit, get,
  capitalize, camelCase, kebabCase, snakeCase,
  debounce, throttle, once,
} from 'mini-ts-utils';

// 1) Array
const a = [1, 2, 2, 3, 4];
chunk(a, 2);            // [[1,2], [2,3], [4]]
compact([0, 1, false]); // [1]
flatten([[1],[2,[3]]]); // [1,2,[3]]
flattenDeep([1,[2,[3]]]); // [1,2,3]
uniq(a);                // [1,2,3,4]
intersection([1,2,3],[2,4]); // [2]
shuffle([1,2,3,4]);     // 例如 [3,1,4,2]（不改原数组）

// 2) Object
mergeDeep({x: {a: 1}}, {x: {b: 2}}); // { x: { a:1, b:2 } }
pick({a:1,b:2}, ['a']);             // { a:1 }
omit({a:1,b:2}, ['a']);             // { b:2 }
get({ a: { b: 1 } }, 'a.b', 0);      // 1

// 3) String
capitalize('hello');                 // 'Hello'
camelCase('hello_world test');       // 'helloWorldTest'
kebabCase('HelloWorld text');        // 'hello-world-text'
snakeCase('HelloWorld text');        // 'hello_world_text'

// 4) Function
const d = debounce(() => {}, 200);   // 200ms 静默后触发
d();
const t = throttle(() => {}, 300);   // 300ms 内最多一次
t();
const onceInit = once(() => Math.random());
onceInit(); onceInit();              // 第二次返回第一次的结果
```

### 关于 shuffle 的随机性
- 采用 Fisher–Yates（Durstenfeld/Knuth）算法，均匀无偏；复杂度 O(n)。
- `Math.random()` 非加密安全，如需更强随机性可在 Node 使用 `crypto.randomInt` 或注入可复现实验的 PRNG。

## 构建

```bash
npm run build
```

输出至 `dist/`，包含 `*.d.ts` 类型声明。

## 测试

项目使用 [Vitest](https://vitest.dev)。

```bash
npm run test       # 运行测试
npm run test:watch # 监听模式
npm run test:cov   # 覆盖率报告
```

## 许可

MIT