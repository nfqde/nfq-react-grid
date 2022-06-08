import React, {useEffect, useReducer} from 'react';

import {useTheme} from 'styled-components';

import {getScreenClass} from './lib';

const defaultData = 'xxl';

export const ScreenClassContext = React.createContext(defaultData);

/**
 * ScreenClassProvider Component.
 *
 * @param {object}          props          Component props.
 * @param {React.ReactNode} props.children Children.
 *
 * @returns {React.ReactNode} Component.
 */
const ScreenClassProvider = ({children}) => {
    const theme = useTheme();
    const [screenClass, handleScreenClass] = useReducer(oldScreenClass => {
        const newScreenClass = getScreenClass(theme);

        if (newScreenClass !== oldScreenClass) {
            return newScreenClass;
        }

        return oldScreenClass;
    }, 'xxl');

    useEffect(() => {
        window.addEventListener('resize', handleScreenClass);
        handleScreenClass();

        return () => window.removeEventListener('resize', handleScreenClass);
    }, []);

    return (
        <ScreenClassContext.Provider
            value={screenClass}
        >
            {children}
        </ScreenClassContext.Provider>
    );
};

ScreenClassProvider.displayName = 'ScreenClassProvider';

export default ScreenClassProvider;