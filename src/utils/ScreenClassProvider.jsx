import React, {useEffect, useReducer} from 'react';

import PropTypes from 'prop-types';
import {useTheme} from 'styled-components';

import {getScreenClass} from './lib';

const defaultData = 'xxl';

export const ScreenClassContext = React.createContext(defaultData);

/**
 * ScreenClassProvider class.
 *
 * @component
 * @augments {Component<Props, State>}
 * @returns {JSX} Component.
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
ScreenClassProvider.propTypes = {children: PropTypes.node.isRequired};

export default ScreenClassProvider;