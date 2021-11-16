/* eslint-disable react/boolean-prop-naming */
import React, {useContext} from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import {media} from './lib';
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

const VisibleWrap = styled.div`
    ${({classes, theme}) => allClasses.map(size => media(theme, size)`
        ${classes[String(size)] ? 'display: block' : 'display: none'};
    `)}
`;

Visible.displayName = 'Visible';
Visible.propTypes = {
    children: PropTypes.node.isRequired,
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