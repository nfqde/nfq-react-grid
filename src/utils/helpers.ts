/* eslint-disable security/detect-object-injection */
import {css} from '@emotion/react';

import {defaultMediaQuery} from '../config/defaults';

import {configCache} from './cache';
import {isNotNullOrUndefined} from './utils';

import type {Breakpoints} from '../sharedTypes/breakpointTypes';

/**
 * Merges a partially defined responsive configuration into a compact breakpoint-to-value map.
 * This function iterates through the provided `breakpointOrder` and filters out redundant or undefined values.
 * If a value at a breakpoint is the same as the previous one, or is `undefined`/`null`, it is omitted from the final output.
 * The goal is to minimize duplication while preserving the necessary overrides across breakpoints.
 * This is particularly useful in `@nfq/react-grid` for optimizing the configuration of layout properties such as
 * `columns`, `columnGap`, `container`, or `containerPadding`, ensuring the output only includes meaningful changes.
 *
 * @param conf            A partial record of values indexed by breakpoint names.
 * @param breakpointOrder An ordered array of breakpoints that determines iteration and override hierarchy.
 * @returns A cleaned-up version of the input object, where only distinct and defined breakpoint values are preserved.
 *
 * @example
 * ```ts
 * const result = mergeScreens(
 *   { xs: 4, md: 4, lg: 8, xl: undefined },
 *   ['xs', 'md', 'lg', 'xl']
 * );
 *
 * // Returns:
 * // {
 * //   xs: 4,
 * //   lg: 8
 * // }
 * ```
 */
export const mergeScreens = <T extends Partial<Record<Breakpoints, unknown>>>(
    conf: T,
    breakpointOrder: Breakpoints[]
): T => {
    let lastValue: T[keyof T] = 0 as T[keyof T];

    return breakpointOrder.map((screenSize, index) => {
        if ((index === 0 && conf[screenSize] === undefined) || (index === 0 && conf[screenSize] === lastValue)) {
            return {
                key: screenSize,
                val: lastValue
            };
        }

        if (conf[screenSize] === undefined || conf[screenSize] === null || conf[screenSize] === lastValue) {
            return null;
        }

        lastValue = conf[screenSize] as T[keyof T];

        return {
            key: screenSize,
            val: lastValue
        };
    }).filter(isNotNullOrUndefined).reduce<T>((acc, {key, val}) => {
        acc[key] = val;

        return acc;
    }, {} as T);
};

/**
 * Generates a responsive media query string for a given breakpoint name.
 * This function retrieves the pixel value for the provided `screenSize` from the internal `configCache`
 * and constructs a full media query string. If the value is `>= 0`, it appends a `min-width` condition
 * to the base query. Otherwise, it returns just the `defaultMediaQuery`, allowing for flexible control
 * over the breakpoint system in `@nfq/react-grid`.
 * This is typically used to wrap CSS variable definitions or other rules inside a media query
 * matching the layout’s responsive breakpoint thresholds.
 *
 * @param screenSize The name of the breakpoint (e.g. `'xs'`, `'md'`, `'xl'`) for which to generate the query.
 * @returns A complete CSS media query string for the given breakpoint.
 *
 * @example
 * ```ts
 * // Assuming breakpoints = { xs: 0, md: 768, lg: 1024 }
 * generateMediaString('md');
 * // Returns: "@media screen and (min-width: 768px)"
 * ```
 */
export const generateMediaString = (screenSize: Breakpoints) => {
    const {breakpoints} = configCache.get('breakpointConfig')!;

    return `${defaultMediaQuery}${breakpoints[screenSize] >= 0 ? ` and (min-width: ${breakpoints[screenSize]}px)` : ''}`;
};

/**
 * Generates a media query string that targets a specific range between two breakpoints.
 * This function is used within the `@nfq/react-grid` system to create responsive rules that apply
 * between a minimum and a maximum screen size. It fetches the pixel values of the provided breakpoints
 * from the internal `configCache` and generates a media query with both `min-width` and `max-width` constraints.
 * The `max-width` is adjusted by subtracting 1px to prevent overlapping with the next breakpoint range.
 * This ensures that ranges are exclusive and do not collide with larger breakpoints.
 *
 * @param screenSizeMin The name of the minimum breakpoint (inclusive).
 * @param screenSizeMax The name of the maximum breakpoint (exclusive).
 * @returns A full media query string covering the range from `screenSizeMin` to just below `screenSizeMax`.
 *
 * @example
 * ```ts
 * // Assuming breakpoints = { sm: 576, md: 768, lg: 1024 }
 * generateMediaStringBetween('sm', 'lg');
 * // Returns: "@media screen and (min-width: 576px) and (max-width: 1023px)"
 * ```
 */
export const generateMediaStringBetween = (
    screenSizeMin: Breakpoints,
    screenSizeMax: Breakpoints
) => {
    const {breakpoints} = configCache.get('breakpointConfig')!;

    return `${defaultMediaQuery} and (min-width: ${breakpoints[screenSizeMin]}px) and (max-width: ${breakpoints[screenSizeMax] - 1}px)`;
};

/**
 * Generates a media-query-wrapped CSS block for a specific breakpoint.
 * This utility function is used internally by the `@nfq/react-grid` system to apply CSS styles
 * conditionally based on a single breakpoint. It returns a tagged template function that can be used
 * with `styled-components` or `emotion` to wrap styles in a `@media` query targeting the given `screenSize`.
 * It leverages the internal `generateMediaString()` function to resolve the correct `min-width` query.
 *
 * @param screenSize The breakpoint to generate the media query for (e.g. `'md'`, `'lg'`, `'xl'`).
 * @returns A tagged template function that wraps styles in a media query for the given screen size.
 *
 * @example
 * ```tsx
 * const StyledBox = styled.div`
 *   color: red;
 *   ${mediaInternal('md')`
 *     color: blue;
 *     padding: 2rem;
 *   `}
 * `;
 * ```
 */
export const mediaInternal = (screenSize: Breakpoints) => (...args: [TemplateStringsArray, ...(string | null)[]]) => css`
        @media ${generateMediaString(screenSize)} {
            ${css(...args)}
        }
    `;