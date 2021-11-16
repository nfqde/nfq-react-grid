/* eslint-disable react/boolean-prop-naming */
import React, {useContext} from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import {media, mediaBetween} from './lib';
import {ScreenClassContext} from './ScreenClassProvider';

/**
 * Visible
 *
 * @component
 * @augments {Component<Props, State>}
 * @returns {JSX} Component.
 */
const Visible = ({children, isLoadingHtml, ...screenClasses}) => {
    const screenClass = useContext(ScreenClassContext);

    if (isLoadingHtml) {
        return <VisibleWrap classes={screenClasses}>{children}</VisibleWrap>;
    }

    return screenClasses[String(screenClass)] ? children : null;
};

const allClasses = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const VisibleWrap = styled(
    ({children, ...props}) => React.cloneElement(children, props)
)`
    ${({classes, theme}) => allClasses.map((size, index) => {
        if (!classes[String(size)]) {
            return (allClasses.length - 1 === index)
                ? media(theme, size)`
                    display: none;
                `
                : mediaBetween(theme, size, allClasses[index + 1])`
                    display: none;
                `;
        }

        return null;
    })}
`;

Visible.displayName = 'Visible';
Visible.propTypes = {
    children: PropTypes.element.isRequired,
    isLoadingHtml: PropTypes.bool,
    lg: PropTypes.bool,
    md: PropTypes.bool,
    sm: PropTypes.bool,
    xl: PropTypes.bool,
    xs: PropTypes.bool,
    xxl: PropTypes.bool
};
Visible.defaultProps = {
    isLoadingHtml: false,
    lg: false,
    md: false,
    sm: false,
    xl: false,
    xs: false,
    xxl: false
};

export default Visible;