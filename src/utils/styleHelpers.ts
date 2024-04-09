/* eslint-disable no-undefined, complexity, security/detect-object-injection, max-lines */
import {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';

import {getConfig, getInternalConfig, mediaInternal} from './lib';

import type {
    AlignObject,
    Breakpoints,
    DirectionObject,
    FlexAlign,
    FlexDirection,
    FlexGap,
    FlexJustify,
    GapObject,
    JustifyObject,
    OffsetObject,
    OrderObject,
    Padding,
    PaddingObject,
    SizesObject,
    SpacerObject,
    StringSizes,
    Theme
} from '../sharedTypes';

interface CalcPaddingProps {
    $padding?: Padding | PaddingObject;
    $paddingLeft?: Padding | PaddingObject;
    $paddingRight?: Padding | PaddingObject;
}

/**
 * Calculates the padding CSS properties based on the provided styled-components props.
 *
 * @param props               The styled-components props object.
 * @param props.$padding      The value of padding to be applied to left and right sides.
 * @param props.$paddingLeft  The value of padding to be applied to the left side.
 * @param props.$paddingRight The value of padding to be applied to the right side.
 *
 * @returns An array that contains the padding css strings for each screen size for the given configuration.
 */
export const calcPadding = ({$padding, $paddingLeft, $paddingRight}: CalcPaddingProps) => {
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
    const mediaQuery = DIMENSIONS.map(screenSize => {
        const paddingLeft = ($paddingLeft as PaddingObject)[screenSize];
        const paddingRight = ($paddingRight as PaddingObject)[screenSize];

        if (paddingLeft !== undefined) {
            lastPaddingLeft = paddingLeft;
        }
        if (paddingRight !== undefined) {
            lastPaddingRight = paddingRight;
        }

        if (paddingLeft !== undefined || paddingRight !== undefined) {
            return `
                padding-left: ${paddingLeft ?? lastPaddingLeft};
                padding-right: ${paddingRight ?? lastPaddingRight};
            `;
        }

        return null;
    });

    return mediaQuery;
};

interface CalcGapProps {
    $hasNoGap?: FlexGap | GapObject;
    theme: Theme;
}

/**
 * Calculates the flex gap CSS string for a given theme and gap configuration.
 *
 * The function calculates the gap based on the `columnGap` and `rowGap` properties of the theme and the gap
 * configuration provided. It generates CSS rules for each screen size defined in the theme, based on the gap
 * configuration, and returns a string for each size.
 *
 * @param props           The styled-components props object.
 * @param props.$hasNoGap The gap configuration object or boolean value that specifies if the gap should be disabled.
 * @param props.theme     The styled-components theme.
 *
 * @returns An array that contains the flex gap css strings for each screen size for the given configuration.
 */
export const calcGap = ({$hasNoGap = false, theme}: CalcGapProps) => {
    if (typeof $hasNoGap === 'boolean' || typeof $hasNoGap === 'string') {
        // eslint-disable-next-line no-param-reassign
        $hasNoGap = {xs: $hasNoGap};
    }

    let lastGap: number;
    let lastGapConfig: FlexGap;
    let lastColumnGapVar: string;
    let lastRowGap: string;
    const mediaQuery = DIMENSIONS.map(screenSize => {
        const gap = getInternalConfig(theme).columnGap[screenSize];
        const gapConfig = ($hasNoGap as GapObject)[screenSize];

        if (gap !== undefined) {
            lastGap = gap;
        }
        if (gapConfig !== undefined) {
            lastGapConfig = gapConfig;
        }

        const columnGapVar = `--column-gap: ${((gapConfig ?? lastGapConfig) === 'no-column' || (gapConfig ?? lastGapConfig) === true) ? '0px' : `${String(gap ?? lastGap)}px`};`;
        const columnGap = 'column-gap: var(--column-gap);';
        const rowGap = `row-gap: ${((gapConfig ?? lastGapConfig) === 'no-row' || (gapConfig ?? lastGapConfig) === true) ? '0px' : `${String(gap ?? lastGap)}px`};`;

        if (lastColumnGapVar !== columnGapVar || lastRowGap !== rowGap) {
            lastColumnGapVar = columnGapVar;
            lastRowGap = rowGap;

            return `
                ${columnGapVar}
                ${columnGap}
                ${rowGap}
            `;
        }

        return null;
    });

    return mediaQuery;
};

interface CalcSizesProps {
    $sizes: SizesObject;
    theme: Theme;
}

/**
 * Calculates the flex and max-width css strings based on the provided sizes object and the current theme.
 *
 * @param props        The styled-components props object.
 * @param props.$sizes The sizes object that contains the size values for each screen size.
 * @param props.theme  The styled-components theme.
 *
 * @returns An array that contains the flex and max-width css strings for each screen size for the given configuration. Returns null if $sizes is an empty object.
 */
export const calcSizes = ({$sizes, theme}: CalcSizesProps) => {
    let lastColCount: number;
    let lastColSize: StringSizes | number = 'auto';
    let lastRealSize: string;

    if (Object.keys($sizes).length > 0) {
        const mediaQuery = DIMENSIONS.map(screenSize => {
            const colCount = getInternalConfig(theme).columns[screenSize];
            const size = $sizes[screenSize];
            let realSize: string;

            if (colCount) {
                lastColCount = colCount;
            }
            if (size) {
                lastColSize = size;
            }

            if (['auto', 'max-content', 'min-content'].includes((size ?? lastColSize) as StringSizes)) {
                realSize = (size ?? lastColSize) as StringSizes;
            } else {
                const col = colCount ?? lastColCount;
                const cappedSize = ((size ?? lastColSize) as number > col) ? col : (size ?? lastColSize) as number;

                realSize = `calc(100% / ${col} * ${cappedSize} - var(--column-gap, 0px) + var(--column-gap, 0px) * ${cappedSize} / ${col})`;
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

interface CalcOffsetProps {
    $offset?: OffsetObject | number;
    theme: Theme;
}

/**
 * Calculates the offset css for a column based on the provided offset value.
 *
 * @param props         The styled-components props object.
 * @param props.$offset The offset value for this column.
 * @param props.theme   The styled-components theme.
 *
 * @returns An array that contains the margin-left css strings for each screen size for the given configuration.
 */
export const calcOffset = ({$offset, theme}: CalcOffsetProps) => {
    if (typeof $offset !== 'object') {
        // eslint-disable-next-line no-param-reassign
        $offset = {xs: $offset};
    }

    let lastColCount: number;
    let lastOffset = 0;
    let lastRealOffset: string | null;
    const mediaQuery = DIMENSIONS.map(screenSize => {
        const colCount = getInternalConfig(theme).columns[screenSize];
        const currentOffset = ($offset as OffsetObject)[screenSize];

        if (colCount) {
            lastColCount = colCount;
        }
        if (currentOffset) {
            lastOffset = currentOffset;
        }

        const col = colCount ?? lastColCount;
        const finalOffset = currentOffset ?? lastOffset;
        const realOffset = finalOffset === 0 ? null : `calc(100% / ${col} * ${finalOffset} + var(--column-gap, 0px) * ${finalOffset} / ${col})`;

        if (lastRealOffset !== realOffset) {
            lastRealOffset = realOffset;

            return `margin-left: ${realOffset};`;
        }

        return null;
    });

    return mediaQuery;
};

interface CalcDirectionProps {
    $direction?: DirectionObject | FlexDirection;
    $hasNoWrap?: Breakpoints[] | boolean;
    $isReverse?: Breakpoints[] | boolean;
}

/**
 * Calculates the flex-direction css string based on the direction object, nowrap and reverse properties.
 *
 * @param defaultDirection The default direction to return if $direction is not defined for a screen size.
 *
 * @returns An array that contains the flex-flow css strings for each screen size for the given configuration.
 */
export const calcDirection = (
    defaultDirection: FlexDirection
) => ({$direction, $hasNoWrap, $isReverse}: CalcDirectionProps) => {
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
        $hasNoWrap = $hasNoWrap ? DIMENSIONS : [];
    }

    if (!Array.isArray($isReverse)) {
        // eslint-disable-next-line no-param-reassign
        $isReverse = $isReverse ? DIMENSIONS : [];
    }

    let lastDirection: FlexDirection;
    let lastDirectionString: string;
    const mediaQuery = DIMENSIONS.map(screenSize => {
        const currentDirection = ($direction as DirectionObject)[screenSize];
        const currentWrap
            = (($hasNoWrap as Breakpoints[]).includes(screenSize) || (currentDirection ?? lastDirection) === 'column')
                ? 'nowrap' : 'wrap';
        const currentReverse = ($isReverse as Breakpoints[]).includes(screenSize) ? '-reverse' : '';

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

interface CalcAlignmentProps {
    $align?: AlignObject | FlexAlign;
    $justify?: FlexJustify | JustifyObject;
    $order?: OrderObject | number;
}

const cssKeys = {
    $align: 'align-items',
    $justify: 'justify-content',
    $order: 'order'
};

/**
 * Calculates the alignment properties for a given alignment prop.
 *
 * @param prop The name of the alignment property to calculate: '$align', '$justify', or '$order'.
 *
 * @returns An array of the alignment property CSS rules for each screen size.
 */
export const calcAlignmentProps = (
    prop: '$align' | '$justify' | '$order'
) => ({[prop]: cssProp}: CalcAlignmentProps) => {
    if (typeof cssProp !== 'object') {
        // eslint-disable-next-line no-param-reassign
        cssProp = {xs: cssProp};
    }
    const cssKey = cssKeys[prop];

    const mediaQuery = DIMENSIONS.map(screenSize => {
        const currentCssProp = (cssProp as AlignObject | JustifyObject | OrderObject)[screenSize];

        if (currentCssProp) {
            return `${cssKey}: ${currentCssProp};`;
        }

        return null;
    });

    return mediaQuery;
};

interface calcContainerPaddingProps {
    $hasNoPadding?: Breakpoints[] | boolean;
    theme: Theme;
}

/**
 * Calculates the container padding css based on the provided theme object.
 *
 * This function calculates the container padding for each screen size in the DIMENSIONS constant using the values
 * provided in the theme's `containerPadding` object. The resulting css string should be used as a CSS-in-JS style
 * to apply container padding.
 *
 * @param props               The styled-component props object.
 * @param props.$hasNoPadding Determines if the container has an padding.
 * @param props.theme         The styled-components theme.
 *
 * @returns An array of css strings representing the calculated container padding.
 */
export const calcContainerPadding = ({$hasNoPadding, theme}: calcContainerPaddingProps) => {
    if (!Array.isArray($hasNoPadding)) {
        // eslint-disable-next-line no-param-reassign
        $hasNoPadding = $hasNoPadding ? DIMENSIONS : [];
    }

    let lastRealPadding = 0;
    let lastPadding: number;
    const mediaQuery = DIMENSIONS.map(screenSize => {
        const containerPadding = getInternalConfig(theme).containerPadding[screenSize];
        const hasNoPadding = ($hasNoPadding as Breakpoints[]).includes(screenSize);
        const realPadding = containerPadding ?? lastRealPadding;
        const padding = hasNoPadding ? 0 : realPadding;

        if (padding !== lastPadding || realPadding !== lastRealPadding) {
            lastRealPadding = realPadding;
            lastPadding = padding;

            return `
                padding-left: ${String(padding)}px;
                padding-right: ${String(padding)}px;
            `;
        }

        return null;
    });

    return mediaQuery;
};

interface calcContainerSizeProps {
    $isFluid?: Breakpoints[] | boolean;
    $maxWidth?: number;
    theme: Theme;
}

/**
 * Calculates the container's width based on the provided theme and $isFluid prop.
 *
 * This function calculates the container width for all responsive breakpoints
 * using the provided theme and $isFluid prop. The output is an array of strings
 * that can be used to apply responsive width styles to the container.
 *
 * If the $isFluid prop is an empty array, the function will not make the container fluid on any breakpoint.
 * If the $isFluid prop is a boolean, it will make the container fluid on all breakpoints.
 *
 * @param props           The styled-components props object.
 * @param props.theme     The styled-components theme.
 * @param props.$isFluid  If the container is fluid or not. Defaults to an empty array.
 * @param props.$maxWidth Overrides the max-width of the container defined in the grid config. It takes a `WidthObject` or a `number` value.
 *
 * @returns An array that contains the width css strings for each screen size for the given configuration.
 */
export const calcContainerSize = ({$isFluid, $maxWidth, theme}: calcContainerSizeProps) => {
    if (!Array.isArray($isFluid)) {
        // eslint-disable-next-line no-param-reassign
        $isFluid = $isFluid ? DIMENSIONS : [];
    }

    let lastWidth: string;
    let lastContainerSize: number | 'fluid';
    const mediaQuery = DIMENSIONS.map(screenSize => {
        const actualFluid = ($isFluid as Breakpoints[]).includes(screenSize);
        const containerSize = getInternalConfig(theme).container[screenSize];
        const width = (actualFluid || (containerSize ?? lastContainerSize) === 'fluid')
            ? '100%' : `${$maxWidth ?? containerSize ?? lastContainerSize}px`;

        if (containerSize) {
            lastContainerSize = containerSize;
        }

        if (width !== lastWidth) {
            lastWidth = width;

            return `width: ${String(width)};`;
        }

        return null;
    });

    return mediaQuery;
};

interface CalcSpacerInlineProps {
    $isInline?: Breakpoints[] | boolean;
}

/**
 * Calculates the inline style for a spacer.
 *
 * This function uses the `DIMENSIONS` constant to define media queries and check whether the spacer should be inline
 * for each screen size.
 *
 * @param props           The styled-components props object.
 * @param props.$isInline A configuration value that determines whether the spacer should be inline or not.
 *
 * @returns An array that contains the display css strings for each screen size for the given configuration.
 */
export const calcSpacerInline = ({$isInline}: CalcSpacerInlineProps) => {
    if (!Array.isArray($isInline)) {
        // eslint-disable-next-line no-param-reassign
        $isInline = $isInline ? DIMENSIONS : [];
    }

    let lastInline: 'block' | 'inline-block';
    const mediaQuery = DIMENSIONS.map(screenSize => {
        const inline = ($isInline as Breakpoints[]).includes(screenSize) ? 'inline-block' : 'block';

        if (inline !== lastInline) {
            lastInline = inline;

            return `display: ${inline};`;
        }

        return null;
    });

    return mediaQuery;
};

interface CalcSpacerMeasuresProps {
    $x?: SpacerObject | number;
    $y?: SpacerObject | number;
    theme: Theme;
}

const spacerCssKeys = {
    height: '$y' as const,
    'min-height': '$y' as const,
    'min-width': '$x' as const,
    width: '$x' as const
};

/**
 * Calculates the measurements for the spacer based on the provided css key.
 *
 * This function uses the `getInternalConfig` function to retrieve the base spacing value from the theme config, and
 * applies it to the provided spacer value to calculate the final measurement in `rem` units.
 *
 * @param propKey The css key for the spacer value to calculate.
 *
 * @returns An array of media query strings containing the calculated measurement css for each screen size.
 */
export const calcSpacerMeasures = (
    propKey: 'height' | 'min-height' | 'min-width' | 'width'
) => ({theme, [spacerCssKeys[propKey]]: value}: CalcSpacerMeasuresProps) => {
    if (typeof value !== 'object') {
        // eslint-disable-next-line no-param-reassign
        value = {xs: value};
    }
    const spacing = getInternalConfig(theme).baseSpacing;

    const mediaQuery = DIMENSIONS.map(screenSize => {
        const currentValue = (value as SpacerObject)[screenSize];

        if (currentValue !== undefined) {
            return `${propKey}: ${String(currentValue * spacing)}rem;`;
        }

        return null;
    });

    return mediaQuery;
};

interface CalcSpacerMeasuresProps {
    $isNotStretching?: Breakpoints[] | boolean;
    $maxX?: SpacerObject | number;
    $maxY?: SpacerObject | number;
    $x?: SpacerObject | number;
    $y?: SpacerObject | number;
    theme: Theme;
}

type PropKeys = 'max-height' | 'max-width';

const spacerMaxCssKeys = {
    'max-height': ['$maxY', '$y'] as const,
    'max-width': ['$maxX', '$x'] as const
};

/* eslint-disable sort-destructure-keys/sort-destructure-keys */
/**
 * Calculates the Measurements for the spacer based on max-height or max-width CSS properties.
 *
 * Given a set of spacer measures and a theme object, this function computes the measurements for the spacer based on
 * the max-height or max-width CSS properties.
 *
 * @param propKey The CSS key for the value. Can only be either 'max-height' or 'max-width'.
 *
 * @returns An array of media query strings containing the calculated measurement css for each screen size.
 */
export const calcSpacerMaxValues = (
    propKey: PropKeys
) => (componentProps: CalcSpacerMeasuresProps) => {
    const {theme} = componentProps;
    let {$isNotStretching} = componentProps;
    let max = componentProps[spacerMaxCssKeys[propKey][0]];
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
        $isNotStretching = $isNotStretching ? DIMENSIONS : [];
    }
    const spacing = getInternalConfig(theme).baseSpacing;

    let lastAuto: number;
    let lastMax: number;
    let lastRealCss: string | null;
    const mediaQuery = DIMENSIONS.map(screenSize => {
        const currentAuto = (auto as SpacerObject)[screenSize];
        const currentMax = (max as SpacerObject)[screenSize];
        const currentNoStretch = ($isNotStretching as Breakpoints[]).includes(screenSize);

        if (currentAuto !== undefined) {
            lastAuto = currentAuto;
        }
        if (currentMax !== undefined) {
            lastMax = currentMax;
        }

        const realMax = currentMax ?? lastMax;
        const realAuto = currentAuto ?? lastAuto;
        // eslint-disable-next-line no-nested-ternary, no-negated-condition, @typescript-eslint/no-unnecessary-condition
        const realCss = realMax !== undefined
            ? `${(realMax * spacing)}rem`
            // eslint-disable-next-line no-nested-ternary
            : currentNoStretch
                // eslint-disable-next-line no-negated-condition, @typescript-eslint/no-unnecessary-condition
                ? realAuto !== undefined
                    ? `${(realAuto * spacing)}rem`
                    : null
                : lastRealCss ? 'initial' : null;

        if (realCss !== lastRealCss && realCss !== null) {
            lastRealCss = realCss;

            return `${propKey}: ${String(realCss)};`;
        }

        return null;
    });

    return mediaQuery;
};
/* eslint-enable sort-destructure-keys/sort-destructure-keys */

interface CalcSkeletonBaseProps {
    /**
     * The variant of the skeleton, keying into the skeleton configuration in the theme.
     */
    $variant: keyof Required<Theme['nfqgrid']>['skeleton'];
    /**
     * The theme object containing skeleton configurations.
     */
    theme: Theme;
}

/**
 * Calculates the animation direction for a skeleton element.
 * This function determines whether the skeleton's animation should run normally or in reverse based on the configuration.
 *
 * @param props          The base properties for skeleton calculation.
 * @param props.$variant The variant of the skeleton, keying into the skeleton configuration in the theme.
 * @param props.theme    The theme object containing skeleton configurations.
 * @returns A string indicating the animation direction ('normal' or 'reverse').
 *
 * @example
 * ```tsx
 * const animationDirection = calcSkeletonDirection({ $variant: 'primary', theme });
 * ```
 */
export const calcSkeletonDirection = ({$variant, theme}: CalcSkeletonBaseProps) => {
    const skeletonConfig = getInternalConfig(theme).skeleton[$variant];

    return skeletonConfig.animation.direction === 'rtl' ? 'reverse' : 'normal';
};

/**
 * Calculates the animation duration for a skeleton element.
 * This function returns the duration of the skeleton's animation in seconds, based on the theme configuration.
 *
 * @param props          The base properties for skeleton calculation.
 * @param props.$variant The variant of the skeleton, keying into the skeleton configuration in the theme.
 * @param props.theme    The theme object containing skeleton configurations.
 * @returns A string representing the animation duration in seconds (e.g., '2s').
 *
 * @example
 * ```tsx
 * const animationDuration = calcSkeletonDuration({ $variant: 'primary', theme });
 * ```
 */
export const calcSkeletonDuration = ({$variant, theme}: CalcSkeletonBaseProps) => {
    const skeletonConfig = getInternalConfig(theme).skeleton[$variant];

    return `${skeletonConfig.animation.duration}s`;
};

interface CalcSkeletonBorderRadiusProps extends CalcSkeletonBaseProps {
    /**
     * A boolean indicating if the skeleton should be circular.
     */
    $circle: boolean;
}

/**
 * Calculates the border-radius for a skeleton element.
 * This function returns either '50%' for a circular skeleton or the border-radius based on the theme configuration.
 *
 * @param props          The properties for skeleton border-radius calculation.
 * @param props.$circle  A boolean indicating if the skeleton should be circular.
 * @param props.$variant The variant of the skeleton, keying into the skeleton configuration in the theme.
 * @param props.theme    The theme object containing skeleton configurations.
 * @returns A string representing the border-radius (e.g., '50%', '0.5rem').
 *
 * @example
 * ```tsx
 * const borderRadius = calcSkeletonBorderRadius({ $circle: true, $variant: 'primary', theme });
 * ```
 */
export const calcSkeletonBorderRadius = ({$circle, $variant, theme}: CalcSkeletonBorderRadiusProps) => {
    const skeletonConfig = getInternalConfig(theme).skeleton[$variant];

    return $circle ? '50%' : `${skeletonConfig.borderRadius}rem`;
};

/**
 * Calculates the background color for a skeleton element.
 * This function returns the base color for the skeleton's background based on the theme configuration.
 *
 * @param props          The base properties for skeleton calculation.
 * @param props.$variant The variant of the skeleton, keying into the skeleton configuration in the theme.
 * @param props.theme    The theme object containing skeleton configurations.
 * @returns A string representing the CSS color value.
 *
 * @example
 * ```tsx
 * const backgroundColor = calcSkeletonBackgroundColor({ $variant: 'primary', theme });
 * ```
 */
export const calcSkeletonBackgroundColor = ({$variant, theme}: CalcSkeletonBaseProps) => {
    const skeletonConfig = getInternalConfig(theme).skeleton[$variant];

    return skeletonConfig.colors.base;
};

/**
 * Calculates the background image for a skeleton element.
 * This function returns a CSS linear gradient string for the skeleton's background, based on the theme configuration.
 *
 * @param props          The base properties for skeleton calculation.
 * @param props.$variant The variant of the skeleton, keying into the skeleton configuration in the theme.
 * @param props.theme    The theme object containing skeleton configurations.
 * @returns A string representing the CSS linear gradient.
 *
 * @example
 * ```tsx
 * const backgroundImage = calcSkeletonBackgroundImage({ $variant: 'primary', theme });
 * ```
 */
export const calcSkeletonBackgroundImage = ({$variant, theme}: CalcSkeletonBaseProps) => {
    const skeletonConfig = getInternalConfig(theme).skeleton[$variant];

    return `linear-gradient(90deg, ${skeletonConfig.colors.baseHighlight} 8%, ${skeletonConfig.colors.highlight} 38%, ${skeletonConfig.colors.baseHighlight} 54%);`;
};

interface CalcSkeletonWidthProps extends CalcSkeletonBaseProps {
    /**
     * An optional width value for the skeleton, either in pixels or as a CSS value.
     */
    $width?: number | string;
}

/**
 * Calculates the width for a skeleton element.
 * This function returns either '100%' as the default width, a specific pixel value, or any other specified CSS width value.
 *
 * @param props        The properties for skeleton width calculation.
 * @param props.$width The width value for the skeleton.
 * @returns A string representing the width (e.g., '100%', '50px').
 *
 * @example
 * ```tsx
 * const width = calcSkeletonWidth({ $width: 50 });
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

interface CalcSkeletonHeightProps extends CalcSkeletonBaseProps {
    /**
     * An optional height value for the skeleton, either in pixels or as a CSS value.
     */
    $height?: number | string;
}

/**
 * Calculates the height for a skeleton element.
 * This function returns either null as the default height, a specific pixel value, or any other specified CSS height value.
 *
 * @param props         The properties for skeleton height calculation.
 * @param props.$height The height value for the skeleton.
 * @returns A string representing the height (e.g., '50px') or null.
 *
 * @example
 * ```tsx
 * const height = calcSkeletonHeight({ $height: '3rem' });
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

/**
 * Calculates the Debug CSS for a given element (col, container, row, spacer).
 *
 * @param element The element to generate Debug CSS for.
 *
 * @returns The CSS code to apply the Debug styling.
 */
export const debugCss = (element: 'col' | 'container' | 'row' | 'spacer') => ({theme}: {theme: Theme}) => {
    if (process.env.NODE_ENV !== 'production') {
        const backgroundColor = getConfig(theme).debug[element].background;
        const paddingColor = getConfig(theme).debug[element].padding;
        const outlineColor = getConfig(theme).debug[element].outline;

        return css`
            &.debug {
                background-clip: content-box, padding-box;
                background-image:
                    linear-gradient(to bottom, ${backgroundColor} 0%, ${backgroundColor} 100%),
                    linear-gradient(to bottom, ${paddingColor} 0%, ${paddingColor} 100%);
                outline: ${outlineColor} solid 1px;
            }
        `;
    }

    return null;
};

/**
 * Merges the generated media queries of all given CSS functions into a single media query per breakpoint.
 *
 * This function takes an arbitrary number of CSS functions that are expected to return an array of media query strings.
 * The generated media queries are then merged into a single array of media query strings, using the responsive
 * breakpoints provided by the theme object. The resulting array can be used as the style for a component or element.
 *
 * @param cssFunctions An array of CSS functions to merge. Each function should take a single object argument that includes a `theme` property. The `theme` property should be an object containing responsive breakpoints and any other styles that are needed. Each function should return an array of strings, with one string for each responsive breakpoint that should be included. Each string should be a valid CSS rule set, suitable for use within a media query block. If the function returns null for any breakpoint, the corresponding index in the final array will also be null.
 *
 * @returns An array of strings, with one string for each responsive breakpoint. Each string is a valid CSS rule set wrapped in a media query block. If the function returns null for any breakpoint, the corresponding index in the final array will also be null.
 */
export const mergeMediaQueries = <T extends object>(
    ...cssFunctions: ((arg: T & {theme: Theme}) => (string | null)[] | null)[]
) => (props: T & {theme: Theme}) => {
        const mediaQueries = cssFunctions.map(cssFunction => cssFunction(props));

        return DIMENSIONS.map((screenSize, index) => {
            const mediaQuery = mediaQueries.map(query => query?.[index]).filter(Boolean).join('');

            return mediaQuery ? mediaInternal(screenSize, props.theme)`${mediaQuery}` : null;
        });
    };