/* eslint-disable security/detect-object-injection */
import {useContext, useEffect, useRef, useSyncExternalStore} from 'react';

import {v4 as uuid} from 'uuid';

import {ScreenSizeContext} from '../ScreenSizeProvider';

import type {SkeletonStore} from '../../sharedTypes/componentTypes';

/**
 * React hook for registering and tracking skeleton loading state by group.
 * The `useSkeleton` hook is part of the `@nfq/react-grid` system and allows skeleton components
 * to be grouped and tracked by a unique group identifier. It registers the component with the
 * `SkeletonStore`, listens for updates using `useSyncExternalStore`, and applies dynamic animation
 * delays to DOM elements with the corresponding `data-skeletongroup` attribute.
 * This hook ensures that skeletons within the same group animate with staggered delays for visual continuity.
 * It cleans up its registration on unmount to avoid memory leaks or invalid store state.
 *
 * @param count The number of skeleton elements in the group.
 * @param group A unique identifier string for the skeleton group.
 *
 * @example
 * ```tsx
 * useSkeleton(5, 'product-cards');
 *
 * return (
 *   <>
 *     {[...Array(5)].map((_, i) => (
 *       <Skeleton key={i} data-skeletongroup="product-cards" />
 *     ))}
 *   </>
 * );
 * ```
 */
export const useSkeleton = (count: number, group: string) => {
    const id = useRef(uuid());
    const store = useContext(ScreenSizeContext);

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
                // eslint-disable-next-line react-hooks-ssr/react-hooks-global-ssr
                const delay = window
                    .getComputedStyle(element)
                    .getPropertyValue('--nfq-grid-skeleton-animation-delay');

                (element as HTMLElement).style.setProperty('--skeleton-delay', `${parseFloat(delay) * index}s`);
            });
        }
    }, [group, state]);
};