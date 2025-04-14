import React from 'react';

import styled from '@emotion/styled';

/**
 * Props for the `<ScreenBadge />` component.
 * This interface defines optional configuration for testing purposes. It allows injecting
 * a `data-cy` attribute using a `testId`, commonly used in end-to-end testing with Cypress.
 */
interface ComponentProps {
     /**
      * A test identifier for use with Cypress or other test frameworks.
      * This will be applied as a `data-cy` attribute on the rendered element.
      *
      * @default 'ScreenBadge'
      */
    testId?: string;
}

/**
 * Displays the current active screen size as a badge element for debugging or testing purposes.
 * The `ScreenBadge` component consumes the current breakpoint from `useScreenSize()` and renders it
 * as text inside a styled badge element. It can be customized with a `testId` for Cypress or other
 * test automation tools via the `data-cy` attribute.
 * This is particularly useful during development for visually identifying which breakpoint is active.
 *
 * @param props        The component props.
 * @param props.testId The test identifier applied as `data-cy`. Defaults to `'ScreenBadge'`.
 * @returns A styled badge element displaying the current breakpoint name.
 *
 * @example
 * ```tsx
 * <ScreenBadge />
 * // Renders something like: <span data-cy="ScreenBadge">md</span>
 *
 * <ScreenBadge testId="current-breakpoint" />
 * // Renders: <span data-cy="current-breakpoint">md</span>
 * ```
 */
const ScreenBadge = ({testId = 'ScreenBadge'}: ComponentProps) => <ScreenBadgeElement data-cy={testId} />;

ScreenBadge.displayName = 'ScreenBadge';

export {ScreenBadge};

const ScreenBadgeElement = styled.div`
    align-items: center;
    background-color: color-mix(in srgb, rebeccapurple 50%, transparent);
    border-radius: 5px;
    display: flex;
    height: 30px;
    inset-block-end: 10px;
    inset-inline-end: 10px;
    justify-content: center;
    padding-inline: calc(var(--nfq-grid-base-spacing) * 2);
    position: fixed;
    width: fit-content;
    z-index: 10;

    &::before {
        content: ""var(--nfq-grid-screen-size)"";
        font-family: system-ui, sans-serif;
        font-size: 1.5rem;
        font-weight: bold;
    }
`;