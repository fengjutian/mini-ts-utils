/**
 * 将数组按指定大小分组。
 * @template T 元素类型
 * @param array 源数组
 * @param size 分组大小，<1 时返回空数组
 * @returns 分组后的二维数组
 * @example
 * chunk([1,2,3,4,5], 2) // => [[1,2],[3,4],[5]]
 */
export declare function chunk<T>(array: T[], size?: number): T[][];
/**
 * 过滤数组中的假值（false、0、""、null、undefined、NaN）。
 * @template T 元素类型
 * @param array 包含可能为假值的数组
 * @returns 仅包含真值元素的新数组
 * @example
 * compact([0, 1, false, 2, '', 3, null, undefined]) // => [1, 2, 3]
 */
export declare function compact<T>(array: (T | null | undefined | false | 0 | "")[]): T[];
/**
 * 将数组进行一层扁平化。
 * @template T 目标元素类型
 * @param array 可能包含子数组的一维数组
 * @returns 扁平化一层后的新数组
 * @example
 * flatten([[1,2], [3, [4]]]) // => [1, 2, 3, [4]]
 */
export declare function flatten<T>(array: any[]): T[];
/**
 * 递归深度扁平化数组。
 * @template T 目标元素类型
 * @param array 任意层级嵌套数组
 * @returns 完全扁平化后的新数组
 * @example
 * flattenDeep([1, [2, [3, [4]]]]) // => [1, 2, 3, 4]
 */
export declare function flattenDeep<T>(array: any[]): T[];
/**
 * 对数组去重，保持首次出现顺序。
 * @template T 元素类型（按 SameValueZero 去重）
 * @param array 源数组
 * @returns 去重后的新数组
 * @example
 * uniq([1,2,2,3,1]) // => [1,2,3]
 */
export declare function uniq<T>(array: T[]): T[];
/**
 * 计算两个数组的交集，保持第一个数组中的顺序。
 * @template T 元素类型（按 SameValueZero 判断相等）
 * @param a 数组 A
 * @param b 数组 B
 * @returns 同时存在于 A 与 B 的元素集合
 * @example
 * intersection([1,2,3], [2,3,4]) // => [2,3]
 */
export declare function intersection<T>(a: T[], b: T[]): T[];
/**
 * 使用 Fisher–Yates 算法返回一个随机打乱的新数组（不修改原数组）。
 * @template T 元素类型
 * @param array 源数组
 * @returns 随机顺序的新数组
 * @example
 * shuffle([1,2,3,4]) // => 例如 [3,1,4,2]
 */
export declare function shuffle<T>(array: T[]): T[];
