import {configCache} from './cache';
import {mediaInternal} from './helpers';

/**
 * Merges the generated media queries of all given CSS functions into a single media query per breakpoint.
 * This function takes an arbitrary number of CSS functions that are expected to return an array of media query strings.
 * The generated media queries are then merged into a single array of media query strings, using the responsive
 * breakpoints provided by the theme object. The resulting array can be used as the style for a component or element.
 *
 * @param cssFunctions An array of CSS functions to merge. Each function should take a single object argument that includes a `theme` property. The `theme` property should be an object containing responsive breakpoints and any other styles that are needed. Each function should return an array of strings, with one string for each responsive breakpoint that should be included. Each string should be a valid CSS rule set, suitable for use within a media query block. If the function returns null for any breakpoint, the corresponding index in the final array will also be null.
 *
 * @returns An array of strings, with one string for each responsive breakpoint. Each string is a valid CSS rule set wrapped in a media query block. If the function returns null for any breakpoint, the corresponding index in the final array will also be null.
 */
export const mergeMediaQueries = <T extends object>(
    ...cssFunctions: ((arg: T) => (string | null)[] | null)[]
) => (props: T) => {
        const {breakpointOrder} = configCache.get('breakpointConfig')!;
        const mediaQueries = cssFunctions.map(cssFunction => cssFunction(props));

        return breakpointOrder.map((screenSize, index) => {
            // eslint-disable-next-line security/detect-object-injection
            const mediaQuery = mediaQueries.map(query => query?.[index]).filter(Boolean).join('');

            return mediaQuery ? mediaInternal(screenSize)`${mediaQuery}` : null;
        });
    };