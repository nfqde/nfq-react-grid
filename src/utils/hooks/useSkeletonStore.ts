/* eslint-disable promise/prefer-await-to-callbacks */
import {useCallback, useRef} from 'react';

import type {SkeletonStore} from 'src/sharedTypes';

type callbackType = () => void;

/**
 * A custom React hook that creates and manages a skeleton store.
 * This store keeps track of registered skeleton components and their states.
 * The hook provides functions to register, unregister, and subscribe to changes in the skeleton store.
 * It is designed to manage the state of skeleton components across the application, ensuring consistent
 * behavior and updates.
 *
 * @returns An object containing methods to interact with the skeleton store:
 * - `get`: A function to retrieve the current state of the store.
 * - `register`: A function to register a new skeleton component in the store.
 * - `subscribe`: A function to subscribe to changes in the store.
 * - `unregister`: A function to unregister a skeleton component from the store.
 *
 * @example
 * ```tsx
 * const { get, register, subscribe, unregister } = useSkeletonStore();
 * ```
 */
export const useSkeletonStore = () => {
    const store = useRef<SkeletonStore>({default: []});
    const subscribers = useRef<Set<callbackType>>(new Set());

    /**
     * Retrieves the current state of the skeleton store.
     * This function is used to access the current state of registered skeleton components in the store.
     *
     * @returns The current state of the skeleton store.
     */
    const get = useCallback(() => store.current, []);

    /**
     * Registers a new skeleton component in the store.
     * This function adds a skeleton component to a specified group in the store and triggers an update
     * to all subscribers.
     *
     * @param group The group identifier to which the skeleton component belongs.
     * @param value The details of the skeleton component being registered, including count and id.
     */
    const register = useCallback((group: string, value: {count: number; id: string}) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!store.current[String(group)]) {
            store.current[String(group)] = [];
        }

        store.current[String(group)].push(value);
        store.current = structuredClone(store.current);

        subscribers.current.forEach((callback: callbackType) => callback());
    }, []);

    /**
     * Unregisters a skeleton component from the store.
     * This function removes a skeleton component from a specified group in the store and triggers an update
     * to all subscribers.
     *
     * @param group The group identifier from which the skeleton component is to be removed.
     * @param value The id of the skeleton component being unregistered.
     */
    const unregister = useCallback((group: string, value: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!store.current[String(group)]) {
            return;
        }

        store.current[String(group)] = store.current[String(group)].filter(item => item.id !== value);
        store.current = structuredClone(store.current);

        subscribers.current.forEach((callback: callbackType) => callback());
    }, []);

    /**
     * Subscribes to changes in the skeleton store.
     * This function adds a callback to the set of subscribers that will be notified whenever the store is updated.
     * Returns a function to unsubscribe the callback from the store.
     *
     * @param callback The callback function to be executed when the store updates.
     * @returns A function to unsubscribe the provided callback from the store.
     */
    const subscribe = useCallback((callback: callbackType) => {
        subscribers.current.add(callback);

        return () => subscribers.current.delete(callback);
    }, []);

    return {
        get,
        register,
        subscribe,
        unregister
    };
};