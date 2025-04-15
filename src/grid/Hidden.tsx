/* eslint-disable security/detect-object-injection, react/boolean-prop-naming, @typescript-eslint/consistent-indexed-object-style */
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
 * This interface extends `BreakpointProps`, allowing breakpoint-specific visibility flags (e.g., `xs`, `md`, `lg`).
 * It defines the content to conditionally hide (`children`) and an optional `isLoadingHtml` mode
 * that forces the component to render its content in the DOM even when hidden—useful for SSR or static HTML.
 */
interface ComponentProps extends BreakpointProps {
    /**
     * The element that should be conditionally hidden.
     * Must be a single `ReactElement` (e.g., a component or DOM element).
     */
    children: ReactElement;
    /**
     * Set to `true` to render the HTML element in the DOM even when it is visually hidden.
     * This is useful for server-side rendering (SSR) or static markup where visibility
     * is later toggled by CSS or client-side logic.
     */
    isLoadingHtml?: boolean;
}

/**
 * Conditionally hides or renders its children based on the current screen size.
 * This component is part of the `@nfq/react-grid` system and uses the configured breakpoint map
 * to determine whether to render or hide its `children`. It supports two modes:
 * - **Client Mode (default):** Hides `children` on specific breakpoints using a simple runtime check.
 * - **HTML Mode (`isLoadingHtml = true`):** Wraps the children in a `<HiddenWrap />` component to produce
 * SSR-safe, CSS-based hidden content for static markup rendering.
 * The component expects a set of boolean flags matching breakpoint names (`xs`, `md`, etc.),
 * where a `true` value means the children should be hidden at that breakpoint.
 *
 * @param props               The component props.
 * @param props.children      The content to conditionally render or hide.
 * @param props.isLoadingHtml Enables SSR-friendly rendering using `<HiddenWrap />`. Defaults to `false`.
 * @param props.[Breakpoints] Boolean flags for each breakpoint (`true` = hide, `false` = show).
 * @returns The children or `null`, based on whether they should be visible at the current breakpoint.
 *
 * @example
 * ```tsx
 * // Hides content only on 'md' and 'lg' breakpoints
 * <Hidden md lg>
 *   <Sidebar />
 * </Hidden>
 *
 * // SSR-safe version of the same logic
 * <Hidden isLoadingHtml md lg>
 *   <Sidebar />
 * </Hidden>
 * ```
 */
const Hidden = ({children, isLoadingHtml = false, ...screenSizes}: ComponentProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;
    const screenSize = useScreenSize();

    if (isLoadingHtml) {
        return <HiddenWrap $breakpointOrder={breakpointOrder} $classes={screenSizes}>{children}</HiddenWrap>;
    }

    return screenSizes[screenSize] ? null : children;
};

interface HiddenWrapProps {
    $breakpointOrder: Breakpoints[];
    $classes: BreakpointObject;
}

const HiddenWrap = styled(
    ({children, ...props}: {children: ReactElement}) => React.cloneElement(children, props)
)<HiddenWrapProps>`
    ${({$breakpointOrder, $classes}) => $breakpointOrder.map((size, index) => {
        if ($classes[size]) {
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

Hidden.displayName = 'Hidden';

export {Hidden};