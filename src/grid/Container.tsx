/* eslint-disable no-undefined */
import type {ElementType} from 'react';
import React, {forwardRef} from 'react';

import styled from 'styled-components';

import {useDebug} from '../utils/hooks/useDebug';
import {calcContainerPadding, calcContainerSize, debugCss, mergeMediaQueries} from '../utils/styleHelpers';

import type {Breakpoints, MouseEventHandler, WithChildren} from '../sharedTypes';

interface ComponentProps {
    /** Sets the html element type of the container. If you overwrite its styles with styled() it has to be forwardedAs. */
    as?: ElementType;
    /** Classname property to overwrite styles with styled(Container). */
    className?: string;
    /** Determines if the container has an padding. */
    hasNoPadding?: Breakpoints[] | boolean;
    /** Makes the container fluid. (Should always be set if the container has an container as parent already). It takes an array of `Breakpoints` or a `boolean` value. */
    isFluid?: Breakpoints[] | boolean;
    /** TestId for cypress testing. */
    testId?: string;
}

/**
 * Renders a container element with optional fluid behavior.
 *
 * This component is used to wrap content that is meant to be displayed within a certain width range. By default,
 * the container element is not fluid, meaning it has a fixed width. By setting the `isFluid` prop to `true`,
 * the container will expand to fill the available space within its parent container.
 *
 * @param props              The props for the Container component.
 * @param props.as           Sets the html element type of the container. If you overwrite its styles with styled() it has to be forwardedAs.
 * @param props.className    Classname property to overwrite styles with styled().
 * @param props.hasNoPadding Determines if the container has an padding.
 * @param props.isFluid      Makes the container fluid. (Should always be set if the container has an container as parent already). It takes an array of `Breakpoints` or a `boolean` value.
 * @param props.testId       TestId for cypress testing.
 *
 * @returns The Container component.
 * @example
 * ```tsx
 * import {Container} from '@nfq/react-grid';
 *
 * const App = () => (
 *     <Container>
 *         <h1>Hello, World!</h1>
 *     </Container>
 * );
 * ```
 */
const Container = forwardRef<HTMLDivElement, WithChildren<ComponentProps & MouseEventHandler>>(({
    as,
    children,
    className,
    hasNoPadding,
    isFluid,
    testId,
    ...handler
}, ref) => {
    const classNames = [className, useDebug()];

    return (
        <ContainerElement
            ref={ref}
            $hasNoPadding={hasNoPadding}
            $isFluid={isFluid}
            as={as}
            className={classNames.join(' ')}
            data-cy={testId}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...handler}
        >
            {children}
        </ContainerElement>
    );
});

Container.displayName = 'Container';
Container.defaultProps = {
    as: undefined,
    children: undefined,
    className: undefined,
    hasNoPadding: false,
    isFluid: false,
    testId: undefined
};

export default Container;

interface ContainerElementProps {
    $hasNoPadding: Breakpoints[] | boolean;
    $isFluid: Breakpoints[] | boolean;
}

/* eslint-disable indent */
const ContainerElement = styled.div<ContainerElementProps>`
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    width: 100%;

    ${mergeMediaQueries<ContainerElementProps>(
        calcContainerPadding,
        calcContainerSize
    )}
    ${debugCss('container')}
`;
/* eslint-enable indent */