import React, {useEffect, useRef, useState} from 'react';

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
    const [screenClass, setScreenClass] = useState('xxl');
    const screenClassRef = useRef();
    const theme = useTheme();

    screenClassRef.current = screenClass;

    /**
     * Calculates the ScreenClass.
     */
    const setDerivedScreenClass = () => {
        const newScreenClass = getScreenClass(theme);

        if (newScreenClass !== screenClassRef.current) {
            setScreenClass(newScreenClass);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', setDerivedScreenClass);

        return () => window.removeEventListener('resize', setDerivedScreenClass);
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