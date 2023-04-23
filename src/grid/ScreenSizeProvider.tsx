import React, {useEffect, useReducer} from 'react';

import {useTheme} from 'styled-components';

import {getScreenSize} from '../utils/lib';

import type {Breakpoints, Theme, WithChildren} from '../sharedTypes';

const defaultData = 'xxl';

export const ScreenSizeContext = React.createContext<Breakpoints>(defaultData);

/**
 * A component that provides the current screen size to its children via context.
 *
 * This component uses the `useTheme` and `useReducer` hooks to determine the current screen size and update it when
 * the window is resized. The current screen size is then provided to its child components via context.
 * It has to be an child of the styled-components Themeprovider.
 *
 * @param props          The props for the ScreenSizeProvider component.
 * @param props.children The child components to render.
 *
 * @returns The ScreenSizeProvider component.
 * @example
 * import {ThemeProvider} from 'styled-components';
 * import {ScreenSizeProvider} from '@nfq/react-grid';
 * import {theme} from './theme';
 *
 * const App = () => (
 *     <ThemeProvider theme={theme}>
 *         <ScreenSizeProvider>
 *             <App />
 *         </ScreenSizeProvider>
 *     </ThemeProvider>
 * );
 */
const ScreenSizeProvider = ({children}: WithChildren) => {
    const theme = useTheme();
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

    return (
        <ScreenSizeContext.Provider value={screenSize}>{children}</ScreenSizeContext.Provider>
    );
};

ScreenSizeProvider.displayName = 'ScreenSizeProvider';

export default ScreenSizeProvider;