/* eslint-disable react/boolean-prop-naming, security/detect-object-injection */
import type {ReactElement} from 'react';
import React from 'react';

import styled, {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {useScreenSize} from '../utils/hooks/useScreenSize';
import {media, mediaBetween} from '../utils/layout';

import type {BreakpointObject, Theme} from '../sharedTypes';

interface ComponentProps {
    /** The element that should be visible. Has to be an ReactElement. And can be only one child. */
    children: ReactElement;
    /** Set to true to render the HTML even when the component is hidden. */
    isLoadingHtml?: boolean;
    /** Set to true to show the child only on screen size lg. */
    lg?: boolean;
    /** Set to true to show the child only on screen size md. */
    md?: boolean;
    /** Set to true to show the child only on screen size sm. */
    sm?: boolean;
    /** Set to true to show the child only on screen size xl. */
    xl?: boolean;
    /** Set to true to show the child only on screen size xs. */
    xs?: boolean;
    /** Set to true to show the child only on screen size xxl. */
    xxl?: boolean;
}

/**
 * A component that shows its children based on the screen size.
 *
 * @param props               The props for the Visible component.
 * @param props.children      The element that should be visible. Has to be an ReactElement. And can be only one child.
 * @param props.isLoadingHtml Set to true to render the HTML even when the component is hidden.
 * @param props.lg            Set to true to show the child only on screen size lg.
 * @param props.md            Set to true to show the child only on screen size md.
 * @param props.sm            Set to true to show the child only on screen size sm.
 * @param props.xl            Set to true to show the child only on screen size xl.
 * @param props.xs            Set to true to show the child only on screen size xs.
 * @param props.xxl           Set to true to show the child only on screen size xxl.
 *
 * @returns The Visible component.
 * @example
 * ```tsx
 * import {Visible} from '@nfq/react-grid';
 *
 * const App = () => (
 *     <Visible xs>
 *         <h1>Hello, World!</h1>
 *     </Visible>
 * );
 * ```
 */
const Visible = ({children, isLoadingHtml = false, ...screenSizes}: ComponentProps) => {
    const screenSize = useScreenSize();

    if (isLoadingHtml) {
        return <VisibleWrap $classes={screenSizes}>{children}</VisibleWrap>;
    }

    return screenSizes[screenSize] ? children : null;
};

interface VisibleWrapProps {
    $classes: BreakpointObject;
}

const VisibleWrap = styled(
    ({children, ...props}: {children: ReactElement}) => React.cloneElement(children, props)
)<VisibleWrapProps>`
    ${({$classes, theme}) => DIMENSIONS.map((size, index) => {
        if (!$classes[size]) {
            return (DIMENSIONS.length - 1 === index)
                ? css`${media(size, theme as Theme)} {
                    display: none!important;
                }`
                : css`${mediaBetween(size, DIMENSIONS[index + 1], theme as Theme)} {
                    display: none!important;
                }`;
        }

        return null;
    })}
`;

Visible.displayName = 'Visible';

export default Visible;