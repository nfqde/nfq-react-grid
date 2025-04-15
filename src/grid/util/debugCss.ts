import {css} from '@emotion/react';

/**
 * Generates debug CSS styles for a grid layout element in non-production environments.
 * This utility is part of the `@nfq/react-grid` development toolset and provides optional visual
 * styling for layout elements such as columns, containers, rows, and spacers. It uses CSS custom properties
 * prefixed with `--nfq-grid-debug-*` to control background color, padding indicators, and outlines.
 * When `NODE_ENV !== 'production'`, the function returns a `css` block that targets the `.debug` class,
 * allowing developers to toggle layout debugging styles by conditionally applying that class.
 * In production mode, it returns `null` to avoid injecting unnecessary styles.
 *
 * @param element The grid element type to debug (`'col'`, `'container'`, `'row'`, or `'spacer'`).
 * @returns A function that returns a styled-components `css` block for the debug styles, or `null` in production.
 *
 * @example
 * ```tsx
 * const debugStyles = debugCss('col')();
 *
 * const StyledColumn = styled.div`
 *   ${debugStyles}
 * `;
 *
 * // When the component has className "debug", it will display debug outlines and colors.
 * ```
 */
export const debugCss = (element: 'col' | 'container' | 'row' | 'spacer') => () => {
    if (process.env.NODE_ENV !== 'production') {
        return css`
            &.debug {
                background-clip: content-box, padding-box;
                background-image:
                    linear-gradient(to bottom, var(--nfq-grid-debug-${element}-background) 0%, var(--nfq-grid-debug-${element}-background) 100%),
                    linear-gradient(to bottom, var(--nfq-grid-debug-${element}-padding) 0%, var(--nfq-grid-debug-${element}-padding) 100%);
                outline: var(--nfq-grid-debug-${element}-outline) solid 1px;
            }
        `;
    }

    return null;
};