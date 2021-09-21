import React, {useContext} from 'react';

import styled from 'styled-components';

import {ScreenClassContext} from './ScreenClassProvider';

/**
 * ScreenBadge
 *
 * @component
 * @augments {Component<Props, State>}
 * @returns {JSX} Component
 */
const ScreenBadge = () => {
    const screenClass = useContext(ScreenClassContext);

    return <ScreenBadgeElement>{screenClass}</ScreenBadgeElement>;
};

ScreenBadge.displayName = 'ScreenBadge';

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