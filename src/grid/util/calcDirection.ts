import {configCache} from '../../utils/cache';

import type {Breakpoints} from '../../sharedTypes/breakpointTypes';
import type {DirectionObject, FlexDirection} from '../../sharedTypes/componentTypes';

/**
 * Props used to calculate responsive flex direction behavior for rows or containers.
 * This interface is part of the `@nfq/react-grid` system and provides configuration options
 * for determining the layout direction, wrapping behavior, and reverse flow at different breakpoints.
 * These props enable fully responsive and adaptive flex-based layouts.
 */
interface CalcDirectionProps {
    /**
     * Controls the primary direction of flex items.
     * Can be a static `FlexDirection` value (e.g., `'row'`, `'column'`, `'row-reverse'`, etc.)
     * or a `DirectionObject` to define different directions at specific breakpoints.
     * This maps to the `flex-direction` CSS property.
     */
    $direction?: DirectionObject | FlexDirection;
    /**
     * Controls whether flex items should wrap to the next line.
     * - If `true`, wrapping is disabled (`flex-wrap: nowrap`) at all breakpoints.
     * - If an array of `Breakpoints` is provided, wrapping is disabled only for the specified breakpoints.
     * - If `false` or omitted, default wrapping behavior is used.
     */
    $hasNoWrap?: Breakpoints[] | boolean;
    /**
     * Controls whether the flex direction should be reversed at specific breakpoints.
     * - If `true`, the direction is reversed (`row-reverse` or `column-reverse`) at all breakpoints.
     * - If an array of `Breakpoints` is provided, reversal is applied only at those breakpoints.
     * - This prop works in conjunction with `$direction` to dynamically switch the direction.
     */
    $isReverse?: Breakpoints[] | boolean;
}

/**
 * Computes responsive `flex-flow` CSS values based on direction, wrapping, and reverse behavior.
 * This utility is part of the `@nfq/react-grid` system and generates a list of `flex-flow` declarations
 * for each configured breakpoint. It evaluates direction (`row`, `column`, etc.), wrapping (`wrap` or `nowrap`),
 * and reverse behavior (via `-reverse` suffix) using the passed `CalcDirectionProps`.
 * If `$direction` is undefined, it falls back to the provided `defaultDirection`.
 * Wrapping and reversing behavior can be set globally or per breakpoint using arrays of `Breakpoints`.
 * Only changes in output will generate a CSS string to minimize redundant styles.
 *
 * @param defaultDirection The fallback direction to use if no `$direction` is explicitly defined.
 * @returns A function that accepts `CalcDirectionProps` and returns an array of `flex-flow` CSS declarations.
 *
 * @example
 * ```ts
 * calcDirection('row')({
 *   $direction: { xs: 'column', md: 'row' },
 *   $hasNoWrap: ['md'],
 *   $isReverse: ['lg']
 * });
 *
 * // Output:
 * // [
 * //   "flex-flow: column wrap;",
 * //   "flex-flow: row nowrap;",
 * //   "flex-flow: row wrap-reverse;",
 * //   ...
 * // ]
 * ```
 */
export const calcDirection = (
    defaultDirection: FlexDirection
) => ({$direction, $hasNoWrap, $isReverse}: CalcDirectionProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    if (typeof $direction === 'string') {
        // eslint-disable-next-line no-param-reassign
        $direction = {xs: $direction};
    } else if (typeof $direction === 'undefined') {
        // eslint-disable-next-line no-param-reassign
        $direction = {xs: defaultDirection};
    } else if (typeof $direction.xs === 'undefined') {
        // eslint-disable-next-line no-param-reassign
        $direction = {
            ...$direction,
            xs: defaultDirection
        };
    }

    if (!Array.isArray($hasNoWrap)) {
        // eslint-disable-next-line no-param-reassign
        $hasNoWrap = $hasNoWrap ? breakpointOrder : [];
    }

    if (!Array.isArray($isReverse)) {
        // eslint-disable-next-line no-param-reassign
        $isReverse = $isReverse ? breakpointOrder : [];
    }

    let lastDirection: FlexDirection;
    let lastDirectionString: string;
    const mediaQuery = breakpointOrder.map(screenSize => {
        // eslint-disable-next-line security/detect-object-injection
        const currentDirection = $direction[screenSize];
        const currentWrap
            = ($hasNoWrap.includes(screenSize) || (currentDirection ?? lastDirection) === 'column')
                ? 'nowrap' : 'wrap';
        const currentReverse = $isReverse.includes(screenSize) ? '-reverse' : '';

        const directionString = `${currentDirection ?? lastDirection}${currentReverse} ${currentWrap}${currentWrap === 'nowrap' ? '' : currentReverse}`;

        if (currentDirection) {
            lastDirection = currentDirection;
        }

        if (lastDirectionString !== directionString) {
            lastDirectionString = directionString;

            return `flex-flow: ${directionString};`;
        }

        return null;
    });

    return mediaQuery;
};