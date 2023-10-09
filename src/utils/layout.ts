/* eslint-disable no-undefined, security/detect-object-injection */
import {css} from 'styled-components';

import {CONF_KEY} from '../defaultConfig';

import {generateMediaString, generateMediaStringBetween, getConfig} from './lib';

import type {Breakpoints, Theme} from '../sharedTypes';

type SpaceReturn<T extends Theme | undefined> = T extends Theme ? string : (args: {theme: Theme}) => string;

/**
 * Generates a CSS value for a given spacing value, based on the current grid configuration in the theme.
 *
 * This function uses the base spacing value from the grid configuration to convert the input
 * `space` value to rem. The base spacing value is defined in the `nfqgrid` section of the theme
 * object, and represents the base spacing unit for the grid system.
 *
 * @param space    The spacing value, specified in grid units.
 * @param preTheme The styled-components theme. Not needed if used in the context of a styled-component.
 *
 * @returns A CSS value for the spacing value, based on the current grid configuration in the theme.
 * @throws If the `theme` object does not contain a valid grid configuration.
 * @example
 * ```tsx
 * import styled from 'styled-components';
 * import {spacing} from '@nfq/react-grid';
 *
 * const Box = styled.div`
 *   padding: ${spacing(2)};
 * `;
 * ```
 */
export const spacing = <T extends Theme | undefined>(
    space: number,
    preTheme?: T
): SpaceReturn<T> => {
    if (preTheme) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return `${space * getConfig(preTheme).baseSpacing}rem` as any;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (({theme}: {theme: Theme}) => `${space * getConfig(theme).baseSpacing}rem`) as any;
};

/**
 * Returns the current screen size based on the viewport width. This function takes in a theme object
 * and uses the breakpoints defined in the `breakpoints` property of the configuration object to determine
 * the current screen size.
 *
 * @param theme The theme object which contains the breakpoints configuration.
 * @returns The current screen size as a string, one of `xs`, `sm`, `md`, `lg`, `xl`, or `xxl`.
 *
 * @throws If the theme is not a valid config object.
 *
 * @example
 * ```tsx
 * import {getScreenSize} from '@nfq/react-grid';
 * import {theme} from './theme';
 *
 * const screenSize = getScreenSize(theme);
 * // screenSize = 'md'
 * ```
 */
export const getScreenSize = (theme: Partial<Theme>) => {
    let viewport = null;
    let newScreenSize = 'xxl';

    const confKey = theme[CONF_KEY];

    if (!confKey) throw new Error('Theme must be a grid config theme.');

    // eslint-disable-next-line react-hooks-ssr/react-hooks-global-ssr, @typescript-eslint/no-unnecessary-condition
    if (window?.innerWidth) {
        viewport = window.innerWidth;
    }

    if (viewport) {
        const {breakpoints} = getConfig(theme as Theme);

        newScreenSize = 'xs';

        if (breakpoints.sm <= viewport) {
            newScreenSize = 'sm';
        }
        if (breakpoints.md <= viewport) {
            newScreenSize = 'md';
        }
        if (breakpoints.lg <= viewport) {
            newScreenSize = 'lg';
        }
        if (breakpoints.xl <= viewport) {
            newScreenSize = 'xl';
        }
        if (breakpoints.xxl <= viewport) {
            newScreenSize = 'xxl';
        }
    }

    return newScreenSize as Breakpoints;
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
 *   ${media('sm')} {
 *     font-size: 3rem;
 *   }
 * `;
 * ```
 */
export const media = (screenSize: Breakpoints, theme?: Partial<Theme>) => {
    if (typeof theme === 'object' && !(CONF_KEY in theme)) throw new Error('Theme must be a grid config theme.');

    return css`@media ${generateMediaString(screenSize, theme)}`;
};

/**
 * Creates a CSS media query using the given screen sizes and styled-components theme.
 *
 * @param screenSizeMin The min screen size for which the media query should be created. The size is specified using a member of the `Breakpoints` type.
 * @param screenSizeMax The max screen size for which the media query should be created. The size is specified using a member of the `Breakpoints` type.
 * @param theme         The styled-components theme. Not needed if used in the context of a styled-component.
 *
 * @returns A styled-components CSS template literal function that generates a media query for the given screen size.
 * @throws If the `theme` object is not a valid grid configuration object.
 * @example
 * ```tsx
 * import styled from 'styled-components';
 * import {mediaBetween} from '@nfq/react-grid';
 *
 * const Title = styled.h1`
 *   font-size: 2rem;
 *   ${mediaBetween('sm', 'lg')} {
 *     font-size: 3rem;
 *   }
 * `;
 * ```
 */
export const mediaBetween = (screenSizeMin: Breakpoints, screenSizeMax: Breakpoints, theme?: Partial<Theme>) => {
    if (typeof theme === 'object' && !(CONF_KEY in theme)) throw new Error('Theme must be a grid config theme.');

    return css`@media ${generateMediaStringBetween(screenSizeMin, screenSizeMax, theme)}`;
};