import {useEffect, useReducer} from 'react';

import {useTheme} from 'styled-components';

import {getScreenSize} from '../layout';

import {useSkeletonStore} from './useSkeletonStore';

import type {Breakpoints, Theme} from 'src/sharedTypes';

/**
 * A custom React hook that provides screen size context and access to the skeleton store.
 * It uses a reducer to manage and update the screen size state based on window resize events.
 * Additionally, it provides access to the skeleton store for managing skeleton components based on screen size.
 *
 * @returns An object containing:
 * - `screenSize`: The current screen size (breakpoint) as a state.
 * - `skeletonStore`: An instance of the skeleton store used for managing skeleton states.
 *
 * @example
 * ```tsx
 * const { screenSize, skeletonStore } = useScreenContext();
 * ```
 */
export const useScreenContext = () => {
    const theme = useTheme();
    const skeletonStore = useSkeletonStore();
    const [screenSize, handleScreenSize] = useReducer((oldScreenSize: Breakpoints) => {
        const newScreenSize = getScreenSize(theme as Theme);

        if (newScreenSize !== oldScreenSize) {
            return newScreenSize;
        }

        return oldScreenSize;
    }, 'xxl' as const);

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