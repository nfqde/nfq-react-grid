import {configCache} from './cache';
import {generateMediaString, generateMediaStringBetween} from './helpers';

import type {Breakpoints} from '../sharedTypes/breakpointTypes';

/**
 * Calculates a spacing value based on the configured base spacing unit.
 * This utility is part of the `@nfq/react-grid` system and returns a CSS `calc()` expression
 * that multiplies the global `--nfq-grid-base-spacing` variable by a given numeric factor.
 * It ensures consistent spacing throughout your layout using theme-defined spacing units.
 * This function is typically used in styled-components, inline styles, or CSS-in-JS utilities
 * to enforce consistent vertical or horizontal margins, padding, and layout gaps.
 *
 * @param space A numeric multiplier for the base spacing (e.g., `1`, `2.5`, `-1`).
 * @returns A CSS `calc()` string that represents the computed spacing value.
 *
 * @example
 * ```ts
 * const padding = spacing(2); // "calc(var(--nfq-grid-base-spacing) * 2)"
 *
 * const Box = styled.div`
 *   padding: ${spacing(1.5)};
 * `;
 * ```
 */
export const spacing = (space: number) => `calc(var(--nfq-grid-base-spacing) * ${space})`;

/**
 * Retrieves the current screen size based on the CSS variable set by the grid system.
 * This function reads the `--nfq-grid-screen-size` CSS custom property from the `<body>` element
 * to determine the active breakpoint in use. It is designed to work in conjunction with the
 * `@nfq/react-grid` system, which injects this value as part of its layout variable output.
 * In server-side or non-browser environments, where `window` is not defined, it falls back to returning
 * the last breakpoint in the configured `breakpointOrder`, which typically represents the largest screen size.
 *
 * @returns The current breakpoint name as defined in the configuration (e.g., `'xs'`, `'md'`, `'xl'`).
 *
 * @example
 * ```ts
 * const size = getScreenSize();
 * // size might be 'sm', 'md', 'lg', etc., depending on window size
 * ```
 */
export const getScreenSize = () => {
    if (typeof window === 'undefined') {
        // eslint-disable-next-line @nfq/no-magic-numbers
        return configCache.get('breakpointConfig')!.breakpointOrder.at(-1)!;
    }
    // eslint-disable-next-line react-hooks-ssr/react-hooks-global-ssr
    const screenSize = window.getComputedStyle(document.body)
        .getPropertyValue('--nfq-grid-screen-size').replaceAll('\'', '').trim();

    return screenSize as Breakpoints;
};

/**
 * Generates a raw CSS media query string for a given breakpoint.
 * This utility is used within the `@nfq/react-grid` system to construct media query strings
 * based on configured breakpoint values. It leverages `generateMediaString()` to resolve the correct
 * `min-width` media condition for the specified screen size.
 * Unlike `mediaInternal`, this function returns the media query string directly,
 * allowing it to be used in manual or external styling logic.
 *
 * @param screenSize The name of the breakpoint to generate the media query for (e.g., `'sm'`, `'md'`, `'xl'`).
 * @returns A string representing a complete `@media` rule for the given breakpoint.
 *
 * @example
 * ```ts
 * const query = media('lg');
 * // query = "@media screen and (min-width: 1024px)"
 *
 * const style = `
 *   ${query} {
 *     display: grid;
 *   }
 * `;
 * ```
 */
export const media = (screenSize: Breakpoints) => `@media ${generateMediaString(screenSize)}`;

/**
 * Generates a CSS media query string that targets a range between two breakpoints.
 * This utility is used within the `@nfq/react-grid` system to create `@media` rules
 * that apply styles only between two defined breakpoints. The resulting query uses
 * both `min-width` and `max-width` to define an inclusive range, with the upper bound
 * being exclusive (`max-width - 1px`) to avoid overlap.
 * It is useful for applying styles that should only affect a specific screen size range.
 *
 * @param screenSizeMin The lower bound breakpoint (inclusive).
 * @param screenSizeMax The upper bound breakpoint (exclusive).
 * @returns A full CSS `@media` rule string for the specified breakpoint range.
 *
 * @example
 * ```ts
 * const query = mediaBetween('sm', 'lg');
 * // query = "@media screen and (min-width: 576px) and (max-width: 1023px)"
 *
 * const styles = `
 *   ${query} {
 *     padding: 2rem;
 *   }
 * `;
 * ```
 */
export const mediaBetween = (screenSizeMin: Breakpoints, screenSizeMax: Breakpoints) => `@media ${generateMediaStringBetween(screenSizeMin, screenSizeMax)}`;