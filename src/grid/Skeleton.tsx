/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type {ReactElement} from 'react';
import React from 'react';

import styled, {keyframes} from 'styled-components';

import {useSkeleton} from '../utils/hooks/useSkeleton';
import {
    calcSkeletonBackgroundColor,
    calcSkeletonBackgroundImage,
    calcSkeletonBorderRadius,
    calcSkeletonDirection,
    calcSkeletonDuration,
    calcSkeletonHeight,
    calcSkeletonWidth
} from '../utils/styleHelpers';

import type {Theme, WithChildren} from '../sharedTypes';

/**
 * The `ComponentProps` interface defines the shape of the properties object that is expected for this component.
 * It outlines the required properties that needs to be provided when utilizing this component expecting an object of this type.
 */
interface ComponentProps {
    /**
     * A boolean indicating if the skeleton should be circular.
     */
    circle: boolean;
    /**
     * Optional. A string specifying the CSS class for additional styling.
     */
    className?: string;
    /**
     * The number of skeleton lines to be rendered.
     */
    count: number;
    /**
     * Optional. The group of the skeleton.
     */
    group: string;
    /**
     * Optional. The height of the skeleton, either in pixels or as a CSS value.
     */
    height?: number | string;
    /**
     * Optional. A boolean indicating if the skeleton is loading.
     */
    isLoading: boolean;
    /**
     * The `testId` property represents a unique identifier, usually in the form of a string, assigned to a component for testing purposes.
     * It is a required property and must be provided when an object of type `ComponentProps` is expected.
     * This property is crucial for uniquely identifying components during testing, allowing for more accurate and reliable tests.
     */
    testId: string;
    /**
     * The variant of the skeleton, keying into the skeleton configuration in the theme.
     */
    variant?: keyof Required<Theme['nfqgrid']>['skeleton'];
    /**
     * Optional. The width of the skeleton, either in pixels or as a CSS value.
     */
    width?: number | string;
}

/**
 * The `Skeleton` component is used to display a placeholder preview of the content before the data gets loaded.
 * It renders a series of skeleton lines based on the `count` prop. Each line's appearance is controlled by the `circle`, `height`,
 * `width`, and `variant` props. The component supports circular skeletons and can be customized via CSS classes.
 *
 * @param props           The component props.
 * @param props.circle    Determines if the skeleton lines should be circular.
 * @param props.className An optional CSS class for custom styling.
 * @param props.count     The number of skeleton lines to render.
 * @param props.height    An optional height for the skeleton lines.
 * @param props.testId    A test identifier for the component.
 * @param props.variant   The variant of the skeleton lines, based on theme configuration.
 * @param props.width     An optional width for the skeleton lines.
 * @param props.group     An optional group for the skeleton lines.
 * @param props.children  The children of the component.
 * @param props.isLoading A boolean indicating if the skeleton lines should be rendered.
 * @returns A `Skeleton` component with the specified number and style of skeleton lines.
 *
 * @example
 * ```tsx
 * <Skeleton circle={false} count={3} height="20px" testId="skeleton-loader" variant="primary" width="100%" />
 * ```
 */
const Skeleton = ({
    children,
    circle,
    className,
    count,
    group,
    height,
    isLoading,
    testId,
    variant,
    width
}: WithChildren<ComponentProps>) => {
    const usedVariant = useSkeleton(count, group, variant);

    if (isLoading) {
        return (
            <Wrapper aria-busy="true" aria-live="polite" className={className} data-cy={testId}>
                {Array.from({length: count}, (_, index) => (
                    <SkeletonLine
                        key={index}
                        $circle={circle}
                        $height={height}
                        $variant={usedVariant}
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
Skeleton.defaultProps = {
    circle: false,
    count: 1,
    group: 'default',
    testId: 'Skeleton'
};

export default Skeleton;

const Wrapper = styled.span``;

interface SkeletonLineProps {
    $circle: boolean;
    $height?: number | string;
    $variant: keyof Required<Theme['nfqgrid']>['skeleton'];
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
    animation-direction: ${calcSkeletonDirection};
    animation-duration: ${calcSkeletonDuration};
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${skeleton};
    animation-timing-function: ease-in-out;
    background-color: ${calcSkeletonBackgroundColor};
    background-image: ${calcSkeletonBackgroundImage};
    background-position: -60vw 0;
    background-repeat: no-repeat;
    background-size: 100vw 100%;
    border-radius: ${calcSkeletonBorderRadius};
    display: inline-flex;
    height: ${calcSkeletonHeight};
    line-height: 1;
    overflow: hidden;
    position: relative;
    width: ${calcSkeletonWidth};
    z-index: 1;
`;