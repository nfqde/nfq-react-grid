import {configCache} from '../../utils/cache';

import type {Breakpoints} from '../../sharedTypes/breakpointTypes';
import type {SizesObject} from 'src/sharedTypes/componentTypes';

/**
 * Props used to calculate responsive container padding behavior.
 * This interface is used internally by the `@nfq/react-grid` system to determine
 * whether horizontal padding should be applied to a container at specific breakpoints.
 * It supports a `boolean` for global disabling or a `Breakpoints[]` array for conditional logic.
 */
interface calcContainerPaddingProps {
    /**
     * Controls whether the container should have no horizontal padding.
     * - If `true`, padding is removed across all breakpoints.
     * - If an array of `Breakpoints` is provided, padding is removed only at those breakpoints.
     * - If omitted or `false`, padding is applied according to the grid configuration.
     */
    $hasNoPadding?: Breakpoints[] | boolean;
}

/**
 * Computes responsive CSS custom property declarations for container padding.
 * This utility is part of the `@nfq/react-grid` system and generates a set of CSS variable
 * assignments for the container's horizontal padding across breakpoints. It uses the
 * `--nfq-grid-container-no-padding` variable to toggle padding on or off depending on the
 * value of the `$hasNoPadding` prop.
 * If the prop is a boolean:
 * - `true` removes padding for all breakpoints.
 * - `false` keeps default padding applied.
 * If the prop is an array of `Breakpoints`, padding is removed only at the specified breakpoints.
 * The function returns an array of CSS strings to be injected into responsive style rules.
 *
 * @param props               The props object containing the `$hasNoPadding` property.
 * @param props.$hasNoPadding A boolean or breakpoint array indicating where padding should be removed.
 * @returns An array of CSS variable declarations for each breakpoint.
 *
 * @example
 * ```ts
 * calcContainerPadding({ $hasNoPadding: ['md', 'lg'] });
 * // [
 * //   "--nfq-grid-container-no-padding: var(--nfq-grid-container-padding);",
 * //   "--nfq-grid-container-no-padding: initial;", // md
 * //   "--nfq-grid-container-no-padding: initial;", // lg
 * //   ...
 * // ]
 * ```
 */
export const calcContainerPadding = ({$hasNoPadding}: calcContainerPaddingProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    if (!Array.isArray($hasNoPadding)) {
        // eslint-disable-next-line no-param-reassign
        $hasNoPadding = $hasNoPadding ? breakpointOrder : [];
    }

    let lastHasNoPadding: boolean | null = null;
    const mediaQuery = breakpointOrder.map(screenSize => {
        const hasNoPadding = $hasNoPadding.includes(screenSize);

        if (hasNoPadding !== lastHasNoPadding) {
            lastHasNoPadding = hasNoPadding;

            return `
                --nfq-grid-container-no-padding: ${hasNoPadding ? 'initial' : 'var(--nfq-grid-container-padding)'};
            `;
        }

        return null;
    });

    return mediaQuery;
};

/**
 * Props used to calculate whether a container should behave as fluid (full-width) at specific breakpoints.
 * This interface is used internally by the `@nfq/react-grid` system to determine the container's
 * layout behavior based on the `$isFluid` flag. It supports global or breakpoint-specific configuration.
 */
interface calcContainerSizeProps {
    /**
     * Controls whether the container should be fluid (100% width) at certain breakpoints.
     * - If `true`, the container is fluid at all breakpoints.
     * - If `false`, the container uses the configured max-width values.
     * - If an array of `Breakpoints` is provided, the container is fluid only at the specified breakpoints.
     */
    $isFluid?: Breakpoints[] | boolean;
}

/**
 * Generates responsive CSS variable declarations for the container's width based on fluid behavior.
 * This utility is part of the `@nfq/react-grid` system and calculates whether a container should use a
 * full-width (`100%`) layout or a configured max-width value at each breakpoint.
 * It outputs a CSS variable: `--nfq-grid-container-width` which is applied to control layout width.
 * The `$isFluid` prop controls fluid behavior either globally (boolean) or per breakpoint (array).
 * The optional `$maxWidth` prop may be used to support specific width overrides but is not resolved in this function directly.
 * Only changes in fluid state across breakpoints result in an output string, avoiding redundant CSS.
 *
 * @param props          The props object containing the `$isFluid` property.
 * @param props.$isFluid A flag or list of breakpoints where the container should behave as fluid (full width).
 * @returns An array of CSS variable declarations, one per breakpoint.
 *
 * @example
 * ```ts
 * calcContainerSize({ $isFluid: ['md', 'lg'] });
 * // => [
 * //   "--nfq-grid-container-width: var(--nfq-grid-container);",
 * //   "--nfq-grid-container-width: 100%;",  // md
 * //   null,
 * //   ...
 * // ]
 * ```
 */
export const calcContainerSize = ({$isFluid}: calcContainerSizeProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    if (!Array.isArray($isFluid)) {
        // eslint-disable-next-line no-param-reassign
        $isFluid = $isFluid ? breakpointOrder : [];
    }

    let lastFluid: boolean | null = null;
    const mediaQuery = breakpointOrder.map(screenSize => {
        const actualFluid = $isFluid.includes(screenSize);

        if (actualFluid !== lastFluid) {
            lastFluid = actualFluid;

            return `--nfq-grid-container-width: ${actualFluid ? '100%' : 'var(--nfq-grid-container)'};`;
        }

        return null;
    });

    return mediaQuery;
};

/**
 * Props used to define a container’s maximum width at one or more breakpoints.
 * This interface is used internally by the `@nfq/react-grid` system to customize
 * the `max-width` of container elements either globally or per breakpoint.
 * The value can be a single number (applied at all breakpoints) or a `SizesObject`
 * that maps specific breakpoints to custom width values.
 */
interface calcContainerMaxWidthProps {
    /**
     * The maximum width of the container.
     * - If a number is provided, it is treated as a global max-width in pixels.
     * - If a `SizesObject` is provided, different max-width values can be set per breakpoint.
     * This overrides the default grid container width when `isFluid` is not active.
     */
    $maxWidth?: SizesObject | number;
}

/**
 * Generates responsive CSS variable declarations for a container’s maximum width.
 * This utility is part of the `@nfq/react-grid` system and produces a list of CSS custom property
 * declarations (`--nfq-grid-container-max-width`) based on the `$maxWidth` prop. This value controls
 * the maximum width of the container when it is not fluid.
 * The `$maxWidth` prop can be provided as a single number (applied globally) or a `SizesObject`
 * that defines max-widths for specific breakpoints. The function iterates through the configured
 * `breakpointOrder` and returns only the declarations that are explicitly set.
 *
 * @param props           The props object containing the `$maxWidth` property.
 * @param props.$maxWidth The max-width configuration, either a number or an object keyed by breakpoints.
 * @returns An array of CSS variable declarations (or `null` for skipped breakpoints).
 *
 * @example
 * ```ts
 * calcContainerMaxWidth({ $maxWidth: { xs: 320, md: 768, xl: 1280 } });
 * // => [
 * //   "--nfq-grid-container-max-width: 320;",
 * //   null,
 * //   "--nfq-grid-container-max-width: 768;",
 * //   null,
 * //   null,
 * //   "--nfq-grid-container-max-width: 1280;"
 * // ]
 * ```
 */
export const calcContainerMaxWidth = ({$maxWidth}: calcContainerMaxWidthProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    if (typeof $maxWidth !== 'object') {
        // eslint-disable-next-line no-param-reassign
        $maxWidth = {xs: $maxWidth};
    }

    const mediaQuery = breakpointOrder.map(screenSize => {
        // eslint-disable-next-line security/detect-object-injection
        const currentValue = $maxWidth[screenSize];

        if (currentValue !== undefined) {
            return `--nfq-grid-container-max-width: ${currentValue}${typeof currentValue === 'number' ? 'px' : ''};`;
        }

        return null;
    });

    return mediaQuery;
};