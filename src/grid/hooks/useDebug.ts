import {useEffect, useState} from 'react';

/**
 * React hook for toggling a `debug` class name in development mode using a keyboard shortcut.
 * This hook is part of the `@nfq/react-grid` developer tooling and enables interactive toggling
 * of debug styles by pressing `Ctrl + D`. It returns the string `"debug"` when enabled,
 * which can be conditionally applied as a `className` on layout components to activate debug visuals.
 * The hook does nothing and always returns an empty string in production environments,
 * ensuring it has no impact on bundle size or runtime behavior outside of development.
 *
 * @returns A string: `"debug"` when debug mode is active, or an empty string otherwise.
 *
 * @example
 * ```tsx
 * const debugClass = useDebug();
 *
 * return <div className={debugClass}>Debug me!</div>;
 * // Press Ctrl + D to toggle `.debug` styles in development
 * ```
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