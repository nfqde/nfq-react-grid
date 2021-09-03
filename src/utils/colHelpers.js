import {DIMENSIONS} from '../defaultConfig';

import {PERCENTAGE} from './constants';
import {getConfig, media} from './lib';

/**
 * Caclulates the Align css.
 *
 * @param {String|Object} align The alignment for this column.
 * @param {Object}        theme The styled-components theme.
 *
 * @returns {String} The align css string.
 */
export const calcAlign = (align, theme) => {
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
 * @param {String|Object} direction The column direction.
 * @param {Boolean|Array} reverse   Reverse array or boolean.
 * @param {Object}        theme     The styled-components theme.
 *
 * @returns {String} The flex-direction css string.
 */
export const calcDirection = (direction, reverse, theme) => {
    if (Array.isArray(reverse) || typeof direction === 'object') {
        let lastDirectionScreen = null;

        return DIMENSIONS.map(screenSize => {
            const {direction: usedDirection, lastScreen} = getDirection(direction, screenSize, lastDirectionScreen);
            const reverseFlag = getReverse(reverse, screenSize);

            lastDirectionScreen = lastScreen;

            return media(theme, screenSize)`
                flex-direction: ${usedDirection}${reverseFlag};
                flex-wrap: ${usedDirection === 'row' ? `wrap${reverseFlag}` : 'nowrap'};
            `;
        });
    }

    const {direction: usedDirection} = getDirection(direction, null, null);
    const reverseFlag = getReverse(reverse, null);

    return `
        flex-direction: ${usedDirection}${reverseFlag};
        flex-wrap: ${usedDirection === 'row' ? `wrap${reverseFlag}` : 'nowrap'};
    `;
};

/**
 * Caclulates the Justify css.
 *
 * @param {String|Object} justify The justification for this column.
 * @param {Object}        theme   The styled-components theme.
 *
 * @returns {String} The align css string.
 */
export const calcJustify = (justify, theme) => {
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
 * @param {String|Object} offset The offset for this column.
 * @param {Object}        theme  The styled-components theme.
 *
 * @returns {String} The align css string.
 */
export const calcOffset = (offset, theme) => {
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
 * @param {Object} sizes The sizes for this column.
 * @param {Object} theme The styled-components theme.
 *
 * @returns {String} The align css string.
 */
export const calcSizes = (sizes, theme) => {
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
 * Gets the direction for this screenSize.
 *
 * @param {String|Object} direction         The direction config.
 * @param {String}        screenSize        The screen size class.
 * @param {String}        [lastScreen=null] The last screen size that had an direction defined.
 *
 * @returns {String} The direction to use.
 */
const getDirection = (direction, screenSize, lastScreen = null) => {
    const defaultDirection = 'column';

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