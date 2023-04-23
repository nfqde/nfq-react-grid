/* eslint-disable security/detect-object-injection, react/boolean-prop-naming */
import type {ReactElement} from 'react';
import React from 'react';

import styled from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {useScreenSize} from '../utils/hooks/useScreenSize';
import {media, mediaBetween} from '../utils/lib';

import type {BreakpointObject, Theme} from '../sharedTypes';

interface ComponentProps {
    /** The element that should be hidden. Has to be an ReactElement. And can be only one child. */
    children: ReactElement;
    /** Set to true to render the HTML even when the component is hidden. */
    isLoadingHtml?: boolean;
    /** Set to true to hide the child only on screen size lg. */
    lg?: boolean;
    /** Set to true to hide the child only on screen size md. */
    md?: boolean;
    /** Set to true to hide the child only on screen size sm. */
    sm?: boolean;
    /** Set to true to hide the child only on screen size xl. */
    xl?: boolean;
    /** Set to true to hide the child only on screen size xs. */
    xs?: boolean;
    /** Set to true to hide the child only on screen size xxl. */
    xxl?: boolean;
}

/**
 * A component that can hide its children based on the screen size.
 *
 * @param props               The props for the Hidden component.
 * @param props.children      The element that should be hidden. Has to be an ReactElement. And can be only one child.
 * @param props.isLoadingHtml Set to true to render the HTML even when the component is hidden.
 * @param props.lg            Set to true to hide the child only on screen size lg.
 * @param props.md            Set to true to hide the child only on screen size md.
 * @param props.sm            Set to true to hide the child only on screen size sm.
 * @param props.xl            Set to true to hide the child only on screen size xl.
 * @param props.xs            Set to true to hide the child only on screen size xs.
 * @param props.xxl           Set to true to hide the child only on screen size xxl.
 *
 * @returns The Hidden component.
 * @example
 * import {Hidden} from '@nfq/react-grid';
 *
 * const App = () => (
 *     <Hidden xs>
 *         <h1>Hello, World!</h1>
 *     </Hidden>
 * );
 */
const Hidden = ({children, isLoadingHtml, ...screenSizes}: ComponentProps) => {
    const screenSize = useScreenSize();

    if (isLoadingHtml) {
        return <HiddenWrap $classes={screenSizes}>{children}</HiddenWrap>;
    }

    return screenSizes[screenSize] ? null : children;
};

interface HiddenWrapProps {
    $classes: BreakpointObject;
}

const HiddenWrap = styled(
    ({children, ...props}: {children: ReactElement}) => React.cloneElement(children, props)
)<HiddenWrapProps>`
    ${({$classes, theme}) => DIMENSIONS.map((size, index) => {
        if ($classes[size]) {
            return (DIMENSIONS.length - 1 === index)
                ? media(size, theme as Theme)`
                    display: none!important;
                `
                : mediaBetween(size, DIMENSIONS[index + 1], theme as Theme)`
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