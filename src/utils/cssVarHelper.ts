/* eslint-disable security/detect-object-injection */
import {VAR_PREFIX} from '../config/defaults';

import {configCache} from './cache';
import {generateMediaString} from './helpers';
import {remapWithPrefix} from './utils';

import type {ExtractedConfig} from '../config/configTypes';
import type {Breakpoints} from '../sharedTypes/breakpointTypes';
import type {RecursiveValues} from '../sharedTypes/helperTypes';

/**
 * Recursively generates CSS custom properties from a deeply nested configuration object.
 * This function walks through a deeply nested object structure, such as the `debug` section of a `Config`,
 * and converts each key-value pair into a CSS variable declaration string. It handles nested objects by
 * appending their keys to the prefix path, using hyphenated naming (e.g., `--prefix-container-outline: value;`).
 * Primitive values like numbers and strings are directly converted into CSS variable definitions.
 * It is primarily used in the `@nfq/react-grid` library to inject debug-related styling variables
 * into the global CSS scope via styled-components or other CSS-in-JS solutions.
 *
 * @param debug  A deeply nested object containing values to convert into CSS variables.
 * @param prefix A string used as the root variable name prefix. Defaults to the global `VAR_PREFIX` constant.
 * @returns A single string containing all resolved CSS variable declarations.
 *
 * @example
 * ```ts
 * const debug = {
 *   container: {
 *     outline: '1px solid red',
 *     background: 'rgba(0,0,0,0.1)',
 *   },
 *   col: {
 *     outline: '1px solid blue',
 *   }
 * };
 *
 * generateRecursiveVars(debug, 'grid-debug');
 * // Returns:
 * // "--grid-debug-container-outline: 1px solid red;
 * //  --grid-debug-container-background: rgba(0,0,0,0.1);
 * //  --grid-debug-col-outline: 1px solid blue;"
 * ```
 */
export const generateRecursiveVars = <T extends RecursiveValues<ExtractedConfig>>(
    debug: T,
    prefix: string = VAR_PREFIX
): string => Object.entries(debug!).flatMap(
        ([key, value]: [string, RecursiveValues<ExtractedConfig> | number | string | null]) => {
            if (typeof value === 'object' && value !== null) {
                return generateRecursiveVars(value, `${prefix}-${key}`);
            }
            if (value === null || value === undefined) {
                return '';
            }

            return `--${prefix}-${key}: ${value};`;
        }
    ).join('');

/**
 * Generates theme-based CSS variable declarations for skeleton loader configurations.
 * This function creates CSS variable scopes for each defined skeleton theme. It uses the
 * `generateRecursiveVars` helper to recursively flatten the nested skeleton variant configuration
 * into CSS custom properties. The default skeleton theme is written into the `:root` scope, while
 * alternate themes are scoped using a custom attribute selector (e.g. `[--skeleton-config="dark"]`).
 * This is particularly useful in the `@nfq/react-grid` system for dynamically switching skeleton styles
 * depending on the selected variant, allowing CSS to conditionally apply based on the theme in use.
 *
 * @param skeleton        The full set of skeleton theme variants with nested configuration values.
 * @param skeletonDefault The name of the default skeleton variant to apply globally (`:root`).
 * @returns A string containing themed CSS custom property blocks for all skeleton variants.
 *
 * @example
 * ```ts
 * const skeleton = {
 *   light: {
 *     animation: {
 *       delay: 0,
 *       direction: 'ltr',
 *       duration: 1000,
 *     },
 *     borderRadius: 4,
 *     colors: {
 *       base: '#eee',
 *       baseHighlight: '#f5f5f5',
 *       highlight: '#fff',
 *     },
 *   },
 *   dark: {
 *     animation: {
 *       delay: 200,
 *       direction: 'rtl',
 *       duration: 1200,
 *     },
 *     borderRadius: 6,
 *     colors: {
 *       base: '#333',
 *       baseHighlight: '#444',
 *       highlight: '#666',
 *     },
 *   },
 * };
 *
 * generateSkeletonVars(skeleton, 'light');
 *
 * // Returns:
 * // :root {
 * //   --nfq-grid-skeleton-animation-delay: 0;
 * //   --nfq-grid-skeleton-animation-direction: ltr;
 * //   ...
 * // }
 * //
 * // [--nfq-grid-skeleton-config="dark"] {
 * //   --nfq-grid-skeleton-animation-delay: 200;
 * //   ...
 * // }
 * ```
 */
export const generateSkeletonVars = <T extends RecursiveValues<ExtractedConfig['skeleton']>>(
    skeleton: T,
    skeletonDefault: string
): string => Object.entries(skeleton).map(
        ([theme, themeValues]) => (theme === skeletonDefault ? `
            :root {
                ${generateRecursiveVars(themeValues, `${VAR_PREFIX}-skeleton`)}
            }
        ` : `
            [data-${VAR_PREFIX}-skeleton-config="${theme}"] {
                ${generateRecursiveVars(themeValues, `${VAR_PREFIX}-skeleton`)}
            }
        `)
    ).join('');

/**
 * Generates global CSS custom properties for the responsive grid layout system used by `@nfq/react-grid`.
 * This function creates CSS variable declarations for all core layout configuration values,
 * including base spacing, column gaps, column counts, container widths, and padding across breakpoints.
 * It uses internal utilities such as `generateSubGridVars` and `mergeVars` to produce properly namespaced,
 * responsive variable declarations. The resulting string is expected to be injected into a global stylesheet.
 * Although the `config` parameter is typed as `any`, it is internally cast to a fully required `Config` object.
 * This ensures that all fields are present and ready for transformation into CSS variables.
 *
 * @param config The resolved configuration object for the layout grid system, including all spacing, columns, and containers.
 * @returns A string of media-aware CSS custom property declarations for layout variables.
 *
 * @example
 * ```tsx
 * const vars = generateGridVars({
 *   baseSpacing: 8,
 *   columnGap: { xs: 8, md: 16 },
 *   columns: { xs: 4, md: 8, lg: 12 },
 *   container: { xs: 'fluid', md: 960, lg: 1200 },
 *   containerPadding: { xs: 8, md: 16, lg: 24 },
 *   breakpoints: { xs: 0, md: 768, lg: 1024 },
 * });
 *
 * // Returns a string like:
 * // ```css
 * // :root {
 * //   --nfq-grid-base-spacing: 8px;
 * //   --nfq-grid-columns: 4;
 * //   --nfq-grid-container: fluid;
 * // }
 * // @media (min-width: 768px) {
 * //   :root {
 * //     --nfq-grid-columns: 8;
 * //     --nfq-grid-container: 960px;
 * //   }
 * // }
 * // etc.
 * ```
 */
export const generateGridVars = (config: any) => {
    const realConfig = config as ExtractedConfig;
    const mediaStrings = mergeVars(
        generateSubGridVars('base-spacing', `${realConfig.baseSpacing}rem`),
        generateSubGridVars('column-gap', remapWithPrefix(realConfig.columnGap as Record<Breakpoints, number>, 'px')),
        generateSubGridVars('columns', realConfig.columns as Record<Breakpoints, number>),
        generateSubGridVars('container', remapWithPrefix(realConfig.container as Record<Breakpoints, number>, 'px')),
        generateSubGridVars(
            'container-padding',
            remapWithPrefix(realConfig.containerPadding as Record<Breakpoints, number>, 'px')
        ),
        generateScreenSizeVars()
    );

    return `${mediaStrings}`;
};

/**
 * Generates CSS custom properties for a specific layout attribute across breakpoints.
 * This utility function is used internally by `@nfq/react-grid` to produce per-breakpoint variable declarations
 * for layout values like spacing, columns, or padding. It reads the current `breakpointOrder` from `configCache`,
 * and maps the given values (either a number or a breakpoint-based record) to CSS variable strings.
 * If a primitive `number` is passed, it is assigned only to the first breakpoint. For records, only defined keys
 * are emitted as variables. Breakpoints without defined values are skipped.
 *
 * @param suffix The suffix used for the variable name (e.g., 'column-gap', 'container-padding').
 * @param data   A number (for global/default value) or a record mapping breakpoints to values.
 * @returns An array of CSS variable declaration strings, one for each breakpoint with a defined value.
 *
 * @example
 * ```ts
 * // Given breakpointOrder = ['xs', 'md', 'lg']
 * generateSubGridVars('column-gap', { xs: 8, md: 16 });
 * // Returns:
 * // [
 * //   '--nfq-grid-column-gap: 8;',
 * //   '--nfq-grid-column-gap: 16;',
 * //   null
 * // ]
 *
 * generateSubGridVars('base-spacing', 8);
 * // Returns:
 * // [
 * //   '--nfq-grid-base-spacing: 8;',
 * //   null,
 * //   null
 * // ]
 * ```
 */
export const generateSubGridVars = (suffix: string, data: Record<Breakpoints, unknown> | string) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    return breakpointOrder.map((screenSize, index) => {
        if (index === 0 && typeof data === 'string') {
            return `--${VAR_PREFIX}-${suffix}: ${data};`;
        } else if (typeof data === 'string') {
            return null;
        }

        const value = data[screenSize] as number | string | undefined;

        if (value === undefined) {
            return null;
        }

        return `--${VAR_PREFIX}-${suffix}: ${value};`;
    });
};

/**
 * Generates CSS custom properties for each breakpoint's name as a screen size identifier.
 * This function iterates over the `breakpointOrder` stored in the internal `configCache` and produces
 * a list of CSS variable declarations where each variable is named `--[prefix]-screen-size` and
 * contains the current breakpoint key. These variables can be used for debugging, theming, or
 * conditionally styling components based on screen context.
 * It is typically used within the grid system to ensure each breakpoint scope includes its own identifier.
 *
 * @returns An array of CSS custom property strings, one for each breakpoint name in the configured order.
 *
 * @example
 * ```ts
 * // Assuming breakpointOrder = ['xs', 'md', 'lg']
 * generateScreenSizeVars();
 * // Returns:
 * // [
 * //   '--nfq-grid-screen-size: xs;',
 * //   '--nfq-grid-screen-size: md;',
 * //   '--nfq-grid-screen-size: lg;'
 * // ]
 * ```
 */
export const generateScreenSizeVars = () => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    return breakpointOrder.map(screenSize => `--${VAR_PREFIX}-screen-size: '${screenSize}';`);
};

/**
 * Merges multiple arrays of CSS variable declarations into media-query-wrapped strings for each breakpoint.
 * This function is used internally in `@nfq/react-grid` to group responsive CSS variables under their
 * respective media queries. It takes multiple arrays of variable declarations (e.g. Generated by
 * `generateSubGridVars`) and merges them per breakpoint. The result is a complete CSS string with variables
 * scoped inside breakpoint-based media queries, using `generateVarMedia` for formatting.
 * Null values and empty strings are filtered out to avoid emitting invalid or unnecessary output.
 * The final result is a concatenated string of valid media query blocks.
 *
 * @param cssStrings Arrays of CSS variable strings (or `null`) indexed by breakpoint order.
 * @returns A merged and media-wrapped CSS string containing all variable declarations.
 *
 * @example
 * ```ts
 * const spacingVars = generateSubGridVars('base-spacing', { xs: 8, md: 12 });
 * const columnVars = generateSubGridVars('columns', { xs: 4, md: 8 });
 *
 * mergeVars(spacingVars, columnVars);
 *
 * // Returns:
 * // :root {
 * //   --grid-base-spacing: 8;
 * //   --grid-columns: 4;
 * // }
 * // @media (min-width: 768px) {
 * //   :root {
 * //     --grid-base-spacing: 12;
 * //     --grid-columns: 8;
 * //   }
 * // }
 * ```
 */
export const mergeVars = (...cssStrings: ((string | null)[])[]) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    return breakpointOrder.map((screenSize, index) => {
        const mediaQuery = cssStrings.map(string => string[index]).filter(Boolean).join('');

        return mediaQuery ? generateVarMedia(screenSize, index, mediaQuery) : null;
    }).join('');
};

/**
 * Wraps a block of CSS variable declarations in a media query, or applies them globally if targeting the first breakpoint.
 * This function is used internally by `@nfq/react-grid` to scope CSS variables to specific breakpoints.
 * For the first breakpoint in the `breakpointOrder`, the variables are applied directly to `:root` without a media query.
 * For all other breakpoints, it wraps the variables in a media query generated via `generateMediaString`.
 * This design ensures global defaults for the smallest screen size, and progressive overrides for larger breakpoints.
 *
 * @param screenSize The name of the current breakpoint (e.g. `'md'`, `'lg'`).
 * @param index      The index of the breakpoint in the resolved breakpoint order.
 * @param query      The CSS variable declarations to inject for the breakpoint.
 * @returns A string containing either a root-level or media-wrapped block of CSS custom properties.
 *
 * @example
 * ```ts
 * generateVarMedia('xs', 0, '--grid-columns: 4;');
 * // Returns:
 * // :root {
 * //   --grid-columns: 4;
 * // }
 *
 * generateVarMedia('md', 1, '--grid-columns: 8;');
 * // Returns:
 * // @media (min-width: 768px) {
 * //   :root {
 * //     --grid-columns: 8;
 * //   }
 * // }
 * ```
 */
export const generateVarMedia = (
    screenSize: Breakpoints,
    index: number,
    query: string
) => {
    if (index === 0) {
        return `
            :root {
                ${query}
            }
        `;
    }

    return `
        @media ${generateMediaString(screenSize)} {
            :root {
                ${query}
            }
        }
    `;
};