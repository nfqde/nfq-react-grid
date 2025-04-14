import type {Breakpoints} from '../sharedTypes/breakpointTypes';
import type {RecursiveRequired} from '../sharedTypes/helperTypes';

/**
 * Determines whether a given value is a plain object (excluding arrays and null).
 * This function checks if the input is truthy, has a type of `'object'`, and is not an array.
 * It is commonly used to validate values before performing deep merging, recursion, or object-based operations.
 *
 * @param item The value to test.
 * @returns `true` if the value is a non-null object and not an array, otherwise `false`.
 *
 * @example
 * ```ts
 * isObject({ key: 'value' }); // true
 * isObject(null);             // false
 * isObject([1, 2, 3]);        // false
 * isObject('string');         // false
 * ```
 */
export const isObject = <T>(item: T) => Boolean((item && typeof item === 'object' && !Array.isArray(item)));

/**
 * Type guard that checks whether a value is neither `null` nor `undefined`.
 * This function is often used in array filtering and control flow to ensure
 * that a value is safe to operate on. It also enables TypeScript to narrow the type
 * from `T | null | undefined` to just `T` when used in conditional branches or filters.
 *
 * @param input The value to check, which may be `null` or `undefined`.
 * @returns `true` if the value is not `null` and not `undefined`, otherwise `false`.
 *
 * @example
 * ```ts
 * const values = [1, null, 2, undefined, 3];
 * const filtered = values.filter(isNotNullOrUndefined); // type: number[]
 * // filtered = [1, 2, 3]
 * ```
 */
export const isNotNullOrUndefined = <T extends object>(
    input: T | null | undefined
): input is T => input !== null && typeof input !== 'undefined';

/**
 * Fills an object with a default value for each breakpoint.
 * This utility function is used in the `@nfq/react-grid` system to generate a complete
 * record of breakpoints with a shared default value. It ensures that all specified
 * breakpoints are initialized with the same value, typically used for spacing, padding,
 * or grid-related settings.
 * The result is cast to a generic return type `R`, allowing flexible use with strict typings.
 *
 * @param breakpoints  An array of breakpoint keys to use as object properties.
 * @param defaultValue The value to assign to each breakpoint key.
 * @returns An object with all provided breakpoints as keys, each assigned the default value.
 *
 * @example
 * ```ts
 * const filled = fillObject<Record<Breakpoints, number>, number>(
 *   ['xs', 'md', 'lg'],
 *   16
 * );
 *
 * // filled = {
 * //   xs: 16,
 * //   md: 16,
 * //   lg: 16
 * // }
 * ```
 */
export const fillObject = <R, T>(
    breakpoints: Breakpoints[],
    defaultValue: T
): R => breakpoints.reduce<Record<Breakpoints, T>>(
    (acc, curr) => ({
        ...acc,
        [curr]: defaultValue
    }),
    {} as Record<Breakpoints, T>
) as R;

/**
 * Deeply merges two objects, recursively combining nested properties.
 * This function performs a deep merge between the `target` and `source` objects,
 * mutating the `target` and copying all properties from `source`. If both objects
 * contain a property that is itself an object, `mergeDeep` recurses into that property.
 * Scalar values from `source` will overwrite those in `target`.
 * The result is returned as a fully required version of the union of both input types,
 * using `RecursiveRequired<T & S>` to ensure all deeply nested values are defined.
 * This is used in `@nfq/react-grid` to merge user configurations with default values.
 *
 * @param target The target object to merge into. This object will be mutated.
 * @param source The source object to merge from. If omitted, the target is returned as-is.
 * @returns The deeply merged object as a required type.
 *
 * @example
 * ```ts
 * const defaultConfig = {
 *   debug: {
 *     col: { outline: '#f00' },
 *   },
 * };
 *
 * const userConfig = {
 *   debug: {
 *     col: { background: '#000' },
 *     container: { outline: '#0f0' }
 *   }
 * };
 *
 * const result = mergeDeep(defaultConfig, userConfig);
 * // result = {
 * //   debug: {
 * //     col: { outline: '#f00', background: '#000' },
 * //     container: { outline: '#0f0' }
 * //   }
 * // }
 * ```
 */
export const mergeDeep = <T extends object, S extends object>(target: T, source?: S): RecursiveRequired<T & S> => {
    if (!source) {
        return target as RecursiveRequired<T & S>;
    }

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key as keyof typeof source])) {
                if (!target[key as keyof typeof target]) {
                    Object.assign(target, {[key]: {}});
                }

                mergeDeep(target[key as keyof typeof target] as object, source[key as keyof typeof source] as object);
            } else {
                Object.assign(target, {[key]: source[key as keyof typeof source]});
            }
        });
    }

    return target as RecursiveRequired<T & S>;
};

/**
 * Remaps the values of a breakpoint record by appending a string prefix to numeric values.
 * This utility is used in `@nfq/react-grid` to normalize breakpoint values into valid CSS values.
 * It iterates over each entry in the input object and ensures that all values are returned as strings.
 * If a value is a number, the provided `prefix` (e.g., `'px'`) is appended. String values are passed through unchanged.
 * This is useful when preparing data for CSS variable output or styling logic that requires consistent string values.
 *
 * @param obj    A record of breakpoints with numeric or string values.
 * @param prefix The unit or suffix string to append to numeric values (e.g., `'px'`, `'rem'`).
 * @returns A new record with all values cast to strings, with numeric values suffixed.
 *
 * @example
 * ```ts
 * const input = { xs: 0, md: 768, lg: '100%' };
 * const result = remapWithPrefix(input, 'px');
 *
 * // result = {
 * //   xs: '0px',
 * //   md: '768px',
 * //   lg: '100%'
 * // }
 * ```
 */
export const remapWithPrefix = (obj: Record<Breakpoints, number | string>, prefix: string) => Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
        key,
        // eslint-disable-next-line no-nested-ternary
        typeof value === 'string' ? value === 'fluid' ? '100%' : value : `${value}${prefix}`
    ])
) as Record<Breakpoints, string>;