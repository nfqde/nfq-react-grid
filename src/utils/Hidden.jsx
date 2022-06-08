/* eslint-disable react/boolean-prop-naming */
import React, {useContext} from 'react';

import styled from 'styled-components';

import {media, mediaBetween} from './lib';
import {ScreenClassContext} from './ScreenClassProvider';

/**
 * Hidden component.
 *
 * @param {object}          props               Component props.
 * @param {React.ReactNode} props.children      Component children.
 * @param {boolean}         props.isLoadingHtml Whether the HTML is loading.
 * @param {boolean}         props.lg            Whether the component is visible on large screens.
 * @param {boolean}         props.md            Whether the component is visible on medium screens.
 * @param {boolean}         props.sm            Whether the component is visible on small screens.
 * @param {boolean}         props.xl            Whether the component is visible on extra large screens.
 * @param {boolean}         props.xs            Whether the component is visible on extra small screens.
 * @param {boolean}         props.xxl           Whether the component is visible on extra extra large screens.
 *
 * @returns {React.ReactNode} Component.
 */
const Hidden = ({children, isLoadingHtml, ...screenClasses}) => {
    const screenClass = useContext(ScreenClassContext);

    if (isLoadingHtml) {
        return <HiddenWrap classes={screenClasses}>{children}</HiddenWrap>;
    }

    return screenClasses[String(screenClass)] ? null : children;
};

/**
 * @type {Array<Screensizes>}
 */
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