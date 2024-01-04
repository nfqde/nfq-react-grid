import React from 'react';

import {useScreenContext} from '../utils/hooks/useScreenContext';

import type {Breakpoints, WithChildren} from '../sharedTypes';

type ContextData = ReturnType<typeof useScreenContext>;

const defaultData = {
    screenSize: 'xxl' as Breakpoints,
    skeletonStore: {
        get: () => undefined,
        register: () => undefined,
        subscribe: () => undefined
    }
} as unknown as ContextData;

export const ScreenSizeContext = React.createContext<ContextData>(defaultData);

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
 * ```tsx
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
 * ```
 */
const ScreenSizeProvider = ({children}: WithChildren) => {
    const context = useScreenContext();

    return (
        <ScreenSizeContext.Provider value={context}>{children}</ScreenSizeContext.Provider>
    );
};

ScreenSizeProvider.displayName = 'ScreenSizeProvider';

export default ScreenSizeProvider;