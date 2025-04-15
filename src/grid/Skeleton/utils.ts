/**
 * Props used to determine the width of a skeleton element.
 * This interface is used internally within the `@nfq/react-grid` system to style
 * skeleton placeholders with a defined width. The width can be a fixed number (interpreted as pixels)
 * or a valid CSS string value (e.g., `'100%'`, `'10rem'`, etc.).
 */
interface CalcSkeletonWidthProps {
    /**
     * An optional width value for the skeleton, either as a number or a CSS-compatible string.
     * - If a number is provided, it is treated as a pixel value.
     * - If a string is provided, it is used directly (e.g., `'100%'`, `'5rem'`).
     * This property is useful for controlling the visual size of skeleton lines or blocks.
     */
    $width?: number | string;
}

/**
 * Computes a valid CSS width value for a skeleton element based on the provided `$width` prop.
 * This utility is used in the `@nfq/react-grid` system to normalize skeleton width values into
 * proper CSS units. If no width is provided, it defaults to `'100%'`. If the width is a number,
 * it is converted into a pixel value string. If it is already a string, it is returned as-is.
 * This ensures consistent styling for skeletons regardless of how width is specified in the props.
 *
 * @param props        The properties for skeleton width calculation.
 * @param props.$width The width value to evaluate, either as a number (pixels) or string (CSS value).
 * @returns A string representing the resolved CSS width.
 *
 * @example
 * ```ts
 * calcSkeletonWidth({ $width: 200 });       // '200px'
 * calcSkeletonWidth({ $width: '50%' });     // '50%'
 * calcSkeletonWidth({});                    // '100%'
 * ```
 */
export const calcSkeletonWidth = ({$width}: CalcSkeletonWidthProps) => {
    if ($width === undefined) {
        return '100%';
    }
    if (typeof $width === 'string') {
        return $width;
    }

    return `${$width}px`;
};

/**
 * Props used to determine the height of a skeleton element.
 * This interface is used internally by the `@nfq/react-grid` system to style
 * skeleton placeholders with a specific height. The value can be provided as a
 * numeric pixel value or a CSS string (e.g., `'2rem'`, `'50%'`, `'auto'`).
 */
interface CalcSkeletonHeightProps {
    /**
     * An optional height value for the skeleton element.
     * - If a number is provided, it will be interpreted as a pixel value.
     * - If a string is provided, it should be a valid CSS height value.
     * This is useful for vertically sizing skeleton components such as lines, circles, or blocks.
     */
    $height?: number | string;
}

/**
 * Computes a valid CSS height value for a skeleton element based on the `$height` prop.
 * This utility is used in the `@nfq/react-grid` system to normalize skeleton height values into
 * valid CSS units. If no height is provided, it returns `null` (indicating no height should be applied).
 * If a number is passed, the function appends `'px'` to convert it into a valid CSS string.
 * If a string is provided, it is returned unchanged.
 * This ensures that skeleton elements can accept both raw pixel values and flexible CSS heights.
 *
 * @param props         The properties for skeleton height calculation.
 * @param props.$height The optional height value as a number (pixels) or CSS string.
 * @returns A CSS-compatible height string, or `null` if no height is set.
 *
 * @example
 * ```ts
 * calcSkeletonHeight({ $height: 24 });     // '24px'
 * calcSkeletonHeight({ $height: '2rem' }); // '2rem'
 * calcSkeletonHeight({});                  // null
 * ```
 */
export const calcSkeletonHeight = ({$height}: CalcSkeletonHeightProps) => {
    if ($height === undefined) {
        return null;
    }
    if (typeof $height === 'string') {
        return $height;
    }

    return `${$height}px`;
};