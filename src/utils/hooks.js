import {useContext, useEffect, useMemo, useState} from 'react';

import {useTheme} from 'styled-components';

import {getConfig} from './lib';
import {ScreenClassContext} from './ScreenClassProvider';

/**
 * Returns if the component is in debug mode.
 * Auto treeshakes in production.
 *
 * @returns {string} Returns debug class.
 */
export const useDebug = () => {
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [debug, setDebug] = useState(false);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            /**
             * Sets the debug state.
             *
             * @param {KeyboardEvent} e The keyboard event.
             */
            const toggleDebug = e => {
                if (e.ctrlKey && e.code === 'KeyD') {
                    e.preventDefault();
                    // eslint-disable-next-line no-invalid-this
                    setDebug(oldDebug => (!oldDebug));
                }
            };

            if (process.env.NODE_ENV !== 'production') {
                window.addEventListener('keydown', toggleDebug);
            }

            return () => {
                if (process.env.NODE_ENV !== 'production') {
                    window.removeEventListener('keydown', toggleDebug);
                }
            };
        }, []);

        return debug ? 'debug' : '';
    }

    return '';
};

/**
 * Returns if the component is in debug mode.
 * Auto treeshakes in production.
 *
 * @param {object}           ref        The element ref to abserve.
 * @param {MutationCallback} observerCB The callback for the observer.
 */
export const useObserver = (ref, observerCB) => {
    useEffect(() => {
        const obs = new MutationObserver(observerCB);

        obs.observe(ref.current.parentElement, {attributes: true});

        return () => obs.disconnect();
    }, [ref, observerCB]);
};

/**
 * Returns the grid config.
 *
 * @returns {object} The grid config.
 */
export const useConfig = () => {
    const theme = useTheme();

    return useMemo(() => getConfig(theme), [theme]);
};

/**
 * Returns the viewport screenclass.
 *
 * @returns {string} The viewport screenclass.
 */
export const useScreenClass = () => useContext(ScreenClassContext);