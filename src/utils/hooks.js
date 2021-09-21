import {useEffect, useState} from 'react';

/**
 * Returns if the component is in debug mode.
 * Auto treeshakes in production.
 *
 * @returns {String} returns debug class.
 */
export const useDebug = () => {
    if (process.env.NODE_ENV !== 'production') {
        const [debug, setDebug] = useState(false);

        /**
         * Sets the debug state.
         *
         * @param {KeyboardEvent} e The keyboard event.
         */
        const toggleDebug = e => {
            if (e.ctrlKey && e.code === 'KeyD') {
                e.preventDefault();
                // eslint-disable-next-line no-invalid-this
                setDebug(oldDebug => ({debug: !oldDebug}));
            }
        };

        useEffect(() => {
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
 * @param {Object}   ref        The element ref to abserve.
 * @param {Function} observerCB The callback for the observer.
 */
export const useObserver = (ref, observerCB) => {
    useEffect(() => {
        const obs = new MutationObserver(observerCB);

        obs.observe(ref.current.parentElement, {attributes: true});

        return () => obs.disconnect();
    }, [ref]);
};