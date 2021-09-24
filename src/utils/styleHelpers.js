import {DIMENSIONS} from '../defaultConfig';

import {PERCENTAGE} from './constants';
import {getConfig, media} from './lib';

/**
 * Caclulates the Align css.
 *
 * @param {Object}        theme The styled-components theme.
 * @param {String|Object} align The alignment for this column.
 *
 * @returns {String} The align css string.
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
 * @param {Object}        theme            The styled-components theme.
 * @param {String|Object} direction        The column direction.
 * @param {Boolean|Array} reverse          Reverse array or boolean.
 * @param {String}        defaultDirection The default direction to return.
 * @param {Boolean|Array} [noWrap=false]   If childs should wrap or not.
 *
 * @returns {String} The flex-direction css string.
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
 * @param {Object}        theme   The styled-components theme.
 * @param {String|Object} justify The justification for this row.
 *
 * @returns {String} The align css string.
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
 * @param {Object}        theme  The styled-components theme.
 * @param {String|Object} offset The offset for this column.
 *
 * @returns {String} The align css string.
 */
export const calcOffset = (theme, offset) => {
    if (typeof offset === 'object') {
        let lastScreen;
        const mediaQuery = DIMENSIONS.map(screenSize => {
            let offsetCss = null;

            if (typeof offset[String(screenSize)] === 'undefined' && lastScreen) {
                offsetCss = `margin-left: ${offset[String(lastScreen)] > 0 ? (offset[String(lastScreen)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE : 0}%;`;
            } else {
                lastScreen = screenSize;
                offsetCss = `margin-left: ${offset[String(screenSize)] > 0 ? (offset[String(screenSize)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE : 0}%;`;
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
 * Caclulates the Offset css.
 *
 * @param {Object} theme The styled-components theme.
 * @param {Object} sizes The sizes for this column.
 *
 * @returns {String} The align css string.
 */
export const calcSizes = (theme, sizes) => {
    let lastScreen;
    const mediaQuery = DIMENSIONS.map(screenSize => {
        let sizesCss = null;

        if (sizes[String(screenSize)] === null && lastScreen) {
            sizesCss = `
                flex: 1 1 ${(sizes[String(lastScreen)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE}%;
                max-width: ${(sizes[String(lastScreen)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE}%;
            `;
        // eslint-disable-next-line no-negated-condition
        } else if (sizes[String(screenSize)] !== null) {
            lastScreen = screenSize;
            sizesCss = `
                flex: 1 1 ${(sizes[String(screenSize)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE}%;
                max-width: ${(sizes[String(screenSize)] / getConfig(theme).columns[String(screenSize)]) * PERCENTAGE}%;
            `;
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
 * @param {Object}        theme     The styled-components theme.
 * @param {String}        direction The direction the spacer should expand in.
 * @param {Number|Object} x         The y value for the height.
 * @param {Number|Object} y         The y value for the height.
 *
 * @returns {String} The flex css.
 */
export const calcFlex = (theme, direction, x, y) => {
    const flexVal = direction === 'X' ? x : y;

    if (typeof flexVal === 'object' && flexVal !== null) {
        return DIMENSIONS.map(screenSize => {
            let lastScreen;
            let flexCss = null;

            if (typeof flexVal[String(screenSize)] !== 'undefined') {
                lastScreen = screenSize;
                flexCss = `flex: 1 1 ${flexVal[String(screenSize)] * getConfig(theme).baseSpacing}px;`;
            } else if (lastScreen) {
                flexCss = `flex: 1 1 ${flexVal[String(lastScreen)] * getConfig(theme).baseSpacing}px;`;
            } else {
                flexCss = 'flex: 1 1 0px;';
            }

            return media(theme, screenSize)`
                ${flexCss}
            `;
        });
    }

    return `flex: 1 1 ${flexVal === null ? 0 : flexVal * getConfig(theme).baseSpacing}px;`;
};

/**
 * Calculates the Height of the spacer.
 *
 * @param {Object}        theme  The styled-components theme.
 * @param {Number|Object} y      The y value for the height.
 *
 * @returns {String} The height css.
 */
export const calcHeight = (theme, y) => {
    if (typeof y === 'object') {
        return DIMENSIONS.map(screenSize => {
            let heightCss = null;

            if (typeof y[String(screenSize)] !== 'undefined') {
                heightCss = `
                    height: ${y[String(screenSize)] * getConfig(theme).baseSpacing}px;
                    min-height: ${y[String(screenSize)] * getConfig(theme).baseSpacing}px;
                `;
            }

            return media(theme, screenSize)`
                ${heightCss}
            `;
        });
    }

    return `
        height: ${y * getConfig(theme).baseSpacing}px;
        min-height: ${y * getConfig(theme).baseSpacing}px;
    `;
};

/**
 * Calculates the inline styles.
 *
 * @param {Object}        theme  The styled-components theme.
 * @param {Boolean|Array} inline An config info if the spacer is inline or not.
 *
 * @returns {String} The display css string.
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
 * @param {Object}        theme  The styled-components theme.
 * @param {Number|Object} maxY   The y value for the height.
 *
 * @returns {String} The max height css.
 */
export const calcMaxHeight = (theme, maxY) => {
    if (typeof maxY === 'object') {
        return DIMENSIONS.map(screenSize => {
            let heightCss = null;

            if (typeof maxY[String(screenSize)] !== 'undefined') {
                heightCss = `max-height: ${maxY[String(screenSize)] * getConfig(theme).baseSpacing}px;`;
            }

            return media(theme, screenSize)`
                ${heightCss}
            `;
        });
    }

    return `max-height: ${maxY * getConfig(theme).baseSpacing}px;`;
};

/**
 * Calculates the max Width of the spacer.
 *
 * @param {Object}        theme  The styled-components theme.
 * @param {Number|Object} maxX   The x value for the width.
 *
 * @returns {String} The max widt css.
 */
export const calcMaxWidth = (theme, maxX) => {
    if (typeof maxX === 'object') {
        return DIMENSIONS.map(screenSize => {
            let widthCss = null;

            if (typeof maxX[String(screenSize)] !== 'undefined') {
                widthCss = `max-width: ${maxX[String(screenSize)] * getConfig(theme).baseSpacing}px;`;
            }

            return media(theme, screenSize)`
                ${widthCss}
            `;
        });
    }

    return `max-width: ${maxX * getConfig(theme).baseSpacing}px;`;
};

/**
 * Calculates the width of the spacer.
 *
 * @param {Object}        theme  The styled-components theme.
 * @param {Number|Object} x      The y value for the height.
 *
 * @returns {String} The width css.
 */
export const calcWidth = (theme, x) => {
    if (typeof x === 'object') {
        return DIMENSIONS.map(screenSize => {
            let widthCss = null;

            if (typeof x[String(screenSize)] !== 'undefined') {
                widthCss = `
                    min-width: ${x[String(screenSize)] * getConfig(theme).baseSpacing}px;
                    width: ${x[String(screenSize)] * getConfig(theme).baseSpacing}px;
                `;
            }

            return media(theme, screenSize)`
                ${widthCss}
            `;
        });
    }

    return `
        min-width: ${x * getConfig(theme).baseSpacing}px;
        width: ${x * getConfig(theme).baseSpacing}px;
    `;
};

/**
 * Gets the direction for this screenSize.
 *
 * @param {String|Object} direction         The direction config.
 * @param {String}        defaultDirection  The default direction.
 * @param {String}        screenSize        The screen size class.
 * @param {String}        [lastScreen=null] The last screen size that had an direction defined.
 *
 * @returns {String} The direction to use.
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
 * @param {Boolean|Array} noWrap     The reverse flags or flag.
 * @param {String}        screenSize The screen size class.
 *
 * @returns {String} The reverse flag string.
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
 * @param {Boolean|Array} reverse    The reverse flags or flag.
 * @param {String}        screenSize The screen size class.
 *
 * @returns {String} The reverse flag string.
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