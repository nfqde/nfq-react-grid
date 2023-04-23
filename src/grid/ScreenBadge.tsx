import React from 'react';

import styled from 'styled-components';

import {useScreenSize} from '../utils/hooks/useScreenSize';

interface ComponentProps {
    /** TestId for cypress testing. */
    testId: string;
}

/**
 * A component that displays the current screen size.
 *
 * The ScreenBadge component uses the `useScreenSize` hook to determine the current screen size and display it in a badge.
 * For it to work it has to be wrapped in the `ScreenSizeProvider`.
 *
 * @param props        The props for the ScreenBadge component.
 * @param props.testId TestId for cypress testing.
 *
 * @returns The ScreenBadge component.
 * @example
 * import {ScreenBadge, ScreenSizeProvider} from '@nfq/react-grid';
 *
 * const App = () => (
 *     <ScreenSizeProvider>
 *         <ScreenBadge />
 *     </ScreenSizeProvider>
 * );
 */
const ScreenBadge = ({testId}: ComponentProps) => {
    const screenSize = useScreenSize();

    return <ScreenBadgeElement data-cy={testId}>{screenSize}</ScreenBadgeElement>;
};

ScreenBadge.displayName = 'ScreenBadge';
ScreenBadge.defaultProps = {testId: null};

export default ScreenBadge;

const ScreenBadgeElement = styled.div`
    align-items: center;
    background-color: #5901ad40;
    border-radius: 5px;
    bottom: 10px;
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    height: 30px;
    justify-content: center;
    position: fixed;
    right: 10px;
    width: 50px;
    z-index: 10;
`;