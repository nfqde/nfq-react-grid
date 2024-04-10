/* eslint-disable security/detect-object-injection */
import {useContext, useEffect, useRef, useSyncExternalStore} from 'react';

import {useTheme} from 'styled-components';
import {v4 as uuid} from 'uuid';

import {ScreenSizeContext} from '../../grid/ScreenSizeProvider';
import {getInternalConfig} from '../lib';

import type {SkeletonStore, Theme} from '../../sharedTypes';

/**
 * A custom React hook for managing and applying animation styles to skeleton components within a group.
 * It uses context and ref hooks to manage the registration and unregistration of skeleton components in a store,
 * and applies CSS properties for animation delays based on the theme's skeleton configuration.
 *
 * @param count   The number of skeleton components within the group.
 * @param group   A unique identifier for the group of skeleton components. This is used to manage animations and styles across multiple skeletons in the same group.
 * @param variant The variant of the skeleton components, derived from the theme. This determines the specific styling and animation properties to be applied.
 * @returns The variant of the skeleton components, derived from the theme.
 *
 * @example
 * ```tsx
 * useSkeleton(3, 'mySkeletonGroup', 'primary');
 * ```
 */
export const useSkeleton = (count: number, group: string, variant?: keyof Required<Theme['nfqgrid']>['skeleton']) => {
    const theme = getInternalConfig(useTheme());
    const id = useRef(uuid());
    const store = useContext(ScreenSizeContext);
    const usedVariant = variant ?? theme.skeletonDefault;
    /**
     * A selector function for retrieving the state of a specific skeleton group from the `SkeletonStore`.
     * This function takes the entire state of the `SkeletonStore` and returns the state associated with the specified group.
     * It is used within the `useSkeleton` hook to access and manipulate the state of skeleton components
     * based on their group identifier.
     *
     * @param state The current state of the `SkeletonStore`.
     * @returns The state object of the specified skeleton group.
     *
     * @example
     * ```tsx
     * const groupState = selector(skeletonStore, 'mySkeletonGroup');
     * ```
     */
    const selector = (state: SkeletonStore) => state[String(group)];

    useEffect(() => {
        const stateId = id.current;

        store.skeletonStore.register(group, {
            count,
            id: stateId
        });

        return () => store.skeletonStore.unregister(group, stateId);
    }, [count, group, store.skeletonStore]);

    const state = useSyncExternalStore(
        store.skeletonStore.subscribe,
        () => selector(store.skeletonStore.get()),
        () => selector(store.skeletonStore.get())
    );

    useEffect(() => {
        if (group !== 'default') {
            document.querySelectorAll(`[data-skeletongroup="${group}"]`).forEach((element, index) => {
                (element as HTMLElement).style.setProperty('--skeleton-delay', `${theme.skeleton[usedVariant].animation.delay * index}s`);
            });
        }
    }, [group, state, theme.skeleton, usedVariant]);

    return usedVariant;
};