/* eslint-disable no-undefined, security/detect-object-injection */
import {css} from 'styled-components';

import {CONF_KEY, DEFAULT_CONF, DIMENSIONS} from '../defaultConfig';

import type {Config} from '../defaultConfig';
import type {Breakpoints, RecursiveRequired, Theme} from '../sharedTypes';

const configCache = new Map<Config, RecursiveRequired<Config>>();
const internalConfigCache = new Map<Config, Required<Config>>();

/**
 * Retrieves the complete configuration object by merging the user-provided configuration
 * with the default configuration. If the provided theme is not a configuration object,
 * an error is thrown.
 *
 * The `theme` object should follow the structure of the `Theme` type. If the `theme` object is incomplete,
 * the default configuration will be used for the missing properties. This function caches the result, so if the
 * same theme is passed multiple times, it will return the previously calculated configuration object.
 *
 * @param theme The theme object containing the configuration to use provided by styled-components.
 *
 * @returns The complete configuration object.
 * @throws If the provided theme is not a configuration object.
 *
 * @example
 * ```tsx
 * import {getConfig} from '@nfq/react-grid';
 * import {myTheme} from './theme';
 *
 * const config = getConfig(myTheme);
 *
 * // The returned configuration object is the result of merging the user-provided configuration
 * // with the default configuration.
 * ```
 */
export const getConfig = (theme: Theme): RecursiveRequired<Config> => {
    if (typeof theme === 'object' && CONF_KEY in theme) {
        if (configCache.has(theme[CONF_KEY])) {
            return configCache.get(theme[CONF_KEY])!;
        }

        const conf = mergeDeep(DEFAULT_CONF, theme[CONF_KEY]);

        configCache.set(theme[CONF_KEY], conf);

        return conf;
    }

    throw new Error('Theme must be an grid config theme.');
};

/**
 * Filters out null and undefined values.
 *
 * @param input The input to check.
 *
 * @returns True if the input is not null or undefined.
 *
 * @example
 * ```tsx
 * const arr = [1, 2, null, 3, undefined];
 * const filtered = arr.filter(isNotNullOrUndefined);
 * // filtered = [1, 2, 3];
 * ```
 */
const isNotNullOrUndefined = <T extends object>(
    input: T | null | undefined
): input is T => input !== null && typeof input !== 'undefined';

/**
 * Merges the provided `theme` with the default configuration and returns the complete configuration object. But
 * merged repeating values to the smallest possible screensize.
 *
 * The `theme` object should follow the structure of the `Theme` type. If the `theme` object is incomplete,
 * the default configuration will be used for the missing properties. This function caches the result, so if the
 * same theme is passed multiple times, it will return the previously calculated configuration object.
 *
 * @param theme The partial `Theme` object to merge with the default configuration.
 *
 * @returns The complete `Config` object with all the properties merged.
 * @throws If the `theme` object does not contain the `nfqgrid` property or if it is not a valid config object.
 *
 * @example
 * ```tsx
 * import {getInternalConfig} from '@nfq/react-grid';
 * import {myTheme} from './theme';
 *
 * const config = getInternalConfig(myTheme);
 *
 * // The returned configuration object is the result of merging the user-provided configuration
 * // with the default configuration.
 * ```
 */
export const getInternalConfig = (theme: Partial<Theme>): Required<Config> => {
    const confKey = theme[CONF_KEY];

    if (!confKey) throw new Error('Theme must be a grid config theme.');
    if (internalConfigCache.has(confKey)) return internalConfigCache.get(confKey)!;

    const conf = {
        ...DEFAULT_CONF,
        ...theme[CONF_KEY]
    } as Required<Config>;

    (['columns', 'columnGap', 'containerPadding'] as const)
        .forEach(prop => (conf[prop] = mergeScreens(conf[prop])));
    conf.container = mergeScreens(conf.container);

    internalConfigCache.set(confKey, conf);

    return conf;
};

/**
 * Merges the configuration properties that can repeat themselves across different screen sizes
 * in a responsive manner. The resulting configuration object includes only the defined values
 * and removes any undefined or repeated values.
 *
 * This function takes a full configuration object and reduces it in an partial configuration
 * object by removing any repeated values.
 * For example, if the `xs` property is set, and `sm` has the same defined value, the `sm` property
 * will be skipped, since it's already been defined.
 *
 * @param conf The full configuration object to be reduced.
 *
 * @returns The partial configuration object with the repeated values removed.
 *
 * @example
 * ```tsx
 * import {mergeScreens} from '@nfq/react-grid';
 *
 * const conf = {xs: 12, sm: 12, md: 6, lg: 6};
 * const merged = mergeScreens(conf);
 *
 * // merged = {xs: 12, md: 6};
 * ```
 */
export const mergeScreens = <T extends Partial<Record<Breakpoints, unknown>>>(conf: T): T => {
    let lastValue: number | 'fluid' = 0;

    return DIMENSIONS.map(screenSize => {
        if (
            (screenSize === 'xs' && conf[screenSize] === undefined)
            || (screenSize === 'xs' && conf[screenSize] === lastValue)
        ) {
            return {
                key: screenSize,
                val: lastValue
            };
        }

        if (conf[screenSize] === undefined || conf[screenSize] === lastValue) {
            return null;
        }

        lastValue = conf[screenSize]! as number | 'fluid';

        return {
            key: screenSize,
            val: lastValue
        };
    }).filter(isNotNullOrUndefined).reduce<T>((acc, {key, val}) => {
        acc[key] = val;

        return acc;
        // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    }, {} as T);
};

/**
 * Creates a CSS media query using the given screen size and styled-components theme.
 *
 * @param screenSize The screen size for which the media query should be created. The size is specified using a member of the `Breakpoints` type.
 * @param theme      The styled-components theme. Not needed if used in the context of a styled-component.
 *
 * @returns A styled-components CSS template literal function that generates a media query for the given screen size.
 * @throws If the `theme` object is not a valid grid configuration object.
 *
 * @example
 * ```tsx
 * import styled from 'styled-components';
 * import {media} from '@nfq/react-grid';
 *
 * const Title = styled.h1`
 *   font-size: 2rem;
 *   ${media('sm') {
 *     font-size: 3rem;
 *   }
 * `;
 * ```
 */
export const mediaInternal = (screenSize: Breakpoints, theme?: Partial<Theme>) => {
    if (typeof theme === 'object' && !(CONF_KEY in theme)) throw new Error('Theme must be a grid config theme.');

    return (...args: [TemplateStringsArray, ...(string | null)[]]) => css`
        @media ${generateMediaString(screenSize, theme)} {
            ${css(...args)}
        }
    `;
};

/**
 * Generates a media query string for a given screen size and theme.
 *
 * @param screenSize The screen size for which the media query should be created. The size is specified using a member of the `Breakpoints` type.
 * @param theme      The styled-components theme. Not needed if used in the context of a styled-component.
 * @returns The media query string with the specified screen size.
 *
 * @throws If the provided theme is not a valid grid config theme.
 */
export const generateMediaString = (screenSize: Breakpoints, theme?: Partial<Theme>) => {
    if (theme) {
        const conf = getConfig(theme as Theme);

        return `${conf.mediaQuery}${conf.breakpoints[screenSize] >= 0 ? ` and (min-width: ${conf.breakpoints[screenSize]}px)` : ''}`;
    }

    return ({theme: internalTheme}: {theme: Theme}) => {
        const conf = getConfig(internalTheme);

        return `${conf.mediaQuery}${conf.breakpoints[screenSize] >= 0 ? ` and (min-width: ${conf.breakpoints[screenSize]}px)` : ''}`;
    };
};

/**
 * Generates a media query string for a given screen size and theme.
 *
 * @param screenSizeMin The min screen size for which the media query should be created. The size is specified using a member of the `Breakpoints` type.
 * @param screenSizeMax The max screen size for which the media query should be created. The size is specified using a member of the `Breakpoints` type.
 * @param theme         The styled-components theme. Not needed if used in the context of a styled-component.
 * @returns The media query string with the specified screen size.
 *
 * @throws If the provided theme is not a valid grid config theme.
 */
export const generateMediaStringBetween = (
    screenSizeMin: Breakpoints,
    screenSizeMax: Breakpoints,
    theme?: Partial<Theme>
) => {
    if (theme) {
        const conf = getConfig(theme as Theme);

        return `${conf.mediaQuery} and (min-width: ${conf.breakpoints[screenSizeMin]}px) and (max-width: ${conf.breakpoints[screenSizeMax] - 1}px)`;
    }

    return ({theme: internalTheme}: {theme: Theme}) => {
        const conf = getConfig(internalTheme);

        return `${conf.mediaQuery} and (min-width: ${conf.breakpoints[screenSizeMin]}px) and (max-width: ${conf.breakpoints[screenSizeMax] - 1}px)`;
    };
};

/**
 * Checks whether a given value is an object.
 *
 * @param item The value to check.
 * @returns Whether the value is an object.
 *
 * @example
 * ```tsx
 * isObject({}) // true
 * isObject([]) // false
 * isObject(null) // false
 * isObject(undefined) // false
 * ```
 */
export const isObject = <T>(item: T) => (item && typeof item === 'object' && !Array.isArray(item));

/**
 * Recursively merges the properties of the source object into the target object.
 *
 * This function performs a deep merge, meaning that nested objects are merged as well. If a property exists in both the
 * target and source objects, the value from the source object will be used.
 *
 * @param target The target object to be merged into.
 * @param source The source object to merge from. If this parameter is undefined or null, the function will return the target object.
 * @returns The target object merged with the source object.
 *
 * @example
 * ```tsx
 * const target = {a: 1, b: {c: 2}};
 * const source = {b: {d: 3}};
 * mergeDeep(target, source);
 * // target = {a: 1, b: {c: 2, d: 3}}
 * ```
 */
const mergeDeep = <T extends object, S extends object>(target: T, source?: S): RecursiveRequired<T & S> => {
    if (!source) {
        return target as RecursiveRequired<T & S>;
    }

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key as keyof typeof source])) {
                if (!target[key as keyof typeof target]) {
                    Object.assign(target, {[key]: {}});
                }

                mergeDeep(target[key as keyof typeof target] as object, source[key as keyof typeof source] as object);
            } else {
                Object.assign(target, {[key]: source[key as keyof typeof source]});
            }
        });
    }

    return target as RecursiveRequired<T & S>;
};

/**
 * Retrieves the appropriate text based on the provided screen size.
 * This function is designed to offer a flexible way to determine which text should be displayed based on the current screen size.
 * It's particularly useful for responsive designs where the text content might need to change or be truncated based on the available screen real estate.
 *
 * @param screenTexts An object containing text values for each breakpoint. The keys represent the screen sizes, and the values are the corresponding text content. If a value for a specific breakpoint is `null`, the text from the previous breakpoint will be used.
 * @param screenSize  The current screen size, which should match one of the keys in the `screenTexts` object.
 * @returns The text that corresponds to the provided screen size.
 * @throws If the `xs` breakpoint is not defined.
 *
 * @example
 * ```tsx
 * const text = getResponsiveText({
 *     xs: 'Hello',
 *     sm: 'Hello World',
 *     md: 'Hello Beautiful World',
 *     lg: null,
 *     xl: 'Hello Gorgeous World',
 *     xxl: null
 * }, 'md');
 * console.log(text); // Outputs: "Hello Beautiful World"
 * ```
 */
export const getResponsiveText = (screenTexts: Record<Breakpoints, string | null>, screenSize: Breakpoints) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (screenTexts.xs === null || screenTexts.xs === undefined) {
        throw new Error('The xs breakpoint must be defined.');
    }

    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
    let text = screenTexts.xs;

    for (const size of breakpoints) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (screenTexts[size] !== null && screenTexts[size] !== undefined) {
            text = screenTexts[size]!;
        }
        if (size === screenSize) {
            break;
        }
    }

    return text;
};