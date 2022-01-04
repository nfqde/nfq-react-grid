/* eslint-disable react/boolean-prop-naming */
import React, {useContext} from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import {media, mediaBetween} from './lib';
import {ScreenClassContext} from './ScreenClassProvider';

/**
 * Hidden
 *
 * @component
 * @augments {Component<Props, State>}
 * @returns {JSX} Component.
 */
const Hidden = ({children, isLoadingHtml, ...screenClasses}) => {
    const screenClass = useContext(ScreenClassContext);

    if (isLoadingHtml) {
        return <HiddenWrap classes={screenClasses}>{children}</HiddenWrap>;
    }

    return screenClasses[String(screenClass)] ? null : children;
};

const allClasses = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const HiddenWrap = styled(
    ({children, ...props}) => React.cloneElement(children, props)
)`
    ${({classes, theme}) => allClasses.map((size, index) => {
        if (classes[String(size)]) {
            return (allClasses.length - 1 === index)
                ? media(theme, size)`
                    display: none!important;
                `
                : mediaBetween(theme, size, allClasses[index + 1])`
                    display: none!important;
                `;
        }

        return null;
    })}
`;

Hidden.displayName = 'Hidden';
Hidden.propTypes = {
    children: PropTypes.element.isRequired,
    isLoadingHtml: PropTypes.bool,
    lg: PropTypes.bool,
    md: PropTypes.bool,
    sm: PropTypes.bool,
    xl: PropTypes.bool,
    xs: PropTypes.bool,
    xxl: PropTypes.bool
};
Hidden.defaultProps = {
    isLoadingHtml: false,
    lg: false,
    md: false,
    sm: false,
    xl: false,
    xs: false,
    xxl: false
};

export default Hidden;