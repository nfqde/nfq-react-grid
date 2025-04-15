/* eslint-disable no-undefined */
import type {ElementType} from 'react';
import React, {forwardRef} from 'react';

import styled from '@emotion/styled';

import {mergeMediaQueries} from '../../utils/styling';
import {useDebug} from '../hooks/useDebug';
import {debugCss} from '../util/debugCss';

import {calcContainerMaxWidth, calcContainerPadding, calcContainerSize} from './utils';

import type {Breakpoints} from '../../sharedTypes/breakpointTypes';
import type {MouseEventHandler, SizesObject, WithChildren} from '../../sharedTypes/componentTypes';

/**
 * Props for the `<Container />` component in `@nfq/react-grid`.
 * This interface defines configuration options for rendering a layout container,
 * including tag name control, fluid behavior, spacing, and test identifiers.
 * It supports responsive behavior and overrides for default grid system settings.
 */
interface ComponentProps {
    /**
     * Sets the HTML element type to be rendered by the container.
     * This allows semantic or structural control (e.g., rendering as `section`, `main`, `div`, etc.).
     * If you're using a styled version of `Container`, you should use `forwardedAs` instead of `as` to preserve styling behavior.
     */
    as?: ElementType;
    /**
     * Optional class name to apply custom styles to the container.
     * Can be used in conjunction with `styled(Container)` or traditional CSS to override layout defaults.
     */
    className?: string;
    /**
     * Controls whether padding should be removed from the container.
     * If `true`, the container has no horizontal padding at all breakpoints.
     * If an array of `Breakpoints` is provided, padding is only removed for the specified breakpoints.
     */
    hasNoPadding?: Breakpoints[] | boolean;
    /**
     * Enables fluid behavior for the container, making it span the full width of the screen.
     * This is useful when the container is nested inside another container and should not inherit max-width constraints.
     * Accepts either a boolean (for global behavior) or an array of `Breakpoints` to apply fluid behavior conditionally.
     */
    isFluid?: Breakpoints[] | boolean;
    /**
     * Overrides the max-width of the container for non-fluid breakpoints.
     * This can be a single number or a responsive `SizesObject` to apply different max widths per breakpoint.
     * It only applies when `isFluid` is not active for a given breakpoint.
     */
    maxWidth?: SizesObject | number;
    /**
     * A test identifier used for Cypress or other end-to-end testing frameworks.
     * This value will be assigned to the `data-cy` attribute of the container, enabling consistent test selectors.
     */
    testId?: string;
}

/**
 * A flexible layout container component used in the `@nfq/react-grid` system.
 * The `Container` component provides layout boundaries using the configured grid system.
 * It supports responsive fluid behavior, max-width overrides, and optional padding toggling.
 * The component also accepts forwarded refs and spreads any additional mouse event handlers.
 * The underlying HTML tag can be customized using the `as` prop, and debug layout styles
 * can be activated via `useDebug`, which conditionally adds a `"debug"` class in development.
 * This makes `Container` suitable for both semantic layout and debug-friendly inspection.
 *
 * @param props              The component props.
 * @param props.as           Optional HTML element type to render (e.g., `section`, `main`, `div`).
 * @param props.children     The content to be wrapped inside the container.
 * @param props.className    Additional CSS class names for custom styling.
 * @param props.hasNoPadding Disables horizontal padding globally or for specific breakpoints.
 * @param props.isFluid      Makes the container full-width either globally or at specific breakpoints.
 * @param props.maxWidth     Overrides the default max-width for non-fluid breakpoints.
 * @param props.testId       Test identifier applied as `data-cy` for Cypress or other test tools.
 * @param props.ref          Forwarded reference to the root element.
 * @param props.[...handler] Additional mouse event handlers (e.g., `onClick`, `onMouseEnter`).
 * @returns A responsive layout wrapper element with padding, fluidity, and max-width control.
 *
 * @example
 * ```tsx
 * <Container isFluid maxWidth={1440} testId="main-container">
 *   <Content />
 * </Container>
 * ```
 */
const Container = forwardRef<HTMLDivElement, WithChildren<ComponentProps & MouseEventHandler>>(({
    as,
    children,
    className,
    hasNoPadding = false,
    isFluid = false,
    maxWidth,
    testId,
    ...handler
}, ref) => {
    const classNames = [className, useDebug()];

    return (
        <ContainerElement
            ref={ref}
            $hasNoPadding={hasNoPadding}
            $isFluid={isFluid}
            $maxWidth={maxWidth}
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

export {Container};

interface ContainerElementProps {
    $hasNoPadding: Breakpoints[] | boolean;
    $isFluid: Breakpoints[] | boolean;
    $maxWidth?: SizesObject | number;
}

/* eslint-disable indent */
const ContainerElement = styled.div<ContainerElementProps>`
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: var(--nfq-grid-container-max-width, 100%);
    padding-inline-end: var(--nfq-grid-container-no-padding, 0px);
    padding-inline-start: var(--nfq-grid-container-no-padding, 0px);
    width: var(--nfq-grid-container-width, 100%);

    ${mergeMediaQueries<ContainerElementProps>(
        calcContainerPadding,
        calcContainerSize,
        calcContainerMaxWidth
    )}
    ${debugCss('container')}
`;
/* eslint-enable indent */