/* eslint-disable no-undefined, complexity, security/detect-object-injection, max-lines */
import {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';

import {HALF, PERCENTAGE} from './constants';
import {getConfig, getInternalConfig, media} from './lib';

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
    let lastColumnGap: string;
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

        const columnGap = `column-gap: ${((gapConfig ?? lastGapConfig) === 'no-column' || (gapConfig ?? lastGapConfig) === true) ? 'normal' : `${String(gap ?? lastGap)}px`};`;
        const rowGap = `row-gap: ${((gapConfig ?? lastGapConfig) === 'no-row' || (gapConfig ?? lastGapConfig) === true) ? 'normal' : `${String(gap ?? lastGap)}px`};`;

        if (lastColumnGap !== columnGap || lastRowGap !== rowGap) {
            lastColumnGap = columnGap;
            lastRowGap = rowGap;

            return `
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
    let lastGap: number;
    let lastRealSize: string;
    let lastMaxRealSize: string;

    if (Object.keys($sizes).length > 0) {
        const mediaQuery = DIMENSIONS.map(screenSize => {
            const gap = getInternalConfig(theme).columnGap[screenSize];
            const colCount = getInternalConfig(theme).columns[screenSize];
            const size = $sizes[screenSize];
            let realSize: string;
            let maxRealSize: string;

            if (gap !== undefined) {
                lastGap = gap;
            }
            if (colCount) {
                lastColCount = colCount;
            }
            if (size) {
                lastColSize = size;
            }

            if (['auto', 'max-content', 'min-content'].includes((size ?? lastColSize) as StringSizes)) {
                maxRealSize = (size ?? lastColSize) as StringSizes;
                realSize = (size ?? lastColSize) as StringSizes;
            } else {
                const col = colCount ?? lastColCount;
                const cappedSize = ((size ?? lastColSize) as number > col) ? col : (size ?? lastColSize) as number;

                maxRealSize = `${String((cappedSize / col) * PERCENTAGE)}%`;
                realSize = `calc(${String((cappedSize / col) * PERCENTAGE)}% - ${String(gap ?? lastGap)}px)`;
            }

            if (lastRealSize !== realSize && lastMaxRealSize !== maxRealSize) {
                lastRealSize = realSize;
                lastMaxRealSize = maxRealSize;

                return `
                    flex: ${realSize === 'auto' ? 'auto' : `1 1 ${realSize}`};
                    max-width: ${maxRealSize === 'auto' ? 'initial' : maxRealSize};
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
    let lastColumnGap: number;
    let lastOffset = 0;
    let lastRealOffset: string;
    const mediaQuery = DIMENSIONS.map(screenSize => {
        const colCount = getInternalConfig(theme).columns[screenSize];
        const columnGap = getInternalConfig(theme).columnGap[screenSize];
        const currentOffset = ($offset as OffsetObject)[screenSize];

        if (colCount) {
            lastColCount = colCount;
        }
        if (columnGap) {
            lastColumnGap = columnGap;
        }
        if (currentOffset) {
            lastOffset = currentOffset;
        }

        const col = colCount ?? lastColCount;
        const finalOffset = currentOffset ?? lastOffset;
        const cappedOffset = (finalOffset > col) ? col : finalOffset;
        const realOffset = finalOffset === 0 ? '' : `calc(${String((cappedOffset / col) * PERCENTAGE)}% + ${String((columnGap ?? lastColumnGap) / HALF)}px)`;

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

/**
 * Calculates the container padding css based on the provided theme object.
 *
 * This function calculates the container padding for each screen size in the DIMENSIONS constant using the values
 * provided in the theme's `containerPadding` object. The resulting css string should be used as a CSS-in-JS style
 * to apply container padding.
 *
 * @param props       The styled-component props object.
 * @param props.theme The styled-components theme.
 *
 * @returns An array of css strings representing the calculated container padding.
 */
export const calcContainerPadding = ({theme}: {theme: Theme}) => {
    const mediaQuery = DIMENSIONS.map(screenSize => {
        const columnGap = getInternalConfig(theme).containerPadding[screenSize];

        if (columnGap) {
            return `
                padding-left: ${String(columnGap)}px;
                padding-right: ${String(columnGap)}px;
            `;
        }

        return null;
    });

    return mediaQuery;
};

interface calcContainerSizeProps {
    $isFluid?: Breakpoints[] | boolean;
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
 * @param props          The styled-components props object.
 * @param props.theme    The styled-components theme.
 * @param props.$isFluid If the container is fluid or not. Defaults to an empty array.
 *
 * @returns An array that contains the width css strings for each screen size for the given configuration.
 */
export const calcContainerSize = ({$isFluid, theme}: calcContainerSizeProps) => {
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
            ? '100%' : `${containerSize ?? lastContainerSize}px`;

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

        if (currentAuto) {
            lastAuto = currentAuto;
        }
        if (currentMax) {
            lastMax = currentMax;
        }

        const realMax = currentMax ?? lastMax;
        const realAuto = currentAuto ?? lastAuto;
        // eslint-disable-next-line no-nested-ternary
        const realCss = realMax
            ? `${(realMax * spacing)}rem`
            // eslint-disable-next-line no-nested-ternary
            : currentNoStretch
                ? realAuto
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

            return mediaQuery ? media(screenSize, props.theme)`${mediaQuery}` : null;
        });
    };