import {configCache} from '../../utils/cache';

import type {Breakpoints} from '../../sharedTypes/breakpointTypes';

/**
 * Resolves the most appropriate text value for the current screen size from a responsive text map.
 * This utility function is used in the `@nfq/react-grid` system to support responsive content rendering.
 * It walks through the configured `breakpointOrder` and picks the closest defined text for the given `screenSize`.
 * If a value is not defined at the exact breakpoint, it falls back to the last available value from smaller breakpoints.
 * If nothing is defined, it defaults to the value at `xs`, or an empty string.
 * This pattern allows for progressive override of text values per breakpoint while preserving fallback behavior.
 *
 * @param screenTexts A partial mapping of breakpoints to text values. May include `null` or `undefined`.
 * @param screenSize  The currently active breakpoint to resolve the text for.
 * @returns The resolved text string for the given screen size, or a fallback.
 * @throws An error if the first breakpoint is not defined in the `screenTexts` object.
 *
 * @example
 * ```ts
 * const text = getResponsiveText(
 *   { xs: 'Small', md: 'Medium', lg: 'Large' },
 *   'md'
 * );
 * // Returns: 'Medium'
 *
 * const fallback = getResponsiveText(
 *   { xs: 'Default', lg: 'Only Large' },
 *   'sm'
 * );
 * // Returns: 'Default'
 * ```
 */
export const getResponsiveText = (
    screenTexts: Partial<Record<Breakpoints, string | null | undefined>>,
    screenSize: Breakpoints
) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;
    const firstBreakpoint = breakpointOrder[0];

    // eslint-disable-next-line security/detect-object-injection
    if (screenTexts[firstBreakpoint] === undefined) {
        throw new Error(`The ${firstBreakpoint} breakpoint must be defined.`);
    }

    // eslint-disable-next-line security/detect-object-injection
    let text = screenTexts[firstBreakpoint];

    for (const size of breakpointOrder) {
        // eslint-disable-next-line security/detect-object-injection
        if (screenTexts[size] !== null && screenTexts[size] !== undefined) {
            // eslint-disable-next-line security/detect-object-injection
            text = screenTexts[size]!;
        }
        if (size === screenSize) {
            break;
        }
    }

    return text;
};