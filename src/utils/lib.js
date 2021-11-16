import {css} from 'styled-components';

import {CONF_KEY, DEFAULT_CONF} from '../defaultConfig';

const configCache = new Map();

/**
 * Creates an media query literal.
 *
 * @param {Object} theme      The styled-components theme.
 * @param {String} screenSize The screensize for the query.
 *
 * @returns {Function} An template literal function.
 */
export const media = (theme, screenSize) => {
    if (typeof theme === 'object' && CONF_KEY in theme) {
        return (...args) => css`
            @media ${generateMediaString(theme, screenSize)} {
                ${css(...args)}
            }
        `;
    }

    throw new Error('Theme must be an grid config theme.');
};

/**
 * Creates an media query literal.
 *
 * @param {Object} theme         The styled-components theme.
 * @param {String} screenSizeMin The minScreenSize for this media query.
 * @param {String} screenSizeMax The maxScreenSize for this media query.
 *
 * @returns {Function} An template literal function.
 */
export const mediaBetween = (theme, screenSizeMin, screenSizeMax) => {
    if (typeof theme === 'object' && CONF_KEY in theme) {
        return (...args) => css`
            @media ${generateMediaStringBetween(theme, screenSizeMin, screenSizeMax)} {
                ${css(...args)}
            }
        `;
    }

    throw new Error('Theme must be an grid config theme.');
};

/**
 * Gets the config merged with the defaults.
 *
 * @param {Object} theme The theme provider theme.
 *
 * @returns {Object} The actual complete config.
 */
export const getConfig = theme => {
    if (typeof theme === 'object' && CONF_KEY in theme) {
        if (configCache.has(theme[String(CONF_KEY)])) {
            return configCache.get(theme[String(CONF_KEY)]);
        }

        const conf = mergeDeep(DEFAULT_CONF, theme[String(CONF_KEY)]);

        configCache.set(theme[String(CONF_KEY)], conf);

        return conf;
    }

    throw new Error('Theme must be an grid config theme.');
};

/**
 * Gets the actual screen class.
 *
 * @param {Object} theme The styled-components theme.
 *
 * @returns {String} The actual screen class.
 */
export const getScreenClass = theme => {
    let viewport = null;
    let newScreenClass = 'xxl';

    // eslint-disable-next-line react-hooks-ssr/react-hooks-global-ssr
    if (typeof window !== 'undefined' && window.innerWidth) {
        viewport = window.innerWidth;
    }

    if (typeof theme === 'object' && CONF_KEY in theme) {
        if (viewport) {
            const {breakpoints} = getConfig(theme);

            newScreenClass = 'xs';

            if (breakpoints.sm <= viewport) {
                newScreenClass = 'sm';
            }
            if (breakpoints.md <= viewport) {
                newScreenClass = 'md';
            }
            if (breakpoints.lg <= viewport) {
                newScreenClass = 'lg';
            }
            if (breakpoints.xl <= viewport) {
                newScreenClass = 'xl';
            }
            if (breakpoints.xxl <= viewport) {
                newScreenClass = 'xxl';
            }
        }

        return newScreenClass;
    }

    throw new Error('Theme must be an grid config theme.');
};

/**
 * generates the media query string.
 *
 * @param {Object} theme      The styled-components theme.
 * @param {String} screenSize The screensize for the query.
 *
 * @returns {String} The media query head.
 */
const generateMediaString = (theme, screenSize) => {
    const conf = getConfig(theme);

    return `${conf.mediaQuery}${conf.breakpoints[String(screenSize)] >= 0 ? ` and (min-width: ${conf.breakpoints[String(screenSize)]}px)` : ''}`;
};

/**
 * generates the media query string.
 *
 * @param {Object} theme         The styled-components theme.
 * @param {String} screenSizeMin The minScreenSize for this media query.
 * @param {String} screenSizeMax The maxScreenSize for this media query.
 *
 * @returns {String} The media query head.
 */
const generateMediaStringBetween = (theme, screenSizeMin, screenSizeMax) => {
    const conf = getConfig(theme);

    return `${conf.mediaQuery} and (min-width: ${conf.breakpoints[String(screenSizeMin)]}px) and (max-width: ${conf.breakpoints[String(screenSizeMax)] - 1}px)`;
};

/**
 * Checks if value is an Object.
 *
 * @param {*} item Any value to check.
 *
 * @returns {Boolean} If the item is an object.
 */
const isObject = item => (item && typeof item === 'object' && !Array.isArray(item));

/**
 * Merges objects with another.
 *
 * @param {Object} target  The target object to merge everything into.
 * @param {Array}  sources All sources to merge from.
 *
 * @returns {Object} The merged object.
 */
const mergeDeep = (target, ...sources) => {
    if (!sources.length) {
        return target;
    }

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[String(key)])) {
                if (!target[String(key)]) {
                    Object.assign(target, {[key]: {}});
                }

                mergeDeep(target[String(key)], source[String(key)]);
            } else {
                Object.assign(target, {[key]: source[String(key)]});
            }
        });
    }

    return mergeDeep(target, ...sources);
};