import {DIMENSIONS} from '../defaultConfig';

import {getConfig, media} from './lib';

/**
 * Calculates the flex prop defined through the direction of the parent.
 *
 * @param {String}        direction The direction the spacer should expand in.
 * @param {Object}        theme     The styled-components theme.
 * @param {Number|Object} x         The y value for the height.
 * @param {Number|Object} y         The y value for the height.
 *
 * @returns {String} The flex css.
 */
export const calcFlex = (direction, theme, x, y) => {
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
 * @param {Boolean|Array} inline An config info if the spacer is inline or not.
 * @param {Object}        theme  The styled-components theme.
 *
 * @returns {String} The display css string.
 */
export const calcInline = (inline, theme) => {
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
 * @param {Number|Object} maxY   The y value for the height.
 * @param {Object}        theme  The styled-components theme.
 *
 * @returns {String} The max height css.
 */
export const calcMaxHeight = (maxY, theme) => {
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
 * @param {Number|Object} maxX   The x value for the width.
 * @param {Object}        theme  The styled-components theme.
 *
 * @returns {String} The max widt css.
 */
export const calcMaxWidth = (maxX, theme) => {
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