import {css} from '@emotion/react';

import {configCache} from '../utils/cache';
import {generateGridVars, generateRecursiveVars, generateSkeletonVars} from '../utils/cssVarHelper';
import {mergeScreens} from '../utils/helpers';
import {fillObject, mergeDeep} from '../utils/utils';

import {
    defaultBaseSpacing,
    defaultBreakpoints,
    defaultColumnGap,
    defaultColumns,
    defaultContainerPadding,
    defaultDebug,
    defaultSkeleton,
    defaultSkeletonDefault,
    VAR_PREFIX
} from './defaults';

import type {Config, ExtractedConfig} from './configTypes';
import type {Breakpoints} from '../sharedTypes/breakpointTypes';
import type {Mutable} from 'src/sharedTypes/helperTypes';

/**
 * Creates a fully merged and themed configuration object for `@nfq/react-grid`, resolving all layout,
 * breakpoint, and visual styling options into a CSS-in-JS template using @emotion/styled.
 *
 * This utility is the core configuration entry point for the `@nfq/react-grid` layout system. It takes in
 * a configuration object and an optional custom breakpoint tuple, merges it with defaults, and outputs
 * the necessary CSS variables for grid layout, spacing, container widths, debug outlines, and skeleton loaders.
 *
 * The result should be injected into a global style block using `@emotion/styled` or similar libraries
 * to make the design tokens available throughout the application.
 *
 * @param breakpoints A tuple of valid breakpoints used to drive responsive design. If not defined, defaults to the standard breakpoint list.
 * @param config      The configuration object defining columns, container sizes, skeleton themes, debug colors, and spacing.
 * @returns A `css` template literal containing all grid system variables and debug/skeleton configuration for injection.
 *
 * @example
 * ```tsx
 * const cssVars = createConfig(['xs', 'sm', 'md'], {
 *   baseSpacing: 0.5,
 *   breakpoints: { xs: 320, sm: 576, md: 768 },
 *   columns: { xs: 4, sm: 8, md: 12 },
 *   columnGap: { xs: 8, sm: 12, md: 16 },
 *   container: { xs: 'fluid', sm: 512, md: 960 },
 *   containerPadding: { xs: 16, sm: 24, md: 32 },
 *   skeleton: {
 *     light: {
 *       animation: {
 *         delay: 0,
 *         direction: 'ltr',
 *         duration: 1200,
 *       },
 *       borderRadius: 4,
 *       colors: {
 *         base: '#eee',
 *         baseHighlight: '#f5f5f5',
 *         highlight: '#fff',
 *       }
 *     }
 *   },
 *   skeletonDefault: 'light'
 * });
 * ```
 */
export const createConfig = <
    Conf extends Config<SkeletonStyles, Mutable<BreakpointsTuple>>,
    SkeletonStyles extends string,
    const BreakpointsTuple extends readonly Breakpoints[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
>(
        breakpoints: BreakpointsTuple,
        config: Conf
    ) => {
    const resolvedBreakpoints = breakpoints as Mutable<BreakpointsTuple>;
    const mergedConfig = {
        baseSpacing: config.baseSpacing ?? defaultBaseSpacing,
        breakpoints: mergeScreens(
            resolvedBreakpoints.reduce(
                (acc, curr) => ({
                    ...acc,
                    // eslint-disable-next-line security/detect-object-injection
                    [curr]: config.breakpoints?.[curr as keyof typeof config.breakpoints] ?? defaultBreakpoints[curr]
                }),
                {} as Record<Breakpoints, number>
            ), resolvedBreakpoints
        ),
        columnGap: mergeScreens(
            config.columnGap
            ?? fillObject<NonNullable<typeof config.columnGap>, typeof defaultColumnGap>(
                resolvedBreakpoints,
                defaultColumnGap
            ),
            resolvedBreakpoints
        ),
        columns: mergeScreens(
            config.columns
            ?? fillObject<NonNullable<typeof config.columns>, typeof defaultColumns>(
                resolvedBreakpoints,
                defaultColumns
            ),
            resolvedBreakpoints
        ),
        container: mergeScreens(config.container, resolvedBreakpoints),
        containerPadding: mergeScreens(
            config.containerPadding
            ?? fillObject<NonNullable<typeof config.containerPadding>, typeof defaultContainerPadding>(
                resolvedBreakpoints,
                defaultContainerPadding
            ),
            resolvedBreakpoints
        ),
        debug: mergeDeep(defaultDebug, config.debug ?? {}),
        skeleton: config.skeleton ?? defaultSkeleton,
        skeletonDefault: config.skeletonDefault ?? defaultSkeletonDefault
    };

    configCache.set('breakpointConfig', {
        breakpointOrder: resolvedBreakpoints,
        breakpoints: mergedConfig.breakpoints
    });

    return {
        configType: mergedConfig as unknown as Conf,
        globalCss: css`
        ${generateGridVars(mergedConfig)};
        :root {
            ${generateRecursiveVars(mergedConfig.debug, `${VAR_PREFIX}-debug`)};
        }
        ${generateSkeletonVars(mergedConfig.skeleton as NonNullable<ExtractedConfig['skeleton']>, mergedConfig.skeletonDefault)}
    `
    };
};