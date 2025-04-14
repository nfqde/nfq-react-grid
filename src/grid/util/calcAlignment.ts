import {configCache} from '../../utils/cache';

import type {AlignObject, FlexAlign, FlexJustify, JustifyObject, OrderObject} from '../../sharedTypes/componentTypes';

/**
 * Props used to calculate alignment, justification, and ordering for flex-based grid elements.
 * This interface is used internally by the `@nfq/react-grid` system to support
 * responsive and flexible layout behaviors. It enables alignment and order control
 * using either global values or per-breakpoint configurations.
 */
interface CalcAlignmentProps {
    /**
     * Controls the vertical alignment of a flex item.
     * Can be provided as a `FlexAlign` string (e.g., `'start'`, `'center'`, `'end'`, `'stretch'`)
     * or as an `AlignObject` for setting values per breakpoint.
     * Determines the `align-self` CSS property.
     */
    $align?: AlignObject | FlexAlign;
    /**
     * Controls horizontal justification within a flex container.
     * Accepts a `FlexJustify` value (e.g., `'start'`, `'center'`, `'end'`, `'space-between'`)
     * or a `JustifyObject` for defining justification per breakpoint.
     * Maps to the `justify-self` or `justify-content` property depending on context.
     */
    $justify?: FlexJustify | JustifyObject;
    /**
     * Sets the visual order of the element in a flex container.
     * Can be a global number or an `OrderObject` for breakpoint-based control.
     * This allows elements to shift position depending on screen size.
     */
    $order?: OrderObject | number;
}

const cssKeys = {
    $align: 'align-items',
    $justify: 'justify-content',
    $order: 'order'
};

/**
 * Generates responsive CSS declarations for alignment, justification, or ordering in a flex container.
 * This utility is used by the `@nfq/react-grid` system to dynamically generate per-breakpoint
 * CSS rules for alignment-related props: `$align`, `$justify`, or `$order`. It resolves the corresponding
 * CSS property key (e.g., `align-self`, `justify-self`, `order`) from the internal `cssKeys` mapping,
 * and maps values across the configured breakpoint order.
 * The value can be passed as a single value (applied to all breakpoints) or an object with breakpoint-specific entries.
 *
 * @param prop The alignment-related prop key: `'$align'`, `'$justify'`, or `'$order'`.
 * @returns A function that accepts the relevant props and returns an array of CSS declarations per breakpoint.
 *
 * @example
 * ```ts
 * calcAlignmentProps('$align')({ $align: { xs: 'start', md: 'center' } });
 * // => [
 * //   'align-self: start;',
 * //   null,
 * //   'align-self: center;',
 * //   ...
 * // ]
 *
 * calcAlignmentProps('$order')({ $order: 2 });
 * // => ['order: 2;', null, null, ...]
 * ```
 */
export const calcAlignment = (
    prop: '$align' | '$justify' | '$order'
) => ({[prop]: cssProp}: CalcAlignmentProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    if (typeof cssProp !== 'object') {
        // eslint-disable-next-line no-param-reassign
        cssProp = {xs: cssProp};
    }
    // eslint-disable-next-line security/detect-object-injection
    const cssKey = cssKeys[prop];

    const mediaQuery = breakpointOrder.map(screenSize => {
        // eslint-disable-next-line security/detect-object-injection
        const currentCssProp = (cssProp as AlignObject | JustifyObject | OrderObject)[screenSize];

        if (currentCssProp) {
            return `${cssKey}: ${currentCssProp};`;
        }

        return null;
    });

    return mediaQuery;
};