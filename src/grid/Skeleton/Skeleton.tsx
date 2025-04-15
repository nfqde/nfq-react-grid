/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type {ReactElement} from 'react';
import React from 'react';

import {keyframes} from '@emotion/react';
import styled from '@emotion/styled';

import {useSkeleton} from './useSkeleton';
import {calcSkeletonHeight, calcSkeletonWidth} from './utils';

import type {ExtractedConfig} from '../../config/configTypes';
import type {WithChildren} from '../../sharedTypes/componentTypes';

/**
 * This interface defines configuration options for rendering individual skeleton loaders,
 * including shape, dimensions, count, styling, grouping, and testing identifiers.
 * It is compatible with the `skeleton` theme configuration, allowing style variants and group-based animations.
 */
interface ComponentProps {
    /**
     * Optional. A string specifying one or more CSS class names for applying additional styles to the skeleton.
     * This can be useful for layout integration or overriding styles in specific use cases.
     */
    className?: string;
    /**
     * The number of skeleton lines or instances to render.
     * This allows components to render repeated skeleton placeholders using a loop.
     * Defaults to rendering a single skeleton element if not specified.
     */
    count?: number;
    /**
     * Optional. A group name used to register this skeleton with the `SkeletonStore`.
     * Skeletons sharing the same group will animate in a staggered manner.
     * Useful for coordinating multiple skeleton elements in lists or grids.
     */
    group?: string;
    /**
     * Optional. The height of the skeleton, either as a number (pixels) or a valid CSS value string (e.g. `'2rem'`, `'50%'`).
     * This determines the vertical size of the skeleton placeholder.
     */
    height?: number | string;
    /**
     * A boolean flag indicating whether the skeleton should be rendered as a circle.
     * When set to `true`, the skeleton is styled as a circular placeholder, commonly used for avatars or icons.
     */
    isCircle?: boolean;
    /**
     * Optional. A boolean indicating whether the skeleton should be visible.
     * When `false`, the component does not render skeletons. This is typically controlled by a loading state.
     */
    isLoading?: boolean;
    /**
     * A required identifier for testing purposes.
     * This string is applied as a `data-cy` or `data-testid` attribute to uniquely identify the skeleton component in test environments.
     * It enables reliable element targeting in automated tests such as Cypress or Testing Library.
     */
    testId?: string;
    /**
     * The variant of the skeleton to use, keyed into the `skeleton` configuration object defined in the theme.
     * This allows switching between different animation or color styles defined for the application.
     */
    variant?: keyof ExtractedConfig['skeleton'];
    /**
     * Optional. The width of the skeleton, either as a number (pixels) or a valid CSS string (e.g. `'100%'`, `'10rem'`).
     * This defines the horizontal size of the skeleton placeholder.
     */
    width?: number | string;
}

/**
 * Renders one or more skeleton placeholder elements or actual content depending on the loading state.
 * The `Skeleton` component is part of the `@nfq/react-grid` system and provides flexible loading placeholders
 * styled according to the configured `skeleton` theme. It supports circular or rectangular shapes, adjustable
 * dimensions, group-based staggered animations, and accessibility attributes like `aria-busy`.
 * When `isLoading` is `true`, it renders a number of skeleton lines determined by the `count` prop.
 * Otherwise, it renders the actual `children` content. Skeletons can also be grouped using the `group` prop
 * to enable synchronized animation delays via the `useSkeleton` hook.
 *
 * @param props           The component props.
 * @param props.children  The fallback content to render when loading is complete.
 * @param props.className Optional class name for custom styling.
 * @param props.count     The number of skeleton lines to render. Defaults to `1`.
 * @param props.group     Skeleton animation group identifier. Defaults to `'default'`.
 * @param props.height    The height of each skeleton line (pixels or CSS string).
 * @param props.isCircle  Whether the skeleton should be circular. Defaults to `false`.
 * @param props.isLoading Whether the skeleton should be displayed. Defaults to `false`.
 * @param props.testId    A test identifier used as a `data-cy` attribute. Defaults to `'Skeleton'`.
 * @param props.variant   The visual variant from the theme's skeleton configuration.
 * @param props.width     The width of each skeleton line (pixels or CSS string).
 * @returns Either a list of skeleton placeholder elements or the actual `children` content.
 *
 * @example
 * ```tsx
 * <Skeleton isLoading={loading} count={3} group="cards" height={20} width="100%" variant="light">
 *   <ActualCardComponent />
 * </Skeleton>
 * ```
 */
const Skeleton = ({
    children,
    className,
    count = 1,
    group = 'default',
    height,
    isCircle = false,
    isLoading = false,
    testId = 'Skeleton',
    variant,
    width
}: WithChildren<ComponentProps>) => {
    useSkeleton(count, group);

    if (isLoading) {
        return (
            <Wrapper
                aria-busy="true"
                aria-live="polite"
                className={className}
                data-cy={testId}
                data-nfq-grid-skeleton-config={variant}
            >
                {Array.from({length: count}, (_, index) => (
                    <SkeletonLine
                        key={index}
                        $height={height}
                        $isCircle={isCircle}
                        $width={width}
                        data-skeletongroup={group}
                    >
                        &zwnj;
                    </SkeletonLine>
                ))}
            </Wrapper>
        );
    }

    return children! as ReactElement;
};

Skeleton.displayName = 'Skeleton';

export {Skeleton};

const Wrapper = styled.span``;

interface SkeletonLineProps {
    $height?: number | string;
    $isCircle: boolean;
    $width?: number | string;
}

const skeleton = keyframes`
    from {
        background-position: -60vw 0;
    }
    to {
        background-position: 90vw 0;
    }
`;

const SkeletonLine = styled.span<SkeletonLineProps>`
    --skeleton-delay: 0s;
    animation-delay: var(--skeleton-delay);
    animation-direction: var(--nfq-grid-skeleton-animation-direction);
    animation-duration: calc(var(--nfq-grid-skeleton-animation-duration) * 1s);
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${skeleton};
    animation-timing-function: ease-in-out;
    background-color: var(--nfq-grid-skeleton-colors-base);
    background-image: linear-gradient(
        90deg,
        var(--nfq-grid-skeleton-colors-baseHighlight) 8%,
        var(--nfq-grid-skeleton-colors-highlight) 38%,
        var(--nfq-grid-skeleton-colors-baseHighlight) 54%
    );
    background-position: -60vw 0;
    background-repeat: no-repeat;
    background-size: 100vw 100%;
    border-radius: ${({$isCircle}) => ($isCircle ? '50%' : 'calc(var(--nfq-grid-skeleton-borderRadius) * 1rem)')};
    display: inline-flex;
    height: ${calcSkeletonHeight};
    line-height: 1;
    overflow: hidden;
    position: relative;
    width: ${calcSkeletonWidth};
    z-index: 1;
`;