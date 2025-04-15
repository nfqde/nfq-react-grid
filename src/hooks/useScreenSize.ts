import {useContext} from 'react';

import {ScreenSizeContext} from '../grid/ScreenSizeProvider';

/**
 * React hook that provides access to the current responsive screen size from context.
 * This hook reads the `screenSize` value from the `ScreenSizeContext`, which must be provided
 * by a parent component using the `useScreenSizeProvider` hook or a custom context provider.
 * It returns the current breakpoint (e.g., `'xs'`, `'md'`, `'xl'`) based on the active layout size.
 * This is a convenient abstraction for components that need to adapt to different screen widths
 * using the `@nfq/react-grid` responsive system.
 *
 * @returns The current screen size as a `Breakpoints` string.
 *
 * @example
 * ```tsx
 * const screenSize = useScreenSize();
 *
 * return (
 *   <p>Current breakpoint: {screenSize}</p>
 * );
 * ```
 */
export const useScreenSize = () => {
    const {screenSize} = useContext(ScreenSizeContext);

    return screenSize;
};