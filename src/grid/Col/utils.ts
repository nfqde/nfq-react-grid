import {configCache} from '../../utils/cache';

import type {OffsetObject, Padding, PaddingObject, SizesObject, StringSizes} from '../../sharedTypes/componentTypes';

/**
 * Props used to calculate responsive padding styles for grid elements.
 * This interface is part of the internal styling logic in `@nfq/react-grid` and defines
 * configuration options for setting horizontal padding (`paddingLeft`, `paddingRight`) or
 * shorthand padding values that apply to both sides. These values can be provided globally
 * or per breakpoint using a `PaddingObject`.
 */
interface CalcPaddingProps {
    /**
     * Shorthand for setting equal left and right padding.
     * Accepts either a single `Padding` value or a `PaddingObject` to define responsive
     * spacing across breakpoints. Acts as a fallback if `$paddingLeft` or `$paddingRight` are not defined.
     */
    $padding?: Padding | PaddingObject;
    /**
     * Sets the left padding for the element.
     * Can be provided as a single `Padding` value or a `PaddingObject` mapping values per breakpoint.
     * Overrides the value defined in `$padding`, if present.
     */
    $paddingLeft?: Padding | PaddingObject;
    /**
     * Sets the right padding for the element.
     * Can be provided as a single `Padding` value or a `PaddingObject` mapping values per breakpoint.
     * Overrides the value defined in `$padding`, if present.
     */
    $paddingRight?: Padding | PaddingObject;
}

/**
 * Generates responsive CSS declarations for horizontal padding (`padding-left` and `padding-right`).
 * This utility is part of the `@nfq/react-grid` system and calculates per-breakpoint `padding-left`
 * and `padding-right` values based on the props provided. It supports three inputs:
 * - `$padding`: shorthand that sets both left and right padding equally.
 * - `$paddingLeft`: overrides the left side.
 * - `$paddingRight`: overrides the right side.
 * If `$padding` is used, it takes precedence and applies to both sides unless overridden.
 * The function ensures consistent output across the configured breakpoint order,
 * retaining the last known value to avoid undefined outputs.
 *
 * @param props               The props object containing the padding properties.
 * @param props.$padding      Optional shorthand for setting both left and right padding.
 * @param props.$paddingLeft  Optional left-side padding override, static or responsive.
 * @param props.$paddingRight Optional right-side padding override, static or responsive.
 * @returns An array of CSS declarations per breakpoint for `padding-left` and `padding-right`.
 *
 * @example
 * ```ts
 * calcPadding({
 *   $padding: { xs: '1rem', md: '2rem' }
 * });
 * // [
 * //   "padding-left: 1rem; padding-right: 1rem;",
 * //   null,
 * //   "padding-left: 2rem; padding-right: 2rem;",
 * //   ...
 * // ]
 *
 * calcPadding({
 *   $paddingLeft: '8px',
 *   $paddingRight: { md: '16px' }
 * });
 * // [
 * //   "padding-left: 8px; padding-right: 8px;",
 * //   null,
 * //   "padding-right: 16px;",
 * //   ...
 * // ]
 * ```
 */
export const calcPadding = ({$padding, $paddingLeft, $paddingRight}: CalcPaddingProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    if ($padding) {
        // eslint-disable-next-line no-param-reassign
        $paddingLeft = (typeof $padding === 'object') ? $padding : {xs: $padding};
        // eslint-disable-next-line no-param-reassign
        $paddingRight = (typeof $padding === 'object') ? $padding : {xs: $padding};
    } else {
        // eslint-disable-next-line no-param-reassign
        $paddingLeft
            = (typeof $paddingLeft === 'object') ? $paddingLeft : {xs: $paddingLeft};
        // eslint-disable-next-line no-param-reassign
        $paddingRight
            = (typeof $paddingRight === 'object') ? $paddingRight : {xs: $paddingRight};
    }

    let lastPaddingLeft: Padding;
    let lastPaddingRight: Padding;
    const mediaQuery = breakpointOrder.map(screenSize => {
        // eslint-disable-next-line security/detect-object-injection
        const paddingLeft = $paddingLeft[screenSize];
        // eslint-disable-next-line security/detect-object-injection
        const paddingRight = $paddingRight[screenSize];

        if (paddingLeft !== undefined) {
            lastPaddingLeft = paddingLeft;
        }
        if (paddingRight !== undefined) {
            lastPaddingRight = paddingRight;
        }

        if (paddingLeft !== undefined || paddingRight !== undefined) {
            return `
                padding-inline-start: ${paddingLeft ?? lastPaddingLeft};
                padding-inline-end: ${paddingRight ?? lastPaddingRight};
            `;
        }

        return null;
    });

    return mediaQuery;
};

/**
 * Props used to define responsive sizing values for grid elements.
 * This interface is part of the internal logic of the `@nfq/react-grid` system.
 * It provides a structure for applying size-specific configuration values across
 * multiple breakpoints using a `SizesObject`.
 * Typically used for calculating values such as column widths, max-widths,
 * or container sizes in a responsive layout context.
 */
interface CalcSizesProps {
    /**
     * A responsive map of breakpoint-specific size values.
     * Each key corresponds to a breakpoint (e.g. `xs`, `md`, `xl`) and maps to a numeric or string
     * size value (e.g. `320`, `'100%'`, `'80rem'`). This allows you to define how a size should
     * behave across various screen widths.
     */
    $sizes: SizesObject;
}

/**
 * Computes responsive `flex` and `max-width` styles for grid columns based on provided size mappings.
 * This utility is part of the `@nfq/react-grid` system and generates per-breakpoint CSS declarations
 * that control how wide a grid column should be. It uses the `$sizes` object to determine
 * the column width at each breakpoint and converts it into responsive `flex` and `max-width` styles.
 * The value can be a number representing a column span, or a string (`'auto'`, `'max-content'`, etc.).
 * When using numbers, the function generates a `calc()` expression that ensures spacing and
 * layout consistency using `var(--nfq-grid-columns)` and `--column-gap` variables.
 *
 * Only changes in the computed size will generate a CSS block, minimizing unnecessary style output.
 *
 * @param props        The props object containing the `$sizes` property.
 * @param props.$sizes A `SizesObject` that defines column sizes per breakpoint.
 * @returns An array of CSS declarations (or `null`) for each breakpoint, controlling column width.
 *
 * @example
 * ```ts
 * calcSizes({ $sizes: { xs: 12, md: 6, lg: 'auto' } });
 * // => [
 * //   "flex: 0 0 ...; max-width: ...;",
 * //   null,
 * //   "flex: 0 0 ...; max-width: ...;",
 * //   ...
 * // ]
 * ```
 */
export const calcSizes = ({$sizes}: CalcSizesProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    let lastColSize: StringSizes | number = 'auto';
    let lastRealSize: string;

    if (Object.keys($sizes).length > 0) {
        const mediaQuery = breakpointOrder.map(screenSize => {
            // eslint-disable-next-line security/detect-object-injection
            const size = $sizes[screenSize];
            let realSize: string;

            if (size) {
                lastColSize = size;
            }

            if (['auto', 'max-content', 'min-content'].includes((size ?? lastColSize) as StringSizes)) {
                realSize = (size ?? lastColSize) as StringSizes;
            } else {
                realSize = `calc(100% / var(--nfq-grid-columns) * clamp(1, ${size ?? lastColSize}, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, ${size ?? lastColSize}, var(--nfq-grid-columns)) / var(--nfq-grid-columns))`;
            }

            if (lastRealSize !== realSize) {
                lastRealSize = realSize;

                return `
                    flex: ${realSize === 'auto' ? 'auto' : `0 0 ${realSize}`};
                    max-width: ${realSize === 'auto' ? 'initial' : realSize};
                `;
            }

            return null;
        });

        return mediaQuery;
    }

    return null;
};

/**
 * Props used to calculate responsive offset (margin-left) for grid columns.
 * This interface is part of the `@nfq/react-grid` system and defines configuration
 * for applying horizontal spacing before a column, effectively shifting its position
 * within the grid layout. It supports both static and breakpoint-based offset values.
 */
interface CalcOffsetProps {
    /**
     * Sets the column offset (margin-left) for the grid element.
     * - Can be a single number indicating how many columns to offset.
     * - Or an `OffsetObject` that defines different offsets for each breakpoint.
     * The final computed value is converted into a percentage-based margin using
     * the number of grid columns and spacing variables.
     */
    $offset?: OffsetObject | number;
}

/**
 * Computes responsive `margin-left` values to offset a column in the grid layout.
 * This utility is part of the `@nfq/react-grid` system and calculates horizontal spacing
 * to shift a column to the right by a number of grid units (`$offset`). The offset is converted
 * into a `calc()` expression using the total number of grid columns and the `--column-gap` spacing.
 * It supports both static values (applied to all breakpoints) and responsive values via an `OffsetObject`.
 * The function returns only changed values to optimize CSS output.
 *
 * @param props         The props object containing the `$offset` property.
 * @param props.$offset A single numeric value or an object mapping breakpoints to column offsets.
 * @returns An array of CSS `margin-left` declarations per breakpoint, or `null` when unchanged.
 *
 * @example
 * ```ts
 * calcOffset({ $offset: { xs: 0, md: 2, lg: 4 } });
 * // => [
 * //   null,
 * //   "margin-left: calc(100% / var(--nfq-grid-columns) * 2 + var(--column-gap, 0px) * 2 / var(--nfq-grid-columns));",
 * //   "margin-left: calc(100% / var(--nfq-grid-columns) * 4 + var(--column-gap, 0px) * 4 / var(--nfq-grid-columns));",
 * //   ...
 * // ]
 * ```
 */
export const calcOffset = ({$offset}: CalcOffsetProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    if (typeof $offset !== 'object') {
        // eslint-disable-next-line no-param-reassign
        $offset = {xs: $offset};
    }

    let lastOffset = 0;
    let lastRealOffset: string | undefined;
    const mediaQuery = breakpointOrder.map(screenSize => {
        // eslint-disable-next-line security/detect-object-injection
        const currentOffset = $offset[screenSize];

        if (currentOffset) {
            lastOffset = currentOffset;
        }

        const finalOffset = currentOffset ?? lastOffset;
        const realOffset = finalOffset === 0 ? undefined : `calc(100% / var(--nfq-grid-columns) * ${finalOffset} + var(--column-gap, 0px) * ${finalOffset} / var(--nfq-grid-columns))`;

        if (lastRealOffset !== realOffset) {
            lastRealOffset = realOffset;

            return `margin-inline-start: ${realOffset};`;
        }

        return null;
    });

    return mediaQuery;
};