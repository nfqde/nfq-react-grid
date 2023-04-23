import {useEffect, useState} from 'react';

/**
 * Returns the debug class if the component is in debug mode. Auto treeshakes in production.
 * Provides also the ability to toggle the debug mode by pressing Ctrl+D.
 *
 * @returns The debug class if the component is in debug mode, otherwise an empty string.
 * @example
 * import {useDebug} from '@nfq/react-grid';
 *
 * const MyComponent = () => {
 *    const debug = useDebug();
 *
 *    return (
 *        <div className={debug}>
 *            // ...
 *        </div>
 *    );
 * };
 */
export const useDebug = () => {
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [debug, setDebug] = useState<boolean>(false);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            /**
             * Sets the debug state.
             *
             * @param e The keyboard event.
             */
            const toggleDebug = (e: KeyboardEvent) => {
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