import {useEffect, useReducer} from 'react';

import {configCache} from '../../utils/cache';
import {getScreenSize} from '../../utils/layout';
import {useSkeletonStore} from '../hooks/useSkeletonStore';

import type {Breakpoints} from '../../sharedTypes/breakpointTypes';

/**
 * Initializes and provides screen size and skeleton store state for context usage.
 * This hook is used internally by the `ScreenSizeProvider` component in the `@nfq/react-grid` system
 * to manage and expose responsive breakpoint information and the global `skeletonStore`. It calculates
 * the current screen size by reading the CSS custom property `--nfq-grid-screen-size`, and updates this
 * state reactively on window resize events.
 * The default screen size is initialized to the last breakpoint in the configured `breakpointOrder`.
 * It uses a `useReducer` for stable state transitions and ensures the value updates only when it changes.
 *
 * @returns An object containing the current `screenSize` and the global `skeletonStore` instance.
 *
 * @example
 * ```tsx
 * const { screenSize, skeletonStore } = useScreenSizeProvider();
 *
 * console.log(screenSize); // 'md', 'lg', etc.
 * ```
 */
export const useScreenSizeProvider = () => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;
    const skeletonStore = useSkeletonStore();
    const [screenSize, handleScreenSize] = useReducer((oldScreenSize: Breakpoints) => {
        const newScreenSize = getScreenSize();

        if (newScreenSize !== oldScreenSize) {
            return newScreenSize;
        }

        return oldScreenSize;
    // eslint-disable-next-line @nfq/no-magic-numbers
    }, breakpointOrder.at(-1)!);

    useEffect(() => {
        window.addEventListener('resize', handleScreenSize);
        handleScreenSize();

        return () => window.removeEventListener('resize', handleScreenSize);
    }, []);

    return {
        screenSize,
        skeletonStore
    };
};