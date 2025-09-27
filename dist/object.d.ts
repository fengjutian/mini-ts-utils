export declare function isObject(value: any): value is Record<string, any>;
export declare function mergeDeep<T>(target: T, ...sources: any[]): T;
export declare function pick<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K>;
export declare function omit<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K>;
export declare function get<T, R = any>(obj: T, path: string, defaultVal?: R): R;
