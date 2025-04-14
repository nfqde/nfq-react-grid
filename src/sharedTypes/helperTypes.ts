/**
 * Utility type that checks whether all properties of a type `T` are optional.
 * It returns `true` if all properties are optional or if `T` has no keys.
 * Otherwise, it returns `false`. This is useful for conditional types that depend
 * on whether a given type is fully optional or requires certain keys.
 */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style, @typescript-eslint/no-empty-object-type */
export type IsFullyOptional<T> = keyof T extends never
    ? true
    : {[K in keyof T]-?: undefined extends T[K] ? never : K;}[keyof T] extends never
        ? true
        : false;

/**
 * Recursively marks all properties in an object type as required, including deeply nested objects.
 * This type ensures that all properties and sub-properties must be defined, removing any `undefined`
 * or optional modifiers from the entire structure. It is useful when needing to ensure full resolution
 * of deeply nested configurations.
 */
export type RecursiveRequired<T> = Required<{
    [P in keyof T]: T[P] extends object | undefined ? RecursiveRequired<Required<T[P]>> : T[P];
}>;

/**
 * Extracts all possible leaf values from a nested object type recursively.
 * This utility is commonly used to flatten or introspect the values within a deeply nested object
 * by reducing the structure to a union of all its terminal values. If a value is itself an object,
 * the recursion continues until non-object values are reached.
 */
export type RecursiveValues<T> = T extends object
    ? {[K in keyof T]: RecursiveValues<T[K]>;}[keyof T] | T
    : never;

export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};