/* eslint-disable react/boolean-prop-naming, security/detect-object-injection, @typescript-eslint/consistent-indexed-object-style */
import type {ReactElement} from 'react';
import React from 'react';

import styled from '@emotion/styled';

import {useScreenSize} from '../hooks/useScreenSize';
import {configCache} from '../utils/cache';
import {media, mediaBetween} from '../utils/layout';

import type {Breakpoints} from '../sharedTypes/breakpointTypes';
import type {BreakpointObject} from '../sharedTypes/componentTypes';

type BreakpointProps = {
    [key in Breakpoints]?: boolean;
};

/**
 * This interface extends `BreakpointProps`, allowing each breakpoint (e.g., `xs`, `sm`, `md`, etc.)
 * to be passed as a boolean flag. These flags control visibility at each screen size.
 *
 * The `children` prop defines what will be rendered or hidden, and the optional `isLoadingHtml` flag
 * enables server-side rendering behavior, ensuring the element is part of the HTML output
 * even if it is visually hidden or conditionally displayed.
 */
interface ComponentProps extends BreakpointProps {
    /**
     * The content that should be conditionally rendered.
     * Must be a single `ReactElement` (e.g., a DOM element or component).
     */
    children: ReactElement;
    /**
     * Set to `true` to ensure the element is included in the HTML even if it's not visible.
     * This is useful for SSR (server-side rendering) or hydration-safe markup generation.
     * The element will be wrapped in a visibility-controlled container (e.g., `<HiddenWrap />` or `<VisibleWrap />`).
     */
    isLoadingHtml?: boolean;
}

/**
 * Conditionally renders its children based on the current screen size using breakpoint visibility flags.
 * This component is part of the `@nfq/react-grid` system and acts as the inverse of `<Hidden />`.
 * It renders content only when a `true` flag is provided for the current screen size.
 * It also supports a server-side rendering mode using `<VisibleWrap />`, which ensures the HTML is rendered
 * regardless of current screen conditions—useful for static or SSR environments.
 * The component expects boolean flags for each breakpoint (`xs`, `sm`, `md`, etc.),
 * where a `true` value means the content should be shown on that breakpoint.
 *
 * @param props               The component props.
 * @param props.children      The content to conditionally render. Must be a single ReactElement.
 * @param props.isLoadingHtml Enables SSR-friendly rendering using `<VisibleWrap />`. Defaults to `false`.
 * @param props.[Breakpoints] Boolean flags for each breakpoint (`true` = show, `false` = hide).
 * @returns The children if they should be visible at the current breakpoint, or `null` otherwise.
 *
 * @example
 * ```tsx
 * // Show only on 'lg' and 'xl' breakpoints
 * <Visible lg xl>
 *   <DesktopNavigation />
 * </Visible>
 *
 * // SSR-safe version
 * <Visible isLoadingHtml lg xl>
 *   <DesktopNavigation />
 * </Visible>
 * ```
 */
const Visible = ({children, isLoadingHtml = false, ...screenSizes}: ComponentProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;
    const screenSize = useScreenSize();

    if (isLoadingHtml) {
        return <VisibleWrap $breakpointOrder={breakpointOrder} $classes={screenSizes}>{children}</VisibleWrap>;
    }

    return screenSizes[screenSize] ? children : null;
};

interface VisibleWrapProps {
    $breakpointOrder: Breakpoints[];
    $classes: BreakpointObject;
}

const VisibleWrap = styled(
    ({children, ...props}: {children: ReactElement}) => React.cloneElement(children, props)
)<VisibleWrapProps>`
    ${({$breakpointOrder, $classes}) => $breakpointOrder.map((size, index) => {
        if (!$classes[size]) {
            return ($breakpointOrder.length - 1 === index)
                ? `${media(size)} {
                    display: none!important;
                }`
                : `${mediaBetween(size, $breakpointOrder[index + 1])} {
                    display: none!important;
                }`;
        }

        return null;
    })}
`;

Visible.displayName = 'Visible';

export {Visible};