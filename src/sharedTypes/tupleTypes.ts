/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * Converts a tuple type into a union of its element types.
 * This is commonly used to extract all values from a tuple into a flat union type.
 *
 * @example
 * ```ts
 * type Example = TupleToUnion<['a', 'b', 'c']>; // 'a' | 'b' | 'c'
 * ```
 */
export type TupleToUnion<T extends readonly any[]> = T[number];

/**
 * Produces the intersection of two types `A` and `B`.
 * Used in type-level logic to combine constraints or extract overlapping keys.
 */
export type Intersect<A, B> = A & B;

/**
 * Computes the difference between two union types.
 * Removes from `A` any values assignable to `B`, producing the leftover types.
 * Often used to detect "missing" or "extra" members.
 *
 * @example
 * ```ts
 * type A = 'a' | 'b' | 'c';
 * type B = 'b';
 * type Result = Diff<A, B>; // 'a' | 'c'
 * ```
 */
export type Diff<A, B> = A extends B ? never : A;

/**
 * Extracts the first element of a readonly tuple.
 * Returns `never` if the tuple is empty.
 *
 * @example
 * ```ts
 * type First = Head<['xs', 'sm', 'md']>; // 'xs'
 * ```
 */
export type Head<T extends readonly any[]> = T extends readonly [infer H, ...any[]] ? H : never;

/**
 * Returns all but the first element of a readonly tuple.
 * If the tuple has only one element, an empty tuple is returned.
 *
 * @example
 * ```ts
 * type Rest = Tail<['xs', 'sm', 'md']>; // ['sm', 'md']
 * ```
 */
export type Tail<T extends readonly any[]> = T extends readonly [any, ...infer R] ? R : never;

/**
 * Creates an object type where.
 * - The first key from a tuple is **required**
 * - All subsequent keys are **optional**
 * - Any valid key that is not in the tuple is also optional.
 *
 * This is useful for configuring responsive layout values where the smallest breakpoint
 * (first in the tuple) must be defined, and the rest may override it.
 *
 * @example
 * ```ts
 * type Columns = PartialExceptFirstFromTuple<['xs', 'md', 'lg'], 'xs' | 'md' | 'lg' | 'xl'>;
 * // {
 * //   xs: number;
 * //   md?: number;
 * //   lg?: number;
 * //   xl?: number;
 * // }
 * ```
 */
export type PartialExceptFirstFromTuple<
    Tuple extends readonly string[],
    ValidKeys extends string,
    Value = number
> = (Head<Tuple> extends ValidKeys
    ? Record<Head<Tuple>, Value> : {})
    & (Tail<Tuple>[number] extends infer T
        ? T extends string
            ? T extends ValidKeys
                ? Partial<Record<T, Value>>
                : {}
            : {}
        : {})
    & Partial<Record<Diff<ValidKeys, Tuple[number]>, Value>>;