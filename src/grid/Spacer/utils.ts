import {configCache} from '../../utils/cache';

import type {Breakpoints} from '../../sharedTypes/breakpointTypes';
import type {SpacerObject} from '../../sharedTypes/componentTypes';

/**
 * Props used internally to determine whether a spacer should be rendered inline or as a block element.
 * This interface is typically used in styled-components or utility functions within the `@nfq/react-grid` system.
 * The `$isInline` property can either be a global `boolean` or a responsive `Breakpoints[]` array to control inline behavior conditionally.
 */
interface CalcSpacerInlineProps {
    /**
     * Controls whether the spacer behaves like an inline element.
     * - If `true`, the spacer will render as an inline element and not break to a new line.
     * - If `false`, it behaves like a block element.
     * - If an array of `Breakpoints` is provided, inline behavior is applied only at the specified breakpoints.
     */
    $isInline?: Breakpoints[] | boolean;
}

/**
 * Computes responsive `display` styles for a spacer element based on the `$isInline` prop.
 * This function is used internally by the `@nfq/react-grid` system to determine whether a spacer
 * should render as a `block` or `inline-block` element at each breakpoint. It uses the breakpoint
 * order from the configuration cache and generates minimal CSS declarations by avoiding redundant styles.
 * If `$isInline` is passed as a boolean:
 * - `true` means all breakpoints will use `inline-block`.
 * - `false` means all breakpoints will use `block`.
 * If passed as an array of `Breakpoints`, only the specified breakpoints will render the spacer as `inline-block`.
 *
 * @param props           The props object containing the `$isInline` property.
 * @param props.$isInline The inline mode configuration, either a boolean or list of responsive breakpoints.
 * @returns An array of CSS declarations like `display: inline-block;` or `display: block;`, one for each breakpoint.
 *
 * @example
 * ```ts
 * // Always inline
 * calcSpacerInline({ $isInline: true });
 * // => ['display: inline-block;', null, null, ...]
 *
 * // Only inline on 'md' and 'lg'
 * calcSpacerInline({ $isInline: ['md', 'lg'] });
 * // => [ 'display: block;', 'display: inline-block;', 'display: inline-block;', ... ]
 * ```
 */
export const calcSpacerInline = ({$isInline}: CalcSpacerInlineProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    if (!Array.isArray($isInline)) {
        // eslint-disable-next-line no-param-reassign
        $isInline = $isInline ? breakpointOrder : [];
    }

    let lastInline: 'block' | 'inline-block';
    const mediaQuery = breakpointOrder.map(screenSize => {
        const inline = $isInline.includes(screenSize) ? 'inline-block' : 'block';

        if (inline !== lastInline) {
            lastInline = inline;

            return `display: ${inline};`;
        }

        return null;
    });

    return mediaQuery;
};

/**
 * Props for calculating horizontal and vertical spacing values for a spacer element.
 * This interface is used internally by the `@nfq/react-grid` system to define spacing values
 * that are either static (single number) or responsive (via a `SpacerObject`).
 * These values are used to compute margin or padding in both flex and block layouts.
 */
interface CalcSpacerMeasuresProps {
    /**
     * The horizontal spacing size.
     * Can be a single number (used as a multiplier or pixel value) or a `SpacerObject`
     * defining values per breakpoint. This controls horizontal space such as `margin-left` and `margin-right`.
     */
    $x?: SpacerObject | number;
    /**
     * The vertical spacing size.
     * Can be a single number (used as a multiplier or pixel value) or a `SpacerObject`
     * defining values per breakpoint. This controls vertical space such as `margin-top` and `margin-bottom`.
     */
    $y?: SpacerObject | number;
}

/**
 * Generates responsive CSS custom property declarations for horizontal (`x`) or vertical (`y`) spacing.
 * This utility is used in the `@nfq/react-grid` system to convert a given spacing value (either static or responsive)
 * into a list of CSS variable declarations based on the active breakpoints defined in the configuration.
 * If a single number is provided, it is applied only to the `xs` breakpoint.
 * If a `SpacerObject` is provided, the function maps the values to each breakpoint in the configured order,
 * outputting CSS variables in the format: `--nfq-grid-spacer-x` or `--nfq-grid-spacer-y`.
 * The returned array can be injected into media query blocks to apply the correct spacing at each breakpoint.
 *
 * @param propKey Either `'x'` or `'y'`, indicating whether horizontal or vertical spacing is being calculated.
 * @returns A function that takes spacing props and returns an array of CSS variable declarations for each breakpoint.
 *
 * @example
 * ```ts
 * const xSpacing = calcSpacerMeasures('x')({ $x: { xs: 1, md: 2 } });
 * // => [
 * //   '--nfq-grid-spacer-x: 1;',
 * //   '--nfq-grid-spacer-x: 2;',
 * //   null,
 * //   ...
 * // ]
 *
 * const ySpacing = calcSpacerMeasures('y')({ $y: 2 });
 * // => [
 * //   '--nfq-grid-spacer-y: 2;',
 * //   null,
 * //   null,
 * //   ...
 * // ]
 * ```
 */
export const calcSpacerMeasures = (
    propKey: 'x' | 'y'
// eslint-disable-next-line security/detect-object-injection
) => ({[`$${propKey}` as const]: value}: CalcSpacerMeasuresProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    if (typeof value !== 'object') {
        // eslint-disable-next-line no-param-reassign
        value = {xs: value};
    }

    const mediaQuery = breakpointOrder.map(screenSize => {
        // eslint-disable-next-line security/detect-object-injection
        const currentValue = value[screenSize];

        if (currentValue !== undefined) {
            return `--nfq-grid-spacer-${propKey}: ${currentValue};`;
        }

        return null;
    });

    return mediaQuery;
};

/**
 * Props used internally to calculate maximum spacer constraints and stretching behavior.
 * This interface is used in the layout logic of the `@nfq/react-grid` system to define how a spacer
 * should behave across breakpoints, particularly in flex containers. It includes support for
 * stretch prevention, maximum spacing constraints, and base spacing definitions.
 */
interface CalcMaxSpacerMeasuresProps {
    /**
     * Controls whether the spacer should avoid stretching in a flex container.
     * - If `true`, the spacer will not stretch to fill its container.
     * - If `false`, the spacer will stretch.
     * - If an array of `Breakpoints` is provided, stretch prevention is applied conditionally per breakpoint.
     */
    $isNotStretching?: Breakpoints[] | boolean;
    /**
     * The maximum horizontal spacing allowed for the spacer.
     * Acts as a multiplier of the theme’s `baseSpacing` value. Can be a static number or
     * a responsive object that varies across breakpoints.
     */
    $maxX?: SpacerObject | number;
    /**
     * The maximum vertical spacing allowed for the spacer.
     * Works the same as `$maxX`, but applied to vertical spacing. Supports static or responsive values.
     */
    $maxY?: SpacerObject | number;
    /**
     * The base horizontal spacing size.
     * In a flex context, this is a multiplier of the `baseSpacing` value.
     * In a non-flex context, it's treated as a raw pixel value. Accepts static or responsive values.
     */
    $x?: SpacerObject | number;
    /**
     * The base vertical spacing size.
     * Works the same as `$x`, but applied to vertical layout spacing. Accepts static or responsive values.
     */
    $y?: SpacerObject | number;
}

const spacerMaxCssKeys = {
    x: ['$maxX', '$x'] as const,
    y: ['$maxY', '$y'] as const
};

/**
 * Computes responsive CSS custom properties for a spacer's maximum size based on stretch behavior and constraints.
 * This function is used internally by the `@nfq/react-grid` system to calculate the `--nfq-grid-spacer-max-x` or
 * `--nfq-grid-spacer-max-y` CSS variable for each breakpoint. It intelligently resolves values from the
 * spacer's configuration, such as maximum values (`maxX`, `maxY`) and base values (`x`, `y`), while
 * respecting the `isNotStretching` setting to optionally constrain the spacer only when stretching is disabled.
 * It supports both scalar values and responsive objects (`SpacerObject`) for maximum and base spacing inputs,
 * and ensures only changed values are emitted across breakpoints to avoid redundant CSS.
 *
 * @param propKey Either `'x'` or `'y'`, indicating which axis to apply the max constraint on.
 * @returns A function that accepts `CalcMaxSpacerMeasuresProps` and returns a list of CSS variable declarations.
 *
 * @example
 * ```ts
 * const maxX = calcSpacerMaxValues('x')({
 *   $x: { xs: 1, md: 2 },
 *   $maxX: { xs: 3, md: 4 },
 *   $isNotStretching: ['md', 'lg']
 * });
 *
 * // Output:
 * // [
 * //   '--nfq-grid-spacer-max-x: 3;',
 * //   '--nfq-grid-spacer-max-x: 4;',
 * //   ...
 * // ]
 * ```
 */
export const calcSpacerMaxValues = (
    propKey: 'x' | 'y'
) => ({$isNotStretching, ...componentProps}: CalcMaxSpacerMeasuresProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;
    // eslint-disable-next-line security/detect-object-injection
    let max = componentProps[spacerMaxCssKeys[propKey][0]];
    // eslint-disable-next-line security/detect-object-injection
    let auto = componentProps[spacerMaxCssKeys[propKey][1]];

    if (typeof auto !== 'object') {
        // eslint-disable-next-line no-param-reassign
        auto = {xs: auto};
    }
    if (typeof max !== 'object') {
        // eslint-disable-next-line no-param-reassign
        max = {xs: max};
    }
    if (!Array.isArray($isNotStretching)) {
        // eslint-disable-next-line no-param-reassign
        $isNotStretching = $isNotStretching ? breakpointOrder : [];
    }

    let lastAuto: number | undefined;
    let lastMax: number | undefined;
    let lastRealCss: number | string | null;
    const mediaQuery = breakpointOrder.map(screenSize => {
        // eslint-disable-next-line security/detect-object-injection
        const currentAuto = auto[screenSize];
        // eslint-disable-next-line security/detect-object-injection
        const currentMax = max[screenSize];
        const currentNoStretch = $isNotStretching.includes(screenSize);

        if (currentAuto !== undefined) {
            lastAuto = currentAuto;
        }
        if (currentMax !== undefined) {
            lastMax = currentMax;
        }

        const realMax = currentMax ?? lastMax;
        const realAuto = currentAuto ?? lastAuto;
        let realCss = null;

        if (realMax !== undefined) {
            realCss = realMax;
        } else if (currentNoStretch) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            realCss = realAuto ?? null;
        } else if (lastRealCss) {
            realCss = 'initial';
        }

        if (realCss !== lastRealCss && realCss !== null) {
            lastRealCss = realCss;

            return `--nfq-grid-spacer-max-${propKey}: ${realCss};`;
        }

        return null;
    });

    return mediaQuery;
};