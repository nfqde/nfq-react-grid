/* eslint-disable max-lines */
import {DIMENSIONS} from '../defaultConfig';

import {HALF, PERCENTAGE} from './constants';
import {getConfig, media} from './lib';

/**
 * Caclulates the Padding left css.
 *
 * @param {object}              theme            The styled-components theme.
 * @param {string|ExtraPadding} extraPadding     The offset for this column.
 * @param {string|ExtraPadding} extraPaddingLeft The offset for this column.
 *
 * @returns {Array<string>} The align css string.
 */
export const calcPaddingLeft = (theme, extraPadding, extraPaddingLeft) => {
    if (extraPadding) {
        // eslint-disable-next-line no-param-reassign
        extraPaddingLeft = extraPadding;
    }

    let lastScreen;
    const mediaQuery = DIMENSIONS.map(screenSize => {
        let paddingLeftCss = null;

        if (
            extraPaddingLeft
            && typeof extraPaddingLeft === 'object'
            && typeof extraPaddingLeft[String(screenSize)] === 'undefined'
            && lastScreen
        ) {
            paddingLeftCss = `padding-left: calc(${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px + ${extraPaddingLeft[String(lastScreen)]});`;
        } else if (extraPaddingLeft && typeof extraPaddingLeft === 'object') {
            lastScreen = screenSize;
            paddingLeftCss = `padding-left: calc(${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px + ${extraPaddingLeft[String(screenSize)]});`;
        } else if (extraPaddingLeft) {
            paddingLeftCss = `padding-left: calc(${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px + ${extraPaddingLeft});`;
        } else {
            paddingLeftCss = `padding-left: ${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px;`;
        }

        return media(theme, screenSize)`
            ${paddingLeftCss}
        `;
    });

    return mediaQuery;
};

/**
 * Caclulates the Offset css.
 *
 * @param {object}              theme             The styled-components theme.
 * @param {string|ExtraPadding} extraPadding      The offset for this column.
 * @param {string|ExtraPadding} extraPaddingRight The offset for this column.
 *
 * @returns {Array<string>} The align css string.
 */
export const calcPaddingRight = (theme, extraPadding, extraPaddingRight) => {
    if (extraPadding) {
        // eslint-disable-next-line no-param-reassign
        extraPaddingRight = extraPadding;
    }

    let lastScreen;
    const mediaQuery = DIMENSIONS.map(screenSize => {
        let paddingRightCss = null;

        if (
            extraPaddingRight
            && typeof extraPaddingRight === 'object'
            && typeof extraPaddingRight[String(screenSize)] === 'undefined'
            && lastScreen
        ) {
            paddingRightCss = `padding-right: calc(${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px + ${extraPaddingRight[String(lastScreen)]});`;
        } else if (extraPaddingRight && typeof extraPaddingRight === 'object') {
            lastScreen = screenSize;
            paddingRightCss = `padding-right: calc(${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px + ${extraPaddingRight[String(screenSize)]});`;
        } else if (extraPaddingRight) {
            paddingRightCss = `padding-right: calc(${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px + ${extraPaddingRight});`;
        } else {
            paddingRightCss = `padding-right: ${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px;`;
        }

        return media(theme, screenSize)`
            ${paddingRightCss}
        `;
    });

    return mediaQuery;
};

/**
 * Caclulates the Align css.
 *
 * @param {object}       theme The styled-components theme.
 * @param {string|Align} align The alignment for this column.
 *
 * @returns {string|Array<string>} The align css string.
 */
export const calcAlign = (theme, align) => {
    if (typeof align === 'object') {
        return DIMENSIONS.map(screenSize => {
            let alignCss = null;

            if (align[String(screenSize)]) {
                alignCss = `align-items: ${align[String(screenSize)]}`;
            }

            return media(theme, screenSize)`
                ${alignCss}
            `;
        });
    }

    return `align-items: ${align};`;
};

/**
 * Calculates the flex-direction value.
 *
 * @param {object}                     theme            The styled-components theme.
 * @param {FlexDirection|Direction}    direction        The column direction.
 * @param {boolean|Array<Screensizes>} reverse          Reverse array or boolean.
 * @param {FlexDirection}              defaultDirection The default direction to return.
 * @param {boolean|Array<Screensizes>} [noWrap=false]   If childs should wrap or not.
 *
 * @returns {string|Array<string>} The flex-direction css string.
 */
export const calcDirection = (theme, direction, reverse, defaultDirection, noWrap = false) => {
    if (Array.isArray(reverse) || typeof direction === 'object') {
        let lastDirectionScreen = null;

        return DIMENSIONS.map(screenSize => {
            const {direction: usedDirection, lastScreen} = getDirection(
                direction,
                defaultDirection,
                screenSize,
                lastDirectionScreen
            );
            const reverseFlag = getReverse(reverse, screenSize);
            const wrap = getNoWrap(noWrap, screenSize);

            lastDirectionScreen = lastScreen;

            return media(theme, screenSize)`
                flex-flow: ${usedDirection}${reverseFlag} ${(usedDirection === 'row' && !wrap) ? `wrap${reverseFlag}` : 'nowrap'};
            `;
        });
    }

    const {direction: usedDirection} = getDirection(direction, defaultDirection, null, null);
    const reverseFlag = getReverse(reverse, null);
    const wrap = getNoWrap(noWrap, null);

    return `
        flex-flow: ${usedDirection}${reverseFlag} ${(usedDirection === 'row' && !wrap) ? `wrap${reverseFlag}` : 'nowrap'};
    `;
};

/**
 * Caclulates the Justify css.
 *
 * @param {object}         theme   The styled-components theme.
 * @param {string|Justify} justify The justification for this row.
 *
 * @returns {string|Array<string>} The align css string.
 */
export const calcJustify = (theme, justify) => {
    if (typeof justify === 'object') {
        const mediaQuery = DIMENSIONS.map(screenSize => {
            let justifyCss = null;

            if (justify[String(screenSize)]) {
                justifyCss = `justify-content: ${justify[String(screenSize)]}`;
            }

            return media(theme, screenSize)`
                ${justifyCss}
            `;
        });

        return mediaQuery;
    }

    return `justify-content: ${justify};`;
};

/**
 * Caclulates the Offset css.
 *
 * @param {object}        theme  The styled-components theme.
 * @param {number|Offset} offset The offset for this column.
 *
 * @returns {string|Array<string>} The align css string.
 */
export const calcOffset = (theme, offset) => {
    if (typeof offset === 'object') {
        let lastScreen;
        const mediaQuery = DIMENSIONS.map(screenSize => {
            let offsetCss = null;

            if (typeof offset[String(screenSize)] === 'undefined' && lastScreen) {
                offsetCss = `margin-left: ${(offset[String(lastScreen)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE}%;`;
            // eslint-disable-next-line no-negated-condition
            } else if (typeof offset[String(screenSize)] !== 'undefined') {
                lastScreen = screenSize;
                offsetCss = `margin-left: ${(offset[String(screenSize)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE}%;`;
            } else {
                // eslint-disable-next-line no-lonely-if
                if (process.env.NODE_ENV !== 'production') {
                    console.warn(`This is an mobile first grid system. It seems as if you did forget to specify ${screenSize} for your offset in your Col`);
                }
            }

            return media(theme, screenSize)`
                ${offsetCss}
            `;
        });

        return mediaQuery;
    }

    return `margin-left: ${(offset / getConfig(theme).columns.xs) * PERCENTAGE}%;`;
};

/**
 * Caclulates the sizes css.
 *
 * @param {object} theme The styled-components theme.
 * @param {Sizes}  sizes The sizes for this column.
 *
 * @returns {string|Array<string>} The align css string.
 */
export const calcSizes = (theme, sizes) => {
    let lastScreen;
    const mediaQuery = DIMENSIONS.map(screenSize => {
        let sizesCss = null;

        if (sizes[String(screenSize)] === null && lastScreen) {
            if (['auto', 'max-content', 'min-content'].includes(sizes[String(lastScreen)])) {
                sizesCss = `
                    flex: 1 1 ${sizes[String(lastScreen)]};
                    max-width: ${sizes[String(lastScreen)] === 'auto' ? '100%' : sizes[String(lastScreen)]};
                `;
            } else {
                sizesCss = `
                    flex: 1 1 ${(sizes[String(lastScreen)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE}%;
                    max-width: ${(sizes[String(lastScreen)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE}%;
                `;
            }
        // eslint-disable-next-line no-negated-condition
        } else if (sizes[String(screenSize)] !== null) {
            lastScreen = screenSize;
            if (['auto', 'max-content', 'min-content'].includes(sizes[String(screenSize)])) {
                sizesCss = `
                    flex: 1 1 ${sizes[String(screenSize)]};
                    max-width: ${sizes[String(screenSize)] === 'auto' ? '100%' : sizes[String(screenSize)]};
                `;
            } else {
                sizesCss = `
                    flex: 1 1 ${(sizes[String(screenSize)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE}%;
                    max-width: ${(sizes[String(screenSize)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE}%;
                `;
            }
        } else {
            sizesCss = null;
        }

        return media(theme, screenSize)`
            ${sizesCss}
        `;
    });

    return mediaQuery;
};

/**
 * Calculates the flex prop defined through the direction of the parent.
 *
 * @param {object}       theme     The styled-components theme.
 * @param {string}       direction The direction the spacer should expand in.
 * @param {number|Sizes} x         The y value for the height.
 * @param {number|Sizes} y         The y value for the height.
 *
 * @returns {string|Array<string>} The flex css.
 */
export const calcFlex = (theme, direction, x, y) => {
    const flexVal = direction === 'X' ? x : y;

    if (typeof flexVal === 'object' && flexVal !== null) {
        return DIMENSIONS.map(screenSize => {
            let lastScreen;
            let flexCss = null;

            if (typeof flexVal[String(screenSize)] !== 'undefined') {
                lastScreen = screenSize;
                flexCss = `flex: 1 1 ${flexVal[String(screenSize)] * getConfig(theme).baseSpacing}rem;`;
            } else if (lastScreen) {
                flexCss = `flex: 1 1 ${flexVal[String(lastScreen)] * getConfig(theme).baseSpacing}rem;`;
            } else {
                flexCss = 'flex: 1 1 0rem;';
            }

            return media(theme, screenSize)`
                ${flexCss}
            `;
        });
    }

    return `flex: 1 1 ${flexVal === null ? 0 : /** @type {number} */ (flexVal) * getConfig(theme).baseSpacing}rem;`;
};

/**
 * Calculates the Height of the spacer.
 *
 * @param {object}       theme The styled-components theme.
 * @param {number|Sizes} y     The y value for the height.
 *
 * @returns {string|Array<string>} The height css.
 */
export const calcHeight = (theme, y) => {
    if (typeof y === 'object') {
        return DIMENSIONS.map(screenSize => {
            let heightCss = null;

            if (typeof y[String(screenSize)] !== 'undefined') {
                heightCss = `
                    height: ${y[String(screenSize)] * getConfig(theme).baseSpacing}rem;
                    min-height: ${y[String(screenSize)] * getConfig(theme).baseSpacing}rem;
                `;
            }

            return media(theme, screenSize)`
                ${heightCss}
            `;
        });
    }

    return `
        height: ${y * getConfig(theme).baseSpacing}rem;
        min-height: ${y * getConfig(theme).baseSpacing}rem;
    `;
};

/**
 * Calculates the inline styles.
 *
 * @param {object}                     theme  The styled-components theme.
 * @param {boolean|Array<Screensizes>} inline An config info if the spacer is inline or not.
 *
 * @returns {string|Array<string>} The display css string.
 */
export const calcInline = (theme, inline) => {
    if (Array.isArray(inline)) {
        return DIMENSIONS.map(screenSize => {
            let inlineCss;

            if (inline.includes(screenSize)) {
                inlineCss = 'display: inline-block;';
            } else {
                inlineCss = 'display: block;';
            }

            return media(theme, screenSize)`
                ${inlineCss}
            `;
        });
    }

    return inline ? 'display: inline-block;' : 'display: block;';
};

/**
 * Calculates the max Height of the spacer.
 *
 * @param {object}       theme The styled-components theme.
 * @param {number|Sizes} maxY  The y value for the height.
 *
 * @returns {string|Array<string>} The max height css.
 */
export const calcMaxHeight = (theme, maxY) => {
    if (typeof maxY === 'object') {
        return DIMENSIONS.map(screenSize => {
            let heightCss = null;

            if (typeof maxY[String(screenSize)] !== 'undefined') {
                heightCss = `max-height: ${maxY[String(screenSize)] * getConfig(theme).baseSpacing}rem;`;
            }

            return media(theme, screenSize)`
                ${heightCss}
            `;
        });
    }

    return `max-height: ${maxY * getConfig(theme).baseSpacing}rem;`;
};

/**
 * Calculates the max Width of the spacer.
 *
 * @param {object}       theme The styled-components theme.
 * @param {number|Sizes} maxX  The x value for the width.
 *
 * @returns {string|Array<string>} The max widt css.
 */
export const calcMaxWidth = (theme, maxX) => {
    if (typeof maxX === 'object') {
        return DIMENSIONS.map(screenSize => {
            let widthCss = null;

            if (typeof maxX[String(screenSize)] !== 'undefined') {
                widthCss = `max-width: ${maxX[String(screenSize)] * getConfig(theme).baseSpacing}rem;`;
            }

            return media(theme, screenSize)`
                ${widthCss}
            `;
        });
    }

    return `max-width: ${maxX * getConfig(theme).baseSpacing}rem;`;
};

/**
 * Calculates the width of the spacer.
 *
 * @param {object}       theme The styled-components theme.
 * @param {number|Sizes} x     The y value for the height.
 *
 * @returns {string|Array<string>} The width css.
 */
export const calcWidth = (theme, x) => {
    if (typeof x === 'object') {
        return DIMENSIONS.map(screenSize => {
            let widthCss = null;

            if (typeof x[String(screenSize)] !== 'undefined') {
                widthCss = `
                    min-width: ${x[String(screenSize)] * getConfig(theme).baseSpacing}rem;
                    width: ${x[String(screenSize)] * getConfig(theme).baseSpacing}rem;
                `;
            }

            return media(theme, screenSize)`
                ${widthCss}
            `;
        });
    }

    return `
        min-width: ${x * getConfig(theme).baseSpacing}rem;
        width: ${x * getConfig(theme).baseSpacing}rem;
    `;
};

/**
 * Gets the direction for this screenSize.
 *
 * @param {FlexDirection|Direction} direction         The direction config.
 * @param {FlexDirection}           defaultDirection  The default direction.
 * @param {string}                  screenSize        The screen size class.
 * @param {string}                  [lastScreen=null] The last screen size that had an direction defined.
 *
 * @returns {{direction: FlexDirection, lastScreen?: string}} The direction to use.
 */
const getDirection = (direction, defaultDirection, screenSize, lastScreen = null) => {
    if (typeof direction === 'object') {
        if (direction[String(screenSize)]) {
            return {
                direction: direction[String(screenSize)],
                lastScreen: screenSize
            };
        } else if (!direction[String(screenSize)] && lastScreen) {
            return {
                direction: direction[String(lastScreen)],
                lastScreen
            };
        }

        return {
            direction: defaultDirection,
            lastScreen
        };
    }

    return {
        direction: direction ?? defaultDirection,
        lastScreen
    };
};

/**
 * Gets the reverse flag if needed.
 *
 * @param {boolean|Array<Screensizes>} noWrap     The reverse flags or flag.
 * @param {Screensizes}                screenSize The screen size class.
 *
 * @returns {string|boolean} The reverse flag string.
 */
const getNoWrap = (noWrap, screenSize) => {
    if (Array.isArray(noWrap)) {
        if (noWrap.includes(screenSize)) {
            return true;
        }

        return false;
    }

    return noWrap;
};

/**
 * Gets the reverse flag if needed.
 *
 * @param {boolean|Array} reverse    The reverse flags or flag.
 * @param {string}        screenSize The screen size class.
 *
 * @returns {string} The reverse flag string.
 */
const getReverse = (reverse, screenSize) => {
    if (Array.isArray(reverse)) {
        if (reverse.includes(screenSize)) {
            return '-reverse';
        }

        return '';
    }

    return reverse ? '-reverse' : '';
};