import {DIMENSIONS} from '../defaultConfig';

import {media} from './lib';

/**
 * Caclulates the Align css.
 *
 * @param {String|Object} align The alignment for this row.
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
 * @param {Boolean|Array} noWrap    Defines if the row is wrapping or not.
 * @param {Boolean|Array} reverse   Reverse array or boolean.
 * @param {Object}        theme     The styled-components theme.
 *
 * @returns {String} The flex-direction css string.
 */
export const calcDirection = (direction, noWrap, reverse, theme) => {
    if (Array.isArray(reverse) || typeof direction === 'object') {
        let lastDirectionScreen = null;

        return DIMENSIONS.map(screenSize => {
            const {direction: usedDirection, lastScreen} = getDirection(direction, screenSize, lastDirectionScreen);
            const reverseFlag = getReverse(reverse, screenSize);
            const wrap = getNoWrap(noWrap, screenSize);

            lastDirectionScreen = lastScreen;

            return media(theme, screenSize)`
                flex-direction: ${usedDirection}${reverseFlag};
                flex-wrap: ${(usedDirection === 'row' && !wrap) ? `wrap${reverseFlag}` : 'nowrap'};
            `;
        });
    }

    const {direction: usedDirection} = getDirection(direction, null, null);
    const reverseFlag = getReverse(reverse, null);
    const wrap = getNoWrap(noWrap, null);

    return `
        flex-direction: ${usedDirection}${reverseFlag};
        flex-wrap: ${(usedDirection === 'row' && !wrap) ? `wrap${reverseFlag}` : 'nowrap'};
    `;
};

/**
 * Caclulates the Justify css.
 *
 * @param {String|Object} justify The justification for this row.
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
 * Gets the direction for this screenSize.
 *
 * @param {String|Object} direction         The direction config.
 * @param {String}        screenSize        The screen size class.
 * @param {String}        [lastScreen=null] The last screen size that had an direction defined.
 *
 * @returns {String} The direction to use.
 */
const getDirection = (direction, screenSize, lastScreen = null) => {
    const defaultDirection = 'row';

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
            return '-reverse';
        }

        return '';
    }

    return noWrap ? '-reverse' : '';
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